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
 StyledChatBotFloatingIcon
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
    const responseText = response.data;
    const isNumberedList = responseText.match(/^\d+\..*$/gm);
    if (isNumberedList) {
     const options = responseText.split("\n");
     const formattedResponse = options.map((option, index) => <div key={index}>{option}</div>);
     setBotMessage(formattedResponse);
    } else {
     setBotMessage(responseText);
    }
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
   trigger: "fetch-response",
  },
  {
   id: "fetch-response",
   component: <FetchResponse userId={userId} />,
   asMessage: true,
   trigger: "user-input",
  },
 ];

 return (
  <div className="App">
   <ThemeProvider theme={theme}>
    <GlobalStyle />
    <ChatBot
     bubbleStyle={{ backgroundColor: "antiquewhite" }}
     headerTitle={
      <StyledChatBotHeaderImage
       src="https://witnessradio.org/wp-content/uploads/witness.fw_-1.png"
       alt="Company Logo"
      />
     }
     steps={steps}
     {...config}
     botAvatar={user3}
     floatingStyle={{ height: 80, width: 80 }}
     placeholder={"Write your message .... 😀"}
     hideUserAvatar={true}
     floatingIcon={<StyledChatBotFloatingIcon src={user1} alt="floaticon-logo" />}
     width="500px"
    >
     <StyledChatBotHeader>
      {steps.map((step, index) => (
       <StyledChatBotMessage key={index}>
        console.log(step.message);
        {step.message}
       </StyledChatBotMessage>
      ))}
      <FetchResponse />
     </StyledChatBotHeader>
    </ChatBot>
   </ThemeProvider>
  </div>
 );
}

export default App;
