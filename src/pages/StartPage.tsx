import { Link } from 'react-router-dom';
import backgroundImage from './../assets/backgroundImages/game_background.png';
import Button from './../components/Button';
import styled from '@emotion/styled';
import Background from '../components/Background';

const StartContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #b69191;

  @media (orientation: landscape) {
    background: transparent; 
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
    <>
    <Background/>
      <StartContainer>
        <StyledH1>Vrid skärmen till liggande läge</StyledH1>
      <Button to="/runesbeachclub">Starta</Button>
      </StartContainer>
    </>
  );
};

export default StartPage;
