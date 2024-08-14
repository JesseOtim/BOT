import { styled } from "styled-components";

export const StyledChatBotHeader = styled.div`
 background-color: ${(props) => props.theme.colors.secondary};
 color: ${(props) => props.theme.colors.primary};
 padding: 10px;
 border-radius: 10px 10px 0 0;
`;

export const StyledChatBotFloatingIcon = styled.img`
 width: 60px;
 height: 60px;
 border-radius: 50%;
 margin: 10px;
 pointer-events: all;

 @media only screen and (max-width: 768px) {
  width: 60px;
  height: 60px;
 }

 @media only screen and (min-width: 769px) and (max-width: 1280px) {
  width: 70px;
  height: 70px;
 }

 @media only screen and (min-width: 1280px) and (max-width: 1440px) {
  width: 80px;
  height: 80px;
 }

 @media only screen and (min-width: 1441px) and (max-width: 2560px) {
  width: 90px;
  height: 90px;
 }
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
 height: 45px;
 margin: 10px;
 margin-top: 30px;
 objectFit: "contain";
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
 .rsc-float-button {
  width: unset !important;
  height: unset !important;
  box-shadow: unset !important;
  pointer-events: none;
 }
`;
