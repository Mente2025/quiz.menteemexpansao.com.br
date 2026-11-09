# Em que fase do término você está? — quiz Eu Me Escolho

Quiz de vendas do **Eu Me Escolho** (Mente em Expansão), feito com
**Next.js 16** (App Router), **React 19**, **Tailwind CSS 4** e TypeScript.
Todas as telas têm fundo branco e são geradas no build.

| Tela                         | Endereço                          |
| ---------------------------- | --------------------------------- |
| Início                       | `/`                               |
| 10 perguntas (uma por tela)  | `/pergunta/1` … `/pergunta/10`    |
| Primeiro nome                | `/nome`                           |
| Resultado A/B/C + oferta     | `/resultado`                      |

Os endereços do quiz antigo (`/etapa-2` … `/etapa-8`) levam ao início.
As respostas e o nome ficam só no navegador do visitante, na aba aberta
(nada é enviado a servidores, ferramentas de análise, URL ou checkout).

## Onde editar

- **Todos os textos** (início, perguntas, pontuação A/B/C, nome, resultados,
  oferta, bônus, botões), **preço** e **link de pagamento (`CHECKOUT_URL`)**:
  `src/config/quizData.ts`
- Regra de pontuação e desempate: `src/lib/scoring.ts` (testes em `tests/`)
- Eventos de análise e Meta Pixel: `src/config/analytics.ts`
- Cores: `src/app/globals.css` · Fontes: `src/config/fonts.ts`
- Endereço do site para compartilhamento: `src/config/brand.ts`
- Imagem de compartilhamento (1200x630): `src/app/opengraph-image.png` e `twitter-image.png`

## Testes

```bash
npm test
```

Roda os testes da pontuação (vitórias de A, B e C e todos os desempates).

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

O projeto já está ligado ao repositório `Mente2025/quiz.menteemexpansao.com.br`.
Cada envio para a branch `main` (pelo GitHub Desktop) publica o site; um envio
para outra branch gera só um link de pré-visualização da Vercel.

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
