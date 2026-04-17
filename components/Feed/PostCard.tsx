import React, { useState } from 'react';
import { Heart, MessageCircle, Send, MoreHorizontal, Image as ImageIcon } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';

type Comment = {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  text: string;
  createdAt: string;
};

type Post = {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  image: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
};

interface PostCardProps {
  post: Post;
  currentUserId: string;
}

export default function PostCard({ post, currentUserId }: PostCardProps) {
  const { addXP } = useGamification();
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  const hasLiked = likes.includes(currentUserId);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);

    // Optimistic UI updates
    if (hasLiked) {
      setLikes(likes.filter(id => id !== currentUserId));
    } else {
      setLikes([...likes, currentUserId]);
      addXP(2); // Local XP addition for liking
    }

    try {
      const res = await fetch(`/api/feed/${post.id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUserId }),
      });
      if (!res.ok) {
        // Revert on fail
        setLikes(post.likes);
      }
    } catch (e) {
      setLikes(post.likes);
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || isCommenting) return;
    setIsCommenting(true);

    try {
      const res = await fetch(`/api/feed/${post.id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: commentText, 
          userId: currentUserId,
          username: "Guest Trader", // Can pull from auth state
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setComments([...comments, data.comment]);
        setCommentText("");
        addXP(5); // App XP for commenting
      }
    } catch (e) {
      console.error("Failed to post comment");
    } finally {
      setIsCommenting(false);
    }
  };

  // Convert Date
  const timeStr = new Date(post.createdAt).toLocaleDateString("en-IN", {
    month: "short", day: "numeric", hour: 'numeric', minute: '2-digit'
  });

  return (
    <div className="glass rounded-3xl border border-white/10 overflow-hidden mb-6">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={post.avatar} alt={post.username} className="w-10 h-10 rounded-full bg-white/10" />
          <div>
            <h3 className="font-bold text-sm text-white">{post.username}</h3>
            <span className="text-[10px] text-white/50">{timeStr}</span>
          </div>
        </div>
        <button className="text-white/50 hover:text-white"><MoreHorizontal size={20} /></button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-sm whitespace-pre-wrap leading-relaxed">{post.content}</p>
      </div>

      {/* Image */}
      {post.image && (
        <div className="w-full relative bg-black max-h-[500px] overflow-hidden" onDoubleClick={handleLike}>
          <img src={post.image} alt="Post content" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Actions */}
      <div className="p-4 pt-3">
        <div className="flex gap-4 mb-3">
          <button onClick={handleLike} className={`${hasLiked ? 'text-red-500' : 'text-white/80 hover:text-white'} transition-colors`}>
            <Heart size={24} className={hasLiked ? 'fill-red-500 animate-pulse' : ''} />
          </button>
          <button onClick={() => setShowComments(!showComments)} className="text-white/80 hover:text-white transition-colors">
            <MessageCircle size={24} />
          </button>
          <button className="text-white/80 hover:text-white transition-colors">
            <Send size={24} />
          </button>
        </div>
        
        <div className="font-bold text-sm mb-1">{likes.length} likes</div>

        {/* Comments Section */}
        {comments.length > 0 && !showComments && (
          <button onClick={() => setShowComments(true)} className="text-xs text-white/50 mb-2">
            View all {comments.length} comments
          </button>
        )}

        {showComments && (
          <div className="space-y-3 mb-4 mt-3">
            {comments.map(c => (
              <div key={c.id} className="flex gap-2">
                <span className="font-bold text-sm">{c.username}</span>
                <span className="text-sm text-white/80">{c.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Add Comment Input */}
        <form onSubmit={handleComment} className="flex gap-2 items-center mt-3 border-t border-white/10 pt-3 relative">
          <input 
            type="text" 
            placeholder="Add a comment..." 
            className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-white/30"
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={!commentText.trim() || isCommenting}
            className="text-blue-400 font-bold text-sm disabled:opacity-50"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
