import { ArrowBigUp, ArrowBigDown } from 'lucide-react';



const ArticleCard = ({ article }) => {
  return (
      <article className="article-card">
        <div className="vote-section">
          <button className="vote-button">
            <ArrowBigUp className="vote-icon-up" size={24} strokeWidth={2} />
          </button>
          <span className="vote-count">{article.votes}</span>
          <button className="vote-button">
            <ArrowBigDown className="vote-icon-down" size={24} strokeWidth={2}/>
          </button>
        </div>
        <div className="content-section">
          <div className="text-content">
            <h3>{article.title}</h3>
            <div className="article-metadata">
              Posted by <span>{article.author}</span> • {article.created_at}
            </div>
          </div>
          {article.article_img_url && (
            <div className="media-container">
              <img
                src={article.article_img_url}
                alt={article.title}
                className="article-image"
              />
            </div>
          )}
          <div className="action-buttons">
            <button className="action-button">
              💬 {article.comment_count} Comments
            </button>
            <button className="action-button">↗️ Share</button>
          </div>
        </div>
      </article>
  );
};

export default ArticleCard;