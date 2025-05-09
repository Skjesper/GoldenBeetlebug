import React, { useState, useEffect } from 'react';
import Timer from "./Timer";
import Scoreboard from './ScoreBoard';
import EndScreen from './EndScreen';
import StageSelect from './StageSelect';

import backgroundImage1 from './../assets/backgroundImages/game_background.png'
import backgroundImage2 from './../assets/backgroundImages/dessert_bg.png'
import backgroundImage3 from './../assets/backgroundImages/forest_bg.png'
import backgroundImage4 from './../assets/backgroundImages/winter_bg.png'

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

    const StageSelectMode: boolean = !gameOver && !gameRunning;

    const stageImages = [
      {
        id: 1,
        src: backgroundImage1, 
        alt: "Beachclub stage"
      },
      {
        id: 2,
        src: backgroundImage2,
        alt: "Dessert stage"
      },
      {
        id: 3,
        src: backgroundImage3,
        alt: "Forest stage"
      },
      {
        id: 4,
        src: backgroundImage4,
        alt: "Winter stage"
      }
    ];

    return (
        <div>
          {StageSelectMode && (
            <StageSelect images={stageImages} />
          )}

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
                <EndScreen 
                    score={score}
                    highScore={highScore}
                    onRestart={startGame}
                />
            )}
        </div>
    );
}