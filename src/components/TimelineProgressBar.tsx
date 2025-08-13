import styled from "styled-components";
import type { TimelineItem } from "../types/form";
import { useTranslation } from "react-i18next";

interface TimelineProgressBarProps {
  timeline: TimelineItem[];
  currentIndex: number;
  isLastItem: boolean;
}

const TimelineProgressBar = ({
  timeline,
  currentIndex,
  isLastItem,
}: TimelineProgressBarProps) => {
  const { t } = useTranslation();

  return (
    <ProgressBarContainer>
      {timeline.map((item, index) => {
        // Extract year from title (e.g., "2024D / 348 / " -> "2024")
        const yearMatch = item.title.match(/(\d{4})/);
        const year = yearMatch ? yearMatch[1] : item.title.substring(0, 4);
        return (
          <TimelineStepContainer key={index}>
            <TimelineStep
              $isActive={index === currentIndex && !isLastItem}
              $isCompleted={index < currentIndex}
            />
            <StepLabel
              $isActive={index === currentIndex && !isLastItem}
              $isCompleted={index < currentIndex}
            >
              {year}
            </StepLabel>
          </TimelineStepContainer>
        );
      })}
      {/* Final Message Step */}
      <TimelineStepContainer>
        <TimelineStep $isActive={isLastItem} $isCompleted={false}>
          ✨
        </TimelineStep>
        <StepLabel $isActive={isLastItem} $isCompleted={false}>
          {t("result.message")}
        </StepLabel>
      </TimelineStepContainer>
    </ProgressBarContainer>
  );
};

export default TimelineProgressBar;

const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  gap: 1rem;

  &::before {
    content: "";
    position: absolute;
    top: 12px;
    left: 0;
    right: 0;
    height: 2px;
    background: rgba(71, 85, 105, 0.3);
    z-index: 1;
  }
`;

const TimelineStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const TimelineStep = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 0.75rem;
  position: relative;
  z-index: 2;

  background: ${(props) =>
    props.$isCompleted
      ? "linear-gradient(135deg, #10b981, #059669)"
      : props.$isActive
      ? "linear-gradient(135deg, #8b5cf6, #7c3aed)"
      : "rgba(71, 85, 105, 0.5)"};

  border: 2px solid
    ${(props) =>
      props.$isCompleted
        ? "#10b981"
        : props.$isActive
        ? "#8b5cf6"
        : "rgba(71, 85, 105, 0.5)"};

  box-shadow: ${(props) =>
    props.$isCompleted
      ? "0 0 10px rgba(16, 185, 129, 0.3)"
      : props.$isActive
      ? "0 0 10px rgba(139, 92, 246, 0.3)"
      : "none"};

  transition: all 0.3s ease;

  ${(props) =>
    props.$isActive &&
    `
    animation: pulse 2s ease-in-out infinite;
    
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }
  `}
`;

const StepLabel = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  font-family: "Noto Serif KR", serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;

  color: ${(props) =>
    props.$isCompleted || props.$isActive ? "#f1f5f9" : "#94a3b8"};

  transition: all 0.3s ease;
`;
