import { NewsItem } from "./data";

export async function fetchRSSFeed(): Promise<NewsItem[]> {
    try {
        const res = await fetch(
            "https://news.google.com/rss/search?q=Global+Finance+Market+Review+Impact+India&hl=en-IN&gl=IN&ceid=IN:en",
            { cache: 'no-store' }
        );
        const xml = await res.text();
        const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];

        return items.slice(0, 15).map((item, index) => { // Increased to 15 items
            const title = item.match(/<title>(.*?)<\/title>/)?.[1] || "News Update";
            const link = item.match(/<link>(.*?)<\/link>/)?.[1] || "#";
            const dateStr = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || new Date().toDateString();
            const date = new Date(dateStr).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });

            const parts = title.split(" - ");
            const source = parts.length > 1 ? parts.pop() || "Google News" : "Market News";
            const cleanTitle = parts.join(" - ");

            return {
                id: index + 100,
                title: cleanTitle,
                summary: `Global update from ${source}. ${getSummary(cleanTitle)}`,
                source: source,
                date: date,
                imageUrl: getImageForNews(cleanTitle), // SMART IMAGE SELECTION
                category: getCategory(cleanTitle),
                content: `This is a significant development in the global financial landscape reported by ${source}.\n\nKEY TAKEAWAYS:\n• ${cleanTitle}\n• Market sentiment is reacting to this news with increased volatility.\n• Analysts are closely monitoring the situation for long-term implications.\n\nFor the full story and real-time updates, please refer to the original coverage on ${source}.`,
                impact: getImpactAnalysis(cleanTitle), // SMART IMPACT ANALYSIS
                url: link
            };
        });
    } catch (e) {
        console.error("RSS Fetch Error", e);
        return [];
    }
}

// ------------------------------------------------------------------
// HEURISTIC HELPERS (Simulating AI Analysis)
// ------------------------------------------------------------------

function getImageForNews(title: string): string {
    const t = title.toLowerCase();

    if (t.includes("ai") || t.includes("tech") || t.includes("google") || t.includes("nvidia"))
        return "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop"; // AI/Tech
    if (t.includes("crypto") || t.includes("bitcoin") || t.includes("coin"))
        return "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=800&auto=format&fit=crop"; // Crypto
    if (t.includes("oil") || t.includes("energy") || t.includes("gas") || t.includes("green"))
        return "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?q=80&w=800&auto=format&fit=crop"; // Energy
    if (t.includes("bank") || t.includes("rate") || t.includes("fed") || t.includes("rbi"))
        return "https://images.unsplash.com/photo-1611974765215-fad3c20bc486?q=80&w=800&auto=format&fit=crop"; // Finance/Banking
    if (t.includes("gold") || t.includes("silver"))
        return "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=800&auto=format&fit=crop"; // Commodities
    if (t.includes("auto") || t.includes("car") || t.includes("ev"))
        return "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop"; // Auto

    // Default fallback (Generic Bull/Bear)
    return "https://images.unsplash.com/photo-1590283626615-1ba790321ce3?q=80&w=800&auto=format&fit=crop";
}

function getImpactAnalysis(title: string): string {
    const t = title.toLowerCase();

    if (t.includes("fed") || t.includes("rate") || t.includes("inflation")) {
        return "High Impact on NIFTY 50. Rate decisions directly affect foreign inflows (FII). Expect volatility in Banking and IT stocks.";
    }
    if (t.includes("oil") || t.includes("crude")) {
        return "Direct impact on OMCs (BPCL, HPCL) and Paint stocks (Asian Paints). Rising oil prices are generally negative for the Indian Rupee.";
    }
    if (t.includes("tech") || t.includes("ai") || t.includes("nasdaq")) {
        return "Positive correlation with NIFTY IT Index. TCS, Infosys, and HCL Tech often mirror movements in the US Tech sector.";
    }
    if (t.includes("china") || t.includes("geopolitics") || t.includes("war")) {
        return "Global uncertainty may cause a 'Flight to Safety'. Gold prices and defensive stocks (FMCG, Pharma) likely to outperform.";
    }
    if (t.includes("earnings") || t.includes("profit") || t.includes("quarter")) {
        return "Sector-specific impact. Strong earnings validate high valuations. Watch for guidance on future demand.";
    }
    if (t.includes("crypto") || t.includes("bitcoin")) {
        return "Low direct correlation with Indian Equity Markets, but sentiment indicator for risk-on assets among GenZ investors.";
    }

    return "Monitor generic market sentiment. This news may act as a trigger for short-term intraday movements in the mid-cap segment.";
}

function getCategory(title: string): string {
    const t = title.toLowerCase();
    if (t.includes("bank") || t.includes("money")) return "Finance";
    if (t.includes("tech") || t.includes("ai")) return "Technology";
    if (t.includes("energy") || t.includes("power")) return "Energy";
    if (t.includes("politic") || t.includes("govt")) return "Policy";
    return "Global";
}

function getSummary(title: string): string {
    const t = title.toLowerCase();
    if (t.includes("?")) return "We analyze the questions raised by this market movement.";
    if (t.includes("new") || t.includes("launch")) return "A major new development that could shift market dynamics.";
    return "Click to understand how this impacts your portfolio.";
}
