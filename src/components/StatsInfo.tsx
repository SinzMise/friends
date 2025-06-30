import type { StatsData } from './FriendCircleLite';

interface StatsInfoProps {
  stats: StatsData;
}

export default function StatsInfo({ stats }: StatsInfoProps) {
  return (
    <div className="stats-container">
      <div>Powered by: <a href="https://github.com/willow-god/Friend-Circle-Lite" target="_blank">FriendCircleLite</a><br /></div>
      <div>Designed By: <a href="https://www.liushen.fun/" target="_blank">LiuShen</a><br /></div>
      <div>订阅:{stats.friends_num}   活跃:{stats.active_num}   总文章数:{stats.article_num}<br /></div>
      <div>更新时间:{stats.last_updated_time}</div>
    </div>
  );
}
