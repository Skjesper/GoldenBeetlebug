import React from 'react';

interface EndScreenProps {
    score: number;
    highScore: number;
    onRestart: () => void;
}

export default function EndScreen({ score, highScore, onRestart }: EndScreenProps) {
    const getResultMessage = () => {
        if (score >= highScore && highScore > 0) return "Nytt rekord!";
        if (score > 0) return "Bra spelat!";
        return "Försök igen!";
    };

    return (
        <div>
          <h1>Spelet är slut!</h1>
          
          <div>
            <h2>Ditt resultat</h2>
            <div>
              <span>Poäng: </span>
              <span>{score}</span>
            </div>
            <div>
              <span>Bästa resultat: </span>
              <span>{highScore}</span>
            </div>
          </div>
          
          <div>
            <p>{getResultMessage()}</p>
          </div>
          
          <button onClick={onRestart}>
            Spela igen
          </button>
        </div>
    );
}