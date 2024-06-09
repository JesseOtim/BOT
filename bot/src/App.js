import React, { useState }  from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import user2 from './images/user2.png';
import axios from "axios"; // Import Axios
import "./App.css";

function App() {
  // Define initial state for the username
 
  const [setChatHistory] = useState([]);

    // Define function to send message to External API
    const sendMessageToExternalAPI = async (message) => {
      try {
        const response = await axios.post("996e08f311dcac7a8d585a71e67e5074b84a7e06", {
          id: Date.now(), // Generate a unique ID for the message
          text: message,
          to: "+256750616369",
          from: "+256750616369",
          channel: "2599235",
        });
        // Handle successful response
        console.log("Message sent successfully:", response.data);
      } catch (error) {
        // Handle error
        console.error("Error sending message:", error);
      }
    };
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
    {
      id: "symptoms",
      message: "Please describe your symptoms.",
      trigger: "symptom-input",
    },
    {
      id: "symptom-input",
      user: true,
      trigger: "symptom-response",
    },
    {
      id: "symptom-response",
      message:
        "Based on your symptoms, it is advisable to rest, stay hydrated, and monitor your condition. If symptoms worsen, please consult a doctor.",
      trigger: "more-help",
    },
    {
      id: "medication",
      message: "What medication advice are you looking for?",
      trigger: "medication-options",
    },
    {
      id: "medication-options",
      options: [
        { value: "dosage", label: "Dosage Information", trigger: "dosage" },
        {
          value: "side-effects",
          label: "Side Effects",
          trigger: "side-effects",
        },
        {
          value: "interactions",
          label: "Drug Interactions",
          trigger: "interactions",
        },
        { value: "back", label: "Go Back", trigger: "options" },
      ],
    },
    {
      id: "dosage",
      message: "Please enter the name of the medication.",
      trigger: "dosage-input",
    },
    {
      id: "dosage-input",
      user: true,
      trigger: "dosage-response",
    },
    {
      id: "dosage-response",
      message:
        "It is important to follow the dosage instructions provided by your healthcare provider. Always read the medication label and consult your doctor if you have any questions.",
      trigger: "more-help",
    },
    {
      id: "side-effects",
      message: "Please enter the name of the medication.",
      trigger: "side-effects-input",
    },
    {
      id: "side-effects-input",
      user: true,
      trigger: "side-effects-response",
    },
    {
      id: "side-effects-response",
      message:
        "Common side effects can include nausea, dizziness, or headaches. Please refer to the medication leaflet for detailed information and consult your doctor if you experience any severe side effects.",
      trigger: "more-help",
    },
    {
      id: "interactions",
      message:
        "Please enter the names of the medications you are concerned about.",
      trigger: "interactions-input",
    },
    {
      id: "interactions-input",
      user: true,
      trigger: "interactions-response",
    },
    {
      id: "interactions-response",
      message:
        "Drug interactions can be complex. It is best to consult your doctor or pharmacist for advice specific to your medications.",
      trigger: "more-help",
    },
    {
      id: "lifestyle",
      message:
        "I can provide tips on diet, exercise, and healthy living. What would you like to know about?",
      trigger: "lifestyle-options",
    },
    {
      id: "lifestyle-options",
      options: [
        { value: "diet", label: "Diet", trigger: "diet" },
        { value: "exercise", label: "Exercise", trigger: "exercise" },
        { value: "habits", label: "Healthy Habits", trigger: "habits" },
        { value: "back", label: "Go Back", trigger: "options" },
      ],
    },
    {
      id: "diet",
      message:
        "A balanced diet is crucial for good health. Include plenty of fruits, vegetables, lean proteins, and whole grains in your meals.",
      trigger: "more-help",
    },
    {
      id: "exercise",
      message:
        "Regular exercise helps maintain a healthy body and mind. Aim for at least 30 minutes of moderate exercise most days of the week.",
      trigger: "more-help",
    },
    {
      id: "habits",
      message:
        "Healthy habits include getting adequate sleep, staying hydrated, and avoiding smoking and excessive alcohol consumption.",
      trigger: "more-help",
    },
    {
      id: "doctor",
      message:
        "It is important to consult a doctor for personalized medical advice. Would you like help finding a doctor or setting up an appointment?",
      trigger: "doctor-options",
    },
    {
      id: "doctor-options",
      options: [
        {
          value: "find-doctor",
          label: "Find a Doctor",
          trigger: "find-doctor",
        },
        {
          value: "set-appointment",
          label: "Set an Appointment",
          trigger: "set-appointment",
        },
        { value: "back", label: "Go Back", trigger: "options" },
      ],
    },
    {
      id: "find-doctor",
      message:
        "Please visit our website or call our helpline to find a doctor near you.",
      trigger: "more-help",
    },
    {
      id: "set-appointment",
      message:
        "You can set an appointment by contacting your healthcare provider directly or using our online booking system.",
      trigger: "more-help",
    },
    {
      id: "more-help",
      message: "Is there anything else I can help you with?",
      trigger: "more-help-options",
    },
    {
      id: "more-help-options",
      options: [
        { value: "yes", label: "Yes", trigger: "options" },
        { value: "no", label: "No", trigger: "end" },
      ],
    },
    {
      id: "end",
      message:
        "Thank you for using our health assistant service. Take care and stay healthy!",
      end: true,
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
  // Define the function to handle user input
  user: {
    trigger: (value) => {
      // Send user input to External API
      sendMessageToExternalAPI(value);
      // Update chat history state
      setChatHistory((prevHistory) => [...prevHistory, value]);
      return "options"; // Trigger the next step
    },
  },
};

  // Function to handle username submission

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

