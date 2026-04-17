import { fetchLiveNews } from "@/lib/news";
import { ArrowLeft, Calendar, Tag, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import PersonalizedNewsImpact from "@/components/PersonalizedNewsImpact";

// Generate static params for all news items (SSG)
export async function generateStaticParams() {
    const news = await fetchLiveNews();

    return news.map((item) => ({
        id: item.id.toString(),
    }));
}

export default async function NewsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // Fetch fresh data to ensure we find the item
    const allNews = await fetchLiveNews();

    const newsItem = allNews.find((item) => item.id === parseInt(id));

    if (!newsItem) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Section with Image */}
            <div className="relative w-full h-[50vh] min-h-[400px]">
                {newsItem.imageUrl ? (
                    <img
                        src={newsItem.imageUrl}
                        alt={newsItem.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black w-full h-full" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                <div className="absolute top-8 left-4 md:left-12 z-50">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-105 transition-all text-sm font-bold shadow-lg"
                    >
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>
                </div>

                <div className="absolute inset-0 flex flex-col justify-end px-6 pb-16 pt-24 md:px-12 md:pb-24 z-20 max-w-4xl pointer-events-none">
                    <div className="flex items-center gap-3 mb-4 pointer-events-auto">
                        <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                            <Tag size={12} /> {newsItem.category}
                        </span>
                        <span className="text-gray-300 text-sm flex items-center gap-1 font-mono">
                            <Calendar size={12} /> {newsItem.date}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black font-display leading-tight mb-4 text-white drop-shadow-xl">
                        {newsItem.title}
                    </h1>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-1 bg-primary rounded-full" />
                        <p className="text-gray-300 font-bold tracking-widest uppercase text-sm">
                            Source: {newsItem.source}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <main className="max-w-4xl mx-auto px-6 md:px-12 -mt-10 relative z-30">
                <div className="glass p-8 md:p-12 rounded-2xl border-white/10 bg-gradient-to-b from-white/5 to-transparent">

                    {/* Summary Highlight */}
                    <div className="text-xl md:text-2xl font-medium text-gray-200 mb-10 leading-relaxed border-l-4 border-secondary pl-6 italic">
                        "{newsItem.summary}"
                    </div>

                    <div className="grid md:grid-cols-[1fr_300px] gap-12">
                        <article className="space-y-6">
                            <h2 className="text-2xl font-bold font-display text-primary mb-4 flex items-center gap-2">
                                Deep Dive <ArrowRight size={20} className="text-primary/50" />
                            </h2>
                            <p className="text-gray-300 leading-8 text-lg whitespace-pre-wrap font-sans">
                                {newsItem.content}
                            </p>

                            <div className="mt-8 pt-6 border-t border-white/10">
                                <a
                                    href={newsItem.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-bold group"
                                >
                                    Read full story <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>

                            <PersonalizedNewsImpact newsTitle={newsItem.title} newsSummary={newsItem.summary} />
                        </article>

                        {/* Impact Card */}
                        <aside>
                            <div className="bg-surface-highlight rounded-xl p-6 border border-white/5 shadow-2xl sticky top-24">
                                <div className="flex items-center gap-2 mb-4 text-secondary">
                                    <TrendingUp size={24} />
                                    <h3 className="text-lg font-bold font-display uppercase tracking-wider">Market Impact</h3>
                                </div>
                                <p className="text-gray-400 leading-7 text-sm border-l-2 border-secondary/30 pl-4">
                                    {newsItem.impact}
                                </p>
                                <div className="mt-6 pt-4 border-t border-white/10">
                                    <button className="w-full py-3 bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/30 rounded-lg font-bold transition-all text-sm uppercase tracking-wide">
                                        Add to Watchlist
                                    </button>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
}
