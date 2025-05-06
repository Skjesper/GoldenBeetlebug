import { Link } from "react-router-dom";

function GamePage() {
  
  return (
    <div>
      <h1>Spelsidan</h1>
        <Link to="/resultat">
            <button>Avsluta spelet</button>
        </Link>
    </div>
  );
}
  
  export default GamePage;