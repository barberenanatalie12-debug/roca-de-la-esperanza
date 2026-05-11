import {
  Heart,
  Users,
  Building2,
  QrCode,
  Banknote,
  Calendar,
  HeartHandshake,
} from "lucide-react";
 import zelleQr from "../../images/zelleQr.png";

export default function ApoyoDonaciones() {
  const supportAreas = [
    {
      title: "Oración",
      icon: Heart,
      description:
        "Nuestro equipo está disponible para orar contigo y por tus necesidades. La oración es una de las formas más poderosas de apoyo.",
      action: "Solicitar Oración",
    },
    {
      title: "Consejería",
      icon: Users,
      description:
        "Ofrecemos consejería pastoral en un ambiente confidencial y de amor. Escríbenos por correo y nos pondremos en contacto contigo.",
      action: "Contactar",
    },
  ];

  const impactAreas = [
    {
      title: "Ministerios",
      icon: Heart,
      description:
        "Apoyas todos nuestros ministerios y programas que impactan vidas.",
    },
    {
      title: "Instalaciones",
      icon: Building2,
      description:
        "Mantienes y mejoras nuestras instalaciones para la comunidad.",
    },
    {
      title: "Familias",
      icon: Users,
      description: "Ayudas a familias necesitadas en nuestra comunidad local.",
    },
    {
      title: "Misiones",
      icon: HeartHandshake,
      description:
        "Contribuyes a llevar el evangelio más allá de nuestras puertas.",
    },
  ];

  const givingOptions = [
    {
      title: "Durante los Cultos",
      icon: Calendar,
      description:
        "Puedes dar tu ofrenda o donación durante nuestros cultos.",
      note: "Disponible en cada servicio",
    },
    {
      title: "Código QR",
      icon: QrCode,
      description:
        "Escanea el código QR para dar tu ofrenda o donación de forma rápida.",
      note: "Zelle disponible",
      qrImage: zelleQr,
    },
    {
      title: "Transferencia Bancaria",
      icon: Banknote,
      description:
        "Para donaciones por transferencia bancaria, contacta a la iglesia para más información.",
      note: "Información bancaria pendiente",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-primary text-white border-t-4 border-accent">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-16">
          <p className="text-sm uppercase tracking-[0.26em] text-accent font-semibold mb-4">
            Iglesia Roca de la Esperanza
          </p>

          <h1
            className="text-5xl md:text-6xl mb-5 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Apoyo y Donaciones
          </h1>

          <p className="text-lg md:text-xl max-w-3xl leading-relaxed text-white/90">
            Somos una organización non profit sostenida por ofrendas y
            donaciones voluntarias. Cada aportación ayuda a servir mejor a
            nuestra iglesia y comunidad.
          </p>

          <div className="mt-8 h-1 w-28 bg-accent" />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <div className="rounded-lg bg-gradient-to-br from-primary to-primary/90 text-white p-8 md:p-10 border border-primary/80">
            <p className="text-accent uppercase tracking-[0.26em] text-sm font-semibold mb-3">
              Estamos para servirte
            </p>

            <h2
              className="text-4xl md:text-5xl uppercase tracking-wide mb-5"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Cómo Podemos Apoyarte
            </h2>

            <p className="text-white/90 leading-relaxed text-lg italic">
              “Sobrellevad los unos las cargas de los otros, y cumplid así la
              ley de Cristo.”
            </p>

            <p className="text-accent uppercase tracking-[0.22em] text-sm font-semibold mt-5">
              Gálatas 6:2
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {supportAreas.map((area, index) => {
              const Icon = area.icon;

              return (
                <article
                  key={area.title}
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
                        className="text-3xl uppercase tracking-wide text-primary"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {area.title}
                      </h3>
                    </div>

                    <p className="mb-6 leading-relaxed text-gray-700">
                      {area.description}
                    </p>

                    <a
                      href="/contacto"
                      className="inline-flex items-center justify-center bg-accent px-6 py-3 uppercase tracking-wide text-primary transition-colors hover:bg-accent/90"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {area.action}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-accent/15 via-white to-primary/10 border-y border-accent/25">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.26em] text-accent font-semibold mb-3">
                Ofrendas y donaciones
              </p>

              <h2
                className="text-4xl md:text-5xl text-primary uppercase tracking-wide mb-5"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Tu Aportación Hace la Diferencia
              </h2>

              <p className="text-gray-700 leading-relaxed text-lg">
                Cada aportación ayuda a apoyar los ministerios, las
                instalaciones, las familias, las misiones y la predicación del
                evangelio.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {impactAreas.map((area) => {
                const Icon = area.icon;

                return (
                  <div
                    key={area.title}
                    className="bg-white rounded-lg border border-accent/25 shadow-sm p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <h4
                          className="mb-2 text-2xl uppercase tracking-wide text-primary"
                          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                          {area.title}
                        </h4>

                        <p className="text-sm leading-relaxed text-gray-700">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <div className="rounded-lg bg-gradient-to-br from-primary to-primary/90 text-white p-8 md:p-10 border border-primary/80">
            <p className="text-accent uppercase tracking-[0.26em] text-sm font-semibold mb-3">
              Formas de dar
            </p>

            <h2
              className="text-4xl md:text-5xl uppercase tracking-wide mb-5"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Opciones de Donación
            </h2>

            <p className="text-white/90 leading-relaxed text-lg">
              Puedes dar tu ofrenda o donación durante nuestros cultos o por
              medio de las opciones disponibles. Cada aportación ayuda a
              sostener la obra, los ministerios y el servicio a nuestra
              comunidad.
            </p>
          </div>

          <div className="grid gap-5">
            {givingOptions.map((option, index) => {
              const Icon = option.icon;

              return (
                <article
                  key={option.title}
                  className="bg-white rounded-lg shadow-md border border-accent/25 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`h-2 ${
                      index % 2 === 0 ? "bg-primary" : "bg-accent"
                    }`}
                  />

                  <div className="p-6 md:p-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <h3
                            className="text-2xl md:text-3xl uppercase tracking-wide text-primary"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                          >
                            {option.title}
                          </h3>

                          <p className="w-fit rounded-full bg-primary/8 border border-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                            {option.note}
                          </p>
                        </div>

                        <p className="mt-3 leading-relaxed text-gray-700">
                          {option.description}
                        </p>
                      </div>

                      {option.qrImage && (
                        <div className="shrink-0 self-center sm:self-start">
                          <div className="rounded-lg border border-accent/30 bg-accent/10 p-3 shadow-sm">
                            <img
                              src={option.qrImage}
                              alt="Código QR de Zelle para donaciones"
                              className="h-36 w-36 rounded-md bg-white object-contain"
                            />
                          </div>
                        </div>
                      )}
                    </div>
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
            Gracias por apoyar la obra
          </h2>

          <p className="text-white/90 max-w-2xl mx-auto leading-relaxed">
            Tu apoyo nos ayuda a seguir sirviendo, acompañando familias y
            compartiendo el amor de Cristo con nuestra comunidad.
          </p>
        </div>
      </section>
    </div>
  );
}