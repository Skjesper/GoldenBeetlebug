import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';


import Rune, { createRandomRune, setRuneImageSource } from './Rune';
import Champagne from '../../assets/mouseClickers/champagne_bottle.png';


// Importera rune-bilden - justera sökvägen enligt din projektstruktur
import runeImage from '../../assets/rune.png';

// Styled components för spelkontainern
const GameContainer = styled.div<{ gameWidth?: string; gameHeight?: string }>`
  position: relative;
  width: ${props => props.gameWidth || '100%'};
  height: ${props => props.gameHeight || '100%'};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

// Styled component för canvas-elementet
const GameCanvas = styled.canvas`
  display: block;
  border: 2px solid #4a2511;
  border-radius: 8px;
  cursor: url(${Champagne}) 90 10, pointer;
  width: 100%;
  height: 100%;

  /* Prevent default touch behaviors */
  touch-action: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
`;

// Props-interface för RuneHuntGame-komponenten
interface RuneHuntProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  numRunes?: number;  // Antal runes att hålla aktiva
  isActive?: boolean;  // Om spelet är aktivt
  onRuneClick?: () => void;  // Callback för klick på en rune
}

const RuneHuntGame: React.FC<RuneHuntProps> = ({
  width = '100%',
  height = '100%',
  backgroundColor = '#f0f0f0',
  numRunes = 8,  // Standard 8 runes
  isActive = true,
  onRuneClick = () => {}
}) => {
  // Referens till canvas-elementet
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Referens till container-elementet
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Referens till alla aktiva runes
  const runesRef = useRef<Rune[]>([]);
  // Referens till den aktuella animations-framen
  const animationFrameIdRef = useRef<number | null>(null);
  
  // State för att spåra den faktiska spelstorleken (beräknas dynamiskt)
  const [gameSize, setGameSize] = useState({ width: 800, height: 600 });
  
  // Uppdatera canvas storlek baserat på tillgängligt utrymme
  const updateCanvasSize = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    // Hämta containerns dimensioner - detta är det tillgängliga utrymmet
    const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
    
    // Nu använder vi det tillgängliga utrymmet direkt istället för en fast proportion
    const newGameWidth = containerWidth;
    const newGameHeight = containerHeight;
    
    // Uppdatera canvas pixeldimensioner för att matcha containern
    canvas.width = newGameWidth;
    canvas.height = newGameHeight;
    
    // Uppdatera vår interna spelstorlek
    setGameSize({ width: newGameWidth, height: newGameHeight });
    
    return { width: newGameWidth, height: newGameHeight };
  };
  
  // Rensa canvas och rita alla runes
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Rensa hela canvas-arean helt och hållet
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fyll bakgrunden om en bakgrundsfärg är angiven och inte transparent
    if (backgroundColor !== 'transparent') {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Rita alla runes
    runesRef.current.forEach(rune => {
      rune.draw(ctx);
    });
  };
  
  // Uppdatera alla runes positioner
  const updateRunes = () => {
    if (!isActive) return;
    
    runesRef.current.forEach(rune => {
      // Använd den aktuella spelstorleken för gränsdetektering
      rune.update(gameSize.width, gameSize.height);
    });
  };
  
  // Funktion för att skapa en rune på slumpmässig position
  const createRandomPositionedRune = () => {
    // Sätt en marginal så att runes inte skapas för nära kanterna
    const marginFromEdge = 50;
    
    // Generera slumpmässiga koordinater inom spelplanen med hänsyn till marginal
    const randomX = marginFromEdge + Math.random() * (gameSize.width - 2 * marginFromEdge);
    const randomY = marginFromEdge + Math.random() * (gameSize.height - 2 * marginFromEdge);
    
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
  
  // När komponenten monteras: Ställ in bildkälla för runes
  useEffect(() => {
    // Sätt bildkällan för alla runes
    setRuneImageSource(runeImage);
    
    // Du kan också prova med en absolut sökväg om importen inte fungerar:
    // setRuneImageSource('/src/assets/rune.png');
    
    // Eller om alternativ bild önskas:
    // setRuneImageSource('/src/assets/rune1.png');
  }, []);
  
  // När komponenten monteras och vid storleksändringar
  useEffect(() => {
    // Rensa eventuella animationsframes
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
    
    // Initial uppdatering av storlek och runes
    const size = updateCanvasSize();
    if (size && runesRef.current.length === 0) {
      createInitialRunes();
    }
    
    // Lyssna på storleksändringar
    const handleResize = () => {
      updateCanvasSize();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);
  
  // Återskapa runes när spelstorleken ändras kraftigt
  // Detta förhindrar att runes fastnar utanför kanten när spelplanen ändrar storlek
  useEffect(() => {
    if (gameSize.width > 0 && gameSize.height > 0) {
      // Flytta alla befintliga runes tillbaka in på spelplanen
      runesRef.current.forEach(rune => {
        // Justera x-position om utanför kanten
        if (rune.props.x < rune.props.radius) {
          rune.props.x = rune.props.radius + 10;
        } else if (rune.props.x > gameSize.width - rune.props.radius) {
          rune.props.x = gameSize.width - rune.props.radius - 10;
        }
        
        // Justera y-position om utanför kanten
        if (rune.props.y < rune.props.radius) {
          rune.props.y = rune.props.radius + 10;
        } else if (rune.props.y > gameSize.height - rune.props.radius) {
          rune.props.y = gameSize.height - rune.props.radius - 10;
        }
      });
    }
  }, [gameSize]);
  
  // Game loop - uppdaterar speltillståndet och ritar alla runes
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
  }, [isActive, gameSize]);
  
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