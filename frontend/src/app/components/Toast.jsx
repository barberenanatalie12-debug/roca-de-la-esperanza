import { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export function Toast({ open, type = "success", title, message, onClose }) {
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

  const isError = type === "error";
  const Icon = isError ? AlertCircle : CheckCircle2;
  const iconBgClass = isError ? "bg-red-50" : "bg-accent/15";
  const iconColorClass = isError ? "text-red-600" : "text-accent";
  const topBarClass = isError ? "bg-red-500" : "bg-accent";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-xl shadow-2xl shadow-primary/30 max-w-md w-full overflow-hidden border border-accent/25">
        <div className={`h-1.5 w-full ${topBarClass}`} />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-primary transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 text-center">
          <div className="flex justify-center mb-5">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full ${iconBgClass}`}
            >
              <Icon className={`w-9 h-9 ${iconColorClass}`} />
            </div>
          </div>

          <h3
            className="text-primary text-3xl mb-3 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {title}
          </h3>

          <p className="text-gray-700 leading-relaxed">{message}</p>

          <button
            type="button"
            onClick={onClose}
            className="mt-7 inline-flex items-center justify-center bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors uppercase tracking-wide text-sm shadow-md shadow-primary/20"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
