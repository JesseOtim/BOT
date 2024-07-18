import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import user2 from './images/user2.png';
import axios from "axios";
import { getOpenAIResponse } from "./openaiService";
import "./App.css";

function App() {
  const [ setChatHistory] = useState([]);

  

  const steps = [
    {
      id: "welcome",
      message: "Hello! I am your health assistant. How can I help you today?",
      trigger: "user-input",
    },
    {
      id: "user-input",
      user: true,
      trigger: "handle-user-input",
    },
    {
      id: "handle-user-input",
      message: ({ previousValue, steps }) => {
        getOpenAIResponse(previousValue);
        setChatHistory((prevHistory) => [...prevHistory, previousValue]);
        return "user-input-response";
      },
    },
    {
      id: "user-input-response",
      message: "Here is a response based on your input.",
      end: true,
    },
  ];

  const theme = {
    background: "white",
    headerBgColor: "darkgreen",
    headerFontSize: "20px",
    botBubbleColor: "darkgreen",
    headerFontColor: "white",
    botFontColor: "white",
    userBubbleColor: "white",
    userFontColor: "black",
  };

  const config = {
    floating: true,
  };

  return (
    <div className="App">
      <h1>ChatBot</h1>
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="Chat"
          steps={steps}
          {...config}
          botAvatar={user2}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
