import { Users } from "lucide-react";
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
    },
    {
      title: "A una sociedad necesitada",
      text: "Un auxilio real en el nombre del Señor Jesús.",
    },
    {
      title: "A la iglesia",
      text: "La salvaguarda y buen uso de todos sus recursos.",
    },
    {
      title: "A Dios",
      text: "Nuestra obediencia y adoración por siempre.",
    },
  ];

  const principalPastors = [
    {
      name: "Hermano Jerónimo",
      role: "Pastor Principal",
      description: "Descripción pendiente.",
    },
    {
      name: "Pastor Isui",
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
      name: "Nombre por confirmar",
      role: "Ministerio",
      description: "Descripción pendiente.",
    },
  ];

  const worshipTeamImages = [
    {
      url: worshipTeam1,
      alt: "Ministerio de Música y Alabanza",
    },
    {
      url: worshipTeam2,
      alt: "Ministerio de Música y Alabanza",
    },
    {
      url: worshipTeam3,
      alt: "Ministerio de Música y Alabanza",
    },
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
      name: "Nombre por confirmar",
      role: "Sociedad de Jóvenes",
      description: "Descripción pendiente.",
    },
    {
      name: "Nombre por confirmar",
      role: "Sociedad de Niños",
      description: "Descripción pendiente.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary to-primary/90 text-white py-20 px-10">
        <div className="max-w-6xl mx-auto">
          <h1
            className="text-6xl mb-6 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Nosotros
          </h1>
          <p className="text-xl max-w-3xl leading-relaxed opacity-90">
            Conoce más sobre nuestra iglesia, nuestra misión y el propósito que nos une en Cristo.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-10 py-16">
        <section className="mb-20">
          <h2
            className="text-4xl text-primary mb-6 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Quiénes Somos
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
            Somos una iglesia fundamentada sobre las bases bíblicas que el Señor Jesús estableció,
            depositando en Él una fe genuina y construyendo una comunidad centrada en Cristo.
            Nuestro propósito es predicar el evangelio de Jesús, anunciando que en Él hay salvación
            y perdón de pecados, y que todos pueden encontrar y experimentar el amor de Dios y
            fortalecer su fe en Jesús.
          </p>
        </section>

        <section className="mb-20 bg-gradient-to-br from-accent/10 to-primary/5 p-10 rounded-lg">
          <h2
            className="text-4xl text-primary mb-6 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Nuestra Misión
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mb-8">
            Anunciar el evangelio de Jesús, servir con amor a quienes nos rodean y honrar a Dios
            con nuestra vida y adoración. Nuestra misión se sostiene en cuatro compromisos:
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {missionPoints.map((point, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border-2 border-accent/20"
              >
                <h3
                  className="text-primary text-2xl mb-3 uppercase tracking-wide"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {point.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{point.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            className="text-4xl text-primary mb-12 uppercase tracking-wide text-center"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Nuestro Equipo de Liderazgo
          </h2>

          <div className="mb-16">
            <h3
              className="text-2xl text-primary mb-8 uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Pastores Principales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {principalPastors.map((pastor, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-accent/20 hover:shadow-xl transition-shadow"
                >
                  <div className="bg-gradient-to-br from-primary to-primary/80 h-64 flex items-center justify-center relative">
                    <div
                      className="absolute top-4 right-4 bg-accent text-primary px-4 py-1 rounded-full text-sm uppercase tracking-wide"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {pastor.role}
                    </div>
                    <div className="bg-white/20 w-32 h-32 rounded-full flex items-center justify-center">
                      <Users className="w-16 h-16 text-white" />
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-white to-accent/5">
                    <h4
                      className="text-2xl text-primary mb-2 uppercase tracking-wide"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {pastor.name}
                    </h4>
                    <p
                      className="text-accent mb-4 uppercase text-sm tracking-wide"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {pastor.role}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {pastor.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h3
              className="text-2xl text-primary mb-8 uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Ministerio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ministers.map((minister, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-accent/20 hover:shadow-xl transition-shadow"
                >
                  <div className="bg-gradient-to-br from-accent to-accent/80 h-64 flex items-center justify-center relative">
                    <div
                      className="absolute top-4 right-4 bg-white text-accent px-4 py-1 rounded-full text-sm uppercase tracking-wide"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {minister.role}
                    </div>
                    <div className="bg-white/20 w-32 h-32 rounded-full flex items-center justify-center">
                      <Users className="w-16 h-16 text-white" />
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-white to-primary/5">
                    <h4
                      className="text-2xl text-primary mb-2 uppercase tracking-wide"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {minister.name}
                    </h4>
                    <p
                      className="text-accent mb-4 uppercase text-sm tracking-wide"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {minister.role}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {minister.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h3
              className="text-2xl text-primary mb-8 uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Ministerio de Música y Alabanza
            </h3>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-accent/20">
                <div className="relative">
                  <Slider {...sliderSettings}>
                    {worshipTeamImages.map((image, index) => (
                      <div key={index} className="relative h-96">
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-96 object-cover"
                          style={index === 2 ? { objectPosition: "center 30%" } : {}}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>

                <div className="p-6 bg-gradient-to-br from-white to-primary/5 text-center">
                  <p className="text-gray-700 italic">
                    "La adoración a Dios por medio de la alabanza es un lenguaje de gratitud que sale del corazón."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3
              className="text-2xl text-primary mb-8 uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Líderes de Sociedades
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {societyLeaders.map((leader, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-primary/20 hover:shadow-xl transition-shadow"
                >
                  <div className="bg-gradient-to-br from-primary/80 to-primary/60 h-48 flex items-center justify-center relative">
                    <div
                      className="absolute top-3 right-3 bg-accent text-primary px-3 py-1 rounded-full text-xs uppercase tracking-wide"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      Líder
                    </div>
                    <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-white to-accent/5">
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
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 bg-gradient-to-r from-primary to-primary/90 text-white p-12 rounded-lg text-center">
          <h2
            className="text-4xl mb-4 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Nuestra Comunidad
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Te invitamos a ser parte de nuestra familia. Podemos crecer en fe y hacer una diferencia en nuestra comunidad.
          </p>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="inline-block bg-accent text-primary px-8 py-3 uppercase tracking-wide hover:bg-accent/90 transition-colors"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Contáctanos
          </button>
        </section>
      </div>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}
