"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ArrowRightLeft, Star, TrendingUp, ShieldAlert, BadgeCheck } from 'lucide-react';
import AiExplainTooltip from '@/components/AiExplainTooltip';

const MOCK_FUNDS = [
  { id: 1, name: "Nifty 50 Index Fund", category: "Large Cap", returns1Y: 28.4, returns3Y: 15.2, risk: "Low", bestFor: "Beginners", expenseRatio: 0.1 },
  { id: 2, name: "Flexi Cap Growth Fund", category: "Flexi Cap", returns1Y: 34.1, returns3Y: 18.5, risk: "Medium", bestFor: "Steady Builders", expenseRatio: 0.65 },
  { id: 3, name: "Small Cap Discovery Fund", category: "Small Cap", returns1Y: 48.9, returns3Y: 28.4, risk: "Very High", bestFor: "Trend Chasers", expenseRatio: 0.85 },
  { id: 4, name: "Tech Sectoral Fund", category: "Thematic", returns1Y: 12.4, returns3Y: 22.1, risk: "High", bestFor: "Tech Bros", expenseRatio: 0.9 },
];

export default function CompareFunds() {
  const [f1, setF1] = useState(MOCK_FUNDS[0]);
  const [f2, setF2] = useState(MOCK_FUNDS[1]);

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 relative overflow-hidden">
      <ProtectedRoute>
        {/* Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#FF007F]/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <Navbar />
          <div className="h-32 md:h-40 w-full" aria-hidden="true" />
          
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-2 flex items-center gap-3">
              Compare Funds <ArrowRightLeft className="text-[#FF007F]" />
            </h2>
            <p className="text-white/60 max-w-2xl">
              Don't just pick blindly. Compare returns, risk, and <AiExplainTooltip term="Expense Ratio">Expense Ratios</AiExplainTooltip> side-by-side. Remember, high returns usually mean high risk!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <FundSelect selected={f1} onSelect={(id) => setF1(MOCK_FUNDS.find(f => f.id === id)!)} exclude={f2.id} />
            <FundSelect selected={f2} onSelect={(id) => setF2(MOCK_FUNDS.find(f => f.id === id)!)} exclude={f1.id} />
          </div>

          <div className="glass rounded-3xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-3 divide-x divide-white/10 border-b border-white/10 bg-white/5">
              <div className="p-4 font-bold text-white/50 uppercase tracking-widest text-xs hidden md:block">Feature</div>
              <div className="p-4 font-bold text-white/50 uppercase tracking-widest text-xs md:hidden">Vs</div>
              <div className="p-4 font-bold text-center">{f1.name}</div>
              <div className="p-4 font-bold text-center">{f2.name}</div>
            </div>

            <CompareRow label="Category" v1={f1.category} v2={f2.category} />
            <CompareRow label="1Y Return" v1={`${f1.returns1Y}%`} v2={`${f2.returns1Y}%`} highlight={f1.returns1Y > f2.returns1Y ? 1 : 2} icon={<TrendingUp size={16}/>} />
            <CompareRow label="3Y Return (Annualized)" v1={`${f1.returns3Y}%`} v2={`${f2.returns3Y}%`} highlight={f1.returns3Y > f2.returns3Y ? 1 : 2} icon={<TrendingUp size={16}/>} />
            <CompareRow label="Risk Level" v1={f1.risk} v2={f2.risk} icon={<ShieldAlert size={16}/>} />
            <CompareRow label="Expense Ratio" v1={`${f1.expenseRatio}%`} v2={`${f2.expenseRatio}%`} highlight={f1.expenseRatio < f2.expenseRatio ? 1 : 2} />
            
            <div className="grid grid-cols-3 divide-x divide-white/10 bg-white/5">
              <div className="p-6 font-bold text-sm flex items-center gap-2 hidden md:flex"><Star size={16} className="text-yellow-500"/> Best For</div>
              <div className="p-6 font-bold text-sm flex items-center justify-center md:hidden"><Star size={16} className="text-yellow-500"/></div>
              <div className="p-6 text-center">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-lime-400/20 text-lime-400 text-sm font-bold rounded-full border border-lime-400/30">
                  {f1.bestFor === "Beginners" && <BadgeCheck size={14}/>} {f1.bestFor}
                </span>
              </div>
              <div className="p-6 text-center">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-lime-400/20 text-lime-400 text-sm font-bold rounded-full border border-lime-400/30">
                  {f2.bestFor === "Beginners" && <BadgeCheck size={14}/>} {f2.bestFor}
                </span>
              </div>
            </div>
          </div>

        </div>
      </ProtectedRoute>
    </main>
  );
}

function FundSelect({ selected, onSelect, exclude }: { selected: any, onSelect: (id: number) => void, exclude: number }) {
  return (
    <div className="glass p-6 rounded-3xl border border-white/10 relative">
      <label className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2 block">Select Fund</label>
      <select 
        value={selected.id}
        onChange={(e) => onSelect(parseInt(e.target.value))}
        className="w-full bg-black/50 border border-white/20 rounded-xl p-4 font-bold appearance-none outline-none focus:border-[#FF007F]"
      >
        {MOCK_FUNDS.filter(f => f.id === selected.id || f.id !== exclude).map(f => (
          <option key={f.id} value={f.id}>{f.name}</option>
        ))}
      </select>
    </div>
  );
}

function CompareRow({ label, v1, v2, highlight, icon }: { label: string, v1: string, v2: string, highlight?: number, icon?: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 divide-x divide-white/10 border-b border-white/10 transition-colors hover:bg-white/5">
      <div className="p-4 text-sm font-medium text-white/80 flex items-center gap-2 hidden md:flex">
        {icon} {label}
      </div>
      <div className="p-4 text-sm font-medium text-white/80 flex items-center justify-center md:hidden">
        {icon || label.substring(0, 3)}
      </div>
      <div className={`p-4 text-center font-bold ${highlight === 1 ? 'text-[#a3ff12]' : ''}`}>{v1}</div>
      <div className={`p-4 text-center font-bold ${highlight === 2 ? 'text-[#a3ff12]' : ''}`}>{v2}</div>
    </div>
  );
}
