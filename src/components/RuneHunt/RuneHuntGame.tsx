import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Rune, { createRandomRune } from './Rune';

// Fast spelstorlek med 16:9 proportion
const GAME_WIDTH = 1600;  
const GAME_HEIGHT = 900;

const GameContainer = styled.div<{ gameWidth?: string; gameHeight?: string }>`
  position: relative;
  width: ${props => props.gameWidth || '100%'};
  height: ${props => props.gameHeight || '100%'};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const GameCanvas = styled.canvas`
  display: block;
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
  isActive?: boolean;  // Om spelet är aktivt
  onRuneClick?: () => void;  // Callback för klick på en rune
}

const RuneHuntGame: React.FC<RuneHuntProps> = ({
  width = '100%',
  height = '100%',
  backgroundColor = '#f0f0f0',
  numRunes = 8,  // Standard 8 bollar
  isActive = true,
  onRuneClick = () => {}
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scaleRef = useRef<number>(1);
  const runesRef = useRef<Rune[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  
  // Vi använder en fast intern spelstorlek
  const [canvasSize] = useState({ width: GAME_WIDTH, height: GAME_HEIGHT });
  
  // Uppdatera canvas visningsstorlek men behåll aspektförhållandet
  const updateCanvasSize = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    // Hämta containerns dimensioner
    const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
    
    // Sätt interna canvas-dimensioner till vår fasta spelstorlek
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    
    // Beräkna aspektförhållanden
    const gameAspect = GAME_WIDTH / GAME_HEIGHT;
    const containerAspect = containerWidth / containerHeight;
    
    let cssWidth, cssHeight, scale;
    
    if (containerAspect > gameAspect) {
      // Container är bredare än vårt spelaspekt
      scale = containerHeight / GAME_HEIGHT;
      cssHeight = containerHeight;
      cssWidth = GAME_WIDTH * scale;
    } else {
      // Container är högre än vårt spelaspekt
      scale = containerWidth / GAME_WIDTH;
      cssWidth = containerWidth;
      cssHeight = GAME_HEIGHT * scale;
    }
    
    // Sätt CSS-dimensioner för visningsskalning
    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${cssHeight}px`;
    
    // Spara skalningsfaktor för inmatningskoordinatomvandling
    scaleRef.current = scale;
    
    return { width: GAME_WIDTH, height: GAME_HEIGHT, scale };
  };
  
// I drawCanvas-funktionen, se till att vi rensar hela canvas innan ritning
const drawCanvas = () => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // Rensa hela canvas-arean helt och hållet
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  
  // Fyll bakgrunden om en bakgrundsfärg är angiven
  if (backgroundColor !== 'transparent') {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }
  
  // Rita alla runes
  runesRef.current.forEach(rune => {
    rune.draw(ctx);
  });
};;
  
  // Uppdatera alla runes
  const updateRunes = () => {
    if (!isActive) return;
    
    runesRef.current.forEach(rune => {
      rune.update(GAME_WIDTH, GAME_HEIGHT);
    });
  };
  
  // Funktion för att skapa en rune på slumpmässig position
  const createRandomPositionedRune = () => {
    // Sätt en marginal så att runes inte skapas för nära kanterna
    const marginFromEdge = 50;
    
    // Generera slumpmässiga koordinater inom spelplanen med hänsyn till marginal
    const randomX = marginFromEdge + Math.random() * (GAME_WIDTH - 2 * marginFromEdge);
    const randomY = marginFromEdge + Math.random() * (GAME_HEIGHT - 2 * marginFromEdge);
    
    return createRandomRune(
      randomX,
      randomY,
      15,     // Min radie
      35,     // Max radie
      2,      // Min hastighet
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
    createInitialRunes();
    
    const handleResize = () => {
      updateCanvasSize();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Game loop
  useEffect(() => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
    
    const gameLoop = () => {
      updateRunes();
      ensureRunes();
      drawCanvas();
      animationFrameIdRef.current = requestAnimationFrame(gameLoop);
    };
    
    animationFrameIdRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isActive]);
  
  // Hantera klick på canvas - konvertera skärmkoordinater till spelkoordinater
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isActive) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const scale = scaleRef.current;
    
    // Konvertera skärmkoordinater till spelkoordinater
    const gameX = (event.clientX - rect.left) / scale;
    const gameY = (event.clientY - rect.top) / scale;
    
    // Kontrollera alla runes för träffar
    for (let i = 0; i < runesRef.current.length; i++) {
      const rune = runesRef.current[i];
      
      const dx = gameX - rune.props.x;
      const dy = gameY - rune.props.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Om klicket är inom runen, ta bort den
      if (distance <= rune.props.radius) {
        // Ta bort den klickade runen från arrayen
        runesRef.current.splice(i, 1);
        
        // Lägg till en ny rune på en slumpmässig position
        runesRef.current.push(createRandomPositionedRune());
        
        // Anropa callback-funktionen för att öka poäng
        onRuneClick();
        
        // Bryt loopen när vi har hittat och hanterat en rune
        break;
      }
    }
  };

  // Hantera touch-händelser på liknande sätt
  const handleTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isActive) return;
    event.preventDefault();
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const scale = scaleRef.current;
    const touch = event.touches[0];
    
    // Konvertera touch-koordinater till spelkoordinater
    const gameX = (touch.clientX - rect.left) / scale;
    const gameY = (touch.clientY - rect.top) / scale;
    
    // Använd samma logik som för musklick
    for (let i = 0; i < runesRef.current.length; i++) {
      const rune = runesRef.current[i];
      
      const dx = gameX - rune.props.x;
      const dy = gameY - rune.props.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance <= rune.props.radius) {
        runesRef.current.splice(i, 1);
        runesRef.current.push(createRandomPositionedRune());
        onRuneClick();
        break;
      }
    }
  };
  
  return (
    <GameContainer 
      ref={containerRef}
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