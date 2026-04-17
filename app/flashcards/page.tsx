
import Link from "next/link";
import { X, Trophy } from "lucide-react";
import { FLASHCARDS } from "@/lib/flashcards";
import FlashcardItem from "@/components/FlashcardItem";

// Force dynamic rendering so shuffle happens on every request
export const dynamic = 'force-dynamic';

export default function FlashcardsPage() {
    // Fisher-Yates Shuffle Algorithm
    const shuffledCards = [...FLASHCARDS];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }

    return (
        <main className="h-screen w-full bg-black text-white overflow-hidden relative">
            {/* Header / Nav */}
            <div className="fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <div className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                    <Trophy size={18} className="text-yellow-400" />
                    <span className="font-bold text-sm">Learn to Earn</span>
                </div>

                <Link
                    href="/learn"
                    className="pointer-events-auto p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-red-500/20 hover:text-red-500 transition-colors border border-white/10"
                >
                    <X size={20} />
                </Link>
            </div>

            {/* ScrollSnap Container */}
            <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
                {/* Intro Card */}
                <div className="w-full h-screen flex flex-col items-center justify-center p-6 snap-start shrink-0 text-center bg-gradient-to-br from-gray-900 to-black relative">
                    <div className="max-w-md space-y-6">
                        <div className="inline-block p-6 rounded-full bg-primary/20 mb-4 animate-pulse">
                            <Trophy size={64} className="text-primary" />
                        </div>
                        <h1 className="text-5xl font-black tracking-tight text-white mb-2">
                            Learn in <br /><span className="text-primary">Seconds</span>
                        </h1>
                        <p className="text-xl text-gray-400">
                            Swipe up to master the market terms. <br />Tap cards to flip them.
                        </p>
                        <div className="pt-8">
                            <div className="animate-bounce">
                                <span className="text-sm font-mono text-gray-500 uppercase tracking-widest">Swipe Up</span>
                                <div className="mt-2 w-6 h-10 border-2 border-gray-600 rounded-full mx-auto relative flex justify-center">
                                    <div className="w-1 h-3 bg-white rounded-full mt-2 animate-ping" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cards - Shuffled */}
                {shuffledCards.map((card) => (
                    <FlashcardItem key={card.id} data={card} />
                ))}

                {/* Outro Card */}
                <div className="w-full h-screen flex flex-col items-center justify-center p-6 snap-start shrink-0 text-center bg-black">
                    <h2 className="text-4xl font-bold mb-6">You're a Pro! 🎓</h2>
                    <p className="text-gray-400 mb-8">You've gone through today's deck.</p>
                    <Link
                        href="/learn"
                        className="px-8 py-4 bg-primary text-black font-black text-xl rounded-full hover:scale-105 transition-transform"
                    >
                        Back to Modules
                    </Link>
                </div>
            </div>
        </main>
    );
}
