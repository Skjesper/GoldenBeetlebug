import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import backgroundImage from './../assets/backgroundImages/game_background.png'

interface BackgroundProps {
  children: ReactNode;
  maxWidth?: string;
  maxHeight?: string;
  blurred?: boolean;
  backgroundImage?: string; 
}

const BackgroundDiv = styled.div<{ maxWidth?: string; maxHeight?: string; blurred?: boolean; backgroundImage?: string }>`
    position: relative;
    width: 100%;
    height: 100%;
    max-width: ${props => props.maxWidth || '1200px'};
    max-height: ${props => props.maxHeight || '80vh'};
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url(${props => props.backgroundImage || backgroundImage});
      background-size: cover;
      background-position: center;
      filter: ${props => props.blurred ? 'blur(1px)' : 'none'};
      z-index: -1;
    }


    @media (orientation: landscape) and (max-width: 1024px) {
        aspect-ratio: 16 / 9;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        border-radius: 0;
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

function Background({ children, maxWidth, maxHeight, blurred = false, backgroundImage }: BackgroundProps) {
    return (
        <BackgroundDiv maxWidth={maxWidth} maxHeight={maxHeight} blurred={blurred} backgroundImage={backgroundImage}>
            {children}
        </BackgroundDiv>
    );
};
  
export default Background;