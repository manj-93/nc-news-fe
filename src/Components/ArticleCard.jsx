import { ArrowBigUp, ArrowBigDown, Share, MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from "../../utils/formatting";
import { updateArticleVotes } from "../api";
import { useState } from 'react';

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();
  const [votes, setVotes] = useState(article.votes);

  const handleVote = (voteChange) => {
    setVotes((prevVotes) => prevVotes + voteChange);
    updateArticleVotes(article.article_id, voteChange)
      .catch((err) => {
        console.error('Vote update failed:', err);
        setVotes((prevVotes) => prevVotes - voteChange);
      });
  };

  const handleCardClick = (e) => {
    if (!e.target.closest('a, button')) {
      navigate(`/articles/${article.article_id}`);
    }
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    navigate(`/articles/${article.article_id}?showComments=true`);
  };

  return (
    <section className="article-card" onClick={handleCardClick}>
      <div className="vote-section">
        <button className="vote-button" onClick={() => handleVote(1)}>
          <ArrowBigUp className="vote-icon-up" size={30} />
        </button>
        <span className="vote-count">{votes}</span>
        <button className="vote-button" onClick={() => handleVote(-1)}>
          <ArrowBigDown className="vote-icon-down" size={30} />
        </button>
      </div>
      <div className="content-section">
        <div className="text-content">
          <h3>
            <Link to={`/articles/${article.article_id}`} className="title-link" onClick={(e) => e.stopPropagation()}>
              {article.title}
            </Link>
          </h3>
          <div className="article-card-topic">
            <span className="non-clickable-text">Topic:&nbsp;</span>
            <Link to={`/topics/${article.topic}`} className="topic-link" onClick={(e) => e.stopPropagation()}>
              {article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}
            </Link>
          </div>
          <div className="article-card-metadata">
            <span className="non-clickable-text">Posted by&nbsp;</span>
            <Link to={`/users/${article.author}`} className="author-link" onClick={(e) => e.stopPropagation()}>
              {article.author}
            </Link> • {formatDate(article.created_at)}
          </div>
        </div>
        {article.article_img_url && (
          <div className="media-container">
            <Link to={`/articles/${article.article_id}`} onClick={(e) => e.stopPropagation()}>
              <img
                src={article.article_img_url}
                alt={article.title}
                className="article-image"
              />
            </Link>
          </div>
        )}
        <div className="action-buttons">
          <button className="action-button" onClick={handleCommentClick}>
            <MessageCircle size={20} /> {article.comment_count} Comments
          </button>
          <button className="action-button" onClick={(e) => e.stopPropagation()}>
            <Share size={20} /> Share
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArticleCard;
