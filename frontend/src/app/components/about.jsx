import { Link } from "react-router";

export function About() {
  return (
    <section id="about" className="py-20 px-10 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-primary text-4xl md:text-5xl mb-6 uppercase tracking-wide"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Una iglesia que ofrece ayuda real en el nombre de Jesús
        </h2>

        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Somos una iglesia centrada en Cristo, fundamentada en la Palabra de Dios, donde las
          personas pueden encontrar fe, comunidad, sanidad, perdón y salvación en Jesús.
        </p>

        <Link
          to="/nosotros"
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors uppercase tracking-wide"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Conoce más sobre nosotros
        </Link>
      </div>
    </section>
  );
}
