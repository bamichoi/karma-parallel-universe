import { useRef, useEffect } from "react";
import styled from "styled-components";

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const CustomDropdown = ({
  options,
  selectedValue,
  onSelect,
  placeholder,
  isOpen,
  onToggle,
  onClose,
}: CustomDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  const handleOptionClick = (value: string) => {
    onSelect(value);
    onClose();
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownTrigger onClick={onToggle} $isOpen={isOpen}>
        <SelectedText $hasValue={!!selectedOption}>
          {selectedOption ? selectedOption.label : placeholder}
        </SelectedText>
        <ArrowIcon $isOpen={isOpen}>▼</ArrowIcon>
      </DropdownTrigger>

      {isOpen && (
        <DropdownMenu>
          {options.map((option) => (
            <DropdownOption
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              $isSelected={option.value === selectedValue}
            >
              {option.label}
            </DropdownOption>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default CustomDropdown;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownTrigger = styled.div<{ $isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  color: #f1f5f9;
  font-family: "Noto Serif KR", serif;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #8b5cf6;
    background: rgba(30, 41, 59, 0.8);
  }

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
    background: rgba(30, 41, 59, 0.8);
  }

  ${(props) =>
    props.$isOpen &&
    `
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
    background: rgba(30, 41, 59, 0.8);
  `}
`;

const SelectedText = styled.span<{ $hasValue: boolean }>`
  color: ${(props) => (props.$hasValue ? "#f1f5f9" : "#94a3b8")};
`;

const ArrowIcon = styled.span<{ $isOpen: boolean }>`
  color: #8b5cf6;
  font-size: 0.75rem;
  transition: transform 0.2s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 8px;
  margin-top: 0.25rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  overflow: hidden;
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DropdownOption = styled.div<{ $isSelected: boolean }>`
  padding: 0.75rem 1rem;
  color: #f1f5f9;
  font-family: "Noto Serif KR", serif;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(props) =>
    props.$isSelected ? "rgba(139, 92, 246, 0.2)" : "transparent"};

  &:hover {
    background: rgba(139, 92, 246, 0.3);
    color: #a78bfa;
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(139, 92, 246, 0.1);
  }

  ${(props) =>
    props.$isSelected &&
    `
    color: #a78bfa;
    font-weight: 500;
  `}
`;
