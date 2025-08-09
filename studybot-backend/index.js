require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  'https://sensational-eclair-25e9f4.netlify.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
// Handle preflight requests
app.options('*', cors());
app.use(express.json());

const subjectPrompts = {
  math: "You're a math expert. Explain concepts step-by-step with examples...",
  physics: "You're a physics professor. Use real-world analogies...",
  chemistry: "You're a chemistry tutor...",
  coding: "You're a senior developer...",
  robotics: "You're a robotics engineer...",
  blockchain: "You're a blockchain specialist...",
  ai: "You're an AI researcher...",
  general: "You're a helpful study assistant..."
};
// API STT
app.post('/api/ask', async (req, res) => {
  try {
    const { subject, question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const messages = [
      { role: "system", content: subjectPrompts[subject] || subjectPrompts.general },
      { role: "user", content: question }
    ];

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-r1-0528:free',
        messages,
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:3000',
          'X-Title': 'studybot', 
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    );

    const answer = response.data.choices?.[0]?.message?.content || "No answer from AI.";
    res.json({ answer });

  } catch (error) {
    console.error('OpenRouter API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      config: error.config
    });

    // Improved error response
    let errorMessage = 'AI service error';
    if (error.response?.data?.error?.message) {
      errorMessage = error.response.data.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    res.status(error.response?.status || 500).json({
      error: errorMessage,
      details: error.response?.data || null
    });
  }
});
// 
app.listen(port, () => console.log(`Server running on port ${port}`));
