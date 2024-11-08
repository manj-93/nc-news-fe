import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import BackButton from "./BackButton";
import SortControls from "./SortControls";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const fetchArticles = (params = {}) => {
    setIsLoading(true);
    
    getArticles(params)
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const params = {
      sort_by: searchParams.get('sort_by') || 'created_at',
      order: searchParams.get('order') || 'desc'
    };
    fetchArticles(params);
  }, [searchParams]);

  if (isLoading) return <p className="loading-message">Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!articles.length) return <p>No articles found</p>;

  return (
    <main>
      <div className="container">
        <div className="page-header">
          <h1>Articles</h1>
          <SortControls onSortChange={fetchArticles} />
        </div>
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </main>
  );
};

export default ArticlesPage;