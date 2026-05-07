import { useState } from "react";
import {
  Users,
  Mail,
  Phone,
  Eye,
  Archive,
  X,
  HandHeart,
  Calendar,
} from "lucide-react";

export default function RegistrationsList({
  registrations = [],
  events = [],
  onArchive,
}) {
  const [eventFilter, setEventFilter] = useState("all");
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const eventsById = events.reduce((acc, event) => {
    acc[event.id] = event;
    return acc;
  }, {});

  const filteredRegistrations =
    eventFilter === "all"
      ? registrations
      : registrations.filter(
          (registration) =>
            String(registration.event_id) === String(eventFilter)
        );

  const totalPeople = filteredRegistrations.reduce(
    (sum, registration) =>
      sum + (Number(registration.cantidad_personas) || 1),
    0
  );

  const volunteersCount = filteredRegistrations.filter(
    (registration) => registration.quiere_voluntariar
  ).length;

  const eventsWithRegistrations = Array.from(
    new Set(registrations.map((registration) => registration.event_id))
  )
    .map((id) => ({
      id,
      title: eventsById[id]?.title || "Evento eliminado",
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  const viewRegistration = (registration) => {
    setSelectedRegistration(registration);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRegistration(null);
  };

  return (
    <div>
      <div className="mb-8">
        <h2
          className="text-primary text-3xl mb-4 uppercase tracking-wide"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Registros
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8 text-accent" />
              <h3
                className="text-gray-600 uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Registros
              </h3>
            </div>

            <p className="text-4xl font-bold text-primary">
              {filteredRegistrations.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8 text-purple-600" />
              <h3
                className="text-gray-600 uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Personas
              </h3>
            </div>

            <p className="text-4xl font-bold text-primary">{totalPeople}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <HandHeart className="w-8 h-8 text-green-600" />
              <h3
                className="text-gray-600 uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Voluntarios
              </h3>
            </div>

            <p className="text-4xl font-bold text-primary">{volunteersCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <label className="block text-gray-700 mb-2 font-semibold">
          Filtrar por Evento
        </label>
        <select
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="all">Todos los eventos</option>
          {eventsWithRegistrations.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2
            className="text-primary text-3xl uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Registros Activos ({filteredRegistrations.length})
          </h2>
        </div>

        {filteredRegistrations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No hay registros en esta vista
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Evento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Personas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Voluntario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredRegistrations.map((registration) => {
                  const event = eventsById[registration.event_id];

                  return (
                    <tr key={registration.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-gray-900 font-medium">
                          {event?.title || "Evento eliminado"}
                        </div>
                        {event?.event_date && (
                          <div className="text-gray-500 text-sm">
                            {event.event_date}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {registration.nombre} {registration.apellido}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Mail className="w-4 h-4 text-accent" />
                          {registration.email}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="w-4 h-4 text-accent" />
                          {registration.telefono}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-700">
                          {registration.cantidad_personas || 1}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {registration.quiere_voluntariar ? (
                          <span className="inline-flex items-center gap-1 text-green-700 font-semibold">
                            <HandHeart className="w-4 h-4" />
                            Sí
                          </span>
                        ) : (
                          <span className="text-gray-500">No</span>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {registration.created_at
                          ? new Date(
                              registration.created_at
                            ).toLocaleDateString()
                          : ""}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => viewRegistration(registration)}
                            className="text-accent hover:text-accent/80 transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            Ver detalles
                          </button>

                          <button
                            onClick={() =>
                              onArchive && onArchive(registration.id)
                            }
                            className="text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
                          >
                            <Archive className="w-4 h-4" />
                            Archivar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && selectedRegistration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeModal}
          />

          <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/90 text-white px-8 py-6 relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h2
                className="text-3xl uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Detalles del Registro
              </h2>

              <p className="text-white/80">
                {eventsById[selectedRegistration.event_id]?.title ||
                  "Evento eliminado"}
              </p>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1 uppercase tracking-wide font-semibold">
                    Nombre Completo
                  </p>
                  <p className="text-lg text-gray-900">
                    {selectedRegistration.nombre}{" "}
                    {selectedRegistration.apellido}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1 uppercase tracking-wide font-semibold">
                    Cantidad de Personas
                  </p>
                  <p className="text-lg text-gray-900">
                    {selectedRegistration.cantidad_personas || 1}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1 uppercase tracking-wide font-semibold">
                    Email
                  </p>
                  <a
                    href={`mailto:${selectedRegistration.email}`}
                    className="text-lg text-accent hover:underline flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    {selectedRegistration.email}
                  </a>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1 uppercase tracking-wide font-semibold">
                    Teléfono
                  </p>
                  <a
                    href={`tel:${selectedRegistration.telefono}`}
                    className="text-lg text-accent hover:underline flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    {selectedRegistration.telefono}
                  </a>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1 uppercase tracking-wide font-semibold">
                    Voluntario
                  </p>
                  <p className="text-lg text-gray-900 flex items-center gap-2">
                    {selectedRegistration.quiere_voluntariar ? (
                      <>
                        <HandHeart className="w-5 h-5 text-green-600" />
                        Sí
                      </>
                    ) : (
                      "No"
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1 uppercase tracking-wide font-semibold">
                    Fecha de Registro
                  </p>
                  <p className="text-lg text-gray-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent" />
                    {selectedRegistration.created_at
                      ? new Date(
                          selectedRegistration.created_at
                        ).toLocaleString()
                      : ""}
                  </p>
                </div>
              </div>

              {selectedRegistration.nombres_adicionales && (
                <div>
                  <p className="text-sm text-gray-600 mb-2 uppercase tracking-wide font-semibold">
                    Acompañantes
                  </p>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {selectedRegistration.nombres_adicionales}
                    </p>
                  </div>
                </div>
              )}

              {selectedRegistration.mensaje && (
                <div>
                  <p className="text-sm text-gray-600 mb-2 uppercase tracking-wide font-semibold">
                    Mensaje
                  </p>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {selectedRegistration.mensaje}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-8 py-4 flex justify-between items-center">
              <button
                onClick={() => {
                  if (onArchive) {
                    onArchive(selectedRegistration.id);
                  }
                  closeModal();
                }}
                className="bg-white border-2 border-red-600 text-red-600 px-6 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors uppercase tracking-wide flex items-center gap-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <Archive className="w-4 h-4" />
                Archivar
              </button>

              <button
                onClick={closeModal}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
