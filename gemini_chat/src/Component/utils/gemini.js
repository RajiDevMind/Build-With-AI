// import dotenv from "dotenv";
// dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyALIOE0kB6ZtzsbxA6LPEzszCu9QrzqTdw";
// Creating new instance of googlegenerative AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function singleChat(userInput) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = { userInput };

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

async function multiTurnChat(userInput) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: userInput }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const msg = "How many paws are in my house?";

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

module.exports = {
  singleChat,
  multiTurnChat,
};
export default { singleChat, multiTurnChat }; // Default export
