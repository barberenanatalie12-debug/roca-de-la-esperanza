import {
  BookOpen,
  Calendar,
  Facebook,
  Heart,
  Play,
  Shield,
  Users,
  Video as VideoIcon,
  Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "../../../styles/slick-carousel.css";
import {
  getSocietyPage,
  getTeamMembers,
  youtubeThumbnail,
} from "../../../lib/siteContent";
import { ContactModal } from "../../components/contact-modal";
import { VideoModal } from "../../components/VideoModal";
import { SociedadesNavigation } from "../../components/sociedades-navigation";

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

function CarouselSlide({ media, fallbackAlt, onPlay }) {
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
    <img
      src={media.image_url}
      alt={media.alt_text || fallbackAlt}
      className="w-full h-96 object-cover"
    />
  );
}

const fallbackImages = {
  damas: [
    { image_url: "/images/damas-1.png", alt_text: "Sociedad de Damas" },
    { image_url: "/images/damas-2.png", alt_text: "Sociedad de Damas" },
  ],
  jovenes: [
    { image_url: "/images/youth-1.png", alt_text: "Sociedad de Jóvenes" },
    { image_url: "/images/youth-2.png", alt_text: "Sociedad de Jóvenes" },
  ],
  ninos: [
    { image_url: "/images/ninos-1.png", alt_text: "Sociedad de Niños" },
    { image_url: "/images/ninos-2.png", alt_text: "Sociedad de Niños" },
  ],
  varones: [
    { image_url: "/images/varones-1.png", alt_text: "Sociedad de Varones" },
    { image_url: "/images/varones-2.png", alt_text: "Sociedad de Varones" },
  ],
};

const fallbackPages = {
  damas: {
    eyebrow: "Mujeres de fe",
    title: "Sociedad de Damas",
    hero_text:
      "Un espacio para crecer en la Palabra, servir con amor y fortalecer la comunión entre hermanas.",
    about_title: "Acerca de Nuestra Sociedad",
    about_text_1:
      "La Sociedad de Damas reúne a mujeres de nuestra congregación para crecer espiritualmente, servir a la iglesia y animarse unas a otras en su caminar con Cristo.",
    about_text_2:
      "Buscamos fortalecer la fe, la unidad y el servicio conforme al amor de Dios.",
    meeting_time: "Por anunciar",
    leader_name: "Por confirmar",
    cta_title: "Sé Parte de Damas",
    cta_text:
      "Te invitamos a unirte a la Sociedad de Damas y crecer junto a otras hermanas en la fe.",
  },
  jovenes: {
    eyebrow: "Juventud con propósito",
    title: "Sociedad de Jóvenes",
    hero_text:
      "Jóvenes creciendo en Cristo, sirviendo con pasión y viviendo con propósito.",
    about_title: "Acerca de Nuestra Sociedad",
    about_text_1:
      "La Sociedad de Jóvenes es un espacio para que la juventud crezca en la Palabra, desarrolle amistades sanas y sirva a Dios con sus talentos.",
    about_text_2:
      "Queremos formar jóvenes firmes en la fe, comprometidos con Cristo y preparados para impactar su generación.",
    meeting_time: "Por anunciar",
    leader_name: "Por confirmar",
    cta_title: "Sé Parte de Jóvenes",
    cta_text:
      "Te invitamos a crecer, servir y caminar con otros jóvenes que buscan a Dios.",
  },
  ninos: {
    eyebrow: "Niños con fe",
    title: "Sociedad de Niños",
    hero_text:
      "Enseñando a los niños la Palabra de Dios con amor, cuidado y alegría.",
    about_title: "Acerca de Nuestra Sociedad",
    about_text_1:
      "La Sociedad de Niños ayuda a los más pequeños a conocer a Jesús de una manera clara, segura y llena de amor.",
    about_text_2:
      "Nuestro deseo es sembrar la Palabra de Dios en sus corazones y acompañarlos en sus primeros pasos de fe.",
    meeting_time: "Por anunciar",
    leader_name: "Por confirmar",
    cta_title: "Trae a tus niños",
    cta_text:
      "Nos encantaría recibir a tus niños y ayudarles a crecer en el amor de Dios.",
  },
  varones: {
    eyebrow: "Hombres de fe",
    title: "Sociedad de Varones",
    hero_text:
      "Fortaleciendo hombres de fe, líderes en sus hogares y siervos en la iglesia.",
    about_title: "Acerca de Nuestra Sociedad",
    about_text_1:
      "La Sociedad de Varones es un espacio donde los hombres de nuestra congregación se reúnen para crecer espiritualmente, rendirse cuentas mutuamente y apoyarse en su caminar con Cristo.",
    about_text_2:
      "Buscamos formar hombres de carácter, comprometidos con Dios, sus familias y la obra del Reino.",
    meeting_time: "Por anunciar",
    leader_name: "Por confirmar",
    cta_title: "Sé Parte de Varones",
    cta_text:
      "Te invitamos a unirte a la Sociedad de Varones y crecer junto a otros hombres de fe.",
  },
};

