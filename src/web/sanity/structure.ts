import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .title("Posts")
        .child(
          S.documentList()
            .title("Posts")
            .schemaType("post")
            .filter('_type == "post" && !defined(archivedAt)'),
        ),
      S.divider(),
      S.listItem()
        .title("Arquivados")
        .child(
          S.documentList()
            .title("Posts arquivados")
            .schemaType("post")
            .filter('_type == "post" && defined(archivedAt)'),
        ),
    ]);
