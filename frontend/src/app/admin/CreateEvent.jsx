import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Plus, Save, X, Trash2, ImagePlus, AlertCircle } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { requireAdmin } from "../../lib/requireAdmin";

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
    "Evento Local": "bg-blue-100 text-blue-800",
    "Evento Distrito": "bg-green-100 text-green-800",
    "Evento Presbiterial": "bg-purple-100 text-purple-800",
  };

  return colors[type] || "bg-gray-100 text-gray-800";
};

const emptyEventForm = {
  eventType: "Evento Local",
  eventGroup: "Grupo Local",
  title: "",
  date: "",
  time: "",
  location: "",
  description: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  enableRegistration: false,
  needVolunteers: false,
};

const eventRowToForm = (row) => ({
  eventType: row.event_type || "Evento Local",
  eventGroup: row.event_group || "Grupo Local",
  title: row.title || "",
  date: row.event_date || "",
  time: row.event_time || "",
  location: row.location || "",
  description: row.description || "",
  contactName: row.contact_name || "",
  contactPhone: row.contact_phone || "",
  contactEmail: row.contact_email || "",
  enableRegistration: row.allow_registration || false,
  needVolunteers: row.need_volunteers || false,
});

const looksLikeImageUrl = (value) => {
  if (!value) return false;
  const trimmed = String(value).trim();
  if (trimmed.startsWith("data:image/")) return true;
  if (trimmed.startsWith("blob:")) return true;
  if (/^https?:\/\//i.test(trimmed)) return true;
  return false;
};

export default function CreateEvent({ editing, onSaved, onCancel }) {
  const navigate = useNavigate();

  const [eventForm, setEventForm] = useState(
    editing ? eventRowToForm(editing) : emptyEventForm
  );

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(
    editing && editing.image_url ? editing.image_url : ""
  );
  const [imagePreview, setImagePreview] = useState(
    editing && editing.image_url ? editing.image_url : null
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (editing) {
      setEventForm(eventRowToForm(editing));
      setImageFile(null);
      setImageUrl(editing.image_url || "");
      setImagePreview(editing.image_url || null);
    } else {
      setEventForm(emptyEventForm);
      setImageFile(null);
      setImageUrl("");
      setImagePreview(null);
    }
    setSubmitError("");
  }, [editing]);

  useEffect(() => {
    if (!imageFile) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  const canRegister =
    eventForm.eventType === "Evento Local" &&
    eventForm.eventGroup === "Grupo Local";

  const showContactInfo = eventForm.eventType !== "Evento Local";

  const uploadImage = async (file) => {
    if (!file) {
      return null;
    }

    const cleanName = file.name
      ? file.name.replace(/\s+/g, "_")
      : `pasted-${Date.now()}.png`;
    const fileName = `${Date.now()}-${cleanName}`;

    const { error } = await supabase.storage
      .from("event-images")
      .upload(fileName, file);

    if (error) {
      console.log("Supabase storage error (full):", error);
      setSubmitError(
        `No se pudo subir la imagen: ${error.message || "error desconocido"}`
      );
      return null;
    }

    const { data } = supabase.storage
      .from("event-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleEventFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "eventType" || name === "eventGroup") {
      const nextForm = {
        ...eventForm,
        [name]: value,
      };

      const nextCanRegister =
        nextForm.eventType === "Evento Local";

      setEventForm({
        ...nextForm,
        enableRegistration: nextCanRegister
          ? nextForm.enableRegistration
          : false,
        needVolunteers: nextCanRegister ? nextForm.needVolunteers : false,
      });

      return;
    }

    setEventForm({
      ...eventForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const acceptFile = (file) => {
    if (!file) return;
    if (!file.type || !file.type.startsWith("image/")) {
      setSubmitError("El archivo seleccionado no es una imagen.");
      return;
    }
    setImageFile(file);
    setImageUrl("");
    setSubmitError("");
  };

  const acceptUrl = (rawUrl) => {
    if (!rawUrl) return;
    const trimmed = String(rawUrl).trim();
    if (!looksLikeImageUrl(trimmed)) {
      setSubmitError("La URL pegada no parece ser una imagen válida.");
      return;
    }
    setImageUrl(trimmed);
    setImageFile(null);
    setImagePreview(trimmed);
    setSubmitError("");
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      acceptFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleImageDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = Array.from(e.dataTransfer.files).find(
        (f) => f.type && f.type.startsWith("image/")
      );

      if (file) {
        acceptFile(file);
        return;
      }
    }

    const uriList = e.dataTransfer.getData("text/uri-list");

    if (uriList) {
      const firstUri = uriList.split("\n")[0].trim();
      if (firstUri) {
        acceptUrl(firstUri);
        return;
      }
    }

    const text = e.dataTransfer.getData("text/plain");

    if (text) {
      acceptUrl(text);
    }
  };

  const handleImagePaste = (e) => {
    const clipboardFiles = e.clipboardData && e.clipboardData.files;

    if (clipboardFiles && clipboardFiles.length > 0) {
      const file = Array.from(clipboardFiles).find(
        (f) => f.type && f.type.startsWith("image/")
      );

      if (file) {
        e.preventDefault();
        acceptFile(file);
        return;
      }
    }

    const text =
      e.clipboardData && e.clipboardData.getData
        ? e.clipboardData.getData("text")
        : "";

    if (text && looksLikeImageUrl(text)) {
      e.preventDefault();
      acceptUrl(text);
    }
  };

  const handleImageUrlChange = (e) => {
    const value = e.target.value;
    setImageUrl(value);
    setImageFile(null);
    if (value && looksLikeImageUrl(value)) {
      setImagePreview(value);
    } else if (!value) {
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImageUrl("");
    setImagePreview(null);
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    const auth = await requireAdmin();

    if (!auth.ok) {
      setSubmitting(false);
      if (auth.reason === "unauthenticated") {
        alert("Tu sesión ha expirado. Inicia sesión nuevamente.");
        navigate("/login", { replace: true });
      } else if (auth.reason === "not-admin") {
        alert("No tienes permiso para realizar esta acción.");
        navigate("/", { replace: true });
      } else {
        setSubmitError("No se pudo verificar el acceso de administrador.");
      }
      return;
    }

    let finalImageUrl = null;

    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (!uploadedUrl) {
        setSubmitting(false);
        return;
      }
      finalImageUrl = uploadedUrl;
    } else if (imageUrl && looksLikeImageUrl(imageUrl)) {
      finalImageUrl = imageUrl.trim();
    } else if (
      imagePreview &&
      typeof imagePreview === "string" &&
      !imagePreview.startsWith("data:") &&
      !imagePreview.startsWith("blob:")
    ) {
      finalImageUrl = imagePreview;
    }

    const submitCanRegister =
      eventForm.eventType === "Evento Local" &&
      eventForm.eventGroup === "Grupo Local";

    const titleTrimmed = eventForm.title.trim();
    const locationTrimmed = eventForm.location.trim();
    const descriptionTrimmed = eventForm.description.trim();

    if (!titleTrimmed) {
      setSubmitting(false);
      setSubmitError("El título es obligatorio.");
      return;
    }

    if (!eventForm.date) {
      setSubmitting(false);
      setSubmitError("La fecha es obligatoria.");
      return;
    }

    if (!eventForm.time) {
      setSubmitting(false);
      setSubmitError("La hora es obligatoria.");
      return;
    }

    if (!locationTrimmed) {
      setSubmitting(false);
      setSubmitError("La ubicación es obligatoria.");
      return;
    }

    const payload = {
      title: titleTrimmed,
      description: descriptionTrimmed || null,
      event_date: eventForm.date,
      event_time: eventForm.time,
      location: locationTrimmed,
      event_type: eventForm.eventType,
      event_group: eventForm.eventGroup,
      show_on_calendar: true,
      show_on_events: true,
      show_on_sermons: false,
      deleted: false,
      allow_registration: submitCanRegister
        ? eventForm.enableRegistration
        : false,
      need_volunteers: submitCanRegister ? eventForm.needVolunteers : false,
      image_url: finalImageUrl,
      contact_name:
        eventForm.eventType === "Evento Local"
          ? null
          : eventForm.contactName.trim() === ""
          ? null
          : eventForm.contactName.trim(),
      contact_phone:
        eventForm.eventType === "Evento Local"
          ? null
          : eventForm.contactPhone.trim() === ""
          ? null
          : eventForm.contactPhone.trim(),
      contact_email:
        eventForm.eventType === "Evento Local"
          ? null
          : eventForm.contactEmail.trim() === ""
          ? null
          : eventForm.contactEmail.trim(),
    };

    let result;

    if (editing && editing.id) {
      result = await supabase
        .from("events")
        .update(payload)
        .eq("id", editing.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from("events")
        .insert([payload])
        .select()
        .single();
    }

    if (result.error) {
      console.log("Supabase error (full):", result.error);
      setSubmitting(false);
      setSubmitError(
        result.error.message ||
          "Error al guardar el evento. Verifica los campos e intenta nuevamente."
      );
      return;
    }

    if (onSaved) {
      await onSaved(result.data);
    }

    setEventForm(emptyEventForm);
    setImageFile(null);
    setImageUrl("");
    setImagePreview(null);
    setSubmitError("");
    setSubmitting(false);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6 gap-4">
          <h2
            className="text-primary text-3xl uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {editing ? "Editar Evento" : "Crear Evento"}
          </h2>

          {editing && (
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors text-sm uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <X className="w-4 h-4" />
              Cancelar
            </button>
          )}
        </div>

        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleEventSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Tipo de Evento *
            </label>
            <select
              name="eventType"
              value={eventForm.eventType}
              onChange={handleEventFormChange}
              required
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Grupo *
            </label>
            <select
              name="eventGroup"
              value={eventForm.eventGroup}
              onChange={handleEventFormChange}
              required
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {eventGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Título del Evento *
            </label>
            <input
              type="text"
              name="title"
              value={eventForm.title}
              onChange={handleEventFormChange}
              required
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Fecha *
              </label>
              <input
                type="date"
                name="date"
                value={eventForm.date}
                onChange={handleEventFormChange}
                required
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Hora *
              </label>
              <input
                type="time"
                name="time"
                value={eventForm.time}
                onChange={handleEventFormChange}
                required
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Ubicación *
            </label>
            <input
              type="text"
              name="location"
              value={eventForm.location}
              onChange={handleEventFormChange}
              required
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Descripción
            </label>
            <textarea
              name="description"
              value={eventForm.description}
              onChange={handleEventFormChange}
              rows={4}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />
          </div>

          {showContactInfo && (
            <div className="border-t border-gray-200 pt-4 space-y-4">
              <p className="text-gray-700 font-semibold">
                Estos eventos no tienen registro. El botón público mostrará un
                mensaje de más información.
              </p>

              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Nombre de Contacto
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={eventForm.contactName}
                  onChange={handleEventFormChange}
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Teléfono de Contacto
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={eventForm.contactPhone}
                  onChange={handleEventFormChange}
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Email de Contacto
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={eventForm.contactEmail}
                  onChange={handleEventFormChange}
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Imagen del evento
            </label>

            <div
              onDragOver={handleDragOver}
              onDrop={handleImageDrop}
              onPaste={handleImagePaste}
              tabIndex={0}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 mb-3 focus:outline-none focus:border-accent transition-colors"
            >
              {imagePreview ? (
                <div className="space-y-3">
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="max-h-64 mx-auto rounded shadow-sm"
                    onError={() => {
                      setImagePreview(null);
                      setSubmitError(
                        "No se pudo cargar la imagen desde la URL proporcionada."
                      );
                    }}
                  />
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={removeImage}
                      className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Quitar imagen
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <ImagePlus className="w-10 h-10 text-gray-400 mx-auto" />
                  <p className="text-gray-600 font-semibold">
                    Arrastra una imagen aquí
                  </p>
                  <p className="text-gray-500 text-xs">
                    Soporta archivos, drag-and-drop desde internet, copiar/pegar
                    imagen o URL
                  </p>
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
              />

              <input
                type="url"
                value={imageUrl}
                onChange={handleImageUrlChange}
                placeholder="O pega una URL de imagen aquí"
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          {canRegister && (
            <div className="border-t border-gray-200 pt-4">
              <label className="block text-gray-700 mb-3 font-semibold">
                Opciones de Registro
              </label>

              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="enableRegistration"
                    checked={eventForm.enableRegistration}
                    onChange={handleEventFormChange}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="text-gray-700">
                    Permitir registro para este evento
                  </span>
                </label>

                {eventForm.enableRegistration && (
                  <label className="flex items-center gap-2 ml-6">
                    <input
                      type="checkbox"
                      name="needVolunteers"
                      checked={eventForm.needVolunteers}
                      onChange={handleEventFormChange}
                      className="w-4 h-4 text-accent focus:ring-accent"
                    />
                    <span className="text-gray-700">
                      Necesitamos voluntarios
                    </span>
                  </label>
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-accent text-white px-6 py-4 rounded-lg hover:bg-accent/90 transition-colors uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {editing ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {submitting
              ? "Guardando..."
              : editing
              ? "Guardar Cambios"
              : "Crear Evento"}
          </button>
        </form>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md h-fit">
        <h2
          className="text-primary text-3xl mb-6 uppercase tracking-wide"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Vista del Evento
        </h2>

        <div className="border rounded-lg overflow-hidden">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Vista previa"
              className="w-full h-56 object-cover"
              onError={() => setImagePreview(null)}
            />
          ) : (
            <div className="w-full h-56 bg-primary/10 flex items-center justify-center">
              <ImagePlus className="w-16 h-16 text-accent" />
            </div>
          )}

          <div className="p-6 space-y-3">
            <div className="flex flex-wrap gap-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getEventTypeBadgeColor(
                  eventForm.eventType
                )}`}
              >
                {eventForm.eventType}
              </span>
              <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                {eventForm.eventGroup}
              </span>
            </div>

            <h3
              className="text-primary text-3xl uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {eventForm.title || "Título del evento"}
            </h3>

            <p className="text-gray-700">
              {eventForm.date || "Fecha"}{" "}
              {eventForm.time && `a las ${eventForm.time}`}
            </p>

            <p className="text-gray-700">
              {eventForm.location || "Ubicación"}
            </p>

            <p className="text-gray-600">
              {eventForm.description || "Descripción del evento"}
            </p>

            {showContactInfo && (
              <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                Para más información contacte a{" "}
                {eventForm.contactName || "la persona encargada"}.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
