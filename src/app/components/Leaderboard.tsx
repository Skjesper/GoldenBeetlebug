'use client'
import styled from "@emotion/styled";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Button from "./Button";

const Container = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--background);
    padding: 2rem;
    border-radius: 20px;
    gap: 2rem;

    @media (orientation: landscape) and (min-width: 1100px) {
        padding: 3rem 5rem;

    } 
`;

const Title = styled.h1 `
    font-size: 2rem;

    @media (orientation: landscape) and (min-width: 1100px) {
        font-size: 5rem;

    } 
`;

const ListContainer = styled.ol `
    font-family: var(--font-display);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
`;

const ListItem = styled.li `
    font-family: var(--font-secondary);
    font-size: 1rem;
    text-decoration: 0.8px black underline;
    font-weight: 100;

    @media (orientation: landscape) and (min-width: 1100px) {
        font-size: 2rem;

    } 
`;

interface LeaderboardScore {
    nickname: string;
    points: number;
}

function Leaderboard() {
      const [leaderBoardScores, setLeaderBoardScores] = useState<LeaderboardScore[] | null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState('');
    

      useEffect(() => {
          const fetchLeaderBoardScores = async () => {
            try {
              const { data, error } = await supabase
                .from('scores')
                .select('nickname, points')
                .order('points', { ascending: false })
                .limit(5);
              
              if (error) {
                throw error;
              }
              
              setLeaderBoardScores(data);
            } catch (error) {

              console.error('Error fetching high scores:', error);
              setError('Kunde inte hämta leaderboard');

            } finally {
              setLoading(false);
            }
          };
          
          fetchLeaderBoardScores();
        }, []);

            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Container>

                <Title>Leaderboard</Title>

                <ListContainer>
                    {leaderBoardScores?.map((score, index) => (
                        <ListItem key={index}>
                            {score.nickname} - {score.points} points
                        </ListItem>
                    ))}
                </ListContainer>

                <Button to='/'>Startsidan</Button>

            </Container>
        </>
    )
}

export default Leaderboard;