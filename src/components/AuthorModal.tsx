import type { Article } from './FriendCircleLite';

interface AuthorModalProps {
  author: {
    name: string;
    avatar: string;
    link: string;
  };
  articles: Article[];
  errorImg: string;
  onClose: () => void;
}

export default function AuthorModal({ author, articles, errorImg, onClose }: AuthorModalProps) {
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleBackgroundClick}>
      <div className="modal-content">
        <img 
          src={author.avatar || errorImg} 
          id="modal-author-avatar"
          onError={(e) => (e.currentTarget.src = errorImg)}
          alt={author.name}
        />
        <a 
          href={new URL(author.link).origin} 
          target="_blank"
          id="modal-author-name-link"
        >
          {author.name}
        </a>
        <div id="modal-articles-container">
          {articles.slice(0, 4).map(article => (
            <div key={article.title} className="modal-article">
              <a 
                href={article.link} 
                target="_blank"
                className="modal-article-title"
              >
                {article.title}
              </a>
              <div className="modal-article-date">
                📅{article.created.substring(0, 10)}
              </div>
            </div>
          ))}
        </div>
        <img 
          src={author.avatar || errorImg} 
          id="modal-bg"
          onError={(e) => (e.currentTarget.src = errorImg)}
          alt=""
        />
      </div>
    </div>
  );
}
