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

    const WindowContent = styled.div<{ maxWidth?: string; maxHeight?: string }>`
    position: relative;
    width: 100%;
    height: 100%;
    max-width: ${props => props.maxWidth || '1200px'};
    max-height: ${props => props.maxHeight || '80vh'};
    border-radius: 8px;
    overflow: hidden;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;

    @media (orientation: landscape) and (max-width: 1024px) {
        aspect-ratio: 16 / 9;
        height: auto;
        width: 90%;
    }
    
    @media (orientation: portrait) and (max-width: 768px) {
        &:before {
        content: "Vrid skärmen till liggande läge";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.9);
        color: white;
        font-size: 1.5rem;
        text-align: center;
        z-index: 100;
        }
    }

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