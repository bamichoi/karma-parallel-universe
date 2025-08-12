import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import styled from "styled-components";
import { simulationResultAtom } from "../stores/resultStore";
import TimelineProgressBar from "../components/TimelineProgressBar";
import ResultContent from "../components/ResultContent";

const ResultPage = () => {
  const navigate = useNavigate();
  const result = useAtomValue(simulationResultAtom);

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!result) {
    navigate("/");
    return null;
  }

  const isLastItem = currentIndex >= result.timeline.length;
  const currentItem = isLastItem ? null : result.timeline[currentIndex];

  const handleNext = () => {
    if (currentIndex < result.timeline.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRestart = () => {
    navigate("/");
  };

  return (
    <PageContainer>
      <ContentWrapper>
        {/* Fixed Timeline Progress Bar */}
        <FixedHeader>
          <TimelineProgressBar
            timeline={result.timeline}
            currentIndex={currentIndex}
            isLastItem={isLastItem}
          />

          {/* Fixed Title */}
          <FixedTitle>
            {!isLastItem && currentItem
              ? currentItem.title
              : "평행우주의 나로부터 온 메시지"}
          </FixedTitle>
        </FixedHeader>

        {/* Scrollable Content Area */}
        <ResultContent
          currentItem={currentItem}
          lastMessage={result.lastMessage}
          isLastItem={isLastItem}
        >
          <ButtonContainer>
            {currentIndex > 0 && (
              <PrevButton onClick={handlePrev}>이전</PrevButton>
            )}
            {!isLastItem ? (
              <NextButton onClick={handleNext}>다음</NextButton>
            ) : (
              <RestartButton onClick={handleRestart}>
                다시 시작하기
              </RestartButton>
            )}
          </ButtonContainer>
        </ResultContent>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ResultPage;

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  min-height: calc(100vh - 200px);
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
`;

const FixedHeader = styled.div`
  flex-shrink: 0;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

const FixedTitle = styled.h1`
  font-family: "Noto Serif KR", serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #8b5cf6;
  text-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
  line-height: 1.4;
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 3rem;
`;

const NextButton = styled.button`
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  font-family: "Noto Serif KR", serif;
  letter-spacing: 0.025em;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);

  &:hover {
    background: linear-gradient(135deg, #7c3aed, #6d28d9);
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(139, 92, 246, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PrevButton = styled.button`
  background: rgba(71, 85, 105, 0.6);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  font-family: "Noto Serif KR", serif;
  letter-spacing: 0.025em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(51, 65, 85, 0.8);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const RestartButton = styled.button`
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1.2rem 3rem;
  font-size: 1rem;
  font-weight: 600;
  font-family: "Noto Serif KR", serif;
  letter-spacing: 0.025em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #059669, #047857);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
