# João & Sofia — 10.10.2026 💍

Site do casamento: cerimónia na **Igreja de São José das Taipas** (Porto, 14h00) e festa na **Casa das Tílias** (Maia).

Site estático — sem dependências nem build. HTML + CSS + JavaScript puro.

## Como funciona (ecrã único, sem scroll)

O convite ocupa **um único ecrã que não desliza**. O conteúdo mais extenso abre em **sobreposições** (modais) por cima, sem fazer a página deslizar:

- **Programa** → botão "Programa" (abre `#programa`)
- **Lua de Mel** (itinerário + prenda) → botão "Lua de Mel" (abre `#luademel`)
- **RSVP** → botão "Confirmar presença" (abre `#rsvp`)

As sobreposições são controladas pelo `#` do endereço, por isso o botão "voltar" fecha-as e é possível partilhar uma ligação direta (ex.: `…/index.html#rsvp`). Fecham com o ✕, clicando fora, ou com a tecla `Esc`. Se o conteúdo de uma sobreposição for maior que o ecrã, é essa janela que desliza por dentro — a página continua fixa.

## Pré-visualizar localmente

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

(Ou simplesmente abrir `index.html` no browser.)

## Ativar o formulário RSVP (2 minutos)

O formulário usa o [Formspree](https://formspree.io) (plano gratuito chega):

1. Criar conta em formspree.io e criar um novo formulário.
2. Copiar o ID do formulário (algo como `xpzgkqwe`).
3. Em `index.html`, substituir `SEU_ID` na linha:
   ```html
   <form class="form" action="https://formspree.io/f/SEU_ID" method="POST">
   ```
4. As respostas chegam por email e ficam no painel do Formspree.

**Alternativa sem Formspree:** trocar o `action` por `mailto:jmmbzao@gmail.com` e `method` por `get` — abre o cliente de email do convidado (menos fiável, mas funciona sem serviços externos).

## Fotografias (crossfade no convite)

As três fotos do casal alternam em **crossfade** — na coluna esquerda em ecrã grande, e como fundo de ecrã inteiro (com véu marfim) no telemóvel. Os ficheiros estão em `img/`: `momento-beijo.jpg`, `momento-fuji.jpg`, `momento-neve.jpg`.

- **Trocar uma foto:** substituir o ficheiro em `img/` (manter o nome) ou editar o `background-image` em `css/styles.css` (`.invite__photo--1/--2/--3`).
- **Enquadramento:** ajustar o `background-position` de cada foto em `css/styles.css`.
- **Ritmo do crossfade:** a animação `photoFade` em `css/styles.css` (24s, 3 fotos).
- As imagens foram reduzidas para 1600px de largura para carregarem depressa; os originais ficam intactos.

## Dados para a prenda (Lua de Mel) ⚠️

A secção `#luademel` tem **valores de exemplo** para o IBAN e o MB WAY. **Antes de publicar**, em `index.html` (procurar o comentário `TODO`), substituir:

- `PT50 0000 0000 0000 0000 0000 0` pelo vosso IBAN real;
- `912 345 678` pelo número de telemóvel associado ao MB WAY.

Para remover um dos métodos, basta apagar o respetivo bloco `<div class="gift__method">`.

## Editar conteúdos

- **Programa do dia:** sobreposição `#programa` do `index.html` — os horários (13h30, 14h00, …) são sugestões, editar à vontade.
- **Itinerário da lua de mel:** sobreposição `#luademel` — cada paragem é um `<li class="route__stop">`.
- **Data limite do RSVP:** procurar "10 de Setembro de 2026" no `index.html`.
- **Cores e fontes:** variáveis CSS no topo de `css/styles.css`.
- **Contagem decrescente:** data em `js/script.js` (`WEDDING_DATE`).

## Publicar (grátis)

- **GitHub Pages:** push para o GitHub → Settings → Pages → branch `main`, pasta `/`.
- **Netlify:** arrastar a pasta do projeto para [app.netlify.com/drop](https://app.netlify.com/drop).
