import { Share, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from "../../utils/formatting";
import VoteButtons from "./VoteButtons";
import ArticleNavigation from './ArticleNavigation';

const ArticleCard = ({ article }) => {

  const { handleCardClick, handleCommentClick } = ArticleNavigation(article.article_id)

  return (
    <section className="article-card" onClick={handleCardClick} role="article">
      <VoteButtons articleId={article.article_id} initialVotes={article.votes} />

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
