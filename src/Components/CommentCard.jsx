import { formatDate } from "../../utils/formatting";

const CommentCard = ({ comment }) => {
    return (
        <article className="comment-card">
            <div className="comment-metadata">
                <span className="comment-author">{comment.author}</span>
                <span className="comment-date">{formatDate(comment.created_at)}</span>
            </div>
            <p className="comment-body">{comment.body}</p>
            <div className="comment-votes">
                <span>Votes:&nbsp;{comment.votes}</span>
            </div>
        </article>
    )
}

export default CommentCard;
