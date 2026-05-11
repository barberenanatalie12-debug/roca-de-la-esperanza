import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { getYoutubeThumbnail } from "../../lib/youtube";
import { VideoModal } from "./VideoModal";

export function Sermons() {
  const [sermons, setSermons] = useState([]);
  const [activeSermon, setActiveSermon] = useState(null);

  useEffect(() => {
    fetchSermons();
  }, []);

  async function fetchSermons() {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("deleted", false)
      .eq("show_on_sermons", true)
      .not("video_url", "is", null)
      .order("service_date", { ascending: false })
      .limit(3);

    if (error) {
      console.log("Supabase error:", error.message);
      return;
    }

    setSermons(data || []);
  }

  return (
    <section id="sermons" className="bg-white px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.26em] text-accent">
              Mensajes recientes
            </p>

            <h2
              className="text-5xl uppercase tracking-wide text-primary"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Últimos Sermones
            </h2>

            <div className="mt-4 h-1 w-24 bg-accent" />
          </div>

          <p className="max-w-md text-gray-700 leading-relaxed">
            Escucha mensajes que edifican la fe, fortalecen el corazón y nos
            acercan más a Cristo.
          </p>
        </div>

        {sermons.length === 0 ? (
          <div className="rounded-lg border border-accent/25 bg-gradient-to-br from-accent/10 via-white to-primary/5 p-10 text-center">
            <p
              className="mb-2 text-3xl uppercase tracking-wide text-primary"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Sermones próximamente
            </p>

            <p className="text-gray-700">
              Próximamente publicaremos los últimos sermones aquí.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {sermons.map((sermon) => {
              const thumbnail = getYoutubeThumbnail(sermon.video_url);

              return (
                <button
                  key={sermon.id}
                  type="button"
                  onClick={() => setActiveSermon(sermon)}
                  className="group overflow-hidden rounded-lg border border-accent/25 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative flex h-48 items-center justify-center overflow-hidden bg-primary">
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt={sermon.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-black/25 to-transparent transition-colors group-hover:from-primary/85" />

                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent text-primary shadow-lg ring-4 ring-white/25 transition duration-300 group-hover:scale-110 group-hover:bg-white">
                      <Play className="ml-1 h-7 w-7 fill-current" />
                    </div>

                    <div className="absolute bottom-0 left-0 h-1 w-full bg-accent" />
                  </div>

                  <div className="p-6">
                    <h3
                      className="mb-3 text-2xl uppercase tracking-wide text-primary"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {sermon.title}
                    </h3>

                    <div className="space-y-1 border-l-4 border-accent/70 pl-4">
                      {sermon.sermon_person && (
                        <p className="text-sm text-gray-700">
                          {sermon.sermon_person}
                        </p>
                      )}

                      {sermon.service_date && (
                        <p className="text-sm text-gray-500">
                          {sermon.service_date}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href="/sermones"
            className="inline-block bg-primary px-10 py-3 uppercase tracking-wide text-white transition-colors hover:bg-primary/90"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Ver Sermones
          </a>
        </div>
      </div>

      <VideoModal
        open={Boolean(activeSermon)}
        videoUrl={activeSermon?.video_url}
        title={activeSermon?.title}
        onClose={() => setActiveSermon(null)}
      />
    </section>
  );
}