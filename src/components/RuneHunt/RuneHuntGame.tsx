import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Rune, { createRandomRune } from './Rune';


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
  width: 100%;
  height: 100%;
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
  const runesRef = useRef<Rune[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  
  // Använd dynamisk canvasSize baserat på containerens dimensioner
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  
  // Uppdatera canvas storlek baserat på förälderns storlek
  const updateCanvasSize = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    // Hämta containerns faktiska dimensioner
    const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
    
    // Uppdatera canvas pixeldimensioner för att matcha containern
    canvas.width = containerWidth;
    canvas.height = containerHeight;
    
    // Uppdatera state för att spelloopar ska använda rätt spelplansstorlek
    setCanvasSize({ width: containerWidth, height: containerHeight });
    
    return { width: containerWidth, height: containerHeight };
  };
  
  // Rensar canvas och ritar allt
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Rensa hela canvas-arean helt och hållet
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fyll bakgrunden om en bakgrundsfärg är angiven
    if (backgroundColor !== 'transparent') {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Rita alla runes
    runesRef.current.forEach(rune => {
      rune.draw(ctx);
    });
  };
  
  // Uppdatera alla runes
  const updateRunes = () => {
    if (!isActive) return;
    
    runesRef.current.forEach(rune => {
      rune.update(canvasSize.width, canvasSize.height);
    });
  };
  
  // Funktion för att skapa en rune på slumpmässig position
  const createRandomPositionedRune = () => {
    // Sätt en marginal så att runes inte skapas för nära kanterna
    const marginFromEdge = 50;
    
    // Generera slumpmässiga koordinater inom spelplanen med hänsyn till marginal
    const randomX = marginFromEdge + Math.random() * (canvasSize.width - 2 * marginFromEdge);
    const randomY = marginFromEdge + Math.random() * (canvasSize.height - 2 * marginFromEdge);
    
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
    // Första uppdatering av storlek
    updateCanvasSize();
    
    // Lyssna på storleksförändringar
    const handleResize = () => {
      updateCanvasSize();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Rensa animation frames vid avmontering
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);
  
  // Skapa initiala runes när canvasSize är definierad
  useEffect(() => {
    if (canvasSize.width > 0 && canvasSize.height > 0 && runesRef.current.length === 0) {
      createInitialRunes();
    }
    
    // Om storleken ändras kraftigt, justera befintliga runes för att undvika att de hamnar utanför
    if (runesRef.current.length > 0) {
      runesRef.current.forEach(rune => {
        // Kontrollera och justera x-position
        if (rune.props.x < rune.props.radius) {
          rune.props.x = rune.props.radius + 10;
        } else if (rune.props.x > canvasSize.width - rune.props.radius) {
          rune.props.x = canvasSize.width - rune.props.radius - 10;
        }
        
        // Kontrollera och justera y-position
        if (rune.props.y < rune.props.radius) {
          rune.props.y = rune.props.radius + 10;
        } else if (rune.props.y > canvasSize.height - rune.props.radius) {
          rune.props.y = canvasSize.height - rune.props.radius - 10;
        }
      });
    }
  }, [canvasSize]);
  
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
  }, [isActive, canvasSize]);
  
  // Hantera klick på canvas - mycket enklare nu utan skalning
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isActive) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    
    // Vi behöver inte längre skala om koordinaterna eftersom canvas matchar container
    const gameX = event.clientX - rect.left;
    const gameY = event.clientY - rect.top;
    
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
    const touch = event.touches[0];
    
    // Direkt användning av koordinater utan skalning
    const gameX = touch.clientX - rect.left;
    const gameY = touch.clientY - rect.top;
    
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