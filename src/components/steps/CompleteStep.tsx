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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
        return t("form.genderOptions.male");
      case "female":
        return t("form.genderOptions.female");
      default:
        return gender;
    }
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <StepContainer>
      <Title>{t("complete.title")}</Title>

      <SummaryCard title={t("process.personalInfo")}>
        <InfoItem label={t("form.birthday")} value={formData.birthDate} />
        <InfoItem
          label={t("form.gender")}
          value={formatGender(formData.gender)}
        />
        <InfoItem
          label={t("form.currentLocation")}
          value={formData.currentLocation}
        />
        <InfoItem label={t("form.currentJob")} value={formData.currentJob} />
        <InfoItem
          label={t("complete.currentSelf")}
          value={formData.currentSelf}
        />
      </SummaryCard>

      <SummaryCard title={t("process.pastSituation")}>
        <InfoItem label={t("complete.year")} value={`${formData.year}년`} />
        <InfoItem
          label={t("complete.pastChoice")}
          value={formData.pastChoice}
        />
        <InfoItem
          label={t("complete.desiredChange")}
          value={formData.desiredChange}
        />
      </SummaryCard>

      <ButtonContainer>
        <Button type="button" onClick={onPrev} $variant="secondary">
          {t("complete.modify")}
        </Button>
        <Button type="button" onClick={handleSubmit(onSubmit)}>
          {t("complete.submit")}
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
