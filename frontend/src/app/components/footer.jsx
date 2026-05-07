import { MapPin, Phone, Mail, Youtube, Instagram, Facebook } from "lucide-react";
export function Footer() {
    return (<footer className="bg-primary py-12 md:py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Location */}
          <div>
            <h3 className="text-accent text-xl md:text-2xl mb-3 md:mb-4 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Visítanos
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-white/80">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0"/>
                <div className="text-sm md:text-base">
                  <p>4445 Fruitridge Road</p>
                  <p>Sacramento, CA</p>
                  <p>ICI-USA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-accent text-xl md:text-2xl mb-3 md:mb-4 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Conéctate
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/80">
                <Phone className="w-5 h-5 flex-shrink-0"/>
                <p className="text-sm md:text-base">(916) 555-0123</p>
              </div>
              <div className="flex items-start gap-3 text-white/80">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0"/>
                <p className="text-sm md:text-base break-all">iglesiarocadelaesperanza25@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-accent text-xl md:text-2xl mb-3 md:mb-4 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Síguenos
            </h3>
            <div className="flex gap-4">
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent transition-colors" aria-label="YouTube">
                <Youtube className="w-6 h-6"/>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6"/>
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook className="w-6 h-6"/>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 md:pt-8 text-center">
          <p className="text-accent/80 text-xs md:text-sm px-4">
            © 2026 Iglesia Roca de la Esperanza. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>);
}
