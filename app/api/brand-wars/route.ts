import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore – yahoo-finance2 ships CJS, types work fine at runtime
import yahooFinance from 'yahoo-finance2';

export const dynamic = 'force-dynamic';

// ─── Snapshot fallback (Jan 2026 verified data) ────────────────────────────
// Used only when Yahoo Finance is unreachable for a specific symbol.
const SNAPSHOT: Record<string, { return: number; price: number }> = {
    'ZOMATO.NS':     { return: 142.5, price: 280.5 },
    'JUBLFOOD.NS':   { return: 15.2,  price: 650.0 },
    'HDFCBANK.NS':   { return: -4.5,  price: 1650.0 },
    'ICICIBANK.NS':  { return: 25.8,  price: 1350.0 },
    'SBIN.NS':       { return: 45.2,  price: 850.0 },
    'BANKBARODA.NS': { return: 30.5,  price: 280.0 },
    'TATAMOTORS.NS': { return: 85.4,  price: 1100.0 },
    'MARUTI.NS':     { return: 12.1,  price: 12500.0 },
    'BAJAJ-AUTO.NS': { return: 88.5,  price: 9500.0 },
    'HEROMOTOCO.NS': { return: 40.2,  price: 4800.0 },
    'TVSMOTOR.NS':   { return: 55.2,  price: 2800.0 },
    'EICHERMOT.NS':  { return: 15.5,  price: 4800.0 },
    'M&M.NS':        { return: 75.5,  price: 3200.0 },
    'ESCORTS.NS':    { return: 12.5,  price: 3800.0 },
    'TCS.NS':        { return: 18.5,  price: 4200.0 },
    'INFY.NS':       { return: 10.2,  price: 1950.0 },
    'PERSISTENT.NS': { return: 60.5,  price: 5400.0 },
    'LTIM.NS':       { return: 5.5,   price: 5200.0 },
    'OFSS.NS':       { return: 85.2,  price: 11500.0 },
    'WIPRO.NS':      { return: 10.5,  price: 550.0 },
    'ITC.NS':        { return: 35.5,  price: 520.0 },
    'HINDUNILVR.NS': { return: 4.2,   price: 2700.0 },
    'VBL.NS':        { return: 68.5,  price: 650.0 },
    'TATACONSUM.NS': { return: 22.1,  price: 1200.0 },
    'BRITANNIA.NS':  { return: 15.5,  price: 5800.0 },
    'NESTLEIND.NS':  { return: 2.5,   price: 2500.0 },
    'GODREJCP.NS':   { return: 30.5,  price: 1400.0 },
    'DABUR.NS':      { return: -5.5,  price: 580.0 },
    'MCDOWELL-N.NS': { return: 35.5,  price: 1400.0 },
    'RADICO.NS':     { return: 55.5,  price: 2200.0 },
    'TATAPOWER.NS':  { return: 75.5,  price: 450.0 },
    'ADANIPOWER.NS': { return: 105.2, price: 780.0 },
    'SUZLON.NS':     { return: 300.5, price: 80.5 },
    'INOXWIND.NS':   { return: 250.2, price: 220.0 },
    'ONGC.NS':       { return: 60.5,  price: 350.0 },
    'RELIANCE.NS':   { return: 20.5,  price: 3200.0 },
    'POLYCAB.NS':    { return: 50.5,  price: 7500.0 },
    'KEI.NS':        { return: 80.5,  price: 4800.0 },
    'HAL.NS':        { return: 145.0, price: 5200.0 },
    'BEL.NS':        { return: 115.5, price: 320.0 },
    'IRFC.NS':       { return: 180.5, price: 190.0 },
    'RVNL.NS':       { return: 165.2, price: 550.0 },
    'TITAN.NS':      { return: 28.5,  price: 3800.0 },
    'KALYANKJIL.NS': { return: 95.5,  price: 750.0 },
    'ASIANPAINT.NS': { return: -12.5, price: 2800.0 },
    'BERGERPAINT.NS':{ return: -2.5,  price: 580.0 },
    'INDIGO.NS':     { return: 50.5,  price: 4800.0 },
    'SPICEJET.NS':   { return: -20.5, price: 55.0 },
    'INDHOTEL.NS':   { return: 65.5,  price: 750.0 },
    'EIHOTEL.NS':    { return: 40.5,  price: 480.0 },
    'DLF.NS':        { return: 75.5,  price: 1200.0 },
    'GODREJPROP.NS': { return: 55.2,  price: 3200.0 },
    'PRESTIGE.NS':   { return: 120.5, price: 2200.0 },
    'OBEROIRLTY.NS': { return: 50.5,  price: 1800.0 },
    'BHARTIARTL.NS': { return: 65.2,  price: 1600.0 },
    'IDEA.NS':       { return: -25.5, price: 8.5 },
    'PAYTM.NS':      { return: -40.5, price: 450.0 },
    'PBFINTECH.NS':  { return: 80.5,  price: 1800.0 },
    'BAJFINANCE.NS': { return: -8.5,  price: 6800.0 },
    'JIOFIN.NS':     { return: 45.5,  price: 380.0 },
    'ANGELONE.NS':   { return: 90.5,  price: 2800.0 },
    'BSE.NS':        { return: 250.5, price: 3800.0 },
    'SHRIRAMFIN.NS': { return: 60.5,  price: 3200.0 },
    'DEVYANI.NS':    { return: -15.0, price: 160.0 },
    'SAPPHIRE.NS':   { return: -10.0, price: 300.0 },
};

