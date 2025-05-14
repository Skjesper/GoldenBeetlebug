import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Rune, { createRune } from './Rune';

// Stylad Container och Canvas
const GameContainer = styled.div<{ gameWidth?: string; gameHeight?: string }>`
  position: relative;
  width: ${props => props.gameWidth || '100%'};
  height: ${props => props.gameHeight || '100%'};
`;

const GameCanvas = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
  border: 2px solid #4a2511;
  border-radius: 8px;
  cursor: crosshair;
`;

// Props för komponenten
interface RuneHuntProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
}

const RuneHuntGame: React.FC<RuneHuntProps> = ({
  width = '100%',
  height = '100%',
  backgroundColor = '#f0f0f0'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  
  // Använd useRef istället för useState för spelentiteter
  // eftersom vi inte behöver rendera om komponenten när de uppdateras
  const runeRef = useRef<Rune | null>(null);
  
  // Uppdatera canvas dimensioner
  const updateCanvasSize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const parent = canvas.parentElement;
    if (!parent) return;
    
    const { width: parentWidth, height: parentHeight } = parent.getBoundingClientRect();
    
    canvas.width = parentWidth;
    canvas.height = parentHeight;
    
    setCanvasSize({ width: parentWidth, height: parentHeight });
    
    return { width: parentWidth, height: parentHeight };
  };
  
  // Funktion för att rita canvas - anropas direkt i gameLoop
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { width: canvasWidth, height: canvasHeight } = canvasSize;
    
    // Rensa canvas
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Rita Rune om den finns
    if (runeRef.current) {
      runeRef.current.draw(ctx);
    }
  };
  
  // Uppdatera och rita - anropas i gameLoop
  const update = () => {
    if (runeRef.current) {
      // Uppdatera Rune direkt utan att skapa en ny instans
      runeRef.current.update(canvasSize.height);
    }
  };
  
  // Huvudeffekten som hanterar inställning och animationsloop
  useEffect(() => {
    // Inställning
    updateCanvasSize();
    
    // Hantera storleksändring
    const handleResize = () => {
      const newSize = updateCanvasSize();
      if (newSize && !runeRef.current) {
        // Skapa Rune om den inte redan finns
        runeRef.current = createRune(
          newSize.width / 2,
          50,
          40,
          '#e74c3c'
        );
      }
    };
    
    // Lyssna på storleksändringar
    window.addEventListener('resize', handleResize);
    
    // Skapa en Rune om vi har canvasSize
    if (canvasSize.width > 0 && canvasSize.height > 0 && !runeRef.current) {
      runeRef.current = createRune(
        canvasSize.width / 2,
        50,
        40,
        '#e74c3c'
      );
    }
    
    // Game loop
    let animationFrameId: number;
    
    const gameLoop = () => {
      update();
      drawCanvas();
      animationFrameId = requestAnimationFrame(gameLoop);
    };
    
    // Starta game loop
    animationFrameId = requestAnimationFrame(gameLoop);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasSize]); // Endast omstarta effekten när canvasSize ändras
  
  // Hantera klick på canvas
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    // Skapa en ny Rune på klickpunkten
    runeRef.current = createRune(
      clickX,
      clickY,
      20 + Math.random() * 30,
      `hsl(${Math.random() * 360}, 70%, 50%)`
    );
  };
  
  return (
    <GameContainer 
      className="rune-hunt-game"
      gameWidth={width}
      gameHeight={height}
    >
      <GameCanvas
        ref={canvasRef}
        className="rune-hunt-canvas"
        onClick={handleCanvasClick}
      />
    </GameContainer>
  );
};

export default RuneHuntGame;