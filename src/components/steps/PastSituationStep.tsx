import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import type { UniverseFormData } from "../../types/form";
import NumberInput from "../inputs/NumberInput";
import TextAreaInput from "../inputs/TextAreaInput";
import StepTitle from "./StepTitle";
import { useTranslation } from "react-i18next";

interface PastSituationStepProps {
  onNext: () => void;
  onPrev: () => void;
}

const PastSituationStep = ({ onNext, onPrev }: PastSituationStepProps) => {
  const {
    formState: { isValid },
  } = useFormContext<UniverseFormData>();
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  return (
    <StepContainer>
      <StepTitle title={t("form.secondStepTitle")} description="" />

      <NumberInput
        name="year"
        label={t("form.year")}
        placeholder={t("form.yearPlaceholder")}
        required={true}
        id="year"
        min={1900}
        max={currentYear}
        minMessage={t("error.minYear")}
        maxMessage={t("error.maxYear", { max: currentYear })}
      />

      <TextAreaInput
        name="pastChoice"
        label={t("form.pastChoice")}
        placeholder={t("form.pastChoicePlaceholder")}
        required={true}
        id="pastChoice"
        minLength={10}
      />

      <TextAreaInput
        name="desiredChange"
        label={t("form.desiredChange")}
        placeholder={t("form.desiredChangePlaceholder")}
        required={true}
        id="desiredChange"
        minLength={10}
      />

      <ButtonContainer>
        <Button type="button" onClick={onPrev} $variant="secondary">
          {t("form.previous")}
        </Button>
        <Button type="button" onClick={onNext} disabled={!isValid}>
          {t("form.next")}
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
