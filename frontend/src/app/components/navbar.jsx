import { Youtube, Instagram, Facebook, Menu, X, ChevronDown } from "lucide-react";
import logo from "../../images/ICIAR-Logo.png";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSociedadesOpen, setIsSociedadesOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    // Handle scrolling to sections when hash changes
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            setTimeout(() => {
                const element = document.getElementById(id);
                element?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [location]);
    const scrollToSection = (id) => {
        // If we're not on the home page, navigate there first
        if (location.pathname !== "/") {
            navigate(`/#${id}`);
            return;
        }
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
    };
    const closeMenu = () => {
        setIsMobileMenuOpen(false);
    };
    return (<nav className="bg-white px-4 sm:px-6 md:px-10 py-3 md:py-4 sticky top-0 z-50 shadow-sm">
      {/* Main navbar */}
      <div className="flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-2 md:gap-4 flex-shrink min-w-0">
          <img src={logo} alt="Iglesia Roca de la Esperanza Logo" className="h-12 w-12 md:h-16 md:w-16 flex-shrink-0"/>
          <div className="text-primary tracking-wide text-sm sm:text-base md:text-xl truncate" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            IGLESIA ROCA DE LA ESPERANZA
          </div>
        </Link>
        
        <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
          <Link to="/nosotros" className="hidden sm:block text-primary hover:text-accent transition-colors uppercase tracking-wide text-sm md:text-base" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Nosotros
          </Link>
          <Link to="/contacto" className="hidden sm:block text-primary hover:text-accent transition-colors uppercase tracking-wide text-sm md:text-base" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Conéctate
          </Link>
          
          {/* Hamburger Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-primary hover:text-accent transition-colors" aria-label="Menu">
            {isMobileMenuOpen ? <X className="w-6 h-6 md:w-8 md:h-8"/> : <Menu className="w-6 h-6 md:w-8 md:h-8"/>}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (<div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200">
          <div className="flex flex-col py-4">
            <Link to="/" onClick={closeMenu} className="text-left px-4 sm:px-10 py-4 text-primary hover:bg-accent/10 hover:text-accent transition-colors uppercase tracking-wide text-lg sm:text-xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Inicio
            </Link>
            <Link to="/nosotros" onClick={closeMenu} className="sm:hidden text-left px-4 sm:px-10 py-4 text-primary hover:bg-accent/10 hover:text-accent transition-colors uppercase tracking-wide text-lg sm:text-xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Nosotros
            </Link>
            <Link to="/en-que-creemos" onClick={closeMenu} className="text-left px-4 sm:px-10 py-4 text-primary hover:bg-accent/10 hover:text-accent transition-colors uppercase tracking-wide text-lg sm:text-xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              En Qué Creemos
            </Link>
            <Link to="/sermones" onClick={closeMenu} className="text-left px-4 sm:px-10 py-4 text-primary hover:bg-accent/10 hover:text-accent transition-colors uppercase tracking-wide text-lg sm:text-xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Sermones
            </Link>
            <Link to="/eventos" onClick={closeMenu} className="text-left px-4 sm:px-10 py-4 text-primary hover:bg-accent/10 hover:text-accent transition-colors uppercase tracking-wide text-lg sm:text-xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Eventos
            </Link>
            
            {/* Sociedades Dropdown */}
            <div>
              <button onClick={() => setIsSociedadesOpen(!isSociedadesOpen)} className="w-full text-left px-4 sm:px-10 py-4 text-primary hover:bg-accent/10 hover:text-accent transition-colors uppercase tracking-wide text-lg sm:text-xl flex items-center justify-between" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Sociedades
                <ChevronDown className={`w-5 h-5 transition-transform ${isSociedadesOpen ? 'rotate-180' : ''}`}/>
              </button>
              {isSociedadesOpen && (<div className="bg-accent/5 overflow-hidden">
                  <Link to="/sociedades/varones" onClick={closeMenu} className="block px-6 sm:px-14 py-3 text-primary hover:bg-accent/10 hover:text-accent transition-colors text-base sm:text-lg animate-[slideInRight_0.3s_ease-out]" style={{ animationDelay: '0s' }}>
                    Sociedad de Varones
                  </Link>
                  <Link to="/sociedades/damas" onClick={closeMenu} className="block px-6 sm:px-14 py-3 text-primary hover:bg-accent/10 hover:text-accent transition-colors text-base sm:text-lg animate-[slideInRight_0.3s_ease-out]" style={{ animationDelay: '0.05s' }}>
                    Sociedad de Damas
                  </Link>
                  <Link to="/sociedades/jovenes" onClick={closeMenu} className="block px-6 sm:px-14 py-3 text-primary hover:bg-accent/10 hover:text-accent transition-colors text-base sm:text-lg animate-[slideInRight_0.3s_ease-out]" style={{ animationDelay: '0.1s' }}>
                    Sociedad de Jóvenes
                  </Link>
                  <Link to="/sociedades/ninos" onClick={closeMenu} className="block px-6 sm:px-14 py-3 text-primary hover:bg-accent/10 hover:text-accent transition-colors text-base sm:text-lg animate-[slideInRight_0.3s_ease-out]" style={{ animationDelay: '0.15s' }}>
                    Sociedad de Niños
                  </Link>
                </div>)}
            </div>
            
            <Link to="/apoyo-donaciones" onClick={closeMenu} className="text-left px-4 sm:px-10 py-4 text-primary hover:bg-accent/10 hover:text-accent transition-colors uppercase tracking-wide text-lg sm:text-xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Apoyo y Donaciones
            </Link>
            <Link to="/contacto" onClick={closeMenu} className="sm:hidden text-left px-4 sm:px-10 py-4 text-primary hover:bg-accent/10 hover:text-accent transition-colors uppercase tracking-wide text-lg sm:text-xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Conéctate
            </Link>
          </div>
        </div>)}
    </nav>);
}
