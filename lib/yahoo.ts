import YahooFinance from 'yahoo-finance2';

const yf = new YahooFinance();

export async function fetchStockQuote(symbol: string) {
    return yf.quote(symbol);
}
