import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';

interface GameContainerProps {
  isLandscape: boolean;
}

const GameContainer = styled.div<GameContainerProps>`
  display: flex;
  flex-direction: ${props => props.isLandscape ? 'row' : 'column'};
  height: 100vh;
  background-color: ${props => props.isLandscape ? '#c76565' : '#101010'};
`;

const Game: React.FC = () => {
  const [isLandscape, setIsLandscape] = useState<boolean>(window.innerWidth > window.innerHeight);
  
  useEffect(() => {
    const handleResize = (): void => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);
  
  return (
    <GameContainer isLandscape={isLandscape}>
      Spelinnehåll
    </GameContainer>
  );
};

export default Game;