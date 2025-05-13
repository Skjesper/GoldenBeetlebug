import React, { useRef, useEffect } from 'react';

interface RuneHuntProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
}

const RuneHuntGame: React.FC<RuneHuntProps> = ({
  width = 800,
  height = 600,
  backgroundColor = '#f0f0f0'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Initialisera canvas när komponenten renderas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Rensa och fyll canvas med bakgrundsfärg
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    // Rita en välkomsttext som visar att canvas fungerar
    ctx.font = '32px Fantasy';
    ctx.fillStyle = '#4a2511';
    ctx.textAlign = 'center';
    ctx.fillText('RuneHunt', width / 2, height / 3);
    
    ctx.font = '20px Arial';
    ctx.fillText('Canvas är redo för spellogik', width / 2, height / 2);
    
    // Här kan du senare initiera spelmotorn och koppla den till canvas
    
  }, [width, height, backgroundColor]);
  
  return (
    <div className="rune-hunt-game">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ 
          border: '2px solid #4a2511', 
          borderRadius: '8px',
          display: 'block',
          margin: '0 auto'
        }}
      />
    </div>
  );
};

export default RuneHuntGame;