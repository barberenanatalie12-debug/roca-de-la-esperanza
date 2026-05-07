import { Users, Calendar, Star, Smile } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
const ninosImage = "/images/ninos-1.png";
import { ContactModal } from "../../components/contact-modal";
import { useState, useEffect } from "react";
import { SociedadesNavigation } from "../../components/sociedades-navigation";
import Slider from "react-slick";
import "../../../styles/slick-carousel.css";
export default function SociedadNinos() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    // Scroll to top when page loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const ninosImages = [
        {
            url: ninosImage,
            alt: "Niños felices aprendiendo"
        },
        {
            url: "https://images.unsplash.com/photo-1565425518476-3229123699c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGNodXJjaCUyMGFjdGl2aXRpZXMlMjBoYXBweXxlbnwxfHx8fDE3NzQzMzI5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            alt: "Niños en actividades de iglesia"
        },
        {
            url: "https://images.unsplash.com/photo-1758687126753-3fc546c4ee67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwc3VuZGF5JTIwc2Nob29sJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzc0MzMyOTk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            alt: "Niños aprendiendo en escuela dominical"
        }
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
            Sociedad de Niños
          </h1>
          <p className="text-white/90 text-xl max-w-3xl mx-auto">
            Un lugar alegre y seguro donde los niños aprenden del amor de Jesús.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-20 px-10">
        <div className="max-w-6xl mx-auto">
          {/* Image Section */}
          <div className="mb-16">
            <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
              <Slider {...sliderSettings}>
                {ninosImages.map((image, index) => (<div key={index}>
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
                La Sociedad de Niños es un ministerio especial dedicado a los más pequeños de nuestra congregación. Aquí los niños aprenden las historias de la Biblia de manera divertida y apropiada para su edad.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Creemos que es fundamental sembrar la semilla del evangelio desde temprana edad, formando bases sólidas para su vida espiritual.
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
                    <p className="text-gray-700">Durante los servicios regulares</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-accent mt-1 flex-shrink-0"/>
                  <div>
                    <p className="font-semibold text-primary">Edades:</p>
                    <p className="text-gray-700">Hasta 11 años</p>
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
                <Star className="w-6 h-6 text-accent"/>
              </div>
              <h3 className="text-primary text-2xl mb-3 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Historias Bíblicas
              </h3>
              <p className="text-gray-700">
                Enseñamos las grandes historias de la Biblia de manera visual, interactiva y memorable para los niños.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Smile className="w-6 h-6 text-accent"/>
              </div>
              <h3 className="text-primary text-2xl mb-3 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Juegos y Música
              </h3>
              <p className="text-gray-700">
                Canciones, alabanza y juegos que hacen el aprendizaje divertido y lleno de alegría.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent"/>
              </div>
              <h3 className="text-primary text-2xl mb-3 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Manualidades
              </h3>
              <p className="text-gray-700">
                Actividades creativas y artísticas que refuerzan las lecciones bíblicas de manera práctica.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="bg-white py-16 px-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-primary text-4xl mb-6 text-center uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Ambiente Seguro y Protegido
          </h2>
          <p className="text-gray-700 text-lg text-center mb-4">
            La seguridad de sus hijos es nuestra prioridad. Todos nuestros maestros y voluntarios son personas de confianza comprometidas con el bienestar de los niños.
          </p>
          <p className="text-gray-700 text-lg text-center">
            Mantenemos proporciones apropiadas de adultos por niño y seguimos protocolos de seguridad para garantizar un ambiente protegido.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-accent/10 py-16 px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-primary text-5xl mb-6 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            ¡Trae a tus Hijos!
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Los niños son bienvenidos y queridos en nuestra iglesia. Permítenos ayudarte a sembrar la fe en el corazón de tus pequeños.
          </p>
          <button onClick={() => setIsContactModalOpen(true)} className="inline-block bg-accent text-primary px-8 py-4 uppercase tracking-wide hover:bg-accent/90 transition-colors text-lg" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Contáctanos
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} email="iglesiarocadelaesperanza25@gmail.com"/>

      {/* Navigation to other Sociedades */}
      <SociedadesNavigation currentPage="ninos"/>
    </div>);
}
