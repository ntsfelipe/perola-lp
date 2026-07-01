import { describe, expect, it } from "vitest";

import { buildWhatsAppUrl, normalizePhoneNumber } from "@/lib/whatsapp";

describe("WhatsApp helpers", () => {
  it("normalizes the phone number to digits only", () => {
    expect(normalizePhoneNumber("+55 (11) 99999-0000")).toBe("5511999990000");
  });

  it("builds an encoded WhatsApp URL", () => {
    expect(
      buildWhatsAppUrl("+55 (11) 99999-0000", "Olá! Quero agendar."),
    ).toBe(
      "https://wa.me/5511999990000?text=Ol%C3%A1!%20Quero%20agendar.",
    );
  });
});
