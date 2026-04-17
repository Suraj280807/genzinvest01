'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ThreeDLogo from './ThreeDLogo';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        // Stage 1: Initial Reveal
        const timer1 = setTimeout(() => setStage(1), 500);
        // Stage 2: Expansion/Action
        const timer2 = setTimeout(() => setStage(2), 2500);
        // Stage 3: Finish
        const timer3 = setTimeout(() => onFinish(), 4000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onFinish]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020410] overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* 3D Logo Container */}
                <motion.div
                    initial={{ scale: 0, rotateX: 90 }}
                    animate={{
                        scale: stage >= 1 ? 1 : 0,
                        rotateX: stage >= 1 ? 0 : 90,
                        rotateY: stage === 1 ? 360 : 0
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        duration: 1.5
                    }}
                    className="perspective-1000 mb-8"
                >
                    <ThreeDLogo />
                </motion.div>

                {/* Text Reveal */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 20 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 font-display">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-purple-500">
                            GenZ Invest
                        </span>
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: stage >= 1 ? 1 : 0 }}
                        transition={{ delay: 1.2 }}
                        className="text-gray-400 text-lg tracking-widest uppercase font-bold"
                    >
                        The Future of Finance
                    </motion.p>
                </motion.div>

                {/* Loading Bar */}
                <motion.div
                    className="mt-12 w-64 h-1 bg-white/10 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: stage >= 1 ? 1 : 0 }}
                    transition={{ delay: 1.5 }}
                >
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary to-purple-500"
                        initial={{ width: "0%" }}
                        animate={{ width: stage >= 2 ? "100%" : "30%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                </motion.div>
            </div>
        </div>
    );
}
