import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Plus, Calendar, Save, X } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { formatTime } from "../../lib/formatTime";
import { requireAdmin } from "../../lib/requireAdmin";

const serviceRules = {
  "Servicio General": {
    day: 0,
    time: "16:30",
    title: "Servicio General",
  },
  "Escuela Dominical": {
    day: 0,
    time: "15:00",
    title: "Escuela Dominical",
  },
  "Servicio Entre Semana": {
    day: 4,
    time: "19:30",
    title: "Servicio Entre Semana",
  },
};

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const getServiceDatesForMonth = (year, month, serviceType) => {
  const rule = serviceRules[serviceType];
  const dates = [];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    if (date.getDay() === rule.day) {
      const dateString = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      dates.push(dateString);
    }

    date.setDate(date.getDate() + 1);
  }

  return dates;
};

const serviceRowToForm = (row) => ({
  title: row.title || "Servicio General",
  service_date: row.service_date || "",
  service_time: row.service_time || "",
  worship_person: row.worship_person || "",
  sermon_person: row.sermon_person || "",
  translation_person: row.translation_person || "",
  video_url: row.video_url || "",
  show_on_calendar: row.show_on_calendar !== false,
  show_on_events: row.show_on_events || false,
  show_on_sermons: row.show_on_sermons || false,
});

