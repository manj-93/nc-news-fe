import { useState } from 'react';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { patchArticleVotes } from '../api';

const VoteButtons = ({article_id, votes, setError}) => {
    const [userVote, setUserVote] = useState(0);
    const [voteCount, setVoteCount] = useState(votes);
  
    const handleVote = (voteValue) => {
        if (userVote === voteValue) return;
      
        const previousVote = userVote;
        const previousVotes = voteCount;
      
        setUserVote(voteValue);
        setVoteCount(prev => prev + voteValue - previousVote);
      
        patchArticleVotes(article_id, voteValue)
          .catch((err) => {
            setError("Failed to update vote. Please try again.");
            setUserVote(previousVote);
            setVoteCount(previousVotes);
          });
      };

    return (
        <div className="vote-section">
          <button 
            className={`vote-button ${userVote === 1 ? 'voted' : ''}`}
            onClick={() => handleVote(1)}
          >
            <ArrowBigUp 
              className="vote-icon-up" 
              size={30}
            />
          </button>
          <span className="vote-count">{voteCount}</span>
          <button 
            className={`vote-button ${userVote === -1 ? 'voted' : ''}`}
            onClick={() => handleVote(-1)}
          >
            <ArrowBigDown 
              className="vote-icon-down" 
              size={30}
            />
          </button>
        </div>
      );
    };
    
    export default VoteButtons;