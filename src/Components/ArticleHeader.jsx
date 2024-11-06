import { Link } from 'react-router-dom'

const ArticleHeader = ({ title, articleId }) => (
    <h3>
      <Link 
        to={`/articles/${articleId}`} 
        className="title-link" 
        onClick={(e) => e.stopPropagation()}
      >
        {title}
      </Link>
    </h3>
  );

  export default ArticleHeader;