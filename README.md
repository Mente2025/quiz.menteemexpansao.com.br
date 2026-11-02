# Por Que Você Vive Histórias Parecidas no Amor? — quiz Eu Me Escolho

Quiz de 8 etapas (`quiz-padroes-no-amor`), feito com **Next.js 16** (App Router),
**React 19**, **Tailwind CSS 4** e TypeScript. Funciona como site estático:
todas as páginas são geradas no build.

| Etapa | Endereço    |
| ----- | ----------- |
| 1     | `/`         |
| 2 – 8 | `/etapa-2` … `/etapa-8` |

As respostas ficam salvas só no navegador do visitante (nada é enviado a
servidores). O botão de compra da etapa 8 leva ao checkout da Cakto.

## Onde editar

- Textos das etapas: `src/config/funnel.ts`
- Reflexões da etapa 5 (uma por resposta da etapa 2): `src/config/results.ts`
- Preço, bônus, presentes, comunidade e **link de pagamento (`CHECKOUT_URL`)**: `src/config/offer.ts`
- Imagens: `public/images/` e `src/config/images.ts`
- Cores: `src/app/globals.css` · Fontes: `src/config/fonts.ts`
- Título, descrição e endereço do site: `src/config/brand.ts`
- Imagem de compartilhamento (1200x630): `src/app/opengraph-image.png` e `twitter-image.png`

## Rodar no computador

```bash
npm install
npm run dev
```

Abra http://localhost:3000. Para testar a versão de produção:

```bash
npm run build
npm run start
```

## Publicar na Vercel

**Pelo GitHub (recomendado: cada alteração publicada atualiza o site sozinha)**

1. Crie um repositório no GitHub chamado `quiz-padroes-no-amor` e envie esta
   pasta para ele (o GitHub Desktop faz isso: *File → Add Local Repository*).
2. Em vercel.com: *Add New → Project → Import* o repositório.
3. A Vercel reconhece o Next.js sozinha. Nome do projeto: `quiz-padroes-no-amor`.
   Não é preciso configurar variáveis. Clique em *Deploy*.

**Pela linha de comando (sem GitHub)**

```bash
npx vercel login
npx vercel --prod
```

## Domínio próprio

1. Na Vercel: *Project → Settings → Domains → Add* e digite o domínio.
2. No site onde o domínio foi comprado (Registro.br, GoDaddy, Hostinger…),
   crie os registros DNS que a Vercel mostrar nessa tela.
3. Opcional: em *Settings → Environment Variables*, crie `NEXT_PUBLIC_SITE_URL`
   com o endereço final (ex.: `https://seudominio.com.br`) e faça um novo deploy.
