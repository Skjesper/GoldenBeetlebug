import { useState, useEffect, useCallback } from 'react';
import Timer from "./Timer";
import Scoreboard from './ScoreBoard';
import EndScreen from './EndScreen';
import StageSelect from './StageSelect';
import RuneHuntGame from './RuneHunt/RuneHuntGame';

import backgroundImage1 from './../assets/backgroundImages/game_background.png'
import backgroundImage2 from './../assets/backgroundImages/dessert_bg.png'
import backgroundImage3 from './../assets/backgroundImages/forest_bg.png'
import backgroundImage4 from './../assets/backgroundImages/winter_bg.png'
import styled from '@emotion/styled';

const GameScreenContainer = styled.section`
    height: 100%;
    width: 100vw;
    display: flex;
    justify-content: center;
   
    /* padding: 0 0.5rem;
    
    @media (min-width: 768px) {
        padding: 1.5rem 1rem;
    } */
`;

const GameContent = styled.div`
    display: flex;
    flex: 1;
    position: relative;
    justify-content: center;

    /* margin-top: -4.4rem; */
    width: 100vw;
    height: 100%;
`;

const EndScreenContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
`;

const CountdownContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
`;

const CountdownNumber = styled.h2`
    font-size: 25rem; 
    color: #000000;
    font-weight: bold;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5); 
    animation: pulse 1s infinite; 
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.3);
        }
        100% {
            transform: scale(1);
        }
    }

    @media (min-width: 768px) {
        font-size: 35rem;
    }
`;

const GameHeader = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 1rem;
`;

interface RuneHuntProps {
    onBackgroundChange?: (backgroundImage: string) => void;
    onGameOver?: (finalScore: number) => void; 
}

export default function RuneHunt({ onBackgroundChange, onGameOver }: RuneHuntProps) {
    const [gameRunning, setGameRunning] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [countdown, setCountDown] = useState<number>(0);
    const [start, setStart] = useState<boolean>(false);
    
    const [score, setScore] = useState<number>(0);
    const [highScore, setHighscore] = useState<number>(0);
    
    // Ny state för att spåra den valda bakgrundsbilden
    const [selectedBackground, setSelectedBackground] = useState<string | undefined>(undefined);

    const handleTimeOut = useCallback(() => {
        console.log("Times up");
        localStorage.setItem('gameScore', score.toString());
        setGameRunning(false);
        setGameOver(true);

        if (onGameOver) {
            onGameOver(score);
        }
    }, [score, onGameOver]);

    function startGame() {
        setStart(true);
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
    }

    useEffect(() => {
        if (score > highScore) {
            setHighscore(score);
        }
    }, [score, highScore]);

    const handleScore = useCallback(() => {
        if (gameRunning) {
            setScore(prevScore => prevScore + 10);
        }
    }, [gameRunning]);

    const handleStageSelect = (selectedId: number) => {
        const selectedStage = stageImages.find(stage => stage.id === selectedId);
        if (selectedStage) {
            // Uppdatera den lokala staten för bakgrundsbild
            setSelectedBackground(selectedStage.src);
            
            // Anropa callback om den finns (för att skicka till föräldrakomponent)
            if (onBackgroundChange) {
                onBackgroundChange(selectedStage.src);
            }
        }
    };

    const StageSelectMode: boolean = !gameOver && !start;

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
                <EndScreenContainer>
                    <StageSelect 
                        images={stageImages} 
                        startGame={startGame} 
                        onStageSelect={handleStageSelect} 
                    />
                </EndScreenContainer>
            )}

            {!gameOver ? (
                <GameScreenContainer className='gameContainer'>
                     {/* <GameHeader>
                        <Timer 
                            initialTime={300} 
                            isRunning={gameRunning} 
                            onTimeOut={handleTimeOut}
                            countDown={true}
                        />
                        
                        <Scoreboard 
                            score={score} 
                            highScore={highScore}
                            onScorePoint={handleScore}
                        />
                    </GameHeader>  */}
                    
                    <GameContent>
                        {/* Använder RuneHuntGame med proportionell canvas och bakgrundsbild */}
                        <RuneHuntGame
                            width="80%" 
                            height="80%"
                            backgroundColor="transparent"
                            backgroundImage={selectedBackground}  // Skicka in den valda bakgrundsbilden
                            numRunes={8}
                            isActive={gameRunning} 
                            onRuneClick={handleScore}
                        />
                        
                        {countdown > 0 && (
                            <CountdownContainer className='countdownContainer'>
                                <CountdownNumber>{countdown}</CountdownNumber>
                            </CountdownContainer>
                        )}
                    </GameContent>
                </GameScreenContainer>
            ) : (
                <EndScreenContainer>
                    <EndScreen 
                        score={score}
                        highScore={highScore}
                    />
                </EndScreenContainer>
            )}
        </div>
    );
}