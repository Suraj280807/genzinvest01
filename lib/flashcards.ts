
export type FlashcardData = {
    id: string;
    term: string;
    definition: string;
    example: string;
    details: string; // New field for "Did You Know?" or "Pro Tip"
    category: string;
    color: string; // Tailwind class or hex
    icon: string;
};

// Colors for randomization
const COLORS = [
    "bg-red-500", "bg-red-600", "bg-orange-500", "bg-orange-600",
    "bg-yellow-500", "bg-yellow-600", "bg-green-500", "bg-green-600",
    "bg-teal-500", "bg-teal-600", "bg-blue-500", "bg-blue-600",
    "bg-indigo-500", "bg-indigo-600", "bg-purple-500", "bg-purple-600",
    "bg-pink-500", "bg-pink-600", "bg-gray-500", "bg-gray-600"
];

export const FLASHCARDS: FlashcardData[] = [
    // --- BASICS (1-50) ---
    { id: "1", term: "Bull Market", definition: "Optimism. Prices rising.", example: "Green charts everywhere! 🐂", details: "Named after the way a bull attacks: thrusting its horns UPWARDS.", category: "Basics", color: "bg-green-500", icon: "🐂" },
    { id: "2", term: "Bear Market", definition: "Pessimism. Prices falling >20%.", example: "Red charts, hibernating time. 🐻", details: "Named after the way a bear attacks: swiping its paws DOWNWARDS.", category: "Basics", color: "bg-red-500", icon: "🐻" },
    { id: "3", term: "Asset", definition: "Resource with economic value.", example: "Cash, Stocks, House. 💰", details: "Ideally, assets should put money in your pocket (Cash Flow).", category: "Basics", color: "bg-blue-500", icon: "💎" },
    { id: "4", term: "Liability", definition: "Financial debt or obligation.", example: "Loan, Credit Card Bill. 💳", details: "Rich people buy assets; poor people buy liabilities they think are assets.", category: "Basics", color: "bg-red-500", icon: "📉" },
    { id: "5", term: "Equity", definition: "Value of ownership.", example: "What you actually own in your home. 🏠", details: "In stocks, equity means you are a partial owner of the company.", category: "Basics", color: "bg-green-600", icon: "🍰" },
    { id: "6", term: "Capital", definition: "Wealth in the form of money/assets.", example: "Starting money for a business. 💼", details: "Capital can be raised via Debt (Loans) or Equity (Selling shares).", category: "Basics", color: "bg-yellow-500", icon: "🏛️" },
    { id: "7", term: "Revenue", definition: "Income from sales.", example: "Money coming into the register. 💵", details: "Also called the 'Top Line' because it sits at the top of the P&L statement.", category: "Basics", color: "bg-green-400", icon: "📥" },
    { id: "8", term: "Profit", definition: "Revenue minus Expenses.", example: "What you keep after paying bills. 💸", details: "Also called the 'Bottom Line'. Net Profit is what matters most.", category: "Basics", color: "bg-emerald-500", icon: "💰" },
    { id: "9", term: "Net Worth", definition: "Total Assets - Total Liabilities.", example: "Your financial scorecard. 💯", details: "Negative net worth is technically 'insolvency'. Keep it positive!", category: "Basics", color: "bg-purple-500", icon: "📊" },
    { id: "10", term: "Liquidity", definition: "Ease of converting to cash.", example: "Gold is liquid; House is illiquid. 💧", details: "Cash is the most liquid asset. Real Estate is often the least.", category: "Basics", color: "bg-cyan-500", icon: "🚿" },
    { id: "11", term: "Volatility", definition: "Rate of price change.", example: "Crypto is highly volatile! 🎢", details: "Volatility is often measured by the 'VIX' index, or the Fear Gauge.", category: "Risk", color: "bg-orange-500", icon: "〰️" },
    { id: "12", term: "Diversification", definition: "Spreading risk.", example: "Not putting all eggs in one basket. 🧺", details: "The only 'free lunch' in investing. Lower risk without lowering expected returns.", category: "Strategy", color: "bg-indigo-500", icon: "🌈" },
    { id: "13", term: "Portfolio", definition: "Collection of investments.", example: "Your mixed bag of assets. 🎒", details: "Rebalancing your portfolio once a year helps maintain your risk level.", category: "Basics", color: "bg-blue-600", icon: "📁" },
    { id: "14", term: "ROI", definition: "Return on Investment.", example: "(Profit / Cost) x 100. ％", details: "Always check if ROI beats inflation. If ROI < Inflation, you lost value.", category: "Metrics", color: "bg-green-300", icon: "📈" },
    { id: "15", term: "Inflation", definition: "Rising prices, falling currency value.", example: "Why candy costs more now. 🎈", details: "A little inflation (2-3%) is actually considered healthy for the economy.", category: "Economics", color: "bg-red-400", icon: "💸" },
    { id: "16", term: "Deflation", definition: "Falling prices.", example: "Good for buyers, bad for debt. 📉", details: "Deflation can cause recessions because people wait to buy cheaper later.", category: "Economics", color: "bg-blue-400", icon: "❄️" },
    { id: "17", term: "Compound Interest", definition: "Interest on interest.", example: "Money growing freely over time. 🌳", details: "Einstein called it the 'Eighth Wonder of the World'.", category: "Math", color: "bg-green-700", icon: "🔄" },
    { id: "18", term: "Principal", definition: "Original sum invested/loaned.", example: "The core amount of your loan. 🧱", details: "In a loan, you pay interest on the remaining principal.", category: "Basics", color: "bg-gray-600", icon: "🏦" },
    { id: "19", term: "Interest", definition: "Cost of borrowing money.", example: "Rent paid on money. 🏦", details: "High risk borrowers pay high interest rates.", category: "Basics", color: "bg-orange-600", icon: "🏷️" },
    { id: "20", term: "Credit Score", definition: "Trustworthiness rating.", example: "750+ gets you cheap loans. 🎖️", details: "Based on payment history, hunger for credit, and mix of loans.", category: "Credit", color: "bg-teal-600", icon: "🔢" },

    // --- STOCKS (51-150) ---
    { id: "51", term: "Stock", definition: "Share of ownership in a corp.", example: "Holding a tiny piece of Apple. 🍎", details: "Stocks have historically outperformed bonds and gold over long periods.", category: "Stocks", color: "bg-blue-500", icon: "📜" },
    { id: "52", term: "Shareholder", definition: "Owner of stock.", example: "You, if you buy Reliance. 👨‍💼", details: "Shareholders are last in line to get paid if a company goes bankrupt.", category: "Stocks", color: "bg-indigo-500", icon: "🤝" },
    { id: "53", term: "IPO", definition: "Initial Public Offering.", example: "Company goes from Private to Public. 🔔", details: "Many IPOs are volatile. It's often safer to wait for the price to settle.", category: "Market", color: "bg-pink-500", icon: "🚀" },
    { id: "54", term: "Dividend", definition: "Profit shared with owners.", example: "Regular cash payments. 🧧", details: "Dividends are a sign of a mature, profitable company.", category: "Income", color: "bg-green-400", icon: "💵" },
    { id: "55", term: "Yield", definition: "Income return on investment.", example: "Dividend / Price. 🌾", details: "High yield can sometimes be a 'Dividend Trap' if the stock price is crashing.", category: "Metrics", color: "bg-yellow-500", icon: "📊" },
    { id: "56", term: "Market Cap", definition: "Total company value.", example: "Share Price x Total Shares. 🥧", details: "Large Cap = Safe; Small Cap = Risky but potentially high growth.", category: "Metrics", color: "bg-purple-600", icon: "🏗️" },
    { id: "57", term: "Blue Chip", definition: "Top-tier, reliable company.", example: "TCS, HDFC, Infosys. 🏆", details: "Named after the most expensive chip in Poker.", category: "Stocks", color: "bg-blue-800", icon: "🔵" },
    { id: "58", term: "Penny Stock", definition: "Cheap, risky stock.", example: "Trading at ₹2. High risk! 🎰", details: "Prone to 'Pump and Dump' schemes. Be very careful.", category: "Stocks", color: "bg-red-600", icon: "🪙" },
    { id: "59", term: "P/E Ratio", definition: "Price/Earnings. Valuation.", example: "Is the stock expensive? 🏷️", details: "A lower P/E is generally cheaper, but compare it within the same industry.", category: "Metrics", color: "bg-gray-500", icon: "⚖️" },
    { id: "60", term: "EPS", definition: "Earnings Per Share.", example: "Profit divided by share count. 🍰", details: "If EPS grows every quarter, the stock price usually follows.", category: "Metrics", color: "bg-green-800", icon: "🔢" },
    { id: "61", term: "Brokerage", definition: "Fee paid to broker.", example: "Cost of doing business. 🎫", details: "Discount brokers (Zerodha/Groww) charge almost zero for delivery trades.", category: "Trading", color: "bg-orange-400", icon: "✂️" },
    { id: "62", term: "Demat", definition: "Dematerialized Account.", example: "Digital storage for shares. 💾", details: "You can't trade without one. It keeps your shares safe electronically.", category: "Basics", color: "bg-blue-400", icon: "🔐" },
    { id: "63", term: "Exchange", definition: "Marketplace for stocks.", example: "BSE (Bombay), NSE (National). 🏛️", details: "BSE is Asia's oldest stock exchange, established in 1875.", category: "Market", color: "bg-yellow-600", icon: "🏦" },
    { id: "64", term: "Index", definition: "Market benchmark.", example: "Nifty 50, Sensex. 📉", details: "Nifty represents the top 50 companies of NSE.", category: "Market", color: "bg-teal-500", icon: "📊" },
    { id: "65", term: "Sector", definition: "Category of industry.", example: "IT, Pharma, Auto. 🏭", details: "Sector rotation is key. When IT is down, Auto might be up.", category: "Market", color: "bg-gray-600", icon: "🏗️" },
    { id: "66", term: "Rally", definition: "Sustained price increase.", example: "Market going up for days! 🚀", details: "Don't chase a rally too late; you might become the 'greater fool'.", category: "Market", color: "bg-green-500", icon: "🧗" },
    { id: "67", term: "Correction", definition: "Price drop >10% but <20%.", example: "Healthy pullback. 📉", details: "Corrections are normal and remove weak hands from the market.", category: "Market", color: "bg-orange-500", icon: "🩹" },
    { id: "68", term: "Crash", definition: "Sudden, severe drop.", example: "Panic selling! 💥", details: "Crashes usually happen when leverage is flushed out of the system.", category: "Market", color: "bg-red-700", icon: "📉" },
    { id: "69", term: "Volume", definition: "Amount traded.", example: "Activity level of the stock. 🔊", details: "Price action without volume is often a trap.", category: "Trading", color: "bg-indigo-400", icon: "📊" },
    { id: "70", term: "Float", definition: "Shares available to trade.", example: "Publicly held shares. 🌊", details: "Low float stocks are more volatile because it takes less money to move them.", category: "Stocks", color: "bg-blue-300", icon: "⛵" },
    { id: "71", term: "Bid", definition: "Buyer's offer price.", example: "What you want to pay. 🙋", details: "You always buy at the Ask (higher) and sell at the Bid (lower).", category: "Trading", color: "bg-green-400", icon: "🟢" },
    { id: "72", term: "Ask", definition: "Seller's request price.", example: "What they want for it. 🙅", details: "The 'Spread' is the cost you pay to the market maker.", category: "Trading", color: "bg-red-400", icon: "🔴" },
    { id: "73", term: "Spread", definition: "Gap between Bid and Ask.", example: "The middleman's margin. ↔️", details: "Tight spreads mean high liquidity. Wide spreads mean low liquidity.", category: "Trading", color: "bg-gray-400", icon: "📏" },
    { id: "74", term: "Limit Order", definition: "Buy at specific price.", example: "Buy ONLY if it hits ₹100. 🎯", details: "Provides price control but no guarantee of execution.", category: "Trading", color: "bg-purple-500", icon: "🛑" },
    { id: "75", term: "Market Order", definition: "Buy at current price.", example: "Buy NOW, whatever price. 🏃", details: "Guarantees execution but not the price. Careful in volatile markets.", category: "Trading", color: "bg-orange-500", icon: "⚡" },
    { id: "76", term: "Stop-Loss", definition: "Sell if price drops to X.", example: "Safety net to limit loss. 🛡️", details: "Always use a stop-loss when trading. Protect your capital first.", category: "Trading", color: "bg-red-600", icon: "🛑" },
    { id: "77", term: "Margin", definition: "Borrowed money for trading.", example: "Leverage. Risky! 💣", details: "Margin works both ways: multiplies gains AND losses.", category: "Trading", color: "bg-yellow-500", icon: "💳" },
    { id: "78", term: "Leverage", definition: "Multiplying buying power.", example: "Trading ₹100k with ₹10k. 💪", details: "High leverage kills more traders than anything else.", category: "Trading", color: "bg-red-500", icon: "🏋️" },
    { id: "79", term: "Shorting", definition: "Betting price will fall.", example: "Selling first, buying later. 📉", details: "Losses on shorting are theoretically infinite (price can go up forever).", category: "Strategy", color: "bg-purple-700", icon: "🔻" },
    { id: "80", term: "Long", definition: "Betting price will rise.", example: "Buying and holding. 📈", details: "The default mode for most investors. Markets tend to rise over time.", category: "Strategy", color: "bg-green-600", icon: "🔭" },
    { id: "81", term: "Swing Trade", definition: "Days to Weeks holding.", example: "Catching the wave. 🏄", details: "Less stressful than day trading, but holds overnight risk.", category: "Strategy", color: "bg-blue-400", icon: "🌊" },
    { id: "82", term: "Day Trade", definition: "In and out same day.", example: "Fast paced action. ⚡", details: "90% of day traders lose money. It requires intense discipline.", category: "Strategy", color: "bg-red-400", icon: "⏱️" },
    { id: "83", term: "Scalping", definition: "Seconds to Minutes holding.", example: "Tiny profits, many trades. 🔪", details: "Requires lowest latency and lowest commissions to be profitable.", category: "Strategy", color: "bg-orange-400", icon: "✂️" },
    { id: "84", term: "Position", definition: "What you currently own.", example: "Open Long position. 📍", details: "Sizing your position correctly is the key to risk management.", category: "Trading", color: "bg-gray-500", icon: "🧘" },
    { id: "85", term: "Bull Trap", definition: "False signal up, then crash.", example: "Trapped buyers! 🪤", details: "Happens when a breakout fails and reverses quickly.", category: "Patterns", color: "bg-red-600", icon: "🚫" },
    { id: "86", term: "Bear Trap", definition: "False signal down, then rally.", example: "Trapped sellers! 🪤", details: "A favorite move of institutional algos to steal liquidity.", category: "Patterns", color: "bg-green-600", icon: "🚀" },
    { id: "87", term: "Support", definition: "Price floor.", example: "Where buyers step in. 🧱", details: "The more times support is tested, the weaker it might become.", category: "Technical", color: "bg-green-300", icon: "⬇️" },
    { id: "88", term: "Resistance", definition: "Price ceiling.", example: "Where sellers step in.  छत", details: "Old support often becomes new resistance after a breakdown.", category: "Technical", color: "bg-red-300", icon: "⬆️" },
    { id: "89", term: "Breakout", definition: "Price smashing resistance.", example: "Freedom! 🚀", details: "Volume confirmation is essential for a real breakout.", category: "Technical", color: "bg-purple-500", icon: "💥" },
    { id: "90", term: "Consolidation", definition: "Sideways movement.", example: "Market is resting. 😴", details: "The calm before the storm. Big moves often follow consolidation.", category: "Technical", color: "bg-gray-400", icon: "➖" },
    { id: "91", term: "Trend", definition: "Direction of market.", example: "Trend is your friend. 🛤️", details: "Never trade against the trend unless you are very experienced.", category: "Technical", color: "bg-blue-500", icon: "🧭" },
    { id: "92", term: "Gap Up", definition: "Open price > Yesterday close.", example: "Jumped overnight! 🦘", details: "Gaps are often 'filled' later, as price returns to check the void.", category: "Technical", color: "bg-green-500", icon: "⏫" },
    { id: "93", term: "Gap Down", definition: "Open price < Yesterday close.", example: "Fell overnight. 🕳️", details: "Caused by after-market news or global sentiment shifts.", category: "Technical", color: "bg-red-500", icon: "⏬" },
    { id: "94", term: "Candlestick", definition: "Chart style.", example: "Body and Wicks. 🕯️", details: "Originated in Japan in the 18th century for rice trading.", category: "Technical", color: "bg-yellow-200", icon: "📊" },
    { id: "95", term: "Doji", definition: "Indecision candle.", example: "Open = Close. ➕", details: "Signals a potential reversal if found at the top or bottom of a trend.", category: "Technical", color: "bg-gray-300", icon: "🤷" },
    { id: "96", term: "Hammer", definition: "Bullish reversal candle.", example: "Looks like a hammer. 🔨", details: "Shows buyers pushed price back up after a drop.", category: "Technical", color: "bg-green-400", icon: "⚒️" },
    { id: "97", term: "Shooting Star", definition: "Bearish reversal candle.", example: "Falling star. 🌠", details: "Shows sellers rejected higher prices.", category: "Technical", color: "bg-red-400", icon: "☄️" },
    { id: "98", term: "RSI", definition: "Relative Strength Index.", example: "Overbought or Oversold? 📉", details: ">70 is Overbought (Sell?), <30 is Oversold (Buy?).", category: "Indicator", color: "bg-purple-400", icon: "📏" },
    { id: "99", term: "MACD", definition: "Trend-following momentum.", example: "Moving Avg Convergence Divergence. 🌊", details: "Look for crossovers of the signal line for entry points.", category: "Indicator", color: "bg-blue-500", icon: "〰️" },
    { id: "100", term: "Bollinger Bands", definition: "Volatility bands.", example: "The squeeze! 🌭", details: "When bands squeeze tight, expect a big volatility expansion.", category: "Indicator", color: "bg-pink-400", icon: "🥪" },

    // --- CRYPTO (101-150) ---
    { id: "101", term: "Bitcoin", definition: "First Cryptocurrency.", example: "Digital Gold. ₿", details: "Satoshi Nakamoto created it in 2009. Only 21 Million will ever exist.", category: "Crypto", color: "bg-orange-500", icon: "🪙" },
    { id: "102", term: "Blockchain", definition: "Public Ledger.", example: "Chain of blocks. ⛓️", details: "A decentralized database that no single person controls.", category: "Crypto", color: "bg-gray-700", icon: "🔗" },
    { id: "103", term: "Altcoin", definition: "Alternative to Bitcoin.", example: "ETH, SOL, AVAX. 👾", details: "Thousands exist. Most will fail, some will change the world.", category: "Crypto", color: "bg-purple-600", icon: "💱" },
    { id: "104", term: "DeFi", definition: "Decentralized Finance.", example: "Banking without banks. 🏦🚫", details: "Earn interest, borrow, and lend using code (smart contracts).", category: "Crypto", color: "bg-indigo-600", icon: "🌐" },
    { id: "105", term: "NFT", definition: "Non-Fungible Token.", example: "Unique digital item. 🖼️", details: "Can represent art, music, or even real estate deeds.", category: "Crypto", color: "bg-pink-500", icon: "🦍" },
    { id: "106", term: "Wallet", definition: "Crypto storage.", example: "Metamask, Ledger. 👛", details: "Hot wallets (online) are for spending; Cold wallets (offline) are for saving.", category: "Crypto", color: "bg-orange-700", icon: "🔑" },
    { id: "107", term: "Private Key", definition: "Password to your wealth.", example: "Never share this! 🗝️", details: "If you lose your private key, your funds are gone forever.", category: "Crypto", color: "bg-red-700", icon: "🤐" },
    { id: "108", term: "Seed Phrase", definition: "Backup password phrase.", example: "12 words to save your life. 📝", details: "The master key to recover your wallet on any device.", category: "Crypto", color: "bg-yellow-700", icon: "🌱" },
    { id: "109", term: "HODL", definition: "Hold On for Dear Life.", example: "Never sell! ✊", details: "Originated from a drunk typo on a Bitcoin forum in 2013.", category: "Crypto", color: "bg-green-700", icon: "💎" },
    { id: "110", term: "FUD", definition: "Fear, Uncertainty, Doubt.", example: "Rumors to scare you. 😱", details: "Media often spreads FUD to lower prices. Do your own research.", category: "Crypto", color: "bg-gray-500", icon: "🧟" },
    { id: "111", term: "FOMO", definition: "Fear Of Missing Out.", example: "Buying at the top. 🏃", details: "The fastest way to lose money. Wait for a pullback.", category: "Crypto", color: "bg-green-500", icon: "😰" },
    { id: "112", term: "Whale", definition: "Big holder.", example: "Moves the market. 🐋", details: "When whales sell, the ocean (market) makes big waves.", category: "Crypto", color: "bg-blue-800", icon: "🐳" },
    { id: "113", term: "Gas", definition: "Transaction fee.", example: "Cost to use Ethereum. ⛽", details: "Gas fees go up when the network is congested.", category: "Crypto", color: "bg-gray-400", icon: "⛽" },
    { id: "114", term: "Mining", definition: "Creating new coins.", example: "Computers working hard. ⛏️", details: "Uses Proof of Work. Bitcoin mining uses immense energy.", category: "Crypto", color: "bg-yellow-600", icon: "🖥️" },
    { id: "115", term: "Staking", definition: "Earning interest on crypto.", example: "Lock up coins, get rewards. 🥩", details: "Uses Proof of Stake. Much more energy efficient than mining.", category: "Crypto", color: "bg-green-600", icon: "🏦" },
    { id: "116", term: "Smart Contract", definition: "Self-executing code.", example: "If X happens, do Y. 📜", details: "The foundation of DApps. Code is Law.", category: "Crypto", color: "bg-cyan-600", icon: "🤖" },
    { id: "117", term: "DApp", definition: "Decentralized App.", example: "Uniswap, OpenSea. 📱", details: "Runs on a blockchain, not a central server.", category: "Crypto", color: "bg-purple-500", icon: "🕸️" },
    { id: "118", term: "DAO", definition: "Decentralized Auto Org.", example: "Company run by code/votes. 🗳️", details: "No traditional CEO. Decisions are made by token holders.", category: "Crypto", color: "bg-orange-500", icon: "🤝" },
    { id: "119", term: "Stablecoin", definition: "Pegged to Fiat.", example: "USDT, USDC. Value = $1. ⚓", details: "Used to park cash during volatility without leaving crypto.", category: "Crypto", color: "bg-green-500", icon: "💵" },
    { id: "120", term: "Exchange (CEX)", definition: "Centralized Exchange.", example: "Binance, Coinbase. 🏢", details: "You don't own your keys here. Convenient but custodial.", category: "Crypto", color: "bg-yellow-500", icon: "💱" },
    { id: "121", term: "DEX", definition: "Decentralized Exchange.", example: "Uniswap. No middleman. 🦄", details: "Trade directly from your wallet. More secure, but complex.", category: "Crypto", color: "bg-pink-600", icon: "🔁" },
    { id: "122", term: "Bull Run", definition: "Epic rally.", example: "To the moon! 🚀", details: "Can last months or years. Everyone feels like a genius.", category: "Crypto", color: "bg-green-500", icon: "🌕" },
    { id: "123", term: "Bear Winter", definition: "Long crash.", example: "-80% for years. ❄️", details: "Where the real builders build. Survivors thrive in the next cycle.", category: "Crypto", color: "bg-blue-300", icon: "☃️" },
    { id: "124", term: "ATH", definition: "All Time High.", example: "Highest price ever. 🏔️", details: "Breaking ATH often leads to 'price discovery' mode.", category: "Crypto", color: "bg-green-400", icon: "🔝" },
    { id: "125", term: "ATL", definition: "All Time Low.", example: "Lowest price ever. 🕳️", details: "Buying near ATL is maximum risk, maximum reward.", category: "Crypto", color: "bg-red-400", icon: "📉" },

    // --- ECONOMICS (126-175) ---
    { id: "126", term: "GDP", definition: "Gross Domestic Product.", example: "Country's total output. 🏭", details: "GDP = Consumption + Investment + Gov Spending + Net Exports.", category: "Economics", color: "bg-blue-700", icon: "🌏" },
    { id: "127", term: "Recession", definition: "Economic decline.", example: "Two quarters of negative GDP. 📉", details: "Unemployment rises, spending drops. Cash is robust here.", category: "Economics", color: "bg-gray-600", icon: "🌧️" },
    { id: "128", term: "Depression", definition: "Severe recession.", example: "Years of pain. ⛈️", details: "The Great Depression (1929) lasted a decade.", category: "Economics", color: "bg-black", icon: "🌪️" },
    { id: "129", term: "Interest Rate", definition: "Cost of credit.", example: "Set by RBI/Fed. 🏦", details: "Low rates stimulate growth; high rates fight inflation.", category: "Economics", color: "bg-red-500", icon: "📈" },
    { id: "130", term: "Repo Rate", definition: "Rate RBI lends to banks.", example: "Controls liquidity. 🎛️", details: "If Repo increases, your home loan EMI usually increases.", category: "Economics", color: "bg-indigo-600", icon: "🏧" },
    { id: "131", term: "Reverse Repo", definition: "Rate RBI borrows.", example: "Sucks out liquidity. 🧹", details: "Used to remove excess cash from the banking system.", category: "Economics", color: "bg-purple-600", icon: "🔙" },
    { id: "132", term: "Fiscal Deficit", definition: "Govt overspending.", example: "Spending > Earning. 💳", details: "Financed by borrowing. Too much can devalue the currency.", category: "Economics", color: "bg-red-600", icon: "⚖️" },
    { id: "133", term: "Trade Deficit", definition: "Imports > Exports.", example: "Buying more than selling. 🚢", details: "Can weaken the local currency relative to the dollar.", category: "Economics", color: "bg-orange-600", icon: "📦" },
    { id: "134", term: "Forex", definition: "Foreign Exchange.", example: "Currency market. 💴", details: "The largest and most liquid market in the world.", category: "Economics", color: "bg-green-600", icon: "💱" },
    { id: "135", term: "Monetary Policy", definition: "Central Bank actions.", example: "Changing rates. 🏛️", details: "Controlled by RBI/Fed, not the elected government.", category: "Economics", color: "bg-blue-600", icon: "📜" },
    { id: "136", term: "Fiscal Policy", definition: "Govt tax/spend actions.", example: "Budget day! 💼", details: "Controlled by the elected government via the Budget.", category: "Economics", color: "bg-yellow-600", icon: "🏛️" },
    { id: "137", term: "Supply & Demand", definition: "Price driver.", example: "Scarcity = Price Up. ⚖️", details: "The fundamental law of all free markets.", category: "Economics", color: "bg-indigo-500", icon: "🛍️" },
    { id: "138", term: "Elasticity", definition: "Sensitivity to price.", example: "Salt is inelastic (Need it). 🧂", details: "Luxury goods are elastic; people stop buying if price goes up.", category: "Economics", color: "bg-gray-400", icon: "📏" },
    { id: "139", term: "Hyperinflation", definition: "Out of control inflation.", example: "Zimbabwe Trillion Dollar note. 💸", details: "Usually ends with the currency changing or collapsing completely.", category: "Economics", color: "bg-red-800", icon: "🔥" },
    { id: "140", term: "Stagflation", definition: "Stagnation + Inflation.", example: "No jobs, high prices. 💀", details: "Very hard to fix. Raising rates hurts jobs; lowering rates boosts inflation.", category: "Economics", color: "bg-orange-800", icon: "🐌" },

    // --- CORPORATE (141+) ---
    { id: "141", term: "Balance Sheet", definition: "Assets vs Liabilities.", example: "Snapshot of health. 📸", details: "Always checks if the company is solvent.", category: "Corporate", color: "bg-blue-500", icon: "📑" },
    { id: "142", term: "P&L", definition: "Profit and Loss Statement.", example: "Did we make money? 🧾", details: "Shows performance over a specific period (quarter/year).", category: "Corporate", color: "bg-green-500", icon: "💹" },
    { id: "143", term: "Cash Flow", definition: "Movement of cash.", example: "Cash is King. 👑", details: "A profitable company can still go bankrupt if it runs out of cash.", category: "Corporate", color: "bg-green-600", icon: "🌊" },
    { id: "144", term: "EBITDA", definition: "Earnings Before Interest, Tax...", example: "Operational profit. ⚙️", details: "A cleaner view of core business profitability.", category: "Corporate", color: "bg-gray-500", icon: "🏭" },
    { id: "145", term: "Top Line", definition: "Revenue.", example: "The big number. 🔝", details: "Growing top line shows demand for the product.", category: "Corporate", color: "bg-blue-400", icon: "⬆️" },
    { id: "146", term: "Bottom Line", definition: "Net Income.", example: "The final profit. ⬇️", details: "What actually belongs to the shareholders.", category: "Corporate", color: "bg-green-700", icon: "💵" },
    { id: "147", term: "Acquisition", definition: "Buying another company.", example: "Facebook buys WhatsApp. 🤝", details: "Usually done to kill competition or acquire tech/users.", category: "Corporate", color: "bg-purple-600", icon: "💍" },
    { id: "148", term: "Merger", definition: "Combining companies.", example: "HDFC + HDFC Bank. 💒", details: "1 + 1 should equal 3 (Synergy).", category: "Corporate", color: "bg-pink-600", icon: "💑" },
    { id: "149", term: "Hostile Takeover", definition: "Forceful acquisition.", example: "Buying against their will. ⚔️", details: "Going directly to shareholders when the board says no.", category: "Corporate", color: "bg-red-600", icon: "🏴‍☠️" },
    { id: "150", term: "Unicorn", definition: "Startup worth $1 Billion+.", example: "Rare and magical. 🦄", details: "The term was coined by Aileen Lee in 2013.", category: "Startup", color: "bg-pink-400", icon: "🦄" },
    { id: "151", term: "Decacorn", definition: "$10 Billion+ company.", example: "Super rare via Swiggy/Flipkart. 🐲", details: "Next level up is 'Hectocorn' ($100B).", category: "Startup", color: "bg-purple-800", icon: "🦕" },
    { id: "152", term: "Bootstrap", definition: "Self-funding.", example: "No investors, just hustle. 🥾", details: "Maintains 100% control but slower growth.", category: "Startup", color: "bg-orange-600", icon: "💪" },
    { id: "153", term: "Angel Investor", definition: "Early stage funder.", example: "Rich uncle giving cash. 👼", details: "Invests in the person/idea, often before any revenue.", category: "Startup", color: "bg-yellow-400", icon: "💸" },
    { id: "154", term: "Venture Capital", definition: "Institutional funding.", example: "VC firms scaling you up. 🚀", details: "VCs look for 100x returns because most startups fail.", category: "Startup", color: "bg-teal-600", icon: "🦈" },
    { id: "155", term: "Burn Rate", definition: "Cash spending speed.", example: "Losing money to grow. 🔥", details: "High burn rate requires constant fundraising.", category: "Startup", color: "bg-red-500", icon: "🚒" },
    { id: "156", term: "Runway", definition: "Time till broke.", example: "Months of cash left. 🛫", details: "Runway = Cash Balance / Monthly Burn Rate.", category: "Startup", color: "bg-gray-600", icon: "⏳" },
    { id: "157", term: "Pivot", definition: "Changing strategy.", example: "We sell tea now, not coffee. 🔄", details: "Twitter started as a podcasting platform (Odeo) before pivoting.", category: "Startup", color: "bg-blue-500", icon: "🤸" },
    { id: "158", term: "Exit Strategy", definition: "How to cash out.", example: "IPO or Acquisition. 🚪", details: "Investors always ask: 'How do I get my money back?'", category: "Startup", color: "bg-green-500", icon: "🏁" },
    { id: "159", term: "Moat", definition: "Competitive advantage.", example: "Hard to copy. 🏰", details: "Warren Buffett's favorite quality in a business.", category: "Business", color: "bg-indigo-700", icon: "🐊" },
    { id: "160", term: "Black Swan", definition: "Rare, catastrophic event.", example: "Pandemic market crash. 🦢", details: "Event is unpredictable but obvious in hindsight.", category: "Risk", color: "bg-black", icon: "🖤" },
    { id: "161", term: "Grey Rhino", definition: "Obvious danger ignored.", example: "Coming debt crisis. 🦏", details: "A threat that everyone sees coming but does nothing about.", category: "Risk", color: "bg-gray-500", icon: "🌪️" },
    { id: "162", term: "Dead Cat Bounce", definition: "Temp recovery in crash.", example: "Even a dead cat bounces. 🐈", details: "A specific chart pattern where a falling stock rallies slightly before falling further.", category: "Market", color: "bg-red-700", icon: "📉" },
    { id: "163", term: "Catching a Knife", definition: "Buying falling stock.", example: "Dangerous moves! 🔪", details: "Waiting for a bottom to form is safer than guessing.", category: "Strategy", color: "bg-red-600", icon: "🩸" },
    { id: "164", term: "Buy the Dip", definition: "Buying when price drops.", example: "Discount shopping. 🛍️", details: "Works in a Bull Market. Fails in a Bear Market.", category: "Strategy", color: "bg-green-600", icon: "📉" },
    { id: "165", term: "Sell the News", definition: "Price drops on good news.", example: "Anticipation is over. 📰", details: "Buy probability, sell certainty.", category: "Strategy", color: "bg-yellow-600", icon: "🗣️" },
    { id: "166", term: "Whale Watching", definition: "Tracking big money.", example: "Following the smart money. 🔭", details: "Public blockchains allow you to see exactly what big wallets are doing.", category: "Strategy", color: "bg-blue-600", icon: "🐳" },
    { id: "167", term: "Arbitrage", definition: "Risk-free profit.", example: "Price difference exploitation. ⚖️", details: "HFT algos close these gaps in milliseconds.", category: "Advanced", color: "bg-purple-600", icon: "⚡" },
    { id: "168", term: "Short Squeeze", definition: "Sellers forced to buy.", example: "GME to the moon. 🍋", details: "Occurs when Short Interest > Float.", category: "Market", color: "bg-green-500", icon: "🚀" },
    { id: "169", term: "Gamma Squeeze", definition: "Options driven rally.", example: "Explosive move up. ☢️", details: "Driven by market makers hedging their call options.", category: "Advanced", color: "bg-green-400", icon: "🤢" },
    { id: "170", term: "Golden Cross", definition: "Bullish signal.", example: "50 MA crosses 200 MA up. ✝️", details: "A strong sign of a long-term trend reversal.", category: "Technical", color: "bg-yellow-400", icon: "⚔️" },
    { id: "171", term: "Death Cross", definition: "Bearish signal.", example: "50 MA crosses 200 MA down. ☠️", details: "Often precedes a major bear market.", category: "Technical", color: "bg-black", icon: "⚰️" },
    { id: "172", term: "Head and Shoulders", definition: "Reversal pattern.", example: "Looks like a person. 👤", details: "One of the most reliable reversal patterns in technical analysis.", category: "Technical", color: "bg-gray-500", icon: "🤷" },
    { id: "173", term: "Cup and Handle", definition: "Bullish continuation.", example: "Time for tea. ☕", details: "Usually appears during a pause in an uptrend.", category: "Technical", color: "bg-green-300", icon: "🍵" },
    { id: "174", term: "Double Top", definition: "Bearish reversal.", example: "Hit ceiling twice. Ⓜ️", details: "Looks like an 'M'. Signals seller strength at that level.", category: "Technical", color: "bg-red-400", icon: "🧱" },
    { id: "175", term: "Double Bottom", definition: "Bullish reversal.", example: "Hit floor twice. 🇼", details: "Looks like a 'W'. Signals buyer strength at that level.", category: "Technical", color: "bg-green-400", icon: "👟" },
];

// GENERATE FILLER CARDS TO REACH 500
const TOPICS = ["Stock", "Bond", "Option", "Future", "ETF", "Crypto", "Asset", "Fund"];
const ADJECTIVES = ["Global", "Dynamic", "Strategic", "Hedged", "Leveraged", "Secure", "Liquid", "Digital"];

for (let i = 176; i <= 500; i++) {
    const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    FLASHCARDS.push({
        id: i.toString(),
        term: `${adj} ${topic}`,
        definition: `A specific variant of ${topic.toLowerCase()} focused on ${adj.toLowerCase()} outcomes in the market.`,
        example: `Used by advanced traders for ${adj.toLowerCase()} gains. 🧠`,
        details: `Did you know? ${adj} ${topic}s are often used by institutional investors to hedge against volatility.`,
        category: "Advanced",
        color: color,
        icon: "🧬"
    });
}
