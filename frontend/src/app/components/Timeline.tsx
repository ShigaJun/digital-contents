import { DUMMY_POSTS } from '@/lib/dummy-data';
import PostCard from './PostCard';

const Timeline = () => {
  const posts = DUMMY_POSTS; // 新着順にソートするロジックは後で追加

  return (
    <div className="bg-gray-100 h-full overflow-y-auto">
      <div className="max-w-xl mx-auto bg-white border-x border-gray-200">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
