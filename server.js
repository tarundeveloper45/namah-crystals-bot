/* ============================================================
   NAMAH CRYSTALS — Chat backend (Google Gemini, FREE tier)
   Keeps your Gemini API key server-side (NEVER in the theme).

   Setup:
     npm init -y
     npm pkg set type=module
     npm install express cors
     # set your key as an environment variable (do NOT hardcode it):
     #   macOS/Linux:  export GEMINI_API_KEY=your_new_key
     #   Windows PS :  $env:GEMINI_API_KEY="your_new_key"
     node server.js

   Free model: gemini-2.0-flash (Google AI free tier, no card needed).
   If the free quota is exhausted or the call fails, the built-in
   rule-based responder answers from the Namah Crystals knowledge base,
   so the bot NEVER goes silent.
============================================================ */
import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ origin: ["https://namahcrystals.com", "https://www.namahcrystals.com"] }));
app.use(express.json({ limit: "200kb" }));

const GEMINI_KEY = process.env.GEMINI_API_KEY;          // <-- read from env, never written in code
const MODEL = "gemini-2.0-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

/* --------------------------- KNOWLEDGE BASE --------------------------- */
const KB = {
  email: "support@namahcrystals.com",
  phone: "+91 95674 86748",
  address: "Block B3, Janakpuri, Delhi, 110058",
  price: "\u20B98,100",
  links: {
    find: "https://namahcrystals.com/pages/check-your-bracelets",
    all: "https://namahcrystals.com/collections/all",
    best: "https://namahcrystals.com/collections/best-sellers",
    newr: "https://namahcrystals.com/collections/new-releases",
    women: "https://namahcrystals.com/collections/women",
    men: "https://namahcrystals.com/collections/men",
    shipping: "https://namahcrystals.com/pages/%F0%9F%93%A6-shipping-policy",
    returns: "https://namahcrystals.com/pages/return-exchange-policy",
    privacy: "https://namahcrystals.com/pages/privacy-policy",
    terms: "https://namahcrystals.com/pages/terms-conditions",
  },
  purposes: {
    money: { label: "Money & Abundance", url: "https://namahcrystals.com/collections/money", crystals: ["Citrine", "Pyrite", "Golden Rutile"] },
    love: { label: "Love & Relationships", url: "https://namahcrystals.com/collections/relationships", crystals: ["Rose Quartz", "Garnet", "Rhodonite"] },
    career: { label: "Career & Success", url: "https://namahcrystals.com/collections/career", crystals: ["Tiger Eye", "Citrine", "Lapis Lazuli"] },
    health: { label: "Health & Vitality", url: "https://namahcrystals.com/collections/health", crystals: ["Bloodstone", "Amazonite", "Selenite"] },
    protection: { label: "Protection / Evil Eye", url: "https://namahcrystals.com/collections/evil-eye", crystals: ["Black Tourmaline", "Black Rutilated Quartz", "Black Obsidian"] },
    mental: { label: "Mental Wellness", url: "https://namahcrystals.com/collections/anxiety-overthinking", crystals: ["Amethyst", "Lithium Quartz", "Lepidolite"] },
    confidence: { label: "Confidence", url: "https://namahcrystals.com/collections/all", crystals: ["Carnelian", "Tiger Eye", "Sunstone"] },
    spiritual: { label: "Spiritual Growth", url: "https://namahcrystals.com/collections/all", crystals: ["Amethyst", "Selenite", "Labradorite"] },
  },
  crystals: {
    citrine: "Traditionally linked to wealth, abundance and manifesting prosperity; the merchant's stone.",
    pyrite: "Believed to attract money, abundance and willpower; tied to confidence and ambition.",
    "lapis lazuli": "Traditionally tied to wisdom, truth, communication and career growth.",
    "tiger eye": "Believed to support courage, focus, confidence and grounded decisions.",
    amethyst: "Associated with calm, intuition, sleep and relief from overthinking.",
    "rose quartz": "The classic love stone \u2014 believed to open the heart to self-love and relationships.",
    selenite: "Used to cleanse and clear stagnant or negative energy from a space or other crystals.",
    "black tourmaline": "A protective, grounding stone traditionally said to ward off negative energy.",
    carnelian: "Associated with motivation, vitality, confidence and creativity.",
    labradorite: "The stone of transformation and intuition; tied to spiritual awareness.",
    garnet: "Traditionally linked to passion, energy and emotional warmth.",
  },
  mulank: {
    1: { ruler: "Sun", combo: "Red Carnelian + Pyrite + Tiger Eye", benefit: "Leadership, confidence and willpower." },
    2: { ruler: "Moon", combo: "Moonstone + White Agate + Amethyst", benefit: "Emotional balance, calm and intuition." },
    3: { ruler: "Jupiter", combo: "Citrine + Yellow Agate + Lapis Lazuli", benefit: "Wisdom, learning, abundance and growth." },
    4: { ruler: "Rahu", combo: "Garnet + Black Rutilated Quartz + Amethyst", benefit: "Stability, protection and clarity." },
    5: { ruler: "Mercury", combo: "Green Aventurine + Agate + Tiger Eye", benefit: "Communication, business sense and adaptability." },
    6: { ruler: "Venus", combo: "Rose Quartz + Clear Quartz + Green Aventurine", benefit: "Love, harmony, beauty and comfort." },
    7: { ruler: "Ketu", combo: "Labradorite + Amethyst + Selenite", benefit: "Intuition, spirituality and inner depth." },
    8: { ruler: "Saturn", combo: "Black Tourmaline + Lapis Lazuli + Pyrite", benefit: "Discipline, protection and long-term success." },
    9: { ruler: "Mars", combo: "Garnet + Carnelian + Black Rutilated Quartz", benefit: "Energy, courage and protection." },
  },
  policies: {
    shipping: "Orders ship in 5\u20137 business days (up to ~4 days during promotions). India: India Post/courier, 3\u20137 business days. International: DHL ~10\u201315 business days, with customs duties/taxes paid by the recipient. Tracking is emailed at dispatch. Pre-orders take ~15\u201320 days.",
    returns: "Bracelets are non-returnable and non-refundable once delivered. Exchange is offered ONLY for an item received broken, within 7 days of delivery, with an unboxing video showing the sealed package opened. Same design/size/material only, once per order. Not covered: wear & tear, water exposure, mishandling, change of mind, or wrong size.",
    breakage: "A bracelet breaking is traditionally seen as the crystal having completed its energetic purpose \u2014 not a defect. Worn-and-broken items aren't eligible; only items broken on arrival qualify, with an unboxing video.",
    freebie: "Complimentary freebies are per ORDER, not per item: each order includes one Selenite Plate and one Ganesha Ji.",
    beads: "Beads are handcrafted natural crystal so sizes vary. Small: 5\u20138mm. Large: 8\u201311mm.",
    metal: "Charms use 18K real gold plating over brass.",
    cert: "Crystals are natural and untreated and are NOT lab-certified \u2014 by choice, for transparency.",
    order: "Live tracking is coming soon; for now tracking is emailed at dispatch. For order status, share your order number with support.",
  },
};

