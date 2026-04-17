export interface NewsItem {
    id: number;
    title: string;
    summary: string;
    source: string;
    date: string;
    imageUrl: string;
    category: string;
    content: string;
    impact: string;
    url: string;
}

export const MOCK_NEWS: NewsItem[] = [
    {
        id: 1,
        title: "Market hits All-Time High driven by AI Boom",
        summary: "Tech stocks are rallying as GenZ investors pour into AI ETFs. Is this the new golden age?",
        source: "FinDaily",
        date: "2024-05-20",
        imageUrl: "https://images.unsplash.com/photo-1611974765215-fad3c20bc486?q=80&w=2670&auto=format&fit=crop",
        category: "Market",
        content: "The global markets have witnessed a surge unprecedented in the last decade, primarily driven by the Generative AI revolution. Major tech giants are reporting triple-digit growth in their cloud and AI divisions. For the GenZ investor, this validates the 'tech-native' portfolio strategy. However, analysts warn of a potential bubble if earnings don't catch up to valuations.",
        impact: "Indian IT sector stands to gain significantly. Companies like TCS, Infosys, and emerging AI startups in Bengaluru will see increased contract flows. The NIFTY IT index is projected to outperform the broader market by 15% this quarter.",
        url: "#"
    },
    {
        id: 2,
        title: "Eco-Friendly Funds: The New Crypto?",
        summary: "Sustainable investing is outpacing traditional commodities. Here's why green is the new gold.",
        source: "EcoInvest",
        date: "2024-05-19",
        imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2613&auto=format&fit=crop",
        category: "Sustainability",
        content: "ESG (Environmental, Social, and Governance) funds have seen a 40% inflow increase year-over-year. Investors are moving away from fossil fuels and towards renewable energy grids and EV battery technology. This isn't just moral posturing; it's where the smart money is flowing.",
        impact: "Indian renewable energy stocks (Adani Green, Tata Power) are direct beneficiaries. The government's push for solar adoption (PM Surya Ghar) aligns perfectly with this trend, making green mutual funds a high-growth bet for Indian investors.",
        url: "#"
    },
    {
        id: 3,
        title: "Side Hustle to CEO: Investing your gig money",
        summary: "How to turn your DoorDash earnings into a diversified portfolio in 3 simple steps.",
        source: "HustleHub",
        date: "2024-05-18",
        imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2671&auto=format&fit=crop",
        category: "Education",
        content: "The gig economy is no longer just for pocket money. By allocating 30% of side-hustle income into high-growth SIPs (Systematic Investment Plans), GenZ workers are building retirement corpuses earlier than any previous generation. The key is consistency and automating the investment process.",
        impact: "Increased retail participation in the Indian mutual fund market. SIP inflows in India have hit record highs, providing stability to the domestic market against FII (Foreign Institutional Investor) outflows.",
        url: "#"
    },
    {
        id: 4,
        title: "Bear Market Vibes? Chill, here's the strategy.",
        summary: "Don't panic sell. Historical data shows holding through the dip is the ultimate flex.",
        source: "DiamondHands",
        date: "2024-05-17",
        imageUrl: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2670&auto=format&fit=crop",
        category: "Strategy",
        content: "Every dip is a buying opportunity if you have a horizon of 5+ years. Panic selling locks in losses. History shows that markets recover 100% of the time. The 'Diamond Hands' philosophy isn't just a meme; it's Warren Buffet's strategy rebranded for the digital age.",
        impact: "Stabilizing effect on Indian mid-cap and small-cap indices. As retail investors become more mature and hold through volatility, the Indian market's traditional high volatility is dampening, attracting more stable foreign long-term investment.",
        url: "#"
    },
    {
        id: 5,
        title: "Top 5 Mutual Funds for 2024",
        summary: "We analyzed 500+ funds so you don't have to. These picks are straight fire.",
        source: "FundMaster",
        date: "2024-05-16",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        category: "Analysis",
        content: "We looked at Expense Ratios, Alpha, and Beta. The winners are focused on Flexi-cap and Quant-based strategies. Passive index funds are safe, but active management in the emerging markets of India is currently generating significant Alpha.",
        impact: "Shift in preference towards Flexi-cap funds in India. AMCs (Asset Management Companies) are launching more tech-driven quant funds to cater to this data-conscious GenZ demographic.",
        url: "#"
    },
    {
        id: 6,
        title: "Crypto vs Mutual Funds: The Ultimate Showdown",
        summary: "Risk vs Reward. We break down the math for the risk-averse GenZ investor.",
        source: "CoinWatch",
        date: "2024-05-15",
        imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2669&auto=format&fit=crop",
        category: "Education",
        content: "Crypto offers 10x potential but with 90% drawdown risks. Mutual funds offer steady 12-15% compounding. The ideal GenZ portfolio? 80% Mutual Funds for stability/wealth creation, and 20% Crypto for the 'moon shot'. Never bet your rent money.",
        impact: "Regulatory clarity in India is pushing more young investors towards regulated Mutual Funds over volatile crypto assets. SEBI's investor protection framework makes MFs the safer vehicle for long-term wealth creation in India.",
        url: "#"
    }
];
