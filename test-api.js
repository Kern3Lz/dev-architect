const API_KEY = process.env.OPENROUTER_API_KEY;

fetch("https://api.openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "openrouter/free",
    messages: [{ role: "user", content: "Say hello" }],
    max_tokens: 100,
  }),
})
  .then((r) => r.json())
  .then((d) => console.log(JSON.stringify(d, null, 2)))
  .catch((e) => console.error("ERROR:", e.message));
