export const getYoutubeVideoId = (url) => {
  if (!url) {
    return null;
  }

  const value = String(url).trim();

  if (!value) {
    return null;
  }

  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    /[?&]v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = value.match(pattern);

    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

export const getYoutubeThumbnail = (url) => {
  const videoId = getYoutubeVideoId(url);

  if (!videoId) {
    return null;
  }

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};