export default function CreateService({ editing, onSaved, onCancel }) {
  const navigate = useNavigate();

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

  const [serviceForm, setServiceForm] = useState({
    serviceType: "Servicio General",
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    time: serviceRules["Servicio General"].time,
  });

  const [serviceDrafts, setServiceDrafts] = useState([]);

  const [editForm, setEditForm] = useState(
    editing ? serviceRowToForm(editing) : null
  );

  useEffect(() => {
    if (editing) {
      setEditForm(serviceRowToForm(editing));
      setServiceDrafts([]);
    } else {
      setEditForm(null);
    }
  }, [editing]);

  const handleServiceTypeChange = (e) => {
    const selectedType = e.target.value;
    const rule = serviceRules[selectedType];

    setServiceForm({
      ...serviceForm,
      serviceType: selectedType,
      time: rule.time,
    });

    setServiceDrafts([]);
  };

  const handleServiceFormChange = (e) => {
    const { name, value } = e.target;

    setServiceForm({
      ...serviceForm,
      [name]: value,
    });

    setServiceDrafts([]);
  };

  const generateServiceDrafts = () => {
    const rule = serviceRules[serviceForm.serviceType];

    const serviceDates = getServiceDatesForMonth(
      Number(serviceForm.year),
      Number(serviceForm.month),
      serviceForm.serviceType
    );

    const drafts = serviceDates.map((date) => ({
      title: rule.title,
      service_date: date,
      service_time: serviceForm.time,
      worship_person: "",
      sermon_person: "",
      translation_person: "",
      video_url: "",
      show_on_calendar: true,
      show_on_events: false,
      show_on_sermons: false,
    }));

    setServiceDrafts(drafts);
  };

  const handleServiceDraftChange = (index, field, value) => {
    const updatedDrafts = [...serviceDrafts];

    updatedDrafts[index] = {
      ...updatedDrafts[index],
      [field]: value,
    };

    setServiceDrafts(updatedDrafts);
  };

  const draftHasUserContent = (draft) => {
    return Boolean(
      draft.worship_person.trim() ||
        draft.sermon_person.trim() ||
        draft.translation_person.trim() ||
        draft.video_url.trim()
    );
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();

    if (serviceDrafts.length === 0) {
      generateServiceDrafts();
      return;
    }

    if (!(await guardAction())) {
      return;
    }

    const filledDrafts = serviceDrafts.filter(draftHasUserContent);

    if (filledDrafts.length === 0) {
      alert(
        "Llena por lo menos un servicio antes de guardar. Las fechas generadas vacías no se guardarán."
      );
      return;
    }

    const rows = filledDrafts.map((draft) => ({
      title: draft.title,
      service_date: draft.service_date,
      service_time: draft.service_time,
      location: null,
      description: null,
      worship_person:
        draft.worship_person.trim() === "" ? null : draft.worship_person.trim(),
      sermon_person:
        draft.sermon_person.trim() === "" ? null : draft.sermon_person.trim(),
      translation_person:
        draft.translation_person.trim() === ""
          ? null
          : draft.translation_person.trim(),
      video_url: draft.video_url.trim() === "" ? null : draft.video_url.trim(),
      image_url: null,
      show_on_calendar: true,
      show_on_events: draft.show_on_events,
      show_on_sermons: draft.show_on_sermons,
      deleted: false,
    }));

    console.log("Rows being submitted:", rows);

    const { error } = await supabase.from("services").insert(rows);

    if (error) {
      console.log("Supabase error:", error.message);
      alert(error.message);
      return;
    }

    if (onSaved) {
      await onSaved(null);
    }

    setServiceForm({
      serviceType: "Servicio General",
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      time: serviceRules["Servicio General"].time,
    });

    setServiceDrafts([]);
  };

  const handleEditFieldChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editing || !editing.id || !editForm) {
      return;
    }

    if (!(await guardAction())) {
      return;
    }

    const payload = {
      title: editForm.title,
      service_date: editForm.service_date,
      service_time: editForm.service_time,
      worship_person:
        editForm.worship_person.trim() === ""
          ? null
          : editForm.worship_person.trim(),
      sermon_person:
        editForm.sermon_person.trim() === ""
          ? null
          : editForm.sermon_person.trim(),
      translation_person:
        editForm.translation_person.trim() === ""
          ? null
          : editForm.translation_person.trim(),
      video_url:
        editForm.video_url.trim() === "" ? null : editForm.video_url.trim(),
      show_on_calendar: true,
      show_on_events: editForm.show_on_events,
      show_on_sermons: editForm.show_on_sermons,
    };

    const { data, error } = await supabase
      .from("services")
      .update(payload)
      .eq("id", editing.id)
      .select()
      .single();

    if (error) {
      console.log("Supabase error:", error.message);
      alert(error.message);
      return;
    }

    if (onSaved) {
      await onSaved(data);
    }
  };

  if (editing && editForm) {
    return (
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6 gap-4">
            <h2
              className="text-primary text-3xl uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Editar Servicio
            </h2>

            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors text-sm uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <X className="w-4 h-4" />
              Cancelar
            </button>
          </div>

          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Tipo de Servicio
              </label>
              <select
                value={editForm.title}
                onChange={(e) =>
                  handleEditFieldChange("title", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="Servicio General">Servicio General</option>
                <option value="Escuela Dominical">Escuela Dominical</option>
                <option value="Servicio Entre Semana">
                  Servicio Entre Semana
                </option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Fecha
                </label>
                <input
                  type="date"
                  value={editForm.service_date}
                  onChange={(e) =>
                    handleEditFieldChange("service_date", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Hora
                </label>
                <input
                  type="time"
                  value={editForm.service_time}
                  onChange={(e) =>
                    handleEditFieldChange("service_time", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Alabanza
              </label>
              <input
                type="text"
                value={editForm.worship_person}
                onChange={(e) =>
                  handleEditFieldChange("worship_person", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Predicador
              </label>
              <input
                type="text"
                value={editForm.sermon_person}
                onChange={(e) =>
                  handleEditFieldChange("sermon_person", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Traductor
              </label>
              <input
                type="text"
                value={editForm.translation_person}
                onChange={(e) =>
                  handleEditFieldChange("translation_person", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Video del servicio
              </label>
              <input
                type="url"
                value={editForm.video_url}
                onChange={(e) =>
                  handleEditFieldChange("video_url", e.target.value)
                }
                placeholder="https://youtube.com/..."
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <p className="text-sm text-gray-500">
                Este servicio siempre aparece en el calendario interno.
              </p>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editForm.show_on_events}
                  onChange={(e) =>
                    handleEditFieldChange("show_on_events", e.target.checked)
                  }
                  className="w-4 h-4 text-accent focus:ring-accent"
                />
                <span className="text-gray-700">Publicar en Eventos</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editForm.show_on_sermons}
                  onChange={(e) =>
                    handleEditFieldChange("show_on_sermons", e.target.checked)
                  }
                  className="w-4 h-4 text-accent focus:ring-accent"
                />
                <span className="text-gray-700">Publicar en Sermones</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-white px-6 py-4 rounded-lg hover:bg-accent/90 transition-colors uppercase tracking-wide flex items-center justify-center gap-2"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <Save className="w-5 h-5" />
              Guardar Cambios
            </button>
          </form>
        </div>

        <div>
          <h2
            className="text-primary text-3xl mb-6 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Vista del Servicio
          </h2>

          <div className="bg-white p-6 rounded-lg shadow-md space-y-3">
            <h3
              className="text-primary text-2xl uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {editForm.title}
            </h3>

            <p className="text-gray-700">
              {editForm.service_date || "Fecha"}{" "}
              {editForm.service_time &&
                `a las ${formatTime(editForm.service_time)}`}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Alabanza:</span>{" "}
              {editForm.worship_person || "No asignado"}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Predicador:</span>{" "}
              {editForm.sermon_person || "No asignado"}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Traductor:</span>{" "}
              {editForm.translation_person || "No asignado"}
            </p>

            {editForm.video_url && (
              <a
                href={editForm.video_url}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-accent hover:underline"
              >
                Ver video
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2
          className="text-primary text-3xl mb-6 uppercase tracking-wide"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Crear Servicio
        </h2>

        <form onSubmit={handleServiceSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Tipo de Servicio *
            </label>
            <select
              name="serviceType"
              value={serviceForm.serviceType}
              onChange={handleServiceTypeChange}
              required
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="Servicio General">Servicio General</option>
              <option value="Escuela Dominical">Escuela Dominical</option>
              <option value="Servicio Entre Semana">
                Servicio Entre Semana
              </option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Mes *
              </label>
              <select
                name="month"
                value={serviceForm.month}
                onChange={handleServiceFormChange}
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Año *
              </label>
              <select
                name="year"
                value={serviceForm.year}
                onChange={handleServiceFormChange}
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {[2024, 2025, 2026, 2027, 2028].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Hora automática
            </label>
            <input
              type="time"
              name="time"
              value={serviceForm.time}
              onChange={handleServiceFormChange}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p className="text-sm text-gray-500 mt-1">
              Se llena automáticamente según el tipo, pero puede cambiarse si ese
              mes será diferente. Mostrada como {formatTime(serviceForm.time)}.
            </p>
          </div>

          <button
            type="button"
            onClick={generateServiceDrafts}
            className="w-full bg-primary text-white px-6 py-4 rounded-lg hover:bg-primary/90 transition-colors uppercase tracking-wide flex items-center justify-center gap-2"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <Calendar className="w-5 h-5" />
            Generar Fechas
          </button>

          {serviceDrafts.length > 0 && (
            <button
              type="submit"
              className="w-full bg-accent text-white px-6 py-4 rounded-lg hover:bg-accent/90 transition-colors uppercase tracking-wide flex items-center justify-center gap-2"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <Plus className="w-5 h-5" />
              Guardar Servicios
            </button>
          )}
        </form>
      </div>

      <div>
        <h2
          className="text-primary text-3xl mb-6 uppercase tracking-wide"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Fechas Generadas ({serviceDrafts.length})
        </h2>

        <div className="space-y-4">
          {serviceDrafts.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
              Selecciona el tipo de servicio, mes y año, luego genera las
              fechas.
            </div>
          ) : (
            serviceDrafts.map((draft, index) => (
              <div
                key={`${draft.service_date}-${index}`}
                className="bg-white p-6 rounded-lg shadow-md space-y-4"
              >
                <div>
                  <h3
                    className="text-primary text-2xl uppercase tracking-wide"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {draft.title}
                  </h3>

                  <p className="text-gray-700 text-sm">
                    {draft.service_date}{" "}
                    {draft.service_time &&
                      `a las ${formatTime(draft.service_time)}`}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">
                      Fecha
                    </label>
                    <input
                      type="date"
                      value={draft.service_date}
                      onChange={(e) =>
                        handleServiceDraftChange(
                          index,
                          "service_date",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">
                      Hora
                    </label>
                    <input
                      type="time"
                      value={draft.service_time}
                      onChange={(e) =>
                        handleServiceDraftChange(
                          index,
                          "service_time",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">
                    Alabanza
                  </label>
                  <input
                    type="text"
                    value={draft.worship_person}
                    onChange={(e) =>
                      handleServiceDraftChange(
                        index,
                        "worship_person",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">
                    Predicador
                  </label>
                  <input
                    type="text"
                    value={draft.sermon_person}
                    onChange={(e) =>
                      handleServiceDraftChange(
                        index,
                        "sermon_person",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">
                    Traductor
                  </label>
                  <input
                    type="text"
                    value={draft.translation_person}
                    onChange={(e) =>
                      handleServiceDraftChange(
                        index,
                        "translation_person",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">
                    Video del servicio
                  </label>
                  <input
                    type="url"
                    value={draft.video_url}
                    onChange={(e) =>
                      handleServiceDraftChange(
                        index,
                        "video_url",
                        e.target.value
                      )
                    }
                    placeholder="https://youtube.com/..."
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <p className="text-sm text-gray-500">
                    Este servicio siempre aparece en el calendario interno.
                  </p>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={draft.show_on_events}
                      onChange={(e) =>
                        handleServiceDraftChange(
                          index,
                          "show_on_events",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-accent focus:ring-accent"
                    />
                    <span className="text-gray-700">Publicar en Eventos</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={draft.show_on_sermons}
                      onChange={(e) =>
                        handleServiceDraftChange(
                          index,
                          "show_on_sermons",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-accent focus:ring-accent"
                    />
                    <span className="text-gray-700">Publicar en Sermones</span>
                  </label>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}