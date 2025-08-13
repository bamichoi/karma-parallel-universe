import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import type { UniverseFormData } from "../../types/form";
import { useTranslation } from "react-i18next";

interface TextAreaInputProps {
  name: keyof UniverseFormData;
  label: string;
  placeholder?: string;
  required?: boolean;
  id?: string;
  minLength?: number;
}

const TextAreaInput = ({
  name,
  label,
  placeholder,
  required = false,
  id,
  minLength,
}: TextAreaInputProps) => {
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
      <TextArea
        id={fieldId}
        placeholder={placeholder}
        {...register(name, {
          required: required ? t("error.requiredFill", { label }) : false,
          minLength: minLength
            ? {
                value: minLength,
                message: t("error.minLength", { minLength }),
              }
            : undefined,
        })}
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </FormGroup>
  );
};

export default TextAreaInput;

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

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: "Noto Serif KR", serif;
  color: #f1f5f9;
  line-height: 1.6;
  resize: none;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
    background: rgba(30, 41, 59, 0.8);
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.875rem;
`;
