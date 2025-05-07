import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import backgroundImage from './../assets/backgroundImages/game_background.png';

interface WindowProps {
    children: ReactNode;
    maxWidth?: string;
    maxHeight?: string;
  }

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