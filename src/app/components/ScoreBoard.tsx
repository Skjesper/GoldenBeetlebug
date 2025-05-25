'use client'
import styled from '@emotion/styled';
import { useHighScore } from './useHighScore';


const ScoreContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  
`;

const ScoreText = styled.h2`
  text-align: center;
`;

interface ScoreboardProps {
  score: number;
  showHighScore?: boolean;
}

export default function Scoreboard({ score, showHighScore = true }: ScoreboardProps) {
  const { highestScore } = useHighScore();

  return (
    <ScoreContainer>
      <ScoreText>
        {score}p
      </ScoreText>
      {showHighScore && (
        <ScoreText>
          {highestScore}p
        </ScoreText>
      )}
    </ScoreContainer>
  )
}

