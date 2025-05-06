import { Link } from "react-router-dom";

function EndPage() {
  return (
    <div>
      <h1>Resultat</h1>
      <Link to="/">
        <button>Startsidan</button>
      </Link>
      <Link to="/runesbeachclub">
        <button>Spela igen</button>
      </Link>
    </div>
  );
}
  
  export default EndPage;