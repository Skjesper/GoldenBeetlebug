import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';

// Styled Components
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
  // State för att hålla faktiska canvas-dimensioner i pixlar
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  
  // Funktion för att uppdatera canvas dimensioner
  const updateCanvasSize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const parent = canvas.parentElement;
    if (!parent) return;
    
    // Hämta förälderdivens faktiska pixelstorlek
    const { width: parentWidth, height: parentHeight } = parent.getBoundingClientRect();
    
    // Uppdatera canvas pixeldimensioner - viktigt för skarp rendering
    canvas.width = parentWidth;
    canvas.height = parentHeight;
    
    // Spara dimensionerna i state för användning i andra funktioner
    setCanvasSize({ width: parentWidth, height: parentHeight });
    
    return { width: parentWidth, height: parentHeight };
  };
  
  // Funktion för att rita på canvas
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Använd canvasSize.width och canvasSize.height som är nummer
    const { width: canvasWidth, height: canvasHeight } = canvasSize;
    
    // Rensa och fyll canvas med bakgrundsfärg
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Rita en välkomsttext som visar att canvas fungerar
    ctx.font = '32px Fantasy';
    ctx.fillStyle = '#4a2511';
    ctx.textAlign = 'center';
    ctx.fillText('RuneHunt', canvasWidth / 2, canvasHeight / 3);
    
    ctx.font = '20px Arial';
    ctx.fillText('Canvas är redo för spellogik', canvasWidth / 2, canvasHeight / 2);
    
    // Här kan du senare initiera spelmotorn och koppla den till canvas
  };
  
  // Effekt för att initiera canvas och lyssna på storleksändringar
  useEffect(() => {
    // Uppdatera först dimensionerna
    updateCanvasSize();
    
    // Lyssna på storleksändringar
    const handleResize = () => {
      updateCanvasSize();
      // Rita om efter resize
      drawCanvas();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Kör bara en gång vid montering
  
  // Effekt för att rita på canvasen när bakgrundsfärg eller canvasSize ändras
  useEffect(() => {
    drawCanvas();
  }, [backgroundColor, canvasSize]);
  
  return (
    <GameContainer 
      className="rune-hunt-game"
      gameWidth={width}
      gameHeight={height}
    >
      <GameCanvas
        ref={canvasRef}
        className="rune-hunt-canvas"
      />
    </GameContainer>
  );
};

export default RuneHuntGame;