import styled from "@emotion/styled";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const Container = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #FFF;
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

              console.log(data);
              
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

            </Container>
        </>
    )
}

export default Leaderboard;