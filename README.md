# Namah Crystals World — AI Crystal Guide

A chat widget for namahcrystals.com that recommends crystal bracelets,
answers FAQs, and finds a customer's bracelet by their date of birth (Mulank).

## ✅ Fix the 404 (make the page show) — do this now

Your GitHub Pages was showing **404** because there was no `index.html`.
This `index.html` fixes that.

1. Go to your repo: `github.com/tarundeveloper45/namah-crystals-bot`
2. Click **Add file → Upload files**
3. Upload **`index.html`** (this file's companion)
4. Click **Commit changes**
5. Wait ~1 minute, then open:
   `https://tarundeveloper45.github.io/namah-crystals-bot/`

The purple bot will now appear and work in **DEMO MODE** — it answers
from built-in knowledge (Mulank finder + main crystals). No API key needed.

## 🤖 Turn on the real AI (optional, needs a backend)

Demo mode uses simple built-in answers. For full natural AI conversation,
deploy a tiny backend that safely holds your API key, then paste its URL
into `index.html` at the line:

```js
const BACKEND_URL = ""; // put your backend URL here
```

The backend is required because your API key must NEVER be placed in this
public file. A developer can deploy one free on Vercel in ~1 hour.

## 🛍️ Add it to your Shopify store

Once the page works, to put it on namahcrystals.com:
- Shopify Admin → Online Store → Themes → Edit code → `theme.liquid`
- Paste an embed/iframe snippet before `</body>` → Save

(Ask your developer for the embed snippet, or use the Chatty app for a
no-code alternative.)

## Mulank → Bracelet map

| Mulank | Bracelet | Link |
|--------|----------|------|
| 1 | Golden Rutile | /products/golden-rutile |
| 2 | Selenite | /products/selenite |
| 3 | Citrine | /products/citrine |
| 4 | Tiger Eye | /products/tiger-eye |
| 5 | Labradorite | /products/labradorite-female |
| 6 | Black Rutilated Quartz | /products/black-rutilated |
| 7 | Green Cat's Eye | /products/green-cat-s-eye |
| 8 | Lapis Lazuli | /products/lapis-lazuli |
| 9 | Carnelian | /products/carnelian |
