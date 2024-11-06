import { useState, useEffect } from 'react';
import { getCommentsByArticleId } from "../api";
import { MessageCircle } from 'lucide-react';
import CommentCard from './CommentCard';

const Comments = ({ articleId, commentCount, initiallyExpanded = false }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  useEffect(() => {
    if (isExpanded) {
      setIsLoading(true);
      getCommentsByArticleId(articleId)
        .then((commentsData) => {
          setComments(commentsData);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching comments:", err);
          setError("Failed to load comments");
          setIsLoading(false);
        });
    }
  }, [isExpanded, articleId]);

  const toggleComments = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="comments-container">
      <button
        className={`action-button ${isExpanded ? 'active' : ''}`}
        onClick={toggleComments}
      >
        <MessageCircle size={20} /> {commentCount} Comments
      </button>

      {isExpanded && (
        <section className="comments-section">
          <h2>Comments ({commentCount})</h2>
          {isLoading ? (
            <p>Loading comments...</p>
          ) : error ? (
            <p>{error}</p>
          ) : comments.length > 0 ? (
            <div className="comments-list">
              {comments.map((comment) => (
                <CommentCard key={comment.comment_id} comment={comment} />
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

export default Comments;