import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header id="header">
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
