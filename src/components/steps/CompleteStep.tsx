import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetAtom, useAtomValue } from "jotai";
import styled from "styled-components";
import type { UniverseFormData } from "../../types/form";
import { simulationResultAtom, isLoadingAtom } from "../../stores/resultStore";
import requestSimulate from "../../api/requestSimulate";
import { parseSimulationResponse } from "../../utils/parseSimulationResponse";
import SummaryCard from "../SummaryCard";
import InfoItem from "../InfoItem";
import LoadingComponent from "../LoadingComponent";

interface CompleteStepProps {
  onPrev: () => void;
}

const CompleteStep = ({ onPrev }: CompleteStepProps) => {
  const { handleSubmit, watch } = useFormContext<UniverseFormData>();
  const formData = watch();
  const navigate = useNavigate();
  const setSimulationResult = useSetAtom(simulationResultAtom);
  const setIsLoading = useSetAtom(isLoadingAtom);
  const isLoading = useAtomValue(isLoadingAtom);

  const onSubmit = async (data: UniverseFormData) => {
    try {
      setIsLoading(true);

      const response = await requestSimulate(data);

      // Parse the API response to get simulation result
      const result = parseSimulationResponse(response);

      // Store result in atom and navigate to result page
      setSimulationResult(result);
      setIsLoading(false);
      navigate("/result");
    } catch (error) {
      console.error("Error requesting simulation:", error);
      setIsLoading(false);
    }
  };
  const formatGender = (gender: string) => {
    switch (gender) {
      case "male":
        return "남성";
      case "female":
        return "여성";
      case "other":
        return "기타";
      default:
        return gender;
    }
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <StepContainer>
      <Title>✨ 입력 정보 확인</Title>

      <SummaryCard title="나의 정보">
        <InfoItem label="생년월일" value={formData.birthDate} />
        <InfoItem label="성별" value={formatGender(formData.gender)} />
        <InfoItem label="현재 거주지" value={formData.currentLocation} />
        <InfoItem label="현재 직업" value={formData.currentJob} />
        <InfoItem label="현재의 모습" value={formData.currentSelf} />
      </SummaryCard>

      <SummaryCard title="과거 상황">
        <InfoItem label="시기" value={`${formData.year}년`} />
        <InfoItem label="당시의 선택" value={formData.pastChoice} />
        <InfoItem label="바꾸고 싶은 내용" value={formData.desiredChange} />
      </SummaryCard>

      <ButtonContainer>
        <Button type="button" onClick={onPrev} $variant="secondary">
          수정
        </Button>
        <Button type="button" onClick={handleSubmit(onSubmit)}>
          카르마와 평행우주 진입
        </Button>
      </ButtonContainer>
    </StepContainer>
  );
};

export default CompleteStep;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h2`
  font-family: "Noto Serif KR", serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button<{ $variant?: "primary" | "secondary" }>`
  padding: 1rem 1.5rem;
  background: ${(props) =>
    props.$variant === "secondary"
      ? "rgba(71, 85, 105, 0.6)"
      : "linear-gradient(135deg, #10b981, #059669)"};
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  flex: ${(props) => (props.$variant === "secondary" ? "0 0 auto" : "1")};
  font-family: "Noto Serif KR", serif;
  letter-spacing: 0.025em;
  transition: all 0.3s ease;
  box-shadow: ${(props) =>
    props.$variant === "secondary"
      ? "none"
      : "0 4px 15px rgba(16, 185, 129, 0.3)"};

  &:hover {
    background: ${(props) =>
      props.$variant === "secondary"
        ? "rgba(51, 65, 85, 0.8)"
        : "linear-gradient(135deg, #059669, #047857)"};
    transform: ${(props) =>
      props.$variant === "secondary" ? "none" : "translateY(-1px)"};
    box-shadow: ${(props) =>
      props.$variant === "secondary"
        ? "none"
        : "0 6px 20px rgba(16, 185, 129, 0.4)"};
  }

  &:disabled {
    background: rgba(71, 85, 105, 0.5);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;
