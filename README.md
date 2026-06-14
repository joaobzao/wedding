# João & Sofia — 10.10.2026 💍

Site do casamento: cerimónia na **Igreja de São José das Taipas** (Porto, 14h00) e festa na **Casa das Tílias** (Maia).

Site estático — sem dependências nem build. HTML + CSS + JavaScript puro.

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

## Fotografias (bandas ao longo da página)

As três fotos do casal aparecem como **bandas de largura total** entre secções (`.photoband`). Os ficheiros estão em `img/`:

| Ficheiro | Onde aparece | Legenda |
| --- | --- | --- |
| `img/momento-beijo.jpg` | depois da contagem decrescente | "E no meio do caminho, encontrámo-nos." |
| `img/momento-fuji.jpg` | antes da Lua de Mel | "Cada lugar é melhor ao teu lado." |
| `img/momento-neve.jpg` | antes do RSVP | "Juntos, em qualquer aventura." |

- **Trocar uma foto:** substituir o ficheiro em `img/` (manter o nome) ou editar o `background-image` em `css/styles.css` (`.photoband--beijo/--fuji/--neve`).
- **Enquadramento:** ajustar o `background-position` de cada banda em `css/styles.css` se quiser subir/descer o recorte.
- **Legendas:** editar o texto `.photoband__quote` em `index.html`.
- As imagens foram reduzidas para 1600px de largura para carregarem depressa; os originais ficam intactos.

## Dados para a prenda (Lua de Mel) ⚠️

A secção `#luademel` tem **valores de exemplo** para o IBAN e o MB WAY. **Antes de publicar**, em `index.html` (procurar o comentário `TODO`), substituir:

- `PT50 0000 0000 0000 0000 0000 0` pelo vosso IBAN real;
- `912 345 678` pelo número de telemóvel associado ao MB WAY.

Para remover um dos métodos, basta apagar o respetivo bloco `<div class="gift__method">`.

## Editar conteúdos

- **Programa do dia:** secção `#programa` do `index.html` — os horários (13h30, 14h00, …) são sugestões, editar à vontade.
- **Itinerário da lua de mel:** secção `#luademel` — cada paragem é um `<li class="route__stop">`.
- **Data limite do RSVP:** procurar "10 de Setembro de 2026" no `index.html`.
- **Cores e fontes:** variáveis CSS no topo de `css/styles.css`.
- **Contagem decrescente:** data em `js/script.js` (`WEDDING_DATE`).

## Publicar (grátis)

- **GitHub Pages:** push para o GitHub → Settings → Pages → branch `main`, pasta `/`.
- **Netlify:** arrastar a pasta do projeto para [app.netlify.com/drop](https://app.netlify.com/drop).
