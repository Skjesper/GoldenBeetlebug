import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Rune, { setRuneImageSources } from './Rune'; 
import RuneGenerator from './RuneGenerator'; 
import Champagne from '../../assets/mouseClickers/champagne_bottle.png';

import runeImage from '../../assets/RuneAlive.png';
import runeImage2 from '../../assets/RuneDead.png';

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
  cursor: url(${Champagne}) 90 10, pointer;
  width: 100%;
  height: 100%;
  touch-action: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
`;

interface RuneHuntProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  numRunes?: number;
  isActive?: boolean;
  onRuneClick?: () => void;
}

const RuneHuntGame: React.FC<RuneHuntProps> = ({
  width = '100%',
  height = '100%',
  backgroundColor = '#f0f0f0',
  backgroundImage,
  numRunes = 8,
  isActive = true,
  onRuneClick = () => {}
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const runesRef = useRef<Rune[]>([]);
  const runeGeneratorRef = useRef<RuneGenerator | null>(null); // Ny ref för RuneGenerator
  const animationFrameIdRef = useRef<number | null>(null);
  const backgroundImageRef = useRef<HTMLImageElement | null>(null);
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  const [gameSize, setGameSize] = useState({ width: 800, height: 600 });
  // Enkel enhetsdetektering
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  // Uppdatera isMobile när fönstret ändrar storlek
  useEffect(() => {
    const handleDeviceDetection = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleDeviceDetection);
    return () => {
      window.removeEventListener('resize', handleDeviceDetection);
    };
  }, []);

  const updateCanvasSize = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
    canvas.width = containerWidth;
    canvas.height = containerHeight;
    setGameSize({ width: containerWidth, height: containerHeight });
    return { width: containerWidth, height: containerHeight };
  };

  useEffect(() => {
    if (backgroundImage) {
      setIsBackgroundLoaded(false);
      const img = new Image();
      img.onload = () => {
        backgroundImageRef.current = img;
        setIsBackgroundLoaded(true);
      };
      img.src = backgroundImage;
    } else {
      backgroundImageRef.current = null;
      setIsBackgroundLoaded(false);
    }
  }, [backgroundImage]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (backgroundImageRef.current && isBackgroundLoaded) {
      ctx.drawImage(backgroundImageRef.current, 0, 0, canvas.width, canvas.height);
    } else if (backgroundColor !== 'transparent') {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    runesRef.current.forEach(rune => rune.draw(ctx));
  };

  const updateRunes = () => {
    if (!isActive) return;
    runesRef.current.forEach(rune => rune.update(gameSize.width, gameSize.height));
  };

  // Initialisera eller uppdatera RuneGenerator när spelstorleken eller enhetstypen ändras
  useEffect(() => {
    if (!runeGeneratorRef.current) {
      runeGeneratorRef.current = new RuneGenerator(gameSize.width, gameSize.height, isMobile);
    } else {
      runeGeneratorRef.current.updateGameSize(gameSize.width, gameSize.height);
      runeGeneratorRef.current.setDeviceType(isMobile);
    }
  }, [gameSize, isMobile]);

  // Ta bort de flyttade funktionerna - låt RuneGenerator hantera detta
  // createRandomPositionedRune är nu borta
  
  const ensureRunes = () => {
    if (runeGeneratorRef.current) {
      runesRef.current = runeGeneratorRef.current.ensureRunes(runesRef.current, numRunes);
    }
  };

  const createInitialRunes = () => {
    if (runeGeneratorRef.current) {
      runesRef.current = runeGeneratorRef.current.createInitialRunes(numRunes);
    }
  };

  useEffect(() => {
    setRuneImageSources(runeImage, runeImage2);
  }, []);

  useEffect(() => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }

    const size = updateCanvasSize();
    if (size && runesRef.current.length === 0) {
      createInitialRunes();
    }

    const handleResize = () => {
      const newSize = updateCanvasSize();
      if (newSize) {
        // Återskapa runor när skärmstorleken ändras för att passa det nya utrymmet bättre
        createInitialRunes();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (gameSize.width > 0 && gameSize.height > 0 && runeGeneratorRef.current) {
      // Använd RuneGenerator för att justera runorna
      runeGeneratorRef.current.adjustRunesToFitCanvas(runesRef.current);
    }
  }, [gameSize]);

  useEffect(() => {
    if (isBackgroundLoaded && canvasRef.current) {
      drawCanvas();
    }
  }, [isBackgroundLoaded]);

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

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const gameX = event.clientX - rect.left;
    const gameY = event.clientY - rect.top;

    // Hitta första rune som träffas
    const clickedRuneIndex = runesRef.current.findIndex(rune => {
      const dx = rune.props.x - gameX;
      const dy = rune.props.y - gameY;
      return Math.sqrt(dx * dx + dy * dy) < rune.props.radius;
    });

    if (clickedRuneIndex !== -1) {
      runesRef.current.splice(clickedRuneIndex, 1);
      onRuneClick();
    }
  };

  return (
    <GameContainer ref={containerRef} gameWidth={width} gameHeight={height}>
      <GameCanvas ref={canvasRef} onClick={handleCanvasClick} />
    </GameContainer>
  );
};

export default RuneHuntGame;