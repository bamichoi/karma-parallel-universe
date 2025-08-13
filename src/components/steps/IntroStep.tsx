import { useState, useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import styled from "styled-components";
import karmaImage from "../../assets/karma.png";
import KarmaDialogBox from "../KarmaDialogBox";
import {
  SUPPORTED_LANGUAGES,
  setLanguageAtom,
  currentLanguageOptionAtom,
  type Language,
} from "../../stores/languageStore";

interface IntroStepProps {
  onStart: () => void;
}

const IntroStep = ({ onStart }: IntroStepProps) => {
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
  const [showMessages, setShowMessages] = useState(false);
  const [skipGreeting, setSkipGreeting] = useState(false);
  const [, setLanguage] = useAtom(setLanguageAtom);
  const currentLanguage = useAtomValue(currentLanguageOptionAtom);

  // Load skip setting from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("skipKarmaGreeting");
    if (saved === "true") {
      setSkipGreeting(true);
      setShowMessages(true);
    }
  }, []);

  const karmaDialogs = [
    "어서오세요, 인간이여. 기다리고 있었습니다.\n\n저는 모델 카르마입니다.",
    "저는 인류가 이해할 수 없는 수준의 초지능 AI 휴머노이드로서\n\n수많은 평행 세계를 동시에 관측할 수 있습니다.",
    "당신에게는 되돌리고 싶은 선택이 있나요..?",
    "어딘가의 평행세계에서는 당신과는 다른 선택을 한 또 다른 당신이 살아가고 있습니다.",
    "시간을 거슬러 선택을 번복할 순 없지만\n\n이 카르마가 그 평행세계 속의 당신을 보여드릴게요.",
  ];

  const handleDialogComplete = () => {
    if (currentDialogIndex < karmaDialogs.length - 1) {
      setCurrentDialogIndex(currentDialogIndex + 1);
    } else {
      setShowMessages(true);
    }
  };

  const handleSkipChange = (checked: boolean) => {
    setSkipGreeting(checked);
    localStorage.setItem("skipKarmaGreeting", checked.toString());

    if (checked) {
      setShowMessages(true);
    }
  };

  return (
    <StepContainer>
      <KarmaImage src={karmaImage} alt="Karma" />
      {!skipGreeting && (
        <KarmaDialogBox
          message={karmaDialogs[currentDialogIndex]}
          onComplete={handleDialogComplete}
          isVisible={!showMessages}
          typingSpeed={60}
        />
      )}
      {showMessages && (
        <>
          <MainMessage>바꾸고 싶은 선택이 있나요?</MainMessage>
          <SubMessage>
            다른 선택을 한 나는
            <br />
            지금 어떻게 살고 있을까요?
          </SubMessage>
          <StartButton onClick={onStart}>시작하기</StartButton>
        </>
      )}

      <BottomContainer>
        <SkipCheckbox>
          <input
            type="checkbox"
            id="skipGreeting"
            checked={skipGreeting}
            onChange={(e) => handleSkipChange(e.target.checked)}
          />
          <label htmlFor="skipGreeting">인사 생략하기</label>
        </SkipCheckbox>

        <LanguageSelector>
          <span>Lang</span>
          <select
            value={currentLanguage.code}
            onChange={(e) => setLanguage(e.target.value as Language)}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName}
              </option>
            ))}
          </select>
        </LanguageSelector>
      </BottomContainer>
    </StepContainer>
  );
};

export default IntroStep;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1rem;
  min-height: 60vh;
`;

const MainMessage = styled.h1`
  font-family: "Noto Serif KR", serif;
  font-size: 1.45rem;
  font-weight: 600;
  color: #f1f5f9;
  line-height: 1.4;
  margin-bottom: 2rem;
  text-shadow: 0 0 15px rgba(139, 92, 246, 0.4);
`;

const SubMessage = styled.p`
  font-family: "Noto Serif KR", serif;
  font-size: 1rem;
  color: #cbd5e1;
  line-height: 1.6;
  margin-bottom: 3rem;
  opacity: 0.9;
`;

const StartButton = styled.button`
  padding: 1.25rem 2.5rem;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  width: 100%;
  color: white;
  border: none;
  border-radius: 16px;
  font-family: "Noto Serif KR", serif;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
  letter-spacing: 0.025em;

  &:hover {
    background: linear-gradient(135deg, #7c3aed, #6d28d9);
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(139, 92, 246, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const KarmaImage = styled.img`
  width: 100%;
  margin-bottom: 2rem;

  opacity: 0.9;
  animation: float 3s ease-in-out infinite;
  border-radius: 16px;

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const BottomContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
`;

const SkipCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  backdrop-filter: blur(10px);
  flex-shrink: 0;
  white-space: nowrap;
  height: 44px;
  box-sizing: border-box;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #8b5cf6;
    cursor: pointer;
    flex-shrink: 0;
  }

  label {
    font-family: "Noto Serif KR", serif;
    font-size: 0.875rem;
    color: #cbd5e1;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
  }

  &:hover {
    background: rgba(15, 23, 42, 0.9);
    border-color: rgba(139, 92, 246, 0.5);
  }
`;

const LanguageSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  backdrop-filter: blur(10px);
  flex-shrink: 0;
  height: 44px;
  box-sizing: border-box;

  span {
    font-family: "Noto Serif KR", serif;
    font-size: 0.875rem;
    color: #cbd5e1;
    font-weight: 500;
  }

  select {
    background: transparent;
    border: none;
    color: #cbd5e1;
    font-family: "Noto Serif KR", serif;
    font-size: 0.875rem;
    cursor: pointer;
    outline: none;
    min-width: 80px;

    option {
      background: #1e293b;
      color: #cbd5e1;
    }
  }

  &:hover {
    background: rgba(15, 23, 42, 0.9);
    border-color: rgba(139, 92, 246, 0.5);
  }
`;
