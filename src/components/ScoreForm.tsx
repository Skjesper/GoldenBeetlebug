// src/components/ScoreForm.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Scoreboard from './ScoreBoard';
import styled from '@emotion/styled';
import Button from './Button';

const ScoreBoardContainer = styled.div`
    width: 22.5625rem;
    height: 16.8125rem;
    border-radius: 0.25rem;
    background: #D9D9D9;

    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ScoreBoardTitle = styled.h1`
    font-size: 1.875rem;
    font-family: var(--font-display);
    text-align: center;
`;

const ScoreInput = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
      
      <ScoreBoardContainer>
        <ScoreBoardTitle>Grymt jobbat! <br />Vill du spara ditt resutlat?</ScoreBoardTitle>
          <ScoreInput onSubmit={handleSubmit}>
              <Scoreboard score={points} />
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                placeholder='Nickname'
              />


            <Button type="submit" disabled={loading}>
              {loading ? 'Sparar...' : 'Spara'}
            </Button>

          </ScoreInput>
          {message && <p>{message}</p>}
      </ScoreBoardContainer>


    </div>
  );
};

export default ScoreForm;
