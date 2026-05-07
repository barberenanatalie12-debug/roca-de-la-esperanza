import { Users, Calendar, Music, Heart } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { ContactModal } from "../../components/contact-modal";
import { useState, useEffect } from "react";
import { SociedadesNavigation } from "../../components/sociedades-navigation";
import Slider from "react-slick";
import "../../../styles/slick-carousel.css";

export default function SociedadJovenes() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jovenesImages = [
    {
      url: "https://images.unsplash.com/photo-1769755411779-e4c43e7b7742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjB5b3V0aCUyMGdyb3VwJTIwdGVlbnN8ZW58MXx8fHwxNzc0MTQzMzM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Jóvenes en comunidad",
    },
    {
      url: "https://images.unsplash.com/photo-1622598453695-4fbaf151aadc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjB5b3V0aCUyMGdyb3VwJTIwd29yc2hpcHxlbnwxfHx8fDE3NzQzMzI5NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Jóvenes adorando juntos",
    },
    {
      url: "https://images.unsplash.com/photo-1722962674485-d34e69a9a406?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlcnMlMjBiaWJsZSUyMHN0dWR5JTIwY2h1cmNofGVufDF8fHx8MTc3NDMzMjk3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary py-20 px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1
            className="text-accent text-6xl mb-6 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Sociedad de Jóvenes
          </h1>
          <p className="text-white/90 text-xl max-w-3xl mx-auto">
            Una generación apasionada por Cristo, viviendo su fe con propósito y autenticidad.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-20 px-10">
        <div className="max-w-6xl mx-auto">
          {/* Image Gallery Section */}
          <div className="mb-16">
            <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
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
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2
                className="text-primary text-4xl mb-6 uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Acerca de Nuestra Sociedad
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                La Sociedad de Jóvenes es un espacio dinámico donde navegamos juntos los desafíos de esta etapa de vida, apoyándonos mutuamente y fortaleciendo nuestra relación con Dios.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3
                className="text-primary text-3xl mb-6 uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Información de Reuniones
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-primary">Día y Hora:</p>
                    <p className="text-gray-700">Por anunciar</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-primary">Líder:</p>
                    <p className="text-gray-700">Por confirmar</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-primary">Edades:</p>
                    <p className="text-gray-700">12 para arriba</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activities Grid */}
          <h2
            className="text-primary text-4xl mb-8 text-center uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Nuestras Actividades
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Music className="w-6 h-6 text-accent" />
              </div>
              <h3
                className="text-primary text-2xl mb-3 uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Estudios Relevantes
              </h3>
              <p className="text-gray-700">
                Exploramos temas bíblicos aplicables a la vida universitaria, profesional y relaciones.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h3
                className="text-primary text-2xl mb-3 uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Conexión Genuina
              </h3>
              <p className="text-gray-700">
                Creamos espacios informales donde compartir nuestras vidas, desafíos y victorias con autenticidad.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3
                className="text-primary text-2xl mb-3 uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Impacto
              </h3>
              <p className="text-gray-700">
                Participamos en proyectos de servicio y alcance, poniendo nuestra fe en acción en la comunidad.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-accent/10 py-16 px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-primary text-5xl mb-6 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            ¡Únete a Nosotros!
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Ven y sé parte de esta comunidad de jóvenes que viven su fe con pasión y propósito.
          </p>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="inline-block bg-accent text-primary px-8 py-4 uppercase tracking-wide hover:bg-accent/90 transition-colors text-lg"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Contáctanos
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        email="iglesiarocadelaesperanza25@gmail.com"
      />

      {/* Navigation to other Sociedades */}
      <SociedadesNavigation currentPage="jovenes" />
    </div>
  );
}