import { Link } from 'react-router-dom';
import { Home } from 'lucide-react'

const Header = () => {
  return (
    <header id="header">
      <Link to="/" className="home-button">
        <Home size={24} />
      </Link>
      <div className="header-content">
      <h1>NC News</h1>
      <nav className ="desktop-nav">
        <Link to="/articles">Articles</Link>
      </nav>
      </div>
    </header>
  );
};

export default Header;
