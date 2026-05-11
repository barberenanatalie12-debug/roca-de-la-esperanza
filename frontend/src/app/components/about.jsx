import { Link } from "react-router";

export function About() {
  return (
    <section id="about" className="relative px-6 py-20 md:px-10">
      <div className="absolute left-0 top-1/2 hidden h-32 w-2 -translate-y-1/2 bg-accent md:block" />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.26em] text-accent">
              Nuestra iglesia
            </p>

            <h2
              className="text-4xl uppercase tracking-wide text-primary md:text-5xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Una iglesia que ofrece ayuda real en el nombre de Jesús
            </h2>
          </div>

          <div className="border-l-4 border-accent pl-6 md:pl-8">
            <p className="mb-8 text-lg leading-relaxed text-gray-700">
              Somos una iglesia centrada en Cristo, fundamentada en la Palabra
              de Dios, donde las personas pueden encontrar fe, comunidad,
              sanidad, perdón y salvación en Jesús.
            </p>

            <Link
              to="/nosotros"
              className="inline-block bg-primary px-8 py-3 uppercase tracking-wide text-white transition-colors hover:bg-primary/90"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Conoce más sobre nosotros
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}