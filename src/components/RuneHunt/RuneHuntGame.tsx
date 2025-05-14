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
  
  // Funktion för att skapa en boll på slumpmässig position
  const createRandomPositionedRune = () => {
    const { width, height } = canvasSize;
    
    // Sätt en marginal så att bollarna inte skapas för nära kanterna
    const marginFromEdge = 50;
    
    // Generera slumpmässiga koordinater inom spelplanen med hänsyn till marginal
    const randomX = marginFromEdge + Math.random() * (width - 2 * marginFromEdge);
    const randomY = marginFromEdge + Math.random() * (height - 2 * marginFromEdge);
    
    return createRandomRune(
      randomX,
      randomY,
      15,     // Min radie
      35,     // Max radie
      2,      // Min hastighet (uppdaterad från 1 till 2)
      5       // Max hastighet
    );
  };
  
  // Funktion för att fylla på med runes till målantalet
  const ensureRunes = () => {
    // Skapa nya runes om det behövs
    while (runesRef.current.length < numRunes) {
      runesRef.current.push(createRandomPositionedRune());
    }
  };
  
  // Funktion för att skapa initiala runes
  const createInitialRunes = () => {
    // Rensa befintliga runes först
    runesRef.current = [];
    
    // Skapa alla runes på en gång
    for (let i = 0; i < numRunes; i++) {
      runesRef.current.push(createRandomPositionedRune());
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
        
        // Lägg till en ny boll på en slumpmässig position
        runesRef.current.push(createRandomPositionedRune());
        
        // Bryt loopen när vi har hittat och hanterat en boll
        break;
      }
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
    // Förhindra standard touch-beteenden som scrollning
    event.preventDefault();
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches[0]; // Första fingerberöringen
    
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;
    
    // Använd samma logik som för musklick
    for (let i = 0; i < runesRef.current.length; i++) {
      const rune = runesRef.current[i];
      
      const dx = touchX - rune.props.x;
      const dy = touchY - rune.props.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance <= rune.props.radius) {
        runesRef.current.splice(i, 1);
        runesRef.current.push(createRandomPositionedRune());
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
        onTouchStart={handleTouchStart}
      />
    </GameContainer>
  );
};

export default RuneHuntGame;