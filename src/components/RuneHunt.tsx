import React, { useState, useEffect } from 'react';
import Timer from "./Timer";
import Scoreboard from './ScoreBoard';
import EndScreen from './EndScreen';
import styled from '@emotion/styled';


const EndScreenContainer = styled.div`
  /* Täck hela RuneHunt-komponenten */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  /* Centrera EndScreen i mitten */
  display: flex;
  justify-content: center;
  align-items: center;
  
  /* Optional: Lägg till en semi-transparent bakgrund */
  background-color: rgba(0, 0, 0, 0.5);
  
  /* Se till att EndScreen visas ovanpå spelinnehållet */
  z-index: 10;
`;


export default function RuneHunt() {
    const [gameRunning, setGameRunning] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [countdown, setCountDown] = useState<number>(0);
    
    const [score, setScore] = useState<number>(0);
    const [highScore, setHighscore] = useState<number>(0);

    const handleTimeOut = () => {
        console.log("Times up");
        setGameRunning(false);
        setGameOver(true);
    }

    function startGame() {
        setCountDown(3);
        setGameOver(false);
        setScore(0);

        const countdownInterval = setInterval(() => {
            setCountDown(prevCount => {
              if (prevCount <= 1) {
               
                clearInterval(countdownInterval);
                setGameRunning(true);
                return 0;
              }
              return prevCount - 1;
            });
          }, 1000);
    };

    useEffect(() => {
        if (score > highScore) {
            setHighscore(score);
        }
    }, [score, highScore]);

    const handleScore = () => {
        if (gameRunning) {
            setScore(prevScore => prevScore + 10);
        }

    };

    return (
        <div>
            {!gameOver ? (
                <>
                    <div className="game-header">
                        <Timer 
                            initialTime={10} 
                            isRunning={gameRunning} 
                            onTimeOut={handleTimeOut}
                            countDown={true}
                        />
                        
                        <Scoreboard 
                            score={score} 
                            highScore={highScore}
                            onScorePoint={handleScore}
                        />
                    </div>
                    <h1>Detta är en H1</h1>
                    
                   
                    {countdown > 0 && (
                        <div className="countdown-display">
                            <h2 className="countdown-number">{countdown}</h2>
                        </div>
                    )}
                    
                    <button 
                        onClick={startGame}
                        disabled={countdown > 0} 
                    >
                        {gameRunning ? "Pågår..." : countdown > 0 ? `Startar om ${countdown}...` : "Starta spelet"}
                    </button>
                </>
            ) : (
                <EndScreenContainer>
                <EndScreen 
                    score={score}
                    highScore={highScore}
                    onRestart={startGame}
                />
                </EndScreenContainer>
            )}
        </div>
    );
}