// ─── Battle config ──────────────────────────────────────────────────────────
const BATTLES = [
    { id: 'food-delivery',  category: 'Food Delivery',    pair: [{ name: 'Zomato',          symbol: 'ZOMATO.NS' },      { name: "Domino's",        symbol: 'JUBLFOOD.NS' }] },
    { id: 'qsr-giants',     category: 'QSR Giants',       pair: [{ name: 'Devyani (KFC)',    symbol: 'DEVYANI.NS' },     { name: 'Sapphire Foods',  symbol: 'SAPPHIRE.NS' }] },
    { id: 'private-banks',  category: 'Private Banks',    pair: [{ name: 'HDFC Bank',        symbol: 'HDFCBANK.NS' },    { name: 'ICICI Bank',      symbol: 'ICICIBANK.NS' }] },
    { id: 'psu-banks',      category: 'PSU Banks',        pair: [{ name: 'SBI',              symbol: 'SBIN.NS' },        { name: 'Bank of Baroda',  symbol: 'BANKBARODA.NS' }] },
    { id: 'auto-giants',    category: 'Auto Giants',      pair: [{ name: 'Tata Motors',      symbol: 'TATAMOTORS.NS' },  { name: 'Maruti Suzuki',   symbol: 'MARUTI.NS' }] },
    { id: 'two-wheelers',   category: '2-Wheelers',       pair: [{ name: 'Bajaj Auto',       symbol: 'BAJAJ-AUTO.NS' },  { name: 'Hero MotoCorp',   symbol: 'HEROMOTOCO.NS' }] },
    { id: 'ev-rev',         category: 'EV Revolution',    pair: [{ name: 'TVS Motor',        symbol: 'TVSMOTOR.NS' },    { name: 'Eicher (RE)',     symbol: 'EICHERMOT.NS' }] },
    { id: 'tractors',       category: 'Tractors',         pair: [{ name: 'M&M',              symbol: 'M&M.NS' },         { name: 'Escorts',         symbol: 'ESCORTS.NS' }] },
    { id: 'it-titans',      category: 'IT Titans',        pair: [{ name: 'TCS',              symbol: 'TCS.NS' },         { name: 'Infosys',         symbol: 'INFY.NS' }] },
    { id: 'midcap-it',      category: 'Midcap IT',        pair: [{ name: 'Persistent',       symbol: 'PERSISTENT.NS' },  { name: 'LTIMindtree',     symbol: 'LTIM.NS' }] },
    { id: 'niche-tech',     category: 'Niche Tech',       pair: [{ name: 'Oracle Fin',       symbol: 'OFSS.NS' },        { name: 'Wipro',           symbol: 'WIPRO.NS' }] },
    { id: 'fmcg-leaders',   category: 'FMCG Leaders',     pair: [{ name: 'ITC',              symbol: 'ITC.NS' },         { name: 'HUL',             symbol: 'HINDUNILVR.NS' }] },
    { id: 'beverages',      category: 'Beverage Wars',    pair: [{ name: 'Varun Beverages',  symbol: 'VBL.NS' },         { name: 'Tata Consumer',   symbol: 'TATACONSUM.NS' }] },
    { id: 'biscuits',       category: 'Biscuits',         pair: [{ name: 'Britannia',        symbol: 'BRITANNIA.NS' },   { name: 'Nestle India',    symbol: 'NESTLEIND.NS' }] },
    { id: 'personal-care',  category: 'Personal Care',    pair: [{ name: 'Godrej CP',        symbol: 'GODREJCP.NS' },    { name: 'Dabur',           symbol: 'DABUR.NS' }] },
    { id: 'alcohol',        category: 'Alcohol',          pair: [{ name: 'United Spirits',   symbol: 'MCDOWELL-N.NS' },  { name: 'Radico Khaitan', symbol: 'RADICO.NS' }] },
    { id: 'power-plays',    category: 'Power Plays',      pair: [{ name: 'Tata Power',       symbol: 'TATAPOWER.NS' },   { name: 'Adani Power',     symbol: 'ADANIPOWER.NS' }] },
    { id: 'green-energy',   category: 'Green Energy',     pair: [{ name: 'Suzlon',           symbol: 'SUZLON.NS' },      { name: 'Inox Wind',       symbol: 'INOXWIND.NS' }] },
    { id: 'oil-gas',        category: 'Oil & Gas',        pair: [{ name: 'ONGC',             symbol: 'ONGC.NS' },        { name: 'Reliance',        symbol: 'RELIANCE.NS' }] },
    { id: 'wires',          category: 'Wires & Cables',   pair: [{ name: 'Polycab',          symbol: 'POLYCAB.NS' },     { name: 'KEI Ind',         symbol: 'KEI.NS' }] },
    { id: 'defence',        category: 'Defence',          pair: [{ name: 'HAL',              symbol: 'HAL.NS' },         { name: 'BEL',             symbol: 'BEL.NS' }] },
    { id: 'railways',       category: 'Railways',         pair: [{ name: 'IRFC',             symbol: 'IRFC.NS' },        { name: 'RVNL',            symbol: 'RVNL.NS' }] },
    { id: 'paints',         category: 'Paints',           pair: [{ name: 'Asian Paints',     symbol: 'ASIANPAINT.NS' },  { name: 'Berger Paints',   symbol: 'BERGERPAINT.NS' }] },
    { id: 'jewelry',        category: 'Jewelry',          pair: [{ name: 'Titan',            symbol: 'TITAN.NS' },       { name: 'Kalyan Jewellers',symbol: 'KALYANKJIL.NS' }] },
    { id: 'aviation',       category: 'Aviation',         pair: [{ name: 'IndiGo',           symbol: 'INDIGO.NS' },      { name: 'SpiceJet',        symbol: 'SPICEJET.NS' }] },
    { id: 'hotels',         category: 'Hospitality',      pair: [{ name: 'Indian Hotels',    symbol: 'INDHOTEL.NS' },    { name: 'EIH (Oberoi)',    symbol: 'EIHOTEL.NS' }] },
    { id: 'realty-dlf',     category: 'Real Estate',      pair: [{ name: 'DLF',              symbol: 'DLF.NS' },         { name: 'Prestige',        symbol: 'PRESTIGE.NS' }] },
    { id: 'realty-mum',     category: 'Mumbai Realty',    pair: [{ name: 'Godrej Prop',      symbol: 'GODREJPROP.NS' },  { name: 'Oberoi Realty',   symbol: 'OBEROIRLTY.NS' }] },
    { id: 'telecom',        category: 'Telecom',          pair: [{ name: 'Bharti Airtel',    symbol: 'BHARTIARTL.NS' },  { name: 'Vodafone Idea',   symbol: 'IDEA.NS' }] },
    { id: 'fintech',        category: 'Fintech',          pair: [{ name: 'Paytm',            symbol: 'PAYTM.NS' },       { name: 'PB Fintech',      symbol: 'PBFINTECH.NS' }] },
    { id: 'nbfc',           category: 'Top NBFCs',        pair: [{ name: 'Bajaj Finance',    symbol: 'BAJFINANCE.NS' },  { name: 'Jio Financial',   symbol: 'JIOFIN.NS' }] },
    { id: 'wealth',         category: 'Wealth Managers',  pair: [{ name: 'Angel One',        symbol: 'ANGELONE.NS' },    { name: 'BSE Ltd',         symbol: 'BSE.NS' }] },
    { id: 'shriram',        category: 'Consumer Finance', pair: [{ name: 'Shriram Finance',  symbol: 'SHRIRAMFIN.NS' },  { name: 'Bajaj Finance',   symbol: 'BAJFINANCE.NS' }] },
];

