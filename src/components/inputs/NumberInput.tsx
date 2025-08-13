import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import type { UniverseFormData } from "../../types/form";
import { useTranslation } from "react-i18next";

interface NumberInputProps {
  name: keyof UniverseFormData;
  label: string;
  placeholder?: string;
  required?: boolean;
  id?: string;
  min?: number;
  max?: number;
  minMessage?: string;
  maxMessage?: string;
}

const NumberInput = ({
  name,
  label,
  placeholder,
  required = false,
  id,
  min,
  max,
  minMessage,
  maxMessage,
}: NumberInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UniverseFormData>();
  const { t } = useTranslation();

  const fieldId = id || name.toString();
  const error = errors[name];

  return (
    <FormGroup>
      <Label htmlFor={fieldId}>{label}</Label>
      <Input
        id={fieldId}
        type="number"
        placeholder={placeholder}
        min={min}
        max={max}
        autoComplete="off"
        {...register(name, {
          required: required ? t("error.requiredFill", { label }) : false,
          min: min
            ? {
                value: min,
                message: minMessage || t("error.min", { min }),
              }
            : undefined,
          max: max
            ? {
                value: max,
                message: maxMessage || t("error.max", { max }),
              }
            : undefined,
          valueAsNumber: true,
        })}
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </FormGroup>
  );
};

export default NumberInput;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #cbd5e1;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  color: #f1f5f9;
  font-family: "Noto Serif KR", serif;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
    background: rgba(30, 41, 59, 0.8);
  }

  /* Prevent autofill styling */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px rgba(30, 41, 59, 0.6) inset !important;
    -webkit-text-fill-color: #f1f5f9 !important;
    background-color: rgba(30, 41, 59, 0.6) !important;
    border: 1px solid rgba(139, 92, 246, 0.3) !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  /* Firefox autofill */
  &:-moz-autofill {
    background-color: rgba(30, 41, 59, 0.6) !important;
    color: #f1f5f9 !important;
  }

  /* Hide number input spinners */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.875rem;
`;
