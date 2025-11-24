import { DUMMY_POSTS } from '@/lib/dummy-data';
import PostCard from './PostCard';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

interface TimelineProps {
  view: 'split' | 'map' | 'timeline';
  setView: Dispatch<SetStateAction<'split' | 'map' | 'timeline'>>;
}

const Timeline = ({ view, setView }: TimelineProps) => {
  const posts = DUMMY_POSTS; // 新着順にソートするロジックは後で追加

  return (
    <div className="relative bg-gray-100 h-full overflow-y-auto">
       {view !== 'map' && (
        <button
          onClick={() => setView(view === 'split' ? 'timeline' : 'split')}
          className="sticky top-4 right-4 bg-white/70 backdrop-blur-sm p-2 rounded-md shadow-lg hover:bg-white z-10 float-right mr-4 cursor-pointer"
        >
          <Image
            src={view === 'split' ? '/fullscreen_icon.png' : '/fullscreen_close_icon.png'}
            alt="Toggle Fullscreen"
            width={24}
            height={24}
          />
        </button>
      )}
      <div className="max-w-xl mx-auto bg-white border-x border-gray-200">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
