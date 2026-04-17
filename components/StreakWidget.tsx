"use client";

import React, { useState } from 'react';
import { Flame, Star } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';

import Link from 'next/link';

export default function StreakWidget() {
  const { streakCount, xpTokens } = useGamification();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Link href="/rewards">
      <div 
        className="relative flex items-center space-x-3 bg-secondary/30 border border-white/10 px-3 py-1.5 rounded-full cursor-pointer hover:bg-secondary/60 transition-colors"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="flex items-center space-x-1">
        <Flame size={16} className={streakCount > 0 ? "text-orange-500 fill-orange-500 animate-pulse" : "text-gray-500"} />
        <span className="text-sm font-bold">{streakCount}</span>
      </div>
      
      <div className="w-px h-4 bg-white/20"></div>

      <div className="flex items-center space-x-1">
        <Star size={16} className="text-yellow-400 fill-yellow-400" />
        <span className="text-sm font-bold text-yellow-400">{xpTokens}</span>
      </div>

      {showTooltip && (
        <div className="absolute top-full mt-2 right-0 w-48 bg-black/90 backdrop-blur-md border border-white/20 p-3 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
          <p className="text-xs text-white/80 font-medium mb-1">
            <strong>{streakCount} Day Streak!</strong>
          </p>
          <p className="text-[10px] text-white/50 leading-tight">
            Visit every day to maintain streak. Click to view Rewards!
          </p>
        </div>
      )}
      </div>
    </Link>
  );
}