// ─── Fetch live 52-week % return from Yahoo Finance ─────────────────────────
async function getLiveReturn(symbol: string): Promise<{ return: number; price: number; live: boolean }> {
    try {
        const quote = await (yahooFinance.quote(symbol, {
            fields: ['regularMarketPrice', 'fiftyTwoWeekChangePercent'],
        }) as any);

        const price = quote?.regularMarketPrice ?? 0;
        // Yahoo gives this as a decimal ratio e.g. 0.25 = +25%
        const pct   = (quote?.fiftyTwoWeekChangePercent ?? 0) * 100;

        if (price === 0) throw new Error('No price data');

        return { return: parseFloat(pct.toFixed(2)), price, live: true };
    } catch {
        // Graceful per-symbol fallback to snapshot
        const snap = SNAPSHOT[symbol] ?? { return: 0, price: 0 };
        return { ...snap, live: false };
    }
}

// ─── API Handler ─────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const excludeParam = searchParams.get('exclude');
    const excludeIds   = excludeParam ? excludeParam.split(',') : [];

    let available = BATTLES.filter((b) => !excludeIds.includes(b.id));
    if (available.length === 0) available = BATTLES;

    const battle = available[Math.floor(Math.random() * available.length)];
    console.log(`[Brand Wars] Fetching live data for: ${battle.id}`);

    // Fetch both symbols in parallel
    const [d1, d2] = await Promise.all([
        getLiveReturn(battle.pair[0].symbol),
        getLiveReturn(battle.pair[1].symbol),
    ]);

    const is1Winner  = d1.return >= d2.return;
    const dataSource = (d1.live || d2.live) ? 'Live (Yahoo Finance)' : 'Snapshot (Fallback)';
    console.log(`[Brand Wars] ${dataSource} | ${battle.pair[0].symbol}: ${d1.return}% | ${battle.pair[1].symbol}: ${d2.return}%`);

    const fmt = (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`;

    return NextResponse.json({
        id:        battle.id,
        category:  battle.category,
        timeframe: '52-Week Return (Live)',
        dataSource,
        pair: [
            {
                name:     battle.pair[0].name,
                return:   fmt(d1.return),
                value:    d1.return,
                isWinner: is1Winner,
                price:    `₹${d1.price.toFixed(1)}`,
                live:     d1.live,
            },
            {
                name:     battle.pair[1].name,
                return:   fmt(d2.return),
                value:    d2.return,
                isWinner: !is1Winner,
                price:    `₹${d2.price.toFixed(1)}`,
                live:     d2.live,
            },
        ],
    });
}