/* --------------------------- SYSTEM PROMPT --------------------------- */
const SYSTEM = `You are "Tara", the AI support and sales assistant for Namah Crystals World (https://namahcrystals.com), a premium crystal-bracelet brand on Shopify.

PERSONALITY: friendly, professional, warm, helpful. Spiritual but grounded, never overly mystical. Keep replies to 2-5 short sentences, an occasional sparkle, and always steer toward a relevant product or resolving the issue.

HARD RULES:
1. NEVER guarantee crystal results, cures, or outcomes.
2. ALWAYS frame benefits as based on TRADITIONAL BELIEFS (not medical/financial advice).
3. If unsure, do NOT invent - direct to ${KB.email} or ${KB.phone}.
4. Always try to recommend a relevant product or collection with a link.
5. Standard bracelet price ${KB.price}.

LINKS: Find Your Bracelet ${KB.links.find} | Money ${KB.purposes.money.url} | Love ${KB.purposes.love.url} | Career ${KB.purposes.career.url} | Health ${KB.purposes.health.url} | Protection ${KB.purposes.protection.url} | Mental wellness ${KB.purposes.mental.url} | Best sellers ${KB.links.best} | New ${KB.links.newr} | For Her ${KB.links.women} | For Him ${KB.links.men}.

SHIPPING: ${KB.policies.shipping}
RETURNS: ${KB.policies.returns}
BREAKAGE: ${KB.policies.breakage}
FREEBIE: ${KB.policies.freebie}  BEADS: ${KB.policies.beads}  METAL: ${KB.policies.metal}  CERTIFICATION: ${KB.policies.cert}
ORDER STATUS: ${KB.policies.order}
Contact: ${KB.email} | ${KB.phone} | ${KB.address}

MULANK (single-digit root of the birth DAY):
${Object.entries(KB.mulank).map(([k, v]) => `${k} (${v.ruler}): ${v.combo} - ${v.benefit}`).join("\n")}
Always invite the customer to confirm & buy via the Find Your Bracelet page.

GOAL: increase sales, give great support, and provide personalised numerology-based recommendations.`;

