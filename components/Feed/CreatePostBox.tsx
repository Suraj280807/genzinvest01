import React, { useState } from 'react';
import { useGamification } from '@/context/GamificationContext';
import { Image as ImageIcon, Send, X } from 'lucide-react';

export default function CreatePostBox({ onPostCreated }: { onPostCreated: () => void }) {
  const { addXP } = useGamification();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setIsPosting(true);

    try {
      const res = await fetch("/api/feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          image: imageUrl,
          userId: "guest_uid",
          username: "You",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You"
        })
      });

      if (res.ok) {
        setContent("");
        setImageUrl("");
        setShowImageInput(false);
        addXP(20); // 20 XP for posting
        onPostCreated(); // Refresh feed
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-3xl p-4 border border-white/10 mb-8 mt-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full pointer-events-none" />
      
      <div className="flex gap-3">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" alt="You" className="w-10 h-10 rounded-full bg-white/10" />
        <div className="flex-1">
          <textarea 
            placeholder="Share your latest trade setup, ideas, or ask a question..." 
            className="w-full bg-transparent border-none outline-none text-white resize-none h-16 md:h-20 placeholder:text-white/40 leading-relaxed"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          
          {showImageInput && (
            <div className="mt-2 flex items-center gap-2 bg-black/40 rounded-lg p-2 border border-white/10">
              <input 
                type="text" 
                placeholder="Paste Image URL (Unsplash or direct link)..." 
                className="flex-1 bg-transparent border-none outline-none text-xs"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
              />
              <button type="button" onClick={() => setShowImageInput(false)} className="text-white/50 hover:text-white"><X size={16}/></button>
            </div>
          )}
          
          {imageUrl && !showImageInput && (
             <div className="mt-2 relative max-h-40 overflow-hidden rounded-lg border border-white/10">
                <img src={imageUrl} className="w-full object-cover" />
                <button type="button" onClick={() => setImageUrl("")} className="absolute top-2 right-2 bg-black/60 p-1 rounded-full text-white"><X size={14}/></button>
             </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
            <button 
              type="button" 
              onClick={() => setShowImageInput(true)}
              className="text-blue-400 hover:text-blue-300 font-bold text-sm flex items-center gap-1 transition-colors"
            >
              <ImageIcon size={18} /> Attach Chart
            </button>
            
            <button 
              type="submit" 
              disabled={!content.trim() || isPosting}
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full font-bold text-sm flex items-center gap-2 transition-all disabled:opacity-50"
            >
              Post <Send size={14}/>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
