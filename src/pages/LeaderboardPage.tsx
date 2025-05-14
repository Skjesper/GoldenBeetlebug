
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
      <h1>Resultat</h1>
      <HighScore />
        <ScoreForm score={gameScore}/>

       <Window backgroundImage={backgroundImage}>
            <Leaderboard/>
        </Window>
    </div>
  );

}
  
  export default LeaderboardPage;