import { Users, Calendar, Heart, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
const damasImage = "/images/damas-1.png";
const damasImage2 = "/images/damas-2.png";
import { ContactModal } from "../../components/contact-modal";
import { useState, useEffect } from "react";
import { SociedadesNavigation } from "../../components/sociedades-navigation";
import Slider from "react-slick";
import "../../../styles/slick-carousel.css";
export default function SociedadDamas() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    // Scroll to top when page loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const damasImages = [
        { url: damasImage, alt: "Mujeres en adoración" },
        { url: damasImage2, alt: "Compañerismo de mujeres" }
    ];
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true
    };
    return (<div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary py-20 px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-accent text-6xl mb-6 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Sociedad de Damas
          </h1>
          <p className="text-white/90 text-xl max-w-3xl mx-auto">
            Mujeres de fe, fortaleza y gracia, sirviendo juntas en el amor de Cristo.
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
                {damasImages.map((image, index) => (<div key={index}>
                    <img src={image.url} alt={image.alt} className="w-full h-96 object-cover"/>
                  </div>))}
              </Slider>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-primary text-4xl mb-6 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Acerca de Nuestra Sociedad
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                La Sociedad de Damas es un grupo dedicado a las mujeres de nuestra congregación, un espacio donde podemos crecer espiritualmente, apoyarnos mutuamente y desarrollar nuestros dones.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Juntas buscamos ser mujeres conforme al corazón de Dios, impactando nuestras familias, iglesia y comunidad.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-primary text-3xl mb-6 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Información de Reuniones
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-6 h-6 text-accent mt-1 flex-shrink-0"/>
                  <div>
                    <p className="font-semibold text-primary">Día y Hora:</p>
                    <p className="text-gray-700">Por anunciar</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-accent mt-1 flex-shrink-0"/>
                  <div>
                    <p className="font-semibold text-primary">Líder:</p>
                    <p className="text-gray-700">Por confirmar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activities Grid */}
          <h2 className="text-primary text-4xl mb-8 text-center uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Nuestras Actividades
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-accent"/>
              </div>
              <h3 className="text-primary text-2xl mb-3 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Estudios Bíblicos
              </h3>
              <p className="text-gray-700">
                Exploramos la Palabra de Dios con estudios diseñados para la mujer cristiana de hoy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent"/>
              </div>
              <h3 className="text-primary text-2xl mb-3 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Compañerismo
              </h3>
              <p className="text-gray-700">
                Compartimos nuestras vidas, experiencias y testimonios en un ambiente de amor y confidencialidad.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-accent"/>
              </div>
              <h3 className="text-primary text-2xl mb-3 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Ministerio
              </h3>
              <p className="text-gray-700">
                Servimos activamente en la iglesia y alcanzamos a otras mujeres con el amor de Cristo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-accent/10 py-16 px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-primary text-5xl mb-6 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            ¡Únete a Nosotros!
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Te invitamos a ser parte de esta hermosa comunidad de mujeres. Juntas crecemos, nos apoyamos y servimos al Señor.
          </p>
          <a href="#" className="inline-block bg-accent text-primary px-8 py-4 uppercase tracking-wide hover:bg-accent/90 transition-colors text-lg" style={{ fontFamily: "'Bebas Neue', sans-serif" }} onClick={() => setIsContactModalOpen(true)}>
            Contáctanos
          </a>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} email="iglesiarocadelaesperanza25@gmail.com"/>

      {/* Navigation to other Sociedades */}
      <SociedadesNavigation currentPage="damas"/>
    </div>);
}
