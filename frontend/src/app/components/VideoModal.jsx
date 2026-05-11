import { useEffect } from "react";
import { X } from "lucide-react";
import { getYoutubeEmbedUrl } from "../../lib/youtube";

export function VideoModal({ open, videoUrl, title, onClose }) {
  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const embedUrl = getYoutubeEmbedUrl(videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-black rounded-xl shadow-2xl shadow-primary/40 w-full max-w-4xl overflow-hidden border border-accent/25">
        <div className="h-1.5 w-full bg-accent" />

        <div className="relative flex items-center justify-between bg-primary text-white px-5 py-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,184,74,0.18),transparent_55%)]" />

          <h3
            className="relative text-lg md:text-xl uppercase tracking-wide truncate pr-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {title || "Sermón"}
          </h3>

          <button
            onClick={onClose}
            className="relative text-white/80 hover:text-accent transition-colors flex-shrink-0"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          {embedUrl ? (
            <iframe
              key={embedUrl}
              src={`${embedUrl}?autoplay=1&rel=0`}
              title={title || "Sermón"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-0"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/80 text-center px-6">
              <p>No hay un video disponible para este sermón.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
