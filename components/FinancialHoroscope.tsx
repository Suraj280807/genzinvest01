
"use client";

import { motion } from "framer-motion";
import { HoroscopeData } from "@/lib/news";
import { Sparkles, Moon, Sun, CloudRain, Zap, TrendingUp, Info } from "lucide-react";
import React from "react";

export default function FinancialHoroscope({ data }: { data: HoroscopeData }) {
    // Determine gradient based on mood/color
    const getGradient = () => {
        if (data.color.includes("green") || data.color.includes("emerald")) return "from-emerald-900/40 via-black/40 to-emerald-900/10 border-emerald-500/30";
        if (data.color.includes("red")) return "from-red-900/40 via-black/40 to-red-900/10 border-red-500/30";
        if (data.color.includes("orange")) return "from-orange-900/40 via-black/40 to-orange-900/10 border-orange-500/30";
        return "from-indigo-900/40 via-black/40 to-indigo-900/10 border-indigo-500/30";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`relative w-full overflow-hidden rounded-[2.5rem] border bg-gradient-to-r ${getGradient()} backdrop-blur-2xl shadow-2xl p-8 lg:p-10 group hover:shadow-[0_0_60px_rgba(var(--color-primary),0.15)] transition-all duration-500`}
        >
            {/* Background Texture/Mesh */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

                {/* Left: Vibe & Title */}
                <div className="flex-shrink-0 text-center lg:text-left min-w-[200px]">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest font-bold text-foreground/80 mb-4 shadow-sm">
                        <Sparkles size={14} className="text-primary animate-pulse" />
                        Daily Vibe
                    </span>
                    <h2 className={`text-3xl lg:text-5xl font-black italic tracking-tighter ${data.color} drop-shadow-[0_2px_15px_rgba(0,0,0,0.4)] mb-3`}>
                        {data.title}
                    </h2>
                    <div className="inline-flex items-center gap-2 text-sm text-foreground/70 font-bold bg-black/40 px-4 py-2 rounded-xl border border-white/10 shadow-inner">
                        {data.title.includes("Bull") || data.title.includes("Phoenix") ? (
                            <Sun className="text-yellow-400" size={16} />
                        ) : data.title.includes("Fear") || data.title.includes("Eclipse") ? (
                            <CloudRain className="text-blue-400" size={16} />
                        ) : (
                            <Moon className="text-gray-400" size={16} />
                        )}
                        <span>{data.vibe}</span>
                    </div>
                </div>

                {/* Middle: Reading (Ticker Style or Clean Text) */}
                <div className="flex-grow border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-10 relative">
                    <div className="absolute top-0 left-0 w-8 h-8 lg:-left-4 lg:w-px lg:h-12 bg-gradient-to-b from-primary/50 to-transparent hidden lg:block" />
                    <p className="text-xl lg:text-2xl text-foreground font-medium leading-relaxed font-display tracking-tight">
                        "{data.reading}"
                    </p>
                </div>

                {/* Right: Stats pills */}
                <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full lg:w-auto mt-6 lg:mt-0">
                    <div className="flex-1 bg-black/40 p-5 rounded-2xl border border-white/10 backdrop-blur-md min-w-[150px] group-hover:bg-white/10 group-hover:-translate-y-1 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                        <p className="text-xs uppercase text-foreground/50 font-black tracking-widest mb-2 flex items-center gap-1.5">
                            <Zap size={14} className="text-yellow-400" /> Cosmic Event
                        </p>
                        <p className="text-base text-foreground font-bold truncate">{data.cosmicEvent}</p>
                    </div>
                    <div className="flex-1 bg-black/40 p-5 rounded-2xl border border-white/10 backdrop-blur-md min-w-[150px] group-hover:bg-white/10 group-hover:-translate-y-1 transition-all duration-300 delay-75 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                        <p className="text-xs uppercase text-foreground/50 font-black tracking-widest mb-2 flex items-center gap-1.5">
                            <TrendingUp size={14} className="text-emerald-400" /> Lucky Asset
                        </p>
                        <p className="text-base text-foreground font-bold truncate">{data.luckyAsset}</p>
                    </div>
                </div>
            </div>

            {/* Disclaimer Footer (Subtle) */}
            <div className="absolute bottom-2 right-4 opacity-30 hover:opacity-100 transition-opacity">
                <Info size={12} className="text-white cursor-help" />
            </div>
        </motion.div>
    );
}
