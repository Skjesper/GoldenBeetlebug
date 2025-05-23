
'use client'
import { useEffect, useState } from "react";
import Window from "../components/Window";
import Leaderboard from "../components/Leaderboard";
import ScoreForm from '../components/ScoreForm';
import styled from "@emotion/styled";


const PageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

function LeaderboardPage() {
  const [gameScore, setGameScore] = useState<number>(0);
  const [display, setDisplay] = useState<boolean>(false); 
  const [backgroundImage] = useState<string | undefined>(undefined);
    
  useEffect(() => {
    const savedScore = localStorage.getItem('gameScore');
    if (savedScore !== null) {
      setGameScore(Number(savedScore));
    }
  }, []);

  return (
     <div>
   <Window backgroundImage={backgroundImage}>
      <PageContainer>
     {!display ? (
       <ScoreForm score={gameScore}  onDisplayChange={setDisplay}/>
      ) : (
        <Leaderboard/>
      )}
      </PageContainer>
   </Window>
 </div>
  );

}
  
  export default LeaderboardPage;