import { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import karmaImage from "../../assets/karma.png";
import KarmaDialogBox from "../KarmaDialogBox";
import { SUPPORTED_LANGUAGES } from "../../types/language";

interface IntroStepProps {
  onStart: () => void;
}

const IntroStep = ({ onStart }: IntroStepProps) => {
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
  const [showMessages, setShowMessages] = useState(false);
  const [skipGreeting, setSkipGreeting] = useState(false);
  const { t, i18n } = useTranslation();

  const currentLanguage =
    SUPPORTED_LANGUAGES.find((lang) => lang.code === i18n.language) ||
    SUPPORTED_LANGUAGES[0];

  // Load skip setting from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("skipKarmaGreeting");
    if (saved === "true") {
      setSkipGreeting(true);
      setShowMessages(true);
    }
  }, []);

  const karmaDialogs = t("intro.karmaDialogs", {
    returnObjects: true,
  }) as string[];

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
          <MainMessage>{t("intro.title")}</MainMessage>
          <SubMessage>{t("intro.description")}</SubMessage>
          <StartButton onClick={onStart}>{t("intro.start")}</StartButton>
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
          <label htmlFor="skipGreeting">{t("intro.skip")}</label>
        </SkipCheckbox>

        <LanguageSelector>
          <span>lang</span>
          <select
            value={currentLanguage.code}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
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
  white-space: pre-line;
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
