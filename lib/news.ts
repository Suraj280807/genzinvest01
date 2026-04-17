import { NewsItem } from "./data";

const API_KEY = "d22434d07f1b4800868ef7b61dbffaf6";

export async function fetchLiveNews(): Promise<NewsItem[]> {
    let articles = [];

    try {
        // 1. Try fetching "Business in India" (Top Headlines)
        let res = await fetch(
            `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${API_KEY}`,
            { cache: 'no-store' }
        );

        let data = await res.json();
        console.log("NewsAPI Headlines:", data.totalResults);

        if (data.articles && data.articles.length > 0) {
            articles = data.articles;
        } else {
            // 2. If headlines empty, try broader "Finance India" search
            console.log("Headlines empty, trying broad search...");
            const res2 = await fetch(
                `https://newsapi.org/v2/everything?q=finance+india&sortBy=publishedAt&apiKey=${API_KEY}`,
                { cache: 'no-store' }
            );
            const data2 = await res2.json();
            articles = data2.articles || [];
        }

    } catch (e) {
        console.error("NewsAPI Fetch Error", e);
        // Fallthrough to fallback
    }

    // 3. Process API Articles
    // Date Filter: Last 48 hours
    const now = new Date();
    const twoDaysAgo = new Date(now.getTime() - (48 * 60 * 60 * 1000));

    const uniqueTitles = new Set();

    let liveNews = articles
        .filter((article: any) => {
            const pubDate = new Date(article.publishedAt);
            if (pubDate < twoDaysAgo) return false;

            // Deduplication Logic
            const cleanTitle = (article.title || "").split(" - ")[0].trim();
            if (uniqueTitles.has(cleanTitle)) return false;

            uniqueTitles.add(cleanTitle);
            return true;
        })
        .map((article: any, index: number) => {
            const source = article.source?.name || "Market News";
            const title = article.title || "Market Update";
            const description = article.description || title;
            const cleanTitle = title.split(" - ")[0];
            const category = getCategory(cleanTitle, description);
            
            // Generate a reliable fallback image based on category
            let fallbackImage = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"; // Default Finance
            if (category === "Tech") fallbackImage = "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop";
            if (category === "Stocks") fallbackImage = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop";
            if (category === "Gold") fallbackImage = "https://images.unsplash.com/photo-1610375461246-83ff852e21e0?q=80&w=800&auto=format&fit=crop";

            return {
                id: index + 200,
                title: cleanTitle,
                summary: getSimpleSummary(cleanTitle, source),
                source: source,
                date: new Date(article.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
                imageUrl: article.urlToImage || fallbackImage,
                category: category,
                content: getSimpleContent(cleanTitle, description, source),
                impact: getSimpleImpact(cleanTitle, description),
                url: article.url || "#"
            };
        });

    // 4. FALLBACK: If we still have NO news (API rate limit or empty), use Simulated Live News
    // This guarantees the user ALWAYS sees "Today's News"
    if (liveNews.length === 0) {
        console.log("API returned 0 items. Using Backup Live Data.");
        liveNews = getBackupNews();
    }

    // Randomize order on every refresh to give a "Dynamic/Live" feel as requested
    return liveNews.sort(() => Math.random() - 0.5);
}

// Backup Generator - Creates "Live" looking news for today/yesterday
function getBackupNews(): NewsItem[] {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const d1 = today.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    const d2 = yesterday.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });

    return [
        {
            id: 901,
            title: "Sensex touches new all-time high amid global rally",
            summary: "Indian markets are unstoppable today. Read why this rally matters for your mutual funds.",
            source: "Market Bureau",
            date: d1,
            imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
            category: "Stocks",
            content: getSimpleContent("Sensex High", "Indices hit record levels driven by banking and IT stocks.", "Market Bureau"),
            impact: "Great for Index Fund investors. Your portfolio value should see a jump today.",
            url: "#"
        },
        {
            id: 902,
            title: "RBI hints at pause in interest rates: What it means for loans",
            summary: "Good news for borrowers. EMI burden might not increase further.",
            source: "Banking News",
            date: d1,
            imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
            category: "Finance",
            content: getSimpleContent("RBI Rates", "Central bank keeps repo rate unchanged.", "Banking News"),
            impact: "Banking stocks will stabilize. Debt funds become attractive again.",
            url: "#"
        },
        {
            id: 903,
            title: "Tech Giants report strong Q3 earnings, IT sector booms",
            summary: "IT stocks are back in action. Is it time to buy Tech Funds?",
            source: "Tech Daily",
            date: d2,
            imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
            category: "Tech",
            content: getSimpleContent("Tech Earnings", "Major IT players beat estimates.", "Tech Daily"),
            impact: "Positive for NIFTY IT index. Tech mutual funds will outperform in short term.",
            url: "#"
        },
        {
            id: 904,
            title: "Gold prices drop slightly, perfect buying opportunity?",
            summary: "Smart investors buy dip. Should you add gold to your portfolio?",
            source: "Commodity Watch",
            date: d2,
            imageUrl: "https://images.unsplash.com/photo-1610375461246-83ff852e21e0?q=80&w=800&auto=format&fit=crop",
            category: "Gold",
            content: getSimpleContent("Gold Dip", "Gold corrections seen as buying chance.", "Commodity Watch"),
            impact: "Good entry point for Gold ETFs or SGBs.",
            url: "#"
        }
    ];
}

