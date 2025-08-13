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

interface PersonalInfoStepProps {
  onNext: () => void;
}

const PersonalInfoStep = ({ onNext }: PersonalInfoStepProps) => {
  const {
    watch,
    setValue,
    formState: { isValid },
  } = useFormContext<UniverseFormData>();
  console.log(isValid);
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
      } catch (error) {
        console.error("Failed to load saved data:", error);
      }
    }
  }, [setValue]);

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
      <StepTitle title="🧑‍💼 당신이 누구인지 알려주세요." description="" />

      <DateInput
        name="birthDate"
        label="생년월일"
        required={true}
        id="birthDate"
        maxDate={new Date().toISOString().split("T")[0]}
      />

      <SelectInput
        name="gender"
        label="성별"
        options={[
          { value: "female", label: "♀ 여성" },
          { value: "male", label: "♂ 남성" },
        ]}
        placeholder="성별을 선택하세요"
        required={true}
        id="gender"
      />

      <TextInput
        name="currentLocation"
        label="현재 거주지"
        placeholder="예: 대한민국 서울"
        required={true}
        id="currentLocation"
      />

      <TextInput
        name="currentJob"
        label="현재 직업"
        placeholder="예: 소프트웨어 개발자"
        required={true}
        id="currentJob"
      />

      <TextAreaInput
        name="currentSelf"
        label="내 현재의 모습"
        placeholder="현재의 나에 대해 자세히 설명해주세요. 성격, 취미, 현재 상황 등을 포함해서 적어주세요."
        required={true}
        id="currentSelf"
        minLength={10}
      />

      <CheckboxInput
        name="saveData"
        label="이 정보를 다음에도 사용"
        id="saveData"
      />

      <Button type="button" onClick={onNext} disabled={!isValid}>
        다음 단계
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
