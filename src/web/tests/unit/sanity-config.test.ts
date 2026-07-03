import { describe, expect, it } from "vitest";

import { getArchivePatch } from "@/sanity/actions/archive-post-patch";
import { parseSanityEnv } from "@/sanity/lib/env-schema";
import { POST_FIELD_NAMES } from "@/sanity/schemaTypes/post-fields";

describe("Sanity environment", () => {
  it("accepts the public project configuration without a token", () => {
    expect(
      parseSanityEnv({
        NEXT_PUBLIC_SANITY_PROJECT_ID: "abc123",
        NEXT_PUBLIC_SANITY_DATASET: "production",
        NEXT_PUBLIC_SANITY_API_VERSION: "2026-07-02",
        NEXT_PUBLIC_SANITY_STUDIO_URL: "/studio",
      }),
    ).toEqual({
      projectId: "abc123",
      dataset: "production",
      apiVersion: "2026-07-02",
      studioUrl: "/studio",
    });
  });

  it.each([
    ["project id", { NEXT_PUBLIC_SANITY_PROJECT_ID: "" }],
    ["dataset", { NEXT_PUBLIC_SANITY_DATASET: "../private" }],
    ["API version", { NEXT_PUBLIC_SANITY_API_VERSION: "latest" }],
    ["Studio URL", { NEXT_PUBLIC_SANITY_STUDIO_URL: "https://evil.example" }],
  ])("rejects an invalid %s", (_, override) => {
    expect(() =>
      parseSanityEnv({
        NEXT_PUBLIC_SANITY_PROJECT_ID: "abc123",
        NEXT_PUBLIC_SANITY_DATASET: "production",
        NEXT_PUBLIC_SANITY_API_VERSION: "2026-07-02",
        NEXT_PUBLIC_SANITY_STUDIO_URL: "/studio",
        ...override,
      }),
    ).toThrow("Invalid Sanity configuration");
  });
});

describe("post schema", () => {
  it("contains only the fields required by the editorial workflow", () => {
    expect(Object.values(POST_FIELD_NAMES)).toEqual([
      "title",
      "slug",
      "excerpt",
      "coverImage",
      "publishedAt",
      "body",
      "archivedAt",
    ]);
  });
});

describe("archive mutation", () => {
  it("sets a timestamp when archiving and unsets it when restoring", () => {
    expect(getArchivePatch(false, "2026-07-02T12:00:00.000Z")).toEqual({
      set: { archivedAt: "2026-07-02T12:00:00.000Z" },
    });
    expect(getArchivePatch(true, "ignored")).toEqual({ unset: ["archivedAt"] });
  });
});
