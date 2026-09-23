import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Maximize2, Minimize2, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 4;
const HANDLE = 14;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

// Pointer capture keeps a drag alive when the cursor leaves the element.
// Some synthetic/touch events reject it, which is harmless.
const capturePointer = (e) => {
  try {
    e.currentTarget.setPointerCapture(e.pointerId);
  } catch {
    /* ignore */
  }
};

/**
 * Lets an admin fit, fill, zoom, drag and resize an image inside a frame with
 * a fixed aspect ratio. `ref.toBlob()` exports exactly what the frame shows.
 *
 * Props:
 *   src      data:/blob:/https: image source
 *   aspect   frame width / height (e.g. 4/3, 1, 3/2)
 *   onError  called when the image cannot be loaded at all
 */
export const ImageFrameEditor = forwardRef(function ImageFrameEditor(
  { src, aspect = 4 / 3, onError },
  ref
) {
  const frameRef = useRef(null);
  const imageRef = useRef(null);
  const dragRef = useRef(null);

  const [natural, setNatural] = useState(null);
  const [frame, setFrame] = useState({ w: 0, h: 0 });
  const [mode, setMode] = useState("fit");
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Load the image once per source. A CORS-enabled load lets us export to a
  // canvas; if the host refuses, fall back to a display-only load.
  useEffect(() => {
    setNatural(null);
    setMode("fit");
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    imageRef.current = null;

    if (!src) return undefined;

    let cancelled = false;
    const isLocal = src.startsWith("data:") || src.startsWith("blob:");

    const load = (withCors) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        if (withCors) img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

    (async () => {
      let img = null;
      let tainted = false;

      try {
        img = await load(!isLocal);
      } catch {
        if (!isLocal) {
          try {
            img = await load(false);
            tainted = true;
          } catch {
            img = null;
          }
        }
      }

      if (cancelled) return;

      if (!img) {
        onError?.();
        return;
      }

      img.__tainted = tainted;
      imageRef.current = img;
      setNatural({ w: img.naturalWidth, h: img.naturalHeight });
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // Track the frame's rendered size so the math works at any width.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return undefined;

    const measure = () =>
      setFrame({ w: el.clientWidth, h: el.clientHeight });

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Geometry for a given frame size (also used for export at a larger size).
  const layoutFor = useCallback(
    (frameW, frameH) => {
      if (!natural || !frameW || !frameH) return null;

      const base =
        mode === "fill"
          ? Math.max(frameW / natural.w, frameH / natural.h)
          : Math.min(frameW / natural.w, frameH / natural.h);

      const scale = base * zoom;
      const w = natural.w * scale;
      const h = natural.h * scale;
      const k = frameW / (frame.w || frameW);

      return {
        w,
        h,
        left: (frameW - w) / 2 + offset.x * k,
        top: (frameH - h) / 2 + offset.y * k,
      };
    },
    [natural, mode, zoom, offset, frame.w]
  );

  const layout = layoutFor(frame.w, frame.h);

  const reset = () => {
    setMode("fit");
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const applyMode = (next) => {
    setMode(next);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  // ----- dragging the image -------------------------------------------------
  const startPan = (e) => {
    if (!layout) return;
    e.preventDefault();
    capturePointer(e);
    dragRef.current = {
      type: "pan",
      startX: e.clientX,
      startY: e.clientY,
      offset,
    };
  };

  // ----- dragging a corner handle ------------------------------------------
  const startResize = (e) => {
    if (!layout) return;
    e.preventDefault();
    e.stopPropagation();
    capturePointer(e);

    const rect = frameRef.current.getBoundingClientRect();
    const cx = rect.left + layout.left + layout.w / 2;
    const cy = rect.top + layout.top + layout.h / 2;
    const d0 = Math.hypot(e.clientX - cx, e.clientY - cy) || 1;

    dragRef.current = { type: "resize", cx, cy, d0, zoom };
  };

  const onPointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag) return;

    if (drag.type === "pan") {
      setOffset({
        x: drag.offset.x + (e.clientX - drag.startX),
        y: drag.offset.y + (e.clientY - drag.startY),
      });
    } else if (drag.type === "resize") {
      const d1 = Math.hypot(e.clientX - drag.cx, e.clientY - drag.cy);
      setZoom(clamp(drag.zoom * (d1 / drag.d0), MIN_ZOOM, MAX_ZOOM));
    }
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  // ----- export ---------------------------------------------------------------
  useImperativeHandle(
    ref,
    () => ({
      /** True when the browser will not let us read the pixels (CORS). */
      isExportable: () => Boolean(imageRef.current) && !imageRef.current.__tainted,

      /**
       * Renders the framed result to a Blob. Returns null when the image
       * cannot be exported (tainted canvas or not loaded yet).
       */
      toBlob: async ({ width = 1600, type = "image/jpeg", quality = 0.9 } = {}) => {
        const img = imageRef.current;
        if (!img || img.__tainted || !natural) return null;

        const outW = Math.round(width);
        const outH = Math.round(width / aspect);
        const geometry = layoutFor(outW, outH);
        if (!geometry) return null;

        const canvas = document.createElement("canvas");
        canvas.width = outW;
        canvas.height = outH;
        const ctx = canvas.getContext("2d");

        if (type !== "image/png") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, outW, outH);
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, geometry.left, geometry.top, geometry.w, geometry.h);

        try {
          return await new Promise((resolve) =>
            canvas.toBlob(resolve, type, quality)
          );
        } catch {
          return null;
        }
      },
    }),
    [natural, aspect, layoutFor]
  );

  // Handles sit on the corners of the part of the image that is visible.
  const handles = (() => {
    if (!layout) return [];
    // Keep each handle fully inside the frame so it stays clickable even
    // when the image extends past the edges.
    const pad = HANDLE / 2 + 1;
    const x0 = clamp(layout.left, pad, frame.w - pad);
    const y0 = clamp(layout.top, pad, frame.h - pad);
    const x1 = clamp(layout.left + layout.w, pad, frame.w - pad);
    const y1 = clamp(layout.top + layout.h, pad, frame.h - pad);
    return [
      { key: "nw", x: x0, y: y0, cursor: "nwse-resize" },
      { key: "ne", x: x1, y: y0, cursor: "nesw-resize" },
      { key: "sw", x: x0, y: y1, cursor: "nesw-resize" },
      { key: "se", x: x1, y: y1, cursor: "nwse-resize" },
    ];
  })();

  const buttonBase =
    "inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors";
  const buttonOn = "bg-primary text-white";
  const buttonOff = "bg-gray-100 text-gray-700 hover:bg-gray-200";

  return (
    <div className="space-y-3" data-image-frame-editor>
      <div
        ref={frameRef}
        className="relative w-full overflow-hidden rounded-md bg-gray-200 select-none touch-none"
        style={{
          aspectRatio: String(aspect),
          backgroundImage:
            "linear-gradient(45deg,#e5e7eb 25%,transparent 25%,transparent 75%,#e5e7eb 75%),linear-gradient(45deg,#e5e7eb 25%,transparent 25%,transparent 75%,#e5e7eb 75%)",
          backgroundSize: "16px 16px",
          backgroundPosition: "0 0, 8px 8px",
          backgroundColor: "#f3f4f6",
        }}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {layout ? (
          <>
            <img
              src={src}
              alt="Vista previa"
              draggable="false"
              onPointerDown={startPan}
              className="absolute max-w-none cursor-move"
              style={{
                left: layout.left,
                top: layout.top,
                width: layout.w,
                height: layout.h,
              }}
            />

            {handles.map((h) => (
              <div
                key={h.key}
                role="presentation"
                onPointerDown={startResize}
                className="absolute rounded-sm border-2 border-white bg-primary shadow"
                style={{
                  width: HANDLE,
                  height: HANDLE,
                  left: h.x - HANDLE / 2,
                  top: h.y - HANDLE / 2,
                  cursor: h.cursor,
                }}
              />
            ))}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">
            Cargando imagen...
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => applyMode("fit")}
          className={`${buttonBase} ${mode === "fit" ? buttonOn : buttonOff}`}
          title="Mostrar la imagen completa"
        >
          <Minimize2 className="w-3.5 h-3.5" />
          Ajustar
        </button>

        <button
          type="button"
          onClick={() => applyMode("fill")}
          className={`${buttonBase} ${mode === "fill" ? buttonOn : buttonOff}`}
          title="Cubrir todo el marco (puede recortar)"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          Rellenar
        </button>

        <div className="flex items-center gap-2 flex-1 min-w-[160px]">
          <ZoomOut className="w-4 h-4 text-gray-500 shrink-0" />
          <input
            type="range"
            min={MIN_ZOOM}
            max={MAX_ZOOM}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            aria-label="Zoom"
            className="w-full accent-[var(--color-primary,#1e293b)]"
          />
          <ZoomIn className="w-4 h-4 text-gray-500 shrink-0" />
        </div>

        <button
          type="button"
          onClick={reset}
          className={`${buttonBase} ${buttonOff}`}
          title="Volver a la posición original"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Restablecer
        </button>
      </div>

      <p className="text-xs text-gray-500">
        Arrastra la imagen para moverla y usa las esquinas o el control de zoom
        para cambiar su tamaño. Lo que quede fuera del marco no se mostrará.
      </p>
    </div>
  );
});

export default ImageFrameEditor;
