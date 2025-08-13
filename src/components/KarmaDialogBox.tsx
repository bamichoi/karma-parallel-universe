import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface KarmaDialogBoxProps {
  message: string;
  onComplete?: () => void;
  isVisible: boolean;
  typingSpeed?: number;
  autoAdvance?: boolean;
}

const KarmaDialogBox = ({
  message,
  onComplete,
  isVisible,
  typingSpeed = 50,
  autoAdvance = false,
}: KarmaDialogBoxProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText("");
      setIsTypingComplete(false);
      return;
    }

    let currentIndex = 0;
    setDisplayedText("");
    setIsTypingComplete(false);

    const typingInterval = setInterval(() => {
      if (currentIndex < message.length) {
        setDisplayedText(message.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
        if (autoAdvance && onComplete) {
          setTimeout(() => onComplete(), 800);
        }
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [message, isVisible, typingSpeed]);

  const handleClick = () => {
    if (isTypingComplete && onComplete && !autoAdvance) {
      onComplete();
    }
  };

  if (!isVisible) return null;

  return (
    <DialogContainer onClick={handleClick}>
      <DialogBox>
        <SpeakerName>{t("common.karma")}</SpeakerName>
        <DialogText>
          {displayedText}
          {!isTypingComplete && <Cursor>|</Cursor>}
        </DialogText>
        {isTypingComplete && !autoAdvance && (
          <ContinueIndicator>▼ {t("intro.nextDialog")}</ContinueIndicator>
        )}
      </DialogBox>
    </DialogContainer>
  );
};

export default KarmaDialogBox;

const DialogContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 1rem;
  margin-top: -1rem;
  cursor: pointer;
`;

const DialogBox = styled.div`
  background: linear-gradient(
    135deg,
    rgba(30, 41, 59, 0.95),
    rgba(15, 23, 42, 0.95)
  );
  border: 2px solid rgba(139, 92, 246, 0.3);
  border-radius: 16px 16px 16px 16px;
  padding: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 10px 40px rgba(139, 92, 246, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  backdrop-filter: blur(10px);

  &::before {
    content: "";
    position: absolute;
    top: -8px;
    left: 2rem;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid rgba(139, 92, 246, 0.3);
  }
`;

const SpeakerName = styled.div`
  font-family: "Noto Serif KR", serif;
  font-size: 0.875rem;
  font-weight: 700;
  color: #8b5cf6;
  text-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
  text-align: left;
`;

const DialogText = styled.p`
  font-family: "Noto Serif KR", serif;
  font-size: 1rem;
  color: #f1f5f9;
  line-height: 1.6;
  margin: 0;
  min-height: 1.6em;
  word-break: keep-all;
  text-align: left;
`;

const Cursor = styled.span`
  color: #8b5cf6;
  animation: blink 1s infinite;

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }
`;

const ContinueIndicator = styled.div`
  font-family: "Noto Serif KR", serif;
  font-size: 0.75rem;
  color: #94a3b8;
  text-align: center;
  margin-top: 1rem;
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }
`;
