import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

interface CustomCalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  isOpen: boolean;
  onClose: () => void;
  maxDate?: string;
}

const CustomCalendar = ({ selectedDate, onDateSelect, isOpen, onClose, maxDate }: CustomCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
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

  if (!isOpen) return null;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const setYear = (newYear: number) => {
    setCurrentDate(new Date(newYear, month, 1));
    setShowYearDropdown(false);
  };

  const setMonth = (newMonth: number) => {
    setCurrentDate(new Date(year, newMonth, 1));
    setShowMonthDropdown(false);
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 100; i <= currentYear; i++) {
      years.push(i);
    }
    return years.reverse();
  };

  const generateMonthOptions = () => {
    return monthNames.map((name, index) => ({ value: index, label: name }));
  };

  const handleDateClick = (day: number) => {
    const date = new Date(year, month, day);
    
    // Check if date is beyond maxDate
    if (maxDate) {
      const maxDateObj = new Date(maxDate);
      if (date > maxDateObj) {
        return; // Don't allow selection of future dates
      }
    }
    
    // Format date manually to avoid timezone issues
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onDateSelect(formattedDate);
    onClose();
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    const selected = new Date(selectedDate);
    return selected.getFullYear() === year && selected.getMonth() === month && selected.getDate() === day;
  };

  const monthNames = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월"
  ];

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  const isFutureDate = (day: number) => {
    if (!maxDate) return false;
    const date = new Date(year, month, day);
    const maxDateObj = new Date(maxDate);
    return date > maxDateObj;
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(<EmptyDay key={`empty-${i}`} />);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isFuture = isFutureDate(day);
      days.push(
        <Day
          key={day}
          onClick={() => !isFuture && handleDateClick(day)}
          $isToday={isToday(day)}
          $isSelected={isSelected(day)}
          $isFuture={isFuture}
          disabled={isFuture}
        >
          {day}
        </Day>
      );
    }
    
    return days;
  };

  return (
    <CalendarContainer ref={calendarRef}>
      <CalendarHeader>
        <NavButton onClick={prevMonth}>
          <ChevronIcon>◀</ChevronIcon>
        </NavButton>
        <HeaderDropdowns>
          <DropdownButton 
            onClick={() => {
              setShowYearDropdown(!showYearDropdown);
              setShowMonthDropdown(false);
            }}
          >
            {year}년 ▼
          </DropdownButton>
          <DropdownButton 
            onClick={() => {
              setShowMonthDropdown(!showMonthDropdown);
              setShowYearDropdown(false);
            }}
          >
            {monthNames[month]} ▼
          </DropdownButton>
        </HeaderDropdowns>
        <NavButton onClick={nextMonth}>
          <ChevronIcon>▶</ChevronIcon>
        </NavButton>
        
        {showYearDropdown && (
          <YearDropdown>
            {generateYearOptions().map(yearOption => (
              <DropdownItem
                key={yearOption}
                onClick={() => setYear(yearOption)}
                $isSelected={yearOption === year}
              >
                {yearOption}년
              </DropdownItem>
            ))}
          </YearDropdown>
        )}
        
        {showMonthDropdown && (
          <MonthDropdown>
            {generateMonthOptions().map(monthOption => (
              <DropdownItem
                key={monthOption.value}
                onClick={() => setMonth(monthOption.value)}
                $isSelected={monthOption.value === month}
              >
                {monthOption.label}
              </DropdownItem>
            ))}
          </MonthDropdown>
        )}
      </CalendarHeader>
      
      <WeekDaysRow>
        {weekDays.map(day => (
          <WeekDay key={day}>{day}</WeekDay>
        ))}
      </WeekDaysRow>
      
      <CalendarGrid>
        {renderCalendarDays()}
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default CustomCalendar;

const CalendarContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  min-width: 280px;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;

  &:hover {
    background: rgba(139, 92, 246, 0.2);
  }
`;

const ChevronIcon = styled.span`
  color: #8b5cf6;
  font-size: 0.875rem;
  font-weight: 600;
  
  &:hover {
    color: #a78bfa;
  }
`;

const HeaderDropdowns = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const DropdownButton = styled.button`
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 6px;
  color: #f1f5f9;
  font-family: "Noto Serif KR", serif;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(139, 92, 246, 0.3);
    border-color: #8b5cf6;
  }
`;

const YearDropdown = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  z-index: 1001;
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  min-width: 80px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(71, 85, 105, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.5);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(139, 92, 246, 0.7);
  }
`;

const MonthDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
  z-index: 1001;
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  min-width: 70px;
`;

const DropdownItem = styled.div<{ $isSelected: boolean }>`
  padding: 0.5rem 0.75rem;
  color: #f1f5f9;
  font-family: "Noto Serif KR", serif;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$isSelected ? 'rgba(139, 92, 246, 0.3)' : 'transparent'};
  
  &:hover {
    background: rgba(139, 92, 246, 0.4);
    color: #a78bfa;
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(139, 92, 246, 0.1);
  }

  ${props => props.$isSelected && `
    color: #a78bfa;
    font-weight: 600;
  `}
`;


const WeekDaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 0.5rem;
`;

const WeekDay = styled.div`
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: #94a3b8;
  padding: 0.5rem 0;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

const EmptyDay = styled.div`
  height: 32px;
`;

const Day = styled.button<{ $isToday: boolean; $isSelected: boolean; $isFuture?: boolean }>`
  height: 32px;
  border: none;
  background: ${props => 
    props.$isFuture
      ? "transparent"
      : props.$isSelected 
      ? "linear-gradient(135deg, #8b5cf6, #7c3aed)"
      : props.$isToday 
      ? "rgba(139, 92, 246, 0.2)"
      : "transparent"
  };
  color: ${props => 
    props.$isFuture
      ? "rgba(148, 163, 184, 0.3)"
      : props.$isSelected 
      ? "#ffffff"
      : props.$isToday 
      ? "#8b5cf6"
      : "#f1f5f9"
  };
  border-radius: 6px;
  cursor: ${props => props.$isFuture ? "not-allowed" : "pointer"};
  font-size: 0.875rem;
  font-family: "Noto Serif KR", serif;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => 
      props.$isFuture 
        ? "transparent"
        : props.$isSelected 
        ? "linear-gradient(135deg, #7c3aed, #6d28d9)"
        : "rgba(139, 92, 246, 0.3)"
    };
    transform: ${props => 
      props.$isFuture 
        ? "none" 
        : props.$isSelected 
        ? "none" 
        : "scale(1.1)"
    };
  }

  &:active {
    transform: ${props => props.$isFuture ? "none" : "scale(0.95)"};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;