import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'ABeeZee', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
  }
  @media only screen and (max-width: 768px) {
  /* Adjust the chatbot container width and height for mobile devices */
  .StyledChatBotContainer {
    width: 100%;
    height: 100vh;
  }
  /* Adjust the chatbot width and height for mobile devices */
  .ChatBot {
    width: 100%;
    height: 100vh;
  }
}
`;
