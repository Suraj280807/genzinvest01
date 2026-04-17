"use client";

import React, { useState } from 'react';
import { Loader2, Sparkles, X } from 'lucide-react';

export default function AiExplainTooltip({ term, children }: { term: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  const fetchExplanation = async () => {
    if (explanation) return; // already fetched
    
    setLoading(true);
    try {
      const res = await fetch(`/api/explain?term=${encodeURIComponent(term)}`);
      const data = await res.json();
      setExplanation(data.explanation || "Brain empty, vibes only. Couldn't figure this one out.");
    } catch (e) {
      setExplanation("Whoops. The AI got distracted watching TikTok.");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
    fetchExplanation();
  };

  return (
    <span className="relative inline-block">
      <span 
        onClick={handleClick}
        className="cursor-pointer underline decoration-dotted decoration-yellow-500/50 hover:bg-yellow-500/20 hover:text-yellow-400 transition-colors rounded px-0.5"
      >
        {children}
      </span>

      {isOpen && (
        <span className="absolute z-[999] bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-black/95 backdrop-blur-md border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.2)] rounded-xl p-3 text-sm flex flex-col gap-2 font-inter text-white">
          <span className="flex justify-between items-center text-xs text-yellow-500 font-bold uppercase tracking-widest whitespace-nowrap">
            <span className="flex items-center gap-1"><Sparkles size={12} /> AI Explainer</span>
            <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="hover:text-white/80 p-1">
              <X size={14} />
            </button>
          </span>
          {loading ? (
            <span className="flex justify-center py-2"><Loader2 className="animate-spin text-yellow-500" size={16} /></span>
          ) : (
            <span className="text-white/80 font-medium leading-relaxed block text-left">
              {explanation}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
