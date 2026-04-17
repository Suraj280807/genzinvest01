"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Calculator, ArrowRight, TrendingDown } from 'lucide-react';
import AiExplainTooltip from '@/components/AiExplainTooltip';

export default function Calculators() {
  const [sipAmount, setSipAmount] = useState(2000);
  const [sipYears, setSipYears] = useState(5);
  const [sipRate, setSipRate] = useState(12);

  const calculateSIP = () => {
    const monthlyRate = sipRate / 12 / 100;
    const months = sipYears * 12;
    const invested = sipAmount * months;
    
    // Future Value of SIP formula
    const futureValue = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    return {
      invested,
      wealthGained: futureValue - invested,
      total: futureValue
    };
  };

  const sipResult = calculateSIP();

  // Crash Calculator
  const [crashPortfolio, setCrashPortfolio] = useState(100000);
  const [crashPercent, setCrashPercent] = useState(20);
  
  const crashResult = crashPortfolio * (1 - crashPercent/100);
  const waitResult = crashPortfolio * (1 - crashPercent/100) * 1.35; // Example 35% recovery post-crash over 2 years

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 relative overflow-hidden">
      <ProtectedRoute>
        {/* Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00FF88]/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <Navbar />
          <div className="h-32 md:h-40 w-full" aria-hidden="true" />
          
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-2 flex items-center gap-3">
              "What If" Calculators <Calculator className="text-[#00FF88]" />
            </h2>
            <p className="text-white/60 max-w-2xl">
              Math is hard, so we did it for you. See the reality of <AiExplainTooltip term="Compound Interest">Compounding</AiExplainTooltip> or find out what really happens when the market crashes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            
            {/* Compounding Calculator */}
            <div className="glass p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#a3ff12]/10 blur-[50px] rounded-full"></div>
              
              <h3 className="text-xl font-bold font-display mb-6">If I invest regularly...</h3>
              
              <div className="space-y-6 relative z-10">
                <div>
                  <div className="flex justify-between text-sm mb-2 font-bold">
                    <span>Monthly SIP</span>
                    <span className="text-[#a3ff12]">₹{sipAmount.toLocaleString()}</span>
                  </div>
                  <input type="range" min="500" max="50000" step="500" value={sipAmount} onChange={(e) => setSipAmount(Number(e.target.value))} className="w-full accent-[#a3ff12]" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2 font-bold">
                    <span>Time Period (Years)</span>
                    <span className="text-[#a3ff12]">{sipYears} Yrs</span>
                  </div>
                  <input type="range" min="1" max="40" step="1" value={sipYears} onChange={(e) => setSipYears(Number(e.target.value))} className="w-full accent-[#a3ff12]" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2 font-bold">
                    <span>Expected Return (%)</span>
                    <span className="text-[#a3ff12]">{sipRate}%</span>
                  </div>
                  <input type="range" min="5" max="30" step="1" value={sipRate} onChange={(e) => setSipRate(Number(e.target.value))} className="w-full accent-[#a3ff12]" />
                </div>

                <div className="pt-6 border-t border-white/10 mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-white/50 uppercase tracking-widest mb-1">Total Invested</div>
                    <div className="font-bold text-lg">₹{Math.round(sipResult.invested).toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-white/50 uppercase tracking-widest mb-1">Estimated Value</div>
                    <div className="font-bold font-display text-3xl text-[#a3ff12]">₹{Math.round(sipResult.total).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Crash Calculator */}
            <div className="glass p-6 md:p-8 rounded-3xl border border-red-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[50px] rounded-full"></div>
              
              <h3 className="text-xl font-bold font-display mb-6 flex items-center gap-2 text-red-400">
                <TrendingDown size={20}/> If the market crashes...
              </h3>
              
              <div className="space-y-6 relative z-10">
                <div>
                  <div className="flex justify-between text-sm mb-2 font-bold">
                    <span>My Portfolio Value</span>
                    <span className="text-red-400">₹{crashPortfolio.toLocaleString()}</span>
                  </div>
                  <input type="range" min="10000" max="1000000" step="10000" value={crashPortfolio} onChange={(e) => setCrashPortfolio(Number(e.target.value))} className="w-full accent-red-500" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2 font-bold">
                    <span>Market Drops By</span>
                    <span className="text-red-400">{crashPercent}%</span>
                  </div>
                  <input type="range" min="5" max="60" step="5" value={crashPercent} onChange={(e) => setCrashPercent(Number(e.target.value))} className="w-full accent-red-500" />
                </div>

                <div className="pt-6 border-t border-red-500/10 mt-6 space-y-4">
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-red-500 block">Immediate Value</span>
                      <span className="text-xs text-white/60">If you panic sell now</span>
                    </div>
                    <div className="font-bold font-display text-xl text-red-400">₹{Math.round(crashResult).toLocaleString()}</div>
                  </div>

                  <div className="flex justify-center"><ArrowRight className="text-white/20 rotate-90" /></div>

                  <div className="p-4 bg-lime-400/10 border border-lime-400/20 rounded-xl flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-lime-400 block">Value 2 Years Later*</span>
                      <span className="text-xs text-white/60">If you hold through it</span>
                    </div>
                    <div className="font-bold font-display text-2xl text-[#a3ff12]">₹{Math.round(waitResult).toLocaleString()}</div>
                  </div>
                  <p className="text-[10px] text-white/40text-center mt-2">*Assuming historical average recovery.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </ProtectedRoute>
    </main>
  );
}
