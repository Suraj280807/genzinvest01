import React from 'react';

export default function ThreeDLogo({ size = "w-32 h-32", className = "" }: { size?: string, className?: string }) {
    const gradientId = React.useId();
    return (
        <div className={`${size} relative transform-style-3d ${className}`}>
            {/* Glowing Cube Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-500 rounded-2xl shadow-[0_0_50px_rgba(204,255,0,0.5)] opacity-80 backdrop-blur-md" />
            <div className="absolute inset-2 bg-[#020410] rounded-xl flex items-center justify-center border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ccff00" />
                            <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                    </defs>
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
            </div>
        </div>
    );
}
