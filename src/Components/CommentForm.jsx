import { useState } from 'react';
import { postComment } from '../api';

const CommentForm = ({ articleId, onCommentPosted }) => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!comment.trim()) {
      setError('Please enter a comment');
      return;
    }

    setIsSubmitting(true);
    postComment(articleId, { body: comment })
      .then(() => {
        setComment('');
        onCommentPosted();
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          setError('Please ensure your comment is valid');
        } else {
          setError('Failed to post comment. Please try again.');
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="What are your thoughts?"
        className="comment-input"
        disabled={isSubmitting}
      />
      {error && <p className="form-error">{error}</p>}
      <button 
        type="submit" 
        className="comment-submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
};

export default CommentForm;