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

  test("exposes the available blog route", async ({ page }) => {
    await page.goto("/");
    expect(await page.getByRole("link", { name: "Blog" }).count()).toBeGreaterThan(0);

    await page.goto("/blog");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Informação");
  });

  test("WhatsApp CTA uses an encoded configurable URL", async ({ page }) => {
    await page.goto("/");

    const cta = page.getByRole("link", { name: /Agendar consulta/ }).first();
    await expect(cta).toHaveAttribute(
      "href",
      /https:\/\/wa\.me\/\d+\?text=Ol%C3%A1/,
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

test.describe("Blog", () => {
  test("loads the public listing with security headers and no console errors", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    const response = await page.goto("/blog");

    expect(response?.status()).toBe(200);
    expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });

  test("returns 404 for a malicious slug", async ({ page }) => {
    const response = await page.goto("/blog/x%22%5D%20%7C%20*%5Btrue%5D");
    expect(response?.status()).toBe(404);
  });

  test("serves a non-indexable Studio shell", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1024", "One browser profile is sufficient");

    const response = await page.goto("/studio", {
      waitUntil: "domcontentloaded",
      timeout: 20_000,
    });

    expect(response?.status()).toBe(200);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
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