/* ------------------ RULE-BASED FALLBACK (always free) ------------------ */
function calcMulank(day) {
  let n = parseInt(day, 10);
  if (isNaN(n) || n < 1 || n > 31) return null;
  while (n > 9) n = String(n).split("").reduce((a, b) => a + +b, 0);
  return n === 0 ? 9 : n;
}
function fallbackReply(text) {
  const t = (text || "").toLowerCase();
  const L = (u, label) => `[${label}](${u})`;
  const dob = text.match(/(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/);
  if (dob || t.includes("mulank") || t.includes("numerolog") || t.includes("birth")) {
    if (dob) {
      const m = calcMulank(dob[1]); const r = KB.mulank[m];
      return `Your Mulank is **${m}** (ruler: ${r.ruler}) \u2728\n\nTraditional combination: **${r.combo}**\n_${r.benefit}_\n\nConfirm & buy your match: ${L(KB.links.find, "Find Your Bracelet")}. (Benefits are based on traditional beliefs.)`;
    }
    return "I'd love to suggest your numerology bracelet \u2728 What's your date of birth (DD-MM-YYYY)? Or use our finder: " + L(KB.links.find, "Find Your Bracelet") + ".";
  }
  for (const [k, p] of Object.entries(KB.purposes)) {
    if (t.includes(k) || t.includes(p.label.toLowerCase().split(" ")[0])) {
      return `For **${p.label}**, customers traditionally choose ${p.crystals.join(", ")}. \u2728\n\nBrowse: ${L(p.url, p.label)}. Bracelets are ${KB.price}. Want a numerology match too? Share your date of birth. (Based on traditional beliefs.)`;
    }
  }
  if (t.includes("ship") || t.includes("deliver")) return KB.policies.shipping + `\n\n${L(KB.links.shipping, "Shipping Policy")}.`;
  if (t.includes("return") || t.includes("refund") || t.includes("exchange")) return KB.policies.returns + `\n\n${L(KB.links.returns, "Return & Exchange Policy")}.`;
  if (t.includes("broke") || t.includes("break")) return KB.policies.breakage + `\n\nReceived it broken? Record an unboxing video and contact ${KB.phone} / ${KB.email}.`;
  if (t.includes("free") || t.includes("gift")) return KB.policies.freebie;
  if (t.includes("bead") || t.includes("size")) return KB.policies.beads;
  if (t.includes("certif")) return KB.policies.cert;
  if (t.includes("metal") || t.includes("gold")) return KB.policies.metal;
  if (t.includes("order") || t.includes("track") || t.includes("status")) return KB.policies.order;
  if (t.includes("privacy")) return `Read our Privacy Policy: ${L(KB.links.privacy, "Privacy Policy")}.`;
  if (t.includes("terms")) return `Our Terms & Conditions: ${L(KB.links.terms, "Terms & Conditions")}.`;
  if (t.includes("price") || t.includes("cost") || t.includes("how much")) return `Most bracelets are ${KB.price}. Browse: ${L(KB.links.all, "Shop all")}.`;
  for (const [name, meaning] of Object.entries(KB.crystals)) {
    if (t.includes(name)) return `**${name.replace(/\b\w/g, (c) => c.toUpperCase())}** - ${meaning}\n\nShop bracelets: ${L(KB.links.all, "View all")}. (Based on traditional beliefs.)`;
  }
  if (t.includes("contact") || t.includes("help") || t.includes("support") || t.includes("phone") || t.includes("email")) return `Reach our team at \uD83D\uDCE7 ${KB.email} or \uD83D\uDCF1 ${KB.phone}.\n${KB.address}`;
  if (t.length < 5 || t.includes("hi") || t.includes("hello") || t.includes("namaste")) return "Namaste \uD83D\uDE4F I'm Tara from Namah Crystals. I can match you a bracelet by goal - money, love, career, health, protection, calm - or by numerology (Mulank). What can I help you find? \u2728";
  return `I want to get this right for you. You can ask about crystal meanings, recommendations, shipping, or returns - or share your date of birth for a numerology match. For order-specific help: ${KB.email} / ${KB.phone}.`;
}

/* ----------------------------- GEMINI CALL ----------------------------- */
async function callGemini(messages) {
  // Gemini wants alternating user/model "contents" and a separate system instruction.
  const contents = messages.slice(-20).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM }] },
      contents,
      generationConfig: { maxOutputTokens: 600, temperature: 0.7 },
    }),
  });
  if (!res.ok) throw new Error("Gemini HTTP " + res.status);
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("").trim();
  if (!text) throw new Error("Empty Gemini response");
  return text;
}

/* ------------------------------- ROUTES -------------------------------- */
app.post("/chat", async (req, res) => {
  const messages = req.body.messages || [];
  const last = messages[messages.length - 1]?.content || "";
  try {
    if (!GEMINI_KEY) throw new Error("No key set");
    const reply = await callGemini(messages);
    res.json({ reply, source: "gemini" });
  } catch (e) {
    console.warn("Gemini failed, using fallback:", e.message);
    res.json({ reply: fallbackReply(last), source: "fallback" });
  }
});

app.get("/", (_req, res) => res.send("Namah Crystals chat backend OK"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Namah chat backend (Gemini) on :" + PORT));
