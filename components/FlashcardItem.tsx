
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FlashcardData } from "@/lib/flashcards";
import { Repeat } from "lucide-react";
import { playFlipSound } from "@/lib/sound";

export default function FlashcardItem({ data }: { data: FlashcardData }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
        playFlipSound(); // Play sound via global utility
    };

    return (
        <div className="w-full h-screen flex items-center justify-center p-6 snap-start shrink-0 relative overflow-hidden">
            {/* Ambient Background based on card color */}
            <div className={`absolute inset-0 opacity-20 blur-[100px] ${data.color}`} />

            <div
                className="w-full max-w-md aspect-[3/4] cursor-pointer group perspective-1000"
                onClick={handleFlip}
            >
                <motion.div
                    className="w-full h-full relative preserve-3d"
                    initial={false}
                    animate={{
                        rotateY: isFlipped ? 180 : 0,
                        scale: isFlipped ? 1.02 : 1, // Subtle scale for pop effect
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 150, // Softer spring for weight
                        damping: 20,
                        mass: 1.2
                    }}
                >
                    {/* FRONT */}
                    <div className={`absolute inset-0 backface-hidden rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl border border-white/10 ${data.color} bg-opacity-20 backdrop-blur-md`}>
                        <span className="text-sm font-bold tracking-widest uppercase opacity-70 mb-4 bg-black/20 px-3 py-1 rounded-full">
                            {data.category}
                        </span>
                        <div className="text-9xl mb-8 drop-shadow-2xl filter">{data.icon}</div>
                        <h2 className="text-4xl font-black text-white drop-shadow-md mb-4">{data.term}</h2>

                        <div className="absolute bottom-8 flex flex-col items-center animate-bounce opacity-70">
                            <span className="text-xs font-mono mb-2">Tap to Learn</span>
                        </div>
                    </div>

                    {/* BACK */}
                    <div
                        className="absolute inset-0 backface-hidden rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl border border-white/10 bg-black/80 backdrop-blur-xl"
                        style={{ transform: "rotateY(180deg)" }}
                    >
                        <div className="text-6xl mb-6">{data.icon}</div>
                        <h3 className="text-2xl font-bold text-white mb-6 border-b border-primary/50 pb-2">{data.term}</h3>
                        <p className="text-xl text-gray-200 font-medium leading-relaxed mb-8">
                            {data.definition}
                        </p>
                        <div className="bg-white/10 p-4 rounded-xl border-l-4 border-primary w-full text-left mb-4">
                            <p className="text-sm text-gray-400 mb-1 font-bold uppercase">Example:</p>
                            <p className="text-sm text-white italic">"{data.example}"</p>
                        </div>

                        {data.details && (
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 w-full text-left">
                                <p className="text-xs text-secondary font-bold uppercase mb-1">Did You Know? 💡</p>
                                <p className="text-xs text-gray-300 leading-relaxed">{data.details}</p>
                            </div>
                        )}

                        <div className="absolute bottom-8 flex items-center gap-2 text-primary opacity-70">
                            <Repeat size={16} />
                            <span className="text-xs font-mono">Tap to Flip Back</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Hint for Scroll */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 items-center pointer-events-none opacity-30">
                <div className="w-1 h-32 bg-white/20 rounded-full relative overflow-hidden">
                    <motion.div
                        className="absolute w-full h-8 bg-white rounded-full"
                        animate={{ top: ["0%", "80%"] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    />
                </div>
            </div>
        </div>
    );
}
