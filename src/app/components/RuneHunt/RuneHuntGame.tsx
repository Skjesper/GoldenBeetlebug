'use client'
import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';

import Rune, { setRuneImageSources } from './Rune'; 
import RuneGenerator from './RuneGenerator'; 


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
  border-radius: 20px;
  cursor: url(/assets/mouseClickers/champagne_bottle.png) 90 10, pointer;
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
  onRuneClick?: (rune: Rune) => void;
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
  const runeGeneratorRef = useRef<RuneGenerator | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const backgroundImageRef = useRef<HTMLImageElement | null>(null);
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  const [gameSize, setGameSize] = useState({ width: 800, height: 600 });
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

 // Device detection
  useEffect(() => {
    const handleDeviceDetection = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleDeviceDetection);
    return () => window.removeEventListener('resize', handleDeviceDetection);
  }, []);

  // Canvas size management
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
    canvas.width = containerWidth;
    canvas.height = containerHeight;
    setGameSize({ width: containerWidth, height: containerHeight });
    return { width: containerWidth, height: containerHeight };
  }, []);

  // Background image loading
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

  // Canvas drawing
  const drawCanvas = useCallback(() => {
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
  }, [backgroundColor, isBackgroundLoaded]);

  // Rune updates
  const updateRunes = useCallback(() => {
    if (!isActive || !runeGeneratorRef.current) return;
    
    // Ta bort utgångna bad runes och uppdatera positioner
    runesRef.current = runeGeneratorRef.current.filterExpiredBadRunes(runesRef.current);
    runesRef.current.forEach(rune => rune.update(gameSize.width, gameSize.height));
  }, [isActive, gameSize]);

  // RuneGenerator setup
  useEffect(() => {
    if (!runeGeneratorRef.current) {
      runeGeneratorRef.current = new RuneGenerator(gameSize.width, gameSize.height, isMobile);
      
      // Sätt upp bad rune spawn callback
      runeGeneratorRef.current.setBadRuneSpawnCallback((badRune: Rune) => {
        runesRef.current = [...runesRef.current, badRune];
      });
      
      // Starta bad rune spawning
      runeGeneratorRef.current.startBadRuneSpawning();
    } else {
      runeGeneratorRef.current.updateGameSize(gameSize.width, gameSize.height);
      runeGeneratorRef.current.setDeviceType(isMobile);
    }

    // Cleanup function
    return () => {
      runeGeneratorRef.current?.cleanup();
    };
  }, [gameSize, isMobile]);

  // Ensure adequate number of regular runes
  const ensureRunes = useCallback(() => {
    if (runeGeneratorRef.current) {
      runesRef.current = runeGeneratorRef.current.ensureRegularRunes(runesRef.current, numRunes);
    }
  }, [numRunes]);

  // Create initial runes
  const createInitialRunes = useCallback(() => {
    if (runeGeneratorRef.current) {
      runesRef.current = runeGeneratorRef.current.createInitialRunes(numRunes);
    }
  }, [numRunes]);

  // Setup rune images
  useEffect(() => {
    setRuneImageSources('/assets/RuneAlive.png', '/assets/RuneDead.png');
  }, []);

  // Initial setup and resize handling
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
  }, [updateCanvasSize, createInitialRunes]);

  // Canvas position adjustment
  useEffect(() => {
    if (gameSize.width > 0 && gameSize.height > 0 && runeGeneratorRef.current) {
      runeGeneratorRef.current.adjustRunesToFitCanvas(runesRef.current);
    }
  }, [gameSize]);

  // Background loading effect
  useEffect(() => {
    if (isBackgroundLoaded && canvasRef.current) {
      drawCanvas();
    }
  }, [isBackgroundLoaded, drawCanvas]);

  // Main game loop
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
  }, [updateRunes, ensureRunes, drawCanvas]);

  // Click handling
  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const gameX = event.clientX - rect.left;
    const gameY = event.clientY - rect.top;

    const clickedRuneIndex = runesRef.current.findIndex(rune => {
      const dx = rune.props.x - gameX;
      const dy = rune.props.y - gameY;
      return Math.sqrt(dx * dx + dy * dy) < rune.props.radius;
    });

    if (clickedRuneIndex !== -1) {
      const clickedRune = runesRef.current[clickedRuneIndex];
      runesRef.current.splice(clickedRuneIndex, 1);
      onRuneClick(clickedRune);
    }
  }, [isActive, onRuneClick]);

  return (
    <GameContainer ref={containerRef} gameWidth={width} gameHeight={height}>
      <GameCanvas ref={canvasRef} onClick={handleCanvasClick} />
    </GameContainer>
  );
};

export default RuneHuntGame;