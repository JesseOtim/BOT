import { styled } from "styled-components";

export const StyledChatBotHeader = styled.div`
 background-color: ${(props) => props.theme.colors.secondary};
 color: ${(props) => props.theme.colors.primary};
 padding: 10px;
 border-radius: 10px 10px 0 0;
`;

export const StyledChatBotFloatingIcon = styled.img`
 /* Mobile screens (portrait and landscape) */
 @media only screen and (max-width: 768px) {
  /* Your mobile-specific styles here */
  width: 60px !important;
  height: 60px !important;
 }
 /* Laptop screens */
 @media only screen and (min-width: 769px) and (max-width: 1280px) {
  /* Your laptop-specific styles here */
  width: 70px !important;
  height: 70px !important;
 }

 /* Monitor screens */
 @media only screen and (min-width: 1281px) {
  /* Your monitor-specific styles here */
  width: 80px !important;
  height: 80px !important;
 }
 //  @media (max-width: 1440px) {
 //   width: 70px !important;
 //   height: 70px !important;
 //  }
 //  @media (max-width: 1728px) {
 //   width: 80px !important;
 //   height: 80px !important;
 //  }
 //  @media (max-width: 2560px) {
 //   width: 90px !important;
 //   height: 90px !important;
 //  }
 width: 60px;
 height: 60px;
 border-radius: 50%;
 margin: 10px;
`;

export const StyledChatBotMessage = styled.div`
 background-color: brown;
 padding: 10px;
 border-bottom: 1px solid ${(props) => props.theme.colors.secondary};
`;

export const StyledChatBotResponse = styled.div`
 padding: 10px;
 border-radius: 10px;
 margin-bottom: 10px;
 word-wrap: break-word;
 width: 100%;
`;

export const StyledChatBotHeaderImage = styled.img`
 width: 70px;
 height: 45px;
 border-radius: 50%;
 margin: 10px;
 margin-top: 30px;
`;

export const StyledChatBotContainer = styled.div`
 .rsc-container {
  background-color: white !important;
 }
 .rsc-content {
  background-color: white !important;
 }
 .rsc-input {
  background-color: white !important;
 }
 position: relative;
 z-index: ${(props) => props.zIndex || "9999"};
`;
