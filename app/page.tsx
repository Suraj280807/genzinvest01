import Link from "next/link";
import { GraduationCap, Smartphone, Swords } from "lucide-react";
import NewsMarquee from "@/components/NewsMarquee";
import { fetchLiveNews, generateHoroscope } from "@/lib/news";
import MarketDashboard from "@/components/MarketDashboard";
import FinancialHoroscope from "@/components/FinancialHoroscope";
import ProtectedRoute from "@/components/ProtectedRoute";
import ThreeDLogo from "@/components/ThreeDLogo";
import UserProfile from "@/components/UserProfile";
import Navbar from "@/components/Navbar";

// Force dynamic rendering to ensure fresh news on every request
export const dynamic = 'force-dynamic';

async function getData() {
  // Server-side fetch of fresh data from NewsAPI
  const news = await fetchLiveNews();
  const horoscope = generateHoroscope(news);
  return { news, horoscope };
}

export default async function Home() {
  const { news, horoscope } = await getData();

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 relative overflow-hidden">
      <ProtectedRoute>
        {/* Background Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <Navbar />
          <div className="h-32 md:h-40 w-full" aria-hidden="true" />

          <section className="mb-12">
            {/* Market Dashboard - Full Width */}
            <div className="w-full">
              <MarketDashboard />
            </div>
          </section>

          {/* Daily Vibes Section - Middle Banner */}
          <section className="mb-16">
            <FinancialHoroscope data={horoscope} />
          </section>

          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-8 bg-gradient-to-b from-primary to-accent rounded-full shadow-[0_0_10px_rgba(204,255,0,0.5)] animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent drop-shadow-md">
                Live Market News
              </h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.3)] animate-pulse">LIVE</span>
            </div>
          </section>
        </div>

        {/* NewsMarquee intentionally outside max-w-7xl for full-bleed edge-to-edge scrolling */}
        <section className="mb-20 -mx-4 md:-mx-8 lg:-mx-12">
          <NewsMarquee newsItems={news} />
        </section>
      </ProtectedRoute>
    </main>
  );
}
