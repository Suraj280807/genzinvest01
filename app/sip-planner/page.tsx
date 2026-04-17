"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Target, Flame, CheckCircle, Smartphone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function SipPlanner() {
  const [step, setStep] = useState(1);
  
  // States
  const [income, setIncome] = useState("");
  const [risk, setRisk] = useState("");
  const [goal, setGoal] = useState("");
  const [budget, setBudget] = useState(1000);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 relative overflow-hidden">
      <ProtectedRoute>
        {/* Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#9D00FF]/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#00FF88]/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <Navbar />
          <div className="h-32 md:h-40 w-full" aria-hidden="true" />
          
          <div className="max-w-2xl mx-auto">
            
            <div className="flex items-center gap-4 mb-8">
              {step > 1 && step < 5 && (
                <button onClick={prevStep} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                  <ArrowLeft size={20} />
                </button>
              )}
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-lime-400 to-[#9D00FF]"
                  initial={{ width: "20%" }}
                  animate={{ width: `${(step / 5) * 100}%` }}
                />
              </div>
            </div>

            <div className="glass p-8 rounded-3xl min-h-[400px] flex flex-col justify-center relative shadow-[0_0_40px_rgba(157,0,255,0.1)]">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-lime-400/10 text-lime-400 text-sm font-bold border border-lime-400/20 mb-2">Step 1</div>
                    <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight">What's your monthly income vibe? 💸</h2>
                    <p className="text-white/60">Don't worry, we won't judge your Netflix subscription choices.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                      {["Under ₹20k", "₹20k - ₹50k", "₹50k - ₹1L", "Above ₹1L"].map(val => (
                        <button
                          key={val}
                          onClick={() => { setIncome(val); nextStep(); }}
                          className={`p-6 rounded-2xl text-left border transition-all ${income === val ? 'bg-[#9D00FF]/20 border-[#9D00FF] shadow-[0_0_20px_rgba(157,0,255,0.3)]' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}`}
                        >
                          <h3 className="font-bold text-lg">{val}</h3>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-orange-400/10 text-orange-400 text-sm font-bold border border-orange-400/20 mb-2">Step 2</div>
                    <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight">How do you handle risk? 🎢</h2>
                    
                    <div className="space-y-4 mt-8">
                      {[
                        { id: "Safe Starter", desc: "I cry if I lose ₹100. Keep it safe.", icon: <Target size={24} className="text-blue-400"/> },
                        { id: "Steady Builder", desc: "A few bumps are okay, but I prefer stability.", icon: <CheckCircle size={24} className="text-lime-400"/> },
                        { id: "Trend Chaser", desc: "I survived the crypto crash. Give me returns!", icon: <Flame size={24} className="text-orange-500"/> }
                      ].map(type => (
                        <button
                          key={type.id}
                          onClick={() => { setRisk(type.id); nextStep(); }}
                          className={`w-full p-4 md:p-6 flex items-center gap-4 rounded-2xl text-left border transition-all ${risk === type.id ? 'bg-orange-500/20 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)]' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}`}
                        >
                          <div className="p-3 bg-black/40 rounded-xl">{type.icon}</div>
                          <div>
                            <h3 className="font-bold text-lg md:text-xl">{type.id}</h3>
                            <p className="text-white/60 text-sm mt-1">{type.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-blue-400/10 text-blue-400 text-sm font-bold border border-blue-400/20 mb-2">Step 3</div>
                    <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight">What are we saving for? 🎯</h2>
                    
                    <div className="flex flex-wrap gap-3 mt-8">
                      {["New iPhone", "Bike", "Study Abroad", "Emergency Fund", "Retire at 40", "Just vibing (Wealth)"].map(val => (
                        <button
                          key={val}
                          onClick={() => { setGoal(val); nextStep(); }}
                          className={`px-6 py-3 rounded-full font-bold border transition-all ${goal === val ? 'bg-blue-500 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'} hover:scale-105 active:scale-95`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6 text-center"
                  >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-lime-400/10 text-lime-400 text-sm font-bold border border-lime-400/20 mb-2">Step 4</div>
                    <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight">Set your monthly SIP 💳</h2>
                    <p className="text-white/60 mb-8">Even ₹500 is a great start. No amount is too small.</p>
                    
                    <div className="text-6xl md:text-8xl font-black text-[#a3ff12] font-display my-12 drop-shadow-[0_0_20px_rgba(163,255,18,0.4)]">
                      ₹{budget.toLocaleString()}
                    </div>
                    
                    <input 
                      type="range" 
                      min="500" 
                      max="25000" 
                      step="500" 
                      value={budget} 
                      onChange={(e) => setBudget(parseInt(e.target.value))} 
                      className="w-full max-w-md accent-[#a3ff12] h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />

                    <div className="mt-12">
                      <button 
                        onClick={nextStep}
                        className="w-full max-w-sm mx-auto px-8 py-4 bg-[#a3ff12] text-black font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_30px_rgba(163,255,18,0.5)] hover:-translate-y-1 transition-all active:scale-95 text-lg"
                      >
                        Generate My Plan
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-8"
                  >
                    <div className="text-center">
                      <div className="inline-block px-4 py-1.5 rounded-full bg-lime-400/10 text-lime-400 text-sm font-bold border border-lime-400/20 mb-4 animate-pulse">
                        Plan Ready!
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold font-display">Your First SIP Split 🚀</h2>
                      <p className="text-white/60 mt-2">Based on your {goal} goal & ₹{budget} budget.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-8">
                      {/* Flex allocation logic based on risk */}
                      {risk === "Safe Starter" && (
                        <>
                          <SplitCard fund="Nifty 50 Index Fund" type="Large Cap (Safe)" pct={70} budget={budget} color="border-green-500" />
                          <SplitCard fund="Liquid Debt Fund" type="Emergency/Stabilizer" pct={30} budget={budget} color="border-blue-500" />
                        </>
                      )}
                      
                      {risk === "Steady Builder" && (
                        <>
                          <SplitCard fund="Nifty 50 Index Fund" type="Core Foundation" pct={50} budget={budget} color="border-green-500" />
                          <SplitCard fund="Flexi Cap Fund" type="Growth Engine" pct={30} budget={budget} color="border-blue-500" />
                          <SplitCard fund="Mid Cap Fund" type="Alpha Booster" pct={20} budget={budget} color="border-yellow-500" />
                        </>
                      )}

                      {(risk === "Trend Chaser" || risk === "") && (
                        <>
                          <SplitCard fund="Flexi Cap Fund" type="Aggressive Growth" pct={40} budget={budget} color="border-orange-500" />
                          <SplitCard fund="Small Cap Fund" type="High Risk / High Reward" pct={40} budget={budget} color="border-red-500" />
                          <SplitCard fund="Tech Sectoral Fund" type="Thematic Trend" pct={20} budget={budget} color="border-[#9D00FF]" />
                        </>
                      )}
                    </div>
                    
                    <div className="pt-6 border-t border-white/10 text-center">
                      <p className="text-sm text-white/50 mb-4">You can automate this via platforms like Zerodha or Groww.</p>
                      <button className="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 font-bold transition-colors">
                        Save to my goals
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </ProtectedRoute>
    </main>
  );
}

function SplitCard({ fund, type, pct, budget, color }: { fund: string, type: string, pct: number, budget: number, color: string }) {
  const amount = (budget * pct) / 100;
  return (
    <div className={`flex items-center justify-between p-4 bg-white/5 border-l-4 ${color} border-y border-r border-y-white/5 border-r-white/5 rounded-r-xl`}>
      <div>
        <h4 className="font-bold text-lg">{fund}</h4>
        <p className="text-xs text-white/50 uppercase tracking-wider">{type} • {pct}%</p>
      </div>
      <div className="text-right">
        <div className="font-black text-xl text-[#a3ff12]">₹{amount}</div>
        <div className="text-xs text-white/50">/ month</div>
      </div>
    </div>
  );
}
