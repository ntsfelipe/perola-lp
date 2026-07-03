const POST_DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatPostDate(value: string): string {
  return POST_DATE_FORMATTER.format(new Date(value));
}
