"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGamification } from '@/context/GamificationContext';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Shield, Rocket, Target, ArrowRight } from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    question: "You see your portfolio drop by 15% in a day. What do you do?",
    answers: [
      { text: "Sell everything immediately. Panic.", type: "Safe Starter" },
      { text: "Ignore it. The market always recovers over time.", type: "Steady Builder" },
      { text: "Buy the dip! Sounds like a discount.", type: "Trend Chaser" }
    ]
  },
  {
    question: "If you had an extra ₹10,000 right now, you would:",
    answers: [
      { text: "Put it in an FD or Bank account.", type: "Safe Starter" },
      { text: "Split it into Index funds and Blue-chips.", type: "Steady Builder" },
      { text: "YOLO it into a smallcap or crypto.", type: "Trend Chaser" }
    ]
  },
  {
    question: "My primary goal for investing is:",
    answers: [
      { text: "Absolutely zero risk to my capital.", type: "Safe Starter" },
      { text: "Beating inflation steadily over 5-10 years.", type: "Steady Builder" },
      { text: "I want to get rich quick.", type: "Trend Chaser" }
    ]
  }
];

export default function Quiz() {
  const router = useRouter();
  const { setRiskProfile, riskProfile } = useGamification();
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ "Safe Starter": 0, "Steady Builder": 0, "Trend Chaser": 0 });
  const [finished, setFinished] = useState(false);

  const handleAnswer = (type: "Safe Starter" | "Steady Builder" | "Trend Chaser") => {
    const newScores = { ...scores, [type]: scores[type] + 1 };
    setScores(newScores);

    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      // calculate results
      let maxKey = "Steady Builder" as "Safe Starter" | "Steady Builder" | "Trend Chaser";
      let maxVal = -1;
      (Object.entries(newScores) as [typeof maxKey, number][]).forEach(([key, val]) => {
        if (val > maxVal) {
          maxVal = val;
          maxKey = key;
        }
      });
      setRiskProfile(maxKey);
      setFinished(true);
    }
  };

  const currentProfileInfo = () => {
    if (riskProfile === "Safe Starter") return { desc: "You prioritize capital protection. FDs and Index funds are your best friends.", icon: <Shield size={48} className="text-blue-500 mb-4 mx-auto"/>, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/30" };
    if (riskProfile === "Steady Builder") return { desc: "You have patience. You take calculated risks for long-term growth.", icon: <Target size={48} className="text-lime-500 mb-4 mx-auto"/>, color: "text-lime-500", bg: "bg-lime-500/10 border-lime-500/30" };
    if (riskProfile === "Trend Chaser") return { desc: "You are fearless. High risk, high reward. Crypto and smallcaps call your name.", icon: <Rocket size={48} className="text-orange-500 mb-4 mx-auto"/>, color: "text-orange-500", bg: "bg-orange-500/10 border-orange-500/30" };
    return null;
  };

  const profileData = currentProfileInfo();

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 relative overflow-hidden">
      <ProtectedRoute>
        {/* Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#9D00FF]/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <Navbar />
          <div className="h-32 md:h-40 w-full" aria-hidden="true" />

          <div className="max-w-2xl mx-auto glass p-8 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] text-center relative overflow-hidden">
            {!finished ? (
              <div key={currentQ} className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white/60 mb-6 uppercase tracking-widest">
                  Question {currentQ + 1} of {QUIZ_QUESTIONS.length}
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold font-display mb-8 leading-relaxed">
                  {QUIZ_QUESTIONS[currentQ].question}
                </h2>

                <div className="flex flex-col gap-4">
                  {QUIZ_QUESTIONS[currentQ].answers.map((ans, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(ans.type as any)}
                      className="w-full text-left p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all font-medium text-white/90"
                    >
                      {ans.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="animate-in zoom-in-95 duration-500 py-8">
                {profileData?.icon}
                <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white mb-6 uppercase tracking-widest">
                  Your Vibe Is Set
                </div>
                <h2 className={`text-4xl font-black font-display mb-4 ${profileData?.color}`}>
                  {riskProfile}
                </h2>
                <p className="text-white/60 mb-8 max-w-md mx-auto">
                  {profileData?.desc} We've saved this to your profile, and your news feed will adapt to your style.
                </p>
                <div className={`p-6 rounded-2xl border ${profileData?.bg} max-w-md mx-auto`}>
                  <p className="text-sm">
                    <strong>Pro Tip:</strong> Head over to the <span className="text-white font-bold">SIP Planner</span> to see what a {riskProfile} portfolio looks like with your actual budget!
                  </p>
                </div>
                <button 
                  onClick={() => router.push('/sip-planner')}
                  className="mt-8 px-8 py-3 rounded-xl bg-white text-black font-bold flex items-center gap-2 mx-auto hover:scale-105 active:scale-95 transition-all"
                >
                  Go to SIP Planner <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </ProtectedRoute>
    </main>
  );
}
