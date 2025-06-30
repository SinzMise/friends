import { useState, useEffect, useCallback } from 'react';
import { useFriendCircleConfig } from '@/contexts/FriendCircleConfig';
import ArticleCard from './ArticleCard';
import RandomArticle from './RandomArticle';
import StatsInfo from './StatsInfo';
import AuthorModal from './AuthorModal';

export interface Article {
  title: string;
  link: string;
  author: string;
  avatar: string;
  created: string;
}

export interface StatsData {
  friends_num: number;
  active_num: number;
  article_num: number;
  last_updated_time: string;
}

interface ApiResponse {
  article_data: Article[];
  statistical_data: StatsData;
}

export default function FriendCircleLite() {
  const { config } = useFriendCircleConfig();
  const [articles, setArticles] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<{
    name: string;
    avatar: string;
    link: string;
  } | null>(null);
  const [randomArticle, setRandomArticle] = useState<Article | null>(null);

  const loadArticles = useCallback(async () => {
    setLoading(true);
    try {
      const cacheKey = 'friend-circle-lite-cache';
      const cacheTimeKey = 'friend-circle-lite-cache-time';
      const cacheTime = localStorage.getItem(cacheTimeKey);
      const now = new Date().getTime();

      if (cacheTime && now - Number(cacheTime) < 10 * 60 * 1000) {
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          const data = JSON.parse(cachedData) as ApiResponse;
          processData(data);
          return;
        }
      }

      const response = await fetch(`${config.private_api_url}all.json`);
      const data = await response.json() as ApiResponse;
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(cacheTimeKey, now.toString());
      processData(data);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  }, [config.private_api_url]);

  const processData = (data: ApiResponse) => {
    setAllArticles(data.article_data);
    setStats(data.statistical_data);
    setRandomArticle(data.article_data[Math.floor(Math.random() * data.article_data.length)]);
    setArticles(data.article_data.slice(0, config.page_turning_number));
    setStartIndex(config.page_turning_number);
  };

  const handleLoadMore = () => {
    const newArticles = allArticles.slice(startIndex, startIndex + config.page_turning_number);
    setArticles(prev => [...prev, ...newArticles]);
    setStartIndex(prev => prev + config.page_turning_number);
  };

  const handleAuthorClick = (author: string, avatar: string, link: string) => {
    setSelectedAuthor({ name: author, avatar, link });
    setShowModal(true);
  };

  const refreshRandomArticle = () => {
    if (allArticles.length > 0) {
      setRandomArticle(allArticles[Math.floor(Math.random() * allArticles.length)]);
    }
  };

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  return (
    <div className="friend-circle-lite">
      {randomArticle && (
        <RandomArticle 
          article={randomArticle} 
          onRefresh={refreshRandomArticle} 
        />
      )}

      <div className="articles-container">
        {articles.map((article, index) => (
          <ArticleCard
            key={`${article.title}-${index}`}
            article={article}
            errorImg={config.error_img}
            onAuthorClick={handleAuthorClick}
          />
        ))}
      </div>

      {startIndex < allArticles.length && (
        <button 
          onClick={handleLoadMore}
          className="load-more-btn"
          disabled={loading}
        >
          {loading ? '加载中...' : '再来亿点'}
        </button>
      )}

      {stats && <StatsInfo stats={stats} />}
			
      {showModal && selectedAuthor && (
        <AuthorModal
          author={selectedAuthor}
          articles={allArticles.filter(a => a.author === selectedAuthor.name)}
          errorImg={config.error_img}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
