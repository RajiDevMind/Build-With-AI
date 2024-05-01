require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const API_KEY = "AIzaSyALIOE0kB6ZtzsbxA6LPEzszCu9QrzqTdw";
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const genAI = new GoogleGenerativeAI(API_KEY);

// middleware to pass data cross platforms
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello world");
});

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];
const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 200,
  temperature: 0.9,
  topP: 0.1,
  topK: 16,
};
// const projectId = "gen-lang-client-0244547703";
// const location = "global";
// const model = genAI.getGenerativeModel({
//   model: "gemini-pro",
//   safetySettings,
//   generationConfig,
// });

const { TextGenerationServiceClient: Text } = require("@google-cloud/language");

app.get("/text", async (req, res) => {
  const { ask_gemini } = req.body;

  const projectId = "gen-lang-client-0244547703";
  const location = "global";

  try {
    const client = Text;

    const request = {
      parent: client.locationPath(projectId, location),
      inputScope: [{ text: ask_gemini }],
      models: [`projects/${projectId}/locations/${location}/models/gemini-pro`],
    };

    const [response] = await client.generateContent(request);
    const generatedText = await response.text[0].text;

    res.status(200).json(generatedText);
  } catch (error) {
    console.error("Error during text generation:", error);
    res.status(500).json({ error: "Failed to generate text" });
  }
});

const port = 9000;
const start = async () => {
  try {
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (err) {
    console.log(err);
    // }
  }
};
start();
