# Arquitetura do projeto Pérola

## Status

Arquitetura aprovada para implementação da Story 1.1 em 24 de junho de 2026.

## Visão geral

O projeto será um monólito frontend em Next.js hospedado na Vercel. A primeira entrega é uma landing page estática. O Sanity será conectado em uma etapa posterior para o blog e, se desejado, para tornar o conteúdo institucional editável.

```text
Visitante
   |
   v
Vercel CDN
   |
   v
Next.js App Router
   |
   +-- Landing page estática -> conteúdo local tipado
   |
   +-- Blog futuro -> adaptador Sanity -> Sanity Content Lake
   |
   +-- Studio futuro em /studio -> Sanity Studio
```

## Decisões principais

1. Next.js 16 com App Router e TypeScript.
2. React 19, usando Server Components por padrão.
3. Tailwind CSS 4 para estilos, complementado por tokens CSS em `globals.css`.
4. Motion para reveals e animações coordenadas; transições CSS para microinterações simples.
5. Conteúdo institucional consumido por uma interface `LandingPageContent`.
6. Primeira etapa usa um provider estático local.
7. Integração futura do Sanity implementa o mesmo contrato por meio de um adapter.
8. Vercel como plataforma de build, preview e produção.
9. Node.js 24 LTS fixado em `package.json`.
10. Vitest + React Testing Library para testes unitários e de componentes; Playwright para fluxos e validação responsiva.

## Documentos

- [Arquitetura frontend](./frontend-architecture.md)
- [Arquitetura de conteúdo e Sanity](./content-architecture.md)
- [Deploy na Vercel](./deployment.md)
- [Stack técnica](../framework/tech-stack.md)
- [Estrutura de código](../framework/source-tree.md)
- [Padrões de código](../framework/coding-standards.md)
- [Estratégia de testes](../framework/testing-strategy.md)

## Limites da Story 1.1

Incluído:

- scaffold Next.js;
- landing page;
- conteúdo estático tipado;
- placeholders locais;
- animações;
- acessibilidade;
- testes;
- build compatível com Vercel.

Adiado:

- instalação e configuração do Sanity;
- schemas e queries;
- `/studio`;
- listagem e detalhe de posts;
- Draft Mode e Visual Editing;
- webhook ou revalidação de conteúdo;
- configuração efetiva do projeto na Vercel.

## Fontes oficiais consultadas

- Next.js Installation, atualizado em 3 de março de 2026: https://nextjs.org/docs/app/getting-started/installation
- React Versions: https://react.dev/versions
- Tailwind CSS com Next.js: https://tailwindcss.com/docs/installation/framework-guides/nextjs
- Motion for React: https://motion.dev/docs/react
- Sanity com Next.js App Router: https://www.sanity.io/docs/visual-editing/visual-editing-with-next-js-app-router
- Next.js na Vercel: https://vercel.com/docs/frameworks/full-stack/nextjs
- Node.js suportado pela Vercel: https://vercel.com/docs/functions/runtimes/node-js/node-js-versions

