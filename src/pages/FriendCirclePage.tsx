import FriendCircleLite from '@/components/FriendCircleLite';
import { FriendCircleConfigProvider } from '@/contexts/FriendCircleConfig';

export default function FriendCirclePage() {
  return (
    <div className="min-h-screen bg-white p-4">
      <FriendCircleConfigProvider>
        <div className="border rounded-lg p-4">
          <FriendCircleLite />
        </div>
      </FriendCircleConfigProvider>
    </div>
  );
}

