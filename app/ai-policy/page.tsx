import Link from "next/link";

export const metadata = {
  title: "AI Usage Policy | GenZ Invest",
  description: "Understand how GenZ Invest uses AI-powered tools and their limitations.",
};

export default function AIPolicyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#e0e0e0]">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#CCFF00] hover:underline mb-10 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
        </Link>

        <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10">
          <p className="text-xs font-mono text-[#9D00FF] uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-black font-display mb-2">
            AI Usage <span className="text-[#9D00FF]">Policy</span>
          </h1>
          <p className="text-sm text-white/40 mb-10">Last Updated: 17/04/2026</p>

          <p className="text-white/70 leading-relaxed mb-8">
            GenZ Invest uses AI-powered tools to provide insights and assistance.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 space-y-4">
            {[
              "AI responses may not always be accurate or up-to-date",
              "AI should not be considered a financial advisor",
              "Users must verify information independently",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-white/60 text-sm">
                <span className="w-2 h-2 rounded-full bg-[#9D00FF]/60 shrink-0 mt-1.5" />
                {item}
              </div>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed">
            We are not responsible for decisions made based on AI-generated content.
          </p>
        </div>
      </div>
    </main>
  );
}
