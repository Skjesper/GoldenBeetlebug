import React, { useState, useEffect } from 'react';
import Timer from "./Timer";
import Scoreboard from './ScoreBoard';
import EndScreen from './EndScreen';

export default function RuneHunt() {
    const [gameRunning, setGameRunning] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [highScore, setHighscore] = useState<number>(0);

    const handleTimeOut = () => {
        console.log("Times up");
        setGameRunning(false);
        setGameOver(true);
    }

    const startGame = () => {
        setGameRunning(true);
        setGameOver(false);
        setScore(0);
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
                            initialTime={30} 
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
                    
                    <button onClick={startGame}>
                        {gameRunning ? "Pågår..." : "Starta spelet"}
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