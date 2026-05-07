import { useState } from "react";
import { MapPin, Phone, Mail, ChevronDown } from "lucide-react";
import { supabase } from "../../lib/supabase";

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
      alert(error.message);
      return;
    }

    alert("Gracias por contactarnos. Responderemos pronto.");
    setFormData(initialFormData);
    setShowAdditionalInfo(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-20 px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1
            className="text-accent text-6xl mb-6 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Conéctate
          </h1>

          <p className="text-white/90 text-xl max-w-3xl mx-auto">
            Nos encantaría saber de ti. Completa el formulario o visítanos en persona.
          </p>
        </div>
      </div>

      <div className="py-20 px-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg mb-12">
            <h2
              className="text-primary text-4xl mb-4 text-center"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Mantente Conectado
            </h2>

            <p className="text-gray-500 text-center mb-8">
              Nos encantaría saber de ti. Completa este formulario y nos pondremos en contacto contigo pronto.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Número de Teléfono *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      placeholder="(__) __-__"
                      className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="¿Cómo podemos ayudarle?"
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent resize-y"
                />
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowAdditionalInfo((prev) => !prev)}
                  className="w-full flex items-center justify-between px-4 py-4 bg-gray-50 text-left hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-700 font-semibold">
                    Compartir información adicional
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      showAdditionalInfo ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showAdditionalInfo && (
                  <div className="p-6 space-y-6 bg-white">
                    <div>
                      <h3 className="text-gray-700 font-semibold mb-1">
                        Información adicional opcional
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Si desea compartir más información, puede hacerlo aquí. Estos campos no son obligatorios.
                      </p>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Grupo de Edad
                      </label>
                      <select
                        name="grupoEdad"
                        value={formData.grupoEdad}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="Prefiero no responder">
                          Prefiero no responder
                        </option>
                        <option value="0-11">0-11 años Niños</option>
                        <option value="12-17">12-17 años Jóvenes</option>
                        <option value="18-35">18-35 años</option>
                        <option value="36-55">36-55 años</option>
                        <option value="56+">56+ años</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Dirección
                      </label>
                      <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        placeholder="Opcional"
                        className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Fecha de nacimiento
                      </label>
                      <input
                        type="date"
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white border-2 border-primary text-primary py-4 uppercase tracking-wide hover:bg-primary hover:text-white transition-colors disabled:opacity-60"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {loading ? "Enviando..." : "Entregar"}
              </button>
            </form>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-primary p-8 rounded-lg text-center">
              <MapPin className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3
                className="text-accent text-2xl mb-3 uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Ubicación
              </h3>
              <p className="text-white/80">Dirección por confirmar</p>
            </div>

            <div className="bg-primary p-8 rounded-lg text-center">
              <Phone className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3
                className="text-accent text-2xl mb-3 uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Teléfono
              </h3>
              <p className="text-white/80">Teléfono por confirmar</p>
            </div>

            <div className="bg-primary p-8 rounded-lg text-center">
              <Mail className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3
                className="text-accent text-2xl mb-3 uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Correo
              </h3>
              <p className="text-white/80 break-words">Correo por confirmar</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2
              className="text-primary text-3xl mb-4 uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Visítanos
            </h2>
            <p className="text-gray-700 mb-6">
              Encuéntranos en el mapa para visitarnos en persona.
            </p>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-primary px-8 py-3 uppercase tracking-wide hover:bg-accent/90 transition-colors"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <MapPin className="w-5 h-5" />
              Abrir en Google Maps
            </a>
            <p className="text-gray-500 text-sm mt-3 italic">
              Dirección por confirmar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}