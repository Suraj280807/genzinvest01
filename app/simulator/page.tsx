"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Wallet, TrendingUp, TrendingDown, RefreshCcw, DollarSign } from 'lucide-react';
import AiExplainTooltip from '@/components/AiExplainTooltip';

// Mock data
const INITIAL_BALANCE = 100000;

const MOCK_MARKET = [
  { symbol: "RELIANCE", name: "Reliance Ind.", price: 2850, change: 1.2 },
  { symbol: "TCS", name: "Tata Const.", price: 3900, change: -0.5 },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1450, change: 0.8 },
  { symbol: "ZOMATO", name: "Zomato Ltd.", price: 165, change: 4.5 },
  { symbol: "BTC-INR", name: "Bitcoin", price: 5400000, change: -2.1 },
];

export default function Simulator() {
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [holdings, setHoldings] = useState<Record<string, { qty: number, avgPrice: number }>>({});
  
  const handleBuy = (symbol: string, price: number) => {
    if (balance >= price) {
      setBalance(prev => prev - price);
      setHoldings(prev => {
        const current = prev[symbol] || { qty: 0, avgPrice: 0 };
        const newQty = current.qty + 1;
        // Simplified average price logic
        const newAvg = ((current.qty * current.avgPrice) + price) / newQty;
        return { ...prev, [symbol]: { qty: newQty, avgPrice: newAvg } };
      });
    } else {
      alert("Not enough virtual cash! 💸");
    }
  };

  const handleSell = (symbol: string, price: number) => {
    if (holdings[symbol] && holdings[symbol].qty > 0) {
      setBalance(prev => prev + price);
      setHoldings(prev => {
        const current = prev[symbol];
        if (current.qty === 1) {
          const newHoldings = { ...prev };
          delete newHoldings[symbol];
          return newHoldings;
        }
        return { ...prev, [symbol]: { ...current, qty: current.qty - 1 } };
      });
    }
  };

  const calculateTotalValue = () => {
    let total = balance;
    Object.entries(holdings).forEach(([symbol, data]) => {
      const marketAsset = MOCK_MARKET.find(m => m.symbol === symbol);
      if (marketAsset) {
        total += data.qty * marketAsset.price;
      }
    });
    return total;
  };

  const totalValue = calculateTotalValue();
  const profitLoss = totalValue - INITIAL_BALANCE;
  const isProfit = profitLoss >= 0;

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 relative overflow-hidden">
      <ProtectedRoute>
        {/* Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#9D00FF]/20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <Navbar />
          <div className="h-32 md:h-40 w-full" aria-hidden="true" />
          
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-2">Paper Trading Simulator 🕹️</h2>
            <p className="text-white/60 max-w-2xl">
              Play with ₹1 Lakh of "Monopoly" money instead of blowing up your real savings. Practice buying when there's a <AiExplainTooltip term="Bull Run">Bull Run</AiExplainTooltip> or selling when you panic.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Dashboard / Balance */}
            <div className="lg:col-span-1 space-y-4">
              <div className="glass p-6 rounded-3xl border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/10 blur-[50px] rounded-full group-hover:bg-lime-400/20 transition-all"></div>
                <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Wallet size={16} /> Total Portfolio Value
                </h3>
                <div className="text-4xl font-display font-black text-white">
                  ₹{totalValue.toLocaleString()}
                </div>
                <div className={`mt-2 flex items-center gap-1 text-sm font-bold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                  {isProfit ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {isProfit ? '+' : ''}₹{Math.abs(profitLoss).toLocaleString()} ({((profitLoss/INITIAL_BALANCE)*100).toFixed(2)}%)
                </div>
              </div>

              <div className="glass p-6 rounded-3xl border border-white/10">
                <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <DollarSign size={16} /> Buying Power
                </h3>
                <div className="text-2xl font-display font-black text-[#a3ff12]">
                  ₹{balance.toLocaleString()}
                </div>
              </div>

              <button 
                onClick={() => { setBalance(INITIAL_BALANCE); setHoldings({}); }}
                className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all flex justify-center items-center gap-2 text-sm font-bold"
              >
                <RefreshCcw size={16} /> Reset Simulator
              </button>
            </div>

            {/* Market */}
            <div className="lg:col-span-2">
              <div className="glass p-6 md:p-8 rounded-3xl border border-white/10">
                <h3 className="text-xl font-bold font-display mb-6">Market & Orders</h3>
                
                <div className="space-y-3">
                  {MOCK_MARKET.map(asset => {
                    const held = holdings[asset.symbol]?.qty || 0;
                    
                    return (
                      <div key={asset.symbol} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold">{asset.symbol}</h4>
                            <span className="text-xs text-white/50 px-2 py-0.5 bg-white/10 rounded">{asset.name}</span>
                          </div>
                          <div className="mt-1 flex gap-3 text-sm">
                            <span>₹{asset.price.toLocaleString()}</span>
                            <span className={asset.change >= 0 ? "text-green-400" : "text-red-400"}>
                              {asset.change >= 0 ? "+" : ""}{asset.change}%
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {held > 0 && (
                            <div className="text-sm font-medium text-white/60">
                              Holding: <span className="text-white font-bold">{held}</span>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleBuy(asset.symbol, asset.price)}
                              className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500 hover:text-white font-bold text-sm transition-all"
                            >
                              Buy
                            </button>
                            {held > 0 && (
                              <button 
                                onClick={() => handleSell(asset.symbol, asset.price)}
                                className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500 hover:text-white font-bold text-sm transition-all"
                              >
                                Sell
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </ProtectedRoute>
    </main>
  );
}
