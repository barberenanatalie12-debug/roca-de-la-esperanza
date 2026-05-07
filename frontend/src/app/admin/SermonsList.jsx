import { useState } from "react";
import { useNavigate } from "react-router";
import { Trash2, Pencil, PlayCircle, Youtube } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { formatTime } from "../../lib/formatTime";
import { requireAdmin } from "../../lib/requireAdmin";
import { getYoutubeThumbnail } from "../../lib/youtube";

function ServiceThumbnail({ videoUrl, title }) {
  const [errored, setErrored] = useState(false);
  const thumbnail = getYoutubeThumbnail(videoUrl);

  if (!thumbnail || errored) {
    return null;
  }

  return (
    <img
      src={thumbnail}
      alt={title || "Servicio"}
      className="w-full h-48 object-cover rounded-lg mb-4"
      onError={() => setErrored(true)}
    />
  );
}

export default function SermonsList({ services = [], onDelete, onEdit }) {
  const navigate = useNavigate();
  const [sermonSearch, setSermonSearch] = useState("");
  const [updatedVideos, setUpdatedVideos] = useState({});

  const handleVideoUpdate = async (id, videoUrl) => {
    const auth = await requireAdmin();

    if (!auth.ok) {
      if (auth.reason === "unauthenticated") {
        alert("Tu sesión ha expirado. Inicia sesión nuevamente.");
        navigate("/login", { replace: true });
      } else if (auth.reason === "not-admin") {
        alert("No tienes permiso para realizar esta acción.");
        navigate("/", { replace: true });
      } else {
        alert("No se pudo verificar el acceso de administrador.");
      }
      return;
    }

    const trimmed = videoUrl.trim();

    const { error } = await supabase
      .from("services")
      .update({
        video_url: trimmed === "" ? null : trimmed,
        show_on_sermons: trimmed !== "",
      })
      .eq("id", id);

    if (error) {
      console.log("Supabase error:", error.message);
      alert(error.message);
      return;
    }

    setUpdatedVideos((prev) => ({
      ...prev,
      [id]: trimmed === "" ? null : trimmed,
    }));
  };

  const filteredServices = services.filter((service) => {
    const searchText = sermonSearch.toLowerCase();

    return (
      service.title?.toLowerCase().includes(searchText) ||
      service.sermon_person?.toLowerCase().includes(searchText) ||
      service.worship_person?.toLowerCase().includes(searchText) ||
      service.translation_person?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div>
      <h2
        className="text-primary text-3xl mb-6 uppercase tracking-wide"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        Sermones y Servicios ({filteredServices.length})
      </h2>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <input
          type="text"
          value={sermonSearch}
          onChange={(e) => setSermonSearch(e.target.value)}
          placeholder="Buscar por predicador, alabanza, traductor o tipo"
          className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div className="space-y-4">
        {filteredServices.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
            No hay servicios guardados todavía
          </div>
        ) : (
          filteredServices.map((service) => {
            const currentVideo =
              service.id in updatedVideos
                ? updatedVideos[service.id]
                : service.video_url;

            return (
              <div
                key={service.id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <ServiceThumbnail
                  videoUrl={currentVideo}
                  title={service.title}
                />

                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3
                      className="text-primary text-2xl uppercase tracking-wide"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {service.title}
                    </h3>

                    <p className="text-gray-700">
                      {service.service_date} a las{" "}
                      {formatTime(service.service_time)}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEdit && onEdit(service)}
                      className="text-accent hover:text-accent/80 transition-colors p-2"
                      title="Editar"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => onDelete && onDelete(service.id)}
                      className="text-red-600 hover:text-red-800 transition-colors p-2"
                      title="Eliminar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-700">Alabanza</p>
                    <p className="text-gray-600">
                      {service.worship_person || "No asignado"}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-700">Predicador</p>
                    <p className="text-gray-600">
                      {service.sermon_person || "No asignado"}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-700">Traductor</p>
                    <p className="text-gray-600">
                      {service.translation_person || "No asignado"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid md:grid-cols-[1fr_auto] gap-3">
                  <input
                    type="url"
                    defaultValue={service.video_url || ""}
                    placeholder="Pegar link del video"
                    id={`video-${service.id}`}
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />

                  <button
                    onClick={() => {
                      const input = document.getElementById(
                        `video-${service.id}`
                      );

                      handleVideoUpdate(service.id, input.value);
                    }}
                    className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors uppercase tracking-wide"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Guardar Video
                  </button>
                </div>

                {currentVideo && (
                  <a
                    href={currentVideo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:underline mt-4"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Ver video
                  </a>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
