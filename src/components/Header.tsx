import styled from "styled-components";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(139, 92, 246, 0.3);
  padding: 1.5rem 2rem;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Title = styled.h1`
  font-family: 'Noto Serif KR', serif;
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0;
  color: #f1f5f9;
  text-align: center;
  text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
  letter-spacing: 0.025em;
`;