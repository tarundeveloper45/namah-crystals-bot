# Namah Crystals — AI Backend Setup (Vercel)

This is the small secure server that powers full AI chat. It keeps your API
key SECRET so it never appears on your public website.

Follow these steps once. Takes about 20–30 minutes.

────────────────────────────────────────────────────────
STEP 1 — Get your Anthropic API key
────────────────────────────────────────────────────────
1. Go to https://console.anthropic.com
2. Sign up / log in.
3. Go to "Billing" and add a small amount of credit (e.g. $5 to start).
4. Go to "API Keys" → "Create Key" → copy the key (starts with sk-ant-...).
   KEEP IT PRIVATE. Don't paste it into any public file.

────────────────────────────────────────────────────────
STEP 2 — Put this backend on GitHub
────────────────────────────────────────────────────────
1. On github.com click + → New repository.
2. Name it: namah-crystals-backend → Create.
3. Click "uploading an existing file".
4. Upload BOTH:
      - the "api" folder (containing chat.js)
      - package.json
   (Tip: drag the whole "namah-backend" folder contents in. Make sure the
    file path shows as  api/chat.js )
5. Commit changes.

────────────────────────────────────────────────────────
STEP 3 — Deploy on Vercel
────────────────────────────────────────────────────────
1. Go to https://vercel.com → "Sign up" → "Continue with GitHub".
2. Click "Add New… → Project".
3. Find "namah-crystals-backend" in the list → "Import".
4. BEFORE clicking Deploy, open "Environment Variables" and add:
       Name:  ANTHROPIC_API_KEY
       Value: (paste your sk-ant-... key here)
   Click "Add".
5. Click "Deploy". Wait ~1 minute.
6. When done, your backend URL is:
       https://namah-crystals-backend.vercel.app/api/chat
   (Vercel shows the base URL; just add  /api/chat  at the end.)

────────────────────────────────────────────────────────
STEP 4 — Connect your chatbot to the backend
────────────────────────────────────────────────────────
1. Open your index.html (in the namah-crystals-bot repo).
2. Find this line near the top of the <script>:
       const BACKEND_URL = "";
3. Put your URL inside the quotes:
       const BACKEND_URL = "https://namah-crystals-backend.vercel.app/api/chat";
4. Commit changes.
5. Wait ~1 minute, refresh your bot page.

DONE. The bot now answers ANYTHING using real AI. 🎉
Demo mode stays as an automatic backup if the backend is ever unreachable.

────────────────────────────────────────────────────────
COST (so there are no surprises)
────────────────────────────────────────────────────────
- Vercel hosting: FREE for this usage.
- Anthropic: pay-as-you-go. Each chat reply costs a fraction of a cent.
  Roughly, $5 of credit handles a large number of customer chats.
- You can set a monthly spend limit in the Anthropic console.

Questions? support@namahcrystals.com
