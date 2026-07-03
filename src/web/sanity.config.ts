"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { ArchivePostAction } from "@/sanity/actions/archive-post";
import { sanityEnv } from "@/sanity/lib/env";
import { schemaTypes } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";

export default defineConfig({
  name: "perola",
  title: "Pérola Clínica — Conteúdo",
  basePath: sanityEnv.studioUrl,
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
  document: {
    actions: (previous, context) =>
      context.schemaType === "post"
        ? [...previous, ArchivePostAction]
        : previous,
  },
});
