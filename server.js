// Simple Node.js static file server using Express
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files (your index.html, style.css, script.js)
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`🚀 HireWise running at http://localhost:${PORT}`);
});
