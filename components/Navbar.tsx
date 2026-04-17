"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import { GraduationCap, Smartphone, Swords, Calculator } from "lucide-react";
import ThreeDLogo from "@/components/ThreeDLogo";
import UserProfile from "@/components/UserProfile";
import StreakWidget from "@/components/StreakWidget";

export default function Navbar() {
  const { scrollY } = useScroll();

  // Interpolate values based directly on how far the user has scrolled (0px to 120px)
  const topPadding = useTransform(scrollY, [0, 120], ["24px", "0px"]);
  // This responsive CSS variable matches the exact padding of the <main> block below it!
  const sidePadding = useTransform(scrollY, [0, 120], ["var(--nav-px, 16px)", "0px"]);
  const navMaxWidth = useTransform(scrollY, [0, 120], ["1280px", "100%"]);
  const navRadius = useTransform(scrollY, [0, 120], ["24px", "0px"]);
  const shadowOpacity = useTransform(scrollY, [0, 120], [0.1, 0.4]);

  // Dynamically interpolate the background opacity from 50% to 95%
  const bgPercent = useTransform(scrollY, [0, 120], [50, 95]);
  const background = useTransform(bgPercent, v => `color-mix(in srgb, var(--theme-surface) ${v}%, transparent)`);

  return (
    <motion.div
      // left-0 right-0 effectively acts as w-full while preventing scrollbar overlaps
      className="fixed top-0 left-0 right-0 z-50 flex justify-center [--nav-px:1rem] md:[--nav-px:2rem] lg:[--nav-px:3rem]"
      style={{ 
        paddingTop: topPadding, 
        paddingLeft: sidePadding, 
        paddingRight: sidePadding 
      }}
    >
      <motion.header
        className="w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-3 px-5 py-3 glass"
        style={{
          maxWidth: navMaxWidth,
          borderRadius: navRadius,
          background, // overrides the static .glass background
          boxShadow: useTransform(shadowOpacity, o => `0 10px 15px -3px rgba(0,0,0,${o})`),
        }}
      >
        <div className="flex items-center gap-4">
          <ThreeDLogo size="w-12 h-12 md:w-14 md:h-14" />
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-0.5 font-display drop-shadow-[0_0_15px_rgba(204,255,0,0.4)]">
              <span className="text-primary">G</span>en<span className="text-secondary">Z</span> <span className="text-foreground">Invest</span>
            </h1>
            <p className="text-foreground/70 text-[10px] md:text-xs font-medium tracking-wide max-w-sm uppercase opacity-80 hidden md:block">
              Your daily market alpha. No boomer jargon.
            </p>
          </div>
        </div>
        
        {/* Action Buttons Container - scaled to ~75% */}
        <div className="flex flex-wrap gap-3">
          {/* Button 1: Learn Investing */}
          <Link
            href="/learn"
            className="relative group px-4 py-2 rounded-full bg-neutral-900 border border-white/20 text-white font-bold text-sm md:text-base flex items-center gap-2 overflow-hidden transition-all hover:scale-105 hover:border-lime-400/50 hover:shadow-[0_0_30px_rgba(163,230,53,0.3)] active:scale-95"
          >
            <span className="absolute inset-0 bg-lime-400/10 translate-x-[-100%] active:translate-x-[100%] duration-1000 group-hover:translate-x-[100%] ease-in-out"></span>
            <GraduationCap size={16} className="text-lime-400 group-hover:rotate-12 transition-transform" />
            <span>Learn</span>
          </Link>

          {/* Button 2: Swipe Wisdom */}
          <Link
            href="/flashcards"
            className="relative group px-4 py-2 rounded-full bg-neutral-900 border border-white/20 text-white font-bold text-sm md:text-base flex items-center gap-2 overflow-hidden transition-all hover:scale-105 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] active:scale-95"
          >
            <span className="absolute inset-0 bg-amber-500/10 translate-x-[-100%] active:translate-x-[100%] duration-1000 group-hover:translate-x-[100%] ease-in-out"></span>
            <Smartphone size={16} className="text-amber-500 group-hover:rotate-12 transition-transform" />
            <span>Swipe</span>
          </Link>

          {/* Button 3: Brand Wars */}
          <Link
            href="/brand-wars"
            className="relative group px-4 py-2 rounded-full bg-neutral-900 border border-white/20 text-white font-bold text-sm md:text-base flex items-center gap-2 overflow-hidden transition-all hover:scale-105 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] active:scale-95"
          >
            <span className="absolute inset-0 bg-red-500/10 translate-x-[-100%] active:translate-x-[100%] duration-1000 group-hover:translate-x-[100%] ease-in-out"></span>
            <Swords size={16} className="text-red-500 group-hover:scale-125 transition-transform" />
            <span>Brand Wars</span>
          </Link>

          {/* Button 4: Tax Saver */}
          <Link
            href="/tax-saver"
            className="relative group px-4 py-2 rounded-full bg-neutral-900 border border-white/20 text-white font-bold text-sm md:text-base flex items-center gap-2 overflow-hidden transition-all hover:scale-105 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] active:scale-95"
          >
            <span className="absolute inset-0 bg-blue-500/10 translate-x-[-100%] active:translate-x-[100%] duration-1000 group-hover:translate-x-[100%] ease-in-out"></span>
            <Calculator size={16} className="text-blue-500 group-hover:rotate-12 transition-transform" />
            <span>Tax Saver</span>
          </Link>

          <StreakWidget />
          <UserProfile />
        </div>
      </motion.header>
    </motion.div>
  );
}

