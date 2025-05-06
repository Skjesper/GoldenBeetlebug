import { Link } from "react-router-dom";
import GameStart from './../components/GameStart'

function StartPage() {
    return (
      <div>
        <GameStart />
        <h1>Startsidan</h1>
        <p>Klicka nedan för att starta spelet</p>
        <Link to="/runesbeachclub">
            <button>Start Game</button>
        </Link>
        </div>
    );
  }
  
  export default StartPage;