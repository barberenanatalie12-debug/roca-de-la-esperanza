import { Music, Users, Heart, Shield, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { getMinistries } from "../../lib/siteContent";

const icons = {
  music: Music,
  users: Users,
  heart: Heart,
  shield: Shield,
  book: BookOpen,
};

const fallbackMinistries = [
  {
    title: "Ministerio de Música y Alabanza",
    description: "La adoración a Dios por medio de la alabanza es un lenguaje de gratitud que sale del corazón.",
    icon_key: "music",
    schedule: "Ensayos: por confirmar",
  },
  {
    title: "Jóvenes",
    description: "Descripción pendiente.",
    icon_key: "users",
    schedule: "Horario por confirmar",
  },
  {
    title: "Niños",
    description: "Descripción pendiente.",
    icon_key: "heart",
    schedule: "Horario por confirmar",
  },
  {
    title: "Varones",
    description: "Descripción pendiente.",
    icon_key: "shield",
    schedule: "Horario por confirmar",
  },
  {
    title: "Sociedades",
    description: "Nuestras sociedades reúnen a damas, varones, jóvenes y niños para crecer en fe y servir juntos.",
    icon_key: "book",
    schedule: "Horarios por confirmar",
  },
];

export default function Ministerios() {
  const [ministries, setMinistries] = useState(fallbackMinistries);

  useEffect(() => {
    getMinistries().then((data) => {
      if (data.length > 0) setMinistries(data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-20 px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-accent text-6xl mb-6 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Nuestros Ministerios
          </h1>
          <p className="text-white/90 text-xl max-w-3xl mx-auto">
            En Iglesia Roca de la Esperanza, tenemos diversos ministerios diseñados para ayudarte a crecer espiritualmente y servir a nuestra comunidad.
          </p>
        </div>
      </div>

      <div className="py-20 px-10">
        <div className="max-w-6xl mx-auto space-y-16">
          {ministries.map((ministry, index) => {
            const Icon = icons[ministry.icon_key] || Users;

            return (
              <div key={ministry.id || ministry.title} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className="md:w-1/2">
                  <div className="w-full h-80 rounded-lg shadow-lg bg-primary/10 flex items-center justify-center overflow-hidden">
                    {ministry.image_url ? (
                      <img src={ministry.image_url} alt={ministry.title} className="w-full h-full object-cover" />
                    ) : (
                      <Icon className="w-24 h-24 text-accent" />
                    )}
                  </div>
                </div>

                <div className="md:w-1/2 space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon className="w-8 h-8 text-accent" />
                    <h2 className="text-primary text-4xl uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      {ministry.title}
                    </h2>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">{ministry.description}</p>
                  <div className="bg-accent/10 p-4 rounded-lg">
                    <p className="text-primary font-semibold">📅 {ministry.schedule}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-16">
        <div className="rounded-lg bg-primary text-white border-t-4 border-accent p-8 md:p-10 text-center shadow-md">
          <h2
            className="text-4xl md:text-5xl uppercase tracking-wide mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            ¿Quieres Servir?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto leading-relaxed mb-6">
            Si estás interesado en unirte a alguno de nuestros ministerios o
            quieres más información, contáctanos. ¡Nos encantaría que formes
            parte de nuestro equipo!
          </p>
          <a
            href="/contacto"
            className="inline-block bg-accent text-primary px-8 py-3 rounded-lg uppercase tracking-wide hover:bg-accent/90 transition-colors shadow-md shadow-accent/20"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Contáctanos
          </a>
        </div>
      </section>
    </div>
  );
}
