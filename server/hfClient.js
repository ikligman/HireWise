/* ============================================================================
   HIREWISE - HUGGINGFACE AI CLIENT
   ============================================================================
   Handles all AI interactions with the HuggingFace Inference API.
   Uses Llama 3.2 to generate resume improvements, cover letters, and 
   interview preparation content.
   ============================================================================ */

/* ----------------------------------------------------------------------------
   CONFIGURATION
   ---------------------------------------------------------------------------- */

// Model: Meta's Llama 3.2 3B Instruct - optimized for following instructions
const MODEL = "meta-llama/Llama-3.2-3B-Instruct";

// HuggingFace's OpenAI-compatible chat completions endpoint
const API_URL = "https://router.huggingface.co/v1/chat/completions";

/* ============================================================================
   MAIN ANALYSIS FUNCTION
   ============================================================================ */

/**
 * Analyzes a resume (and optional job description) and returns:
 * - Improved bullet points
 * - A cover letter draft
 * - Interview preparation Q&A
 * 
 * @param {string|object} input - Resume text or object with resume/jobDescription
 * @returns {Promise<object>} Parsed AI response with bullets, coverLetter, interviewPrep
 */
export async function analyze(input) {
  
  /* --------------------------------------------------------------------------
     INPUT VALIDATION
     -------------------------------------------------------------------------- */
  const resume = typeof input === "string" ? input : input?.resume || input?.text || "";
  const jobDescription = input?.jobDescription || input?.jd || "";

  if (!resume || resume.trim().length < 50) {
    throw new Error("Please provide more resume content for analysis.");
  }

  /* --------------------------------------------------------------------------
     PROMPT CONSTRUCTION
     -------------------------------------------------------------------------- */
  const systemPrompt = `You are HireWise, an expert AI career assistant. You help job seekers improve their resumes, write cover letters, and prepare for interviews. Be specific, actionable, and professional.`;

  const userPrompt = buildPrompt(resume, jobDescription);

  /* --------------------------------------------------------------------------
     API CALL TO HUGGINGFACE
     -------------------------------------------------------------------------- */
  console.log(`Calling HuggingFace API with model: ${MODEL}`);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 1500,
      temperature: 0.7,
      top_p: 0.95,
      stream: false,
    }),
  });

  /* --------------------------------------------------------------------------
     ERROR HANDLING
     -------------------------------------------------------------------------- */
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("HF API Error:", response.status, errorData);
    
    if (response.status === 503) {
      throw new Error("AI model is loading. Please wait 20-30 seconds and try again.");
    }
    if (response.status === 429) {
      throw new Error("Rate limit reached. Please wait a moment and try again.");
    }
    
    throw new Error(errorData.error?.message || `AI service error: ${response.status}`);
  }

  /* --------------------------------------------------------------------------
     RESPONSE PROCESSING
     -------------------------------------------------------------------------- */
  const data = await response.json();
  const generatedText = data.choices?.[0]?.message?.content || "";

  if (!generatedText) {
    throw new Error("No response generated from AI. Please try again.");
  }

  console.log("Successfully received AI response");
  
  return parseResponse(generatedText);
}

/* ============================================================================
   PROMPT BUILDER
   ============================================================================ */

/**
 * Builds the user prompt based on resume and optional job description.
 * Uses structured format to ensure consistent AI output.
 * 
 * @param {string} resume - The user's resume text
 * @param {string} jobDescription - Optional target job description
 * @returns {string} Formatted prompt for the AI
 */
function buildPrompt(resume, jobDescription) {
  let prompt = `Analyze the following resume and provide career assistance.

## RESUME:
${resume}
`;

  // Add job description section if provided (for tailored suggestions)
  if (jobDescription && jobDescription.trim().length > 0) {
    prompt += `
## TARGET JOB DESCRIPTION:
${jobDescription}

Please tailor your suggestions to match this specific job.
`;
  }

  // Instructions with exact format for consistent parsing
  prompt += `
## INSTRUCTIONS:
Please provide your response in the following EXACT format with these section headers:

### IMPROVED BULLET POINTS
Provide 5 improved resume bullet points. Each should:
- Start with a strong action verb
- Include quantifiable achievements where possible
- Be concise (1-2 lines max)

### COVER LETTER
Write a professional cover letter draft (3-4 paragraphs).

### INTERVIEW PREP
Provide 3 likely interview questions with suggested talking points for answers.

Begin your response now:`;

  return prompt;
}

