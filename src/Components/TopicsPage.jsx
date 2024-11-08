import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticlesByTopic } from '../api';
import ArticleCard from './ArticleCard';
import BackButton from './BackButton';
import Error from './ErrorHandling';

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
      .catch((err) => {
        setError({
          status: err.status,
          message: err.message
        });
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p className="loading-message">Loading...</p>;
  if (error) {
    return <Error status={error.status} message={error.message} />;
  }

  return (
    <main>
      <div className="container">
        <div className="page-header">
          <div className="header-left">
            <BackButton />
            <h2>Articles on {slug.charAt(0).toUpperCase() + slug.slice(1)}</h2>
          </div>
        </div>
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))
        ) : (
          <p>No articles found for this topic.</p>
        )}
      </div>
    </main>
  );
};

export default TopicsPage;