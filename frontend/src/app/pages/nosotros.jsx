import {
  Church,
  Cross,
  HeartHandshake,
  Music,
  ShieldCheck,
  Users,
} from "lucide-react";
import { ContactModal } from "../components/contact-modal";
import { useState } from "react";
import Slider from "react-slick";
import "../../styles/slick-carousel.css";

const worshipTeam1 = "/images/worship-team-1.png";
const worshipTeam2 = "/images/worship-team-2.png";
const worshipTeam3 = "/images/worship-team-3.png";

export default function Nosotros() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const missionPoints = [
    {
      title: "A un mundo perdido",
      text:
        "La predicación del evangelio para perdón de pecados, dando a conocer el amor del Padre por medio de Cristo Jesús, en quien encontramos salvación y vida eterna.",
      icon: Cross,
    },
    {
      title: "A una sociedad necesitada",
      text: "Un auxilio real en el nombre del Señor Jesús.",
      icon: HeartHandshake,
    },
    {
      title: "A la iglesia",
      text: "La salvaguarda y buen uso de todos sus recursos.",
      icon: ShieldCheck,
    },
    {
      title: "A Dios",
      text: "Nuestra obediencia y adoración por siempre.",
      icon: Church,
    },
  ];

  const principalPastors = [
    {
      name: "Hno Gerónimo",
      role: "Pastor ",
      description: "Descripción pendiente.",
    },
    {
      name: "Hno Isui",
      role: "Pastor",
      description: "Descripción pendiente.",
    },
  ];

  const ministers = [
    {
      name: "Alejandro",
      role: "Pastor de Jóvenes",
      description: "Descripción pendiente.",
    },
    {
      name: "Hna Zulema",
      role: "Ministerio",
      description: "Descripción pendiente.",
    },
  ];

  const worshipTeamImages = [
    { url: worshipTeam1, alt: "Ministerio de Música y Alabanza" },
    { url: worshipTeam2, alt: "Ministerio de Música y Alabanza" },
    { url: worshipTeam3, alt: "Ministerio de Música y Alabanza" },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const societyLeaders = [
    {
      name: "Hermano Fabián",
      role: "Sociedad de Varones",
      description: "Descripción pendiente.",
    },
    {
      name: "Nombre por confirmar",
      role: "Sociedad de Damas",
      description: "Descripción pendiente.",
    },
    {
      name: "Hno Uziel",
      role: "Sociedad de Jóvenes",
      description: "Descripción pendiente.",
    },
    {
      name: "Hna Silvia",
      role: "Sociedad de Niños",
      description: "Descripción pendiente.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-white border-t-4 border-accent">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-16">
          <p className="text-sm uppercase tracking-[0.26em] text-accent font-semibold mb-4">
            Nuestra iglesia
          </p>

          <h1
            className="text-5xl md:text-6xl mb-5 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Nosotros
          </h1>

          <p className="text-lg md:text-xl max-w-3xl leading-relaxed text-white/90">
            Conoce más sobre nuestra iglesia, nuestra misión, nuestro equipo y
            el propósito que nos une en Cristo.
          </p>

          <div className="mt-8 h-1 w-28 bg-accent" />
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <div className="rounded-lg bg-gradient-to-br from-primary to-primary/90 text-white p-8 md:p-10 border border-primary/80">
            <p className="text-accent uppercase tracking-[0.26em] text-sm font-semibold mb-3">
              Identidad
            </p>

            <h2
              className="text-4xl md:text-5xl uppercase tracking-wide mb-5"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Quiénes Somos
            </h2>

            <div className="h-1 w-16 bg-accent mb-6" />

            <p
              className="text-white/90 leading-relaxed text-xl italic mb-5"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              “Mas vosotros sois linaje escogido, real sacerdocio, nación santa,
              pueblo adquirido por Dios.”
            </p>

            <p className="text-accent uppercase tracking-[0.22em] text-sm font-semibold">
              1 Pedro 2:9
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-accent/25 p-7 md:p-9">
            <p className="text-gray-700 text-lg leading-relaxed">
              Somos una iglesia fundamentada sobre las bases bíblicas que el
              Señor Jesús estableció, depositando en Él una fe genuina y
              construyendo una comunidad centrada en Cristo. Nuestro propósito
              es predicar el evangelio de Jesús, anunciando que en Él hay
              salvación y perdón de pecados, y que todos pueden encontrar y
              experimentar el amor de Dios y fortalecer su fe en Jesús.
            </p>

            <div className="mt-7 grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg bg-accent/10 border border-accent/25 p-5">
                <p
                  className="text-primary text-2xl uppercase tracking-wide mb-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Comunidad
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Una familia espiritual donde caminamos juntos en fe.
                </p>
              </div>

              <div className="rounded-lg bg-primary/5 border border-primary/15 p-5">
                <p
                  className="text-primary text-2xl uppercase tracking-wide mb-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Propósito
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Anunciar a Cristo y fortalecer la fe de quienes se acercan a
                  Dios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISIÓN */}
      <section className="bg-gradient-to-br from-accent/15 via-white to-primary/10 border-y border-accent/25">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
          <div className="mb-12 max-w-4xl">
            <p className="text-sm uppercase tracking-[0.26em] text-accent font-semibold mb-4">
              Nuestro propósito en acción
            </p>

            <h2
              className="text-4xl md:text-5xl text-primary uppercase tracking-wide mb-5"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Nuestra Misión
            </h2>

            <p className="text-gray-700 leading-relaxed text-lg">
              Nuestra misión expresa cómo vivimos como iglesia lo que creemos en
              Cristo: predicar el evangelio, servir a quienes nos rodean, cuidar
              lo que Dios ha puesto en nuestras manos y honrarle con obediencia
              y adoración.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {missionPoints.map((point, index) => {
              const Icon = point.icon;

              return (
                <article
                  key={point.title}
                  className="bg-white rounded-lg shadow-md border border-accent/25 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`h-2 ${
                      index % 2 === 0 ? "bg-accent" : "bg-primary"
                    }`}
                  />

                  <div className="p-7">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h3
                        className="text-2xl uppercase tracking-wide text-primary"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {point.title}
                      </h3>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      {point.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* LIDERAZGO */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.26em] text-accent font-semibold mb-4">
            Quienes sirven
          </p>

          <h2
            className="text-4xl md:text-5xl text-primary uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Nuestro Equipo de Liderazgo
          </h2>
        </div>

        {/* Pastores Principales */}
        <div className="mb-14">
          <h3
            className="text-3xl text-primary mb-7 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Pastores Principales
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {principalPastors.map((pastor) => (
              <article
                key={pastor.name}
                className="bg-white rounded-lg shadow-md border border-accent/25 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-2 bg-accent" />

                <div className="bg-gradient-to-br from-primary to-primary/90 h-56 flex items-center justify-center relative">
                  <div
                    className="absolute top-4 right-4 bg-accent text-primary px-4 py-1 rounded-full text-sm uppercase tracking-wide"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {pastor.role}
                  </div>

                  <div className="bg-white/15 w-28 h-28 rounded-full flex items-center justify-center border border-white/25">
                    <Users className="w-14 h-14 text-white" />
                  </div>
                </div>

                <div className="p-6">
                  <h4
                    className="text-2xl text-primary mb-1 uppercase tracking-wide"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {pastor.name}
                  </h4>

                  <p
                    className="text-accent mb-3 uppercase text-sm tracking-wide"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {pastor.role}
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    {pastor.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Ministerio */}
        <div className="mb-14">
          <h3
            className="text-3xl text-primary mb-7 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Ministerio
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {ministers.map((minister) => (
              <article
                key={minister.name}
                className="bg-white rounded-lg shadow-md border border-accent/25 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-2 bg-primary" />

                <div className="bg-gradient-to-br from-accent/90 to-accent h-56 flex items-center justify-center relative">
                  <div
                    className="absolute top-4 right-4 bg-white text-primary px-4 py-1 rounded-full text-sm uppercase tracking-wide"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {minister.role}
                  </div>

                  <div className="bg-white/20 w-28 h-28 rounded-full flex items-center justify-center border border-white/30">
                    <Users className="w-14 h-14 text-white" />
                  </div>
                </div>

                <div className="p-6">
                  <h4
                    className="text-2xl text-primary mb-1 uppercase tracking-wide"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {minister.name}
                  </h4>

                  <p
                    className="text-accent mb-3 uppercase text-sm tracking-wide"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {minister.role}
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    {minister.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Música y Alabanza */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center">
              <Music size={20} />
            </div>

            <h3
              className="text-3xl text-primary uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Ministerio de Música y Alabanza
            </h3>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md border border-accent/25 overflow-hidden">
              <div className="h-2 bg-accent" />

              <Slider {...sliderSettings}>
                {worshipTeamImages.map((image, index) => (
                  <div key={index} className="relative h-96">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-96 object-cover"
                      style={
                        index === 2 ? { objectPosition: "center 30%" } : {}
                      }
                    />
                  </div>
                ))}
              </Slider>

              <div className="p-6 text-center bg-gradient-to-br from-white to-accent/5">
                <p className="text-gray-700 italic">
                  "La adoración a Dios por medio de la alabanza es un lenguaje
                  de gratitud que sale del corazón."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Líderes de Sociedades */}
        <div>
          <h3
            className="text-3xl text-primary mb-7 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Líderes de Sociedades
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {societyLeaders.map((leader, index) => (
              <article
                key={`${leader.name}-${index}`}
                className="bg-white rounded-lg shadow-md border border-accent/25 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div
                  className={`h-2 ${
                    index % 2 === 0 ? "bg-accent" : "bg-primary"
                  }`}
                />

                <div className="bg-gradient-to-br from-primary/90 to-primary/70 h-44 flex items-center justify-center relative">
                  <div
                    className="absolute top-3 right-3 bg-accent text-primary px-3 py-1 rounded-full text-xs uppercase tracking-wide"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Líder
                  </div>

                  <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center border border-white/30">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                </div>

                <div className="p-5">
                  <h4
                    className="text-lg text-primary mb-1 uppercase tracking-wide"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {leader.name}
                  </h4>

                  <p
                    className="text-accent mb-3 uppercase text-xs tracking-wide"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {leader.role}
                  </p>

                  <p className="text-gray-700 text-sm leading-relaxed">
                    {leader.description}
                  </p>
                </div>
              </article>
            ))}
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
            Nuestra Comunidad
          </h2>

          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Te invitamos a ser parte de nuestra familia. Podemos crecer en fe y
            hacer una diferencia en nuestra comunidad.
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
      />
    </div>
  );
}