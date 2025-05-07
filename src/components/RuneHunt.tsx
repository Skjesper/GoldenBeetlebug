import react, { useState, useEffect } from 'react';

import Timer from "./Timer";



export default function RuneHunt () {

    const [gameRunning, setGameRunning] = useState<boolean>(false);

    const handleTimeOut = () => {
        console.log("Times up");
        setGameRunning(false);
    }

    const startGame = () => {
        setGameRunning(true);
      };

    return (
        <div>
        <Timer 
        initialTime={30} 
        isRunning={gameRunning} 
        onTimeOut={handleTimeOut}
        countDown={true}
      />
        <h1>Detta är en H1</h1>
      

        <button onClick={startGame}>
            {gameRunning ? "Pågår..." : "Starta spelet"}
        </button>
        </div>
    )


}

