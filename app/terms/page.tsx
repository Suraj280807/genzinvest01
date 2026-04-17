import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | GenZ Invest",
  description: "Read the Terms and Conditions for using the GenZ Invest platform.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#e0e0e0]">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#CCFF00] hover:underline mb-10 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
        </Link>

        <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10">
          <p className="text-xs font-mono text-[#CCFF00] uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-black font-display mb-2">
            Terms &amp; <span className="text-[#CCFF00]">Conditions</span>
          </h1>
          <p className="text-sm text-white/40 mb-10">Last Updated: 17/04/2026</p>

          <p className="text-white/70 leading-relaxed mb-8">
            Welcome to GenZ Invest. By accessing or using this platform, you agree to comply with and be bound by the following terms:
          </p>

          <div className="space-y-8">
            {[
              {
                n: "1",
                title: "Use of Service",
                body: "GenZ Invest provides financial information, insights, and educational content. This platform is intended for informational purposes only and does not constitute financial advice.",
              },
              {
                n: "2",
                title: "User Responsibilities",
                body: "You agree to use the platform responsibly and not engage in any unlawful, harmful, or abusive activities.",
              },
              {
                n: "3",
                title: "No Financial Advice",
                body: "All content provided is for general informational purposes only. Users should consult a certified financial advisor before making investment decisions.",
              },
              {
                n: "4",
                title: "Account Security",
                body: "You are responsible for maintaining the confidentiality of your account credentials and activities under your account.",
              },
              {
                n: "5",
                title: "Limitation of Liability",
                body: "GenZ Invest is not liable for any financial losses, damages, or decisions made based on the information provided.",
              },
              {
                n: "6",
                title: "Intellectual Property",
                body: "All content, branding, and design elements belong to GenZ Invest and may not be reused without permission.",
              },
              {
                n: "7",
                title: "Termination",
                body: "We reserve the right to suspend or terminate access for users violating these terms.",
              },
              {
                n: "8",
                title: "Changes to Terms",
                body: "We may update these terms at any time. Continued use of the platform constitutes acceptance of the updated terms.",
              },
            ].map((s) => (
              <div key={s.n} className="flex gap-5">
                <span className="text-2xl font-black text-[#CCFF00]/30 font-display w-6 shrink-0">{s.n}</span>
                <div>
                  <h2 className="font-bold text-white mb-1">{s.title}</h2>
                  <p className="text-white/60 text-sm leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-sm text-white/40">
            Contact:{" "}
            <a href="mailto:support@genzinvest.com" className="text-[#CCFF00] hover:underline">
              support@genzinvest.com
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
