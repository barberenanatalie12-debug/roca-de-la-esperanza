import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { requireAdmin } from "../../lib/requireAdmin";
import CreateService from "./CreateService";
import CreateEvent from "./CreateEvent";
import EventsList from "./EventsList";
import SermonsList from "./SermonsList";
import InternalCalendar from "./InternalCalendar";
import ConectateSubmissions from "./ConectateSubmissions";
import RegistrationsList from "./RegistrationsList";
import SiteContent from "./SiteContent";

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("create");
  const [createMode, setCreateMode] = useState("service");
  const [events, setEvents] = useState([]);
  const [services, setServices] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    getEvents();
    getServices();
    getSubmissions();
    getRegistrations();
  }, []);

  const guardAction = async () => {
    const auth = await requireAdmin();

    if (auth.ok) {
      return true;
    }

    if (auth.reason === "unauthenticated") {
      alert("Tu sesión ha expirado. Inicia sesión nuevamente.");
      navigate("/login", { replace: true });
    } else if (auth.reason === "not-admin") {
      alert("No tienes permiso para realizar esta acción.");
      navigate("/", { replace: true });
    } else {
      alert("No se pudo verificar el acceso de administrador.");
    }

    return false;
  };

  const getEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("deleted", false)
      .order("event_date", { ascending: true });

    if (error) {
      console.log("Supabase error:", error.message);
      alert(error.message);
      return;
    }

    setEvents(data || []);
  };

  const getServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("deleted", false)
      .order("service_date", { ascending: true });

    if (error) {
      console.log("Supabase error:", error.message);
      alert(error.message);
      return;
    }

    setServices(data || []);
  };

  const getSubmissions = async () => {
    const { data, error } = await supabase
      .from("conectate_submision")
      .select("*")
      .eq("deleted", false)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Supabase error:", error.message);
      alert(error.message);
      return;
    }

    setSubmissions(data || []);
  };

  const getRegistrations = async () => {
    const { data, error } = await supabase
      .from("registrate")
      .select("*")
      .eq("archived", false)
      .eq("deleted", false)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Supabase error:", error.message);
      alert(error.message);
      return;
    }

    setRegistrations(data || []);
  };

 const handleDeleteEvent = async (id) => {
  if (!(await guardAction())) {
    return;
  }

  if (
    !window.confirm(
      "¿Estás seguro de que deseas eliminar este evento? Esto también eliminará los registros de este evento."
    )
  ) {
    return;
  }

  const deletedAt = new Date().toISOString();

  const { error: registrateError } = await supabase
    .from("registrate")
    .update({
      deleted: true,
      deleted_at: deletedAt,
    })
    .eq("event_id", id);

  if (registrateError) {
    console.log("Supabase registrate error:", registrateError.message);
    alert(registrateError.message);
    return;
  }

  const { error: eventError } = await supabase
    .from("events")
    .update({
      deleted: true,
      deleted_at: deletedAt,
    })
    .eq("id", id);

  if (eventError) {
    console.log("Supabase event error:", eventError.message);
    alert(eventError.message);
    return;
  }

  setEvents((prev) => prev.filter((event) => event.id !== id));

  if (editingEvent && editingEvent.id === id) {
    setEditingEvent(null);
  }
};

  const handleDeleteService = async (id) => {
    if (!(await guardAction())) {
      return;
    }

    if (!window.confirm("¿Estás seguro de que deseas eliminar este servicio?")) {
      return;
    }

    const { error } = await supabase
      .from("services")
      .update({ deleted: true, deleted_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      console.log("Supabase error:", error.message);
      alert(error.message);
      return;
    }

    setServices((prev) => prev.filter((service) => service.id !== id));

    if (editingService && editingService.id === id) {
      setEditingService(null);
    }
  };

  const handleDeleteSubmission = async (id) => {
    if (!(await guardAction())) {
      return;
    }

    if (!window.confirm("¿Estás seguro de que deseas eliminar esta conexión?")) {
      return;
    }

    const { error } = await supabase
      .from("conectate_submision")
      .update({ deleted: true, deleted_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      console.log("Supabase error:", error.message);
      alert(error.message);
      return;
    }

    setSubmissions((prev) => prev.filter((submission) => submission.id !== id));
  };

  const handleMarkSubmissionRead = async (id) => {
    if (!(await guardAction())) {
      return;
    }

    const readAt = new Date().toISOString();

    const { error } = await supabase
      .from("conectate_submision")
      .update({ read: true, read_at: readAt })
      .eq("id", id);

    if (error) {
      console.log("Supabase error:", error.message);
      alert(error.message);
      return;
    }

    setSubmissions((prev) =>
      prev.map((submission) =>
        submission.id === id
          ? { ...submission, read: true, read_at: readAt }
          : submission
      )
    );
  };

  const handleArchiveRegistration = async (id) => {
    if (!(await guardAction())) {
      return;
    }

    if (!window.confirm("¿Archivar este registro?")) {
      return;
    }

    const { error } = await supabase
      .from("registrate")
      .update({ archived: true, archived_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      console.log("Supabase error:", error.message);
      alert(error.message);
      return;
    }

    setRegistrations((prev) =>
      prev.filter((registration) => registration.id !== id)
    );
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEditingService(null);
    setCreateMode("event");
    setActiveTab("create");
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setEditingEvent(null);
    setCreateMode("service");
    setActiveTab("create");
  };

  const handleEventSaved = (savedEvent) => {
    if (savedEvent && savedEvent.id) {
      setEvents((prev) => {
        const exists = prev.some((event) => event.id === savedEvent.id);

        if (exists) {
          return prev.map((event) =>
            event.id === savedEvent.id ? savedEvent : event
          );
        }

        return [...prev, savedEvent];
      });
    } else {
      getEvents();
    }

    setEditingEvent(null);
  };

  const handleServiceSaved = (savedService) => {
    if (savedService && savedService.id) {
      setServices((prev) => {
        const exists = prev.some((service) => service.id === savedService.id);

        if (exists) {
          return prev.map((service) =>
            service.id === savedService.id ? savedService : service
          );
        }

        return [...prev, savedService];
      });
    } else {
      getServices();
    }

    setEditingService(null);
  };

  const handleCancelEditEvent = () => {
    setEditingEvent(null);
  };

  const handleCancelEditService = () => {
    setEditingService(null);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("Supabase error:", error.message);
      alert(error.message);
      return;
    }

    navigate("/login", { replace: true });
  };

  const unreadCount = submissions.filter((submission) => !submission.read).length;
  const registrationsCount = registrations.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-12 px-10 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1
              className="text-accent text-5xl mb-4 uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Panel de Administración
            </h1>
            <p className="text-white/90 text-lg">
              Gestiona servicios, eventos, sermones, registros y conexiones
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-white border-2 border-accent text-accent px-6 py-3 uppercase tracking-wide hover:bg-accent hover:text-primary transition-colors flex items-center gap-2"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 print:hidden">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex gap-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("create")}
              className={`py-4 px-2 border-b-2 transition-colors uppercase tracking-wide whitespace-nowrap ${
                activeTab === "create"
                  ? "border-accent text-accent"
                  : "border-transparent text-gray-600 hover:text-accent"
              }`}
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Crear
            </button>

            <button
              onClick={() => setActiveTab("events")}
              className={`py-4 px-2 border-b-2 transition-colors uppercase tracking-wide whitespace-nowrap ${
                activeTab === "events"
                  ? "border-accent text-accent"
                  : "border-transparent text-gray-600 hover:text-accent"
              }`}
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Eventos Creados
            </button>

            <button
              onClick={() => setActiveTab("sermons")}
              className={`py-4 px-2 border-b-2 transition-colors uppercase tracking-wide whitespace-nowrap ${
                activeTab === "sermons"
                  ? "border-accent text-accent"
                  : "border-transparent text-gray-600 hover:text-accent"
              }`}
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Sermones
            </button>

            <button
              onClick={() => setActiveTab("calendar")}
              className={`py-4 px-2 border-b-2 transition-colors uppercase tracking-wide whitespace-nowrap ${
                activeTab === "calendar"
                  ? "border-accent text-accent"
                  : "border-transparent text-gray-600 hover:text-accent"
              }`}
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Calendario Interno
            </button>

            <button
              onClick={() => setActiveTab("registrations")}
              className={`py-4 px-2 border-b-2 transition-colors uppercase tracking-wide whitespace-nowrap ${
                activeTab === "registrations"
                  ? "border-accent text-accent"
                  : "border-transparent text-gray-600 hover:text-accent"
              }`}
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Registros ({registrationsCount})
            </button>

            <button
              onClick={() => setActiveTab("submissions")}
              className={`py-4 px-2 border-b-2 transition-colors uppercase tracking-wide whitespace-nowrap ${
                activeTab === "submissions"
                  ? "border-accent text-accent"
                  : "border-transparent text-gray-600 hover:text-accent"
              }`}
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Conexiones ({unreadCount})
            </button>

            <button
              onClick={() => setActiveTab("site")}
              className={`py-4 px-2 border-b-2 transition-colors uppercase tracking-wide whitespace-nowrap ${
                activeTab === "site"
                  ? "border-accent text-accent"
                  : "border-transparent text-gray-600 hover:text-accent"
              }`}
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Sitio
            </button>
          </div>
        </div>
      </div>

      <div className="py-12 px-10">
        <div className="max-w-7xl mx-auto">
          {activeTab === "create" && (
            <div>
              <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setCreateMode("service");
                    setEditingEvent(null);
                  }}
                  className={`px-6 py-3 rounded-lg uppercase tracking-wide transition-colors ${
                    createMode === "service"
                      ? "bg-accent text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {editingService ? "Editar Servicio" : "Crear Servicio"}
                </button>

                <button
                  onClick={() => {
                    setCreateMode("event");
                    setEditingService(null);
                  }}
                  className={`px-6 py-3 rounded-lg uppercase tracking-wide transition-colors ${
                    createMode === "event"
                      ? "bg-accent text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {editingEvent ? "Editar Evento" : "Crear Evento"}
                </button>
              </div>

              {createMode === "service" && (
                <CreateService
                  editing={editingService}
                  onSaved={handleServiceSaved}
                  onCancel={handleCancelEditService}
                />
              )}

              {createMode === "event" && (
                <CreateEvent
                  editing={editingEvent}
                  onSaved={handleEventSaved}
                  onCancel={handleCancelEditEvent}
                />
              )}
            </div>
          )}

          {activeTab === "events" && (
            <EventsList
              events={events}
              onDelete={handleDeleteEvent}
              onEdit={handleEditEvent}
            />
          )}

          {activeTab === "sermons" && (
            <SermonsList
              services={services}
              onDelete={handleDeleteService}
              onEdit={handleEditService}
            />
          )}

          {activeTab === "calendar" && (
            <InternalCalendar events={events} services={services} />
          )}

          {activeTab === "registrations" && (
            <RegistrationsList
              registrations={registrations}
              events={events}
              onArchive={handleArchiveRegistration}
            />
          )}

          {activeTab === "submissions" && (
            <ConectateSubmissions
              submissions={submissions}
              onDelete={handleDeleteSubmission}
              onMarkRead={handleMarkSubmissionRead}
            />
          )}

          {activeTab === "site" && <SiteContent />}
        </div>
      </div>

      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }

          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
