import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, LogIn } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) {
      console.log("Supabase error:", signInError.message);
      setSubmitting(false);
      setError(signInError.message);
      return;
    }

    const userId = signInData?.user?.id;

    if (!userId) {
      setSubmitting(false);
      setError("No se pudo verificar el usuario.");
      return;
    }

    const { data: adminRow, error: adminError } = await supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (adminError) {
      console.log("Supabase error:", adminError.message);
      setSubmitting(false);
      setError(adminError.message);
      return;
    }

   if (!adminRow) {
  await supabase.auth.signOut();
  setSubmitting(false);
  setError("Esta cuenta no tiene acceso de administrador.");
  return;
}

    setSubmitting(false);
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-20 px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1
            className="text-accent text-6xl mb-6 uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Acceso de Administrador
          </h1>
          <p className="text-white/90 text-xl max-w-3xl mx-auto">
            Ingresa tus credenciales para acceder al panel de administración.
          </p>
        </div>
      </div>

      <div className="py-20 px-10">
        <div className="max-w-md mx-auto">
          <div className="bg-white p-12 rounded-lg shadow-lg">
            <h2
              className="text-primary text-4xl mb-8 text-center uppercase tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Iniciar Sesión
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-white border-2 border-primary text-primary py-4 uppercase tracking-wide hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <LogIn className="w-5 h-5" />
                {submitting ? "Verificando..." : "Iniciar Sesión"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
