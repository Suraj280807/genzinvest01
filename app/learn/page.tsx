
"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, TrendingUp, DollarSign, Brain, BarChart3, PieChart, Activity } from "lucide-react";
import SIPCalculator from "@/components/SIPCalculator";
import MarketCycleChart from "@/components/MarketCycleChart";
import { motion } from "framer-motion";

export default function LearnPage() {
    return (
        <main className="min-h-screen p-4 md:p-8 relative bg-black text-white selection:bg-primary selection:text-black pb-24">
            {/* Background Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </Link>

                <header className="mb-16">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase font-display">
                        <span className="text-primary">Learn</span> to <span className="text-secondary">Earn</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                        Unlock the secrets of the market with visual, data-driven lessons.
                    </p>
                </header>

                <div className="space-y-12">

                    {/* Topic 1: The Power of SIP */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-surface border border-white/10 rounded-3xl p-6 md:p-10 overflow-hidden"
                    >
                        <div className="flex flex-col gap-8">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4 text-green-400">
                                    <DollarSign size={28} />
                                    <span className="font-bold tracking-widest uppercase text-sm">Wealth Creation Tool</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Start an SIP Early?</h2>
                                <div className="space-y-4 text-gray-300 leading-relaxed text-lg max-w-3xl">
                                    <p>
                                        <strong className="text-white">Compound Interest</strong> is the 8th wonder of the world.
                                        Small, regular investments can grow into massive wealth over time due to the snowball effect.
                                        Use the calculator below to see your potential returns.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full">
                                <SIPCalculator />
                            </div>
                        </div>
                    </motion.section>

                    {/* Topic 2: Market Cycles */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-surface border border-white/10 rounded-3xl p-6 md:p-10 overflow-hidden"
                    >
                        <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4 text-secondary">
                                    <TrendingUp size={28} />
                                    <span className="font-bold tracking-widest uppercase text-sm">Market Psychology</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Mastering Market Cycles</h2>
                                <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
                                    <p>
                                        Markets move in waves. Understanding where we are in the cycle prevents
                                        panic selling at the bottom or "FOMO" buying at the top.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 my-6">
                                        <div className="bg-white/5 p-4 rounded-lg">
                                            <h4 className="font-bold text-red-400 mb-1">Bear Market</h4>
                                            <p className="text-xs text-gray-400">Prices fall. Fear dominates. Smart money accumulates here.</p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-lg">
                                            <h4 className="font-bold text-green-400 mb-1">Bull Market</h4>
                                            <p className="text-xs text-gray-400">Prices rise. Greed dominates. Public enters here.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <MarketCycleChart />
                                <p className="text-center text-xs text-gray-500 mt-2 font-mono">
                                    The Emotional Rollercoaster of an Investor
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Topic 3: Asset Allocation */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-surface border border-white/10 rounded-3xl p-6 md:p-10"
                    >
                        <div className="flex items-center gap-3 mb-6 text-purple-400">
                            <PieChart size={28} />
                            <span className="font-bold tracking-widest uppercase text-sm">Portfolio Strategy</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">The Golden Rule: Diversification</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-6 rounded-2xl border border-blue-500/20">
                                <h3 className="text-xl font-bold text-blue-400 mb-2">Equity (Stocks)</h3>
                                <p className="text-gray-400 text-sm mb-4">High Risk, High Reward.</p>
                                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[60%]"></div>
                                </div>
                                <span className="text-xs text-blue-300 mt-2 block">Ideal: 60%</span>
                            </div>

                            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 p-6 rounded-2xl border border-yellow-500/20">
                                <h3 className="text-xl font-bold text-yellow-400 mb-2">Gold (Commodity)</h3>
                                <p className="text-gray-400 text-sm mb-4">Hedge against inflation.</p>
                                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-yellow-500 w-[10%]"></div>
                                </div>
                                <span className="text-xs text-yellow-300 mt-2 block">Ideal: 10%</span>
                            </div>

                            <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 p-6 rounded-2xl border border-green-500/20">
                                <h3 className="text-xl font-bold text-green-400 mb-2">Debt/FDs</h3>
                                <p className="text-gray-400 text-sm mb-4">Stability & Safety.</p>
                                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[30%]"></div>
                                </div>
                                <span className="text-xs text-green-300 mt-2 block">Ideal: 30%</span>
                            </div>
                        </div>
                    </motion.section>

                </div>

                {/* Flashcards CTA */}
                <Link href="/flashcards" className="block mb-20 group">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-blue-600 p-8 md:p-12 border border-white/10 shadow-2xl transition-transform transform hover:scale-[1.02]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="text-center md:text-left">
                                <span className="inline-block px-3 py-1 bg-black/20 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border border-white/20">
                                    New Feature
                                </span>
                                <h2 className="text-3xl md:text-5xl font-black mb-2 italic">
                                    ⚡ Learn to Earn
                                </h2>
                                <p className="text-lg md:text-xl text-purple-100 max-w-xl">
                                    Master financial terms in seconds with our new TikTok-style flashcards. Fun, fast, and addictive!
                                </p>
                            </div>
                            <div className="flex items-center gap-4 bg-black/30 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                                <span className="text-4xl">🎓</span>
                                <div className="text-left">
                                    <p className="font-bold text-white">Start Deck</p>
                                    <p className="text-xs text-purple-200">8 Cards • 2 Mins</p>
                                </div>
                                <div className="w-10 h-10 bg-white text-purple-600 rounded-full flex items-center justify-center font-bold">
                                    →
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Topic Navigation Grid */}
                <div className="mt-20">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <BookOpen className="text-primary" />
                        <span>Quick Curated Modules</span>
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { title: "Basics of Money", slug: "basics-of-money" },
                            { title: "Power of Compounding", slug: "power-of-compounding" },
                            { title: "Inflation 101", slug: "inflation-101" },
                            { title: "Stock Market Basics", slug: "stock-market-basics" },
                            { title: "What is SIP?", slug: "what-is-sip" },
                            { title: "Mutual Funds", slug: "mutual-funds" },
                            { title: "ETFs Explained", slug: "etfs-explained" },
                            { title: "Risk Management", slug: "risk-management" },
                            { title: "IPO Analysis", slug: "ipo-analysis" },
                            { title: "Crypto Basics", slug: "crypto-basics" },
                            { title: "Tax Planning", slug: "tax-planning" },
                            { title: "Retirement Planning", slug: "retirement" }
                        ].map((module, idx) => (
                            <Link href={`/learn/${module.slug}`} key={module.slug}>
                                <motion.div
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + (idx * 0.05) }}
                                    className="p-4 rounded-xl bg-surface border border-white/10 text-left hover:border-primary/50 transition-colors group cursor-pointer h-full"
                                >
                                    <span className="text-xs text-gray-500 font-mono mb-2 block">Module {TXT_PIC(idx + 1)}</span>
                                    <span className="font-bold text-white group-hover:text-primary transition-colors">{module.title}</span>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}

function TXT_PIC(num: number) {
    return num.toString().padStart(2, '0');
}
