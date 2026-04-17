"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface GamificationState {
  streakCount: number;
  xpTokens: number;
  riskProfile: "Steady Builder" | "Safe Starter" | "Trend Chaser" | null;
  newsTopics: string[];
  hasClaimedDaily: boolean;
}

interface GamificationContextType extends GamificationState {
  incrementStreak: () => void;
  addXP: (amount: number) => void;
  setRiskProfile: (profile: GamificationState["riskProfile"]) => void;
  toggleNewsTopic: (topic: string) => void;
  claimDaily: () => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GamificationState>({
    streakCount: 99, // default to 99 so user can test the 100 days reward instantly!
    xpTokens: 0,
    riskProfile: null,
    newsTopics: [],
    hasClaimedDaily: false,
  });

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("gamificationState");
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse gamification state");
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem("gamificationState", JSON.stringify(state));
  }, [state]);

  const incrementStreak = () => setState(s => ({ ...s, streakCount: s.streakCount + 1 }));
  const addXP = (amount: number) => setState(s => ({ ...s, xpTokens: s.xpTokens + amount }));
  const claimDaily = () => setState(s => ({ ...s, hasClaimedDaily: true }));

  const setRiskProfile = (riskProfile: GamificationState["riskProfile"]) => setState(s => ({ ...s, riskProfile }));
  const toggleNewsTopic = (topic: string) => setState(s => {
    const topics = s.newsTopics.includes(topic)
      ? s.newsTopics.filter(t => t !== topic)
      : [...s.newsTopics, topic];
    return { ...s, newsTopics: topics };
  });

  return (
    <GamificationContext.Provider value={{ ...state, incrementStreak, addXP, setRiskProfile, toggleNewsTopic, claimDaily }}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error("useGamification must be used within a GamificationProvider");
  }
  return context;
}
