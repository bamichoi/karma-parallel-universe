import { useState } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import type { UniverseFormData } from "../../types/form";
import CustomCalendar from "./CustomCalendar";
import { useTranslation } from "react-i18next";

interface DateInputProps {
  name: keyof UniverseFormData;
  label: string;
  required?: boolean;
  id?: string;
  maxDate?: string;
}

const DateInput = ({
  name,
  label,
  required = false,
  id,
  maxDate,
}: DateInputProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<UniverseFormData>();
  const { t } = useTranslation();
  const fieldId = id || name.toString();
  const error = errors[name];
  const selectedDate = watch(name as keyof UniverseFormData) as string;

  const handleDateSelect = (date: string) => {
    setValue(name, date);
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return t("common.dateFormat", {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
  };

  return (
    <FormGroup>
      <Label htmlFor={fieldId}>{label}</Label>
      <InputContainer>
        <Input
          id={fieldId}
          type="text"
          readOnly
          placeholder={t("form.birthdayPlaceholder")}
          value={formatDisplayDate(selectedDate)}
          onClick={() => setIsCalendarOpen(true)}
          {...register(name, {
            required: required ? t("error.requiredFill", { label }) : false,
          })}
        />
        <CalendarIcon onClick={() => setIsCalendarOpen(true)}>📅</CalendarIcon>
        <CustomCalendar
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          isOpen={isCalendarOpen}
          onClose={() => setIsCalendarOpen(false)}
          maxDate={maxDate}
        />
      </InputContainer>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </FormGroup>
  );
};

export default DateInput;

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

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  color: #f1f5f9;
  font-family: "Noto Serif KR", serif;
  cursor: pointer;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
    background: rgba(30, 41, 59, 0.8);
  }

  &:hover {
    border-color: #8b5cf6;
  }
`;

const CalendarIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-50%) scale(1.1);
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.875rem;
`;
