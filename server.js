const OpenAI = require("openai");
const express = require("express");
const logger = require('morgan');
const path = require("path")
require('dotenv').config();
const app = express();


// Configurações da api OpenAI 
const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  throw new Error("OPENAI_API_KEY environment variable is not set");
}
const openai = new OpenAI({
  apiKey: openaiApiKey
});

// Função para chamar a completion (Completion: É a saída gerada pelo modelo em resposta ao prompt)
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
app.use(logger("dev")); // midwere logger para monitorar, depurar e registrar eventos, mensagens de erro, informações de desempenho e outros dados importantes da api 
app.use(express.json()); // midwere para trabalhar com JSON 

app.use(express.static(path.join(__dirname, 'public'))); //rota para conectar o frontend (PRECISO MELHORAR ISSO, NÃO FUNFA)

//chamar a api com post
app.post("/chat", async (req, res) => {
  try {
    const messages = req.body.messages;
    const completion = await requestOpenAi(messages);
    res.json({ response: completion });
  } catch (error) {
    console.error(error); // registro de erro(fazer)
    res.status(500).json({ error: error.message });
  }
});
//servidor 
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
