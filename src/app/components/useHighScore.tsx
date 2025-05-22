'use client'
// useHighScore.tsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useHighScore() {
  const [highestScore, setHighestScore] = useState(0);

  useEffect(() => {
    const fetchHighestScore = async () => {
      try {
        const { data, error } = await supabase
          .from('scores')
          .select('points')
          .order('points', { ascending: false })
          .limit(1);
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          setHighestScore(data[0].points);
        }
      } catch (error) {
        console.error('Error fetching highest score:', error);
      } 
    };
    
    fetchHighestScore();
  }, []);

  return { highestScore };
}