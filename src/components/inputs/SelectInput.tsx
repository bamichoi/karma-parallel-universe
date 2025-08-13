import { useState } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import type { UniverseFormData } from "../../types/form";
import CustomDropdown from "./CustomDropdown";
import { useTranslation } from "react-i18next";

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  name: keyof UniverseFormData;
  label: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  id?: string;
}

const SelectInput = ({
  name,
  label,
  options,
  placeholder,
  required = false,
  id,
}: SelectInputProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<UniverseFormData>();
  const { t } = useTranslation();

  const fieldId = id || name.toString();
  const error = errors[name];
  const selectedValue = watch(name as keyof UniverseFormData) as string;

  const handleSelect = (value: string) => {
    setValue(name, value);
  };

  return (
    <FormGroup>
      <Label htmlFor={fieldId}>{label}</Label>
      <input
        id={fieldId}
        type="hidden"
        {...register(name, {
          required: required ? t("error.requiredSelect", { label }) : false,
        })}
      />
      <CustomDropdown
        options={options}
        selectedValue={selectedValue}
        onSelect={handleSelect}
        placeholder={placeholder}
        isOpen={isDropdownOpen}
        onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
        onClose={() => setIsDropdownOpen(false)}
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </FormGroup>
  );
};

export default SelectInput;

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

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.875rem;
`;
