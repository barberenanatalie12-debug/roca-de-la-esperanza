export const formatTime = (time) => {
  if (!time) return "";

  const [hour, minute] = String(time).split(":");
  const h = Number(hour);
  const m = Number(minute);

  if (Number.isNaN(h) || Number.isNaN(m)) {
    return time;
  }

  const date = new Date();
  date.setHours(h);
  date.setMinutes(m);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
