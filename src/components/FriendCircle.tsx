import { useEffect, useRef } from 'react';
import { useFriendCircleConfig } from '@/contexts/FriendCircleConfig';

export default function FriendCircle() {
  const { config } = useFriendCircleConfig();
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current || !containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://jsd.cdn.sinzmise.top/gh/willow-god/Friend-Circle-Lite/main/fclite.min.js';
    script.async = true;
    
    script.onload = () => {
      if (containerRef.current && window.FriendCircleLite) {
        window.FriendCircleLite.init(containerRef.current, config);
        scriptLoaded.current = true;
      }
    };

    script.onerror = () => {
      console.error('Failed to load FriendCircle script');
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [config]);

  return (
    <div className="friend-circle-container">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
