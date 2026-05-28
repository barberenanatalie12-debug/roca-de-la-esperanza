import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Facebook,
  ImagePlus,
  Pencil,
  Plus,
  Save,
  Trash2,
  Upload,
  Users as UsersIcon,
  Video,
  X,
  BookOpen,
  Heart,
  Music,
  Shield,
  Users,
  Youtube,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { requireAdmin } from "../../lib/requireAdmin";

const sectionTabs = [
  { id: "ministries", label: "Ministerios" },
  { id: "team", label: "Equipo" },
  { id: "societies", label: "Sociedades" },
  { id: "media", label: "Imágenes y Videos" },
];

const societySlugs = [
  { slug: "varones", label: "Sociedad de Varones" },
  { slug: "damas", label: "Sociedad de Damas" },
  { slug: "jovenes", label: "Sociedad de Jóvenes" },
  { slug: "ninos", label: "Sociedad de Niños" },
];

const iconOptions = [
  { value: "music", label: "Música", Icon: Music },
  { value: "users", label: "Personas", Icon: Users },
  { value: "heart", label: "Corazón", Icon: Heart },
  { value: "shield", label: "Escudo", Icon: Shield },
  { value: "book", label: "Libro", Icon: BookOpen },
];

const iconMap = iconOptions.reduce((acc, item) => {
  acc[item.value] = item.Icon;
  return acc;
}, {});

const teamCategories = [
  { value: "pastor_principal", label: "Pastor Principal" },
  { value: "pastor", label: "Pastor" },
  { value: "ministerio", label: "Ministerio" },
  { value: "lider_varones", label: "Líder · Sociedad de Varones" },
  { value: "lider_damas", label: "Líder · Sociedad de Damas" },
  { value: "lider_jovenes", label: "Líder · Sociedad de Jóvenes" },
  { value: "lider_ninos", label: "Líder · Sociedad de Niños" },
];

const teamCategoryLabel = teamCategories.reduce((acc, item) => {
  acc[item.value] = item.label;
  return acc;
}, {});

const pageOptions = [
  { value: "society:damas", label: "Sociedad — Damas" },
  { value: "society:jovenes", label: "Sociedad — Jóvenes" },
  { value: "society:ninos", label: "Sociedad — Niños" },
  { value: "society:varones", label: "Sociedad — Varones" },
  { value: "nosotros:worship", label: "Nosotros — Equipo de Alabanza" },
];

const pageOptionLabel = pageOptions.reduce((acc, item) => {
  acc[item.value] = item.label;
  return acc;
}, {});

const mediaTypes = [
  { value: "image", label: "Imagen", Icon: ImagePlus },
  { value: "youtube", label: "YouTube", Icon: Youtube },
  { value: "facebook", label: "Facebook", Icon: Facebook },
  { value: "video", label: "Video subido", Icon: Video },
];

const emptyMinistry = {
  id: null,
  title: "",
  description: "",
  schedule: "",
  icon_key: "users",
  image_url: "",
  order_index: 0,
};

const emptyTeam = {
  id: null,
  name: "",
  role: "",
  description: "",
  image_url: "",
  category: "pastor_principal",
  order_index: 0,
};

const emptyMedia = {
  id: null,
  page_key: "nosotros:worship",
  media_type: "image",
  image_url: "",
  video_url: "",
  alt_text: "",
  order_index: 0,
};

const card =
  "bg-white rounded-lg shadow-md border border-accent/25 overflow-hidden";
const input =
  "w-full rounded-lg border border-accent/25 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30";
const labelClass = "block text-gray-700 mb-2 font-semibold";

function EditModal({ title, onClose, children }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-xl shadow-2xl shadow-primary/30 max-w-3xl w-full overflow-hidden border border-accent/25 max-h-[90vh] flex flex-col">
        <div className="h-1.5 w-full bg-accent shrink-0" />

        <div className="relative bg-primary text-white px-6 py-4 flex items-center justify-between shrink-0">
          <h3
            className="text-2xl uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function DropZone({ accept, file, previewUrl, isVideo, onPick, onClear }) {
  const [over, setOver] = useState(false);

  function handleDragOver(e) {
    e.preventDefault();
    setOver(true);
  }

  function handleDragLeave() {
    setOver(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setOver(false);
    const dropped = e.dataTransfer?.files?.[0];
    if (dropped) onPick(dropped);
  }

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`rounded-lg border-2 border-dashed p-4 transition-colors ${
          over
            ? "border-accent bg-accent/10"
            : "border-accent/30 bg-accent/5"
        }`}
      >
        {previewUrl ? (
          <div className="space-y-3">
            {isVideo ? (
              <video
                src={previewUrl}
                controls
                className="w-full h-44 rounded-md object-cover bg-black"
              />
            ) : (
              <img
                src={previewUrl}
                alt="Vista previa"
                className="w-full h-44 rounded-md object-cover"
              />
            )}
            <button
              type="button"
              onClick={onClear}
              className="w-full flex items-center justify-center gap-1 text-red-600 hover:text-red-800 text-sm py-1"
            >
              <Trash2 className="w-4 h-4" />
              Quitar archivo
            </button>
          </div>
        ) : (
          <div className="h-44 flex flex-col items-center justify-center text-center text-gray-500 px-3">
            <Upload className="w-9 h-9 text-accent mb-2" />
            <p className="text-sm font-medium text-primary">
              Arrastra el archivo aquí
            </p>
            <p className="text-xs text-gray-500 mt-1">
              o selecciona uno con el botón de abajo
            </p>
          </div>
        )}
      </div>

      <label className="mt-3 inline-flex w-full items-center justify-center gap-2 cursor-pointer rounded-lg bg-white border border-accent/25 px-4 py-2.5 text-sm text-primary hover:border-accent transition-colors">
        <Upload className="w-4 h-4 text-accent" />
        Seleccionar archivo
        <input
          type="file"
          accept={accept}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onPick(f);
          }}
          className="hidden"
        />
      </label>

      {file && (
        <p className="mt-2 text-xs text-gray-500 truncate">
          {file.name} ({Math.round(file.size / 1024)} KB)
        </p>
      )}
    </div>
  );
}

