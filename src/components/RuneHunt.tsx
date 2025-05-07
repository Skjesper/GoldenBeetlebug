import react, { useState, useEffect } from 'react';

import Timer from "./Timer";
import Scoreboard from './ScoreBoard';



export default function RuneHunt () {

    const [gameRunning, setGameRunning] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [highscore, setHighscore] = useState<number>(0);

    const handleTimeOut = () => {
        console.log("Times up");
        setGameRunning(false);
    }

    const startGame = () => {
        setGameRunning(true);
      };

    

    return (
        <div>

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
        </div>
    )


}

