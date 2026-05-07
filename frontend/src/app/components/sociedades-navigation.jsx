import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
const sociedadesOrder = [
    { path: "/sociedades/varones", name: "Sociedad de Varones" },
    { path: "/sociedades/damas", name: "Sociedad de Damas" },
    { path: "/sociedades/jovenes", name: "Sociedad de Jóvenes" },
    { path: "/sociedades/ninos", name: "Sociedad de Niños" },
];
export function SociedadesNavigation({ currentPage }) {
    const currentIndex = sociedadesOrder.findIndex((s) => s.path.includes(currentPage));
    const previousPage = currentIndex > 0 ? sociedadesOrder[currentIndex - 1] : null;
    const nextPage = currentIndex < sociedadesOrder.length - 1
        ? sociedadesOrder[currentIndex + 1]
        : null;
    return (<div className="flex justify-between items-center py-6 md:py-8 px-4 md:px-10 bg-white border-t-2 border-accent/20">
      <div className="flex-1">
        {previousPage && (<Link to={previousPage.path} className="inline-flex items-center gap-1 md:gap-2 text-primary hover:text-accent transition-colors group">
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform flex-shrink-0"/>
            <div className="text-left">
              <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wide">Anterior</p>
              <p className="text-sm md:text-lg uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {previousPage.name}
              </p>
            </div>
          </Link>)}
      </div>

      <div className="flex-1 text-right">
        {nextPage && (<Link to={nextPage.path} className="inline-flex items-center gap-1 md:gap-2 text-primary hover:text-accent transition-colors group">
            <div className="text-right">
              <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wide">Siguiente</p>
              <p className="text-sm md:text-lg uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {nextPage.name}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0"/>
          </Link>)}
      </div>
    </div>);
}
