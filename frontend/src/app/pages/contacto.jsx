import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  HeartHandshake,
  Church,
  MessageCircle,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { Toast } from "../components/Toast";

const initialToast = { open: false, type: "success", title: "", message: "" };

export default function Contacto() {
  const initialFormData = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    grupoEdad: "Prefiero no responder",
    direccion: "",
    fechaNacimiento: "",
    mensaje: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [toast, setToast] = useState(initialToast);

  const closeToast = () => setToast((prev) => ({ ...prev, open: false }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const mensajeLimpio = formData.mensaje.trim();

    const extraInfo = [
      formData.grupoEdad && formData.grupoEdad !== "Prefiero no responder"
        ? `Grupo de edad: ${formData.grupoEdad}`
        : null,
    ]
      .filter(Boolean)
      .join("\n");

    const fullDescription = extraInfo
      ? `${mensajeLimpio}\n\nInformación adicional:\n${extraInfo}`
      : mensajeLimpio;

    const submission = {
      first_name: formData.nombre.trim(),
      last_name: formData.apellido.trim(),
      email: formData.email.trim(),
      phone_number: formData.telefono.trim(),
      grupo_de_edad: formData.grupoEdad || "Prefiero no responder",
      direccion: formData.direccion.trim() || null,
      fecha_nacimiento: formData.fechaNacimiento || null,
      descripcion: fullDescription || "Sin mensaje",
      read: false,
      deleted: false,
    };

    const { error } = await supabase
      .from("conectate_submision")
      .insert([submission]);

    setLoading(false);

    if (error) {
      console.log("Supabase error:", error);
      setToast({
        open: true,
        type: "error",
        title: "Hubo un problema",
        message:
          "No se pudo enviar tu información. Por favor intenta de nuevo.",
      });
      return;
    }

    setToast({
      open: true,
      type: "success",
      title: "¡Gracias!",
      message:
        "Gracias por llenar este formulario. Nuestro equipo estará en contacto contigo dentro de 2 a 3 días hábiles.",
    });
    setFormData(initialFormData);
    setShowAdditionalInfo(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputClass =
    "w-full rounded-lg border border-accent/20 bg-white px-4 py-3 text-gray-700 shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25";

  const iconInputClass =
    "w-full rounded-lg border border-accent/20 bg-white py-3 pl-12 pr-4 text-gray-700 shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25";

  const contactCards = [
    {
      title: "Ubicación",
      icon: MapPin,
      content: (
        <p className="text-white/85">
          4445 Fruitridge Road
          <br />
          Sacramento, CA 95820
        </p>
      ),
    },
    {
      title: "Teléfono",
      icon: Phone,
      content: (
        <a
          href="tel:+17145537055"
          className="text-white/85 transition-colors hover:text-accent"
        >
          (714) 553 7055
        </a>
      ),
    },
    {
      title: "Correo",
      icon: Mail,
      content: <p className="break-words text-white/85">Correo por confirmar</p>,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-primary px-6 py-16 text-white md:px-10 md:py-20 border-t-4 border-accent">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />

        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.26em] text-accent">
              Estamos para servirte
            </p>

            <h1
              className="mb-5 text-5xl uppercase tracking-wide text-white md:text-6xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Conéctate
            </h1>

            <p className="max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl">
              Nos encantaría saber de ti. Comparte tu información y nuestro
              equipo se pondrá en contacto contigo con mucho gusto.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="rounded-full border border-accent/40 bg-accent/10 px-5 py-2 text-sm text-white/90">
                Oración
              </div>

              <div className="rounded-full border border-accent/40 bg-accent/10 px-5 py-2 text-sm text-white/90">
                Consejería
              </div>

              <div className="rounded-full border border-accent/40 bg-accent/10 px-5 py-2 text-sm text-white/90">
                Visitas
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-accent/30 bg-white/10 p-7 shadow-xl shadow-black/10 backdrop-blur">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary shadow-md shadow-black/10">
              <Church className="h-7 w-7" />
            </div>

            <h2
              className="mb-4 text-4xl uppercase tracking-wide text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Hay un lugar para ti
            </h2>

            <p className="leading-relaxed text-white/85">
              Ya sea tu primera vez visitándonos o si deseas volver a
              conectarte, queremos recibirte con amor y acompañarte en tu
              caminar con Cristo.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-16 md:px-10 md:py-20 bg-gradient-to-br from-accent/10 via-white to-primary/5">
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="rounded-xl border border-accent/25 bg-white p-7 shadow-xl shadow-primary/10 md:p-10">
              <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <HeartHandshake className="h-7 w-7" />
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                    Queremos conocerte
                  </p>

                  <h2
                    className="mb-3 text-4xl uppercase tracking-wide text-primary"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Mantente Conectado
                  </h2>

                  <p className="max-w-2xl text-gray-600">
                    Completa este formulario y nos pondremos en contacto contigo
                    pronto. Queremos ayudarte, orar contigo y acompañarte.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-semibold text-gray-700">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-semibold text-gray-700">
                      Apellido *
                    </label>
                    <input
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-semibold text-gray-700">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-accent" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={iconInputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-semibold text-gray-700">
                      Número de Teléfono *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-accent" />
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        placeholder="(__) __ __"
                        className={iconInputClass}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    Mensaje *
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="¿Cómo podemos ayudarle?"
                    className={`${inputClass} resize-y`}
                  />
                </div>

                <div className="overflow-hidden rounded-lg border border-accent/25 bg-white">
                  <button
                    type="button"
                    onClick={() => setShowAdditionalInfo((prev) => !prev)}
                    className="flex w-full items-center justify-between bg-accent/10 px-4 py-4 text-left transition-colors hover:bg-accent/15"
                  >
                    <span className="font-semibold text-primary">
                      Compartir información adicional
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-accent transition-transform ${
                        showAdditionalInfo ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showAdditionalInfo && (
                    <div className="space-y-6 border-t border-accent/20 bg-white p-6">
                      <div>
                        <h3 className="mb-1 font-semibold text-gray-700">
                          Información adicional opcional
                        </h3>
                        <p className="text-sm text-gray-500">
                          Si desea compartir más información, puede hacerlo
                          aquí. Estos campos no son obligatorios.
                        </p>
                      </div>

                      <div>
                        <label className="mb-2 block font-semibold text-gray-700">
                          Grupo de Edad
                        </label>
                        <select
                          name="grupoEdad"
                          value={formData.grupoEdad}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="Prefiero no responder">
                            Prefiero no responder
                          </option>
                          <option value="0-11">0 a 11 años Niños</option>
                          <option value="12-17">12 a 17 años Jóvenes</option>
                          <option value="18-35">18 a 35 años</option>
                          <option value="36-55">36 a 55 años</option>
                          <option value="56+">56 años o más</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block font-semibold text-gray-700">
                          Dirección
                        </label>
                        <input
                          type="text"
                          name="direccion"
                          value={formData.direccion}
                          onChange={handleChange}
                          placeholder="Opcional"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="mb-2 block font-semibold text-gray-700">
                          Fecha de nacimiento
                        </label>
                        <input
                          type="date"
                          name="fechaNacimiento"
                          value={formData.fechaNacimiento}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-accent px-6 py-4 text-primary shadow-md shadow-accent/20 transition-colors hover:bg-accent/90 disabled:opacity-60"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {loading ? "Enviando..." : "Entregar"}
                </button>
              </form>
            </div>

            <aside className="space-y-6">
              <div className="rounded-xl bg-primary p-8 text-white shadow-xl shadow-primary/15 border-t-4 border-accent">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
                  <MessageCircle className="h-6 w-6" />
                </div>

                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.26em] text-accent">
                  Un mensaje basta
                </p>

                <h3
                  className="mb-4 text-4xl uppercase tracking-wide"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Queremos escuchar de ti
                </h3>

                <p className="leading-relaxed text-white/90">
                  Puedes escribirnos para pedir oración, preguntar por nuestros
                  cultos, recibir apoyo pastoral o conocer más sobre la iglesia.
                </p>
              </div>

              <div className="overflow-hidden rounded-xl shadow-xl shadow-primary/10 border border-accent/25">
                {contactCards.map((card, index) => {
                  const Icon = card.icon;

                  return (
                    <div
                      key={card.title}
                      className={`bg-primary px-7 py-6 text-white ${
                        index !== contactCards.length - 1
                          ? "border-b border-white/15"
                          : ""
                      }`}
                    >
                      <div className="mb-3 flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent">
                          <Icon className="h-5 w-5" />
                        </div>

                        <h3
                          className="text-2xl uppercase tracking-wide text-accent"
                          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                          {card.title}
                        </h3>
                      </div>

                      {card.content}
                    </div>
                  );
                })}
              </div>

              <div className="rounded-xl border border-accent/25 bg-white p-7 text-center shadow-xl shadow-primary/10">
                <h2
                  className="mb-3 text-3xl uppercase tracking-wide text-primary"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Visítanos
                </h2>

                <p className="mb-6 text-gray-700">
                  4445 Fruitridge Road, Sacramento, CA 95820
                </p>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=4445+Fruitridge+Road%2C+Sacramento%2C+CA+95820"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 uppercase tracking-wide text-white shadow-md shadow-primary/20 transition-colors hover:bg-primary/90"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <MapPin className="h-5 w-5" />
                  Cómo llegar
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Toast {...toast} onClose={closeToast} />
    </div>
  );
}