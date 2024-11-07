import { useNavigate } from 'react-router-dom';

const ArticleNavigation = (articleId) => {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    if (!e.target.closest('a, button')) {
      navigate(`/articles/${articleId}`);
    }
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    navigate(`/articles/${articleId}?showComments=true`);
  };

  return { handleCardClick, handleCommentClick };
};

export default ArticleNavigation;