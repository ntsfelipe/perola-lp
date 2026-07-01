# Arquitetura

A arquitetura vigente está documentada de forma segmentada em [`docs/architecture/index.md`](./architecture/index.md).

Resumo:

- Next.js 16 + React 19 + TypeScript;
- App Router e Server Components por padrão;
- Tailwind CSS 4 + Motion;
- conteúdo estático tipado na primeira etapa;
- adapter para Sanity na segunda etapa;
- deploy na Vercel com Node.js 24 LTS;
- Vitest, Testing Library e Playwright.
