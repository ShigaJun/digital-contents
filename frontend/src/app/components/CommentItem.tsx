'use client'

import Image from 'next/image'
import type { User } from '@supabase/supabase-js'
import type { Comment } from '@/types/comment'
import { formatPostDate } from '@/lib/dateUtils'

interface CommentItemProps {
  comment: Comment
  user: User | null
  toggleReaction: (commentId: number, wasLiked: boolean) => void
  style: React.CSSProperties
}

const CommentItem = ({ comment, user, toggleReaction, style }: CommentItemProps) => {
  return (
    <div
      className={['flex gap-3', 'animate-[commentIn_220ms_ease-out_both]'].join(' ')}
      style={style}
    >
      {/* avatar */}
      <div className="shrink-0">
        <div className="avatar">
          <div className="w-9 h-9 rounded-full ring-1 ring-base-200">
            <Image
              src={comment.users?.avatar_url || '/images/dummycat.png'}
              alt={comment.users?.name || 'user avatar'}
              width={36}
              height={36}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* main */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="text-sm truncate">{comment.users?.name ?? '名無しさん'}</div>
              <div className="text-xs text-base-content/60">{formatPostDate(comment.created_at)}</div>
            </div>
          </div>
        </div>

        <div className="mt-1 text-sm whitespace-pre-wrap break-words leading-relaxed">{comment.content}</div>

        <div className="mt-2 flex items-center gap-1">
          <button
            type="button"
            className={[
              'btn btn-ghost btn-sm btn-circle',
              comment.isLiked ? 'text-primary' : 'text-base-content/60',
            ].join(' ')}
            aria-label={comment.isLiked ? 'いいねを取り消す' : 'いいねする'}
            onClick={() => toggleReaction(comment.comment_id, comment.isLiked)}
            disabled={!user}
          >
            <span className={['text-lg leading-none', comment.isLiked ? 'animate-[reactionPop_180ms_ease-out]' : ''].join(' ')} aria-hidden>
              👍
            </span>
          </button>
          {comment.likeCount > 0 && (
            <span className="text-xs text-base-content/60">{comment.likeCount}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentItem
