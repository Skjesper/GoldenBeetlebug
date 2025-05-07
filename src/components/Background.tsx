import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import backgroundImage from './../assets/backgroundImages/game_background.png'

interface BackgroundProps {
  children: ReactNode;
  maxWidth?: string;
  maxHeight?: string;
}

const BackgroundDiv = styled.div<{ maxWidth?: string; maxHeight?: string }>`
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
        background-color: rgba(255, 105, 180, 0.9);
        color: white;
        font-size: 1.5rem;
        text-align: center;
        z-index: 100;
        }
    }
`;

function Background({ children, maxWidth, maxHeight }: BackgroundProps) {
    return (
        <BackgroundDiv maxWidth={maxWidth} maxHeight={maxHeight}>
            {children}
        </BackgroundDiv>
    );
};
  
  export default Background;