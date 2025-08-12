import { ReactNode } from "react";
import styled from "styled-components";
import type { TimelineItem } from "../types/form";

interface ResultContentProps {
  currentItem: TimelineItem | null;
  lastMessage: string;
  isLastItem: boolean;
  children?: ReactNode;
}

const ResultContent = ({
  currentItem,
  lastMessage,
  isLastItem,
  children,
}: ResultContentProps) => {
  return (
    <ContetContainer>
      {!isLastItem && currentItem ? (
        <TimelineContent>
          <Content>{currentItem.contents}</Content>
          {children}
        </TimelineContent>
      ) : (
        <FinalMessage>
          <MessageIcon>✨</MessageIcon>
          <MessageContent>{lastMessage}</MessageContent>
          {children}
        </FinalMessage>
      )}
    </ContetContainer>
  );
};

export default ResultContent;

const ContetContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 1rem;
`;

const TimelineContent = styled.div`
  text-align: center;
  animation: fadeIn 0.8s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Content = styled.p`
  font-family: "Noto Serif KR", serif;
  font-size: 1.1rem;
  color: #f1f5f9;
  line-height: 1.8;
  margin-bottom: 3rem;
  text-align: left;
  word-break: keep-all;
`;

const FinalMessage = styled.div`
  text-align: center;
  padding: 2rem 0;
  animation: finalFadeIn 1s ease-out;

  @keyframes finalFadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const MessageIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  animation: sparkle 2s ease-in-out infinite;

  @keyframes sparkle {
    0%,
    100% {
      transform: scale(1) rotate(0deg);
    }
    25% {
      transform: scale(1.1) rotate(-5deg);
    }
    75% {
      transform: scale(1.1) rotate(5deg);
    }
  }
`;

const MessageContent = styled.p`
  font-family: "Noto Serif KR", serif;
  font-size: 1.2rem;
  color: #f1f5f9;
  line-height: 1.8;
  margin-bottom: 3rem;
  font-style: italic;
  word-break: keep-all;
`;
