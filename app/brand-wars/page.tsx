import ProtectedRoute from "@/components/ProtectedRoute";
import BrandWarsCard from "@/components/BrandWarsCard";
import ThreeDLogo from "@/components/ThreeDLogo";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BrandWarsPage() {
    return (
        <main className="min-h-screen relative overflow-hidden bg-neutral-950 flex flex-col">
            <ProtectedRoute>
                {/* Immersive Background */}
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-500/10 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

                <div className="relative z-10 max-w-5xl mx-auto w-full p-4 md:p-8 flex-1 flex flex-col">

                    {/* Header */}
                    <header className="flex justify-between items-center mb-8 md:mb-12">
                        <Link href="/" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back</span>
                        </Link>
                        <ThreeDLogo size="w-12 h-12" />
                    </header>

                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 font-display text-white">
                            BRAND <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">WARS</span>
                        </h1>
                        <p className="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
                            Test your market intuition. Pick the winner, beat the market.
                            <br /><span className="text-primary font-bold">Unconfirmed data? Never. Only real alpha.</span>
                        </p>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-full max-w-4xl">
                            <BrandWarsCard />
                        </div>
                    </div>

                    <footer className="mt-12 text-center text-xs text-gray-600 font-mono">
                        Data updated daily based on market closing performance.
                    </footer>

                </div>
            </ProtectedRoute>
        </main>
    );
}
