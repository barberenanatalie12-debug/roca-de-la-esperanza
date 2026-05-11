import { useState } from "react";
import { Printer } from "lucide-react";
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
        calendar_title: entry.title || entry.name || "Evento",
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
        calendar_type: "Servicio",
        calendar_title: entry.title || "Servicio",
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

  const renderEntry = (entry) => {
    const title = entry.calendar_title?.trim();
    const type = entry.calendar_type?.trim();
    const location = entry.location?.trim();
    const worshipPerson = entry.worship_person?.trim();
    const sermonPerson = entry.sermon_person?.trim();
    const translationPerson = entry.translation_person?.trim();

    return (
      <div
        key={entry.calendar_id}
        className="rounded border border-gray-200 bg-gray-50 px-1.5 py-1 text-[10px] leading-tight calendar-entry break-words"
      >
        <div className="flex items-center justify-between gap-1">
          {type && (
            <span className="font-semibold text-accent truncate">{type}</span>
          )}

          {entry.calendar_time && (
            <span className="text-gray-700 shrink-0">
              {formatTime(entry.calendar_time)}
            </span>
          )}
        </div>

        {title && (
          <div className="text-gray-800 calendar-entry-title">{title}</div>
        )}

        {(worshipPerson || sermonPerson || translationPerson) && (
          <div className="text-gray-600 mt-0.5 space-y-0.5 calendar-people">
            {worshipPerson && (
              <div className="person-line">
                <span className="font-semibold">A:</span> {worshipPerson}
              </div>
            )}

            {sermonPerson && (
              <div className="person-line">
                <span className="font-semibold">T:</span> {sermonPerson}
              </div>
            )}

            {translationPerson && (
              <div className="person-line">
                <span className="font-semibold">Tr:</span> {translationPerson}
              </div>
            )}
          </div>
        )}

        {!worshipPerson &&
          !sermonPerson &&
          !translationPerson &&
          location && <div className="text-gray-600 location-line">{location}</div>}
      </div>
    );
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="bg-gray-50 border border-gray-200 calendar-day empty-day"
        />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const entries = getEntriesForDate(day);

      days.push(
        <div
          key={day}
          className="border border-gray-200 bg-white p-1.5 calendar-day"
        >
          <div className="flex items-center justify-between mb-1 calendar-day-header">
            <span className="font-bold text-gray-800 text-sm calendar-day-number">
              {day}
            </span>

            {entries.length > 1 && (
              <span className="text-[9px] text-gray-500 calendar-entry-count">
                {entries.length}
              </span>
            )}
          </div>

          {entries.length > 0 && (
            <div className="space-y-1 calendar-entry-list">
              {entries.map((entry) => renderEntry(entry))}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-page">
      <div className="bg-white border-b border-gray-200 py-4 px-6 rounded-lg shadow-md mb-6 print:hidden">
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
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Imprimir
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden calendar-wrapper">
        <div className="bg-primary py-4 text-center border-b border-accent calendar-header">
          <p className="text-white/80 text-xs uppercase tracking-[0.25em] mb-1 calendar-subtitle">
            Calendario Interno
          </p>

          <h2
            className="text-accent text-4xl uppercase tracking-wide leading-none calendar-title"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {months[selectedMonth]} {selectedYear}
          </h2>

          <p className="text-white/80 text-xs mt-1 calendar-church-name">
            Iglesia Cristiana Roca de la Esperanza
          </p>
        </div>

        <div className="p-3 calendar-body">
          <div className="grid grid-cols-7 gap-0 calendar-grid">
            {weekdays.map((day) => (
              <div
                key={day}
                className="bg-accent text-white text-center py-2 font-semibold text-xs border border-accent calendar-weekday"
              >
                {day}
              </div>
            ))}

            {renderCalendarDays()}
          </div>
        </div>

        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 print:hidden">
          <p className="text-xs text-gray-600 text-center italic">
            Este calendario es solo para uso interno del administrador.
          </p>
        </div>
      </div>

      <style>{`
        .calendar-page {
          width: 100%;
        }

        .calendar-wrapper {
          max-width: 1100px;
          margin: 0 auto;
        }

        .calendar-day {
          min-height: 98px;
          overflow: visible;
        }

        .empty-day {
          min-height: 98px;
        }

        .calendar-entry-title,
        .person-line,
        .location-line {
          white-space: normal;
          overflow: visible;
          text-overflow: clip;
          overflow-wrap: anywhere;
        }

        @media screen and (max-width: 900px) {
          .calendar-wrapper {
            overflow-x: auto;
          }

          .calendar-grid {
            min-width: 900px;
          }
        }

        @media print {
          @page {
            size: landscape;
            margin: 0.18in;
          }

          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          .print\\:hidden {
            display: none !important;
          }

          .calendar-page {
            width: 100%;
          }

          .calendar-wrapper {
            box-shadow: none !important;
            border-radius: 0 !important;
            max-width: none !important;
            width: 100% !important;
            page-break-inside: avoid;
            overflow: visible !important;
          }

          .calendar-header {
            padding-top: 5px !important;
            padding-bottom: 5px !important;
          }

          .calendar-subtitle,
          .calendar-church-name {
            font-size: 7px !important;
            line-height: 1 !important;
            margin: 0 !important;
          }

          .calendar-title {
            font-size: 24px !important;
            line-height: 1 !important;
          }

          .calendar-body {
            padding: 4px !important;
          }

          .calendar-weekday {
            font-size: 8px !important;
            padding-top: 3px !important;
            padding-bottom: 3px !important;
          }

          .calendar-day,
          .empty-day {
            min-height: 84px !important;
            height: auto !important;
            max-height: none !important;
            padding: 2px !important;
            overflow: visible !important;
          }

          .calendar-day-header {
            margin-bottom: 1px !important;
          }

          .calendar-day-number {
            font-size: 9px !important;
            line-height: 1 !important;
          }

          .calendar-entry-count {
            font-size: 6px !important;
            line-height: 1 !important;
          }

          .calendar-entry-list {
            gap: 1px !important;
          }

          .calendar-entry {
            font-size: 6.5px !important;
            padding: 1px 2px !important;
            line-height: 1.05 !important;
            border-left-width: 2px !important;
            overflow: visible !important;
            white-space: normal !important;
          }

          .calendar-entry div,
          .calendar-entry span {
            white-space: normal !important;
            overflow: visible !important;
            text-overflow: clip !important;
          }

          .calendar-people {
            margin-top: 1px !important;
            gap: 0 !important;
          }

          .calendar-entry-title,
          .person-line,
          .location-line {
            white-space: normal !important;
            overflow: visible !important;
            text-overflow: clip !important;
            overflow-wrap: anywhere !important;
          }
        }
      `}</style>
    </div>
  );
}