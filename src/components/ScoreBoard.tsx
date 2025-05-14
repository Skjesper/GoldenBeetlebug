import react from 'react';
import styled from '@emotion/styled';


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
    highScore?: number;
    onScorePoint?: () => void;

}
export default function Scoreboard({ 
    score, 
    // highScore, 
    onScorePoint 
  }: ScoreboardProps) {

    return (
        <ScoreContainer>
        <ScoreText>
          {score}p
        </ScoreText>
       
        <h2>
            {/* Rekord: <span>{highScore}</span> */}
        </h2>
      

        </ScoreContainer>
    )

}