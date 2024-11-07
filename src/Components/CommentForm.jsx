import { useState } from 'react';
import { postComment } from '../api';

const CommentForm = ({ articleId, onCommentPosted }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage('');

    postComment(articleId, comment.trim())
      .then(() => {
        setComment('');
        setSuccessMessage('Comment posted successfully');
        if (onCommentPosted) {
          onCommentPosted();
        }
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      })
      .catch((err) => {
        setError('Failed to post comment');
        console.error('Error posting comment:', err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="comment-form-container">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="success-message post-success">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add comment"
          className="comment-input"
          disabled={isSubmitting}
          rows={4}
        />
        <button
          type="submit"
          disabled={isSubmitting || !comment.trim()}
          className="comment-submit-button"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;