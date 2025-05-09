import React from 'react';
import Button from './Button';
import styled from '@emotion/styled';

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
              <span>Poäng: {score}</span>
            </div>
            <div>
              <span>Bästa resultat: {highScore}</span>
            </div>
          </div>
          
          <div>
            <p>{getResultMessage()}</p>
          </div>
          
          <Button onClick={onRestart}>
            Spela igen
          </Button>
        </div>
    );
}