import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Noto+Serif+KR:wght@300;400;500;600;700&display=swap');

  /* Global styles for the app */
  * {
    box-sizing: border-box;
    font-family: 'Noto Serif KR', serif, 'Times New Roman', Times;
  }

  body {
    font-family: 'Noto Serif KR', serif, 'Times New Roman', Times;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, #0c0c1d 0%, #1a1a2e 30%, #16213e 70%, #0f0f23 100%);
    color: #e2e8f0;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }

  /* Ensure all text elements use serif font */
  h1, h2, h3, h4, h5, h6, p, span, div, input, textarea, select, button, label {
    font-family: 'Noto Serif KR', serif, 'Times New Roman', Times;
  }

  /* Cosmic background effects */
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.1), transparent),
      radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.08), transparent),
      radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.12), transparent),
      radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.1), transparent),
      radial-gradient(2px 2px at 160px 30px, rgba(255,255,255,0.06), transparent);
    background-repeat: repeat;
    background-size: 200px 100px;
    animation: sparkle 20s linear infinite;
    pointer-events: none;
    z-index: 1;
  }

  @keyframes sparkle {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }

  #root {
    height: 100vh;
    overflow: hidden;
    position: relative;
    z-index: 2;
  }

  /* Typography */
  .space-mono {
    font-family: 'Space Mono', monospace;
  }

  /* Remove default styles for links */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* Ensure proper scrolling behavior */
  html {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar for webkit browsers */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.5);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(139, 92, 246, 0.7);
  }
`;

export default GlobalStyle;
