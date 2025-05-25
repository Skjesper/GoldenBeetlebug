'use client'
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Scoreboard from './ScoreBoard';
import styled from '@emotion/styled';
import Button from './Button';



const ScoreBoardContainer = styled.div`
    padding: 2rem;
    border-radius: 20px;
    background: var(--background);
    display: flex;
    gap:1rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    
`;

const StyledH2 = styled.h2`
    font-family: var(--font-primary);
    font-size: 3rem; /* Mobil landscape (bas) */
    text-align: center;
    font-weight: 400;
    color: var(--primary);
    
`;


const ScoreInput = styled.form`
 display: flex;
 flex-direction: column;
 align-items: center;
 gap: 0.625rem;
`;

const Input = styled.input`
   width: 16.5rem;
   height: 1.9375rem;
   border-radius: 1.25rem;
   border: 1px solid #dc4d0047;
   margin-bottom: 1.5625rem;
   padding-left: 0.625rem;
`;

  const ButtonContainer = styled.div`
  
  display: flex;
  gap: 1rem;

  
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
        <StyledH2>Grymt jobbat!</StyledH2>
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

          <ButtonContainer>
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
            </ButtonContainer>

          </ScoreInput>
          {message && <p>{message}</p>}
      </ScoreBoardContainer>


    </div>
  );
};

export default ScoreForm;
