"use client";

import { motion } from "framer-motion";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { NewsItem } from "@/lib/data";

interface NewsCardProps {
    news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
    return (
        <Link href={`/news/${news.id}`}>
            <motion.div
                whileHover={{ y: -5 }}
                className="glass-card rounded-3xl overflow-hidden cursor-pointer relative group h-full flex flex-col p-6 min-h-[240px] transition-colors"
            >
                <div className="flex items-center justify-between mb-5">
                    <span className="px-3 py-1 rounded-md bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest border border-secondary/20 flex items-center gap-1.5 shadow-sm">
                        <Tag size={12} /> {news.category}
                    </span>
                    <span className="text-xs text-foreground/50 font-medium flex items-center gap-1.5">
                        <Calendar size={12} /> {news.date}
                    </span>
                </div>

                {news.imageUrl && (
                    <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden border border-white/5">
                        <img
                            src={news.imageUrl}
                            alt={news.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                            }}
                        />
                    </div>
                )}

                <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight group-hover:text-primary text-foreground transition-colors line-clamp-3">
                    {news.title}
                </h3>

                <p className="text-sm text-foreground/70 font-medium line-clamp-3 mb-6 grow">
                    {news.summary}
                </p>

                <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/10">
                    <span className="text-xs uppercase tracking-widest text-foreground/50 font-black">
                        {news.source}
                    </span>
                    <span className="text-primary text-xs font-black flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-15px] group-hover:translate-x-0 duration-300">
                        Read Analysis <ArrowRight size={14} />
                    </span>
                </div>
            </motion.div>
        </Link>
    );
}
