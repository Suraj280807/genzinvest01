"use client";

import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";

// ─── Inline card content (no motion.div to avoid animation conflicts) ─────────
function MarqueeNewsCard({ news }: { news: any }) {
  return (
    <Link href={`/news/${news.id}`} className="block h-full">
      <div className="card marquee-card-inner group cursor-pointer flex flex-col h-full min-h-[220px]">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-md bg-[#9D00FF]/10 text-[#9D00FF] text-[10px] font-black uppercase tracking-widest border border-[#9D00FF]/20 flex items-center gap-1.5 shadow-sm">
            <Tag size={12} /> {news.category}
          </span>
          <span className="text-xs text-white/50 font-medium flex items-center gap-1.5">
            <Calendar size={12} /> {news.date}
          </span>
        </div>

        {news.imageUrl && (
          <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden border border-white/5">
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).parentElement!.style.display = "none";
              }}
            />
          </div>
        )}

        <h3 className="text-base font-bold mb-2 leading-tight group-hover:text-[#a3ff12] text-white transition-colors line-clamp-2">
          {news.title}
        </h3>

        <p className="text-xs text-white/60 font-medium line-clamp-2 mb-4 grow">
          {news.summary}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-black">
            {news.source}
          </span>
          <span className="text-[#a3ff12] text-xs font-black flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all -translate-x-3 group-hover:translate-x-0 duration-300">
            Read <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Dual Marquee Carousel ─────────────────────────────────────────────────────
interface NewsMarqueeProps {
  newsItems: any[];
}

export default function NewsMarquee({ newsItems = [] }: NewsMarqueeProps) {
  if (!newsItems || newsItems.length === 0) return null;

  // Split items into two rows
  const half = Math.ceil(newsItems.length / 2);
  const row1Base = newsItems.slice(0, half);
  const row2Base = newsItems.slice(half).length > 0 ? newsItems.slice(half) : newsItems;

  // Quadruple for seamless -50% translate loop
  const row1 = [...row1Base, ...row1Base, ...row1Base, ...row1Base];
  const row2 = [...row2Base, ...row2Base, ...row2Base, ...row2Base];

  return (
    <>
      {/* Inject minimal animation CSS — purely extending, not rewriting design system */}
      <style>{`
        .marquee-outer {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 24px 0;
          /* Edge fade for depth effect */
          mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
        }

        /* Extend .cards to be scrollable strips */
        .cards.marquee-row {
          overflow: hidden;
          flex-wrap: nowrap;
          width: 100%;
        }

        .marquee-track {
          display: flex;
          gap: 16px;
          width: max-content;
          will-change: transform;
        }

        .marquee-track.left  { animation: marquee-left  73s linear infinite; }
        .marquee-track.right { animation: marquee-right 73s linear infinite; }

        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        /* Pause both tracks when hovering the outer container */
        .marquee-outer:hover .marquee-track {
          animation-play-state: paused;
        }

        /* Dim all cards when container hovered */
        .marquee-card-wrap {
          transition: opacity 0.35s ease, filter 0.35s ease, transform 0.35s ease;
          flex-shrink: 0;
        }

        .marquee-outer:hover .marquee-card-wrap {
          opacity: 0.5;
          filter: blur(3px);
        }

        /* Restore specifically hovered card */
        .marquee-outer .marquee-card-wrap:hover {
          opacity: 1 !important;
          filter: blur(0) !important;
          transform: scale(1.04);
          z-index: 10;
        }

        /* Inner card — extend .card without overriding it */
        .marquee-card-inner {
          background: var(--ui-surface, #111);
          border-radius: var(--ui-card-radius, 16px);
          padding: var(--ui-spacing-md, 16px);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(255,255,255,0.06);
        }

        .marquee-card-wrap:hover .marquee-card-inner {
          border-color: rgba(163, 255, 18, 0.25);
          box-shadow: 0 0 24px rgba(163, 255, 18, 0.08);
        }
      `}</style>

      <div className="marquee-outer">
        {/* Row 1 — scrolls LEFT */}
        <div className="cards marquee-row">
          <div className="marquee-track left">
            {row1.map((news, idx) => (
              <div
                key={`r1-${news.id}-${idx}`}
                className="marquee-card-wrap"
                style={{ width: 320 }}
              >
                <MarqueeNewsCard news={news} />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls RIGHT */}
        <div className="cards marquee-row">
          <div className="marquee-track right">
            {row2.map((news, idx) => (
              <div
                key={`r2-${news.id}-${idx}`}
                className="marquee-card-wrap"
                style={{ width: 320 }}
              >
                <MarqueeNewsCard news={news} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
