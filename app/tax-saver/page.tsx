"use client";

import { motion } from "framer-motion";
import TaxDeductionCards from "@/components/TaxDeductionCards";
import TaxChatBot from "@/components/TaxChatBot";
import { Sparkles, CalendarClock } from "lucide-react";

export default function TaxSaverPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] pt-28 pb-20 px-6 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto space-y-16">
                {/* Header */}
                <div className="text-center space-y-6 max-w-3xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 font-medium text-sm"
                    >
                        <Sparkles size={16} />
                        Indian Tax Saving Guide
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 tracking-tight"
                    >
                        Keep More Of What You <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-400">Earn</span>
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-400 leading-relaxed"
                    >
                        Don't let taxes eat your wealth. From Section 80C to selecting the right tax regime, we've got everything you need to plan your Indian Income Tax.
                    </motion.p>
                </div>

                {/* Section 1: The Cheat Sheet */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative z-10"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">The Ultimate Tax Cheat Sheet</h2>
                        <p className="text-gray-400">Your quick guide to major deductions (FY 2024-25)</p>
                    </div>
                    <TaxDeductionCards />
                </motion.div>

                {/* Section 2: AI Tax Advisor */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative z-10 py-10"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">Ask the AI Tax Assistant</h2>
                        <p className="text-gray-400">Have specific questions about your salary breakdown? Chat now!</p>
                    </div>
                    <TaxChatBot />
                </motion.div>

                {/* Section 3: Coming Soon */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10 mt-16 max-w-4xl mx-auto"
                >
                    <div className="p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
                        
                        <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-6">
                            <CalendarClock size={32} className="text-primary" />
                        </div>
                        
                        <h2 className="text-3xl font-bold text-white mb-4">More Tax Features Coming Soon! 🚀</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                            We are constantly building tools to help you save more. Stay tuned for these upcoming features designed specifically for the GenZ investor.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                            <div className="p-5 rounded-2xl bg-black/40 border border-white/5">
                                <h4 className="font-bold text-white mb-1">⚖️ Old vs New Calculator</h4>
                                <p className="text-sm text-gray-500">Automatically compare both regimes based on your exact salary.</p>
                            </div>
                            <div className="p-5 rounded-2xl bg-black/40 border border-white/5">
                                <h4 className="font-bold text-white mb-1">🧾 Document Auto-Scanner</h4>
                                <p className="text-sm text-gray-500">Upload your Form 16 and let AI find missing deductions.</p>
                            </div>
                            <div className="p-5 rounded-2xl bg-black/40 border border-white/5">
                                <h4 className="font-bold text-white mb-1">🏢 Freelancer Mode</h4>
                                <p className="text-sm text-gray-500">Section 44ADA breakdown specifically for freelancers & creators.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
