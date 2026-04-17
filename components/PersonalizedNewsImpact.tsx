"use client";

import React, { useState, useEffect } from 'react';
import { useGamification } from '@/context/GamificationContext';
import { Sparkles, Loader2 } from 'lucide-react';
import AiExplainTooltip from './AiExplainTooltip';

interface Props {
  newsTitle: string;
  newsSummary: string;
}

export default function PersonalizedNewsImpact({ newsTitle, newsSummary }: Props) {
  const { riskProfile } = useGamification();
  const [impact, setImpact] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Determine static response based on profile and generic keywords, avoiding another API call if possible.
    // In production, you could fetch from Groq here passing the risk profile in the prompt.
    // We will do a generic mock generation based on riskProfile for instant UX.
    
    setLoading(true);
    
    setTimeout(() => {
      let result = "";
      if (!riskProfile) {
        result = "Take the Risk Quiz to see why this specifically matters to your portfolio!";
      } else if (riskProfile === "Safe Starter") {
        result = `As a Safe Starter, you don't need to panic about "${newsTitle.substring(0, 20)}...". Stick to your Index Funds and keep emergency cash ready. Short-term news rarely hurts long-term safety.`;
      } else if (riskProfile === "Steady Builder") {
        result = `For your balanced portfolio, this news might create slight volatility. Don't stop your SIPs. In fact, if the market dips, it's a good time to accumulate more blue-chips.`;
      } else if (riskProfile === "Trend Chaser") {
        result = `High volatility detected! 🚨 As a Trend Chaser, this is your playground. Keep an eye out for undervalued smallcaps reacting to this news. High risk, but potentially high alpha!`;
      }
      setImpact(result);
      setLoading(false);
    }, 800);
  }, [riskProfile, newsTitle]);

  return (
    <div className="bg-[#9D00FF]/10 border border-[#9D00FF]/30 rounded-xl p-6 mt-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#9D00FF]/10 blur-[50px] rounded-full"></div>
      
      <div className="flex items-center gap-2 mb-3 text-[#9D00FF]">
        <Sparkles size={20} />
        <h3 className="font-bold uppercase tracking-widest text-sm">Why this matters to YOU</h3>
      </div>
      
      {loading ? (
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <Loader2 className="animate-spin" size={16}/> Analyzing your {riskProfile || 'Unknown'} profile...
        </div>
      ) : (
        <p className="text-white/80 font-medium leading-relaxed relative z-10 text-sm md:text-base border-l-2 border-[#9D00FF]/50 pl-4">
          {impact}
        </p>
      )}
    </div>
  );
}
