require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
// Access your API key as an environment variable (see "Set up your API key" above)
const secret = "AIzaSyALIOE0kB6ZtzsbxA6LPEzszCu9QrzqTdw";
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const genAI = new GoogleGenerativeAI(secret);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = "How to get to space!";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
// text: "To get Visa to silicon valley from Nigeria. What are the requirement?",

// const https = require("https");

// const mySecret = process.env["GEMINI_API_KEY"];
// const mySecret = process.env.GEMINI_API_KEY;
// const mySecret = "AIzaSyALIOE0kB6ZtzsbxA6LPEzszCu9QrzqTdw";
// const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${mySecret}`;
// const data = JSON.stringify({
//   contents: [
//     {
//       parts: [
//         {
//           text: "give me regex in javascript to remove * in a long text",
//         },
//       ],
//     },
//   ],
// });

// const options = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "Content-Length": data.length, // Required for some servers
//   },
// };

// const req = https.request(url, options, (res) => {
//   console.log(`statusCode: ${res.statusCode}`);

//   res.on("data", (d) => {
//     process.stdout.write(d);
//   });
// });

// req.on("error", (error) => {
//   console.error(error);
// });

// req.write(data.replace("*", ""));
// req.end();

// Sources:
// 1. https://jsrepos.com/lib/gajus-global-agent-javascript-nodejs-http
