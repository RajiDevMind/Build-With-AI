import React from "react";
import "./ChatMessage.css";

const ChatMessage = ({ message, sender }) => {
  return (
    <div className="msg-board">
      <div
        className={`chat-message ${sender === "user" ? "user-message" : ""}`}
      >
        <div className="msgs">{message}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
