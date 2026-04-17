import Link from "next/link";

export const metadata = {
  title: "Cookie Policy | GenZ Invest",
  description: "Understand how GenZ Invest uses cookies and how to manage them.",
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#e0e0e0]">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#CCFF00] hover:underline mb-10 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
        </Link>

        <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10">
          <p className="text-xs font-mono text-[#CCFF00] uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-black font-display mb-2">
            Cookie <span className="text-[#CCFF00]">Policy</span>
          </h1>
          <p className="text-sm text-white/40 mb-10">Last Updated: 17/04/2026</p>

          <p className="text-white/70 leading-relaxed mb-8">
            We use cookies to improve your browsing experience.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <h2 className="font-bold text-white mb-4">Cookies help us:</h2>
            <ul className="space-y-3">
              {["Understand user behavior", "Improve performance", "Personalize content"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/60 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#CCFF00]/60 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-white/70 leading-relaxed mb-4">
            You can disable cookies through your browser settings, but some features may not function properly.
          </p>
          <p className="text-white/70 leading-relaxed">
            By continuing to use our platform, you consent to our use of cookies.
          </p>
        </div>
      </div>
    </main>
  );
}
