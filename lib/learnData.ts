
export interface ChartConfig {
    type: 'bar' | 'line' | 'area' | 'pie';
    data: any[];
    title: string;
    description: string;
    dataKey: string;
    xAxisKey: string;
}

export interface ModuleData {
    id: string;
    title: string;
    description: string;
    content: string[];
    chart: ChartConfig;
}

export const LEARN_MODULES: Record<string, ModuleData> = {
    "basics-of-money": {
        id: "basics-of-money",
        title: "Basics of Money",
        description: "Understanding the true nature of currency, value, and wealth creation.",
        content: [
            "Money is often misunderstood. It is not just the paper in your wallet or the number in your bank account; it is a store of value and a medium of exchange. In our modern economy, money is 'Fiat', meaning it is not backed by physical gold but by the trust and stability of the government.",
            "The most critical concept for a beginner is 'The Time Value of Money'. A rupee today is worth more than a rupee tomorrow. Why? Because of its earning potential. If you invest ₹100 today at 10%, it becomes ₹110 next year. If you keep it under your mattress, it remains ₹100 nominally, but its purchasing power drops due to inflation.",
            "There is a difference between being 'Rich' and being 'Wealthy'. Rich is having a high income (high salary). Wealthy is having high assets (properties, stocks, gold) that generate income even when you sleep. Your goal should be wealth, not just riches.",
            "The Rule of Saving: Pay yourself first. Before you pay your rent, bills, or buy coffee, set aside at least 20% of your income for your future self. This simple habit is the foundation of all financial success."
        ],
        chart: {
            type: 'bar',
            title: "Purchasing Power vs Time (Uninvested)",
            description: "How inflation erodes the value of kept cash over 10 years.",
            dataKey: "value",
            xAxisKey: "year",
            data: [
                { year: 'Year 0', value: 100000 },
                { year: 'Year 2', value: 92000 },
                { year: 'Year 5', value: 81000 },
                { year: 'Year 8', value: 72000 },
                { year: 'Year 10', value: 65000 },
            ]
        }
    },
    "power-of-compounding": {
        id: "power-of-compounding",
        title: "Power of Compounding",
        description: "Einstein called it the 8th wonder of the world. Here creates generational wealth.",
        content: [
            "Compounding is the magic that happens when your interest earns interest. It creates a snowball effect that accelerates wealth creation over time. It is the reason why starting early is more important than starting big.",
            "Let's look at an example: If you invest ₹5,000/month starting at age 25, by age 60 (at 12% return), you will have ₹3.2 Crores. If you wait until age 35 to start, even if you invest double (₹10,000/month), you will only have ₹1.9 Crores. You invested more capital, but you lost the advantage of time.",
            "The Rule of 72: This is a quick mental math trick. Divide 72 by your expected interest rate to see how many years it takes to double your money. For example, at a 12% return (typical for Nifty 50), your money doubles every 6 years (72 ÷ 12 = 6).",
            "Patience is key. In the first few years, compounding feels slow, like a bamboo tree growing roots underground. But after the 7th or 8th year, the growth becomes explosive. Don't interrupt the process!"
        ],
        chart: {
            type: 'area',
            title: "Linear vs Exponential Growth",
            description: "Saving 10k/month vs Investing 10k/month @ 12%",
            dataKey: "value",
            xAxisKey: "year",
            data: [
                { year: 'Yr 1', invested: 1.2, value: 1.3 },
                { year: 'Yr 5', invested: 6.0, value: 8.5 },
                { year: 'Yr 10', invested: 12.0, value: 23.0 },
                { year: 'Yr 15', invested: 18.0, value: 50.0 },
                { year: 'Yr 20', invested: 24.0, value: 99.0 },
            ]
        }
    },
    "inflation-101": {
        id: "inflation-101",
        title: "Inflation 101",
        description: "The silent killer of wealth that eats your savings while you sleep.",
        content: [
            "Inflation is the rate at which the general price of goods and services rises. In India, the historical inflation rate is roughly 6-7%. This means things get 6-7% more expensive every single year.",
            "Think about it: In 2010, a movie ticket cost ₹150. Today, it's ₹350+. A litre of petrol was ₹50, now it's ₹100+. This is inflation in action. If your money is sitting in a Savings Account earning 3% interest, you are actually becoming poorer by 3-4% every year because your money isn't growing fast enough to keep up with prices.",
            "Real Return = Nominal Return - Inflation. If your FD gives 7% and inflation is 7%, your Real Return is 0%. You haven't made any money; you've simply maintained your purchasing power (before tax!).",
            "To build wealth, you must invest in assets that historically beat inflation: Equities (Stocks), Real Estate, and Gold. Fixed income instruments like FDs are for safety, not for wealth creation."
        ],
        chart: {
            type: 'line',
            title: "Rising Cost of Living",
            description: "Cost of a generic 'Lifestyle Basket' over decades.",
            dataKey: "cost",
            xAxisKey: "year",
            data: [
                { year: '2000', cost: 20000 },
                { year: '2010', cost: 45000 },
                { year: '2020', cost: 85000 },
                { year: '2030', cost: 150000 },
                { year: '2040', cost: 300000 },
            ]
        }
    },
    "stock-market-basics": {
        id: "stock-market-basics",
        title: "Stock Market Basics",
        description: "Owning a piece of a business and participating in its growth story.",
        content: [
            "When you buy a 'Stock' or 'Share', you are buying part-ownership in a real business. If you buy a share of Reliance, you are a part-owner of Reliance Industries. As the company sells more oil, telecom plans, and retail goods, its profits grow, and so does the value of your share.",
            "The market has two main emotions: Greed and Fear. These drive prices up and down in the short term. However, in the long term, stock prices follow the earnings (profit) growth of companies.",
            "What are Nifty and Sensex? They are indices. Nifty 50 represents the top 50 largest companies in India. Sensex represents the top 30. They act as a barometer for the Indian economy. If Nifty is up, generally, the Indian corporate sector is doing well.",
            "Why invest in stocks? Historically, equities have delivered the highest returns (around 12-15% CAGR) compared to Gold (8-10%), Real Estate (6-10%), and FDs (5-7%). It is the best vehicle for long-term wealth creation despite the short-term volatility."
        ],
        chart: {
            type: 'area',
            title: "Nifty 50 Long Term Trajectory",
            description: "Generalized growth trend of Indian Markets.",
            dataKey: "points",
            xAxisKey: "year",
            data: [
                { year: '2000', points: 1500 },
                { year: '2005', points: 2800 },
                { year: '2010', points: 6000 },
                { year: '2015', points: 8500 },
                { year: '2020', points: 12000 },
                { year: '2025', points: 24000 },
            ]
        }
    },
    "what-is-sip": {
        id: "what-is-sip",
        title: "What is SIP?",
        description: "Systematic Investment Plan - The disciplined, stress-free way to invest.",
        content: [
            "SIP is not a product; it is a method of investing. It stands for Systematic Investment Plan. Instead of trying to time the market (buying low and selling high), which even experts fail at, you commit to investing a fixed amount on a fixed date every month.",
            "The magic of SIP lies in 'Rupee Cost Averaging'. When the market crashes, stock prices are low. Your fixed SIP amount buys MORE units. When the market is high, your SIP buys FEWER units. over time, your average cost of buying is lower than the average market price. You automatically buy low without trying!",
            "SIPs inculcate discipline. It treats investing like a monthly bill—like electricity or rent—that must be paid. This ensures you satisfy the rule of 'Pay Yourself First'.",
            "You can start an SIP with as little as ₹500. There is no excuse not to start. The best time to start was yesterday; the second best time is today."
        ],
        chart: {
            type: 'bar',
            title: "Rupee Cost Averaging Effect",
            description: "Units bought in Volatile Market vs Flat Market.",
            dataKey: "units",
            xAxisKey: "month",
            data: [
                { month: 'Jan', price: 100, units: 10 },
                { month: 'Feb', price: 80, units: 12.5 },
                { month: 'Mar', price: 120, units: 8.3 },
                { month: 'Apr', price: 100, units: 10 },
                { month: 'May', price: 90, units: 11.1 },
            ]
        }
    },
    "mutual-funds": {
        id: "mutual-funds",
        title: "Mutual Funds",
        description: "Professional money management for everyone. Diversify with a single click.",
        content: [
            "A Mutual Fund is like a potluck dinner. Thousands of investors put their money into a common pool. A professional chef (Fund Manager) then uses this huge pool of money to buy a buffet of high-quality dishes (Stocks, Bonds, Gold). You get a slice (Unit) of the entire buffet based on your contribution.",
            "Benefits of Mutual Funds: 1. Professional Management: You don't need to track markets; experts do it for you. 2. Diversification: With ₹500, you can own a tiny slice of 50 top companies. 3. Liquidity: You can sell your units and get money in your bank in 1-2 days.",
            "Types of Mutual Funds: \n- Equity Funds: Invest in stocks (High Risk, High Return). Best for goals > 5 years.\n- Debt Funds: Invest in bonds/government securities (Low Risk, Low Return). Best for goals < 3 years.\n- Hybrid Funds: Mix of both.",
            "For beginners, an 'Index Fund' (which simply copies the Nifty 50) is often the best choice. It has low fees and guarantees you beat 80% of professional managers over the long term."
        ],
        chart: {
            type: 'pie',
            title: "Typical MF Portfolio",
            description: "Asset allocation inside a Flexi-Cap Fund.",
            dataKey: "value",
            xAxisKey: "name",
            data: [
                { name: 'Large Cap', value: 50 },
                { name: 'Mid Cap', value: 30 },
                { name: 'Small Cap', value: 10 },
                { name: 'Cash/Debt', value: 10 },
            ]
        }
    },
    "etfs-explained": {
        id: "etfs-explained",
        title: "ETFs Explained",
        description: "Exchange Traded Funds - The best of Stocks and Mutual Funds combined.",
        content: [
            "An ETF (Exchange Traded Fund) is arguably the most efficient investment innovation of the last century. It is a basket of securities (like a mutual fund) that trades on the stock exchange (like a stock). You can buy and sell it throughout the day.",
            "Why choose ETFs? \n1. Low Cost: They are usually passively managed (simply tracking an index like Nifty), so the fees (Expense Ratio) are extremely low, often 0.05% vs 1-2% for active Mutual Funds. \n2. Flexibility: You can buy 1 unit of NiftyBees (approx ₹250) instantly.",
            "Popular ETFs in India: \n- NiftyBees: Tracks Nifty 50.\n- JuniorBees: Tracks Nifty Next 50.\n- GoldBees: Tracks physical gold prices.\n- LiquidBees: Parking spot for cash.",
            "ETFs are perfect for specific tactical allocations. Want to invest in the IT sector? Buy ITBees. Want to invest in Banks? Buy BankBees. It allows you to take sector bets without picking individual winning stocks."
        ],
        chart: {
            type: 'bar',
            title: "Expense Ratio Comparison",
            description: "Active MF vs Passive ETF fees impact.",
            dataKey: "fee",
            xAxisKey: "type",
            data: [
                { type: 'Active MF', fee: 1.5 },
                { type: 'Index Fund', fee: 0.5 },
                { type: 'ETF', fee: 0.05 },
            ]
        }
    },
    "risk-management": {
        id: "risk-management",
        title: "Risk Management",
        description: "Protecting your capital is Rule No. 1. Return OF capital > Return ON capital.",
        content: [
            "Warren Buffett's two rules of investing: Rule No. 1: Never lose money. Rule No. 2: Never forget Rule No. 1. Risk management is about ensuring that one bad decision doesn't wipe you out.",
            "The Safety Net: Before you invest a single rupee in stocks, ensure you have an Emergency Fund. This should be 6-12 months of living expenses kept in a safe, liquid place (like a Fixed Deposit). This prevents you from selling your stocks during a market crash just to pay for a medical emergency.",
            "Diversification: Don't put all your eggs in one basket. If you only own IT stocks and the tech sector crashes, you lose everything. Spread your money across stocks, bonds, gold, and real estate. When stocks fall, gold usually rises, balancing your portfolio.",
            "Time Horizon matching: Don't invest money you need next year into the stock market. Market drops of 20-30% are normal in the short term. Only invest 'long-term money' (5+ years availability) into equities."
        ],
        chart: {
            type: 'pie',
            title: "Safe Portfolio Allocation",
            description: "Balanced approach for moderate risk.",
            dataKey: "value",
            xAxisKey: "name",
            data: [
                { name: 'Equity', value: 50 },
                { name: 'Debt', value: 30 },
                { name: 'Gold', value: 10 },
                { name: 'Cash', value: 10 },
            ]
        }
    },
    "ipo-analysis": {
        id: "ipo-analysis",
        title: "IPO Analysis",
        description: "Initial Public Offering - When a private company asks the public for money.",
        content: [
            "An IPO (Initial Public Offering) is when a company lists on the stock exchange for the first time. It is often surrounded by hype and marketing. As an investor, you must learn to separate the business reality from the marketing noise.",
            "The Warning: Many companies dress up their financials before an IPO to look better than they are. This is called 'Window Dressing'. Statistically, most IPOs underperform the broader market 3-5 years after listing.",
            "What to check before applying? Read the RHP (Red Herring Prospectus). \n1. Why are they raising money? (To pay off debt? Bad sign. To expand factories? Good sign). \n2. Valuation (P/E Ratio): Is it expensive compared to its peers? \n3. Promoter holding: Are the owners selling out and running away?",
            "Don't invest just for 'Listing Gains'. That is gambling, not investing. Invest only if you want to hold the business for 10 years."
        ],
        chart: {
            type: 'bar',
            title: "IPO Listing Gains vs Long Term",
            description: "Probability of success.",
            dataKey: "chance",
            xAxisKey: "type",
            data: [
                { type: 'Listing Gain', chance: 60 },
                { type: '1 Yr Gain', chance: 40 },
                { type: '5 Yr Gain', chance: 20 },
            ]
        }
    },
    "crypto-basics": {
        id: "crypto-basics",
        title: "Crypto Basics",
        description: "The Wild West of Finance. High Risk, High Reward.",
        content: [
            "Cryptocurrencies like Bitcoin and Ethereum are digital assets decentralized on a Blockchain. Unlike fiat currency (Rupees/Dollars), they cannot be printed endlessly by governments, which makes them a potential hedge against inflation (digital gold).",
            "Volatility Warning: Crypto is extremely volatile. It is normal for Bitcoin to drop 50% in a month and rise 100% in the next. If you cannot stomach seeing your portfolio down 50%, do not touch crypto.",
            "Allocation Rule: Treat crypto like a lottery ticket with better odds. Never allocate more than 5% of your total net worth to it. If it goes to zero, you are fine. If it goes 10x, you make a significant profit.",
            "Security: 'Not your keys, not your crypto'. If you leave your coins on an exchange (like WazirX or Binance), you don't truly own them. For large amounts, use a Hardware Wallet."
        ],
        chart: {
            type: 'line',
            title: "Bitcoin Volatility",
            description: "Extreme ups and downs compared to stocks.",
            dataKey: "price",
            xAxisKey: "year",
            data: [
                { year: '2015', price: 400 },
                { year: '2017', price: 19000 },
                { year: '2018', price: 3000 },
                { year: '2021', price: 69000 },
                { year: '2022', price: 16000 },
                { year: '2024', price: 73000 },
            ]
        }
    },
    "tax-planning": {
        id: "tax-planning",
        title: "Tax Planning",
        description: "It's not about what you earn, it's about what you keep.",
        content: [
            "Tax Planning is a legal way to reduce your tax liability. Tax Evasion is illegal. Know the difference. In India, the government incentivizes you to invest by offering tax deductions.",
            "Section 80C: The most popular deduction. You can reduce your taxable income by ₹1.5 Lakhs by investing in EPF, PPF, Life Insurance, or ELSS Mutual Funds. For young investors, ELSS is the best option as it has the lowest lock-in (3 years) and works on equity growth.",
            "Capital Gains Tax: \n- STCG (Short Term): If you sell stocks within 1 year, you pay 20% tax on profit. \n- LTCG (Long Term): If you hold for >1 year, you pay 12.5% tax, but only on profits above ₹1.25 Lakhs. This makes long-term investing very tax-efficient.",
            "Tax Loss Harvesting: A pro tip. If you have some loss-making stocks at the end of the year, you can sell them to book a 'loss' which offsets your 'profit' from other stocks, thereby reducing your total tax bill."
        ],
        chart: {
            type: 'bar',
            title: "Tax Impact on Returns",
            description: "Post-tax returns of different assets.",
            dataKey: "return",
            xAxisKey: "asset",
            data: [
                { asset: 'FD (30% slab)', return: 5.0 },
                { asset: 'Debt Fund', return: 6.5 },
                { asset: 'Stocks (LTCG)', return: 11.0 },
            ]
        }
    },
    "retirement": {
        id: "retirement",
        title: "Retirement Planning",
        description: "Financial Freedom is the ultimate goal. The day you work because you 'want' to, not 'have' to.",
        content: [
            "Retirement is not an age (like 60). It is a financial number. It is the point where your passive income (from dividends, rent, interest) exceeds your monthly expenses.",
            "The 4% Rule: A general rule of thumb for global retirement. You need a corpus roughly 25 times your annual expenses to retire. If you spend ₹10 Lakhs a year, you need ₹2.5 Crores to retire safely.",
            "Inflation is the enemy of retirement. If you retire today with ₹1 Crore, in 20 years, that ₹1 Crore will only buy ₹30 Lakhs worth of goods. You must continue investing in growth assets (Equity) even after retirement to protect your corpus.",
            "Action Plan: 1. Calculate your monthly expense. 2. Multiply by 300 (25 years x 12 months). 3. Start an SIP today to hit that number. The earlier you start, the smaller the monthly sip needs to be."
        ],
        chart: {
            type: 'area',
            title: "Corpus Growth Path",
            description: "Building a 5 Crore Corpus.",
            dataKey: "corpus",
            xAxisKey: "age",
            data: [
                { age: '25', corpus: 0 },
                { age: '35', corpus: 50 },
                { age: '45', corpus: 200 },
                { age: '55', corpus: 500 },
                { age: '60', corpus: 800 },
            ]
        }
    }
};
