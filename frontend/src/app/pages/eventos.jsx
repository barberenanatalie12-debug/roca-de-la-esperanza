import { Calendar, Clock, MapPin, Users, X } from "lucide-react";
import { ContactModal } from "../components/contact-modal";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { supabase } from "../../lib/supabase";
import { formatTime } from "../../lib/formatTime";

function EventCardImage({ imageUrl, externalUrl, alt }) {
  const [errored, setErrored] = useState(false);
  const src = imageUrl || externalUrl;

  if (!src || errored) {
    return (
      <div className="md:w-2/5 bg-primary/10 flex items-center justify-center min-h-[260px]">
        <Calendar className="w-24 h-24 text-accent" />
      </div>
    );
  }

  return (
    <div className="md:w-2/5 bg-primary/10 flex items-center justify-center min-h-[260px] overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setErrored(true)}
      />
    </div>
  );
}

export default function Eventos() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registering, setRegistering] = useState(false);

  const [registrationForm, setRegistrationForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    cantidad_personas: 1,
    nombres_adicionales: "",
    quiere_voluntariar: false,
    mensaje: "",
  });

  const location = useLocation();

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");

      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  async function fetchAll() {
    const [{ data: events, error: eventsError }, { data: services, error: servicesError }] =
      await Promise.all([
        supabase
          .from("events")
          .select("*")
          .eq("deleted", false)
          .eq("show_on_events", true),
        supabase
          .from("services")
          .select("*")
          .eq("deleted", false)
          .eq("show_on_events", true),
      ]);

    if (eventsError) {
      console.error(eventsError);
    }

    if (servicesError) {
      console.error(servicesError);
    }

    const normalizedEvents = (events || []).map((event) => ({
      source: "event",
      id: `event-${event.id}`,
      raw: event,
      title: event.title,
      description: event.description,
      date: event.event_date,
      time: event.event_time,
      location: event.location,
      label: event.event_type,
      image_url: event.image_url,
      external_url: event.external_url,
    }));

    const normalizedServices = (services || []).map((service) => ({
      source: "service",
      id: `service-${service.id}`,
      raw: service,
      title: service.title,
      description: service.description,
      date: service.service_date,
      time: service.service_time,
      location: service.location,
      label: "Servicio",
      image_url: service.image_url,
      external_url: null,
    }));

    const merged = [...normalizedEvents, ...normalizedServices].sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return a.date.localeCompare(b.date);
    });

    setItems(merged);
  }

  function canRegister(item) {
    if (item.source !== "event") {
      return false;
    }

    const event = item.raw;

    return (
      event.event_type === "Evento Local" &&
      event.event_group === "Grupo Local" &&
      event.allow_registration === true
    );
  }

  function openRegistration(item) {
    setSelectedEvent(item.raw);
    setShowRegisterModal(true);
  }

  function closeRegistration() {
    setShowRegisterModal(false);
    setSelectedEvent(null);
    setRegistrationForm({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      cantidad_personas: 1,
      nombres_adicionales: "",
      quiere_voluntariar: false,
      mensaje: "",
    });
  }

  function handleRegistrationChange(e) {
    const { name, value, type, checked } = e.target;

    setRegistrationForm({
      ...registrationForm,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleRegistrationSubmit(e) {
    e.preventDefault();
    setRegistering(true);

    const { error } = await supabase.from("registrate").insert([
      {
        event_id: selectedEvent.id,
        nombre: registrationForm.nombre,
        apellido: registrationForm.apellido,
        email: registrationForm.email,
        telefono: registrationForm.telefono,
        cantidad_personas: Number(registrationForm.cantidad_personas),
        nombres_adicionales: registrationForm.nombres_adicionales,
        quiere_voluntariar: selectedEvent.need_volunteers
          ? registrationForm.quiere_voluntariar
          : false,
        mensaje: registrationForm.mensaje,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Hubo un error al enviar tu registro.");
    } else {
      alert("Tu registro fue enviado correctamente.");
      closeRegistration();
    }

    setRegistering(false);
  }

  const regularEvents = [
    {
      title: "Escuela Dominical",
      when: "Domingos, 3:00 PM",
      description:
        "Un momento de aprendizaje para conocer más de Dios y fortalecer nuestra fe.",
    },
    {
      title: "Culto General",
      when: "Domingos, 4:30 PM",
      description:
        "Un tiempo de adoración a Dios, predicación de la Palabra, comunión y fortalecimiento espiritual.",
    },
    {
      title: "Servicio de Jueves",
      when: "Jueves, 7:30 PM",
      description:
        "Un tiempo para estudiar la Palabra de Dios en profundidad y fortalecer nuestra fe.",
    },
    {
      title: "Reunión de Oración",
      when: "Una vez al mes. Fecha por confirmar.",
      description:
        "Un tiempo mensual dedicado a la oración y búsqueda de Dios.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-20 px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1
            className="text-accent text-6xl mb-6 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Eventos
          </h1>

          <p className="text-white/90 text-xl max-w-3xl mx-auto">
            Únete a nosotros en nuestros eventos especiales y actividades
            regulares. ¡Hay un lugar para ti!
          </p>
        </div>
      </div>

      <div className="py-20 px-10">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-primary text-5xl mb-12 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Próximos Eventos Especiales
          </h2>

          <div className="space-y-12">
            {items.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
                No hay eventos disponibles todavía.
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow-lg overflow-hidden ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <EventCardImage
                    imageUrl={item.image_url}
                    externalUrl={item.external_url}
                    alt={item.title}
                  />

                  <div className="md:w-3/5 p-8">
                    <h3
                      className="text-primary text-4xl mb-4 uppercase tracking-wide"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    <div className="space-y-3">
                      {item.date && (
                        <div className="flex items-center gap-3 text-gray-700">
                          <Calendar className="w-5 h-5 text-accent" />
                          <span className="font-semibold">{item.date}</span>
                        </div>
                      )}

                      {item.time && (
                        <div className="flex items-center gap-3 text-gray-700">
                          <Clock className="w-5 h-5 text-accent" />
                          <span>{formatTime(item.time)}</span>
                        </div>
                      )}

                      {item.location && (
                        <div className="flex items-center gap-3 text-gray-700">
                          <MapPin className="w-5 h-5 text-accent" />
                          <span>{item.location}</span>
                        </div>
                      )}

                      {item.label && (
                        <div className="flex items-center gap-3 text-gray-700">
                          <Users className="w-5 h-5 text-accent" />
                          <span>{item.label}</span>
                        </div>
                      )}
                    </div>

                    {canRegister(item) && (
                      <button
                        onClick={() => openRegistration(item)}
                        className="mt-6 bg-accent text-primary px-6 py-3 uppercase tracking-wide hover:bg-accent/90 transition-colors"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        Registrarse
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div id="actividades-regulares" className="py-20 px-10 bg-accent">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-white text-5xl mb-12 uppercase tracking-wide text-center"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Actividades Regulares
          </h2>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {regularEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-white" />
                  <h3
                    className="text-white text-2xl uppercase tracking-wide"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {event.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-white/90 mb-3">
                  <Clock className="w-4 h-4" />
                  <p className="text-base md:text-lg">{event.when}</p>
                </div>

                <p className="text-white/80 text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-primary py-16 px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-accent text-4xl mb-6 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            ¿Preguntas sobre algún evento?
          </h2>

          <p className="text-white/90 text-lg mb-8">
            Si necesitas más información sobre cualquiera de nuestros eventos o
            quieres ayudar a organizarlos, contáctanos.
          </p>

          <button
            onClick={() => setIsContactModalOpen(true)}
            className="inline-block bg-accent text-primary px-8 py-4 uppercase tracking-wide hover:bg-accent/90 transition-colors"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Contáctanos
          </button>
        </div>
      </div>

      {showRegisterModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeRegistration}
          />

          <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden">
            <div className="bg-primary text-white px-8 py-6 relative">
              <button
                onClick={closeRegistration}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <h2
                className="text-3xl uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Registrarse
              </h2>

              <p className="text-white/80">{selectedEvent.title}</p>
            </div>

            <form onSubmit={handleRegistrationSubmit} className="p-8 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={registrationForm.nombre}
                    onChange={handleRegistrationChange}
                    required
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    name="apellido"
                    value={registrationForm.apellido}
                    onChange={handleRegistrationChange}
                    required
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={registrationForm.email}
                    onChange={handleRegistrationChange}
                    required
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={registrationForm.telefono}
                    onChange={handleRegistrationChange}
                    required
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  ¿Cuántas personas asistirán incluyendo usted? *
                </label>
                <input
                  type="number"
                  name="cantidad_personas"
                  min="1"
                  value={registrationForm.cantidad_personas}
                  onChange={handleRegistrationChange}
                  required
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Nombres de familiares o acompañantes
                </label>
                <textarea
                  name="nombres_adicionales"
                  value={registrationForm.nombres_adicionales}
                  onChange={handleRegistrationChange}
                  rows={3}
                  placeholder="Ej. Maria, Jose, Daniel"
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>

              {selectedEvent.need_volunteers && (
                <label className="flex items-center gap-3 text-gray-700 font-semibold">
                  <input
                    type="checkbox"
                    name="quiere_voluntariar"
                    checked={registrationForm.quiere_voluntariar}
                    onChange={handleRegistrationChange}
                    className="w-5 h-5"
                  />
                  Me gustaría ayudar como voluntario si se necesita
                </label>
              )}

              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Mensaje
                </label>
                <textarea
                  name="mensaje"
                  value={registrationForm.mensaje}
                  onChange={handleRegistrationChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={registering}
                className="w-full bg-accent text-primary px-6 py-4 uppercase tracking-wide hover:bg-accent/90 transition-colors disabled:opacity-50"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {registering ? "Enviando..." : "Enviar Registro"}
              </button>
            </form>
          </div>
        </div>
      )}

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
