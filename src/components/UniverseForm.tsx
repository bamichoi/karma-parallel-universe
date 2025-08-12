import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useAtomValue } from "jotai";
import styled from "styled-components";
import type { UniverseFormData, FormStep } from "../types/form";
import { isLoadingAtom } from "../stores/resultStore";
import IntroStep from "./steps/IntroStep";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import PastSituationStep from "./steps/PastSituationStep";
import CompleteStep from "./steps/CompleteStep";

const UniverseForm = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>("intro");
  const [completedSteps, setCompletedSteps] = useState<Set<FormStep>>(
    new Set()
  );
  const isLoading = useAtomValue(isLoadingAtom);

  const methods = useForm<UniverseFormData>();

  const nextStep = () => {
    if (currentStep === "intro") {
      setCompletedSteps((prev) => new Set([...prev, "intro"]));
      setCurrentStep("personal");
    } else if (currentStep === "personal") {
      setCompletedSteps((prev) => new Set([...prev, "personal"]));
      setCurrentStep("past");
    } else if (currentStep === "past") {
      setCompletedSteps((prev) => new Set([...prev, "past"]));
      setCurrentStep("complete");
    }
  };

  const prevStep = () => {
    if (currentStep === "personal") {
      setCurrentStep("intro");
    } else if (currentStep === "past") {
      setCurrentStep("personal");
    } else if (currentStep === "complete") {
      setCurrentStep("past");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case "intro":
        return <IntroStep onStart={nextStep} />;
      case "personal":
        return <PersonalInfoStep onNext={nextStep} />;
      case "past":
        return <PastSituationStep onNext={nextStep} onPrev={prevStep} />;
      case "complete":
        return <CompleteStep onPrev={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <FormContainer>
        {currentStep !== "intro" && !isLoading && (
          <ProgressBar>
            <ProgressStep
              $isActive={currentStep === "personal"}
              $isCompleted={completedSteps.has("personal")}
            >
              1. 나의 정보
            </ProgressStep>
            <ProgressStep
              $isActive={currentStep === "past"}
              $isCompleted={completedSteps.has("past")}
            >
              2. 과거 상황
            </ProgressStep>
            <ProgressStep
              $isActive={currentStep === "complete"}
              $isCompleted={completedSteps.has("complete")}
            >
              3. 준비 완료
            </ProgressStep>
          </ProgressBar>
        )}

        {renderStep()}
      </FormContainer>
    </FormProvider>
  );
};

export default UniverseForm;

const FormContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem 0;
`;

const ProgressBar = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 12px;
    left: 12px;
    right: 12px;
    height: 2px;
    background: rgba(71, 85, 105, 0.3);
    z-index: 1;
  }
`;

const ProgressStep = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Noto Serif KR", serif;
  position: relative;
  z-index: 2;
  flex: 1;
  text-align: center;

  &::before {
    content: "";
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-bottom: 0.5rem;
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
        ? "0 0 15px rgba(16, 185, 129, 0.4)"
        : props.$isActive
        ? "0 0 15px rgba(139, 92, 246, 0.4)"
        : "none"};
  }

  color: ${(props) =>
    props.$isCompleted || props.$isActive ? "#f1f5f9" : "#94a3b8"};
  font-weight: ${(props) => (props.$isActive ? "600" : "500")};
  font-size: 0.75rem;
`;
