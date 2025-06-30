import type { Article } from './FriendCircleLite';

interface RandomArticleProps {
  article: Article;
  onRefresh: () => void;
}

export default function RandomArticle({ article, onRefresh }: RandomArticleProps) {
  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    onRefresh();
  };

  return (
    <div className="random-article">
      <div className="random-container">
        <div className="random-container-title">随机钓鱼</div>
        <div className="random-title">{article.title}</div>
        <div className="random-author">作者: {article.author}</div>
      </div>
      <div className="random-button-container">
        <a href="#" onClick={handleRefresh}>刷新</a>
        <button 
          className="random-link-button" 
          onClick={() => window.open(article.link, '_blank')}
        >
          过去转转
        </button>
      </div>
    </div>
  );
}
