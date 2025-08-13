import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const Layout = () => {
  const getHeaderTitle = () => {
    return "KARMA's PARALLEL UNIVERSE";
  };

  return (
    <Container>
      <MobileContainer>
        <Header title={getHeaderTitle()} />
        <MainContent>
          <Outlet />
        </MainContent>
        <Footer>© 2025 Beomseok Choi, All rights reserved.</Footer>
      </MobileContainer>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const MobileContainer = styled.div`
  width: 100%;
  max-width: 448px;
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  color: #e2e8f0;
`;

const Footer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 0.5rem;
  padding: 0.5rem;
`;
