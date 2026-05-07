import { X, Phone, Mail } from "lucide-react";
export function ContactModal({ isOpen, onClose, email: customEmail }) {
    if (!isOpen)
        return null;
    const phoneNumber = "(916) 123-4567"; // Replace with actual church phone
    const email = customEmail || "iglesiarocadelaesperanza25@gmail.com";
    return (<div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/90 text-white px-8 py-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors" aria-label="Cerrar">
            <X className="w-6 h-6"/>
          </button>
          <h2 className="text-3xl uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Contáctanos
          </h2>
          <p className="text-white/90 mt-2">
            Estamos aquí para ayudarte
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Phone */}
          <div className="group">
            <div className="flex items-start gap-4">
              <div className="bg-accent/10 p-3 rounded-full group-hover:bg-accent/20 transition-colors">
                <Phone className="w-6 h-6 text-accent"/>
              </div>
              <div className="flex-1">
                <p className="text-primary uppercase tracking-wide mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  Teléfono
                </p>
                <a href={`tel:${phoneNumber.replace(/\D/g, '')}`} className="text-gray-700 hover:text-accent transition-colors text-lg">
                  {phoneNumber}
                </a>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="group">
            <div className="flex items-start gap-4">
              <div className="bg-accent/10 p-3 rounded-full group-hover:bg-accent/20 transition-colors">
                <Mail className="w-6 h-6 text-accent"/>
              </div>
              <div className="flex-1">
                <p className="text-primary uppercase tracking-wide mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  Correo Electrónico
                </p>
                <a href={`mailto:${email}`} className="text-gray-700 hover:text-accent transition-colors break-all">
                  {email}
                </a>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-sm text-center">
              También puedes visitarnos en<br />
              <span className="font-semibold text-gray-700">
                4445 Fruitridge Road, Sacramento, CA
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 text-center">
          <button onClick={onClose} className="bg-primary text-white px-6 py-2 uppercase tracking-wide hover:bg-primary/90 transition-colors" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Cerrar
          </button>
        </div>
      </div>
    </div>);
}