/* ============================================================================
   RESPONSE PARSER
   ============================================================================ */

/**
 * Parses the AI response into structured sections using regex.
 * Extracts bullet points, cover letter, and interview Q&A from formatted text.
 * 
 * @param {string} text - Raw AI response text
 * @returns {object} Structured object with bullets, coverLetter, interviewPrep, raw
 */
function parseResponse(text) {
  const result = {
    bullets: [],
    coverLetter: "",
    interviewPrep: [],
    raw: text,
  };

  try {
    /* ------------------------------------------------------------------------
       EXTRACT BULLET POINTS
       ------------------------------------------------------------------------ */
    const bulletsMatch = text.match(/###\s*IMPROVED BULLET POINTS\s*([\s\S]*?)(?=###\s*COVER LETTER|$)/i);
    if (bulletsMatch) {
      const bulletsText = bulletsMatch[1].trim();
      // Extract individual bullets (lines starting with - or • or numbers)
      const bulletLines = bulletsText
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.match(/^[-•\d.]\s*/) || line.length > 30)
        .map(line => line.replace(/^[-•\d.]+\s*/, "").trim())
        .filter(line => line.length > 20);
      
      result.bullets = bulletLines.slice(0, 5);
    }

    /* ------------------------------------------------------------------------
       EXTRACT COVER LETTER
       ------------------------------------------------------------------------ */
    const coverMatch = text.match(/###\s*COVER LETTER\s*([\s\S]*?)(?=###\s*INTERVIEW PREP|$)/i);
    if (coverMatch) {
      result.coverLetter = coverMatch[1].trim();
    }

    /* ------------------------------------------------------------------------
       EXTRACT INTERVIEW PREP Q&A
       ------------------------------------------------------------------------ */
    const interviewMatch = text.match(/###\s*INTERVIEW PREP\s*([\s\S]*?)$/i);
    if (interviewMatch) {
      const interviewText = interviewMatch[1].trim();
      
      // Try to extract Q&A pairs with various formats
      const qaMatches = interviewText.matchAll(/(?:Q:|Question:|^\d+\.)\s*(.+?)(?:\n|$)\s*(?:A:|Answer:|Talking points?:)?\s*([\s\S]*?)(?=(?:Q:|Question:|^\d+\.)|$)/gim);
      
      for (const match of qaMatches) {
        if (match[1] && match[2]) {
          result.interviewPrep.push({
            question: match[1].trim(),
            answer: match[2].trim(),
          });
        }
      }

      // Fallback: split by common patterns if regex didn't match
      if (result.interviewPrep.length === 0) {
        const sections = interviewText.split(/\n(?=\d+\.|Q:|•|-)/);
        for (const section of sections) {
          const lines = section.trim().split("\n");
          if (lines.length >= 1) {
            const question = lines[0].replace(/^[\d.Q:\-•]+\s*/, "").trim();
            const answer = lines.slice(1).join(" ").replace(/^A:\s*/, "").trim();
            if (question.length > 10) {
              result.interviewPrep.push({ 
                question, 
                answer: answer || "Prepare specific examples from your experience." 
              });
            }
          }
        }
      }
    }

    /* ------------------------------------------------------------------------
       FALLBACK CONTENT (if parsing failed)
       ------------------------------------------------------------------------ */
    if (result.bullets.length === 0) {
      result.bullets = ["Please try again - the AI response wasn't formatted as expected."];
    }
    if (!result.coverLetter) {
      result.coverLetter = "Cover letter generation incomplete. Please try again.";
    }
    if (result.interviewPrep.length === 0) {
      result.interviewPrep = [{ 
        question: "Tell me about yourself", 
        answer: "Prepare a concise summary of your professional background." 
      }];
    }

  } catch (err) {
    console.error("Error parsing AI response:", err);
    // Return raw text if parsing fails completely
    result.bullets = ["AI response received but couldn't be parsed. See raw output."];
    result.coverLetter = text;
  }

  return result;
}
