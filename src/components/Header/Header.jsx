import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/create" className="nav-link">
        Create Quiz
      </Link>

      <h1 id="title"> React Flashcards</h1>
    </header>
  );
}

export default Header;
