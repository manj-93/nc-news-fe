import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getArticleById } from "../api";
import { Share, MessageCircle, ArrowLeft, ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { formatDate } from '../../utils/formatting';

const SingleArticle = () => {
  const navigate = useNavigate();
  const { article_id } = useParams()
  const [article, setArticle] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id).then((articleData) => {
      setArticle(articleData)
      setIsLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching article:", err);
      setError("Failed to load article");
      setIsLoading(false);
    });
  }, [article_id])

  if (isLoading) {
    return (
      <div className="loading-container">
        <p className="loading-message">Loading...</p>
      </div>
    );
  }
  
  if (error) return <p>{error}</p>;
  if (!article) return <p>No article found</p>;

  return (
    <div className="single-article">
      <header>
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={30} />
        </button>
        <h1>{article.title}</h1>
      </header>
      
      <div className="article-metadata">
        Posted by <Link to={`/users/${article.author}`} className="author-link">{article.author}</Link> • {formatDate(article.created_at)}
      </div>

      <div className="topic-container">
        <span className="topic-label">Topic</span>
        <Link to={`/topics/${article.topic}`} className="topic-value">
          {article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}
        </Link>
      </div>

      <div className="media-container">
        <img id='single-article-img' src={article.article_img_url} alt={article.title} />
      </div>

      <section className="article-content">
        <p>{article.body}</p>
      </section>
      
      <div className="action-buttons">
        <button className="vote-button">
          <ArrowBigUp className="vote-icon-up" size={30}/>
        </button>
        <span className="vote-count">{article.votes}</span>
        <button className="vote-button">
          <ArrowBigDown className="vote-icon-down" size={30}/>
        </button>
        <button className="action-button">
          <MessageCircle size={20} /> {article.comment_count} Comments
        </button>
        <button className="action-button">
          <Share size={20} /> Share
        </button>
      </div>
    </div>
  )
}

export default SingleArticle;