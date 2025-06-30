import type { Article } from './FriendCircleLite';

interface ArticleCardProps {
  article: Article;
  errorImg: string;
  onAuthorClick: (author: string, avatar: string, link: string) => void;
}

export default function ArticleCard({ article, errorImg, onAuthorClick }: ArticleCardProps) {
  const handleAuthorClick = () => {
    onAuthorClick(article.author, article.avatar, article.link);
  };

  return (
    <div className="card">
      <div className="card-title" onClick={() => window.open(article.link, '_blank')}>
        {article.title}
      </div>

      <div className="card-author" onClick={handleAuthorClick}>
        <img 
          src={article.avatar || errorImg} 
          className="no-lightbox"
          onError={(e) => (e.currentTarget.src = errorImg)}
          alt={article.author}
        />
        <span>{article.author}</span>
      </div>

      <div className="card-date">
        🗓️{article.created.substring(0, 10)}
      </div>

      <img 
        src={article.avatar || errorImg} 
        className="card-bg no-lightbox"
        onError={(e) => (e.currentTarget.src = errorImg)}
        alt=""
      />
    </div>
  );
}
