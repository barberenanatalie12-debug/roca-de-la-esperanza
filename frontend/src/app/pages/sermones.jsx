import { useEffect, useState } from "react";
import { Calendar, User, Clock, Youtube, PlayCircle } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { formatTime } from "../../lib/formatTime";
import { getYoutubeThumbnail, YOUTUBE_CHANNEL_URL } from "../../lib/youtube";
import { VideoModal } from "../components/VideoModal";

function SermonThumbnail({ videoUrl, title }) {
  const [errored, setErrored] = useState(false);
  const thumbnail = getYoutubeThumbnail(videoUrl);

  if (!thumbnail || errored) {
    return (
      <div className="w-full h-56 bg-primary/10 flex items-center justify-center">
        <Youtube className="w-20 h-20 text-accent" />
      </div>
    );
  }

  return (
    <img
      src={thumbnail}
      alt={title || "Sermón"}
      className="w-full h-56 object-cover"
      onError={() => setErrored(true)}
    />
  );
}

export default function Sermones() {
  const [sermons, setSermons] = useState([]);
  const [activeSermon, setActiveSermon] = useState(null);

  useEffect(() => {
    fetchSermons();
  }, []);

  async function fetchSermons() {
    const [
      { data: services, error: servicesError },
      { data: events, error: eventsError },
    ] = await Promise.all([
      supabase
        .from("services")
        .select("*")
        .eq("deleted", false)
        .eq("show_on_sermons", true),
      supabase
        .from("events")
        .select("*")
        .eq("deleted", false)
        .eq("show_on_sermons", true),
    ]);

    if (servicesError) {
      console.error(servicesError);
    }

    if (eventsError) {
      console.error(eventsError);
    }

    const normalizedServices = (services || []).map((service) => ({
      source: "service",
      id: `service-${service.id}`,
      title: service.title,
      speaker: service.sermon_person,
      worship: service.worship_person,
      translator: service.translation_person,
      date: service.service_date,
      time: service.service_time,
      description: service.description,
      video_url: service.video_url,
    }));

    const normalizedEvents = (events || [])
      .filter(
        (event) =>
          event.sermon_person ||
          event.worship_person ||
          event.translation_person ||
          event.video_url
      )
      .map((event) => ({
        source: "event",
        id: `event-${event.id}`,
        title: event.title,
        speaker: event.sermon_person,
        worship: event.worship_person,
        translator: event.translation_person,
        date: event.event_date,
        time: event.event_time,
        description: event.description,
        video_url: event.video_url,
      }));

    const merged = [...normalizedServices, ...normalizedEvents].sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return b.date.localeCompare(a.date);
    });

    setSermons(merged);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-20 px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1
            className="text-accent text-6xl mb-6 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Sermones
          </h1>
          <p className="text-white/90 text-xl max-w-3xl mx-auto">
            Mensajes que edifican, inspiran y transforman vidas a través de la
            Palabra de Dios.
          </p>
        </div>
      </div>

      <div className="py-20 px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white px-10 py-3 rounded-lg hover:bg-primary/90 transition-colors uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <Youtube className="w-5 h-5" />
              Ver todos los sermones en YouTube
            </a>
          </div>

          {sermons.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
              No hay sermones publicados todavía.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {sermons.map((sermon) => (
                <div
                  key={sermon.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setActiveSermon(sermon)}
                    className="block w-full text-left group"
                    aria-label={`Ver ${sermon.title}`}
                  >
                    <div className="relative">
                      <SermonThumbnail
                        videoUrl={sermon.video_url}
                        title={sermon.title}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <PlayCircle className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </button>

                  <div className="p-8">
                    <div className="mb-4">
                      <h2
                        className="text-primary text-3xl mb-2 uppercase tracking-wide"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {sermon.title}
                      </h2>
                    </div>

                    {sermon.description && (
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {sermon.description}
                      </p>
                    )}

                    <div className="space-y-2 text-sm text-gray-600">
                      {sermon.speaker && (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-accent" />
                          <span>{sermon.speaker}</span>
                        </div>
                      )}

                      {sermon.date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-accent" />
                          <span>{sermon.date}</span>
                        </div>
                      )}

                      {sermon.time && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-accent" />
                          <span>{formatTime(sermon.time)}</span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveSermon(sermon)}
                      className="mt-6 w-full bg-accent text-primary px-6 py-3 uppercase tracking-wide hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      <PlayCircle className="w-5 h-5" />
                      Ver Video
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-16">
        <div className="rounded-lg bg-primary text-white border-t-4 border-accent p-8 md:p-10 text-center shadow-md">
          <h2
            className="text-4xl md:text-5xl uppercase tracking-wide mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Únete a Nosotros
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto leading-relaxed mb-8">
            Experimenta estos mensajes poderosos en persona. Te esperamos en
            nuestros servicios.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            <div className="rounded-lg bg-white/10 border border-white/15 p-6">
              <p
                className="text-accent uppercase tracking-wide text-lg"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Domingos
              </p>
              <p className="text-white text-2xl font-semibold mt-1">3:00 PM</p>
              <p className="text-white/70 text-sm mt-1">Escuela Dominical</p>
            </div>
            <div className="rounded-lg bg-white/10 border border-white/15 p-6">
              <p
                className="text-accent uppercase tracking-wide text-lg"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Domingos
              </p>
              <p className="text-white text-2xl font-semibold mt-1">4:30 PM</p>
              <p className="text-white/70 text-sm mt-1">Culto General</p>
            </div>
            <div className="rounded-lg bg-white/10 border border-white/15 p-6">
              <p
                className="text-accent uppercase tracking-wide text-lg"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Jueves
              </p>
              <p className="text-white text-2xl font-semibold mt-1">7:30 PM</p>
              <p className="text-white/70 text-sm mt-1">Servicio de Jueves</p>
            </div>
          </div>
        </div>
      </section>

      <VideoModal
        open={Boolean(activeSermon)}
        videoUrl={activeSermon?.video_url}
        title={activeSermon?.title}
        onClose={() => setActiveSermon(null)}
      />
    </div>
  );
}
