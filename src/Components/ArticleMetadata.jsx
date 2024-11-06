import { Link } from 'react-router-dom';
import { formatDate } from "../../utils/formatting";

const ArticleMetadata = ({ topic, author, date }) => (
  <>
    <div className="topic-container">
      <span className="topic-label">Topic:</span>
      <Link 
        to={`/topics/${topic}`} 
        className="topic-value" 
        onClick={(e) => e.stopPropagation()}
      >
        {topic.charAt(0).toUpperCase() + topic.slice(1)}
      </Link>
    </div>
    <div className="article-metadata">
      Posted by <Link 
        to={`/users/${author}`} 
        className="author-link" 
        onClick={(e) => e.stopPropagation()}
      >
        {author}
      </Link> • {formatDate(date)}
    </div>
  </>
);

export default ArticleMetadata;