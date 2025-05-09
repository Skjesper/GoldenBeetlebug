import React, { useState, useEffect } from 'react';
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
  font-weight: bold;
  color: #333;
  /* Lägg till fler stilar här */
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
          
          if (onTimeChange) {
            onTimeChange(newTime);
          }
          
          if (countDown && newTime <= 0 && onTimeOut) {
            onTimeOut();
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, countDown, onTimeChange, onTimeOut]);
  
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  return (
    <TimerContainer>
      {formattedTime}
    </TimerContainer>
  )
}