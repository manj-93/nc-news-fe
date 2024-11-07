import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticlesByTopic } from '../api'; 
import ArticleCard from './ArticleCard';
import BackButton from './Backbutton';

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
        console.log("Fetched articles:", data); 
        setArticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
        setError('Failed to load articles');
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <div className="container">
        <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <BackButton />
          <h2>Articles on {slug.charAt(0).toUpperCase() + slug.slice(1)}</h2>
        </div>
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))
        ) : (
          <p>No articles found for this topic.</p>
        )}
      </div>
    </main>
  );
}

export default TopicsPage;
