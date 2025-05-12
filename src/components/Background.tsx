import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import backgroundImage from './../assets/backgroundImages/game_background.png'

interface BackgroundProps {
  children: ReactNode;
  maxWidth?: string;
  maxHeight?: string;
  blurred?: boolean;
  className?: string;
}

const BackgroundDiv = styled.div<{ maxWidth?: string; maxHeight?: string; blurred?: boolean }>`
    position: relative;
    width: 100%;
    height: 100%;
    
    
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url(${backgroundImage});
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

function Background({ 
    children, 
    maxWidth, 
    maxHeight, 
    blurred = false,
    className = '' // Lägg till denna parameter med default-värde
  }: BackgroundProps) {
      return (
          <BackgroundDiv 
            maxWidth={maxWidth} 
            maxHeight={maxHeight} 
            blurred={blurred}
            className={className} // Skicka vidare className
          >
              {children}
          </BackgroundDiv>
      );
  };
    
  export default Background;