function TeamCarousel({ members, onEdit, onDelete }) {
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  function updateArrows() {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [members]);

  function scrollByCards(direction) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 300, behavior: "smooth" });
  }

  return (
    <div className="relative">
      {canLeft && (
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          aria-label="Anterior"
          className="absolute left-1 top-20 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md border border-accent/25 text-primary hover:bg-accent hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {canRight && (
        <button
          type="button"
          onClick={() => scrollByCards(1)}
          aria-label="Siguiente"
          className="absolute right-1 top-20 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md border border-accent/25 text-primary hover:bg-accent hover:text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {members.map((member) => (
          <article
            key={member.id}
            className="w-64 shrink-0 rounded-lg border border-accent/25 bg-white overflow-hidden"
          >
            <div className="h-40 bg-primary/5 flex items-center justify-center overflow-hidden">
              {member.image_url ? (
                <img
                  src={member.image_url}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <UsersIcon className="w-10 h-10 text-accent" />
              )}
            </div>
            <div className="p-4">
              <p
                className="text-primary uppercase tracking-wide text-lg leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {member.name}
              </p>
              {member.role && (
                <p className="text-accent text-[11px] uppercase tracking-wide mt-0.5">
                  {member.role}
                </p>
              )}
              {member.description && (
                <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                  {member.description}
                </p>
              )}
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(member)}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-accent/10 text-primary hover:bg-accent/20"
                >
                  <Pencil className="w-3 h-3" />
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(member.id)}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-3 h-3" />
                  Eliminar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function SiteContent() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("ministries");
  const [ministries, setMinistries] = useState([]);
  const [team, setTeam] = useState([]);
  const [media, setMedia] = useState([]);
  const [societyRows, setSocietyRows] = useState([]);
  const [societyDrafts, setSocietyDrafts] = useState({});
  const [savingSocieties, setSavingSocieties] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const [formOpen, setFormOpen] = useState(false);
  const [ministryForm, setMinistryForm] = useState(emptyMinistry);
  const [teamForm, setTeamForm] = useState(emptyTeam);
  const [mediaForm, setMediaForm] = useState(emptyMedia);
  const [uploadFile, setUploadFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (!feedback.message) return;
    const t = setTimeout(() => setFeedback({ type: "", message: "" }), 4500);
    return () => clearTimeout(t);
  }, [feedback]);

  useEffect(() => {
    if (!uploadFile) {
      setFilePreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setFilePreview(reader.result);
    reader.readAsDataURL(uploadFile);
  }, [uploadFile]);

  useEffect(() => {
    setFormOpen(false);
    setMinistryForm(emptyMinistry);
    setTeamForm(emptyTeam);
    setMediaForm(emptyMedia);
    setUploadFile(null);
    setFilePreview(null);
  }, [activeTab]);

  async function loadAll() {
    await Promise.all([
      loadMinistries(),
      loadTeam(),
      loadMedia(),
      loadSocieties(),
    ]);
    setLoading(false);
  }

  async function loadSocieties() {
    const { data, error } = await supabase
      .from("society_pages")
      .select("id, slug, leader_name, meeting_time")
      .eq("deleted", false);
    if (error) {
      setFeedback({
        type: "error",
        message: "No se pudo cargar la información de las sociedades.",
      });
      return;
    }
    const rows = data || [];
    setSocietyRows(rows);

    const drafts = {};
    rows.forEach((r) => {
      drafts[r.slug] = r.meeting_time || "";
    });
    setSocietyDrafts(drafts);
  }

  async function saveSocieties() {
    if (!(await guard())) return;
    setSavingSocieties(true);

    const updates = societyRows.map((row) =>
      supabase
        .from("society_pages")
        .update({
          meeting_time: societyDrafts[row.slug] || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", row.id)
    );

    const results = await Promise.all(updates);
    const failed = results.find((r) => r.error);
    setSavingSocieties(false);

    if (failed) {
      setFeedback({
        type: "error",
        message: failed.error.message || "No se pudo guardar.",
      });
      return;
    }

    setFeedback({
      type: "success",
      message: "Horarios de sociedades actualizados.",
    });
    loadSocieties();
  }

  async function loadMinistries() {
    const { data, error } = await supabase
      .from("ministries")
      .select("*")
      .eq("deleted", false)
      .order("order_index", { ascending: true });
    if (error) {
      setFeedback({
        type: "error",
        message: "No se pudo cargar los ministerios.",
      });
      return;
    }
    setMinistries(data || []);
  }

  async function loadTeam() {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("deleted", false)
      .order("order_index", { ascending: true });
    if (error) {
      setFeedback({
        type: "error",
        message: "No se pudo cargar el equipo.",
      });
      return;
    }
    setTeam(data || []);
  }

  async function loadMedia() {
    const { data, error } = await supabase
      .from("page_images")
      .select("*")
      .eq("deleted", false)
      .order("page_slug", { ascending: true })
      .order("order_index", { ascending: true });
    if (error) {
      setFeedback({
        type: "error",
        message: "No se pudo cargar las imágenes y videos.",
      });
      return;
    }
    setMedia(data || []);
  }

  async function guard() {
    const auth = await requireAdmin();
    if (auth.ok) return true;
    if (auth.reason === "unauthenticated") {
      alert("Tu sesión ha expirado. Inicia sesión nuevamente.");
      navigate("/login", { replace: true });
    } else {
      alert("No tienes permiso para realizar esta acción.");
      navigate("/", { replace: true });
    }
    return false;
  }

  async function uploadToBucket(bucket) {
    if (!uploadFile) return null;
    const clean = uploadFile.name
      ? uploadFile.name.replace(/\s+/g, "_")
      : `media-${Date.now()}`;
    const path = `${Date.now()}-${clean}`;
    const { error } = await supabase.storage.from(bucket).upload(path, uploadFile);
    if (error) {
      setFeedback({
        type: "error",
        message: `No se pudo subir el archivo: ${error.message}`,
      });
      return null;
    }
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  function closeForm() {
    setFormOpen(false);
    setUploadFile(null);
    setFilePreview(null);
  }

  // ---------------- MINISTRIES ----------------

  function openNewMinistry() {
    setMinistryForm(emptyMinistry);
    setUploadFile(null);
    setFilePreview(null);
    setFormOpen(true);
  }

  function openEditMinistry(row) {
    setMinistryForm({
      id: row.id,
      title: row.title || "",
      description: row.description || "",
      schedule: row.schedule || "",
      icon_key: row.icon_key || "users",
      image_url: row.image_url || "",
      order_index: row.order_index ?? 0,
    });
    setUploadFile(null);
    setFilePreview(row.image_url || null);
    setFormOpen(true);
  }

  async function saveMinistry(e) {
    e.preventDefault();
    if (!(await guard())) return;
    if (!ministryForm.title.trim()) {
      setFeedback({ type: "error", message: "El título es obligatorio." });
      return;
    }

    setSaving(true);
    let imageUrl = ministryForm.image_url || null;
    if (uploadFile) {
      const uploaded = await uploadToBucket("site-images");
      if (!uploaded) {
        setSaving(false);
        return;
      }
      imageUrl = uploaded;
    }

    const payload = {
      title: ministryForm.title.trim(),
      description: ministryForm.description.trim(),
      schedule: ministryForm.schedule.trim(),
      icon_key: ministryForm.icon_key,
      image_url: imageUrl,
      order_index: Number(ministryForm.order_index) || 0,
      updated_at: new Date().toISOString(),
    };

    const result = ministryForm.id
      ? await supabase
          .from("ministries")
          .update(payload)
          .eq("id", ministryForm.id)
      : await supabase
          .from("ministries")
          .insert([{ ...payload, deleted: false }]);

    setSaving(false);
    if (result.error) {
      setFeedback({
        type: "error",
        message: result.error.message || "No se pudo guardar.",
      });
      return;
    }

    setFeedback({
      type: "success",
      message: ministryForm.id ? "Ministerio actualizado." : "Ministerio agregado.",
    });
    closeForm();
    loadMinistries();
  }

  // ---------------- TEAM ----------------

  function openNewTeam() {
    setTeamForm(emptyTeam);
    setUploadFile(null);
    setFilePreview(null);
    setFormOpen(true);
  }

  function openEditTeam(row) {
    setTeamForm({
      id: row.id,
      name: row.name || "",
      role: row.role || "",
      description: row.description || "",
      image_url: row.image_url || "",
      category: row.category || "pastor_principal",
      order_index: row.order_index ?? 0,
    });
    setUploadFile(null);
    setFilePreview(row.image_url || null);
    setFormOpen(true);
  }

  async function saveTeam(e) {
    e.preventDefault();
    if (!(await guard())) return;
    if (!teamForm.name.trim()) {
      setFeedback({ type: "error", message: "El nombre es obligatorio." });
      return;
    }

    setSaving(true);
    let imageUrl = teamForm.image_url || null;
    if (uploadFile) {
      const uploaded = await uploadToBucket("team-photos");
      if (!uploaded) {
        setSaving(false);
        return;
      }
      imageUrl = uploaded;
    }

    const payload = {
      name: teamForm.name.trim(),
      role: teamForm.role.trim(),
      description: teamForm.description.trim(),
      image_url: imageUrl,
      category: teamForm.category,
      order_index: Number(teamForm.order_index) || 0,
      updated_at: new Date().toISOString(),
    };

    const result = teamForm.id
      ? await supabase
          .from("team_members")
          .update(payload)
          .eq("id", teamForm.id)
      : await supabase
          .from("team_members")
          .insert([{ ...payload, deleted: false }]);

    setSaving(false);
    if (result.error) {
      setFeedback({
        type: "error",
        message: result.error.message || "No se pudo guardar.",
      });
      return;
    }

    setFeedback({
      type: "success",
      message: teamForm.id ? "Miembro actualizado." : "Miembro agregado.",
    });
    closeForm();
    loadTeam();
  }

  // ---------------- MEDIA ----------------

  function openNewMedia() {
    setMediaForm(emptyMedia);
    setUploadFile(null);
    setFilePreview(null);
    setFormOpen(true);
  }

  function openEditMedia(row) {
    setMediaForm({
      id: row.id,
      page_key: `${row.page_type}:${row.page_slug}`,
      media_type: row.media_type || "image",
      image_url: row.image_url || "",
      video_url: row.video_url || "",
      alt_text: row.alt_text || "",
      order_index: row.order_index ?? 0,
    });
    setUploadFile(null);
    setFilePreview(
      row.media_type === "video" ? row.video_url : row.image_url || null
    );
    setFormOpen(true);
  }

  async function saveMedia(e) {
    e.preventDefault();
    if (!(await guard())) return;

    setSaving(true);

    let image_url = mediaForm.image_url;
    let video_url = mediaForm.video_url;

    if (mediaForm.media_type === "image") {
      if (uploadFile) {
        const uploaded = await uploadToBucket("site-images");
        if (!uploaded) {
          setSaving(false);
          return;
        }
        image_url = uploaded;
      }
      if (!image_url) {
        setSaving(false);
        setFeedback({
          type: "error",
          message: "Sube una imagen para esta entrada.",
        });
        return;
      }
      video_url = null;
    } else if (mediaForm.media_type === "video") {
      if (uploadFile) {
        const uploaded = await uploadToBucket("site-videos");
        if (!uploaded) {
          setSaving(false);
          return;
        }
        video_url = uploaded;
      }
      if (!video_url) {
        setSaving(false);
        setFeedback({
          type: "error",
          message: "Sube un video o pega una URL.",
        });
        return;
      }
      image_url = image_url || null;
    } else if (mediaForm.media_type === "youtube") {
      if (!video_url || !video_url.trim()) {
        setSaving(false);
        setFeedback({
          type: "error",
          message: "Pega un enlace de YouTube.",
        });
        return;
      }
      image_url = image_url || null;
    } else if (mediaForm.media_type === "facebook") {
      if (!video_url || !video_url.trim()) {
        setSaving(false);
        setFeedback({
          type: "error",
          message: "Pega un enlace de Facebook.",
        });
        return;
      }
      image_url = image_url || null;
    }

    const [page_type, page_slug] = mediaForm.page_key.split(":");

    const payload = {
      page_type,
      page_slug,
      media_type: mediaForm.media_type,
      image_url,
      video_url,
      alt_text: mediaForm.alt_text.trim(),
      order_index: Number(mediaForm.order_index) || 0,
      updated_at: new Date().toISOString(),
    };

    const result = mediaForm.id
      ? await supabase
          .from("page_images")
          .update(payload)
          .eq("id", mediaForm.id)
      : await supabase
          .from("page_images")
          .insert([{ ...payload, deleted: false }]);

    setSaving(false);
    if (result.error) {
      setFeedback({
        type: "error",
        message: result.error.message || "No se pudo guardar.",
      });
      return;
    }

    setFeedback({
      type: "success",
      message: mediaForm.id ? "Media actualizada." : "Media agregada.",
    });
    closeForm();
    loadMedia();
  }

  async function softDelete(table, id, refresh) {
    if (!(await guard())) return;
    if (!window.confirm("¿Estás seguro de eliminar este elemento?")) return;
    const { error } = await supabase
      .from(table)
      .update({ deleted: true, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      setFeedback({
        type: "error",
        message: error.message || "No se pudo eliminar.",
      });
      return;
    }
    setFeedback({ type: "success", message: "Elemento eliminado." });
    refresh();
  }

  const teamByCategory = teamCategories.map((cat) => ({
    ...cat,
    members: team.filter((m) => m.category === cat.value),
  }));

  if (loading) {
    return (
      <div className={`${card} p-10 text-center text-gray-600`}>
        Cargando contenido del sitio...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className={card}>
        <div className="h-2 bg-accent" />
        <div className="p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.26em] text-accent font-semibold mb-2">
            Herramientas del sitio
          </p>
          <h2
            className="text-primary text-3xl md:text-4xl uppercase tracking-wide mb-2"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Contenido del Sitio
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Edita ministerios, el equipo de la iglesia y las imágenes y videos
            de las páginas. Los cambios se guardan al instante.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 border-b border-gray-100">
            {sectionTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-4 border-b-2 uppercase tracking-wide text-sm transition-colors ${
                    isActive
                      ? "border-accent text-primary"
                      : "border-transparent text-gray-500 hover:text-primary"
                  }`}
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {feedback.message && (
        <div
          className={`rounded-lg border p-4 flex items-start gap-3 ${
            feedback.type === "error"
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-accent/10 border-accent/30 text-primary"
          }`}
        >
          {feedback.type === "error" ? (
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-accent" />
          )}
          <p className="text-sm">{feedback.message}</p>
        </div>
      )}

      {/* MINISTRIES */}
      {activeTab === "ministries" && (
        <>
          <div className={card}>
            <div className="h-2 bg-primary" />
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h3
                  className="text-primary text-2xl uppercase tracking-wide"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Ministerios Actuales
                </h3>
                {!formOpen && (
                  <button
                    type="button"
                    onClick={openNewMinistry}
                    className="inline-flex items-center gap-2 bg-accent text-primary px-5 py-2.5 rounded-lg uppercase tracking-wide text-sm hover:bg-accent/90 transition-colors"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    <Plus className="w-4 h-4" />
                    Agregar Ministerio
                  </button>
                )}
              </div>

              {ministries.length === 0 ? (
                <div className="rounded-lg bg-accent/5 border border-accent/25 p-8 text-center text-gray-600">
                  Todavía no hay ministerios. Usa "Agregar Ministerio".
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {ministries.map((m) => {
                    const Icon = iconMap[m.icon_key] || Users;
                    return (
                      <article
                        key={m.id}
                        className="flex gap-4 rounded-lg border border-accent/25 bg-white p-4"
                      >
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-primary/5 shrink-0 flex items-center justify-center">
                          {m.image_url ? (
                            <img
                              src={m.image_url}
                              alt={m.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Icon className="w-9 h-9 text-accent" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-primary text-xl uppercase tracking-wide leading-tight"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                          >
                            {m.title}
                          </p>
                          {m.schedule && (
                            <p className="text-accent text-xs uppercase tracking-wide mt-0.5">
                              {m.schedule}
                            </p>
                          )}
                          {m.description && (
                            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                              {m.description}
                            </p>
                          )}
                          <div className="mt-3 flex gap-2">
                            <button
                              type="button"
                              onClick={() => openEditMinistry(m)}
                              className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded bg-accent/10 text-primary hover:bg-accent/20 transition-colors"
                            >
                              <Pencil className="w-3 h-3" />
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                softDelete("ministries", m.id, loadMinistries)
                              }
                              className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {formOpen && (
            <EditModal
              title={ministryForm.id ? "Editar Ministerio" : "Agregar Ministerio"}
              onClose={closeForm}
            >
              <form onSubmit={saveMinistry} className="p-6 md:p-8 space-y-5">
                <div className="grid md:grid-cols-[1fr_280px] gap-6">
                  <div className="space-y-5">
                    <div>
                      <label className={labelClass}>Título *</label>
                      <input
                        type="text"
                        value={ministryForm.title}
                        onChange={(e) =>
                          setMinistryForm({
                            ...ministryForm,
                            title: e.target.value,
                          })
                        }
                        required
                        className={input}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Descripción</label>
                      <textarea
                        rows={4}
                        value={ministryForm.description}
                        onChange={(e) =>
                          setMinistryForm({
                            ...ministryForm,
                            description: e.target.value,
                          })
                        }
                        className={`${input} resize-none`}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Horario</label>
                        <input
                          type="text"
                          placeholder="Domingos 3:00 PM"
                          value={ministryForm.schedule}
                          onChange={(e) =>
                            setMinistryForm({
                              ...ministryForm,
                              schedule: e.target.value,
                            })
                          }
                          className={input}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Orden</label>
                        <input
                          type="number"
                          min={0}
                          value={ministryForm.order_index}
                          onChange={(e) =>
                            setMinistryForm({
                              ...ministryForm,
                              order_index: e.target.value,
                            })
                          }
                          className={input}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Ícono</label>
                      <div className="grid grid-cols-5 gap-2">
                        {iconOptions.map((opt) => {
                          const isSelected =
                            ministryForm.icon_key === opt.value;
                          const Icon = opt.Icon;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() =>
                                setMinistryForm({
                                  ...ministryForm,
                                  icon_key: opt.value,
                                })
                              }
                              className={`flex flex-col items-center justify-center gap-1 py-3 rounded-lg border transition-colors ${
                                isSelected
                                  ? "border-accent bg-accent/10 text-primary"
                                  : "border-gray-200 bg-white text-gray-500 hover:border-accent/50"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                              <span className="text-[10px] uppercase tracking-wide">
                                {opt.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Imagen</label>
                    <DropZone
                      accept="image/*"
                      file={uploadFile}
                      previewUrl={filePreview}
                      onPick={setUploadFile}
                      onClear={() => {
                        setUploadFile(null);
                        setFilePreview(null);
                        setMinistryForm({
                          ...ministryForm,
                          image_url: "",
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-lg uppercase tracking-wide hover:bg-accent/90 transition-colors disabled:opacity-50"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {ministryForm.id ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {saving
                      ? "Guardando..."
                      : ministryForm.id
                      ? "Guardar Cambios"
                      : "Agregar"}
                  </button>
                  <button
                    type="button"
                    onClick={closeForm}
                    className="inline-flex items-center gap-2 bg-white border border-primary text-primary px-6 py-3 rounded-lg uppercase tracking-wide hover:bg-primary hover:text-white transition-colors"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </EditModal>
          )}
        </>
      )}

      {/* TEAM */}
      {activeTab === "team" && (
        <>
          <div className={card}>
            <div className="h-2 bg-primary" />
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h3
                  className="text-primary text-2xl uppercase tracking-wide"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Equipo de la Iglesia
                </h3>
                {!formOpen && (
                  <button
                    type="button"
                    onClick={openNewTeam}
                    className="inline-flex items-center gap-2 bg-accent text-primary px-5 py-2.5 rounded-lg uppercase tracking-wide text-sm hover:bg-accent/90 transition-colors"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    <Plus className="w-4 h-4" />
                    Agregar Miembro
                  </button>
                )}
              </div>

              {team.length === 0 ? (
                <div className="rounded-lg bg-accent/5 border border-accent/25 p-8 text-center text-gray-600">
                  Todavía no hay miembros del equipo. Usa "Agregar Miembro" para
                  comenzar.
                </div>
              ) : (
                <div className="space-y-7">
                  {teamByCategory.map((group) => {
                    if (group.members.length === 0) return null;
                    return (
                      <div key={group.value}>
                        <p
                          className="text-xs font-semibold uppercase tracking-[0.22em] text-accent mb-3"
                          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                          {group.label}
                        </p>
                        <TeamCarousel
                          members={group.members}
                          onEdit={openEditTeam}
                          onDelete={(id) =>
                            softDelete("team_members", id, loadTeam)
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {formOpen && (
            <EditModal
              title={teamForm.id ? "Editar Miembro" : "Agregar Miembro"}
              onClose={closeForm}
            >
              <form onSubmit={saveTeam} className="p-6 md:p-8 space-y-5">
                <div className="grid md:grid-cols-[1fr_280px] gap-6">
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Nombre *</label>
                        <input
                          type="text"
                          value={teamForm.name}
                          onChange={(e) =>
                            setTeamForm({ ...teamForm, name: e.target.value })
                          }
                          required
                          className={input}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Rol</label>
                        <input
                          type="text"
                          placeholder="Pastor Principal"
                          value={teamForm.role}
                          onChange={(e) =>
                            setTeamForm({ ...teamForm, role: e.target.value })
                          }
                          className={input}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Categoría</label>
                        <select
                          value={teamForm.category}
                          onChange={(e) =>
                            setTeamForm({
                              ...teamForm,
                              category: e.target.value,
                            })
                          }
                          className={input}
                        >
                          {teamCategories.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className={labelClass}>
                          Orden (menor sale primero)
                        </label>
                        <input
                          type="number"
                          min={0}
                          value={teamForm.order_index}
                          onChange={(e) =>
                            setTeamForm({
                              ...teamForm,
                              order_index: e.target.value,
                            })
                          }
                          className={input}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Descripción</label>
                      <textarea
                        rows={5}
                        value={teamForm.description}
                        onChange={(e) =>
                          setTeamForm({
                            ...teamForm,
                            description: e.target.value,
                          })
                        }
                        className={`${input} resize-none`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Foto</label>
                    <DropZone
                      accept="image/*"
                      file={uploadFile}
                      previewUrl={filePreview}
                      onPick={setUploadFile}
                      onClear={() => {
                        setUploadFile(null);
                        setFilePreview(null);
                        setTeamForm({ ...teamForm, image_url: "" });
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-lg uppercase tracking-wide hover:bg-accent/90 transition-colors disabled:opacity-50"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {teamForm.id ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {saving
                      ? "Guardando..."
                      : teamForm.id
                      ? "Guardar Cambios"
                      : "Agregar"}
                  </button>
                  <button
                    type="button"
                    onClick={closeForm}
                    className="inline-flex items-center gap-2 bg-white border border-primary text-primary px-6 py-3 rounded-lg uppercase tracking-wide hover:bg-primary hover:text-white transition-colors"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </EditModal>
          )}
        </>
      )}

      {/* SOCIEDADES */}
      {activeTab === "societies" && (
        <div className={card}>
          <div className="h-2 bg-primary" />
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h3
                className="text-primary text-2xl uppercase tracking-wide mb-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Información de Reuniones
              </h3>
              <p className="text-gray-600 text-sm max-w-2xl">
                Edita el día y hora que aparece en la página de cada sociedad.
                El nombre del líder se toma automáticamente del miembro del
                equipo asignado a esa sociedad (en la pestaña Equipo).
              </p>
            </div>

            {societyRows.length === 0 ? (
              <div className="rounded-lg bg-accent/5 border border-accent/25 p-8 text-center text-gray-600">
                No se encontraron páginas de sociedades. Verifica que existan
                filas en la tabla society_pages.
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {societySlugs.map((s) => {
                    const row = societyRows.find((r) => r.slug === s.slug);
                    if (!row) return null;
                    return (
                      <div
                        key={s.slug}
                        className="rounded-lg border border-accent/25 bg-white p-5"
                      >
                        <div className="grid sm:grid-cols-[200px_1fr] gap-4 items-center">
                          <div>
                            <p
                              className="text-primary uppercase tracking-wide leading-tight"
                              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                            >
                              {s.label}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {row.leader_name
                                ? `Líder: ${row.leader_name}`
                                : "Líder desde Equipo"}
                            </p>
                          </div>

                          <div>
                            <label className={labelClass}>Día y Hora</label>
                            <input
                              type="text"
                              placeholder="Domingos, 2:00 PM"
                              value={societyDrafts[s.slug] || ""}
                              onChange={(e) =>
                                setSocietyDrafts({
                                  ...societyDrafts,
                                  [s.slug]: e.target.value,
                                })
                              }
                              className={input}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-7 flex justify-end">
                  <button
                    type="button"
                    onClick={saveSocieties}
                    disabled={savingSocieties}
                    className="inline-flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-lg uppercase tracking-wide hover:bg-accent/90 transition-colors disabled:opacity-50"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    <Save className="w-4 h-4" />
                    {savingSocieties ? "Guardando..." : "Guardar Horarios"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* MEDIA */}
      {activeTab === "media" && (
        <>
          <div className={card}>
            <div className="h-2 bg-primary" />
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h3
                  className="text-primary text-2xl uppercase tracking-wide"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Imágenes y Videos
                </h3>
                {!formOpen && (
                  <button
                    type="button"
                    onClick={openNewMedia}
                    className="inline-flex items-center gap-2 bg-accent text-primary px-5 py-2.5 rounded-lg uppercase tracking-wide text-sm hover:bg-accent/90 transition-colors"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    <Plus className="w-4 h-4" />
                    Agregar
                  </button>
                )}
              </div>

              {media.length === 0 ? (
                <div className="rounded-lg bg-accent/5 border border-accent/25 p-8 text-center text-gray-600">
                  Todavía no hay imágenes ni videos. Usa "Agregar".
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {media.map((m) => {
                    const pageLabel =
                      pageOptionLabel[`${m.page_type}:${m.page_slug}`] ||
                      `${m.page_type} — ${m.page_slug}`;
                    const isVideo = m.media_type === "video";
                    const isYoutube = m.media_type === "youtube";
                    const isFacebook = m.media_type === "facebook";
                    return (
                      <article
                        key={m.id}
                        className="rounded-lg border border-accent/25 bg-white overflow-hidden"
                      >
                        <div className="h-40 bg-primary/5 overflow-hidden relative">
                          {isYoutube ? (
                            <div className="w-full h-full flex flex-col items-center justify-center text-primary">
                              <Youtube className="w-10 h-10 text-accent mb-1" />
                              <p className="text-xs text-gray-600 px-2 truncate max-w-full">
                                {m.video_url}
                              </p>
                            </div>
                          ) : isFacebook ? (
                            <div className="w-full h-full flex flex-col items-center justify-center text-primary">
                              <Facebook className="w-10 h-10 text-accent mb-1" />
                              <p className="text-xs text-gray-600 px-2 truncate max-w-full">
                                {m.video_url}
                              </p>
                            </div>
                          ) : isVideo ? (
                            <video
                              src={m.video_url}
                              className="w-full h-full object-cover"
                              muted
                            />
                          ) : m.image_url ? (
                            <img
                              src={m.image_url}
                              alt={m.alt_text || pageLabel}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-accent">
                              <ImagePlus className="w-10 h-10" />
                            </div>
                          )}
                          <span className="absolute top-2 left-2 bg-primary/85 text-white text-[10px] uppercase tracking-wide px-2 py-0.5 rounded">
                            {m.media_type || "image"}
                          </span>
                        </div>
                        <div className="p-4">
                          <p
                            className="text-primary text-base uppercase tracking-wide leading-tight"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                          >
                            {pageLabel}
                          </p>
                          {m.alt_text && (
                            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                              {m.alt_text}
                            </p>
                          )}
                          <div className="mt-3 flex gap-2">
                            <button
                              type="button"
                              onClick={() => openEditMedia(m)}
                              className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded bg-accent/10 text-primary hover:bg-accent/20 transition-colors"
                            >
                              <Pencil className="w-3 h-3" />
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                softDelete("page_images", m.id, loadMedia)
                              }
                              className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {formOpen && (
            <EditModal
              title={mediaForm.id ? "Editar Media" : "Agregar Media"}
              onClose={closeForm}
            >
              <form onSubmit={saveMedia} className="p-6 md:p-8 space-y-5">
                <div className="grid md:grid-cols-[1fr_280px] gap-6">
                  <div className="space-y-5">
                    <div>
                      <label className={labelClass}>Tipo de media</label>
                      <div className="grid grid-cols-3 gap-2">
                        {mediaTypes.map((opt) => {
                          const isSelected =
                            mediaForm.media_type === opt.value;
                          const Icon = opt.Icon;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setMediaForm({
                                  ...mediaForm,
                                  media_type: opt.value,
                                });
                                setUploadFile(null);
                                setFilePreview(null);
                              }}
                              className={`flex flex-col items-center justify-center gap-1 py-3 rounded-lg border transition-colors ${
                                isSelected
                                  ? "border-accent bg-accent/10 text-primary"
                                  : "border-gray-200 bg-white text-gray-500 hover:border-accent/50"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                              <span className="text-xs uppercase tracking-wide">
                                {opt.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Página</label>
                      <select
                        value={mediaForm.page_key}
                        onChange={(e) =>
                          setMediaForm({
                            ...mediaForm,
                            page_key: e.target.value,
                          })
                        }
                        className={input}
                      >
                        {pageOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {mediaForm.media_type === "youtube" && (
                      <div>
                        <label className={labelClass}>URL de YouTube</label>
                        <input
                          type="url"
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={mediaForm.video_url}
                          onChange={(e) =>
                            setMediaForm({
                              ...mediaForm,
                              video_url: e.target.value,
                            })
                          }
                          className={input}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Soporta enlaces de youtube.com, youtu.be, live y
                          shorts.
                        </p>
                      </div>
                    )}

                    {mediaForm.media_type === "facebook" && (
                      <div>
                        <label className={labelClass}>URL de Facebook</label>
                        <input
                          type="url"
                          placeholder="https://www.facebook.com/.../videos/..."
                          value={mediaForm.video_url}
                          onChange={(e) =>
                            setMediaForm({
                              ...mediaForm,
                              video_url: e.target.value,
                            })
                          }
                          className={input}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Soporta enlaces de facebook.com/videos, fb.watch y
                          reels.
                        </p>
                      </div>
                    )}

                    <div>
                      <label className={labelClass}>
                        Descripción (texto alternativo)
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Equipo de alabanza en culto dominical"
                        value={mediaForm.alt_text}
                        onChange={(e) =>
                          setMediaForm({
                            ...mediaForm,
                            alt_text: e.target.value,
                          })
                        }
                        className={input}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Orden</label>
                      <input
                        type="number"
                        min={0}
                        value={mediaForm.order_index}
                        onChange={(e) =>
                          setMediaForm({
                            ...mediaForm,
                            order_index: e.target.value,
                          })
                        }
                        className={input}
                      />
                    </div>
                  </div>

                  {(mediaForm.media_type === "image" ||
                    mediaForm.media_type === "video") && (
                    <div>
                      <label className={labelClass}>
                        {mediaForm.media_type === "video" ? "Video" : "Imagen"}
                      </label>
                      <DropZone
                        accept={
                          mediaForm.media_type === "video"
                            ? "video/*"
                            : "image/*"
                        }
                        isVideo={mediaForm.media_type === "video"}
                        file={uploadFile}
                        previewUrl={filePreview}
                        onPick={setUploadFile}
                        onClear={() => {
                          setUploadFile(null);
                          setFilePreview(null);
                          if (mediaForm.media_type === "video") {
                            setMediaForm({ ...mediaForm, video_url: "" });
                          } else {
                            setMediaForm({ ...mediaForm, image_url: "" });
                          }
                        }}
                      />
                      {mediaForm.media_type === "video" && (
                        <p className="text-xs text-gray-500 mt-2">
                          Para mejor rendimiento, considera usar un enlace de
                          YouTube en vez de subir videos grandes.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-lg uppercase tracking-wide hover:bg-accent/90 transition-colors disabled:opacity-50"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {mediaForm.id ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {saving
                      ? "Guardando..."
                      : mediaForm.id
                      ? "Guardar Cambios"
                      : "Agregar"}
                  </button>
                  <button
                    type="button"
                    onClick={closeForm}
                    className="inline-flex items-center gap-2 bg-white border border-primary text-primary px-6 py-3 rounded-lg uppercase tracking-wide hover:bg-primary hover:text-white transition-colors"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </EditModal>
          )}
        </>
      )}
    </div>
  );
}
