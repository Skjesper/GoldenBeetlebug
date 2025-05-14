import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Rune, { createRandomRune } from './Rune';

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
  numRunes?: number;  // Antal bollar att hålla aktiva
}

const RuneHuntGame: React.FC<RuneHuntProps> = ({
  width = '100%',
  height = '100%',
  backgroundColor = '#f0f0f0',
  numRunes = 8  // Standard 8 bollar
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const runesRef = useRef<Rune[]>([]);  // Array av runes
  
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
  
  // Funktion för att rita alla runes
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { width: canvasWidth, height: canvasHeight } = canvasSize;
    
    // Rensa canvas
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Rita alla runes
    runesRef.current.forEach(rune => {
      rune.draw(ctx);
    });
    
    // Rita information
    ctx.font = '16px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'left';
    ctx.fillText(`Klicka på en boll för att skapa en ny`, 10, 25);
  };
  
  // Uppdatera alla runes - ingen kollision mellan bollar
  const updateRunes = () => {
    runesRef.current.forEach(rune => {
      rune.update(canvasSize.width, canvasSize.height);
    });
  };
  
  // Skapa en ny slumpmässig rune
  const createNewRandomRune = () => {
    const { width, height } = canvasSize;
    
    // Skapa en ny rune på slumpmässig position (inte för nära kanterna)
    const randomX = Math.random() * (width - 100) + 50; 
    const randomY = Math.random() * (height - 100) + 50;
    
    return createRandomRune(
      randomX,
      randomY,
      15,     // Min radie
      35,     // Max radie
      1,      // Min hastighet
      4       // Max hastighet
    );
  };
  
  // Funktion för att fylla på med runes till målantalet
  const ensureRunes = () => {
    // Skapa nya runes om det behövs
    while (runesRef.current.length < numRunes) {
      runesRef.current.push(createNewRandomRune());
    }
  };
  
  // Funktion för att skapa initiala runes
  const createInitialRunes = () => {
    // Rensa befintliga runes först
    runesRef.current = [];
    
    // Skapa alla runes på en gång
    for (let i = 0; i < numRunes; i++) {
      runesRef.current.push(createNewRandomRune());
    }
  };
  
  // Effekt för att initiera canvas och hantera storlek
  useEffect(() => {
    updateCanvasSize();
    
    const handleResize = () => {
      updateCanvasSize();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Effekt för att skapa initiala runes när canvas-storleken är känd
  useEffect(() => {
    if (canvasSize.width > 0 && canvasSize.height > 0 && runesRef.current.length === 0) {
      createInitialRunes();
    }
  }, [canvasSize, numRunes]);
  
  // Game loop
  useEffect(() => {
    let animationFrameId: number;
    
    const gameLoop = () => {
      updateRunes();
      // Säkerställ att det alltid finns exakt numRunes antal bollar
      ensureRunes();
      drawCanvas();
      animationFrameId = requestAnimationFrame(gameLoop);
    };
    
    animationFrameId = requestAnimationFrame(gameLoop);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasSize]);
  
  // Hantera klick på canvas - ta bort bollar som klickas på
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    // Kontrollera alla bollar för att se om någon klickades
    for (let i = 0; i < runesRef.current.length; i++) {
      const rune = runesRef.current[i];
      
      const dx = clickX - rune.props.x;
      const dy = clickY - rune.props.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Om klicket är inom bollen, ta bort den
      if (distance <= rune.props.radius) {
        // Ta bort den klickade bollen från arrayen
        runesRef.current.splice(i, 1);
        
        // Lägg direkt till en ny för att ersätta den
        runesRef.current.push(createNewRandomRune());
        
        // Bryt loopen när vi har hittat och hanterat en boll
        break;
      }
    }
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