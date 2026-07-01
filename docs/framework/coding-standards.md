# Padrões de código

## TypeScript

- `strict: true`.
- Não usar `any`; preferir `unknown` com narrowing.
- Tipos de conteúdo ficam em `src/types/content.ts`.
- Props devem ser explícitas e readonly quando aplicável.
- Usar `satisfies` no objeto estático para validar o contrato sem perder inferência.
- Funções exportadas devem ter responsabilidade única.

## React e Next.js

- Server Component por padrão.
- `"use client"` somente na menor fronteira possível.
- Não buscar conteúdo dentro de componentes de seção.
- Não duplicar dados do conteúdo em JSX.
- Usar `next/image`, `next/font` e Metadata API.
- Não usar índice de array como key quando houver identificador estável.
- Não adicionar efeitos para derivar estado que pode ser calculado durante renderização.

## Componentes

- Seções recebem dados prontos para apresentação.
- Componentes de UI não conhecem o domínio completo.
- Variantes visuais pequenas podem ser props; não criar abstrações genéricas prematuras.
- Links externos com `target="_blank"` devem usar `rel="noopener noreferrer"`.

## Estilos

- Mobile first.
- Tokens semânticos em `globals.css`.
- Não usar CSS inline para valores estáticos.
- Não criar classes Tailwind por concatenação dinâmica que impeça detecção no build.
- Manter estados `hover`, `focus-visible`, `active` e `disabled`.

## Acessibilidade

- Semântica nativa antes de ARIA.
- Todo controle deve possuir nome acessível.
- Não remover outline sem substituição visível.
- Movimento não pode ser requisito para compreender conteúdo.
- Validar teclado e `prefers-reduced-motion`.

## Segurança

- Sanitizar a montagem de links externos por funções dedicadas.
- WhatsApp aceita somente número normalizado para dígitos e mensagem com `encodeURIComponent`.
- Não inserir HTML do conteúdo com `dangerouslySetInnerHTML`.
- Nenhum segredo em código ou variável `NEXT_PUBLIC_`.

## Qualidade

Antes de concluir:

```text
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

