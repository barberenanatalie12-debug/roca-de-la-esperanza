import { Link } from "react-router";
import { Calendar, Clock } from "lucide-react";

const services = [
  {
    name: "Escuela Dominical",
    when: "Domingos, 3:00 PM",
    description:
      "Un momento de aprendizaje para conocer más de Dios y fortalecer nuestra fe.",
  },
  {
    name: "Culto General",
    when: "Domingos, 4:30 PM",
    description:
      "Un tiempo de adoración a Dios, predicación de la Palabra, comunión y fortalecimiento espiritual.",
  },
  {
    name: "Servicio de Jueves",
    when: "Jueves, 7:30 PM",
    description:
      "Un tiempo para estudiar la Palabra de Dios en profundidad y fortalecer nuestra fe.",
  },
  {
    name: "Reunión de Oración",
    when: "Una vez al mes. Fecha por confirmar.",
    description:
      "Un tiempo mensual dedicado a la oración y búsqueda de Dios.",
  },
];

export function CTA() {
  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-accent/25 via-white to-accent/10 px-4 py-16 md:px-6 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.26em] text-accent">
            Reuniones semanales
          </p>

          <h2
            className="mb-4 text-4xl uppercase tracking-wide text-primary md:text-5xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Horarios de Cultos
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-700 md:text-lg">
            Te invitamos a ser parte de nuestra familia. Podemos crecer en fe y
            hacer una diferencia en nuestra comunidad.
          </p>

          <div className="mx-auto mt-5 h-1 w-20 bg-accent" />
        </div>

        <div className="mb-10 grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.name}
              className="rounded-lg border border-accent/30 bg-white p-6 shadow-xl shadow-primary/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="mb-3 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary shadow-md">
                  <Calendar className="h-5 w-5" />
                </div>

                <div>
                  <h3
                    className="text-2xl uppercase tracking-wide text-primary md:text-3xl"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {service.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Clock className="h-4 w-4 text-accent" />
                    <p>{service.when}</p>
                  </div>
                </div>
              </div>

              <p className="border-l-4 border-accent/70 pl-4 text-sm leading-relaxed text-gray-700">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/contacto"
            className="rounded-lg bg-primary px-8 py-3 text-center text-sm uppercase tracking-wide text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90 md:px-10 md:text-base"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Contáctanos
          </Link>

          <Link
            to="/eventos"
            className="rounded-lg bg-accent px-8 py-3 text-center text-sm uppercase tracking-wide text-primary shadow-lg shadow-accent/25 transition-colors hover:bg-accent/90 md:px-10 md:text-base"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Ver Todos los Eventos
          </Link>
        </div>
      </div>
    </section>
  );
}