# Deploy na Vercel

## Estratégia

- Um projeto Vercel conectado ao repositório.
- Framework Preset detectado como Next.js.
- Node.js 24.x, também declarado em `package.json`.
- Deploy Preview para branches e Pull Requests.
- Produção a partir da branch principal.

## Story 1.1

A landing page em `src/web` deve gerar saída estática e não depender de variáveis de ambiente para build. Na Vercel, o Root Directory deve ser configurado como `src/web`. Placeholders devem permitir que o preview seja publicado sem segredos.

O agente de desenvolvimento deve garantir:

- `npm run build` local;
- ausência de warnings de configuração;
- assets em `public`;
- metadados válidos;
- nenhuma URL localhost em código de produção.

## Etapa Sanity

Quando Sanity for conectado:

- cadastrar variáveis separadamente em Development, Preview e Production;
- adicionar domínios de preview/produção aos CORS Origins do Sanity quando credenciais forem necessárias;
- configurar URL do Studio e origem do frontend por ambiente;
- nunca expor `SANITY_API_READ_TOKEN`;
- avaliar revalidação por Sanity Live ou webhook somente na story correspondente.

## Observabilidade

Não adicionar analytics nesta story. Logs de build da Vercel e Core Web Vitals do navegador são suficientes para a primeira entrega. Analytics exige requisito e consentimento explícitos.
