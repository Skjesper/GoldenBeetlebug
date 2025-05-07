import { useState, useEffect } from 'react';

interface TimerProps {

    initialTime?: number;
    isRunning: boolean;
    onTimeChange?: (time: number) => void;
    onTimeOut?: () => void;
    countDown?: boolean;


}


export default function Timer({ initialTime = 60, isRunning, onTimeChange, onTimeOut, countDown = true }: TimerProps) {





}