import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from '@emotion/styled';

// Styled components
const GameContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const GameCanvas = styled.canvas`
  cursor: crosshair;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Viktigt: Gör canvas transparent */
  background-color: transparent;
`;

const HUD = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  font-size: 24px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  z-index: 10;
`;

const GameOverScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 20;
`;

const GameOverTitle = styled.h1`
  font-size: 48px;
  margin: 0 0 20px 0;
`;

const GameOverScore = styled.p`
  font-size: 24px;
  margin: 0 0 20px 0;
`;

const GameOverAction = styled.p`
  font-size: 24px;
  margin: 0;
`;

// Interface för anka
interface Duck {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  speedX: number;
  speedY: number;
  alive: boolean;
  color: string;
}

// Props för DuckHunt-komponenten
interface DuckHuntProps {
  onBackgroundChange?: (backgroundImage: string) => void;
}

const DuckHunt: React.FC<DuckHuntProps> = ({ onBackgroundChange }) => {
  // Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const duckIntervalRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  
  // State
  const [ducks, setDucks] = useState<Duck[]>([]);
  const [score, setScore] = useState<number>(0);
  const [ammo, setAmmo] = useState<number>(5);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Skapa en ny anka
  const createDuck = useCallback((): void => {
    const canvas = canvasRef.current;
    if (!canvas || gameOver) return;
    
    const newDuck: Duck = {
      id: Date.now() + Math.random(),
      x: Math.random() * (canvas.width - 50),
      y: canvas.height,
      width: 50,
      height: 50,
      speedX: (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1),
      speedY: -Math.random() * 2 - 2,
      alive: true,
      color: `rgb(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100)})`
    };
    
    setDucks(prevDucks => {
      // Begränsa antalet ankor till 5
      if (prevDucks.length < 5) {
        return [...prevDucks, newDuck];
      }
      return prevDucks;
    });
  }, [gameOver]);

  // Rita anka
  const drawDuck = (ctx: CanvasRenderingContext2D, duck: Duck): void => {
    if (!duck.alive) return;
    
    ctx.fillStyle = duck.color;
    
    // Andens kropp
    ctx.beginPath();
    ctx.ellipse(duck.x + duck.width/2, duck.y + duck.height/2, duck.width/2, duck.height/3, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Andens huvud
    ctx.beginPath();
    ctx.arc(duck.x + duck.width * 0.7 * (duck.speedX > 0 ? 1 : 0.3), duck.y + duck.height * 0.3, duck.width/4, 0, Math.PI * 2);
    ctx.fill();
    
    // Andens näbb
    ctx.fillStyle = '#FF6600';
    ctx.beginPath();
    if (duck.speedX > 0) {
        ctx.moveTo(duck.x + duck.width * 0.9, duck.y + duck.height * 0.3);
        ctx.lineTo(duck.x + duck.width * 1.1, duck.y + duck.height * 0.4);
        ctx.lineTo(duck.x + duck.width * 0.9, duck.y + duck.height * 0.5);
    } else {
        ctx.moveTo(duck.x + duck.width * 0.1, duck.y + duck.height * 0.3);
        ctx.lineTo(duck.x - duck.width * 0.1, duck.y + duck.height * 0.4);
        ctx.lineTo(duck.x + duck.width * 0.1, duck.y + duck.height * 0.5);
    }
    ctx.fill();
    
    // Andens vingar
    ctx.fillStyle = duck.color;
    ctx.beginPath();
    if (Math.floor(Date.now() / 200) % 2 === 0) {
        ctx.ellipse(duck.x + duck.width/2, duck.y + duck.height/2, duck.width/4, duck.height/2, Math.PI/4, 0, Math.PI * 2);
    } else {
        ctx.ellipse(duck.x + duck.width/2, duck.y + duck.height/2, duck.width/4, duck.height/4, Math.PI/3, 0, Math.PI * 2);
    }
    ctx.fill();
  };

  // Uppdatera ankornas positioner
  const updateDucks = useCallback((deltaTime: number): void => {
    setDucks(prevDucks => {
      const canvas = canvasRef.current;
      if (!canvas) return prevDucks;
    
      return prevDucks
        .filter(duck => {
          // Ta bort ankor som har flugit utanför skärmen
          if (duck.y + duck.height < 0) {
            return false;
          }
          return true;
        })
        .map(duck => {
          // Skapa en kopia för att undvika mutation
          const updatedDuck = { ...duck };
          
          if (updatedDuck.alive) {
            updatedDuck.x += updatedDuck.speedX * deltaTime * 60;
            updatedDuck.y += updatedDuck.speedY * deltaTime * 60;
            
            // Studsa mot kanterna
            if (updatedDuck.x <= 0 || updatedDuck.x + updatedDuck.width >= canvas.width) {
              updatedDuck.speedX *= -1;
            }
          }
          
          return updatedDuck;
        });
    });
    
    // Kontrollera om spelet är slut
    if (ammo <= 0 && ducks.length === 0 && !gameOver && isInitialized) {
      setGameOver(true);
    }
  }, [ammo, ducks.length, gameOver, isInitialized]);

  // Spelloopen
  const gameLoop = useCallback((timestamp: number): void => {
    const canvas = canvasRef.current;
    if (!canvas) {
      requestRef.current = requestAnimationFrame(gameLoop);
      return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      requestRef.current = requestAnimationFrame(gameLoop);
      return;
    }
    
    // Beräkna tidsskillnad
    const deltaTime = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;
    
    // Rensa canvas - VIKTIGT: Detta gör canvas transparent
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // BORTTAGET: Ingen bakgrundsritning längre
    // Låt den underliggande bakgrunden synas igenom
    
    // Uppdatera och rita ankor
    updateDucks(deltaTime);
    
    // Rita varje anka
    ducks.forEach(duck => drawDuck(ctx, duck));
    
    // Fortsätt spelloopen
    requestRef.current = requestAnimationFrame(gameLoop);
  }, [updateDucks, ducks]);

  // Hantera klick på canvas
  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Återställ spelet om det är Game Over
    if (gameOver) {
      setGameOver(false);
      setScore(0);
      setAmmo(5);
      setDucks([]);
      return;
    }
    
    // Kontrollera ammunition
    if (ammo <= 0) return;
    
    // Minska ammunition
    setAmmo(prevAmmo => prevAmmo - 1);
    
    // Hämta klickposition
    const rect = canvas.getBoundingClientRect();
    const clickX = (event.clientX - rect.left) * (canvas.width / rect.width);
    const clickY = (event.clientY - rect.top) * (canvas.height / rect.height);
    
    let hit = false;
    
    // Kontrollera träffar för varje anka
    setDucks(prevDucks => {
      return prevDucks.map(duck => {
        if (duck.alive && 
            !hit && 
            clickX >= duck.x && 
            clickX <= duck.x + duck.width && 
            clickY >= duck.y && 
            clickY <= duck.y + duck.height) {
          
          hit = true;
          
          // Öka poäng
          setScore(prevScore => prevScore + 10);
          
          // Öka ammunition vid träff
          setAmmo(prevAmmo => prevAmmo + 1);
          
          // Markera anka som träffad
          setTimeout(() => {
            setDucks(prevDucks => prevDucks.filter(d => d.id !== duck.id));
          }, 500);
          
          return { ...duck, alive: false };
        }
        return duck;
      });
    });
    
    // Rita skotteffekt
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(clickX, clickY, 10, 0, Math.PI * 2);
    ctx.fill();
  }, [gameOver, ammo]);

  // Hantera tangentbordshändelser
  const handleKeyDown = useCallback((event: KeyboardEvent): void => {
    if (event.code === 'Space') {
      if (ammo <= 0) {
        setAmmo(5);
      }
    }
  }, [ammo]);

  // Anpassa canvas-storlek till förälderelement
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const container = canvas.parentElement;
    if (!container) return;
    
    const { width, height } = container.getBoundingClientRect();
    
    // Sätt canvas pixeldimensioner
    canvas.width = width;
    canvas.height = height;
    
    console.log(`Canvas resized to ${width}x${height}`);
  }, []);

  // Sätt upp canvas och starta spelloopen
  useEffect(() => {
    // Resize canvas när komponenten är monterad
    resizeCanvas();
    
    // Lägg till resize listener
    window.addEventListener('resize', resizeCanvas);
    
    // Om vi har en färdig canvas, starta spelloopen
    if (canvasRef.current) {
      // Starta spelloopen
      console.log("Starting game loop");
      lastTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(gameLoop);
      
      // Skapa några initiala ankor
      for (let i = 0; i < 3; i++) {
        setTimeout(() => createDuck(), i * 500);
      }
      
      // Starta intervall för att skapa nya ankor
      duckIntervalRef.current = window.setInterval(() => {
        if (!gameOver) createDuck();
      }, 2000);
      
      // Markera att spelet är initierat
      setIsInitialized(true);
    }
    
    // Rensa upp när komponenten avmonteras
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      if (duckIntervalRef.current) {
        clearInterval(duckIntervalRef.current);
      }
    };
  }, [createDuck, gameLoop, gameOver, resizeCanvas]);

  // Lägg till och ta bort tangentbordslyssnare
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <GameContainer>
      <GameCanvas 
        ref={canvasRef}
        onClick={handleCanvasClick}
      />
      <HUD>
        Poäng: {score} | Ammunition: {ammo}
      </HUD>
      
      {gameOver && (
        <GameOverScreen>
          <GameOverTitle>Game Over</GameOverTitle>
          <GameOverScore>Din poäng: {score}</GameOverScore>
          <GameOverAction>Klicka för att spela igen</GameOverAction>
        </GameOverScreen>
      )}
    </GameContainer>
  );
};

export default DuckHunt;