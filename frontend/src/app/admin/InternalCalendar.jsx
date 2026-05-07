import { useState } from "react";
import { Camera, Printer } from "lucide-react";
import { formatTime } from "../../lib/formatTime";

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

const weekdays = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month, year) => {
  return new Date(year, month, 1).getDay();
};

const normalizeDate = (value) => {
  if (!value) return "";

  if (typeof value === "string") {
    return value.split("T")[0];
  }

  return new Date(value).toISOString().split("T")[0];
};

export default function InternalCalendar({ events = [], services = [] }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const getEntriesForDate = (date) => {
    const dateString = `${selectedYear}-${String(selectedMonth + 1).padStart(
      2,
      "0"
    )}-${String(date).padStart(2, "0")}`;

    const eventEntries = events
      .filter((entry) => {
        return (
          normalizeDate(entry.event_date) === dateString &&
          entry.show_on_calendar !== false
        );
      })
      .map((entry) => ({
        ...entry,
        calendar_id: `event-${entry.id}`,
        calendar_date: entry.event_date,
        calendar_time: entry.event_time,
        calendar_type: entry.event_type || "Evento",
      }));

    const serviceEntries = services
      .filter((entry) => {
        return (
          normalizeDate(entry.service_date) === dateString &&
          entry.show_on_calendar !== false
        );
      })
      .map((entry) => ({
        ...entry,
        calendar_id: `service-${entry.id}`,
        calendar_date: entry.service_date,
        calendar_time: entry.service_time,
        calendar_type: entry.title || "Servicio",
      }));

    return [...eventEntries, ...serviceEntries].sort((a, b) => {
      return String(a.calendar_time || "").localeCompare(
        String(b.calendar_time || "")
      );
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleScreenshot = () => {
    alert(
      "Usa la herramienta de captura de pantalla de tu computadora para guardar el calendario."
    );
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="bg-gray-50 min-h-24" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const entries = getEntriesForDate(day);

      days.push(
        <div key={day} className="border border-gray-200 min-h-28 p-2 bg-white">
          <div className="font-semibold text-gray-700 mb-1">{day}</div>

          <div className="space-y-1">
            {entries.map((entry) => (
              <div key={entry.calendar_id} className="text-xs leading-tight">
                <div className="font-semibold text-accent">
                  {entry.calendar_type}
                </div>

                {entry.calendar_time && (
                  <div className="text-gray-700">
                    {formatTime(entry.calendar_time)}
                  </div>
                )}

                {entry.worship_person && (
                  <div className="text-gray-700">
                    <span className="font-semibold">A:</span>{" "}
                    {entry.worship_person}
                  </div>
                )}

                {entry.sermon_person && (
                  <div className="text-gray-700">
                    <span className="font-semibold">T:</span>{" "}
                    {entry.sermon_person}
                  </div>
                )}

                {entry.translation_person && (
                  <div className="text-gray-700">
                    <span className="font-semibold">Tr:</span>{" "}
                    {entry.translation_person}
                  </div>
                )}

                {!entry.worship_person &&
                  !entry.sermon_person &&
                  !entry.translation_person && (
                    <>
                      <div className="text-gray-700">
                        {entry.title || entry.name}
                      </div>

                      {entry.location && (
                        <div className="text-gray-600">{entry.location}</div>
                      )}
                    </>
                  )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div>
      <div className="bg-white border-b border-gray-200 py-4 px-6 rounded-lg shadow-md mb-8 print:hidden">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-semibold">Mes:</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="px-4 py-2 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-semibold">Año:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-4 py-2 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {[2024, 2025, 2026, 2027, 2028].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleScreenshot}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded hover:bg-accent/90 transition-colors"
          >
            <Camera className="w-4 h-4" />
            Vista para Captura
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Imprimir
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-white py-8 text-center border-b border-gray-200">
          <h2
            className="text-accent text-5xl mb-2 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {months[selectedMonth]}
          </h2>

          <p className="text-gray-600 text-2xl">{selectedYear}</p>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-7 gap-0">
            {weekdays.map((day) => (
              <div
                key={day}
                className="bg-accent text-white text-center py-3 font-semibold text-sm border border-accent"
              >
                {day}
              </div>
            ))}

            {renderCalendarDays()}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 print:hidden">
          <p className="text-sm text-gray-600 text-center italic">
            Este calendario es solo para uso interno del administrador.
          </p>
        </div>
      </div>
    </div>
  );
}