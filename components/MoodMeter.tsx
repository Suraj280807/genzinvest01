
"use client";

import { motion } from "framer-motion";
import { MarketMood } from "@/lib/news";

interface MoodMeterProps {
    mood: MarketMood;
    emoji: string;
    score: number;
}

export default function MoodMeter({ mood, emoji, score }: MoodMeterProps) {
    // Determine color based on mood
    const getColor = () => {
        if (mood.includes("Greed")) return "text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]";
        if (mood.includes("Fear")) return "text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]";
        return "text-yellow-400";
    };

    const getBgGradient = () => {
        if (mood.includes("Greed")) return "from-green-500/20 to-emerald-500/5 border-green-500/30";
        if (mood.includes("Fear")) return "from-red-500/20 to-orange-500/5 border-red-500/30";
        return "from-yellow-500/20 to-orange-500/5 border-yellow-500/30";
    };

    return (
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${getBgGradient()} p-6 border backdrop-blur-sm`}>
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                        Market Mood-O-Meter
                    </h3>
                    <h2 className={`text-3xl font-black italic ${getColor()}`}>
                        {mood}
                    </h2>
                    <p className="text-xs text-gray-500 mt-2 font-mono">
                        Sentiment Score: {score > 0 ? "+" : ""}{score}
                    </p>
                </div>

                <div className="relative">
                    {/* Pulsing Glow Background */}
                    <motion.div
                        className={`absolute inset-0 rounded-full blur-[40px] opacity-40 ${mood.includes("Greed") ? "bg-green-500" : mood.includes("Fear") ? "bg-red-500" : "bg-yellow-500"}`}
                        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* The Emoji */}
                    <motion.div
                        className="text-7xl relative z-10"
                        animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {emoji}
                    </motion.div>
                </div>
            </div>

            {/* 7-Day Trend Visualization */}
            <div className="mt-6">
                <div className="flex items-end justify-between px-1 h-12 gap-1 relative border-b border-white/10 pb-1">
                    {/* Background Grid Lines */}
                    <div className="absolute w-full top-0 border-t border-white/5 border-dashed" />
                    <div className="absolute w-full top-1/2 border-t border-white/5 border-dashed" />

                    {[score - 12, score - 8, score - 4, score + 5, score - 2, score + 8, score].map((val, idx) => {
                        const normalizedHeight = Math.min(Math.max(((val + 20) / 40) * 100, 10), 100);
                        const isToday = idx === 6;
                        
                        let barColor = "bg-yellow-500/50";
                        if (val > 5) barColor = "bg-green-500/50";
                        if (val < -5) barColor = "bg-red-500/50";
                        
                        // Highlight today's bar
                        if (isToday) {
                            if (val > 5) barColor = "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]";
                            else if (val < -5) barColor = "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]";
                            else barColor = "bg-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.8)]";
                        }

                        return (
                            <div key={idx} className="flex-1 flex flex-col justify-end items-center group relative z-10">
                                <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: `${normalizedHeight}%` }}
                                    className={`w-full max-w-[12px] rounded-t-sm ${barColor} ${isToday ? 'opacity-100' : 'opacity-60'}`}
                                />
                                {/* Tooltip */}
                                <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 bg-black/80 text-[10px] px-2 py-1 rounded text-white whitespace-nowrap pointer-events-none transition-opacity">
                                    {isToday ? 'Today' : `T - ${6 - idx}`}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="mt-2 h-1 w-full flex justify-between px-1 text-[8px] font-bold text-gray-500 uppercase tracking-widest">
                    <span>1W Ago</span>
                    <span>7-Day Trend</span>
                    <span>Today</span>
                </div>
            </div>
        </div>
    );
}
