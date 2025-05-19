import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Scoreboard from './ScoreBoard';
import styled from '@emotion/styled';
import Button from './Button';

const ScoreBoardContainer = styled.div`
    padding: 4rem;
    border-radius: 20px;
    background: var(--background);
    display: flex;
    gap:1rem;
    flex-direction: column;
    justify-content: center;
`;

const ScoreInput = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
    width: 264px;
    height: 31px;
    border-radius: 20px;
    border: none;
    margin-bottom: 25px;
    padding-left: 10px;
`;

interface ScoreFormProps {
  score?: number;
  onDisplayChange?: (value: boolean) => void;
}

const ScoreForm: React.FC<ScoreFormProps> = ({ score = 0, onDisplayChange}) => {
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

      setMessage('Poäng sparad!');
      setNickname('');
      setPoints(0);
      onDisplayChange?.(true);
    
    } catch (error) {
      console.error('Error saving score:', error);
      setMessage('Fel: Kunde inte spara poäng');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div>
      
      <ScoreBoardContainer >
        <h1>Grymt jobbat!</h1>
        <h3>Vill du spara ditt resultat?</h3>
          <ScoreInput onSubmit={handleSubmit}>
          <Scoreboard score={score} showHighScore={false} />

              <Input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                placeholder='Nickname'
              />


            <Button 
            type="submit" 
            disabled={loading} 
            >

              {loading ? 'Sparar...' : 'Spara'}

            </Button>
            <Button 
            to='/'
            disabled={loading} >
              {'Startsidan'}
            </Button>

          </ScoreInput>
          {message && <p>{message}</p>}
      </ScoreBoardContainer>


    </div>
  );
};

export default ScoreForm;
