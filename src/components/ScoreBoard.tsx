import react from 'react';

interface ScoreboardProps {

    score: number;
    highScore: number;
    onScorePoint?: () => void;

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
        <button 
          onClick={onScorePoint}
          className="score-button"
        >
          Få poäng (simulering)
        </button>
      )}

        </div>
    )

}