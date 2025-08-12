import type { ReactNode } from "react";
import styled from "styled-components";

interface SummaryCardProps {
  title: string;
  children: ReactNode;
}

const SummaryCard = ({ title, children }: SummaryCardProps) => {
  return (
    <CardContainer>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </CardContainer>
  );
};

export default SummaryCard;

const CardContainer = styled.div`
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
`;

const SectionTitle = styled.h3`
  font-family: "Noto Serif KR", serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 1rem;
  text-shadow: 0 0 8px rgba(139, 92, 246, 0.3);
`;
