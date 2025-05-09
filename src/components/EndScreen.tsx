import React from 'react';
import Button from './Button';
import styled from '@emotion/styled';

interface EndScreenProps {
    score: number;
    highScore: number;
    onRestart: () => void;
}

const Container = styled.div`
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #717070;
  width: 34.25rem;
  height: 18.625rem;
  border-radius: 20px;
  gap: 1rem;

`;


const Title = styled.h2`
  font-size: 3rem;

`;

const ScoreContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

`;

const ScoreItem = styled.h3`

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

`;

const ButtonContainer = styled.div`

  display: flex;
  flex-direction: row;
  gap: 1rem;
`;



export default function EndScreen({ score, highScore, onRestart }: EndScreenProps) {
    const getResultMessage = () => {
        if (score >= highScore && highScore > 0) return "Nytt rekord!";
        if (score > 0) return "Bra spelat!";
        return "Försök igen!";
    };

    return (
        <Container>
          <Title>Spelet är slut!</Title>
          
          
          <ScoreContainer>
            <h2>Ditt resultat</h2>
            <div>
            <ScoreItem>
              <span>Poäng: {score}</span>
            </ScoreItem>
              
            </div>
            <ScoreItem>
              <span>Bästa resultat: {highScore}</span>
            </ScoreItem>
          </ScoreContainer>
          
          <div>
            <p>{getResultMessage()}</p>
          </div>
          <ButtonContainer>
            <Button onClick={onRestart}>
              Spela igen
            </Button>
            <Button to="/runehunt/leaderboard">
              Leaderboard
            </Button>
          </ButtonContainer>
        </Container>
    );
}