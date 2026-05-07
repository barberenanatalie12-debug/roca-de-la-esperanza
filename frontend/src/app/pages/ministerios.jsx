import { Music, Users, Heart, Shield, BookOpen } from "lucide-react";

export default function Ministerios() {
  const ministries = [
    {
      title: "Ministerio de Música y Alabanza",
      description:
        "La adoración a Dios por medio de la alabanza es un lenguaje de gratitud que sale del corazón.",
      icon: Music,
      schedule: "Ensayos: por confirmar",
    },
    {
      title: "Jóvenes",
      description: "Descripción pendiente.",
      icon: Users,
      schedule: "Horario por confirmar",
    },
    {
      title: "Niños",
      description: "Descripción pendiente.",
      icon: Heart,
      schedule: "Horario por confirmar",
    },
    {
      title: "Varones",
      description: "Descripción pendiente.",
      icon: Shield,
      schedule: "Horario por confirmar",
    },
    {
      title: "Sociedades",
      description:
        "Nuestras sociedades reúnen a damas, varones, jóvenes y niños para crecer en fe y servir juntos.",
      icon: BookOpen,
      schedule: "Horarios por confirmar",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-20 px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1
            className="text-accent text-6xl mb-6 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Nuestros Ministerios
          </h1>
          <p className="text-white/90 text-xl max-w-3xl mx-auto">
            En Iglesia Roca de la Esperanza, tenemos diversos ministerios diseñados para ayudarte a
            crecer espiritualmente y servir a nuestra comunidad.
          </p>
        </div>
      </div>

      <div className="py-20 px-10">
        <div className="max-w-6xl mx-auto space-y-16">
          {ministries.map((ministry, index) => {
            const Icon = ministry.icon;
            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="md:w-1/2">
                  <div className="w-full h-80 rounded-lg shadow-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-24 h-24 text-accent" />
                  </div>
                </div>
                <div className="md:w-1/2 space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon className="w-8 h-8 text-accent" />
                    <h2
                      className="text-primary text-4xl uppercase tracking-wide"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {ministry.title}
                    </h2>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {ministry.description}
                  </p>
                  <div className="bg-accent/10 p-4 rounded-lg">
                    <p className="text-primary font-semibold">
                      📅 {ministry.schedule}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-primary py-16 px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-accent text-4xl mb-6 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            ¿Quieres Servir?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Si estás interesado en unirte a alguno de nuestros ministerios o quieres más
            información, contáctanos. ¡Nos encantaría que formes parte de nuestro equipo!
          </p>
          <a
            href="/contacto"
            className="inline-block bg-accent text-primary px-8 py-4 uppercase tracking-wide hover:bg-accent/90 transition-colors"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Contáctanos
          </a>
        </div>
      </div>
    </div>
  );
}
