'use client'
import { useState, useEffect, useCallback } from 'react';
import Timer from "./Timer";
import Scoreboard from './ScoreBoard';
import EndScreen from './EndScreen';
import StageSelect from './StageSelect';
import RuneHuntGame from './RuneHunt/RuneHuntGame';
import Rune from './RuneHunt/Rune';
import BackgroundMusic from './BackgroundMusic';
import styled from '@emotion/styled';

const backgroundImage1 = '/assets/backgroundImages/beachclub1.png'
const backgroundImage2 = '/assets/backgroundImages/coachella1.png'
const backgroundImage3 = '/assets/backgroundImages/skogsrave1.png'
const backgroundImage4 = '/assets/backgroundImages/afterski3.png'

const GameScreenContainer = styled.section`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
`;

const GameContent = styled.div`
    display: flex;
    flex: 1;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 75%;
    height: 75%;
`;

const GameBackground = styled.div<{ backgroundImage?: string }>`
    position: absolute;

    /* top: 0;
    left: 0;
    right: 0; */
    margin: 0 auto;
    width: 90%;
    height: 100%;
    background-image: ${props => props.backgroundImage ? `url(${props.backgroundImage})` : 'none'};
    background-size: cover;
    background-position: center;
    z-index: 0;
    border-radius: 20px;
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 5;
`;

const CountdownNumber = styled.h2`
    font-size: 8rem; 
    color: white;
    font-weight: bold; 
    animation: pulse 1s infinite;
    text-shadow: 
        -2px -2px 0 black,
        2px -2px 0 black,
        -2px 2px 0 black,
        2px 2px 0 black;
    
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

     @media (orientation: landscape) and (min-width: 1100px) {
        font-size: 20rem;

    } 
`;

const SoundOnText = styled.p`
    font-size: 2rem;
    font-weight: var(--weight-bold);
    color: white;
    padding-top: 1.5rem;
    text-shadow: 
        -1.2px -1.2px 0 black,
        1.2px -1.2px 0 black,
        -1.2px 1.2px 0 black,
        1.2px 1.2px 0 black;

        @media (orientation: landscape) and (min-width: 1100px) {
        font-size: 3rem;

    } 
;`

const FixedUI = styled.div`
    position: absolute;
    padding: 1rem;
    top: 0;
    display: flex;
    width: 90%;
    justify-content: space-between;
    pointer-events: none;
    color: white;
    text-shadow: 
        -1px -1px 0 black,
        1px -1.2px 0 black,
        -1px 1px 0 black,
        1px 1px 0 black;
    
    z-index: 5;
`;

    const EndScreenWrapper = styled.div`
    position: relative;
    z-index: 15;
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

    const gameplayMusic = 'assets/audio/denLillaRödaPandan.mp3';

    const handleTimeOut = useCallback(() => {
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

    const handleScore = useCallback((rune?: Rune) => {
        if (gameRunning) {
          if (rune && rune.props.isBad) {
            // Om det är en dålig rune, subtrahera 25 poäng
            setScore(prevScore => prevScore - 25);
          } else {
            // Om det är en bra rune eller ingen rune angavs, lägg till 10 poäng
            setScore(prevScore => prevScore + 10);
          }
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
                                initialTime={5} 
                                isRunning={gameRunning} 
                                onTimeOut={handleTimeOut}
                                countDown={true}
                            />
                            <Scoreboard 
                                score={score} 
                                // highScore={highScore}
                                // onScorePoint={handleScore}
                            />
                        </FixedUI>

                     
                        <RuneHuntGame
                            width="90%" 
                            height="100%"
                            backgroundColor="transparent"
                            // backgroundImage={selectedBackground}
                            numRunes={8}
                            isActive={gameRunning} 
                            onRuneClick={handleScore}
                        />
                        
                        {countdown > 0 && (
                            <CountdownContainer className='countdownContainer'>
                                <SoundOnText>SOUND ON</SoundOnText>
                                <CountdownNumber>{countdown}</CountdownNumber>
                            </CountdownContainer>
                        )}
                        
                    </GameContent>
                </GameScreenContainer>
            ) : (
                <EndScreenContainer>
                    <GameBackground backgroundImage={selectedBackground} 
                    style={{ width: '100%' }}/>
                    <EndScreenWrapper>
                        <EndScreen score={score} />
                    </EndScreenWrapper>
                </EndScreenContainer>
            )}
        </div>
    );
}
