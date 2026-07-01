# Estrutura de código

`src/web` é a raiz da aplicação Next.js. A raiz do repositório contém apenas os artefatos de projeto e um `package.json` delegador.

```text
/
├── package.json                 # delega comandos para src/web
├── assets/                      # referências de design
├── docs/
└── src/
    └── web/                     # raiz real do Next.js
        ├── app/
        │   ├── fonts/
        │   ├── globals.css
        │   ├── layout.tsx
        │   └── page.tsx
        ├── components/
        │   ├── landing/
        │   ├── layout/
        │   └── ui/
        ├── content/
        │   ├── landing-page.ts
        │   └── providers/
        ├── lib/
        ├── public/
        │   └── images/placeholders/
        ├── tests/
        │   ├── e2e/
        │   └── unit/
        ├── types/
        ├── eslint.config.mjs
        ├── next-env.d.ts
        ├── next.config.ts
        ├── package.json
        ├── package-lock.json
        ├── playwright.config.ts
        ├── postcss.config.mjs
        ├── tsconfig.json
        └── vitest.config.mts
```

## Etapa Sanity

Adicionar somente na story futura:

```text
src/web/
├── app/
│   ├── blog/
│   ├── studio/[[...tool]]/
│   └── api/draft-mode/
├── content/providers/sanity/
└── sanity/
    ├── lib/
    ├── queries/
    └── schemaTypes/
```

## Convenções

- Arquivos e diretórios: `kebab-case`.
- Componentes exportados: `PascalCase`.
- Uma seção principal por arquivo.
- Testes unitários em `src/web/tests/unit`; E2E em `src/web/tests/e2e`.
- Imports internos com `@/`, resolvidos a partir de `src/web`.

