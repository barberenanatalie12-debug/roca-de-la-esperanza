import { Users, Calendar, Dumbbell, Shield } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
const varonesImage = "/images/varones-1.png";
const varonesImage2 = "/images/varones-2.png";
import { ContactModal } from "../../components/contact-modal";
import { useState, useEffect } from "react";
import { SociedadesNavigation } from "../../components/sociedades-navigation";
import Slider from "react-slick";
import "../../../styles/slick-carousel.css";
export default function SociedadVarones() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    // Scroll to top when page loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const varonesImages = [
        { url: varonesImage, alt: "Hombres en oración y compañerismo" },
        { url: varonesImage2, alt: "Estudio bíblico de varones" }
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
            Sociedad de Varones
          </h1>
          <p className="text-white/90 text-xl max-w-3xl mx-auto">
            Fortaleciendo hombres de fe, líderes en sus hogares y siervos en la iglesia.
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
                {varonesImages.map((image, index) => (<div key={index}>
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
                La Sociedad de Varones es un espacio donde los hombres de nuestra congregación se reúnen para crecer espiritualmente, rendirse cuentas mutuamente y apoyarse en su caminar con Cristo.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Buscamos formar hombres de carácter, comprometidos con Dios, sus familias y la obra del Reino.
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
                <Shield className="w-6 h-6 text-accent"/>
              </div>
              <h3 className="text-primary text-2xl mb-3 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Estudios Bíblicos
              </h3>
              <p className="text-gray-700">
                Profundizamos en la Palabra de Dios con temas relevantes para el hombre de hoy: liderazgo, paternidad, integridad.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent"/>
              </div>
              <h3 className="text-primary text-2xl mb-3 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Mentoría
              </h3>
              <p className="text-gray-700">
                Nos apoyamos mutuamente en nuestros desafíos, compartiendo experiencias y rindiendo cuentas en amor.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Dumbbell className="w-6 h-6 text-accent"/>
              </div>
              <h3 className="text-primary text-2xl mb-3 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Servicio
              </h3>
              <p className="text-gray-700">
                Participamos activamente en proyectos de servicio a la iglesia y la comunidad, poniendo en práctica nuestra fe.
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
            Te invitamos a ser parte de esta hermandad de hombres comprometidos con Cristo. Juntos somos más fuertes.
          </p>
          <a href="#" className="inline-block bg-accent text-primary px-8 py-4 uppercase tracking-wide hover:bg-accent/90 transition-colors text-lg" style={{ fontFamily: "'Bebas Neue', sans-serif" }} onClick={() => setIsContactModalOpen(true)}>
            Contáctanos
          </a>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} email="iglesiarocadelaesperanza25@gmail.com"/>

      {/* Navigation to other Sociedades */}
      <SociedadesNavigation currentPage="varones"/>
    </div>);
}
