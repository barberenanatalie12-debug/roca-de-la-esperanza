import { MapPin, Phone, Youtube, Facebook } from "lucide-react";
import { YOUTUBE_CHANNEL_URL } from "../../lib/youtube";
import logo from "../../images/ICIAR-Logo.png";

const FACEBOOK_URL = "https://www.facebook.com/Iciarusasacramento";

export function Footer() {
  return (
    <footer className="bg-primary text-white border-t-4 border-accent">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-9">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-3">
              <img
                src={logo}
                alt="Iglesia Roca de la Esperanza"
                className="h-14 w-14 object-contain"
              />

              <p
                className="text-accent text-2xl uppercase tracking-wide leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Iglesia Roca
                <br />
                de la Esperanza
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h3
              className="text-accent text-xl uppercase tracking-wide mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Visítanos
            </h3>

            <ul className="space-y-3 text-sm">
              <li className="flex items-start justify-center gap-3 text-white/80">
                <MapPin className="w-4 h-4 mt-1 text-accent shrink-0" />
                <span>
                  4445 Fruitridge Road
                  <br />
                  Sacramento, CA 95820
                </span>
              </li>

              <li className="flex items-center justify-center gap-3 text-white/80">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a
                  href="tel:+17145537055"
                  className="hover:text-accent transition-colors"
                >
                  (714) 553 7055
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h3
              className="text-accent text-xl uppercase tracking-wide mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Síguenos
            </h3>

            <div className="flex items-center justify-center gap-4">
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-white/75 hover:text-accent transition-colors"
              >
                <Youtube className="w-6 h-6" />
              </a>

              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/75 hover:text-accent transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-white/10 text-center">
          <p className="text-white/60 text-xs">
            © 2026 Iglesia Roca de la Esperanza. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}