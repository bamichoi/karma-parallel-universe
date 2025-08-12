import styled from "styled-components";

interface StepTitleProps {
  title: string;
  description: string;
}

const StepTitle = ({ title, description }: StepTitleProps) => {
  return (
    <StepTitleContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </StepTitleContainer>
  );
};

export default StepTitle;

const StepTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-family: "Noto Serif KR", serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
`;

const Description = styled.p`
  font-family: "Noto Serif KR", serif;
  font-size: 0.75rem;
  color: #94a3b8;
  margin: 0 0 0.75rem 1.7rem;
`;
