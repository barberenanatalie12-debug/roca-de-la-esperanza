import { Heart, Building, Users, DollarSign, QrCode, Banknote, Calendar } from "lucide-react";

export default function Donar() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-20 px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1
            className="text-accent text-6xl mb-6 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Ofrendas y Donaciones
          </h1>
          <p className="text-white/90 text-xl max-w-3xl mx-auto leading-relaxed">
            Somos una organización non profit sostenida por ofrendas y donaciones voluntarias.
          </p>
        </div>
      </div>

      <div className="py-16 px-10 bg-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-700 text-lg leading-relaxed">
            Cada aportación ayuda a apoyar los ministerios, las instalaciones, las familias,
            las misiones y la predicación del evangelio.
          </p>
        </div>
      </div>

      <div className="py-16 px-10">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-primary text-5xl mb-12 text-center uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Tu Aportación Hace la Diferencia
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Heart className="w-12 h-12 text-accent" />
              </div>
              <h3
                className="text-primary text-2xl uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Ministerios
              </h3>
              <p className="text-gray-700">
                Apoyas todos nuestros ministerios y programas que impactan vidas.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Building className="w-12 h-12 text-accent" />
              </div>
              <h3
                className="text-primary text-2xl uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Instalaciones
              </h3>
              <p className="text-gray-700">
                Mantienes y mejoras nuestras instalaciones para la comunidad.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Users className="w-12 h-12 text-accent" />
              </div>
              <h3
                className="text-primary text-2xl uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Familias
              </h3>
              <p className="text-gray-700">
                Ayudas a familias necesitadas en nuestra comunidad local.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <DollarSign className="w-12 h-12 text-accent" />
              </div>
              <h3
                className="text-primary text-2xl uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Misiones
              </h3>
              <p className="text-gray-700">
                Contribuyes a llevar el evangelio más allá de nuestras puertas.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 px-10 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-primary text-5xl mb-6 text-center uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Formas de Dar
          </h2>
          <p className="text-gray-700 text-center text-lg mb-12 max-w-3xl mx-auto">
            Puedes dar tu ofrenda o donación durante nuestros cultos o por medio de las opciones disponibles.
          </p>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-accent/10 p-4 rounded-full">
                  <Calendar className="w-8 h-8 text-accent" />
                </div>
                <h3
                  className="text-primary text-3xl uppercase tracking-wide"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Durante los Cultos
                </h3>
              </div>
              <p className="text-gray-700 text-lg">
                Puedes dar tu ofrenda o donación durante nuestros cultos. Tenemos cajas de
                ofrendas disponibles en el santuario.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-accent/10 p-4 rounded-full">
                  <QrCode className="w-8 h-8 text-accent" />
                </div>
                <h3
                  className="text-primary text-3xl uppercase tracking-wide"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Código QR
                </h3>
              </div>
              <p className="text-gray-700 text-lg mb-4">
                Escanea el código QR para dar tu ofrenda o donación.
              </p>
              <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center">
                <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 italic">Código QR pendiente</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-accent/10 p-4 rounded-full">
                  <Banknote className="w-8 h-8 text-accent" />
                </div>
                <h3
                  className="text-primary text-3xl uppercase tracking-wide"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Transferencia Bancaria
                </h3>
              </div>
              <p className="text-gray-700 text-lg mb-2">
                Para donaciones por transferencia bancaria, contacta a la iglesia para más
                información.
              </p>
              <p className="text-gray-500 italic text-sm">Información bancaria pendiente</p>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-16">
        <div className="rounded-lg bg-primary text-white border-t-4 border-accent p-8 md:p-10 text-center shadow-md">
          <h2
            className="text-4xl md:text-5xl uppercase tracking-wide mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Gracias por tu apoyo
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto leading-relaxed">
            Cada ofrenda o donación, sin importar la cantidad, es una bendición
            para nuestra iglesia y nuestra comunidad.
          </p>
        </div>
      </section>
    </div>
  );
}
