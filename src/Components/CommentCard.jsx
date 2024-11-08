import { useState } from 'react'
import { formatDate } from "../../utils/formatDate.js";
import DeleteComment from "./DeleteComment";

const CommentCard = ({ comment, onCommentDeleted }) => {

    const [isDeleted, setIsDeleted] = useState(false);
    const currentUser = "jessjelly";

    const handleCommentDeleted = (commentId) => {
        setIsDeleted(true);
        onCommentDeleted(commentId)
    }

    if(isDeleted) {
        return(
            <article className="comment=card comment-deleted">
                <p>Comment deleted!</p>
            </article>
        )
    }

    return (
        <article className="comment-card">
          <div className="comment-header">
            <div className="comment-metadata">
              <span className="comment-author">{comment.author}</span>
              <span className="comment-date">{formatDate(comment.created_at)}</span>
            </div>
            <DeleteComment 
              commentId={comment.comment_id}
              onCommentDeleted={handleCommentDeleted}
              currentUser={currentUser}
              commentAuthor={comment.author}
            />
          </div>
          <p className="comment-body">{comment.body}</p>
          <div className="comment-footer">
            <span className="comment-votes">Votes: {comment.votes}</span>
          </div>
        </article>
      );
    };
    

export default CommentCard;
