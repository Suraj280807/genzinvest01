"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import PostCard from '@/components/Feed/PostCard';
import CreatePostBox from '@/components/Feed/CreatePostBox';
import { Loader2, Users } from 'lucide-react';

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // We are bypassing complex auth for the prototype and assigning a mock ID
  // In production, this would be `useAuth().user.uid`
  const currentUserId = "guest_uid"; 

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/feed");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (e) {
      console.error("Failed to fetch feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 relative overflow-hidden bg-background">
      <ProtectedRoute>
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[#9D00FF]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <Navbar />
          <div className="h-32 md:h-40 w-full" aria-hidden="true" />
          
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold font-display flex items-center gap-3">
              Trader Feed <Users className="text-blue-400" />
            </h2>
            <p className="text-white/60">Share charts, ask questions, and learn from the community.</p>
          </div>

          <CreatePostBox onPostCreated={fetchPosts} />

          {loading ? (
            <div className="flex justify-center p-12 text-white/50">
              <Loader2 className="animate-spin" size={32} />
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map(post => (
                <PostCard key={post.id} post={post} currentUserId={currentUserId} />
              ))}
              
              {posts.length === 0 && (
                <div className="text-center p-12 glass rounded-3xl border border-white/10 text-white/50">
                  No posts yet. Be the first to share!
                </div>
              )}
            </div>
          )}

        </div>
      </ProtectedRoute>
    </main>
  );
}
