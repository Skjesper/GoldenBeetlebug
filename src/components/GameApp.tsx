import { useState, useEffect, useCallback } from 'react';
import Timer from "./Timer";
import Scoreboard from './ScoreBoard';
import EndScreen from './EndScreen';
import StageSelect from './StageSelect';
import RuneHuntGame from './RuneHunt/RuneHuntGame';
import BackgroundMusic from './BackgroundMusic';

import backgroundImage1 from './../assets/backgroundImages/game_background.png'
import backgroundImage2 from './../assets/backgroundImages/dessert_bg.png'
import backgroundImage3 from './../assets/backgroundImages/forest_bg.png'
import backgroundImage4 from './../assets/backgroundImages/winter_bg.png'
import styled from '@emotion/styled';

import gameplayMusic from './../assets/audio/runebeats.mp3';

const GameScreenContainer = styled.section`
    height: 100%;
    width: 100vw;
    display: flex;
    justify-content: center;
`;

const GameContent = styled.div`
    display: flex;
    flex: 1;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

    const GameBackground = styled.div<{ backgroundImage?: string }>`
    position: absolute;
    top: 0;
    left: 0;
     right: 0;
    margin: 0 auto;
    width: 80%;
    height: 100%;
    background-image: ${props => props.backgroundImage ? `url(${props.backgroundImage})` : 'none'};
    background-size: cover;
    background-position: center;
    z-index: 0;
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
        font-size: 18rem;
    }
`;

const FixedUI = styled.div`
    position: absolute;
    padding: 1rem;
    top: 0;
    display: flex;
    width: 80%;
    justify-content: space-between;
    pointer-events: none;
    
    
    z-index: 5;
`;

interface GameAppProps {
    onBackgroundChange?: (backgroundImage: string) => void;
    onGameOver?: (finalScore: number) => void; 
}

export default function GameApp({ onBackgroundChange, onGameOver }: GameAppProps) {
    const [gameRunning, setGameRunning] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [countdown, setCountDown] = useState<number>(0);
    const [start, setStart] = useState<boolean>(false);

    const [score, setScore] = useState<number>(0);
    const [highScore, setHighscore] = useState<number>(0);

    const [selectedBackground, setSelectedBackground] = useState<string | undefined>(undefined);
    
    const [musicPlaying, setMusicPlaying] = useState<boolean>(false);

    const handleTimeOut = useCallback(() => {
        console.log("Times up");
        localStorage.setItem('gameScore', score.toString());
        setGameRunning(false);
        setGameOver(true);
        setMusicPlaying(false);

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
                    setMusicPlaying(true);
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
            setSelectedBackground(selectedStage.src);
            if (onBackgroundChange) {
                onBackgroundChange(selectedStage.src);
            }
        }
    };

    const StageSelectMode: boolean = !gameOver && !start;

    const stageImages = [
        { id: 1, src: backgroundImage1, alt: "Rune på Beach Club" },
        { id: 2, src: backgroundImage2, alt: "Rune på Coachella" },
        { id: 3, src: backgroundImage3, alt: "Rune på Skogsrave" },
        { id: 4, src: backgroundImage4, alt: "Rune på After Ski" }
    ];

    return (
        <div>

            <BackgroundMusic 
                isPlaying={musicPlaying}
                audioSrc={gameplayMusic}
                volume={0.4}
                loop={true}
            />
            
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

                    <GameContent>
                    <GameBackground backgroundImage={selectedBackground} />


                        {/* UI ovanpå canvas */}
                        <FixedUI>
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
                        </FixedUI>

                     
                        <RuneHuntGame
                            width="80%" 
                            height="80%"
                            backgroundColor="transparent"
                            // backgroundImage={selectedBackground}
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
