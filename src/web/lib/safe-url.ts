const INTERNAL_PATH = /^\/(?!\/)[^\u0000-\u001f\\]*$/;

export function toSafeHref(value: unknown): string | null {
  if (typeof value !== "string" || value.length === 0) {
    return null;
  }

  if (INTERNAL_PATH.test(value)) {
    return value;
  }

  try {
    const url = new URL(value);

    if (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.username === "" &&
      url.password === ""
    ) {
      return value;
    }
  } catch {
    return null;
  }

  return null;
}
