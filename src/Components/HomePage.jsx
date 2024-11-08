import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <main>
      <div className="container">
        <div className="home-content">
          <h1>Welcome to NC News</h1>
          <div className="feature-grid">
            <Link to="/articles" className="feature-card">
              <h2>Articles</h2>
              <p>Browse all the latest articles</p>
            </Link>
            <Link to="/topics" className="feature-card">
              <h2>Topics</h2>
              <p>Explore articles by topic</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;