import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { UniverseFormData } from "../../types/form";

interface CheckboxInputProps {
  name: keyof UniverseFormData;
  label: string;
  id?: string;
}

const CheckboxInput = ({ name, label, id }: CheckboxInputProps) => {
  const { register } = useFormContext<UniverseFormData>();

  const fieldId = id || name.toString();

  return (
    <CheckboxContainer>
      <HiddenCheckbox id={fieldId} type="checkbox" {...register(name)} />
      <CustomCheckbox htmlFor={fieldId}>
        <CheckIcon>✓</CheckIcon>
      </CustomCheckbox>
      <Label htmlFor={fieldId}>{label}</Label>
    </CheckboxContainer>
  );
};

export default CheckboxInput;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const HiddenCheckbox = styled.input`
  opacity: 0;
  position: absolute;
  pointer-events: none;
`;

const CustomCheckbox = styled.label`
  position: relative;
  width: 20px;
  height: 20px;
  background: rgba(30, 41, 59, 0.6);
  border: 2px solid rgba(139, 92, 246, 0.3);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #8b5cf6;
    background: rgba(30, 41, 59, 0.8);
  }

  ${HiddenCheckbox}:checked + & {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    border-color: #8b5cf6;
    box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
  }

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
  }
`;

const CheckIcon = styled.span`
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${HiddenCheckbox}:checked + ${CustomCheckbox} & {
    opacity: 1;
  }
`;

const Label = styled.label`
  font-family: "Noto Serif KR", serif;
  font-size: 0.875rem;
  color: #cbd5e1;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: #e2e8f0;
  }
`;
