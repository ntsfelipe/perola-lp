# Arquitetura frontend

## Modelo de renderização

- Usar App Router em `src/web/app`, considerando `src/web` a raiz do projeto Next.js.
- A rota `/` deve ser estaticamente renderizável.
- Componentes são Server Components por padrão.
- Adicionar `"use client"` somente onde houver estado, eventos complexos, APIs do navegador ou Motion.
- Não habilitar Cache Components/PPR na Story 1.1; não há conteúdo dinâmico que justifique essa complexidade.
- Não criar API Routes, Route Handlers ou Server Actions nesta etapa.

## Composição da página

`src/web/app/page.tsx` obtém o conteúdo pelo provider e entrega os dados para `LandingPage`.

```text
page.tsx
  -> getLandingPageContent()
  -> LandingPage
       -> Header
       -> HeroSection
       -> MetricsSection
       -> SpecialtiesSection
       -> TeamSection
       -> ClinicSection
       -> LocationSection
       -> TestimonialsSection
       -> FinalCtaSection
       -> Footer
```

Cada seção:

- recebe somente props tipadas;
- não importa o provider estático;
- não conhece Sanity;
- não lê variáveis de ambiente;
- decide não renderizar quando estiver desabilitada ou sem conteúdo suficiente.

## Fronteira Server/Client

Client Components permitidos:

- `MobileNavigation`: estado aberto/fechado, Escape e controle de foco;
- `Reveal`: animações de entrada com Motion;
- componentes interativos de galeria, caso realmente necessários.

Todo o restante deve permanecer no servidor. Não transformar a página inteira em Client Component para viabilizar animações.

## Estilos

Usar Tailwind CSS 4 com tokens semânticos definidos em `src/web/app/globals.css`:

- cores de fundo, superfície, texto, destaque, borda e foco;
- fontes editorial e sans-serif;
- raios;
- sombras;
- larguras de container;
- espaçamento de seção.

Evitar valores hexadecimais repetidos dentro dos componentes. Valores excepcionais podem usar arbitrary values, mas os fundamentos visuais devem ser tokens.

Usar `next/font` para uma fonte serifada editorial e uma sans-serif, ambas configuráveis no layout. Não carregar fontes por `<link>` remoto no navegador.

## Imagens

- Imagens locais ficam em `public/images`.
- Usar `next/image` com `width`/`height` ou `fill` e `sizes`.
- Placeholders devem ser arquivos locais ou blocos CSS, nunca URLs temporárias externas.
- Imagem decorativa usa `alt=""`.
- Imagem informativa recebe texto alternativo vindo do contrato.
- O layout deve reservar proporção para evitar CLS.

## Animações

- Motion é usado para reveal, stagger e transições coordenadas.
- Hover, foco, cor e pequenos deslocamentos usam CSS.
- Criar um único componente `Reveal` e variantes reutilizáveis; não duplicar configurações em cada seção.
- Duração padrão entre 180 ms e 600 ms.
- Animar preferencialmente `opacity` e `transform`.
- Não usar parallax agressivo, cursor customizado ou animação infinita.
- O conteúdo deve permanecer visível se JavaScript falhar.
- Respeitar `prefers-reduced-motion` por CSS e `useReducedMotion` quando Motion for utilizado.

## Estado

Não usar Redux, Zustand, Context global ou outra store. O único estado previsto é local:

- menu mobile;
- seleção de imagem, se houver galeria;
- controles puramente visuais.

## Acessibilidade

- Um único `h1`.
- Landmarks: `header`, `nav`, `main`, `section`, `footer`.
- Cada seção com `aria-labelledby` ligado a um heading.
- Botões para ações; links para navegação.
- Foco visível com contraste.
- Menu mobile com `aria-expanded`, `aria-controls`, Escape e retorno do foco.
- Alvos de toque com pelo menos 44 × 44 px.
- Links externos informam contexto no nome acessível quando necessário.

## Performance

- Meta inicial de Lighthouse em produção: Performance, Accessibility, Best Practices e SEO >= 90.
- Evitar JavaScript de cliente para conteúdo estático.
- Importar Motion somente nos componentes animados.
- Não adicionar carrossel externo; preferir CSS scroll snap se uma galeria horizontal for necessária.
- Usar `next/image` e `next/font`.
