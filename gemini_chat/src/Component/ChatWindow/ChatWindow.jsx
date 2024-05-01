import React, { useState } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import "./chatWindow.css";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import AIResponse from "../Responses/Response";
import { SiMinutemailer } from "react-icons/si";
import { SiLens } from "react-icons/si";
// import { singleChat, multiTurnChat } from "../utils/gemini";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [aiResponse, setAIResponse] = useState([]);
  const [userInput, setUserInput] = useState("");

  const GEMINI_API_KEY = "AIzaSyALIOE0kB6ZtzsbxA6LPEzszCu9QrzqTdw";
  // Creating new instance of googlegenerative AI
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

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

  async function run() {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      safetySettings,
      generationConfig,
    });

    const prompt = userInput;

    // Use streaming with text-only input
    const result = await model.generateContentStream(prompt);
    // const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setAIResponse([{ text: text, sender: "AIbot" }]);
  }

  const sendMessage = async () => {
    if (userInput.trim() !== "") {
      setMessages([...messages, { message: userInput, sender: "user" }]);
      setUserInput("");

      // Simulate bot response (replace with actual API call)
      // setTimeout(() => {
      //   setMessages([...aiResponse, { message: aiResponse, sender: "bot" }]);
      // }, 2000);
      run();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <main>
      <div className="chat-window">
        <h2>AI ChattyBot App</h2>
        <div className="message-list">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.message}
              sender={message.sender}
            />
          ))}
        </div>
        <div>
          {aiResponse.map((response, index) => (
            <AIResponse
              key={index}
              response={response.text}
              AIbot={response.AIbot}
            />
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
            onKeyDown={handleKeyDown}
            className="text-input"
          />
          <button className="send-btn" onClick={sendMessage}>
            Ask <SiMinutemailer />
          </button>
        </div>
        <div className="img-bar">
          {/* <input type="file" src="" alt="" /> */}
          <SiLens size={30} className="image-icon" />
        </div>
      </div>
    </main>
  );
};

export default ChatWindow;
