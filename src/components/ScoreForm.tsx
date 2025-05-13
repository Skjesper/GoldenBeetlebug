// src/components/ScoreForm.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Scoreboard from './ScoreBoard';

interface ScoreFormProps {
  score?: number;
}

const ScoreForm: React.FC<ScoreFormProps> = ({ score = 0 }) => {
  const [nickname, setNickname] = useState('');
  const [points, setPoints] = useState<number>(score);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setPoints(score);
  }, [score]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      
      const { error } = await supabase.from('scores').insert([{ nickname, points }]);

      if (error) {
        throw error;
      }

      // Återställ formuläret efter framgångsrik inskickning
      setNickname('');
      setPoints(0);
      setMessage('Poäng sparad!');
    } catch (error) {
      console.error('Error saving score:', error);
      setMessage('Fel: Kunde inte spara poäng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Lägg till poäng</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nickname">Nickname:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>

        <Scoreboard score={points} />

        <button type="submit" disabled={loading}>
          {loading ? 'Sparar...' : 'Spara poäääääng'}
        </button>
      </form>
    </div>
  );
};

export default ScoreForm;
