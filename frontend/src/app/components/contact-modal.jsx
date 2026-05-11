import { X, Phone, Mail, MapPin } from "lucide-react";

export function ContactModal({ isOpen, onClose, email: customEmail }) {
  if (!isOpen) return null;

  const phoneNumber = "(714) 553 7055";
  const phoneLink = "tel:+17145537055";
  const email = customEmail || "iglesiarocadelaesperanza25@gmail.com";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl shadow-primary/30 max-w-md w-full overflow-hidden border border-accent/25">
        <div className="h-1.5 w-full bg-accent" />

        {/* Header */}
        <div className="relative bg-primary text-white px-8 py-7 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,184,74,0.22),transparent_55%)]" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.26em] text-accent">
              Estamos para servirte
            </p>
            <h2
              className="text-3xl uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Contáctanos
            </h2>
            <p className="text-white/85 mt-2 text-sm">
              Estamos aquí para escucharte y orar contigo.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 space-y-4">
          <a
            href={phoneLink}
            className="flex items-center gap-4 rounded-lg border border-accent/25 bg-white px-5 py-4 transition-colors hover:border-accent hover:bg-accent/5"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Phone className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p
                className="text-primary uppercase tracking-wide text-sm"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Teléfono
              </p>
              <span className="text-gray-700 text-base">{phoneNumber}</span>
            </div>
          </a>

          <a
            href={`mailto:${email}`}
            className="flex items-center gap-4 rounded-lg border border-accent/25 bg-white px-5 py-4 transition-colors hover:border-accent hover:bg-accent/5"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p
                className="text-primary uppercase tracking-wide text-sm"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Correo electrónico
              </p>
              <span className="text-gray-700 text-sm break-all">{email}</span>
            </div>
          </a>

          <div className="flex items-start gap-4 rounded-lg bg-primary/5 px-5 py-4 border border-primary/10">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-accent">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p
                className="text-primary uppercase tracking-wide text-sm"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Visítanos
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                4445 Fruitridge Road
                <br />
                Sacramento, CA 95820
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-accent/10 to-primary/5 px-8 py-5 text-center border-t border-accent/20">
          <button
            onClick={onClose}
            className="bg-primary text-white px-8 py-2.5 rounded-lg uppercase tracking-wide hover:bg-primary/90 transition-colors text-sm shadow-md shadow-primary/20"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
