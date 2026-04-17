"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useGamification } from '@/context/GamificationContext';
import { Flame, Star, Gift, Share2, Wallet, CheckCircle2, ChevronRight } from 'lucide-react';

export default function RewardsPage() {
  const { streakCount, xpTokens, addXP, incrementStreak, hasClaimedDaily, claimDaily } = useGamification();
  const [redeemed, setRedeemed] = useState(false);
  const [copied, setCopied] = useState(false);

  // Milestone logic: complete 100 days streak
  const is100DaysEligible = streakCount >= 100;
  const [milestoneClaimed, setMilestoneClaimed] = useState(false);

  const handleDailyClaim = () => {
    if (!hasClaimedDaily) {
      addXP(10);
      incrementStreak(); // just for demo purposes, increase streak
      claimDaily();
    }
  };

  const handle100DayClaim = () => {
    if (is100DaysEligible && !milestoneClaimed) {
      addXP(1000);
      setMilestoneClaimed(true);
    }
  };

  const handlePartnerRedeem = () => {
    if (xpTokens >= 1000) {
      addXP(-1000);
      setRedeemed(true);
    } else {
      alert("Not enough XP! You need 1000 XP.");
    }
  };

  const copyReferral = () => {
    navigator.clipboard.writeText("GENZ-MONEY-2026");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 relative overflow-hidden">
      <ProtectedRoute>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-yellow-500/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <Navbar />
          <div className="h-32 md:h-40 w-full" aria-hidden="true" />
          
          <div className="mb-10 text-center">
            <h2 className="text-4xl md:text-5xl font-black font-display mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]">
              Rewards Portal 🎁
            </h2>
            <p className="text-white/60">Maintain your streak, earn XP, and redeem real stock broker cash.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Daily Streak & Claim */}
            <div className="glass p-6 rounded-3xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[40px] rounded-full" />
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-orange-500/20 rounded-2xl border border-orange-500/30">
                  <Flame size={32} className="text-orange-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white/50 uppercase tracking-widest">Current Streak</div>
                  <div className="text-3xl font-black">{streakCount} Days</div>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center gap-4">
                <div>
                  <h4 className="font-bold">Daily Check-in</h4>
                  <p className="text-xs text-white/50">+10 XP by exploring the app</p>
                </div>
                <button 
                  disabled={hasClaimedDaily}
                  onClick={handleDailyClaim}
                  className={`px-4 py-2 font-bold rounded-xl whitespace-nowrap transition-all ${hasClaimedDaily ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]'}`}
                >
                  {hasClaimedDaily ? 'Claimed!' : 'Claim 10 XP'}
                </button>
              </div>

              {/* 100 Day Milestone built specifically for the user prompt */}
              <div className={`mt-4 p-4 rounded-2xl border flex justify-between items-center gap-4 transition-all ${is100DaysEligible && !milestoneClaimed ? 'bg-yellow-500/20 border-yellow-500/40 shadow-[0_0_20px_rgba(234,179,8,0.2)]' : 'bg-white/5 border-white/10'}`}>
                <div>
                  <h4 className="font-bold text-yellow-400">100 Day Milestone</h4>
                  <p className="text-xs text-white/50">Complete 100 days streak</p>
                </div>
                <button 
                  disabled={!is100DaysEligible || milestoneClaimed}
                  onClick={handle100DayClaim}
                  className={`px-4 py-2 font-bold rounded-xl whitespace-nowrap transition-all 
                  ${milestoneClaimed ? 'bg-white/10 text-white/30' 
                   : is100DaysEligible ? 'bg-yellow-500 hover:bg-yellow-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)] animate-pulse' 
                   : 'bg-white/10 text-white/30'}`}
                >
                  {milestoneClaimed ? 'Claimed 1000 XP' : is100DaysEligible ? 'Claim 1000 XP' : `${100 - streakCount} days left`}
                </button>
              </div>
            </div>

            {/* Wallet & Partners */}
            <div className="glass p-6 rounded-3xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full" />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-yellow-500/20 rounded-2xl border border-yellow-500/30">
                    <Star size={32} className="text-yellow-400 fill-yellow-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white/50 uppercase tracking-widest">XP Balance</div>
                    <div className="text-3xl font-black text-yellow-400">{xpTokens}</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-blue-500/30 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-20"><Wallet size={64}/></div>
                <h3 className="font-bold text-blue-300 flex items-center gap-2 mb-1"><Gift size={16}/> Broker Partners</h3>
                <p className="text-xs text-blue-200/60 mb-4">Redeem XP for real cash in INDmoney or Upstox wallets.</p>
                
                {redeemed ? (
                  <div className="flex flex-col items-center justify-center p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                    <CheckCircle2 className="text-green-400 mb-2" size={32} />
                    <span className="font-bold text-green-400">₹100 sent to ID: user_019</span>
                  </div>
                ) : (
                  <button 
                    onClick={handlePartnerRedeem}
                    disabled={xpTokens < 1000}
                    className={`w-full p-3 font-bold rounded-xl flex items-center justify-between transition-all ${xpTokens >= 1000 ? 'bg-blue-500 hover:bg-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-white/10 text-white/50 cursor-not-allowed'}`}
                  >
                    <span>Redeem 1000 XP → ₹100 Cash</span>
                    <ChevronRight size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Refer and Earn */}
            <div className="md:col-span-2 glass p-6 rounded-3xl border border-[#a3ff12]/20 relative overflow-hidden bg-gradient-to-r from-black/40 to-[#a3ff12]/5">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-[#a3ff12]/20 text-[#a3ff12] text-xs font-bold uppercase tracking-widest rounded-full mb-3 border border-[#a3ff12]/30">
                    Bonus
                  </div>
                  <h3 className="text-2xl font-black font-display mb-2">Refer & Earn up to 2000 XP</h3>
                  <p className="text-white/60 text-sm max-w-md">
                    Invite your friends to learn investing. When they sign up and complete their first streak week, you both get 500 XP! 
                  </p>
                </div>

                <div className="w-full md:w-auto flex flex-col gap-2">
                  <div className="flex border border-white/20 rounded-xl overflow-hidden bg-black/50">
                    <div className="px-4 py-3 font-mono text-white/80 select-all">GENZ-MONEY-2026</div>
                    <button 
                      onClick={copyReferral}
                      className="px-4 py-3 bg-white/10 hover:bg-white/20 font-bold transition-colors border-l border-white/20"
                    >
                      {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                  <button className="w-full p-3 bg-[#a3ff12] text-black font-black uppercase tracking-widest rounded-xl hover:bg-lime-400 transition-colors flex items-center justify-center gap-2">
                    <Share2 size={16} /> Share Link
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </ProtectedRoute>
    </main>
  );
}
