import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import user2 from './images/user1.png';
import "./App.css";

function App() {
  // Define initial state for the username
 

  // Define steps for the chatbot
  const steps = [
   

    {
      id: "welcome",
      message: "Hello! I am your health assistant. How can I help you today?",
      trigger: "options",
    },
    {
      id: "options",
      options: [
        { value: "symptoms", label: "Check Symptoms", trigger: "symptoms" },
        {
          value: "medication",
          label: "Medication Advice",
          trigger: "medication",
        },
        { value: "lifestyle", label: "Lifestyle Tips", trigger: "lifestyle" },
        { value: "doctor", label: "Consult a Doctor", trigger: "doctor" },
      ],
    },
   
  ];

  // Theme for the chatbot
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

  // Configuration for the chatbot
  const config = {
     floating: true,
  };

  // Function to handle username submission
  

  // // Function to handle end of chatbot conversation
  // const handleEnd = (params) =&gt; {
  //   // Add emoji reaction to the message
  //   params.steps[params.steps.length - 1].message.add_reaction("&lt;:Vip:897596558323908678&gt;");
  //   // Handle username submission
  //   handleUsernameSubmit(params.values[0]);
  // };

  return (
    <div className="App">
      <h1>Chatty Bot</h1>
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="Chatty"
          steps={steps}
          {...config}
          botAvatar = {user2}
          // Pass the function to handle username submission
         
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
