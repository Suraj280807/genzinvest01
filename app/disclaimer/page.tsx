import Link from "next/link";

export const metadata = {
  title: "Disclaimer | GenZ Invest",
  description: "Read the GenZ Invest disclaimer regarding financial data and investment decisions.",
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#e0e0e0]">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#CCFF00] hover:underline mb-10 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
        </Link>

        <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10">
          <p className="text-xs font-mono text-[#00FFFF] uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-black font-display mb-2">
            <span className="text-[#00FFFF]">Disclaimer</span>
          </h1>
          <p className="text-sm text-white/40 mb-10">Last Updated: 17/04/2026</p>

          <p className="text-white/70 leading-relaxed mb-8">
            GenZ Invest does not provide investment, financial, or trading advice.
          </p>
          <p className="text-white/70 leading-relaxed mb-8">
            All content, including market data, news, insights, and AI-generated responses, is for informational and educational purposes only.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <h2 className="font-bold text-white mb-4">We do not guarantee:</h2>
            <ul className="space-y-3">
              {["Accuracy of financial data", "Completeness of information", "Future market performance"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/60 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#00FFFF]/60 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-white/70 leading-relaxed mb-4">
            Users are solely responsible for their financial decisions.
          </p>
          <p className="text-white/70 leading-relaxed">
            Investing involves risk. Please consult a qualified financial advisor before making any decisions.
          </p>
        </div>
      </div>
    </main>
  );
}
