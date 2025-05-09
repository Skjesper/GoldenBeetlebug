import react from 'react';
import styled from '@emotion/styled';
import Rune from './Rune';

const ScoreContainer = styled.section`

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

`;
interface ScoreboardProps {

    score: number;
    highScore: number;
    onScorePoint?: () => void;

}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDirection(): string {
  return Math.random() < 0.5 ? "translateX" : "translateY";
}


export default function Scoreboard({ 
    score, 
    highScore, 
    onScorePoint 
  }: ScoreboardProps) {

    return (
        <ScoreContainer>
        <h2>
            Poäng: <span>{score}</span>
        </h2>
       
        <h2>
            Rekord: <span>{highScore}</span>
        </h2>
       

        {/* {onScorePoint && (
          <Rune onClick={onScorePoint} startPosition={getRandomNumber(1, 2)} bounceHeight={getRandomNumber(10, 90)} firstTurn={getRandomDirection()} secondTurn={getRandomDirection()} thirdTurn={getRandomDirection()} time={getRandomNumber(3,6)}></Rune>

      )}
        {onScorePoint && (
          <Rune onClick={onScorePoint} startPosition={getRandomNumber(1, 2)} bounceHeight={getRandomNumber(300, 500)} firstTurn={getRandomDirection()} secondTurn={getRandomDirection()} thirdTurn={getRandomDirection()} time={getRandomNumber(3,6)}></Rune>

      )} */}

        </ScoreContainer>
    )

}