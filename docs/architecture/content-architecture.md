# Arquitetura de conteúdo e Sanity

## Contrato independente de CMS

Os componentes visuais dependem de `LandingPageContent`, definido em `src/web/types/content.ts`. Esse tipo representa o modelo de leitura da interface, não o schema do Sanity.

```ts
export interface ContentProvider {
  getLandingPage(): Promise<LandingPageContent>
}
```

Na Story 1.1:

```text
StaticContentProvider
  -> src/web/content/landing-page.ts
  -> LandingPageContent
```

Na etapa Sanity:

```text
SanityContentProvider
  -> GROQ
  -> DTO retornado pelo Sanity
  -> mapSanityLandingPage()
  -> LandingPageContent
```

## Regra de dependência

Permitido:

```text
page -> provider -> contrato
section component -> contrato
sanity adapter -> contrato
```

Proibido:

```text
section component -> next-sanity
section component -> GROQ
section component -> SanityImageSource
contrato de UI -> tipos gerados pelo Sanity
```

## Conteúdo estático

- Manter placeholders em `src/web/content/landing-page.ts`.
- Usar valores claramente substituíveis, como `ALTERAR_NOME`, `ALTERAR_WHATSAPP` e imagens em `/images/placeholders`.
- Centralizar a criação do link WhatsApp em `src/web/lib/whatsapp.ts`.
- O provider estático pode retornar `Promise.resolve(content)` para preservar a mesma interface assíncrona do provider futuro.

## Sanity futuro

A integração do Sanity deve ser uma story separada. Direção aprovada:

- `next-sanity` para cliente e integração com App Router;
- schemas em `src/web/sanity/schemaTypes`;
- queries em `src/web/sanity/queries`;
- adapter em `src/web/content/providers/sanity`;
- Studio incorporado em `/studio/[[...tool]]` no mesmo projeto Next.js;
- Draft Mode e Visual Editing apenas quando houver benefício editorial;
- `apiVersion` fixada em data explícita, não `"latest"`;
- conteúdo publicado servido pelo CDN;
- tokens privados somente no servidor e nunca com prefixo `NEXT_PUBLIC_`.

Variáveis futuras:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
NEXT_PUBLIC_SANITY_STUDIO_URL
SANITY_API_READ_TOKEN
```

`SANITY_API_READ_TOKEN` só será necessário para drafts, conteúdo privado ou Visual Editing. Conteúdo público publicado não deve exigir token.

## Blog futuro

Rotas previstas, fora da Story 1.1:

```text
/blog
/blog/[slug]
/studio/[[...tool]]
/api/draft-mode/enable
/api/draft-mode/disable
```

Não criar links ativos para essas rotas antes de elas existirem.
