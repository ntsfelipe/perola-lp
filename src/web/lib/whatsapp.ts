export function normalizePhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, "");
}

export function buildWhatsAppUrl(
  phoneNumber: string,
  message: string,
): string {
  const normalizedNumber = normalizePhoneNumber(phoneNumber);
  const encodedMessage = encodeURIComponent(message.trim());

  return `https://wa.me/${normalizedNumber}?text=${encodedMessage}`;
}
