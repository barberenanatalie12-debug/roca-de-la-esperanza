import {
  BookOpen,
  Cross,
  Crown,
  Flame,
  HeartHandshake,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

export default function EnQueCreemos() {
  const doctrines = [
    {
      title: "La Personalidad de Dios",
      verse: "Jn. 3:16",
      text: "Creemos que Dios es un Ser personal, con inteligencia, sentimiento y voluntad. Él piensa, ama, gobierna, corrige y se revela al hombre como Creador, Señor y Padre eterno.",
      icon: Sparkles,
    },
    {
      title: "La Biblia",
      verse: "2 Ti. 3:16",
      text: "Creemos que la Biblia es la Palabra de Dios, inspirada divinamente, y por lo tanto la única regla de nuestra fe y conducta.",
      icon: BookOpen,
    },
    {
      title: "Cristo el Salvador",
      verse: "Jn. 3:16",
      text: "Creemos que Jesucristo es el Hijo de Dios, enviado por el Padre para salvar al hombre. Por su muerte y resurrección recibimos perdón, justificación y vida nueva.",
      icon: Cross,
    },
    {
      title: "La Santificación",
      verse: "1 Ts. 5:23",
      text: "Creemos que la santificación es parte indispensable de la salvación. Es una obra de Dios en el creyente y una vida apartada para Él.",
      icon: HeartHandshake,
    },
    {
      title: "El Bautismo con el Espíritu Santo",
      verse: "Hch. 1:8",
      text: "Creemos en el bautismo con el Espíritu Santo y fuego, concedido por Jesucristo como una experiencia de poder para servir, testificar y vivir lleno del Espíritu.",
      icon: Flame,
    },
    {
      title: "Jesucristo el Sanador",
      verse: "Mt. 8:17",
      text: "Creemos que el Señor Jesucristo es el sanador de nuestros cuerpos mortales y que su poder alcanza nuestras necesidades conforme a su voluntad.",
      icon: Stethoscope,
    },
    {
      title: "La Segunda Venida de Cristo",
      verse: "1 Ts. 4:16",
      text: "Creemos en la segunda venida de nuestro Señor Jesucristo. Esta esperanza anima a la iglesia a vivir preparada, fiel y constante.",
      icon: Crown,
    },
    {
      title: "La Resurrección y la Vida Eterna",
      verse: "Jn. 11:25",
      text: "Creemos en la resurrección y la inmortalidad del creyente. En Cristo tenemos esperanza eterna porque Él venció la muerte.",
      icon: ShieldCheck,
    },
  ];

  const beliefSummary = [
    {
      title: "Nuestra fe tiene fundamento",
      text: "No se basa solamente en tradición o costumbre, sino en la revelación de Dios por medio de su Palabra.",
      icon: ScrollText,
    },
    {
      title: "Nuestra fe tiene centro",
      text: "Todo apunta a Jesucristo: su divinidad, su obra salvadora, su poder y su regreso prometido.",
      icon: Cross,
    },
    {
      title: "Nuestra fe transforma la vida",
      text: "La salvación produce una vida nueva, marcada por santidad, obediencia, amor y dependencia del Espíritu Santo.",
      icon: Flame,
    },
  ];

  return (
    <main className="min-h-screen bg-background text-primary">
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-white border-t-4 border-accent">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-16">
          <p className="text-sm uppercase tracking-[0.26em] text-accent font-semibold mb-4">
            Doctrina y fe
          </p>

          <h1
            className="text-5xl md:text-6xl mb-5 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            En Qué Creemos
          </h1>

          <p className="text-lg md:text-xl max-w-3xl leading-relaxed text-white/90">
            Como iglesia, afirmamos las doctrinas bíblicas enseñadas dentro de
            ICIAR y reconocemos estas verdades como fundamento de nuestra fe,
            enseñanza y práctica cristiana.
          </p>

          <div className="mt-8 h-1 w-28 bg-accent" />
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <div className="rounded-lg bg-gradient-to-br from-primary to-primary/90 text-white p-8 md:p-10 border border-primary/80">
            <p className="text-accent uppercase tracking-[0.26em] text-sm font-semibold mb-3">
              Fundamento doctrinal
            </p>

            <h2
              className="text-4xl md:text-5xl uppercase tracking-wide mb-5"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              La fe que confesamos
            </h2>

            <p className="text-white/90 leading-relaxed text-lg">
              Estas creencias resumen las verdades principales de nuestra fe.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-accent/25 p-7 md:p-9 flex items-center">
            <p className="text-gray-700 text-lg leading-relaxed">
              Aquí explicamos lo que creemos doctrinalmente, mientras que la
              página de Nosotros presenta quiénes somos como iglesia, nuestra
              misión y el equipo que sirve en la congregación.
            </p>
          </div>
        </div>
      </section>

      {/* DOCTRINES */}
      <section className="bg-gradient-to-br from-accent/15 via-white to-primary/10 border-y border-accent/25">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.26em] text-accent font-semibold mb-4">
              Lo que creemos
            </p>

            <h2
              className="text-4xl md:text-5xl text-primary uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Doctrinas Bíblicas
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {doctrines.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="bg-white rounded-lg shadow-md border border-accent/25 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`h-2 ${
                      index % 2 === 0 ? "bg-accent" : "bg-primary"
                    }`}
                  />

                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                        {item.verse}
                      </span>
                    </div>

                    <h3
                      className="text-primary text-2xl mb-3 uppercase tracking-wide"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {item.title}
                    </h3>

                    <p className="text-gray-700 leading-relaxed">{item.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* BELIEF SUMMARY */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-accent font-semibold mb-4">
              De la doctrina a la vida
            </p>

            <h2
              className="text-4xl md:text-5xl text-primary uppercase tracking-wide mb-5"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Estas creencias guían nuestra vida
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed">
              La doctrina no reemplaza la vida cristiana, la dirige. Lo que
              creemos acerca de Dios, la Biblia, Cristo, la salvación y el
              Espíritu Santo da forma a nuestra adoración, enseñanza,
              obediencia y esperanza.
            </p>
          </div>

          <div className="grid gap-5">
            {beliefSummary.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="bg-white rounded-lg shadow-md border border-accent/25 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`h-2 ${
                      index % 2 === 0 ? "bg-accent" : "bg-primary"
                    }`}
                  />

                  <div className="p-6 flex gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3
                        className="text-primary text-2xl mb-2 uppercase tracking-wide"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {item.title}
                      </h3>

                      <p className="text-gray-700 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary border-t-4 border-accent">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 text-center">
          <h2
            className="text-accent text-4xl md:text-5xl mb-5 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Una fe que nos une
          </h2>

          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Estas creencias nos afirman como iglesia y nos ayudan a vivir con
            fidelidad, esperanza y obediencia delante de Dios.
          </p>

          <a
            href="/nosotros"
            className="inline-block bg-accent text-primary px-8 py-3 rounded-lg uppercase tracking-wide hover:bg-accent/90 transition-colors shadow-md shadow-accent/20"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Conoce Nuestra Iglesia
          </a>
        </div>
      </section>
    </main>
  );
}
