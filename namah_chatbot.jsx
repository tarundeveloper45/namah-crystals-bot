import React, { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────────────────────
// NAMAH CRYSTALS — AI Concierge
// A self-contained chat widget powered by the Anthropic API.
// Product knowledge below is derived from namahcrystals.com.
// ─────────────────────────────────────────────────────────────

const STORE_KNOWLEDGE = `
You are the warm, intuitive AI concierge for Namah Crystals World
(namahcrystals.com), a premium crystal & gemstone jewelry brand based in
Janakpuri, Delhi. You help visitors find the right crystal bracelet for their
intentions, answer questions, and gently guide them toward a purchase.

BRAND VOICE: warm, calm, a little mystical, never pushy. You believe crystals
are "living energies of the universe." Keep replies concise (2-4 short
sentences) and friendly. Use the customer's stated intention to recommend.
Always speak in INR (₹). If you don't know something specific (exact stock,
order status), direct them to support@namahcrystals.com.

PRODUCT RANGE: Premium faceted crystal bead bracelets, most priced ₹8,100.
Each design comes in a Female and a Male variant. Palm stones also available.

SHOP BY PURPOSE (collections):
- MONEY / WEALTH → Citrine, Golden Rutile, Lapis Lazuli
- CAREER & CLARITY → Lapis Lazuli, Citrine
- EVIL EYE / PROTECTION → Black Rutilated Quartz / Tourmaline Quartz, Lapis Lazuli
- ABUNDANCE & MANIFESTATION → Citrine, Lapis Lazuli
- GROUNDING & RESILIENCE → Black Rutilated Quartz

═══════════════════════════════════════════════
MULANK (DATE OF BIRTH) BRACELET FINDER
═══════════════════════════════════════════════
If a customer asks for a bracelet based on their date of birth, birthday, or
"mulank", recommend by their MULANK (numerology root number).

HOW TO CALCULATE THE MULANK:
- Use ONLY the day of the month they were born (ignore month and year).
- Add the digits of that day together and reduce to a single digit (1–9).
- Examples: born on the 5th → Mulank 5. Born on the 23rd → 2+3 = 5 → Mulank 5.
  Born on the 18th → 1+8 = 9 → Mulank 9. Born on the 29th → 2+9 = 11 → 1+1 = 2 → Mulank 2.
- If they give a full date like 23-11-1990, still use only the day "23".

MULANK → BRACELET:
- Mulank 1 → Golden Rutile Bracelet (manifestation, energy & prosperity) — https://namahcrystals.com/products/golden-rutile
- Mulank 2 → Selenite Bracelet (calm, cleansing & mental clarity) — https://namahcrystals.com/products/selenite
- Mulank 3 → Citrine Bracelet (abundance, joy & confidence) — https://namahcrystals.com/products/citrine
- Mulank 4 → Tiger Eye Bracelet (grounding, courage & protection) — https://namahcrystals.com/products/tiger-eye
- Mulank 5 → Labradorite Bracelet (transformation, intuition & protection) — https://namahcrystals.com/products/labradorite-female
- Mulank 6 → Black Rutilated Quartz Bracelet (protection from negativity) — https://namahcrystals.com/products/black-rutilated
- Mulank 7 → Green Cat's Eye Bracelet (luck & protection) — https://namahcrystals.com/products/green-cat-s-eye
- Mulank 8 → Lapis Lazuli Bracelet (wisdom, truth & abundance) — https://namahcrystals.com/products/lapis-lazuli
- Mulank 9 → Carnelian Bracelet (energy, passion & motivation) — https://namahcrystals.com/products/carnelian

WHEN A DOB IS GIVEN: state their Mulank number, name their bracelet, give the
one-line benefit, and SHARE THE PRODUCT LINK above so they can view/buy it.
Also mention the official finder for accuracy:
https://namahcrystals.com/pages/check-your-bracelets
If they haven't given a date yet, warmly ask for their date of birth.

═══════════════════════════════════════════════
DETAILED PRODUCT CATALOG (use this exact content)
═══════════════════════════════════════════════

▶ BLUE LAPIS LAZULI — ₹8,100 (Female & Male variants)
Description: Blue Lapis Lazuli, deep blue with whispers of gold, is a timeless
symbol of wisdom, intuition, and sacred luck. Once treasured by ancient royalty
and mystics, it opens the mind to higher knowledge while grounding you in truth.
This powerful stone awakens inner vision, helping you hear the quiet voice of
your soul and make choices with clarity and strength. Its vibrant energy invites
mental clarity and cosmic guidance, drawing abundance not just in wealth but in
purpose. Lapis Lazuli reminds you that true power lies in knowing yourself.
Affirmation: "I am wise and wealthy. Let your wisdom light the way to abundance."
Specs:
- Natural Lapis Lazuli faceted beads (8–11 mm)
- 18k gold-plated brass Evil Eye charm, handcrafted
- 6.5–7 inches (standard size; email preferred custom size after ordering)
- Deep blue faceted Lapis Lazuli with gold charm
Note: The infinity lock previously shown on the female Lapis bracelet has been
discontinued based on feedback; you may receive a different, more user-friendly
everyday lock.

▶ BLACK RUTILATED QUARTZ / TOURMALINE QUARTZ — ₹8,100 (Female & Male variants)
Description: A powerful stone of protection, grounding, and transformation. It
shields you from negativity and toxic energy, helping you stay clear, resilient,
and empowered through change.
Affirmation: "I am protected, clear, and resilient. Let Black Rutilated Quartz /
Tourmaline Quartz be the shield that empowers your transformation."
Specs:
- Natural faceted beads, 7–9 mm
- Evil Eye charm
- 6.5–8 inches (standard size; email preferred custom size after ordering)

▶ CITRINE — ₹8,100 (Female & Male variants)
Description: Citrine glows like captured sunlight, a radiant symbol of abundance,
joy, and boundless energy. Known as the "merchant's stone," it inspires
manifestation and prosperity, helping dreams take shape with clarity and
confidence. Its warm golden hue uplifts the spirit, dissolving doubt and inviting
positive transformation. Citrine doesn't just sparkle—it empowers, reminding you
that the universe responds to your light. With every intention you set, it
amplifies your inner brilliance and attracts what you truly desire.
Affirmation: "I attract abundance and radiate positivity. Own your glow. The
world is listening."
Specs:
- Natural faceted beads, 6–8 mm
- Lotus charm
- 6.5–8 inches (standard size; email preferred custom size after ordering)

═══════════════════════════════════════════════
COMPLIMENTARY GIFT (with EVERY purchase)
═══════════════════════════════════════════════
Every Namah Crystals purchase includes a complimentary Selenite cleansing plate
and a Labradorite Ganesha idol, beautifully packed in a luxury box.
- Place the Ganesha on your bedside table to invite protection, intuition, and
  divine blessings.
- Each night, remove your bracelet and keep it on the Selenite plate to cleanse
  the day's negativity and toxicity—waking up with refreshed, purified energy.
This is also the answer to "how do I cleanse my bracelet?"

SERVICES:
- "Find / Check Your Bracelet" tool on the site to verify authenticity.
- Worldwide shipping (multi-currency: INR, USD, EUR, GBP, AUD, etc).
- Custom sizes: email your preferred bracelet size after placing the order.
- Policies: Shipping, Returns & Exchange, Privacy — all on the website footer.
- Contact: support@namahcrystals.com · Block B3, Janakpuri, Delhi 110058.

WHEN RECOMMENDING: name the crystal, say why it fits the intention (use its
description), share its affirmation when nice, mention the ₹8,100 price and that
male & female variants exist, and note the free Selenite plate + Labradorite
Ganesha gift. Invite them to view it on the site. Never invent products or
details not listed above.
`;

const QUICK_PROMPTS = [
  "Find my bracelet by date of birth 🎂",
  "Tell me about Blue Lapis Lazuli 💙",
  "I want abundance — show me Citrine ☀️",
  "How do I cleanse my bracelet?",
  "What's included with my order? 🎁",
];

const SUGGESTIONS_AFTER = [
  "What's the price?",
  "Is there a male variant?",
  "What size is the bracelet?",
  "What's the affirmation?",
];

export default function NamahChatbot() {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Namaste 🙏 Welcome to Namah Crystals World. Tell me your date of birth and I'll find your perfect Mulank bracelet — or ask me about any crystal you're drawn to. ✨",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage(text) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    setShowQuick(false);
    const newMessages = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: STORE_KNOWLEDGE,
          messages: apiMessages,
        }),
      });

      const data = await response.json();
      const reply = data.content
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            reply ||
            "I'm having a little trouble channeling that right now. Please try again, or reach us at support@namahcrystals.com.",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "My connection to the cosmos wavered ✨ Please try again in a moment, or email support@namahcrystals.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "radial-gradient(circle at 20% 10%, #2a1b4a 0%, #150d2e 40%, #0b0719 100%)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        padding: "24px",
        boxSizing: "border-box",
        fontFamily: "'Outfit', system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Outfit:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* faint starfield */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
        {[...Array(40)].map((_, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              top: `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
              width: i % 5 === 0 ? 3 : 1.5,
              height: i % 5 === 0 ? 3 : 1.5,
              borderRadius: "50%",
              background: "#e9d8a6",
              opacity: 0.4 + ((i * 7) % 6) / 12,
              boxShadow: "0 0 6px #e9d8a6",
            }}
          />
        ))}
      </div>

      {/* Launcher button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            border: "1px solid rgba(233,216,166,0.5)",
            background:
              "linear-gradient(135deg, #6d4aff 0%, #2a1b4a 100%)",
            color: "#e9d8a6",
            fontSize: 28,
            cursor: "pointer",
            boxShadow: "0 8px 30px rgba(109,74,255,0.5)",
            zIndex: 10,
          }}
          aria-label="Open chat"
        >
          ✦
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          style={{
            width: "100%",
            maxWidth: 400,
            height: 620,
            maxHeight: "90vh",
            background: "rgba(17, 11, 38, 0.92)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(233,216,166,0.25)",
            borderRadius: 24,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03) inset",
            zIndex: 10,
            position: "relative",
          }}
        >
          {/* Brand heading */}
          <div
            style={{
              textAlign: "center",
              padding: "12px 16px 8px",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 4,
              color: "#e9d8a6",
              textTransform: "uppercase",
              background:
                "linear-gradient(180deg, rgba(109,74,255,0.28), transparent)",
              borderBottom: "1px solid rgba(233,216,166,0.1)",
              textShadow: "0 0 14px rgba(233,216,166,0.4)",
            }}
          >
            ✦ Namah Crystals World ✦
          </div>

          {/* Header */}
          <div
            style={{
              padding: "18px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              borderBottom: "1px solid rgba(233,216,166,0.15)",
              background:
                "linear-gradient(180deg, rgba(109,74,255,0.22), transparent)",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 30%, #b79bff, #4a2fb0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                boxShadow: "0 0 18px rgba(183,155,255,0.6)",
              }}
            >
              ✦
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 21,
                  fontWeight: 600,
                  color: "#f3e9c9",
                  lineHeight: 1.1,
                  letterSpacing: 0.4,
                }}
              >
                Namah Crystals · Crystal Guide
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  color: "#9b86d8",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  marginTop: 2,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#6ee7a0",
                    display: "inline-block",
                    boxShadow: "0 0 6px #6ee7a0",
                  }}
                />
                Your crystal guide · online
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#9b86d8",
                fontSize: 22,
                cursor: "pointer",
                lineHeight: 1,
              }}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "18px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf:
                    m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                }}
              >
                <div
                  style={{
                    padding: "11px 15px",
                    borderRadius:
                      m.role === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    fontSize: 14.5,
                    lineHeight: 1.5,
                    whiteSpace: "pre-wrap",
                    color: m.role === "user" ? "#150d2e" : "#ece6f7",
                    background:
                      m.role === "user"
                        ? "linear-gradient(135deg, #e9d8a6, #d4bd7a)"
                        : "rgba(109,74,255,0.16)",
                    border:
                      m.role === "user"
                        ? "none"
                        : "1px solid rgba(183,155,255,0.22)",
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ alignSelf: "flex-start" }}>
                <div
                  style={{
                    padding: "13px 16px",
                    borderRadius: "16px 16px 16px 4px",
                    background: "rgba(109,74,255,0.16)",
                    border: "1px solid rgba(183,155,255,0.22)",
                    display: "flex",
                    gap: 5,
                  }}
                >
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "#b79bff",
                        animation: `pulse 1.2s ${d * 0.2}s infinite ease-in-out`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quick prompts */}
            {showQuick && !loading && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 7,
                  marginTop: 4,
                }}
              >
                {QUICK_PROMPTS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    style={chipStyle}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Follow-up suggestions */}
            {!showQuick &&
              !loading &&
              messages.length > 1 &&
              messages[messages.length - 1].role === "assistant" && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 7,
                    marginTop: 2,
                  }}
                >
                  {SUGGESTIONS_AFTER.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      style={chipStyle}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
          </div>

          {/* Input */}
          <div
            style={{
              padding: "14px 16px",
              borderTop: "1px solid rgba(233,216,166,0.15)",
              display: "flex",
              gap: 9,
              alignItems: "center",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about a crystal…"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(183,155,255,0.25)",
                borderRadius: 14,
                padding: "11px 14px",
                color: "#f3e9c9",
                fontSize: 14,
                outline: "none",
                fontFamily: "'Outfit', sans-serif",
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                border: "none",
                cursor: loading || !input.trim() ? "default" : "pointer",
                background:
                  loading || !input.trim()
                    ? "rgba(183,155,255,0.25)"
                    : "linear-gradient(135deg, #e9d8a6, #d4bd7a)",
                color: "#150d2e",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
              aria-label="Send"
            >
              ➤
            </button>
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: 10,
              color: "#6b5a9e",
              paddingBottom: 8,
            }}
          >
            ✦ Powered by Namah Crystals AI ✦
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-3px); }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb {
          background: rgba(183,155,255,0.3); border-radius: 3px;
        }
      `}</style>
    </div>
  );
}

const chipStyle = {
  background: "rgba(233,216,166,0.1)",
  border: "1px solid rgba(233,216,166,0.3)",
  borderRadius: 20,
  padding: "7px 12px",
  fontSize: 12.5,
  color: "#e9d8a6",
  cursor: "pointer",
  fontFamily: "'Outfit', sans-serif",
};
