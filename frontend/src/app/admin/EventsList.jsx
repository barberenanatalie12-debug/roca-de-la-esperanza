import { useState } from "react";
import {
  Trash2,
  Pencil,
  Calendar,
  MapPin,
  Link,
  PlayCircle,
} from "lucide-react";
import { formatTime } from "../../lib/formatTime";

function EventListImage({ imageUrl, externalUrl, alt }) {
  const [errored, setErrored] = useState(false);
  const src = imageUrl || externalUrl;

  if (!src || errored) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
      onError={() => setErrored(true)}
    />
  );
}

const serviceTypes = [
  "Servicio General",
  "Escuela Dominical",
  "Servicio Entre Semana",
];

const eventTypes = [
  "Evento Local",
  "Evento Distrito",
  "Evento Presbiterial",
];

const eventGroups = [
  "Grupo Local",
  "Evento Especial",
  "Campamento",
  "Conferencia",
  "Jóvenes",
  "Mujeres",
  "Niños",
  "Varones",
  "Vigilia",
  "Oración",
  "Limpieza",
  "Otro",
];

const getEventTypeBadgeColor = (type) => {
  const colors = {
    "Servicio General": "bg-blue-100 text-blue-800",
    "Escuela Dominical": "bg-green-100 text-green-800",
    "Servicio Entre Semana": "bg-indigo-100 text-indigo-800",
    "Evento Local": "bg-blue-100 text-blue-800",
    "Evento Distrito": "bg-green-100 text-green-800",
    "Evento Presbiterial": "bg-purple-100 text-purple-800",
  };

  return colors[type] || "bg-gray-100 text-gray-800";
};

const getEventGroupBadgeColor = (group) => {
  const colors = {
    "Grupo Local": "bg-blue-100 text-blue-800",
    "Evento Especial": "bg-purple-100 text-purple-800",
    Campamento: "bg-orange-100 text-orange-800",
    Conferencia: "bg-indigo-100 text-indigo-800",
    "Jóvenes": "bg-orange-100 text-orange-800",
    Mujeres: "bg-pink-100 text-pink-800",
    "Niños": "bg-cyan-100 text-cyan-800",
    Varones: "bg-slate-100 text-slate-800",
    Vigilia: "bg-indigo-100 text-indigo-800",
    "Oración": "bg-indigo-100 text-indigo-800",
    Limpieza: "bg-yellow-100 text-yellow-800",
    Otro: "bg-gray-100 text-gray-800",
  };

  return colors[group] || "bg-gray-100 text-gray-800";
};

export default function EventsList({ events = [], onDelete, onEdit }) {
  const [eventSearch, setEventSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("public_events");
  const [typeFilter, setTypeFilter] = useState("all");
  const [groupFilter, setGroupFilter] = useState("all");

  const filteredEvents = events.filter((event) => {
    const searchText = eventSearch.toLowerCase();

    const matchesSearch =
      event.title?.toLowerCase().includes(searchText) ||
      event.description?.toLowerCase().includes(searchText) ||
      event.location?.toLowerCase().includes(searchText) ||
      event.event_type?.toLowerCase().includes(searchText) ||
      event.event_group?.toLowerCase().includes(searchText) ||
      event.contact_name?.toLowerCase().includes(searchText);

    const matchesType =
      typeFilter === "all" || event.event_type === typeFilter;

    const matchesGroup =
      groupFilter === "all" || event.event_group === groupFilter;

    const matchesEventFilter =
      eventFilter === "all" ||
      (eventFilter === "public_events" && event.show_on_events === true) ||
      (eventFilter === "internal_calendar" &&
        event.show_on_calendar === true &&
        event.show_on_events === false) ||
      (eventFilter === "sermons" && event.show_on_sermons === true);

    return matchesSearch && matchesType && matchesGroup && matchesEventFilter;
  });

  return (
    <div>
      <h2
        className="text-primary text-3xl mb-6 uppercase tracking-wide"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        Eventos Creados ({filteredEvents.length})
      </h2>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6 space-y-3">
        <input
          type="text"
          value={eventSearch}
          onChange={(e) => setEventSearch(e.target.value)}
          placeholder="Buscar por título, descripción, ubicación, tipo, grupo o contacto"
          className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
        />

        <div className="grid md:grid-cols-3 gap-3">
          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="public_events">Página de eventos</option>
            <option value="internal_calendar">Solo calendario interno</option>
            <option value="sermons">Sermones</option>
            <option value="all">Todos</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">Todos los tipos</option>

            <optgroup label="Servicios">
              {serviceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </optgroup>

            <optgroup label="Tipos de Evento">
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </optgroup>
          </select>

          <select
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">Todos los grupos</option>
            {eventGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {filteredEvents.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500 lg:col-span-2">
            No hay registros todavía
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <EventListImage
                imageUrl={event.image_url}
                externalUrl={event.external_url}
                alt={event.title}
              />

              <div className="p-6">
                <div className="flex justify-between items-start mb-3 gap-2">
                  <h3
                    className="text-primary text-2xl uppercase tracking-wide"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEdit && onEdit(event)}
                      className="text-accent hover:text-accent/80 transition-colors p-2"
                      title="Editar"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => onDelete && onDelete(event.id)}
                      className="text-red-600 hover:text-red-800 transition-colors p-2"
                      title="Eliminar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mb-3 flex flex-wrap gap-2">
                  {event.event_type && (
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getEventTypeBadgeColor(
                        event.event_type
                      )}`}
                    >
                      {event.event_type}
                    </span>
                  )}

                  {event.event_group && (
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getEventGroupBadgeColor(
                        event.event_group
                      )}`}
                    >
                      {event.event_group}
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-gray-700 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span>
                      {event.event_date} a las {formatTime(event.event_time)}
                    </span>
                  </div>

                  {event.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{event.location}</span>
                    </div>
                  )}

                  {event.external_url && (
                    <div className="flex items-center gap-2">
                      <Link className="w-4 h-4 text-accent" />
                      <a
                        href={event.external_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent hover:underline"
                      >
                        Abrir link
                      </a>
                    </div>
                  )}

                  {event.video_url && (
                    <div className="flex items-center gap-2">
                      <PlayCircle className="w-4 h-4 text-accent" />
                      <a
                        href={event.video_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent hover:underline"
                      >
                        Ver video
                      </a>
                    </div>
                  )}
                </div>

                {event.description && (
                  <p className="text-gray-600 mb-3">{event.description}</p>
                )}

                {(event.contact_name ||
                  event.contact_phone ||
                  event.contact_email) && (
                  <div className="bg-gray-50 p-4 rounded-lg text-gray-700 space-y-1">
                    <p className="font-semibold">Más información</p>
                    {event.contact_name && (
                      <p>Contacto: {event.contact_name}</p>
                    )}
                    {event.contact_phone && (
                      <p>Teléfono: {event.contact_phone}</p>
                    )}
                    {event.contact_email && (
                      <p>Email: {event.contact_email}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
