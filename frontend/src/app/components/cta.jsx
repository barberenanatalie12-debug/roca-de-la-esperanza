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
    <section id="contact" className="py-16 md:py-24 bg-accent">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2
            className="text-white text-3xl md:text-5xl mb-4 md:mb-6 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Horarios de Cultos
          </h2>
          <p className="text-white/90 text-base md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto">
            Te invitamos a ser parte de nuestra familia. Podemos crecer en fe y
            hacer una diferencia en nuestra comunidad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10">
          {services.map((service) => (
            <div
              key={service.name}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
            >
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-white" />
                <h3
                  className="text-white text-2xl uppercase tracking-wide"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {service.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-white/90 mb-3">
                <Clock className="w-4 h-4" />
                <p className="text-base md:text-lg">{service.when}</p>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <Link
            to="/contacto"
            className="bg-white text-accent px-8 md:px-10 py-3 md:py-4 rounded-lg hover:bg-white/90 transition-colors uppercase tracking-wide text-sm md:text-base text-center"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Contáctanos
          </Link>
          <Link
            to="/eventos"
            className="bg-primary text-white px-8 md:px-10 py-3 md:py-4 rounded-lg hover:bg-primary/90 transition-colors uppercase tracking-wide text-sm md:text-base text-center"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Ver Todos los Eventos
          </Link>
        </div>
      </div>
    </section>
  );
}
