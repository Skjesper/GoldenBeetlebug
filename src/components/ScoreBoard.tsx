import react from 'react';
import Rune from './Rune';

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
        <div>
        <h2>
            Poäng
        </h2>
        <p>{score}</p>
        <h2>
            Rekord
        </h2>
        <p>{highScore}</p>

        {onScorePoint && (
          <Rune onClick={onScorePoint} startPosition={getRandomNumber(1, 2)} bounceHeight={getRandomNumber(10, 90)} firstTurn={getRandomDirection()} secondTurn={getRandomDirection()} thirdTurn={getRandomDirection()} time={getRandomNumber(3,6)}></Rune>

      )}
        {onScorePoint && (
          <Rune onClick={onScorePoint} startPosition={getRandomNumber(1, 2)} bounceHeight={getRandomNumber(300, 500)} firstTurn={getRandomDirection()} secondTurn={getRandomDirection()} thirdTurn={getRandomDirection()} time={getRandomNumber(3,6)}></Rune>

      )}

        </div>
    )

}