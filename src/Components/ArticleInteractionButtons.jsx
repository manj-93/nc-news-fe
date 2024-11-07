import { Share, MessageCircle } from 'lucide-react';

const ArticleInteractionButtons = ({ onCommentClick, commentCount }) => (
    <div className="action-buttons">
      <button 
        className="action-button"
        onClick={onCommentClick}
        aria-label="View comments"
      >
        <MessageCircle size={20} />
        <span>{commentCount} Comments</span>
      </button>
      <button 
        className="action-button"
        onClick={(e) => e.stopPropagation()}
        aria-label="Share article"
      >
        <Share size={20} />
        <span>Share</span>
      </button>
    </div>
  );

  export default ArticleInteractionButtons;