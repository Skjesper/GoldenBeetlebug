'use client'
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

interface TimerProps {
  initialTime?: number;
  isRunning: boolean;
  onTimeChange?: (time: number) => void;
  onTimeOut?: () => void;
  countDown?: boolean;
}

const TimerContainer = styled.div`
  font-size: 2rem;
  font-family: var(--font-secondary-big);
  font-weight: var(--weight-bold);
  color: white;
  text-shadow: 
        -1.2px -1.2px 0 black,
        1.2px -1.2px 0 black,
        -1.2px 1.2px 0 black,
        1.2px 1.2px 0 black;
`;

export default function Timer({ 
  initialTime = 60, 
  isRunning, 
  onTimeChange, 
  onTimeOut,
  countDown = true 
}: TimerProps) {
  const [time, setTime] = useState<number>(initialTime);
  
  useEffect(() => {
    let intervalId: number | undefined;
    
    if (isRunning) {
      intervalId = window.setInterval(() => {
        setTime(prevTime => {
          const newTime = countDown ? prevTime - 1 : prevTime + 1;
                  
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, countDown]);

  useEffect(() => {
  if (onTimeChange) {
    onTimeChange(time);
  }

  if (countDown && time <= 0 && onTimeOut) {
    onTimeOut();
  }
}, [time, countDown, onTimeChange, onTimeOut]);
  
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  return (
    <TimerContainer>
      {formattedTime}
    </TimerContainer>
  )
}