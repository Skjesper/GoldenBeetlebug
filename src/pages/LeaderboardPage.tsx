import { Link } from "react-router-dom";

function LeaderboardPage() {
  return (
    <div>
      <h1>Resultat</h1>
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