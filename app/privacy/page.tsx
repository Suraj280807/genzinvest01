import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | GenZ Invest",
  description: "Learn how GenZ Invest collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#e0e0e0]">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#CCFF00] hover:underline mb-10 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
        </Link>

        <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10">
          <p className="text-xs font-mono text-[#9D00FF] uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-black font-display mb-2">
            Privacy <span className="text-[#9D00FF]">Policy</span>
          </h1>
          <p className="text-sm text-white/40 mb-4">Last Updated: 17/04/2026</p>
          <p className="text-white/70 leading-relaxed mb-10">Your privacy is important to us.</p>

          <div className="space-y-8">
            {[
              {
                n: "1",
                title: "Information We Collect",
                items: ["Personal information (name, email)", "Usage data (pages visited, interactions)", "Device and browser data"],
              },
              {
                n: "2",
                title: "How We Use Data",
                items: ["To improve user experience", "To personalize content", "To provide support and communication"],
              },
              {
                n: "3",
                title: "Data Protection",
                body: "We implement industry-standard security measures to protect your data.",
              },
              {
                n: "4",
                title: "Third-Party Services",
                body: "We may use third-party tools (analytics, APIs) which may collect data as per their policies.",
              },
              {
                n: "5",
                title: "Cookies",
                body: "We use cookies to enhance user experience and track usage patterns.",
              },
              {
                n: "6",
                title: "User Rights",
                body: "You can request access, correction, or deletion of your data.",
              },
              {
                n: "7",
                title: "Changes",
                body: "We may update this policy periodically.",
              },
            ].map((s) => (
              <div key={s.n} className="flex gap-5">
                <span className="text-2xl font-black text-[#9D00FF]/30 font-display w-6 shrink-0">{s.n}</span>
                <div>
                  <h2 className="font-bold text-white mb-2">{s.title}</h2>
                  {"items" in s ? (
                    <ul className="list-disc list-inside space-y-1 text-white/60 text-sm">
                      {s.items!.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  ) : (
                    <p className="text-white/60 text-sm leading-relaxed">{s.body}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-sm text-white/40">
            Contact:{" "}
            <a href="mailto:support@genzinvest.com" className="text-[#9D00FF] hover:underline">
              support@genzinvest.com
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
