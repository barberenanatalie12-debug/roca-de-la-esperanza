import { supabase } from "./supabase";

export const requireAdmin = async () => {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log("Supabase error:", sessionError.message);
    return { ok: false, reason: "session-error" };
  }

  const session = sessionData?.session;

  if (!session) {
    return { ok: false, reason: "unauthenticated" };
  }

  const { data: adminRow, error: adminError } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", session.user.id)
    .maybeSingle();

  if (adminError) {
    console.log("Supabase error:", adminError.message);
    return { ok: false, reason: "admin-check-error" };
  }

  if (!adminRow) {
    return { ok: false, reason: "not-admin" };
  }

  return { ok: true, userId: session.user.id };
};
