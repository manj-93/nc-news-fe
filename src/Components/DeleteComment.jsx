import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteComment } from '../api';

const DeleteComment = ({ commentId, onCommentDeleted, currentUser, commentAuthor }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  const isOwnComment = currentUser === commentAuthor;

  const handleDelete = () => {
    if (window.confirm('Delete comment?')) {
      setIsDeleting(true);
      setError(null);
      setSuccessMessage('');

      deleteComment(commentId)
        .then(() => {
          setSuccessMessage('Comment deleted successfully!');
          
          setTimeout(() => {
            if (onCommentDeleted) {
              onCommentDeleted(commentId);
            }
          }, 1500); 
        })
        .catch(() => {
          setError('Failed to delete comment');
        })
        .finally(() => {
          setIsDeleting(false);
        });
    }
  };

  if (!isOwnComment) return null;

  return (
    <div className="delete-comment-container">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="success-message delete-success">
          {successMessage}
        </div>
      )}

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="delete-button"
        aria-label="Delete comment"
      >
        <Trash2 size={16} />
        <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
      </button>
    </div>
  );
};

export default DeleteComment;