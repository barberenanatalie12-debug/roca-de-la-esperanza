import {
  Heart,
  Users,
  Building2,
  DollarSign,
  QrCode,
  Banknote,
  Calendar,
} from "lucide-react";

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
      description:
        "Ayudas a familias necesitadas en nuestra comunidad local.",
    },
    {
      title: "Misiones",
      icon: DollarSign,
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
      note: "Código QR pendiente",
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
      <section className="bg-primary px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p
            className="mb-3 text-base uppercase tracking-[0.25em] text-accent"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Iglesia Roca de la Esperanza
          </p>

          <h1
            className="mb-5 text-5xl uppercase leading-tight tracking-wide text-accent md:text-7xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Apoyo y Donaciones
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl">
            Somos una organización non profit sostenida por ofrendas y
            donaciones voluntarias. Cada aportación ayuda a servir mejor a
            nuestra iglesia y comunidad.
          </p>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10 md:py-18">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p
              className="mb-2 text-base uppercase tracking-[0.2em] text-accent"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Estamos para servirte
            </p>

            <h2
              className="mb-4 text-4xl uppercase leading-tight tracking-wide text-primary md:text-6xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Cómo Podemos Apoyarte
            </h2>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-700">
              “Sobrellevad los unos las cargas de los otros, y cumplid así la
              ley de Cristo.” Gálatas 6:2
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {supportAreas.map((area) => {
              const Icon = area.icon;

              return (
                <div
                  key={area.title}
                  className="rounded-xl bg-white p-7 shadow-md transition-shadow hover:shadow-lg md:p-8"
                >
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/15">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>

                    <h3
                      className="text-4xl uppercase tracking-wide text-primary"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {area.title}
                    </h3>
                  </div>

                  <p className="mb-6 text-base leading-relaxed text-gray-700 md:text-lg">
                    {area.description}
                  </p>

                  <a
                    href="/contacto"
                    className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-base uppercase tracking-wide text-primary transition-colors hover:bg-accent/90"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {area.action}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-14 md:px-10 md:py-18">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p
              className="mb-2 text-base uppercase tracking-[0.2em] text-accent"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Ofrendas y donaciones
            </p>

            <h2
              className="mb-4 text-4xl uppercase leading-tight tracking-wide text-primary md:text-6xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Tu Aportación Hace la Diferencia
            </h2>

            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700">
              Cada aportación ayuda a apoyar los ministerios, las instalaciones,
              las familias, las misiones y la predicación del evangelio.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {impactAreas.map((area) => {
              const Icon = area.icon;

              return (
                <div
                  key={area.title}
                  className="rounded-xl bg-accent/10 p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>

                  <h4
                    className="mb-2 text-3xl uppercase tracking-wide text-primary"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {area.title}
                  </h4>

                  <p className="text-sm leading-relaxed text-gray-700 md:text-base">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

  <section className="px-6 py-14 md:px-10 md:py-18">
  <div className="mx-auto max-w-6xl">
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
      <div className="rounded-xl bg-primary p-8 text-white shadow-md md:p-10">
        <p
          className="mb-2 text-base uppercase tracking-[0.2em] text-accent"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Formas de dar
        </p>

        <h2
          className="mb-5 text-4xl uppercase leading-tight tracking-wide text-accent md:text-6xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Opciones de Donación
        </h2>

        <p className="text-lg leading-relaxed text-white/85">
          Puedes dar tu ofrenda o donación durante nuestros cultos o por medio
          de las opciones disponibles. Cada aportación ayuda a sostener la obra,
          los ministerios y el servicio a nuestra comunidad.
        </p>
      </div>

      <div className="grid gap-5">
        {givingOptions.map((option) => {
          const Icon = option.icon;

          return (
            <div
              key={option.title}
              className="rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg md:p-7"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-accent/15">
                  <Icon className="h-8 w-8 text-accent" />
                </div>

                <div className="flex-1">
                  <h3
                    className="mb-2 text-3xl uppercase tracking-wide text-primary md:text-4xl"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {option.title}
                  </h3>

                  <p className="text-base leading-relaxed text-gray-700">
                    {option.description}
                  </p>
                </div>

                <p className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary sm:ml-4 sm:shrink-0">
                  {option.note}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</section>
    </div>
  );
}