import { useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import BackButton from "./Backbutton";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); 


  useEffect(() => {
    setIsLoading(true);
    getArticles()
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
        <div className="loading-container">
          <p className="loading-message">Loading...</p>
        </div>
    );
  }
  if (error) return <p>{error}</p>;
  if (!articles.length) return <p>No articles found</p>;

  return (
    <main>
      <div className="container">
        <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <BackButton />
          <h1>Articles</h1>
        </div>
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </main>
  );
};

export default ArticlesPage;