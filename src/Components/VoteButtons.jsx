import { useState } from 'react';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { updateArticleVotes } from '../api';

const VoteButtons = ({ articleId, initialVotes }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [voteError, setVoteError] = useState(null);

  const handleVote = (e, voteChange) => {
    e.stopPropagation();
    setVoteError(null);
    
    setVotes((prev) => prev + voteChange);
    updateArticleVotes(articleId, voteChange)
      .catch((err) => {
        console.error('Vote update failed:', err);
        setVotes((prev) => prev - voteChange);
        setVoteError(voteChange > 0 ? "Failed to upvote" : "Failed to downvote");
      });
  };

  return (
    <div className="vote-section">
      <button 
        className="vote-button" 
        onClick={(e) => handleVote(e, 1)}
      >
        <ArrowBigUp className="vote-icon-up" size={30} />
      </button>
      <span className="vote-count">{votes}</span>
      <button 
        className="vote-button" 
        onClick={(e) => handleVote(e, -1)}
      >
        <ArrowBigDown className="vote-icon-down" size={30} />
      </button>
      {voteError && <span className="vote-error">{voteError}</span>}
    </div>
  );
};

export default VoteButtons;