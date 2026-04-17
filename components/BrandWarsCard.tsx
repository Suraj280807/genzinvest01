'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RefreshCw, Swords } from 'lucide-react';
import { cn } from '@/lib/utils';

type Brand = {
    name: string;
    return: string;
    value: number;
    isWinner: boolean;
    price?: string;
    live?: boolean;
};

type RivalPair = {
    id: string;
    category: string;
    timeframe: string;
    dataSource?: string;
    pair: [Brand, Brand];
};

export default function BrandWarsCard() {
    const [data, setData] = useState<RivalPair | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [revealed, setRevealed] = useState(false);

    const fetchPair = async (excludeId?: string) => {
        setLoading(true);
        setRevealed(false);
        setSelectedBrand(null);
        try {
            const url = excludeId ? `/api/brand-wars?exclude=${excludeId}` : '/api/brand-wars';
            const res = await fetch(url);
            const json = await res.json();
            setData(json);
        } catch (error) {
            console.error('Failed to fetch brand wars data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPair();
    }, []);

    const handleNextBattle = () => {
        fetchPair(data?.id);
    };

    const handleChoice = (brandName: string) => {
        if (revealed) return;
        setSelectedBrand(brandName);
        setRevealed(true);
    };

    if (loading && !data) {
        return (
            <div className="w-full h-64 bg-black/80 rounded-3xl border border-white/10 flex items-center justify-center animate-pulse">
                <Swords className="w-12 h-12 text-primary/50 animate-spin-slow" />
            </div>
        );
    }

    // Fallback if initial load fails
    if (!data) return null;

    const [brand1, brand2] = data.pair;
    const userWon = data.pair.find((b) => b.name === selectedBrand)?.isWinner;

    return (
        <div className="w-full relative overflow-hidden rounded-3xl bg-neutral-950 border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)]">
            {/* Background Grid/Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/10 to-transparent blur-3xl" />

            <div className="relative p-6 md:p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-red-500/20 text-red-500 text-xs px-2 py-0.5 rounded border border-red-500/30 font-bold uppercase tracking-wider">
                                Brand Wars 🥊
                            </span>
                            <span className="text-gray-400 text-xs font-mono uppercase tracking-widest">{data.category} Edition</span>
                            {/* Live data indicator */}
                            {data.dataSource?.includes('Live') ? (
                                <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                    LIVE
                                </span>
                            ) : (
                                <span className="text-[10px] font-bold text-yellow-400/70 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded">
                                    CACHED
                                </span>
                            )}
                        </div>
                        <h2 className="text-2xl font-black text-white font-display tracking-tight">
                            Who Grew More?
                        </h2>
                    </div>
                    <button
                        onClick={handleNextBattle}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-gray-400 hover:text-white"
                        title="Next Battle"
                    >
                        <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
                    </button>
                </div>

                {/* The Arena */}
                <div className="flex flex-col md:flex-row gap-4 relative">
                    {/* Brand 1 */}
                    <BrandCard
                        brand={brand1}
                        timeframe={data.timeframe}
                        onClick={() => handleChoice(brand1.name)}
                        revealed={revealed}
                        selected={selectedBrand === brand1.name}
                        opponentSelected={selectedBrand === brand2.name}
                    />

                    {/* VS Badge */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                        <div className="bg-black border-2 border-white/10 text-white font-black italic text-xl w-12 h-12 flex items-center justify-center rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            VS
                        </div>
                    </div>

                    {/* Brand 2 */}
                    <BrandCard
                        brand={brand2}
                        timeframe={data.timeframe}
                        onClick={() => handleChoice(brand2.name)}
                        revealed={revealed}
                        selected={selectedBrand === brand2.name}
                        opponentSelected={selectedBrand === brand1.name}
                    />
                </div>

                {/* Result Message */}
                <AnimatePresence>
                    {revealed && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 text-center"
                        >
                            <p className="text-lg md:text-xl font-medium text-white mb-2">
                                {userWon ? (
                                    <span className="text-primary flex items-center justify-center gap-2">
                                        Winner! <Trophy className="w-5 h-5" /> You chose the alpha! 🚀
                                    </span>
                                ) : (
                                    <span className="text-gray-400">
                                        Oof! {brand1.isWinner ? brand1.name : brand2.name} took the crown this time. 📉
                                    </span>
                                )}
                            </p>
                            <p className="text-sm text-gray-500 font-mono">
                                Calculated based on {data.timeframe}
                            </p>
                            <button
                                onClick={handleNextBattle}
                                className="mt-4 px-6 py-2 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform active:scale-95"
                            >
                                Next Battle 🔄
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function BrandCard({
    brand,
    timeframe,
    onClick,
    revealed,
    selected,
    opponentSelected,
}: {
    brand: Brand;
    timeframe: string;
    onClick: () => void;
    revealed: boolean;
    selected: boolean;
    opponentSelected: boolean;
}) {
    const isWinner = brand.isWinner;

    // Dynamic styles based on state
    let cardStyle = "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20";
    let textStyle = "text-white";

    if (revealed) {
        if (isWinner) {
            cardStyle = "border-primary/50 bg-primary/10 shadow-[0_0_30px_rgba(34,197,94,0.1)]";
            textStyle = "text-primary";
        } else {
            cardStyle = "border-red-500/20 bg-red-500/5 opacity-50 grayscale";
            textStyle = "text-red-400";
        }
    }

    // If opponent selected and this is the winner (user picked wrong), highlight this as winner still
    if (opponentSelected && isWinner && revealed) {
        cardStyle = "border-primary/50 bg-primary/10 shadow-[0_0_30px_rgba(34,197,94,0.1)]";
        textStyle = "text-primary";
    }


    return (
        <button
            onClick={onClick}
            disabled={revealed}
            className={cn(
                "flex-1 relative h-48 md:h-64 rounded-2xl border transition-all duration-500 flex flex-col items-center justify-center p-6 group cursor-pointer overflow-hidden",
                cardStyle,
                revealed ? "cursor-default" : "hover:scale-[1.02] active:scale-[0.98]"
            )}
        >
            <div className="relative z-10 text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:tracking-wider transition-all duration-300 font-display">
                    {brand.name}
                </h3>

                {revealed ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center"
                    >
                        <div className={cn("text-4xl md:text-5xl font-black tracking-tighter", textStyle)}>
                            {brand.return}
                        </div>
                        <div className="text-xs font-mono opacity-70 mt-1 uppercase tracking-widest text-current">
                            {timeframe}
                        </div>
                        {brand.price && (
                            <div className="text-xs text-gray-400 mt-2 font-mono">
                                CMP: {brand.price}
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-sm text-gray-400 font-mono mt-2">
                        Tap to reveal
                    </div>
                )}
            </div>

            {revealed && isWinner && (
                <div className="absolute top-4 right-4 text-primary animate-bounce">
                    <Trophy size={24} />
                </div>
            )}
        </button>
    );
}
