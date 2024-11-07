import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getArticleById, getCommentsByArticleId } from "../api";
import { Share, MessageCircle, ArrowLeft } from 'lucide-react';
import { formatDate } from '../../utils/formatting';
import CommentCard from './CommentCard';
import VoteButtons from './VoteButtons'; 
import CommentForm from './CommentForm';

const SingleArticle = () => {
  const { article_id } = useParams();
  const [searchParams] = useSearchParams();
  const showCommentsInitially = searchParams.get('showComments') === 'true';
  const navigate = useNavigate();
  
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentsVisible, setCommentsVisible] = useState(showCommentsInitially);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((articleData) => {
        setArticle(articleData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load content");
        setIsLoading(false);
      });
  }, [article_id]);

  useEffect(() => {
    if (commentsVisible) {
      setIsLoadingComments(true);
      getCommentsByArticleId(article_id)
        .then((commentsData) => {
          setComments(commentsData);
          setIsLoadingComments(false);
        })
        .catch((err) => {
          console.error("Error fetching comments:", err);
          setError("Failed to load comments");
          setIsLoadingComments(false);
        });
    }
  }, [commentsVisible, article_id]);

  
  const handleCommentPosted = () => {
      if (commentsVisible) {
          setIsLoadingComments(true);
          getCommentsByArticleId(article_id)
          .then((commentsData) => {
              setComments(commentsData);
              setArticle(prevArticle => ({
                  ...prevArticle,
                  comment_count: prevArticle.comment_count + 1
                }));
            })
            .catch((err) => {
                console.error("Error fetching comments:", err);
                setError("Failed to load comments");
            })
            .finally(() => {
                setIsLoadingComments(false);
            });
        }
    };
    
    const handleCommentDeleted = (deletedCommentId) => {
        setComments(prevComments =>
            prevComments.filter(comment => comment.comment_id !== deletedCommentId)
        );
        setArticle(prevArticle => ({
            ...prevArticle,
            comment_count: prevArticle.comment_count -1
        }))
    }


    if (isLoading) return <div className="loading-container"><p className="loading-message">Loading...</p></div>;
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
      <div className="action-buttons sticky-actions">
        <VoteButtons 
          articleId={article_id}
          initialVotes={article.votes}
        />
        <button 
          className={`action-button ${commentsVisible ? 'active' : ''}`} 
          onClick={() => setCommentsVisible(!commentsVisible)}
        >
          <MessageCircle size={20} /> {article.comment_count} Comments
        </button>
        <button className="action-button">
          <Share size={20} /> Share
        </button>
      </div>

      {commentsVisible && (
        <section className="comments-section">
          <h2>Comments ({article.comment_count})</h2>
          <CommentForm 
          articleId = {article_id}
          onCommentPosted = {handleCommentPosted}
          />
          {isLoadingComments ? (
            <p>Loading comments...</p>
          ) : comments.length > 0 ? (
            <div className="comments-list">
              {comments.map((comment) => (
                <CommentCard key={comment.comment_id} 
                comment={comment}
                onCommentDeleted={handleCommentDeleted} />
              ))}
            </div>
          ) : (
            <p>No comments yet</p>
          )}
        </section>
      )}
    </div>
  );
};

export default SingleArticle;
