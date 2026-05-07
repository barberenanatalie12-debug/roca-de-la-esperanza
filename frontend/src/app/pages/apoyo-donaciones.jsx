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
      <section className="bg-primary px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl text-center">
          <p
            className="mb-4 text-lg uppercase tracking-[0.35em] text-accent"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Iglesia Roca de la Esperanza
          </p>

          <h1
            className="mb-8 text-6xl uppercase leading-none tracking-wide text-accent md:text-8xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Apoyo y Donaciones
          </h1>

          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/90 md:text-2xl">
            Somos una organización non profit sostenida por ofrendas y
            donaciones voluntarias. Cada aportación ayuda a servir mejor a
            nuestra iglesia y comunidad.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p
              className="mb-3 text-lg uppercase tracking-[0.25em] text-accent"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Estamos para servirte
            </p>

            <h2
              className="mb-6 text-5xl uppercase leading-none tracking-wide text-primary md:text-7xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Cómo Podemos Apoyarte
            </h2>

            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-700">
              “Sobrellevad los unos las cargas de los otros, y cumplid así la
              ley de Cristo.” Gálatas 6:2
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {supportAreas.map((area) => {
              const Icon = area.icon;

              return (
                <div
                  key={area.title}
                  className="rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl md:p-10"
                >
                  <div className="mb-8 flex items-center gap-5">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/15">
                      <Icon className="h-10 w-10 text-accent" />
                    </div>

                    <h3
                      className="text-5xl uppercase tracking-wide text-primary"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {area.title}
                    </h3>
                  </div>

                  <p className="mb-8 text-lg leading-relaxed text-gray-700">
                    {area.description}
                  </p>

                  <a
                    href="/contacto"
                    className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-lg uppercase tracking-wide text-primary transition-colors hover:bg-accent/90"
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

      <section className="bg-white px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p
              className="mb-3 text-lg uppercase tracking-[0.25em] text-accent"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Ofrendas y donaciones
            </p>

            <h2
              className="mb-6 text-5xl uppercase leading-none tracking-wide text-primary md:text-7xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Tu Aportación Hace la Diferencia
            </h2>

            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-700">
              Cada aportación ayuda a apoyar los ministerios, las instalaciones,
              las familias, las misiones y la predicación del evangelio.
            </p>
          </div>

          <div className="rounded-3xl bg-accent/10 p-8 md:p-12">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {impactAreas.map((area) => {
                const Icon = area.icon;

                return (
                  <div
                    key={area.title}
                    className="rounded-2xl bg-white p-7 text-center shadow-md"
                  >
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/15">
                      <Icon className="h-10 w-10 text-accent" />
                    </div>

                    <h4
                      className="mb-4 text-3xl uppercase tracking-wide text-primary"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {area.title}
                    </h4>

                    <p className="text-base leading-relaxed text-gray-700">
                      {area.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-3xl bg-primary p-10 text-white shadow-lg md:p-12">
              <p
                className="mb-4 text-lg uppercase tracking-[0.25em] text-accent"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Formas de dar
              </p>

              <h2
                className="mb-6 text-5xl uppercase leading-none tracking-wide text-accent md:text-6xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Puedes dar de la manera que sea más fácil para ti
              </h2>

              <p className="text-lg leading-relaxed text-white/85">
                Puedes dar tu ofrenda o donación durante nuestros cultos o por
                medio de las opciones disponibles. Si necesitas ayuda, puedes
                contactar a la iglesia.
              </p>
            </div>

            <div className="space-y-6">
              {givingOptions.map((option) => {
                const Icon = option.icon;

                return (
                  <div
                    key={option.title}
                    className="rounded-2xl bg-white p-8 shadow-lg md:p-10"
                  >
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                      <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-2xl bg-accent/15 p-5">
                        <Icon className="h-9 w-9 text-accent" />
                      </div>

                      <div>
                        <h3
                          className="mb-3 text-4xl uppercase tracking-wide text-primary"
                          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                          {option.title}
                        </h3>

                        <p className="mb-4 text-lg leading-relaxed text-gray-700">
                          {option.description}
                        </p>

                        <p className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                          {option.note}
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

      <section className="bg-accent/10 px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            className="mb-6 text-5xl uppercase leading-none tracking-wide text-primary md:text-7xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Gracias por Ser Parte de Nuestra Familia
          </h2>

          <p className="text-xl leading-relaxed text-gray-700">
            Ya sea que necesites apoyo o quieras dar generosamente, recuerda que
            somos una familia unida en Cristo. Estamos aquí para servirnos
            mutuamente con amor.
          </p>
        </div>
      </section>
    </div>
  );
}