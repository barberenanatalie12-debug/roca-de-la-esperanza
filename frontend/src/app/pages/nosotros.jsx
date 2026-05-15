import {
  Church,
  Cross,
  HeartHandshake,
  Music,
  Play,
  ShieldCheck,
  Users,
  Facebook,
  Youtube,
  Video as VideoIcon,
} from "lucide-react";
import { ContactModal } from "../components/contact-modal";
import { VideoModal } from "../components/VideoModal";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "../../styles/slick-carousel.css";
import Main from "../../images/Main.png";
import {
  getTeamGrouped,
  getPageImages,
  youtubeThumbnail,
} from "../../lib/siteContent";

const missionPoints = [
  {
    title: "A un mundo perdido",
    text:
      "La predicación del evangelio para perdón de pecados, dando a conocer el amor del Padre por medio de Cristo Jesús, en quien encontramos salvación y vida eterna.",
    icon: Cross,
  },
  {
    title: "A una sociedad necesitada",
    text: "Un auxilio real en el nombre del Señor Jesús.",
    icon: HeartHandshake,
  },
  {
    title: "A la iglesia",
    text: "La salvaguarda y buen uso de todos sus recursos.",
    icon: ShieldCheck,
  },
  {
    title: "A Dios",
    text: "Nuestra obediencia y adoración por siempre.",
    icon: Church,
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: true,
};

function isVideoMedia(media) {
  return (
    media.media_type === "youtube" ||
    media.media_type === "video" ||
    media.media_type === "facebook"
  );
}

function VideoSourceBadge({ type }) {
  const map = {
    youtube: { Icon: Youtube, label: "YouTube" },
    facebook: { Icon: Facebook, label: "Facebook" },
    video: { Icon: VideoIcon, label: "Video" },
  };
  const entry = map[type];
  if (!entry) return null;
  const Icon = entry.Icon;
  return (
    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-primary/85 text-white text-xs px-3 py-1 uppercase tracking-wide">
      <Icon className="w-3.5 h-3.5" />
      {entry.label}
    </span>
  );
}

function MediaSlide({ media, onPlay, fallbackAlt }) {
  if (isVideoMedia(media)) {
    const thumb =
      media.media_type === "youtube" ? youtubeThumbnail(media.video_url) : null;

    return (
      <button
        type="button"
        onClick={() => onPlay(media)}
        className="group relative block h-96 w-full overflow-hidden bg-primary text-left"
        aria-label="Reproducir video"
      >
        {thumb ? (
          <img
            src={thumb}
            alt={media.alt_text || fallbackAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/85" />
        )}

        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-accent text-primary flex items-center justify-center shadow-xl shadow-black/30 group-hover:scale-105 transition-transform">
            <Play className="w-9 h-9 fill-current" />
          </div>
        </div>

        <VideoSourceBadge type={media.media_type} />

        {media.alt_text && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-4">
            <p className="text-white text-sm">{media.alt_text}</p>
          </div>
        )}
      </button>
    );
  }

  return (
    <div className="relative h-96">
      <img
        src={media.image_url}
        alt={media.alt_text || fallbackAlt}
        className="w-full h-96 object-cover"
      />
    </div>
  );
}

function LeaderCard({ leader, theme = "primary" }) {
  const isAccent = theme === "accent";
  const photoFrame = isAccent
    ? "bg-gradient-to-br from-accent/90 to-accent"
    : "bg-gradient-to-br from-primary to-primary/90";
  const badgeStyle = isAccent
    ? "bg-white text-primary"
    : "bg-accent text-primary";
  const bar = isAccent ? "bg-primary" : "bg-accent";

  return (
    <article className="bg-white rounded-lg shadow-md border border-accent/25 overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`h-2 ${bar}`} />
      <div
        className={`${photoFrame} h-56 flex items-center justify-center relative overflow-hidden`}
      >
        {leader.image_url ? (
          <img
            src={leader.image_url}
            alt={leader.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="bg-white/15 w-28 h-28 rounded-full flex items-center justify-center border border-white/25">
            <Users className="w-14 h-14 text-white" />
          </div>
        )}
        {leader.role && (
          <div
            className={`absolute top-4 right-4 px-4 py-1 rounded-full text-sm uppercase tracking-wide ${badgeStyle}`}
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {leader.role}
          </div>
        )}
      </div>

      <div className="p-6">
        <h4
          className="text-2xl text-primary mb-1 uppercase tracking-wide"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {leader.name}
        </h4>
        {leader.role && (
          <p
            className="text-accent mb-3 uppercase text-sm tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {leader.role}
          </p>
        )}
        <p className="text-gray-700 leading-relaxed">
          {leader.description || "Descripción pendiente."}
        </p>
      </div>
    </article>
  );
}

function SocietyLeaderCard({ leader, index }) {
  const bar = index % 2 === 0 ? "bg-accent" : "bg-primary";

  return (
    <article className="bg-white rounded-lg shadow-md border border-accent/25 overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`h-2 ${bar}`} />
      <div className="bg-gradient-to-br from-primary/90 to-primary/70 h-44 flex items-center justify-center relative overflow-hidden">
        {leader.image_url ? (
          <img
            src={leader.image_url}
            alt={leader.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center border border-white/30">
            <Users className="w-10 h-10 text-white" />
          </div>
        )}
        <div
          className="absolute top-3 right-3 bg-accent text-primary px-3 py-1 rounded-full text-xs uppercase tracking-wide"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Líder
        </div>
      </div>

      <div className="p-5">
        <h4
          className="text-lg text-primary mb-1 uppercase tracking-wide"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {leader.name}
        </h4>
        {leader.role && (
          <p
            className="text-accent mb-3 uppercase text-xs tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {leader.role}
          </p>
        )}
        <p className="text-gray-700 text-sm leading-relaxed">
          {leader.description || "Descripción pendiente."}
        </p>
      </div>
    </article>
  );
}

function EmptyTeamState({ message }) {
  return (
    <div className="col-span-full rounded-lg bg-white border border-dashed border-accent/40 p-8 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
        <Users className="w-6 h-6" />
      </div>
      <p className="text-gray-700 font-medium">{message}</p>
      <p className="text-xs text-gray-500 mt-1">
        Esta sección se completará pronto.
      </p>
    </div>
  );
}

export default function Nosotros() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [principalPastors, setPrincipalPastors] = useState([]);
  const [ministers, setMinisters] = useState([]);
  const [societyLeaders, setSocietyLeaders] = useState([]);
  const [worshipMedia, setWorshipMedia] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const worshipHasVideo = worshipMedia.some((m) =>
    ["youtube", "facebook", "video"].includes(m.media_type)
  );
  const worshipSliderSettings = {
    ...sliderSettings,
    autoplay: !worshipHasVideo && sliderSettings.autoplay,
    infinite: worshipMedia.length > 1,
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [{ pastores, ministerio, lideres }, worship] = await Promise.all([
        getTeamGrouped(),
        getPageImages("nosotros", "worship"),
      ]);

      if (cancelled) return;

      setPrincipalPastors(pastores);
      setMinisters(ministerio);
      setSocietyLeaders(lideres);
      setWorshipMedia(worship);
      setLoaded(true);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-white border-t-4 border-accent">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-16">
          <p className="text-sm uppercase tracking-[0.26em] text-accent font-semibold mb-4">
            Nuestra iglesia
          </p>

          <h1
            className="text-5xl md:text-6xl mb-5 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Nosotros
          </h1>

          <p className="text-lg md:text-xl max-w-3xl leading-relaxed text-white/90">
            Conoce más sobre nuestra iglesia, nuestra misión, nuestro equipo y
            el propósito que nos une en Cristo.
          </p>

          <div className="mt-8 h-1 w-28 bg-accent" />
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <div className="rounded-lg bg-gradient-to-br from-primary to-primary/90 text-white p-8 md:p-10 border border-primary/80">
            <p className="text-accent uppercase tracking-[0.26em] text-sm font-semibold mb-3">
              Identidad
            </p>

            <h2
              className="text-4xl md:text-5xl uppercase tracking-wide mb-5"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Quiénes Somos
            </h2>

            <div className="h-1 w-16 bg-accent mb-6" />

            <div className="mt-6 pt-6 border-t border-white/15 flex items-start gap-4">
              <img
                src={Main}
                alt="Logo de ICIAR"
                className="h-14 w-14 shrink-0 object-contain"
              />

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-1">
                  Iglesia ICIAR
                </p>

                <p className="text-sm text-white/85 leading-relaxed">
                  Somos parte de la Iglesia Cristiana Interdenominacional A.R.,
                  compartiendo su doctrina, enseñanza y fundamento bíblico.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-accent/25 p-7 md:p-9">
            <p className="text-gray-700 text-lg leading-relaxed">
              Somos una iglesia fundamentada sobre las bases bíblicas que el
              Señor Jesús estableció, depositando en Él una fe genuina y
              construyendo una comunidad centrada en Cristo. Nuestro propósito
              es predicar el evangelio de Jesús, anunciando que en Él hay
              salvación y perdón de pecados, y que todos pueden encontrar y
              experimentar el amor de Dios y fortalecer su fe en Jesús.
            </p>

            <div className="mt-7 grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg bg-accent/10 border border-accent/25 p-5">
                <p
                  className="text-primary text-2xl uppercase tracking-wide mb-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Comunidad
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Una familia espiritual donde caminamos juntos en fe.
                </p>
              </div>

              <div className="rounded-lg bg-primary/5 border border-primary/15 p-5">
                <p
                  className="text-primary text-2xl uppercase tracking-wide mb-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Propósito
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Anunciar a Cristo y fortalecer la fe de quienes se acercan a
                  Dios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISIÓN */}
      <section className="bg-gradient-to-br from-accent/15 via-white to-primary/10 border-y border-accent/25">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
          <div className="mb-12 max-w-4xl">
            <p className="text-sm uppercase tracking-[0.26em] text-accent font-semibold mb-4">
              Nuestro propósito en acción
            </p>

            <h2
              className="text-4xl md:text-5xl text-primary uppercase tracking-wide mb-5"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Nuestra Misión
            </h2>

            <p className="text-gray-700 leading-relaxed text-lg">
              Nuestra misión expresa cómo vivimos como iglesia lo que creemos en
              Cristo: predicar el evangelio, servir a quienes nos rodean, cuidar
              lo que Dios ha puesto en nuestras manos y honrarle con obediencia
              y adoración.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {missionPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <article
                  key={point.title}
                  className="bg-white rounded-lg shadow-md border border-accent/25 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`h-2 ${
                      index % 2 === 0 ? "bg-accent" : "bg-primary"
                    }`}
                  />
                  <div className="p-7">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3
                        className="text-2xl uppercase tracking-wide text-primary"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {point.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {point.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* LIDERAZGO */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.26em] text-accent font-semibold mb-4">
            Quienes sirven
          </p>
          <h2
            className="text-4xl md:text-5xl text-primary uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Nuestro Equipo de Liderazgo
          </h2>
        </div>

        {/* Pastores Principales */}
        <div className="mb-14">
          <h3
            className="text-3xl text-primary mb-7 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Pastores Principales
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {principalPastors.length > 0 ? (
              principalPastors.map((pastor) => (
                <LeaderCard
                  key={pastor.id || pastor.name}
                  leader={pastor}
                  theme="primary"
                />
              ))
            ) : loaded ? (
              <EmptyTeamState message="Pronto compartiremos información sobre nuestros pastores principales." />
            ) : null}
          </div>
        </div>

        {/* Ministerio */}
        <div className="mb-14">
          <h3
            className="text-3xl text-primary mb-7 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Ministerio
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {ministers.length > 0 ? (
              ministers.map((minister) => (
                <LeaderCard
                  key={minister.id || minister.name}
                  leader={minister}
                  theme="accent"
                />
              ))
            ) : loaded ? (
              <EmptyTeamState message="Pronto compartiremos información sobre nuestro ministerio." />
            ) : null}
          </div>
        </div>

        {/* Música y Alabanza */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center">
              <Music size={20} />
            </div>
            <h3
              className="text-3xl text-primary uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Ministerio de Música y Alabanza
            </h3>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md border border-accent/25 overflow-hidden">
              <div className="h-2 bg-accent" />

              {worshipMedia.length > 0 ? (
                <Slider {...worshipSliderSettings}>
                  {worshipMedia.map((media, index) => (
                    <MediaSlide
                      key={media.id || index}
                      media={media}
                      onPlay={setActiveVideo}
                      fallbackAlt="Ministerio de Música y Alabanza"
                    />
                  ))}
                </Slider>
              ) : (
                <div className="h-72 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-white to-accent/5">
                  <div className="w-14 h-14 rounded-full bg-accent/15 text-accent flex items-center justify-center mb-3">
                    <Music className="w-7 h-7" />
                  </div>
                  <p className="text-gray-700 font-medium">
                    Pronto compartiremos fotos y videos del equipo de alabanza.
                  </p>
                </div>
              )}

              <div className="p-6 text-center bg-gradient-to-br from-white to-accent/5">
                <p className="text-gray-700 italic">
                  "La adoración a Dios por medio de la alabanza es un lenguaje
                  de gratitud que sale del corazón."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Líderes de Sociedades */}
        <div>
          <h3
            className="text-3xl text-primary mb-7 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Líderes de Sociedades
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {societyLeaders.length > 0 ? (
              societyLeaders.map((leader, index) => (
                <SocietyLeaderCard
                  key={leader.id || `${leader.name}-${index}`}
                  leader={leader}
                  index={index}
                />
              ))
            ) : loaded ? (
              <EmptyTeamState message="Pronto compartiremos información sobre los líderes de cada sociedad." />
            ) : null}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary border-t-4 border-accent">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 text-center">
          <h2
            className="text-accent text-4xl md:text-5xl mb-5 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Nuestra Comunidad
          </h2>

          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Te invitamos a ser parte de nuestra familia. Podemos crecer en fe y
            hacer una diferencia en nuestra comunidad.
          </p>

          <button
            onClick={() => setIsContactModalOpen(true)}
            className="inline-block bg-accent text-primary px-8 py-3 rounded-lg uppercase tracking-wide hover:bg-accent/90 transition-colors shadow-md shadow-accent/20"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Contáctanos
          </button>
        </div>
      </section>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <VideoModal
        open={Boolean(activeVideo)}
        videoUrl={activeVideo?.video_url}
        mediaType={activeVideo?.media_type}
        title={activeVideo?.alt_text || "Ministerio de Música y Alabanza"}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  );
}
