import { supabase } from "./supabase";

export async function getSiteSettings() {
  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  return data;
}

export async function getTeamMembers() {
  const { data } = await supabase
    .from("team_members")
    .select("*")
    .eq("deleted", false)
    .order("order_index", { ascending: true });

  return data || [];
}

export async function getMinistries() {
  const { data } = await supabase
    .from("ministries")
    .select("*")
    .eq("deleted", false)
    .order("order_index", { ascending: true });

  return data || [];
}

export async function getSocietyPage(slug) {
  const [{ data: page }, { data: images }] = await Promise.all([
    supabase
      .from("society_pages")
      .select("*")
      .eq("slug", slug)
      .eq("deleted", false)
      .maybeSingle(),
    supabase
      .from("page_images")
      .select("*")
      .eq("page_type", "society")
      .eq("page_slug", slug)
      .eq("deleted", false)
      .order("order_index", { ascending: true }),
  ]);

  return { page, images: images || [] };
}

export async function getPageImages(pageType, pageSlug) {
  const { data } = await supabase
    .from("page_images")
    .select("*")
    .eq("page_type", pageType)
    .eq("page_slug", pageSlug)
    .eq("deleted", false)
    .order("order_index", { ascending: true });

  return data || [];
}

/**
 * Returns members grouped by category:
 *   { pastores: [...], ministerio: [...], lideres: [...] }
 * "pastores" combines pastor_principal + pastor.
 * "lideres" includes all lider_* categories.
 */
export async function getTeamGrouped() {
  const members = await getTeamMembers();

  const pastores = members.filter(
    (m) => m.category === "pastor_principal" || m.category === "pastor"
  );
  const ministerio = members.filter((m) => m.category === "ministerio");
  const lideres = members.filter((m) =>
    String(m.category || "").startsWith("lider_")
  );

  return { pastores, ministerio, lideres, all: members };
}

/**
 * Extracts a YouTube video ID from any common URL format.
 * Returns null if the URL doesn't look like a YouTube link.
 */
export function youtubeId(url) {
  if (!url) return null;
  const value = String(url).trim();

  const patterns = [
    /youtube\.com\/watch\?[^#]*\bv=([A-Za-z0-9_-]{6,})/i,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/i,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/i,
    /youtube\.com\/live\/([A-Za-z0-9_-]{6,})/i,
    /youtu\.be\/([A-Za-z0-9_-]{6,})/i,
    /m\.youtube\.com\/watch\?[^#]*\bv=([A-Za-z0-9_-]{6,})/i,
  ];

  for (const re of patterns) {
    const match = value.match(re);
    if (match && match[1]) return match[1];
  }

  return null;
}

/**
 * Converts a YouTube URL to an embeddable iframe URL.
 * Returns null if it can't be parsed.
 */
export function youtubeEmbedUrl(url) {
  const id = youtubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

/**
 * Returns a YouTube thumbnail URL given any common video link form.
 */
export function youtubeThumbnail(url) {
  const id = youtubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

/**
 * Builds a Facebook video embed URL from any Facebook video link
 * (facebook.com/.../videos/..., fb.watch/..., facebook.com/watch/?v=..., reel).
 * Returns null if it doesn't look like Facebook.
 */
export function facebookEmbedUrl(url) {
  if (!url) return null;
  const value = String(url).trim();

  if (!/(facebook\.com|fb\.watch)/i.test(value)) return null;

  const params = new URLSearchParams({
    href: value,
    show_text: "false",
    autoplay: "true",
    width: "560",
    t: "0",
  });

  return `https://www.facebook.com/plugins/video.php?${params.toString()}`;
}
