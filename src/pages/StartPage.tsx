import { Link } from 'react-router-dom';
// import GameStart from './../components/GameStart'
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';

interface StartContainerProps {
  isLandscape: boolean;
}

const StartContainer = styled.div<StartContainerProps>`
  display: flex;
  flex-direction: ${(props) => (props.isLandscape ? 'row' : 'column')};
  height: 100vh;
  background-color: ${(props) => (props.isLandscape ? '#c76565' : '#b69a9a')};
`;

const StyledH1 = styled.h1`
  font-size: 2rem;
  font-weight: 300;
  color: #466772;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 8rem 3rem;
  
  @media (orientation: landscape) {
    display: none;
  }
`;

const StartPage: React.FC = () => {
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
    
      <StartContainer isLandscape={isLandscape}>
        <StyledH1>Vrid skärmen till liggande läge</StyledH1>
      
      <Link to="/runesbeachclub">
        <button>Start Game</button>
      </Link>
      </StartContainer>
    
  );
};

export default StartPage;
