import { defineArrayMember, defineField, defineType } from "sanity";

import { POST_FIELD_NAMES } from "@/sanity/schemaTypes/post-fields";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  description: "Conteúdo publicado no blog da clínica.",
  fields: [
    defineField({
      name: POST_FIELD_NAMES.title,
      title: "Título",
      type: "string",
      validation: (rule) =>
        rule.required().min(5).max(120).error("Informe um título entre 5 e 120 caracteres."),
    }),
    defineField({
      name: POST_FIELD_NAMES.slug,
      title: "Endereço do post",
      type: "slug",
      description: "Clique em “Gerar” para criar o endereço a partir do título.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required().error("Gere o endereço do post."),
    }),
    defineField({
      name: POST_FIELD_NAMES.excerpt,
      title: "Resumo",
      type: "text",
      rows: 3,
      description: "Texto curto exibido nos cards do blog.",
      validation: (rule) =>
        rule.required().min(20).max(240).error("Use entre 20 e 240 caracteres."),
    }),
    defineField({
      name: POST_FIELD_NAMES.coverImage,
      title: "Imagem de capa",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Descrição da imagem",
          type: "string",
          description: "Descreva a imagem para pessoas que usam leitores de tela.",
          validation: (rule) =>
            rule.required().min(5).max(160).error("Descreva a imagem em até 160 caracteres."),
        }),
      ],
      validation: (rule) =>
        rule
          .required()
          .custom((image) =>
            image?.asset?._ref
              ? true
              : "Selecione e envie um arquivo para a imagem de capa.",
          )
          .error("Adicione uma imagem de capa completa."),
    }),
    defineField({
      name: POST_FIELD_NAMES.publishedAt,
      title: "Data de publicação",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required().error("Informe a data de publicação."),
    }),
    defineField({
      name: POST_FIELD_NAMES.body,
      title: "Conteúdo",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Texto normal", value: "normal" },
            { title: "Título de seção", value: "h2" },
            { title: "Subtítulo", value: "h3" },
            { title: "Citação", value: "blockquote" },
          ],
          lists: [
            { title: "Lista com marcadores", value: "bullet" },
            { title: "Lista numerada", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Negrito", value: "strong" },
              { title: "Itálico", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "Endereço",
                    type: "url",
                    validation: (rule) =>
                      rule
                        .required()
                        .uri({ allowRelative: true, scheme: ["http", "https"] })
                        .error("Use um caminho interno ou uma URL http/https válida."),
                  }),
                ],
              },
            ],
          },
        }),
      ],
      validation: (rule) => rule.required().min(1).error("Escreva o conteúdo do post."),
    }),
    defineField({
      name: POST_FIELD_NAMES.archivedAt,
      title: "Arquivado em",
      type: "datetime",
      description: "Controlado pelas ações Arquivar e Restaurar.",
      readOnly: true,
      hidden: ({ value }) => !value,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      publishedAt: "publishedAt",
      archivedAt: "archivedAt",
    },
    prepare(selection) {
      const subtitle = selection.archivedAt
        ? "Arquivado"
        : selection.publishedAt
          ? `Publicação: ${new Intl.DateTimeFormat("pt-BR").format(new Date(selection.publishedAt))}`
          : "Rascunho";

      return { title: selection.title, subtitle, media: selection.media };
    },
  },
});
