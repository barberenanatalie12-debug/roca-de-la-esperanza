import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { supabase } from "../../lib/supabase";

export default function ProtectedAdminRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let mounted = true;

    const checkAccess = async () => {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (!mounted) return;

      if (sessionError) {
        console.log("Supabase error:", sessionError.message);
        setStatus("unauthenticated");
        return;
      }

      const session = sessionData?.session;

      if (!session) {
        setStatus("unauthenticated");
        return;
      }

      const { data: adminRow, error: adminError } = await supabase
        .from("admins")
        .select("user_id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (!mounted) return;

      if (adminError) {
        console.log("Supabase error:", adminError.message);
        setStatus("not-admin");
        return;
      }

      if (!adminRow) {
        setStatus("not-admin");
        return;
      }

      setStatus("admin");
    };

    checkAccess();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkAccess();
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p
          className="text-primary text-2xl uppercase tracking-wide"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Verificando acceso...
        </p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  if (status === "not-admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}