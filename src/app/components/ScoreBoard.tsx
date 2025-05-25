'use client'
import styled from '@emotion/styled';
import { useHighScore } from './useHighScore';


const ScoreContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  color: white;
  text-shadow: 
        -1px -1px 0 black,
        1px -1.2px 0 black,
        -1px 1px 0 black,
        1px 1px 0 black;
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

