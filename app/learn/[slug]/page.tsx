
import Link from "next/link";
import { ArrowLeft, BookOpen, Share2 } from "lucide-react";
import { notFound } from "next/navigation";
import { LEARN_MODULES } from "@/lib/learnData";
import GenericChart from "@/components/GenericChart";

// Correct type for Next.js 15+ Params
type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ModulePage({ params }: Props) {
    const { slug } = await params;
    const moduleData = LEARN_MODULES[slug];

    if (!moduleData) {
        return notFound();
    }

    return (
        <main className="min-h-screen relative bg-black text-white selection:bg-primary selection:text-black">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 relative z-10">
                {/* Nav */}
                <div className="flex justify-between items-center mb-12">
                    <Link
                        href="/learn"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Modules
                    </Link>
                    <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <Share2 size={20} className="text-gray-400" />
                    </button>
                </div>

                {/* Header */}
                <header className="mb-12 border-b border-white/10 pb-12">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20 mb-6">
                        <BookOpen size={12} /> Knowledge Base
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
                        {moduleData.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
                        {moduleData.description}
                    </p>
                </header>

                {/* Content Layout */}
                <div className="flex flex-col gap-12">

                    {/* Visual Data Section */}
                    <div className="w-full">
                        <GenericChart config={moduleData.chart} />
                        <p className="text-center text-xs text-gray-500 mt-3 italic">
                            Figure 1.1: {moduleData.chart.title}
                        </p>
                    </div>

                    {/* Text Content */}
                    <div className="prose prose-invert prose-lg max-w-none">
                        {moduleData.content.map((paragraph, idx) => (
                            <p key={idx} className="text-gray-300 leading-8 mb-6 text-lg">
                                {idx === 0 ? <span className="text-4xl float-left mr-3 mt-[-6px] font-display font-black text-primary">
                                    {paragraph.charAt(0)}
                                </span> : null}
                                {idx === 0 ? paragraph.slice(1) : paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Next Steps / CTA */}
                    <div className="bg-surface border border-white/10 rounded-2xl p-8 mt-8 text-center">
                        <h3 className="text-2xl font-bold mb-4">Ready to apply this?</h3>
                        <p className="text-gray-400 mb-6">Go back to the market dashboard and watch live trends.</p>
                        <Link
                            href="/"
                            className="inline-block px-8 py-3 rounded-full bg-primary text-black font-bold hover:scale-105 transition-transform"
                        >
                            Open Dashboard
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}
