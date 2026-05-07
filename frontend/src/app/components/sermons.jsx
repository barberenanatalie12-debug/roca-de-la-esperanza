import { Play } from "lucide-react";
export function Sermons() {
    const sermons = [
        {
            id: 1,
            title: "Fe Sobre Miedo",
            speaker: "Pastor Isui Gonzalez",
            date: "15 de Marzo, 2026",
        },
        {
            id: 2,
            title: "Caminando en Esperanza",
            speaker: "Ministra Zulema Casas",
            date: "8 de Marzo, 2026",
        },
        {
            id: 3,
            title: "El Poder de la Oración",
            speaker: "Pastor Geronimo Barraza",
            date: "1 de Marzo, 2026",
        },
    ];
    return (<section id="sermons" className="py-24 px-10 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-primary text-5xl mb-12 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          Últimos Sermones
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {sermons.map((sermon) => (<div key={sermon.id} className="bg-muted rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="h-48 bg-primary flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity"/>
                <Play className="w-16 h-16 text-white/80 group-hover:text-white transition-colors"/>
              </div>
              <div className="p-6">
                <h3 className="text-primary text-2xl mb-2 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {sermon.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-1">{sermon.speaker}</p>
                <p className="text-muted-foreground text-sm">{sermon.date}</p>
              </div>
            </div>))}
        </div>
        <div className="text-center mt-12">
          <a href="/sermones" className="inline-block bg-primary text-white px-10 py-3 rounded-lg hover:bg-primary/90 transition-colors uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Ver Sermones
          </a>
        </div>
      </div>
    </section>);
}