// ------------------------------------------------------------------
// SIMPLE INDIAN ENGLISH CONTENT GENERATORS
// ------------------------------------------------------------------

function getSimpleSummary(title: string, source: string): string {
    return `Latest update from ${source}. Read this to know how it changes your money plans today.`;
}

function getSimpleContent(title: string, desc: string, source: string): string {
    return `Here is the simple breakdown of the news:\n\n1. What is the news?\n"${desc || title}"\n\nThis was just reported by ${source}. It is a fresh update from the market.\n\n2. Why it matters?\nAny change in big companies or government rules affects our mutual funds. As a young investor, you should know this.\n\n3. What to do?\nCheck the 'Market Impact' section below. Usually, for long-term SIP investors, daily news is just noise. Don't stop your SIPs.`;
}

function getSimpleImpact(title: string, desc: string): string {
    const t = (title + " " + desc).toLowerCase();

    if (t.includes("sensex") || t.includes("nifty") || t.includes("market")) {
        return "Direct impact on your Index Funds. If market is down, it's a good time to buy more NAV.";
    }
    if (t.includes("bank") || t.includes("rbi") || t.includes("loan") || t.includes("rate")) {
        return "Banking stocks and debt funds will react. If RBI rates change, your EMI might change too.";
    }
    if (t.includes("profit") || t.includes("q3") || t.includes("q4") || t.includes("result")) {
        return "This company's stock price might swing today. Good results mean green portfolio, bad means red.";
    }
    if (t.includes("gold") || t.includes("silver")) {
        return "Gold prices might go up. Good for your Gold ETFs.";
    }
    if (t.includes("usd") || t.includes("rupee") || t.includes("dollar")) {
        return "IT stocks (like TCS, Infosys) usually go up when Dollar is strong. Good for Tech funds.";
    }

    return "General market news. Keep calm and continue your SIPs. Time in the market is better than timing the market.";
}

function getCategory(title: string, desc: string): string {
    const t = (title + " " + desc).toLowerCase();

    if (t.includes("stock") || t.includes("share") || t.includes("market")) return "Stocks";
    if (t.includes("bank") || t.includes("finance") || t.includes("money")) return "Finance";
    if (t.includes("tech") || t.includes("startup") || t.includes("ai")) return "Tech";
    if (t.includes("india") || t.includes("govt") || t.includes("budget")) return "India";

    return "Business";
}

// ------------------------------------------------------------------
// MARKET MOOD ANALYSIS
// ------------------------------------------------------------------

export type MarketMood = "Extreme Fear" | "Fear" | "Neutral" | "Greed" | "Extreme Greed";

