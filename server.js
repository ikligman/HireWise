/* ============================================================================
   HIREWISE - EXPRESS SERVER
   ============================================================================
   Main entry point for the HireWise backend.
   Handles HTTP requests and routes them to the AI analysis service.
   ============================================================================ */

/* ----------------------------------------------------------------------------
   IMPORTS & CONFIGURATION
   ---------------------------------------------------------------------------- */
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { analyze } from "./server/hfClient.js";

// Load environment variables from .env file
dotenv.config();

// ES Module compatibility for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ----------------------------------------------------------------------------
   EXPRESS APP SETUP
   ---------------------------------------------------------------------------- */
const app = express();
const PORT = 3000;

/* ----------------------------------------------------------------------------
   MIDDLEWARE
   ---------------------------------------------------------------------------- */
// Parse JSON request bodies
app.use(express.json());

// Serve static files from root directory
app.use(express.static(__dirname));

/* ----------------------------------------------------------------------------
   API ROUTES
   ---------------------------------------------------------------------------- */

/**
 * POST /api/analyze
 * Analyzes a resume (and optional job description) using AI
 * 
 * Request body:
 *   - resume: string (required) - The resume text to analyze
 *   - jobDescription: string (optional) - Target job description for tailoring
 * 
 * Response:
 *   - ok: boolean - Whether the request succeeded
 *   - result: object - Contains bullets, coverLetter, and interviewPrep
 *   - error: string - Error message if ok is false
 */
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

/* ----------------------------------------------------------------------------
   SERVER STARTUP
   ---------------------------------------------------------------------------- */
app.listen(PORT, () => {
  console.log(`🚀 HireWise running at http://localhost:${PORT}`);
});
