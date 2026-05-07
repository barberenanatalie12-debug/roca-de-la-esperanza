import { useState } from "react";
import {
  Users,
  Clock,
  CheckCircle,
  Mail,
  Phone,
  Eye,
  Trash2,
  X,
} from "lucide-react";

export default function ConectateSubmissions({
  submissions = [],
  onDelete,
  onMarkRead,
}) {
  const [submissionFilter, setSubmissionFilter] = useState("unread");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  const viewSubmissionDetails = async (submission) => {
    setSelectedSubmission(submission);
    setShowSubmissionModal(true);

    if (!submission.read && onMarkRead) {
      await onMarkRead(submission.id);
      setSelectedSubmission({
        ...submission,
        read: true,
        read_at: new Date().toISOString(),
      });
    }
  };

  const filteredSubmissions = submissions.filter((submission) => {
    if (submissionFilter === "unread") {
      return !submission.read;
    }

    if (submissionFilter === "history") {
      return submission.read;
    }

    return true;
  });

  const unreadCount = submissions.filter((submission) => !submission.read).length;
  const readCount = submissions.filter((submission) => submission.read).length;

  return (
    <div>
      <div className="mb-8">
        <h2
          className="text-primary text-3xl mb-4 uppercase tracking-wide"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Conexiones
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8 text-accent" />
              <h3
                className="text-gray-600 uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Total
              </h3>
            </div>

            <p className="text-4xl font-bold text-primary">
              {submissions.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-8 h-8 text-yellow-600" />
              <h3
                className="text-gray-600 uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Nuevas
              </h3>
            </div>

            <p className="text-4xl font-bold text-primary">{unreadCount}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <h3
                className="text-gray-600 uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Leídas
              </h3>
            </div>

            <p className="text-4xl font-bold text-primary">{readCount}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8 text-purple-600" />
              <h3
                className="text-gray-600 uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Adultos
              </h3>
            </div>

            <p className="text-4xl font-bold text-primary">
              {
                submissions.filter((s) =>
                  ["18-35", "36-55", "56+"].includes(s.grupo_de_edad)
                ).length
              }
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => setSubmissionFilter("unread")}
          className={`px-5 py-2 rounded-lg uppercase tracking-wide ${
            submissionFilter === "unread"
              ? "bg-accent text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Nuevas ({unreadCount})
        </button>

        <button
          onClick={() => setSubmissionFilter("history")}
          className={`px-5 py-2 rounded-lg uppercase tracking-wide ${
            submissionFilter === "history"
              ? "bg-accent text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Historial ({readCount})
        </button>

        <button
          onClick={() => setSubmissionFilter("all")}
          className={`px-5 py-2 rounded-lg uppercase tracking-wide ${
            submissionFilter === "all"
              ? "bg-accent text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Todas ({submissions.length})
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2
            className="text-primary text-3xl uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {submissionFilter === "unread"
              ? "Conexiones Nuevas"
              : submissionFilter === "history"
              ? "Historial de Conexiones"
              : "Todas las Conexiones"}
          </h2>
        </div>

        {filteredSubmissions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No hay conexiones en esta vista
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Estado
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
                    Grupo de Edad
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
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {submission.read ? (
                        <div className="flex items-center gap-2 text-green-700">
                          <CheckCircle className="w-5 h-5" />
                          <span>Leída</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-yellow-700">
                          <Clock className="w-5 h-5" />
                          <span>Nueva</span>
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {submission.first_name} {submission.last_name}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="w-4 h-4 text-accent" />
                        {submission.email}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="w-4 h-4 text-accent" />
                        {submission.phone_number}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-700">
                        {submission.grupo_de_edad || "No especificado"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => viewSubmissionDetails(submission)}
                          className="text-accent hover:text-accent/80 transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          Ver detalles
                        </button>

                        {!submission.read && (
                          <button
                            onClick={() => onMarkRead && onMarkRead(submission.id)}
                            className="text-green-700 hover:text-green-800 transition-colors flex items-center gap-1"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Marcar leída
                          </button>
                        )}

                        <button
                          onClick={() => onDelete && onDelete(submission.id)}
                          className="text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showSubmissionModal && selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowSubmissionModal(false)}
          />

          <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/90 text-white px-8 py-6 relative">
              <button
                onClick={() => setShowSubmissionModal(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h2
                className="text-3xl uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Detalles de Conexión
              </h2>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex items-center gap-2 text-green-700 bg-green-50 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5" />
                <span>Esta conexión ya fue marcada como leída</span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1 uppercase tracking-wide font-semibold">
                    Nombre Completo
                  </p>
                  <p className="text-lg text-gray-900">
                    {selectedSubmission.first_name}{" "}
                    {selectedSubmission.last_name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1 uppercase tracking-wide font-semibold">
                    Grupo de Edad
                  </p>
                  <p className="text-lg text-gray-900">
                    {selectedSubmission.grupo_de_edad || "No especificado"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1 uppercase tracking-wide font-semibold">
                    Email
                  </p>
                  <a
                    href={`mailto:${selectedSubmission.email}`}
                    className="text-lg text-accent hover:underline flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    {selectedSubmission.email}
                  </a>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1 uppercase tracking-wide font-semibold">
                    Teléfono
                  </p>
                  <a
                    href={`tel:${selectedSubmission.phone_number}`}
                    className="text-lg text-accent hover:underline flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    {selectedSubmission.phone_number}
                  </a>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600 mb-1 uppercase tracking-wide font-semibold">
                    Fecha de Envío
                  </p>
                  <p className="text-lg text-gray-900">
                    {new Date(selectedSubmission.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2 uppercase tracking-wide font-semibold">
                  Mensaje
                </p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {selectedSubmission.descripcion}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-8 py-4 flex justify-end">
              <button
                onClick={() => setShowSubmissionModal(false)}
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
