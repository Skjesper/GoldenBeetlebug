
import { useEffect, useState } from "react";
import Window from "../components/Window";
import Leaderboard from "../components/Leaderboard";
import ScoreForm from '../components/ScoreForm';
import HighScore from '../components/HighScore';

function LeaderboardPage() {
  const [gameScore, setGameScore] = useState<number>(0);

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
            <ScoreForm score={gameScore}/>
            {/* <Leaderboard/> */}
        </Window>
    </div>
  );

}
  
  export default LeaderboardPage;