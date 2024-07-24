import React, { useState, useEffect } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import user3 from "./images/user3.png";
import axios from "axios";
import { theme } from "./common/theme.js";
import { welcomeText } from "./common/constants.js";
import { StyledChatBotHeaderImage } from "./common/styledComponents.js";

function App() {
 const config = {
  floating: true,
 };

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
   component: <FetchResponse />,
   asMessage: true,
   trigger: "user-input",
  },
 ];

 return (
  <div className="App">
   <ThemeProvider theme={theme}>
    <ChatBot
     headerTitle={<StyledChatBotHeaderImage src="https://witnessradio.org/wp-content/uploads/witness.fw_-1.png" />}
     steps={steps}
     {...config}
     botAvatar={user3}
     hideUserAvatar={true}
     floatingStyle={{ height: 80, width: 80 }}
    />
   </ThemeProvider>
  </div>
 );
}

const FetchResponse = (previousValue) => {
 const [botMessage, setBotMessage] = useState("");
 useEffect(() => {
  const fetchResponse = async () => {
   const userMessage = previousValue.previousStep.value;
   const url = process.env.REACT_APP_SERVER_URL;
   try {
    const response = await axios.post(url, { prompt: userMessage });
    setBotMessage(response.data);
   } catch (error) {
    setBotMessage("Error occurred. Please try again.");
   }
  };
  fetchResponse();
 }, [previousValue]);
 return botMessage;
};

export default App;
