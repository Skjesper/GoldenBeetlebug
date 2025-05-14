import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const HighScore: React.FC = () => {
  const [highScore, setHighScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Hämta högsta poängen när komponenten laddas
    const fetchHighScore = async () => {
      try {
        // Hämta högsta poängen från Supabase
        const { data, error } = await supabase
          .from('scores')
          .select('points')
          .order('points', { ascending: false })
          .limit(1)
          .single();
        
        if (error) {
          throw error;
        }
        
        // Uppdatera highScore-state med resultatet
        setHighScore(data?.points || 0);
      } catch (error) {
        console.error('Error fetching high score:', error);
        setError('Kunde inte hämta högsta poäng');
      } finally {
        setLoading(false);
      }
    };
    
    fetchHighScore();
  }, []);

  if (loading) return <p>Laddar högsta poäng...</p>;
  if (error) return <p>Fel: {error}</p>;

  return (
    <div>
      <h2>Högsta poäng</h2>
      <p>{highScore !== null ? highScore : 'Ingen poäng registrerad än'}</p>
    </div>
  );
};

export default HighScore;