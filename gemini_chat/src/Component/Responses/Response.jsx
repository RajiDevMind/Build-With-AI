import React from "react";
// import "../ChatMessage.css";

const AIResponse = ({ response, AIbot }) => {
  return (
    <div className="msg-board">
      <div className={`chat-message ${AIbot === "user" ? "user-message" : ""}`}>
        <div className="msgs">{response}</div>
      </div>
    </div>
  );
};

export default AIResponse;