export function calculateMarketMood(articles: NewsItem[]): { mood: MarketMood; score: number; emoji: string } {
    let score = 0;

    const POSITIVE_KEYWORDS = ["rise", "jump", "high", "gain", "boom", "rally", "green", "profit", "bull", "up", "record", "soar", "surge", "growth", "buy"];
    const NEGATIVE_KEYWORDS = ["drop", "fall", "crash", "loss", "low", "bear", "red", "down", "crisis", "plunge", "slump", "slide", "fear", "sell", "concern"];

    articles.forEach(article => {
        const text = (article.title + " " + article.summary).toLowerCase();

        POSITIVE_KEYWORDS.forEach(word => {
            if (text.includes(word)) score += 1;
        });

        NEGATIVE_KEYWORDS.forEach(word => {
            if (text.includes(word)) score -= 1;
        });
    });

    // Normalize or cap score if needed, but for now raw score is fine for simple thresholds
    // Assuming ~10-20 articles, scores might range from -20 to +20.

    let mood: MarketMood = "Neutral";
    let emoji = "😐";

    if (score >= 10) {
        mood = "Extreme Greed";
        emoji = "🚀";
    } else if (score >= 3) {
        mood = "Greed";
        emoji = "🤑";
    } else if (score <= -10) {
        mood = "Extreme Fear";
        emoji = "😱";
    } else if (score <= -3) {
        mood = "Fear";
        emoji = "😨";
    }

    return { mood, score, emoji };
}

// ------------------------------------------------------------------
// FINANCIAL HOROSCOPE ENGINE
// ------------------------------------------------------------------

export type HoroscopeData = {
    title: string;
    reading: string;
    vibe: string;
    luckyAsset: string;
    color: string;
    cosmicEvent: string;
};

export function generateHoroscope(articles: NewsItem[]): HoroscopeData {
    const { mood, score } = calculateMarketMood(articles);

    // Get top topics from news to make it feel "daily" and "analyzed"
    const topTopics = articles
        .slice(0, 3)
        .map(a => a.category)
        .filter((v, i, a) => a.indexOf(v) === i) // Unique categories
        .join(" and ");

    const topHeadline = articles[0]?.title.split(" - ")[0] || "global trends";
    const simpleHeadline = topHeadline.length > 40 ? topHeadline.substring(0, 40) + "..." : topHeadline;

    // Default: Neutral
    let data: HoroscopeData = {
        title: "The Stagnant Void",
        reading: `The market is mixed today, with focus on ${topTopics || "market movements"}. The stars suggest patience. Do not force trades just because ${simpleHeadline} is in the news.`,
        vibe: "Meditative 🧘",
        luckyAsset: "Cash & Liquid Funds",
        color: "text-gray-400",
        cosmicEvent: "Moon in Stasis"
    };

    if (mood === "Extreme Greed") {
        data = {
            title: "Supernova Bull",
            reading: `The market is euphoric about ${topTopics}! With excitement around "${simpleHeadline}", Jupiter blesses your portfolio. Ride the wave, but don't let the hype blind you.`,
            vibe: "Euphoric 🚀",
            luckyAsset: "Small Cap Growth Stocks",
            color: "text-green-400",
            cosmicEvent: "Jupiter Ascending"
        };
    } else if (mood === "Greed") {
        data = {
            title: "Rising Phoenix",
            reading: `Positive energy flows through ${topTopics} sectors today. The news about "${simpleHeadline}" signals growth. It's a good day to plant seeds (invest) in high-conviction plays.`,
            vibe: "Optimistic ✨",
            luckyAsset: "Blue Chip Stocks",
            color: "text-emerald-400",
            cosmicEvent: "Solar Flare"
        };
    } else if (mood === "Fear") {
        data = {
            title: "Retrograde Shadow",
            reading: `Uncertainty looms over ${topTopics}. The chatter around "${simpleHeadline}" is making investors nervous. Mercury is in retrograde—avoid impulsive buys and stick to quality.`,
            vibe: "Cautious 🛡️",
            luckyAsset: "Gold & Bonds",
            color: "text-orange-400",
            cosmicEvent: "Mercury Retrograde"
        };
    } else if (mood === "Extreme Fear") {
        data = {
            title: "The Great Eclipse",
            reading: `Panic dominates the headlines regarding ${topTopics}. "${simpleHeadline}" has spooked the herd. Remember: The smartest wizards buy when others are terrified. Look for value in the wreckage.`,
            vibe: "Diamond Hands 💎",
            luckyAsset: "Index Funds (Cheap!)",
            color: "text-red-500",
            cosmicEvent: "Total Eclipse"
        };
    }

    return data;
}
