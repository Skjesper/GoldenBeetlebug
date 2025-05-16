
import Button from './Button';
import styled from '@emotion/styled';

interface EndScreenProps {
    score: number;
    highScore: number;
}

const Container = styled.div`
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--background);
  /* width: 34.25rem;
  height: 18.625rem; */
  border-radius: 20px;
  gap: 1rem;

`;

const ScoreItem = styled.h3`

  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap:3rem;

`;

const ButtonContainer = styled.div`

  display: flex;
  flex-direction: row;
  gap: 1rem;
`;



export default function EndScreen({ score, highScore }: EndScreenProps) {
    const getResultMessage = () => {
        if (score >= highScore && highScore > 0) return "Nytt rekord!";
        if (score > 0) return "Bra spelat!";
        return "Försök igen!";
    };

    return (
        <Container>
          <h1>Game Over</h1>
        
            <ScoreItem>
              <h3>Resultat: {score}</h3>
              <h3>High Score: {highScore}</h3>
            </ScoreItem>
         
          
          
            <h5>{getResultMessage()}</h5>
          
          <ButtonContainer>
            <Button to="/leaderboard">
              Spara resultat
            </Button>
          </ButtonContainer>
        </Container>
    );
}