import { expect, test } from "@playwright/test";

test.describe("Landing page", () => {
  test("loads without console errors and keeps a single h1", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { name: "Nossas especialidades" })).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });

  test("does not expose an unavailable blog route", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Blog" })).toHaveCount(0);
  });

  test("WhatsApp CTA uses an encoded configurable URL", async ({ page }) => {
    await page.goto("/");

    const cta = page.getByRole("link", { name: /Agendar consulta/ }).first();
    await expect(cta).toHaveAttribute(
      "href",
      /https:\/\/wa\.me\/5500000000000\?text=Ol%C3%A1/,
    );
    await expect(cta).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("mobile menu opens, navigates by anchor and closes", async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 999) >= 1024, "Mobile-only behavior");

    await page.goto("/");
    await page.getByRole("button", { name: "Abrir menu" }).click();
    const nav = page.getByRole("navigation", { name: "Navegação mobile" });
    await expect(nav).toBeVisible();
    await nav.getByRole("link", { name: "Especialidades" }).click();
    await expect(page).toHaveURL(/#especialidades$/);
    await expect(page.getByRole("button", { name: "Abrir menu" })).toBeVisible();
  });

  test("has no horizontal overflow", async ({ page }) => {
    await page.goto("/");
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasOverflow).toBe(false);
  });
});

test.describe("Reduced motion", () => {
  test("keeps all essential content available", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Nossas especialidades" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Falar pelo WhatsApp/ })).toBeVisible();
  });
});
