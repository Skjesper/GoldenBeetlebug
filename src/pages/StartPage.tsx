import { Link } from 'react-router-dom';

import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';


const StartContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #b69191;

  @media (orientation: landscape) {
    background: #c76565;
    flex-direction: row;
  }
`;

const StyledH1 = styled.h1`
  font-size: 2rem;
  font-weight: 300;
  color: #384e56;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 8rem 3rem;
  text-align: center;
  
  @media (orientation: landscape) {
    display: none;
  }
`;

 function StartPage() {
  return (
    
      <StartContainer>
        <StyledH1>Vrid skärmen till liggande läge</StyledH1>
      <Link to="/runesbeachclub">
        <button>Start Game</button>
      </Link>
      </StartContainer>
    
  );
};

export default StartPage;
