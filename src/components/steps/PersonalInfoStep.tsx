import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { useEffect } from "react";
import type { UniverseFormData } from "../../types/form";
import DateInput from "../inputs/DateInput";
import SelectInput from "../inputs/SelectInput";
import TextInput from "../inputs/TextInput";
import TextAreaInput from "../inputs/TextAreaInput";
import CheckboxInput from "../inputs/CheckboxInput";
import StepTitle from "./StepTitle";
import { useTranslation } from "react-i18next";

interface PersonalInfoStepProps {
  onNext: () => void;
}

const PersonalInfoStep = ({ onNext }: PersonalInfoStepProps) => {
  const {
    watch,
    setValue,
    trigger,
    formState: { isValid },
  } = useFormContext<UniverseFormData>();
  const { t } = useTranslation();
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("universeFormData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Set form values from localStorage
        Object.keys(parsedData).forEach((key) => {
          if (key !== "saveData") {
            setValue(key as keyof UniverseFormData, parsedData[key]);
          }
        });
        setValue("saveData", true);
        // Trigger validation after setting values
        trigger();
      } catch (error) {
        console.error("Failed to load saved data:", error);
      }
    }
  }, [setValue, trigger]);

  // Watch all form fields and saveData to save/remove data from localStorage
  const saveData = watch("saveData");
  const allFormData = watch();

  useEffect(() => {
    if (saveData) {
      const dataToSave = {
        birthDate: allFormData.birthDate,
        gender: allFormData.gender,
        currentLocation: allFormData.currentLocation,
        currentJob: allFormData.currentJob,
        currentSelf: allFormData.currentSelf,
      };
      localStorage.setItem("universeFormData", JSON.stringify(dataToSave));
    } else {
      localStorage.removeItem("universeFormData");
    }
  }, [
    saveData,
    allFormData.birthDate,
    allFormData.gender,
    allFormData.currentLocation,
    allFormData.currentJob,
    allFormData.currentSelf,
  ]);

  return (
    <StepContainer>
      <StepTitle
        title={t("form.firstStepTitle")}
        description={t("form.firstStepDescription")}
      />

      <DateInput
        name="birthDate"
        label={t("form.birthday")}
        required={true}
        id="birthDate"
        maxDate={new Date().toISOString().split("T")[0]}
      />

      <SelectInput
        name="gender"
        label={t("form.gender")}
        options={[
          { value: "female", label: "♀ " + t("form.genderOptions.female") },
          { value: "male", label: "♂ " + t("form.genderOptions.male") },
        ]}
        placeholder={t("form.genderPlaceholder")}
        required={true}
        id="gender"
      />

      <TextInput
        name="currentLocation"
        label={t("form.currentLocation")}
        placeholder={t("form.currentLocationPlaceholder")}
        required={true}
        id="currentLocation"
      />

      <TextInput
        name="currentJob"
        label={t("form.currentJob")}
        placeholder={t("form.currentJobPlaceholder")}
        required={true}
        id="currentJob"
      />

      <TextAreaInput
        name="currentSelf"
        label={t("form.currentSelf")}
        placeholder={t("form.currentSelfPlaceholder")}
        required={true}
        id="currentSelf"
        minLength={10}
      />

      <CheckboxInput name="saveData" label={t("form.saveData")} id="saveData" />

      <Button type="button" onClick={onNext} disabled={!isValid}>
        {t("form.next")}
      </Button>
    </StepContainer>
  );
};

export default PersonalInfoStep;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Button = styled.button`
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.5rem;
  font-family: "Noto Serif KR", serif;
  letter-spacing: 0.025em;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);

  &:hover {
    background: linear-gradient(135deg, #7c3aed, #6d28d9);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
  }

  &:disabled {
    background: rgba(71, 85, 105, 0.5);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;
