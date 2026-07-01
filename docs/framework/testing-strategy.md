# Estratégia de testes

## Pirâmide

1. Testes unitários para funções puras.
2. Testes de componentes para renderização e acessibilidade básica.
3. E2E para navegação, responsividade e comportamento no navegador.
4. Revisão visual manual da referência em breakpoints definidos na story.

## Vitest e Testing Library

Cobertura mínima da Story 1.1:

- montagem correta da URL de WhatsApp;
- normalização do telefone;
- renderização de um único `h1`;
- renderização de seções a partir do conteúdo;
- ocultação de seção ou link desabilitado;
- tratamento de lista vazia;
- atributos acessíveis do menu mobile.

Testar comportamento observável. Não testar classes Tailwind específicas, estrutura interna de Motion ou detalhes de implementação.

## Playwright

Fluxos mínimos:

- carregar `/` sem erro de console;
- abrir e fechar menu mobile;
- navegar por âncora;
- validar CTA com URL de WhatsApp;
- navegar somente por teclado nos controles principais;
- confirmar ausência de overflow horizontal;
- confirmar que blog inexistente não gera link quebrado.

Viewports:

- 320 × 800;
- 375 × 812;
- 768 × 1024;
- 1024 × 768;
- 1440 × 900.

Executar contra o build de produção pelo `webServer` do Playwright.

## Movimento reduzido

Executar pelo menos um cenário E2E com `reducedMotion: "reduce"` e verificar que o conteúdo permanece disponível e que nenhuma animação essencial bloqueia interação.

## Quality gates

Todos devem passar:

```text
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Vitest deve usar `vitest run` no script `test` para não entrar em watch mode no gate automatizado.

