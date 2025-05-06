import { Link } from "react-router-dom";

function StartPage() {
    return (
      <div>
        <h1>Startsidan</h1>
        <p>Klicka nedan för att starta spelet</p>
        <Link to="/runesbeachclub">
        <button>Start Game</button>
        </Link>
        </div>
    );
  }
  
  export default StartPage;