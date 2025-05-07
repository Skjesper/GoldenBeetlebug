import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import backgroundImage from './../assets/backgroundImages/game_background.png';

interface WindowProps {
    children: ReactNode;
    maxWidth?: string;
    maxHeight?: string;
  }

  const WindowContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 20px;
`;

function Window({ children, maxWidth, maxHeight }: WindowProps) {
  return (
    <WindowContainer>
      <WindowContent maxWidth={maxWidth} maxHeight={maxHeight}>
        {children}
      </WindowContent>
    </WindowContainer>
  );
}

export default Window;