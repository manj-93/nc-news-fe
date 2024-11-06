import { Link } from 'react-router-dom'

const ArticleImage = ({ url, title, articleId }) => (
    <div className="media-container">
      <Link 
        to={`/articles/${articleId}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={url}
          alt={title}
          className="article-image"
        />
      </Link>
    </div>
  );

  export default ArticleImage;