"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Target, Plus, Smartphone, Zap, Umbrella, Plane } from 'lucide-react';
import AiExplainTooltip from '@/components/AiExplainTooltip';

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  icon: any;
  deadlineMonths: number;
}

const DEFAULT_GOALS: Goal[] = [
  { id: "1", name: "Emergency Fund", target: 50000, current: 12000, icon: <Umbrella size={24} className="text-blue-500"/>, deadlineMonths: 6 },
  { id: "2", name: "New iPhone", target: 80000, current: 80000, icon: <Smartphone size={24} className="text-lime-500"/>, deadlineMonths: 3 },
  { id: "3", name: "Bali Trip", target: 120000, current: 20000, icon: <Plane size={24} className="text-orange-500"/>, deadlineMonths: 12 },
];

export default function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>(DEFAULT_GOALS);
  const [showAdd, setShowAdd] = useState(false);

  // New goal state
  const [nName, setNName] = useState("");
  const [nTarget, setNTarget] = useState(10000);

  const handleAdd = () => {
    if (nName.trim() === "") return;
    setGoals([...goals, { 
      id: Math.random().toString(), 
      name: nName, 
      target: nTarget, 
      current: 0, 
      icon: <Zap size={24} className="text-yellow-500"/>, 
      deadlineMonths: 12 
    }]);
    setShowAdd(false);
    setNName("");
    setNTarget(10000);
  };

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 relative overflow-hidden">
      <ProtectedRoute>
        {/* Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <Navbar />
          <div className="h-32 md:h-40 w-full" aria-hidden="true" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-2 flex items-center gap-3">
                Goal Tracker <Target className="text-lime-400" />
              </h2>
              <p className="text-white/60">
                Investing is pointless without a target. Attach your investments to real things. 
                Keep in mind that <AiExplainTooltip term="Inflation">Inflation</AiExplainTooltip> means you need to save *more* than the current price tag.
              </p>
            </div>
            <button 
              onClick={() => setShowAdd(!showAdd)}
              className="px-6 py-3 bg-[#a3ff12] text-black font-bold uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(163,255,18,0.4)] transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
            >
              <Plus size={18} /> Add Goal
            </button>
          </div>

          {showAdd && (
            <div className="glass p-6 rounded-3xl border border-[#a3ff12]/30 mb-8 animate-in fade-in slide-in-from-top-4">
              <h3 className="font-bold mb-4">Create New Goal</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <input 
                  type="text" 
                  placeholder="E.g., MacBook Pro" 
                  value={nName}
                  onChange={(e) => setNName(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#a3ff12]"
                />
                <input 
                  type="number" 
                  placeholder="Target Amount (₹)" 
                  value={nTarget}
                  onChange={(e) => setNTarget(parseInt(e.target.value) || 0)}
                  className="w-full md:w-48 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#a3ff12]"
                />
                <button 
                  onClick={handleAdd}
                  className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200"
                >
                  Save Goal
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map(goal => {
              const percent = Math.min((goal.current / goal.target) * 100, 100);
              const isLocked = percent === 100;

              return (
                <div key={goal.id} className="glass p-6 rounded-3xl border border-white/10 relative overflow-hidden group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                      {goal.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-white/50 mb-1 tracking-widest uppercase">{goal.deadlineMonths} Months</div>
                      <div className="font-display font-bold text-[#a3ff12]">₹{goal.target.toLocaleString()}</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4">{goal.name}</h3>

                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden mb-2">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${isLocked ? 'bg-lime-400' : 'bg-gradient-to-r from-blue-500 to-[#9D00FF]'}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-white/60">₹{goal.current.toLocaleString()}</span>
                    <span className={isLocked ? "text-lime-400" : "text-white"}>{percent.toFixed(1)}%</span>
                  </div>

                  {isLocked && (
                    <div className="absolute inset-0 bg-lime-400/10 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/80 text-lime-400 px-4 py-2 rounded-full font-bold uppercase tracking-widest border border-lime-400/30">
                        Goal Achieved 🎯
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </ProtectedRoute>
    </main>
  );
}
