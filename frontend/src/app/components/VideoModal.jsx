import { useEffect } from "react";
import { X } from "lucide-react";
import { getYoutubeEmbedUrl } from "../../lib/youtube";
import { facebookEmbedUrl } from "../../lib/siteContent";

export function VideoModal({
  open,
  videoUrl,
  mediaType,
  title,
  onClose,
}) {
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

  // Resolve which player to render
  let player = null;

  if (mediaType === "video" && videoUrl) {
    player = (
      <video
        key={videoUrl}
        src={videoUrl}
        controls
        autoPlay
        playsInline
        className="absolute top-0 left-0 w-full h-full bg-black"
      />
    );
  } else if (mediaType === "facebook") {
    const embed = facebookEmbedUrl(videoUrl);
    if (embed) {
      player = (
        <iframe
          key={embed}
          src={embed}
          title={title || "Video"}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          scrolling="no"
          frameBorder="0"
          className="absolute top-0 left-0 w-full h-full border-0"
        />
      );
    }
  } else {
    // Default: YouTube (also covers sermon usage)
    const embed = getYoutubeEmbedUrl(videoUrl);
    if (embed) {
      player = (
        <iframe
          key={embed}
          src={`${embed}?autoplay=1&rel=0`}
          title={title || "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
        />
      );
    }
  }

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
            {title || "Video"}
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
          {player || (
            <div className="absolute inset-0 flex items-center justify-center text-white/80 text-center px-6">
              <p>No hay un video disponible.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
