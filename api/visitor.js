module.exports = function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const rawIp = req.headers["x-real-ip"];
  const ip = typeof rawIp === "string" ? rawIp.trim() : "";

  if (!ip) return res.status(204).end();

  console.info("[portfolio-visitor]", {
    ip,
    timestamp: new Date().toISOString(),
  });

  return res.status(204).end();
};
