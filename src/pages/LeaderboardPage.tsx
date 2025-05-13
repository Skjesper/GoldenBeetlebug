import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import ScoreForm from '../components/ScoreForm';
import HighScore from '../components/HighScore';

function LeaderboardPage() {
  const [gameScore, setGameScore] = useState<number>(0);

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

      <Link to="/runehunt/start">
        <button>Startsidan</button>
      </Link>
      <Link to="/runehunt/play">
        <button>Spela igen</button>
      </Link>
    </div>
  );
}
  
  export default LeaderboardPage;