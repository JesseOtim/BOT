import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import user3 from "./images/user3.png";
import axios from "axios";
import ChatBot from "react-simple-chatbot";
import { theme } from "./common/theme.js";
import { welcomeText } from "./common/constants.js";
import {
 StyledChatBotHeaderImage,
 StyledChatBotHeader,
 StyledChatBotResponse,
 StyledChatBotMessage,
 StyledChatBotFloatingIcon,
 StyledChatBotContainer,
 StyledFloatingIconWithText
} from "./common/styledComponents.js";
import { GlobalStyle } from "./styles.js";
import { v4 as uuid } from "uuid";
import user1 from "./images/user1.png";

const FetchResponse = ({ userId, previousStep }) => {
  const [botMessage, setBotMessage] = useState("");
  useEffect(() => {
    const fetchResponse = async () => {
      const userMessage = previousStep.value;
      const url = process.env.REACT_APP_SERVER_URL;
      try {
        const response = await axios.post(url, { prompt: userMessage, userId });
        let responseText = response.data;
        responseText = responseText.replace(/\n/g, "<br/>");
        responseText = responseText.replace(/\*(.*?)\*/g, (match, group) => {
          return `<b>${group}</b>`;
        });
        const lines = responseText.split("<br/>");
        const formattedResponse = lines.map((line, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: line }} />
        ));
        setBotMessage(formattedResponse);
      } catch (error) {
        setBotMessage("Error occurred. Please try again.");
      }
    };
    fetchResponse();
  }, [previousStep, userId]);
  return <StyledChatBotResponse>{botMessage}</StyledChatBotResponse>;
};

function App() {
  const [userId] = useState(() => {
    const storedUserId = localStorage.getItem("userId");
    return storedUserId || uuid();
  });

  const config = {
    floating: true,
  };

  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  const steps = [
    {
      id: "welcome",
      message: welcomeText,
      trigger: "user-input",
    },
    {
        id: "user-input",
        user: true,
        validator: (value) => {
          if (value.trim() === "") {
            return "Please Enter a Message.... 😡";
          }
          return true;
        },
        trigger: "fetch-response",
      },
    {
      id: "fetch-response",
      component: <FetchResponse userId={userId} />,
      asMessage: true,
      trigger: "user-input",
    },
  ];

  const toggleChatbot = (isOpen) => {
    window.parent.postMessage({ type: "TOGGLE_CHATBOT", isOpen }, "*");
  };

  const FloatingIconWithText = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <StyledChatBotFloatingIcon
        src={user1}
        alt="visible"
        onClick={() => toggleChatbot(true)}
      />
      <span style={{ fontSize: '15px', color: 'red', marginBottom: '30px', fontStyle: 'bolder', fontFamily: 'monospace', fontWeight: 'bolder' }}>👋🏾 Chat With Us</span>
    </div>
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const closeButton = document.querySelector(".rsc-header-close-button");
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          toggleChatbot(false);
        });
        clearInterval(intervalId);
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <StyledChatBotContainer>
          <ChatBot
            bubbleStyle={{ backgroundColor: "antiquewhite", fontSize: "16px", fontFamily: "monospace", maxWidth: "85%" }}
            headerTitle={
              <StyledChatBotHeaderImage
                src="https://witnessradio.org/wp-content/uploads/witness.fw_-1.png"
                alt="Company Logo"
              />
            }
            steps={steps}
            {...config}
            botAvatar={user3}
            placeholder={"Message Witness Radio.... 😀"}
            hideUserAvatar={true}
            floatingIcon={
              <FloatingIconWithText/>
            }
            width="500px"
          >
            <StyledChatBotHeader>
              {steps.map((step, index) => (
                <StyledChatBotMessage key={index}>
                  {step.message}
                </StyledChatBotMessage>
              ))}
              <FetchResponse />
            </StyledChatBotHeader>
          </ChatBot>
        </StyledChatBotContainer>
      </ThemeProvider>
    </div>
  );
}

export default App;
