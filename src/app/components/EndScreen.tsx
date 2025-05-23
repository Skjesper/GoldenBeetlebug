'use client'
import Button from './Button';
import styled from '@emotion/styled';
import { useHighScore } from './useHighScore';
import WinnerRewards from '../services/WinnerRewards';
interface EndScreenProps {
    score: number;
    highestScore?: number;
}


const Container = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--background);
  border-radius: 20px;
  gap: 1rem;

`;

const ScoreItem = styled.div`
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

interface WinnerRewardsProps {
  onRewardClaimed: () => void;
}

export default function EndScreen({ score }: EndScreenProps) {
  const { highestScore } = useHighScore();

    const getResultMessage = () => {
        if (score >= highestScore && highestScore > 0) return "Grymt spelat! Nytt rekord!";
        if (score > 300) return "Grattis du vann! Bra spelat! ";
        console.log(highestScore)
        return "Bättre lycka nästa gång!";
    };

    return (
        <Container>
          <h1>Game Over</h1>
        
            <ScoreItem>
              <h3>Resultat: {score}</h3>
              <h3>High Score: {highestScore}</h3>
            </ScoreItem>
         
          
          
            <h5>{getResultMessage()}</h5>
          
          <ButtonContainer>
            <Button to="/leaderboard">
              Spara resultat
            </Button>
          </ButtonContainer>

           <WinnerRewards onRewardClaimed={() => {}} score={score}/>

  
        </Container>
    );
}