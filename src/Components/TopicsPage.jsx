import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticlesByTopic } from '../api'; 
import ArticleCard from './ArticleCard';
import BackButton from './BackButton';

const TopicsPage = () => {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchArticlesByTopic(slug)
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
        if (error.response?.status === 404) {
          setError(`Topic '${slug}' not found`);
        } else {
          setError('Failed to load articles');
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p className="loading-message">Loading...</p>;
  
  if (error) {
    return (
      <main>
        <div className="container">
          <div className="error-container">
            <div className="header-left">
              <BackButton />
              <h2>Error</h2>
            </div>
            <p className="error-message">{error}</p>
          </div>
        </div>
      </main>
    );
  }
}

export default TopicsPage;
