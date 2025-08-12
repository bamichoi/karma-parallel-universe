import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import type { UniverseFormData } from "../../types/form";
import NumberInput from "../inputs/NumberInput";
import TextAreaInput from "../inputs/TextAreaInput";

interface PastSituationStepProps {
  onNext: () => void;
  onPrev: () => void;
}

const PastSituationStep = ({ onNext, onPrev }: PastSituationStepProps) => {
  const { watch } = useFormContext<UniverseFormData>();

  const watchedFields = watch(["year", "pastChoice", "desiredChange"]);

  const isFormValid = watchedFields.every((field) => {
    if (typeof field === "number") return field > 0;
    return field && field.toString().trim() !== "";
  });

  const currentYear = new Date().getFullYear();

  return (
    <StepContainer>
      <Title>🕰️ 바꾸고 싶은 과거를 알려주세요</Title>

      <NumberInput
        name="year"
        label="언제였는지 (년도)"
        placeholder="예: 2020"
        required={true}
        id="year"
        min={1900}
        max={currentYear}
        minMessage="1900년 이후의 년도를 입력해주세요"
        maxMessage={`${currentYear}년 이전의 년도를 입력해주세요`}
      />

      <TextAreaInput
        name="pastChoice"
        label="당시 내가 했던 선택"
        placeholder="그 당시 어떤 상황이었고, 어떤 선택을 했는지 자세히 설명해주세요."
        required={true}
        id="pastChoice"
        minLength={10}
      />

      <TextAreaInput
        name="desiredChange"
        label="바꾸고 싶은 내용"
        placeholder="만약 그때 다른 선택을 했다면 어떤 선택을 하고 싶었는지 설명해주세요."
        required={true}
        id="desiredChange"
        minLength={10}
      />

      <ButtonContainer>
        <Button type="button" onClick={onPrev} $variant="secondary">
          이전
        </Button>
        <Button type="button" onClick={onNext} disabled={!isFormValid}>
          다음
        </Button>
      </ButtonContainer>
    </StepContainer>
  );
};

export default PastSituationStep;

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
      : "linear-gradient(135deg, #8b5cf6, #7c3aed)"};
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
      : "0 4px 15px rgba(139, 92, 246, 0.3)"};

  &:hover {
    background: ${(props) =>
      props.$variant === "secondary"
        ? "rgba(51, 65, 85, 0.8)"
        : "linear-gradient(135deg, #7c3aed, #6d28d9)"};
    transform: ${(props) =>
      props.$variant === "secondary" ? "none" : "translateY(-1px)"};
    box-shadow: ${(props) =>
      props.$variant === "secondary"
        ? "none"
        : "0 6px 20px rgba(139, 92, 246, 0.4)"};
  }

  &:disabled {
    background: rgba(71, 85, 105, 0.5);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;
