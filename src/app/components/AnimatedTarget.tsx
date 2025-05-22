import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
`;

const AnimatedContainer = styled.div<{ locked: boolean }>`
  will-change: transform;
  ${({ locked }) => locked && `
    transition: transform 0.05s ease-out;
  `}
`;

const StyledTarget = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
`;

interface AnimatedTargetProps {
  targetImagePath?: string;
}

export default function AnimatedTarget({ targetImagePath = '/assets/TargetIcon.png' }: AnimatedTargetProps) {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [locked, setLocked] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTime = useRef(Date.now());

  const config = {
    duration: 5000,
    initialRadius: 100,
    finalRadius: 8,
    rotationSpeed: 0.003, 
  };

  useEffect(() => {
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime.current;
      const progress = Math.min(elapsed / config.duration, 1);

      if (progress >= 0.98 && !locked) setLocked(true);

      const radius = config.initialRadius * (1 - progress) + config.finalRadius * progress;
      const angle = elapsed * config.rotationSpeed;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle * 0.8) * radius;

      setPosition({ x, y });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <Wrapper>
      <AnimatedContainer
        locked={locked}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        <StyledTarget src={targetImagePath} alt="Target" />
      </AnimatedContainer>
    </Wrapper>
  );
}
