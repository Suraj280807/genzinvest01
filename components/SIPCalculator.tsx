"use client";

import { useState, useEffect, useMemo } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Wallet, TrendingUp, Calendar, Info } from "lucide-react";

export default function SIPCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [expectedReturn, setExpectedReturn] = useState(12);
    const [timePeriod, setTimePeriod] = useState(10);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Calculation Logic
    const results = useMemo(() => {
        const data = [];
        const monthlyRate = expectedReturn / 12 / 100;
        const months = timePeriod * 12;

        let totalInvested = 0;
        let futureValue = 0;

        // Generate data points for every year
        for (let year = 1; year <= timePeriod; year++) {
            const n = year * 12;
            // SIP Formula: P × ({[1 + i]^n - 1} / i) × (1 + i)  (assuming investment at start of period)
            // Standard SIP usually at end, but start is common for simpler calc. Let's use End of Month for simplicity:
            // M = P * ({[1 + i]^n - 1} / i)

            const investedNow = monthlyInvestment * n;
            const fvNow = monthlyInvestment * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) * (1 + monthlyRate); // Investment at beginning of month

            data.push({
                year: `Year ${year}`,
                invested: Math.round(investedNow),
                wealthGained: Math.round(fvNow - investedNow),
                total: Math.round(fvNow),
            });

            if (year === timePeriod) {
                totalInvested = investedNow;
                futureValue = fvNow;
            }
        }

        return {
            totalInvested,
            wealthGained: futureValue - totalInvested,
            totalValue: futureValue,
            chartData: data,
        };
    }, [monthlyInvestment, expectedReturn, timePeriod]);

    // Format Currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="w-full bg-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 md:p-8 space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                            <span className="bg-primary/20 text-primary p-2 rounded-lg"><TrendingUp size={24} /></span>
                            SIP Calculator
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">See how your money grows over time.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Controls Section (Left/Top) */}
                    <div className="lg:col-span-5 space-y-8">

                        {/* Monthly Investment Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-gray-300 font-medium flex items-center gap-2">
                                    <Wallet size={16} className="text-primary" /> Monthly Investment
                                </label>
                                <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-primary font-bold font-mono">
                                    ₹{monthlyInvestment.toLocaleString('en-IN')}
                                </div>
                            </div>
                            <input
                                type="range"
                                min="500"
                                max="100000"
                                step="500"
                                value={monthlyInvestment}
                                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-hover transition-all"
                            />
                            <div className="flex justify-between text-xs text-gray-500 font-mono">
                                <span>₹500</span>
                                <span>₹1L</span>
                            </div>
                        </div>

                        {/* Expected Return Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-gray-300 font-medium flex items-center gap-2">
                                    <TrendingUp size={16} className="text-green-400" /> Expected Return (p.a)
                                </label>
                                <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-green-400 font-bold font-mono">
                                    {expectedReturn}%
                                </div>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="30"
                                step="0.5"
                                value={expectedReturn}
                                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-400 hover:accent-green-300 transition-all"
                            />
                            <div className="flex justify-between text-xs text-gray-500 font-mono">
                                <span>1%</span>
                                <span>30%</span>
                            </div>
                        </div>

                        {/* Time Period Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-gray-300 font-medium flex items-center gap-2">
                                    <Calendar size={16} className="text-blue-400" /> Time Period
                                </label>
                                <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-blue-400 font-bold font-mono">
                                    {timePeriod} Years
                                </div>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="30"
                                step="1"
                                value={timePeriod}
                                onChange={(e) => setTimePeriod(Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-400 hover:accent-blue-300 transition-all"
                            />
                            <div className="flex justify-between text-xs text-gray-500 font-mono">
                                <span>1 Yr</span>
                                <span>30 Yrs</span>
                            </div>
                        </div>

                        {/* Results Summary Cards */}
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                                <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider">Invested Amount</p>
                                <p className="text-white font-bold text-lg">{formatCurrency(results.totalInvested)}</p>
                            </div>
                            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                                <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider">Wealth Gained</p>
                                <p className="text-green-400 font-bold text-lg">+{formatCurrency(results.wealthGained)}</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 rounded-2xl text-center">
                            <p className="text-gray-300 text-sm mb-2 uppercase tracking-widest font-bold">Total Future Value</p>
                            <p className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                                {formatCurrency(results.totalValue)}
                            </p>
                        </div>

                    </div>

                    {/* Chart Section (Right/Bottom) */}
                    <div className="lg:col-span-7 h-[400px] w-full bg-black/20 rounded-2xl border border-white/5 p-4">
                        {isMounted ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={results.chartData}
                                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#888888" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#888888" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                    <XAxis
                                        dataKey="year"
                                        stroke="#666"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        minTickGap={30} // Prevent overlapping labels
                                    />
                                    <YAxis
                                        stroke="#666"
                                        fontSize={12}
                                        tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                        formatter={(value: any) => [formatCurrency(value), ""]}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="invested"
                                        name="Invested Amount"
                                        stackId="1"
                                        stroke="#888"
                                        fill="url(#colorInvested)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="wealthGained"
                                        name="Wealth Gained"
                                        stackId="1"
                                        stroke="#22c55e"
                                        fill="url(#colorWealth)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                Loading Chart...
                            </div>
                        )}
                        <div className="flex items-center justify-center gap-6 mt-2 text-xs text-gray-400 font-mono">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-gray-500/50"></div> Invested
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div> Wealth Gained
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
