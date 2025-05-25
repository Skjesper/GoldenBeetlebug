
'use client'
import { useEffect, useState } from "react";
import Leaderboard from "../components/Leaderboard";
import ScoreForm from '../components/ScoreForm';
import styled from "@emotion/styled";
import OrientationOverlay from "../components/OrientationCheck/OrientationCheck";


const PageContainer = styled.div`
    width: 100%;
    height: 100vh;
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
   <OrientationOverlay>
      <PageContainer>
     {!display ? (
       <ScoreForm score={gameScore}  onDisplayChange={setDisplay}/>
      ) : (
        <Leaderboard/>
      )}
      </PageContainer>
   </OrientationOverlay>
 </div>
  );

}
  
  export default LeaderboardPage;