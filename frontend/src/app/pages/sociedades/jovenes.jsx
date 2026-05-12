import { Users, Calendar, Music, Heart } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { ContactModal } from "../../components/contact-modal";
import { useState, useEffect } from "react";
import { SociedadesNavigation } from "../../components/sociedades-navigation";
import Slider from "react-slick";
import "../../../styles/slick-carousel.css";
import youth1 from "../../../images/youth1.png";
import youth2 from "../../../images/youth2.png";
import youth3 from "../../../images/youth3.png";
export default function SociedadJovenes() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

const jovenesImages = [
  {
    url: youth1,
    alt: "Jóvenes en comunidad",
  },
  {
    url: youth2,
    alt: "Jóvenes adorando juntos",
  },
  {
    url: youth3,
    alt: "Estudio bíblico de jóvenes",
  },
];
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
  };

  const activities = [
    {
      title: "Estudios Relevantes",
      icon: Music,
      text: "Exploramos temas bíblicos aplicables a la vida universitaria, profesional y relaciones.",
    },
    {
      title: "Conexión Genuina",
      icon: Heart,
      text: "Creamos espacios informales donde compartir nuestras vidas, desafíos y victorias con autenticidad.",
    },
    {
      title: "Impacto",
      icon: Users,
      text: "Participamos en proyectos de servicio y alcance, poniendo nuestra fe en acción en la comunidad.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-white border-t-4 border-accent">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-16">
          <p className="text-sm uppercase tracking-[0.26em] text-accent font-semibold mb-4">
            Vida en comunidad
          </p>

          <h1
            className="text-5xl md:text-6xl mb-5 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Sociedad de Jóvenes
          </h1>

          <p className="text-lg md:text-xl max-w-3xl leading-relaxed text-white/90">
            Una generación apasionada por Cristo, viviendo su fe con propósito y
            autenticidad.
          </p>

          <div className="mt-8 h-1 w-28 bg-accent" />
        </div>
      </section>

      {/* IMAGE GALLERY */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-16">
        <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-md border border-accent/25 bg-white">
          <div className="h-2 bg-accent" />

          <Slider {...sliderSettings}>
            {jovenesImages.map((image, index) => (
              <div key={index}>
                <ImageWithFallback
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-96 object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* ABOUT + MEETING INFO */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <div className="rounded-lg bg-gradient-to-br from-primary to-primary/90 text-white p-8 md:p-10 border border-primary/80">
            <p className="text-accent uppercase tracking-[0.26em] text-sm font-semibold mb-3">
              Acerca de
            </p>

            <h2
              className="text-4xl md:text-5xl uppercase tracking-wide mb-5"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Acerca de Nuestra Sociedad
            </h2>

            <p className="text-white/90 leading-relaxed text-lg">
              La Sociedad de Jóvenes es un espacio dinámico donde navegamos
              juntos los desafíos de esta etapa de vida, apoyándonos mutuamente
              y fortaleciendo nuestra relación con Dios.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-accent/25 overflow-hidden">
            <div className="h-2 bg-accent" />

            <div className="p-7 md:p-8">
              <h3
                className="text-primary text-2xl md:text-3xl mb-6 uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Información de Reuniones
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Día y Hora</p>
                    <p className="text-gray-700">Por anunciar</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Líder</p>
                    <p className="text-gray-700">Por confirmar</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Edades</p>
                    <p className="text-gray-700">12 para arriba</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section className="bg-gradient-to-br from-accent/15 via-white to-primary/10 border-y border-accent/25">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.26em] text-accent font-semibold mb-4">
              Lo que vivimos
            </p>

            <h2
              className="text-4xl md:text-5xl text-primary uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Nuestras Actividades
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {activities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <article
                  key={activity.title}
                  className="bg-white rounded-lg shadow-md border border-accent/25 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`h-2 ${
                      index % 2 === 0 ? "bg-accent" : "bg-primary"
                    }`}
                  />

                  <div className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent mb-4">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3
                      className="text-primary text-2xl mb-3 uppercase tracking-wide"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {activity.title}
                    </h3>

                    <p className="text-gray-700 leading-relaxed">
                      {activity.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary border-t-4 border-accent">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 text-center">
          <h2
            className="text-accent text-4xl md:text-5xl mb-5 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            ¡Únete a Nosotros!
          </h2>

          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Ven y sé parte de esta comunidad de jóvenes que viven su fe con
            pasión y propósito.
          </p>

          <button
            onClick={() => setIsContactModalOpen(true)}
            className="inline-block bg-accent text-primary px-8 py-3 rounded-lg uppercase tracking-wide hover:bg-accent/90 transition-colors shadow-md shadow-accent/20"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Contáctanos
          </button>
        </div>
      </section>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        email="iglesiarocadelaesperanza25@gmail.com"
      />

      <SociedadesNavigation currentPage="jovenes" />
    </div>
  );
}
