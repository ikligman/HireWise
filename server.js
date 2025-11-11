import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Serve static files (index.html, style.css, script.js, etc.)
app.use(express.static(__dirname));

// Simple API route for frontend testing
app.post("/api/analyze", (req, res) => {
  res.json({
    ok: true,
    echo: req.body ?? null,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 HireWise running at http://localhost:${PORT}`);
});
