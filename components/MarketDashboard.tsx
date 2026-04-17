
"use client";

import { useEffect, useState } from "react";
import { TrendingUp, RefreshCw, Activity } from "lucide-react";
import { motion } from "framer-motion";

interface MarketIndex {
    name: string;
    value: number | string;
    change: string;
}

export default function MarketDashboard() {
    const [indices, setIndices] = useState<MarketIndex[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMarketData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/market?t=${Date.now()}`);
            const data = await res.json();
            if (data.indices) {
                setIndices(data.indices);
            }
        } catch (error) {
            console.error("Failed to fetch market data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMarketData();
        // Refresh every 10 seconds for near real-time updates
        const interval = setInterval(fetchMarketData, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full mb-8 relative z-10 glass-card p-6 md:p-8 rounded-3xl overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 blur-3xl rounded-full mix-blend-screen pointer-events-none" />

            <div className="flex items-center justify-between mb-6 px-2 relative z-10">
                <div className="flex items-center gap-3">
                    <Activity className="text-primary animate-pulse drop-shadow-[0_0_8px_rgba(204,255,0,0.8)]" size={24} />
                    <h2 className="text-xl md:text-2xl font-bold font-display uppercase tracking-widest text-foreground drop-shadow-md">
                        Market Pulse
                    </h2>
                </div>
                <button
                    onClick={fetchMarketData}
                    disabled={loading}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
                >
                    <RefreshCw size={16} className={loading ? "animate-spin text-primary" : "text-gray-400"} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
                {loading && indices.length === 0 ? (
                    // Skeleton Loader
                    [1, 2, 3].map((i) => (
                        <div key={i} className="h-28 rounded-2xl bg-surface-highlight/50 animate-pulse border border-white/5" />
                    ))
                ) : (
                    indices.map((item, idx) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass border border-white/10 p-5 rounded-2xl hover:bg-surface-highlight/30 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-primary">
                                <TrendingUp size={64} />
                            </div>

                            <h3 className="text-foreground/60 text-xs font-bold uppercase tracking-widest mb-2">
                                {item.name}
                            </h3>
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-black font-display text-foreground tracking-tight">
                                    {typeof item.value === 'number' ? item.value.toLocaleString('en-IN') : item.value}
                                </span>
                                <span className={`text-sm font-bold px-2 py-0.5 rounded-md ${item.change.includes('-') ? 'text-red-500 bg-red-500/10' : 'text-primary bg-primary/10'}`}>
                                    {item.change}
                                </span>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
