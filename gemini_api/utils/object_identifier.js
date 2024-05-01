require("dotenv").config();
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const fs = require("fs");

const MODEL_NAME = "gemini-1.0-pro-vision-latest";
const API_KEY = "AIzaSyALIOE0kB6ZtzsbxA6LPEzszCu9QrzqTdw";
// const API_KEY = process.env.GEMINI_API_KEY;

async function object_identifier() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 32,
    topP: 0.95,
    maxOutputTokens: 1024,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  if (!fs.existsSync("passport.PNG")) {
    throw new Error("Could not find images in current directory.");
  }

  const parts = [
    {
      text: "What object is this? Describe how it might be used and List the details in it",
    },
    { text: "Object: " },
    {
      inlineData: {
        mimeType: "image/jpeg" || "image/png" || "image/jpg",
        data: Buffer.from(fs.readFileSync("passport.PNG")).toString("base64"),
      },
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts: parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  console.log(response.text());
}

object_identifier();
