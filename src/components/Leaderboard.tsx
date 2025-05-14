import styled from "@emotion/styled";
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const Container = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #D9D9D9;
    width: 44.25rem;
    height: 20.625rem;
    border-radius: 20px;
`;

const Title = styled.h1 `
    font-size: 4rem;
`;

const ListContainer = styled.ol `
    font-family: var(--font-display);
`;

const ListItem = styled.li `
    font-family: var(--font-display);
    font-size: 2rem;
    text-decoration: 0.8px black underline;
`;

function Leaderboard() {
      const [leaderBoardScores, setLeaderBoardScores] = useState<Array<number> | null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState('');
    

      useEffect(() => {
          const fetchLeaderBoardScores = async () => {
            try {
              const { data, error } = await supabase
                .from('scores')
                .select('points')
                .order('points', { ascending: false })
                .limit(5);
              
              if (error) {
                throw error;
              }
              
              setLeaderBoardScores(data?.points || 0);
            } catch (error) {

              console.error('Error fetching high scores:', error);
              setError('Kunde inte hämta leaderboard');

            } finally {
              setLoading(false);
            }
          };
          
          fetchLeaderBoardScores();
        }, []);

    return (
        <>
            <Container>
                <Title>Leaderboard</Title>
                <ListContainer>
                    <ListItem>
                    </ListItem>
                </ListContainer>
            </Container>
        </>
    )
}

export default Leaderboard;