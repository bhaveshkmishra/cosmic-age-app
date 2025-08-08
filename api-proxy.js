// This is a placeholder for a backend service to handle the Gemini API key securely
// For a static site on GitHub Pages, this would typically be implemented as:
// 1. A serverless function (e.g., Vercel Functions, Netlify Functions)
// 2. A simple backend service (e.g., Express.js app on a VPS)
// 3. Using environment variables in a CI/CD pipeline

// Example Express.js route that would handle the API call securely:
/*
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

// API key stored securely in environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/generate-milestones', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({ text });
  } catch (error) {
    console.error("Gemini API call failed:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

module.exports = router;
*/

// For now, we'll modify the frontend to use a more secure approach
// by at least not hardcoding the API key directly in the source