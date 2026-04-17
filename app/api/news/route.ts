import { NextResponse } from 'next/server';
import { fetchLiveNews } from "@/lib/news";

// Force dynamic execution of this route
export const dynamic = 'force-dynamic';

export async function GET() {
    const news = await fetchLiveNews();

    return NextResponse.json({
        news: news
    });
}
