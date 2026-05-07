import { Book } from "lucide-react";

export default function EnQueCreemos() {
  const doctrines = [
    {
      title: "Punto Doctrinal 1",
      content: "Contenido pendiente.",
    },
    {
      title: "Punto Doctrinal 2",
      content: "Contenido pendiente.",
    },
    {
      title: "Punto Doctrinal 3",
      content: "Contenido pendiente.",
    },
    {
      title: "Punto Doctrinal 4",
      content: "Contenido pendiente.",
    },
    {
      title: "Punto Doctrinal 5",
      content: "Contenido pendiente.",
    },
    {
      title: "Punto Doctrinal 6",
      content: "Contenido pendiente.",
    },
    {
      title: "Punto Doctrinal 7",
      content: "Contenido pendiente.",
    },
    {
      title: "Punto Doctrinal 8",
      content: "Contenido pendiente.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center px-4 md:px-6">
          <h1
            className="text-white text-4xl md:text-6xl mb-4 md:mb-6 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            En Qué Creemos
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
            Conoce los fundamentos doctrinales de nuestra fe.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border-l-4 border-accent">
            <h2
              className="text-primary text-2xl md:text-3xl mb-4 uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Nuestra Base Doctrinal
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Basamos nuestra fe en ocho puntos doctrinales fundamentales centrados en la
              autoridad de la Biblia, la Trinidad, la salvación por Cristo Jesús y la santificación
              del creyente.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 md:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {doctrines.map((doctrine, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <div className="bg-gradient-to-r from-primary to-accent p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                      <Book className="w-8 h-8 text-white" />
                    </div>
                    <h3
                      className="text-white text-xl md:text-2xl uppercase tracking-wide"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {doctrine.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed italic">
                    {doctrine.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-accent/10 rounded-lg p-8 md:p-12 border border-accent/20">
            <h2
              className="text-primary text-2xl md:text-3xl mb-4 uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Nuestra Invitación
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              Si tienes preguntas o deseas aprender más sobre lo que creemos, te invitamos a
              visitarnos o contactarnos directamente.
            </p>
            <a
              href="/contacto"
              className="inline-block bg-accent text-white px-8 py-3 rounded-lg hover:bg-accent/90 transition-colors uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Contáctanos
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
