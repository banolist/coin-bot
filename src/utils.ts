export function formatMSK(date: Date) {
  const formatted = date.toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  // Преобразуем "26.10.2023, 14:30:25" в "26.10.2023 14:30:25"
  return formatted.replace(",", "");
}
