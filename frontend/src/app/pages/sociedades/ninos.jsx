import { Users, Calendar, Star, Smile, ShieldCheck } from "lucide-react";
import { ContactModal } from "../../components/contact-modal";
import { useState, useEffect } from "react";
import { SociedadesNavigation } from "../../components/sociedades-navigation";
import Slider from "react-slick";
import "../../../styles/slick-carousel.css";

const ninosImage = "/images/ninos-1.png";

export default function SociedadNinos() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ninosImages = [
    {
      url: ninosImage,
      alt: "Niños felices aprendiendo",
    },
    {
      url: "https://images.unsplash.com/photo-1565425518476-3229123699c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGNodXJjaCUyMGFjdGl2aXRpZXMlMjBoYXBweXxlbnwxfHx8fDE3NzQzMzI5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Niños en actividades de iglesia",
    },
    {
      url: "https://images.unsplash.com/photo-1758687126753-3fc546c4ee67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwc3VuZGF5JTIwc2Nob29sJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzc0MzMyOTk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Niños aprendiendo en escuela dominical",
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
      title: "Historias Bíblicas",
      icon: Star,
      text: "Enseñamos las grandes historias de la Biblia de manera visual, interactiva y memorable para los niños.",
    },
    {
      title: "Juegos y Música",
      icon: Smile,
      text: "Canciones, alabanza y juegos que hacen el aprendizaje divertido y lleno de alegría.",
    },
    {
      title: "Manualidades",
      icon: Users,
      text: "Actividades creativas y artísticas que refuerzan las lecciones bíblicas de manera práctica.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-white border-t-4 border-accent">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-16">
          <p className="text-sm uppercase tracking-[0.26em] text-accent font-semibold mb-4">
            Niños amados
          </p>

          <h1
            className="text-5xl md:text-6xl mb-5 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Sociedad de Niños
          </h1>

          <p className="text-lg md:text-xl max-w-3xl leading-relaxed text-white/90">
            Un lugar alegre y seguro donde los niños aprenden del amor de Jesús.
          </p>

          <div className="mt-8 h-1 w-28 bg-accent" />
        </div>
      </section>

      {/* IMAGE GALLERY */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-16">
        <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-md border border-accent/25 bg-white">
          <div className="h-2 bg-accent" />

          <Slider {...sliderSettings}>
            {ninosImages.map((image, index) => (
              <div key={index}>
                <img
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

            <p className="text-white/90 leading-relaxed text-lg mb-4">
              La Sociedad de Niños es un ministerio especial dedicado a los más
              pequeños de nuestra congregación. Aquí los niños aprenden las
              historias de la Biblia de manera divertida y apropiada para su
              edad.
            </p>

            <p className="text-white/90 leading-relaxed text-lg">
              Creemos que es fundamental sembrar la semilla del evangelio desde
              temprana edad, formando bases sólidas para su vida espiritual.
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
                    <p className="text-gray-700">
                      Durante los servicios regulares
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Edades</p>
                    <p className="text-gray-700">Hasta 11 años</p>
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
              Lo que aprendemos
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

      {/* SAFETY NOTICE */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="bg-white rounded-lg shadow-md border border-accent/25 overflow-hidden">
          <div className="h-2 bg-accent" />

          <div className="p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-accent">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <div>
              <h2
                className="text-primary text-3xl md:text-4xl mb-4 uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Ambiente Seguro y Protegido
              </h2>

              <p className="text-gray-700 text-lg mb-3 leading-relaxed">
                La seguridad de sus hijos es nuestra prioridad. Todos nuestros
                maestros y voluntarios son personas de confianza comprometidas
                con el bienestar de los niños.
              </p>

              <p className="text-gray-700 text-lg leading-relaxed">
                Mantenemos proporciones apropiadas de adultos por niño y
                seguimos protocolos de seguridad para garantizar un ambiente
                protegido.
              </p>
            </div>
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
            ¡Trae a tus Hijos!
          </h2>

          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Los niños son bienvenidos y queridos en nuestra iglesia. Permítenos
            ayudarte a sembrar la fe en el corazón de tus pequeños.
          </p>

          <button
            type="button"
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

      <SociedadesNavigation currentPage="ninos" />
    </div>
  );
}
