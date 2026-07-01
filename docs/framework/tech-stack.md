# Stack técnica

## Runtime e ferramentas

| Item | Decisão |
|---|---|
| Runtime | Node.js 24.x LTS |
| Package manager | npm, com `package-lock.json` versionado |
| Linguagem | TypeScript em modo `strict` |
| Framework | Next.js 16.x |
| UI runtime | React 19.x |
| Roteamento | Next.js App Router |
| Bundler | Turbopack padrão do Next.js |
| Estilos | Tailwind CSS 4.x + tokens CSS |
| Animação | Motion (`motion/react`) |
| Ícones | Lucide React, somente ícones importados |
| Unit/component tests | Vitest + React Testing Library + jsdom |
| E2E | Playwright |
| Lint | ESLint com configuração recomendada do Next.js |
| CMS futuro | Sanity + `next-sanity` |
| Deploy | Vercel |

## Scaffold aprovado

O scaffold Next.js fica em `src/web`, preservando `AGENTS.md`, `.aiox-core`, `.codex`, `assets` e `docs` na raiz do repositório. O `package.json` da raiz apenas delega comandos para `src/web`.

Configurações:

- TypeScript;
- ESLint;
- Tailwind CSS;
- `src/web` como raiz da aplicação;
- App Router;
- alias `@/*`;
- sem Pages Router;
- sem `output: "export"`, pois a etapa Sanity precisará de recursos do runtime Next.js.

## Scripts obrigatórios

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  },
  "engines": {
    "node": "24.x"
  }
}
```

## Restrições

- Não instalar biblioteca de componentes completa nesta story.
- Não instalar gerenciador de estado global.
- Não instalar cliente Sanity antes da story de integração.
- Não usar dependências para utilidades triviais.
- Dependências devem usar versões estáveis compatíveis com os majors definidos.
