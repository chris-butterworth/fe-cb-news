import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/articles">
        <img className='header-logo' src='/src/assets/cb-logo.jpg' alt="website logo" />
      </Link>
    </header>
  );
}
