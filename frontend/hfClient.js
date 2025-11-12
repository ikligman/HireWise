import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { analyze } from "./server/hfClient.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Serve static files (index.html, style.css, script.js, etc.)
app.use(express.static(__dirname));

// Simple API route for frontend testing
// app.post("/api/analyze", (req, res) => {
//   res.json({
//     ok: true,
//     echo: req.body ?? null,
//   });
// });
app.post("/api/analyze", async (req, res) => {
  try {
    const input = req.body?.text ?? req.body; 
    const result = await analyze(input);
    res.json({ ok: true, result });
  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`🚀 HireWise running at http://localhost:${PORT}`);
});