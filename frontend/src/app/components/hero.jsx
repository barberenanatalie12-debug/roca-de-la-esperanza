const churchImage = "/images/church.jpg";
import { Link } from "react-router";
export function Hero() {
    return (<section id="home" className="min-h-[500px] md:min-h-[600px] bg-primary flex items-center px-4 md:px-6 lg:px-10 py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6 md:space-y-8">
          <h1 className="text-white leading-tight">
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-3 md:mb-4 tracking-wide" style={{
            fontFamily: "'Cinzel', serif",
            fontWeight: 900,
            letterSpacing: '0.05em',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
              Iglesia Roca de la Esperanza
            </span>
            <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide italic" style={{
            fontFamily: "'Cinzel', serif",
            fontWeight: 700,
            letterSpacing: '0.03em'
        }}>
              Una iglesia que ofrece ayuda real en el nombre de Jesús
            </span>
          </h1>
          <p className="text-white/90 text-base md:text-lg max-w-lg leading-relaxed">
            En <strong className="text-accent">Iglesia Roca de la Esperanza</strong> damos la bienvenida a todo aquel
            que quiera tener un encuentro con Dios por medio de Jesús, en quien encontrará sanidad, perdón y salvación.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Link to="/contacto" className="bg-accent text-white px-6 md:px-8 py-3 rounded-lg hover:bg-accent/90 transition-colors uppercase tracking-wide text-center text-sm md:text-base" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Mantente Conectado
            </Link>
            <Link to="/nosotros" className="bg-white/10 backdrop-blur-sm text-white px-6 md:px-8 py-3 rounded-lg hover:bg-white/20 transition-colors uppercase tracking-wide border border-white/20 text-center text-sm md:text-base" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Conoce Más
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] hidden sm:block">
          <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
            <img src={churchImage} alt="Iglesia Roca de la Esperanza Church Building" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"/>
          </div>
        </div>
      </div>
    </section>);
}
