import { useState } from "react";
import styled, { keyframes } from "styled-components";
import loadingKarmaImage from "../assets/loadingKarma.webp";
import KarmaDialogBox from "./KarmaDialogBox";

const LoadingComponent = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const loadingMessages = [
    "과거 회귀 시작. 분기점을 탐색 중…",
    "분기점 발견. 평행 세계로 진입중…",
    "또 다른 당신을 찾는 중…",
    "대상 확인. 현재로 거슬러 올라가는 중…",
  ];

  const handleMessageComplete = () => {
    if (currentMessageIndex < loadingMessages.length - 1) {
      setTimeout(() => {
        setCurrentMessageIndex(currentMessageIndex + 1);
      }, 1500);
    }
  };

  return (
    <LoadingContainer>
      <LoadingContent>
        <LoadingTitle>평행우주를 탐색하고 있습니다.</LoadingTitle>
        <LoadingKarmaImage src={loadingKarmaImage} alt="Loading Karma" />
        <KarmaDialogBox
          message={loadingMessages[currentMessageIndex]}
          onComplete={handleMessageComplete}
          isVisible={true}
          typingSpeed={40}
          autoAdvance={true}
        />
        <LoadingSpinner>
          <Dot $delay={0} />
          <Dot $delay={0.1} />
          <Dot $delay={0.2} />
        </LoadingSpinner>
      </LoadingContent>
    </LoadingContainer>
  );
};

export default LoadingComponent;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding: 4rem 2rem;
`;

const LoadingContent = styled.div`
  text-align: center;
  max-width: 600px;
  animation: ${fadeIn} 0.8s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const LoadingKarmaImage = styled.img`
  width: 300px;
  height: 200px;
  border-radius: 16px;
  animation: ${float} 3s ease-in-out infinite;
  opacity: 0.9;
  object-fit: cover;
`;

const LoadingTitle = styled.h1`
  font-family: "Noto Serif KR", serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #8b5cf6;
  margin-bottom: 1rem;
  text-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
  line-height: 1.4;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const Dot = styled.div<{ $delay: number }>`
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  animation-delay: ${(props) => props.$delay}s;
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
`;