const activitySets = {
  damas: [
    {
      title: "Estudios Bíblicos",
      icon: BookOpen,
      text: "Crecemos en la Palabra de Dios y aprendemos a aplicarla en nuestra vida diaria.",
    },
    {
      title: "Comunión",
      icon: Heart,
      text: "Fortalecemos la unidad, el apoyo mutuo y la amistad entre hermanas.",
    },
    {
      title: "Servicio",
      icon: Users,
      text: "Servimos a la iglesia y a nuestra comunidad con amor y disposición.",
    },
  ],
  jovenes: [
    {
      title: "Estudios Bíblicos",
      icon: BookOpen,
      text: "Aprendemos la Palabra de Dios con temas relevantes para la juventud.",
    },
    {
      title: "Compañerismo",
      icon: Users,
      text: "Creamos amistades sanas y espacios donde los jóvenes pueden crecer juntos.",
    },
    {
      title: "Servicio",
      icon: Heart,
      text: "Usamos nuestros dones para servir a Dios, la iglesia y nuestra comunidad.",
    },
  ],
  ninos: [
    {
      title: "Enseñanza Bíblica",
      icon: BookOpen,
      text: "Los niños aprenden la Palabra de Dios de forma clara y apropiada para su edad.",
    },
    {
      title: "Cuidado",
      icon: Shield,
      text: "Procuramos un ambiente seguro, amoroso y ordenado para cada niño.",
    },
    {
      title: "Actividades",
      icon: Heart,
      text: "Usamos dinámicas y momentos especiales para reforzar lo aprendido.",
    },
  ],
  varones: [
    {
      title: "Estudios Bíblicos",
      icon: Shield,
      text: "Profundizamos en la Palabra de Dios con temas relevantes para el hombre de hoy.",
    },
    {
      title: "Mentoría",
      icon: Users,
      text: "Nos apoyamos mutuamente en nuestros desafíos, compartiendo experiencias y rindiendo cuentas en amor.",
    },
    {
      title: "Servicio",
      icon: Heart,
      text: "Participamos activamente en proyectos de servicio a la iglesia y la comunidad.",
    },
  ],
};

export default function SocietyPage({ slug }) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [page, setPage] = useState(fallbackPages[slug] || fallbackPages.jovenes);
  const [images, setImages] = useState(fallbackImages[slug] || []);
  const [leader, setLeader] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const activities = activitySets[slug] || activitySets.jovenes;

  useEffect(() => {
    window.scrollTo(0, 0);

    getSocietyPage(slug).then((data) => {
      if (data?.page) setPage(data.page);
      if (data?.images?.length > 0) setImages(data.images);
    });

    getTeamMembers().then((members) => {
      const found = members.find((m) => m.category === `lider_${slug}`);
      if (found) setLeader(found);
    });
  }, [slug]);

  const leaderName =
    leader?.name || page?.leader_name || "Por confirmar";
  const meetingTime = page?.meeting_time || "Por anunciar";

  const sliderSettings = {
    dots: true,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-primary text-white border-t-4 border-accent">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-16">
          <p className="text-sm uppercase tracking-[0.26em] text-accent font-semibold mb-4">
            {page.eyebrow}
          </p>
          <h1
            className="text-5xl md:text-6xl mb-5 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {page.title}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl leading-relaxed text-white/90">
            {page.hero_text}
          </p>
          <div className="mt-8 h-1 w-28 bg-accent" />
        </div>
      </section>

      {images.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 md:px-10 pt-16">
          <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-md border border-accent/25 bg-white">
            <div className="h-2 bg-accent" />
            <Slider {...sliderSettings}>
              {images.map((image, index) => (
                <div key={image.id || `${image.image_url}-${index}`}>
                  <CarouselSlide
                    media={image}
                    fallbackAlt={page.title}
                    onPlay={setActiveVideo}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <div className="rounded-lg bg-gradient-to-br from-primary to-primary/90 text-white p-8 md:p-10 border border-primary/80">
            <p className="text-accent uppercase tracking-[0.26em] text-sm font-semibold mb-3">
              Acerca de
            </p>
            <h2
              className="text-4xl md:text-5xl uppercase tracking-wide mb-5"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {page.about_title}
            </h2>
            {page.about_text_1 && (
              <p className="text-white/90 leading-relaxed text-lg mb-4">
                {page.about_text_1}
              </p>
            )}
            {page.about_text_2 && (
              <p className="text-white/90 leading-relaxed text-lg">
                {page.about_text_2}
              </p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md border border-accent/25 overflow-hidden">
            <div className="h-2 bg-accent" />
            <div className="p-7 md:p-8">
              <h3
                className="text-primary text-2xl md:text-3xl mb-6 uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Información de Reuniones
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Día y Hora</p>
                    <p className="text-gray-700">{meetingTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  {leader?.image_url ? (
                    <img
                      src={leader.image_url}
                      alt={leader.name}
                      className="h-11 w-11 shrink-0 rounded-full object-cover border border-accent/30"
                    />
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Users className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-primary">Líder</p>
                    <p className="text-gray-700">{leaderName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-accent/15 via-white to-primary/10 border-y border-accent/25">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.26em] text-accent font-semibold mb-4">
              Lo que hacemos
            </p>
            <h2
              className="text-4xl md:text-5xl text-primary uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Nuestras Actividades
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <article
                  key={activity.title}
                  className="bg-white rounded-lg shadow-md border border-accent/25 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`h-2 ${
                      index % 2 === 0 ? "bg-accent" : "bg-primary"
                    }`}
                  />
                  <div className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3
                      className="text-primary text-2xl mb-3 uppercase tracking-wide"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {activity.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {activity.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-16">
        <div className="rounded-lg bg-primary text-white border-t-4 border-accent p-8 md:p-10 text-center shadow-md">
          <h2
            className="text-4xl md:text-5xl uppercase tracking-wide mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {page.cta_title}
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto leading-relaxed mb-6">
            {page.cta_text}
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
        title={activeVideo?.alt_text || page.title}
        onClose={() => setActiveVideo(null)}
      />

      <SociedadesNavigation currentPage={slug} />
    </div>
  );
}
