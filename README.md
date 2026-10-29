# Oferta prosperidade

Site estático pronto para importar na Vercel.

## Publicar

Importe este repositório na Vercel. Use o diretório raiz do repositório, preset **Other**, sem comando de build. O `vercel.json` define a pasta de saída `public`. Não há instalação de dependências ou variáveis de ambiente obrigatórias.

## Endereços

- `/` e `/2-novo/` abrem o quiz em `/prosperidade/2-novo/`.
- `/offer-novo/` e `/offer/` abrem `/prosperidade/offer-novo/`.
- `/app/` abre a área de entrega em `/prosperidade/app/`.
- Termos, privacidade, reembolso e suporte também estão incluídos.

## Vídeo e checkout

A oferta usa um player HTML5 local, com início silencioso, botão para ouvir desde o começo, controles e tela cheia. O vídeo enviado como `original (1).mp4` está em `public/prosperidade/assets/original/vsl.mp4`. Não há dependência de player externo.

## Pixel

O pixel de TikTok fornecido para o site usa o ID `6ac83c0237d6812b4693df63` e o carregador informado em `https://cdn.utmify.com.br/scripts/pixel/pixel-tiktok.js`. O arquivo compartilhado `public/prosperidade/assets/pixel-tiktok.js` o carrega uma vez por página.

O carregador está nas oito páginas de conteúdo: quiz novo, quiz original, oferta, área de entrega, privacidade, reembolso, suporte e termos. Páginas que apenas redirecionam não o carregam, para evitar contagem duplicada. Não há disparo manual de eventos de compra.

## Checkouts

Os links de checkout ficam em `public/prosperidade/src/config.f69cee476cc7cba0.js` e em `config.js`:

| Oferta | Link |
|---|---|
| $27 | https://go.centerpag.com/PPU38CQG8MB |
| $47 | https://go.centerpag.com/PPU38CQHD3K |
| $77 | https://go.centerpag.com/PPU38CQHD3J |
| $87 | https://go.centerpag.com/PPU38CQHD3M |

## Área de entrega

A área de entrega foi preservada como no pacote: nome e email, progresso salvo no navegador, sem validação de compra ou sincronização entre dispositivos.

## Teste local

Inicie um servidor HTTP na pasta `public` e abra a página inicial. O manifesto SHA256 permite conferir os arquivos publicados.
