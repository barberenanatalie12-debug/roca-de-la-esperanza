import { MapPin, Phone, Heart, Navigation } from "lucide-react";

const CHURCH_NAME = "Iglesia Cristiana Roca de la Esperanza";
const STREET = "4445 Fruitridge Road";
const CITY_LINE = "Sacramento, CA 95820";
const ADDRESS_FULL = `${STREET}, ${CITY_LINE}`;
const PHONE_DISPLAY = "714 553 7055";
const PHONE_LINK = "tel:+17145537055";

const ENCODED_ADDRESS = encodeURIComponent(ADDRESS_FULL);
const MAP_EMBED_URL = `https://www.google.com/maps?q=${ENCODED_ADDRESS}&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${ENCODED_ADDRESS}`;

export function VisitMap() {
  return (
    <section
      id="visitanos"
      className="py-20 px-4 sm:px-6 md:px-10 bg-gradient-to-br from-stone-50 via-white to-accent/10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-stretch">
          <div className="flex flex-col">
            <p
              className="flex items-center gap-2 text-accent text-sm uppercase tracking-[0.25em] mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <MapPin className="w-4 h-4" />
              Estamos en Sacramento
            </p>

            <h2
              className="text-primary text-5xl md:text-6xl mb-3 uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Visítanos
            </h2>

            <div className="w-20 h-1 bg-accent mb-6" />

            <p className="text-gray-700 text-lg leading-relaxed mb-2">
              Nos encantaría recibirte en {CHURCH_NAME}.
            </p>

            <p className="text-gray-500 text-sm mb-8">
              Encuéntranos fácilmente y planea tu visita.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 border-b border-accent/20 pb-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-primary font-semibold text-lg">
                    {STREET}
                  </p>
                  <p className="text-gray-600 text-sm">{CITY_LINE}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-accent/20 pb-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>

                <div>
                  <a
                    href={PHONE_LINK}
                    className="text-primary font-semibold text-lg hover:text-accent transition-colors"
                  >
                    {PHONE_DISPLAY}
                  </a>

                  <p className="text-gray-600 text-sm">
                    Llámanos, estaremos felices de ayudarte.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent shadow-sm">
                  <Heart className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-primary font-semibold text-lg">
                    ¡Te esperamos con los brazos abiertos!
                  </p>

                  <p className="text-gray-600 text-sm">
                    Ambiente familiar · Mensaje de esperanza · Todos bienvenidos
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-lg transition-all uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <Navigation className="w-5 h-5" />
                Cómo Llegar
              </a>

              <a
                href={PHONE_LINK}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-primary px-6 py-3 rounded-lg shadow-md shadow-accent/25 hover:bg-accent/90 hover:shadow-lg transition-all uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <Phone className="w-5 h-5" />
                Llámanos
              </a>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-2xl shadow-primary/15 border border-accent/30 bg-white min-h-[420px] lg:min-h-[520px]">
            <div className="h-2 bg-accent" />

            <div
              className="relative w-full h-full"
              style={{ minHeight: "420px" }}
            >
              <iframe
                title={`Mapa de ${CHURCH_NAME}`}
                src={MAP_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}