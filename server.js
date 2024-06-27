const OpenAI = require("openai");
const express = require("express");
const logger = require('morgan');
const path = require("path")
require('dotenv').config();
const app = express();


// Configure OpenAI API
const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  throw new Error("OPENAI_API_KEY environment variable is not set");
}
const openai = new OpenAI({
  apiKey: openaiApiKey
});

// Function to get completion from OpenAI
async function requestOpenAi(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("Invalid input: messages must be a non-empty array");
  }
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: messages
  });
  return response.choices[0].message.content;
}

// Main function
app.use(logger("dev")); // adicione um logger para registrar erros
app.use(express.json()); // parse JSON bodies

app.use(express.static(path.join(__dirname, 'public')));


app.post("/chat", async (req, res) => {
  try {
    const messages = req.body.messages;
    const completion = await requestOpenAi(messages);
    res.json({ response: completion });
  } catch (error) {
    console.error(error); // registre o erro
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});