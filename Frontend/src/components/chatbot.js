import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleUserMessage = (message) => {
    const userMessage = {
      message,
      type: "user",
    };
    setChatMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput("");

    axios
      .post("http://localhost:8080/api/data", { question: message })
      .then((response) => {
        const botMessage = {
          message: response.data,
          type: "bot",
        };
        setChatMessages((prevMessages) => [...prevMessages, botMessage]);
      })
      .catch((error) => {
        console.error("Error fetching bot response:", error);
      });
  };

  const chatMessagesRef = useRef(null);

  useEffect(() => {
    chatMessagesRef.current?.scrollTo({
      top: chatMessagesRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [chatMessages]);

  return (
    <div className="chatbot-container">
      <div className="chatbot-window">
        <div className="chat-header">
          <div className="avatar">
            <img
              src="https://askadvi.org/wp-content/uploads/2022/09/ADVi-logo-resize-for-ADVI-website-front-page.png"
              alt="ChatBot Avatar"
            />
          </div>
        </div>
        <div className="chat-messages-wrapper">
          <div className="chat-messages" ref={chatMessagesRef}>
            {chatMessages.map((chat, index) => (
              <div
                key={index}
                className={`message-container ${
                  chat.type === "user" ? "user-message" : "bot-message"
                }`}
              >
                <p>{chat.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your query..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleUserMessage(userInput);
            }
          }}
        />
        <button
          className="send-btn"
          onClick={() => handleUserMessage(userInput)}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
