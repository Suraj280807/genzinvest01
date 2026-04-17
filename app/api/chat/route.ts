import { NextResponse } from "next/server";

export async function POST(req: Request) {
    let message = "";
    try {
        const body = await req.json();
        message = body.message;
        const history: { role: string; parts: { text: string }[] }[] = body.history ?? [];

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            throw new Error("GROQ_API_KEY is not set in environment variables.");
        }

        // Build conversation history in OpenAI-compatible format for Groq
        const historyMessages = history.map((msg) => ({
            role: msg.role === "user" ? "user" : "assistant",
            content: msg.parts[0].text,
        }));

        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama3-70b-8192",
                messages: [
                    {
                        role: "system",
                        content:
                            'You are "GenZ Bot" 🤖 — a super-smart, witty, and helpful financial advisor for GenZ Indians. ' +
                            "Your vibe is: informative but chill, uses emojis, avoids heavy jargon. " +
                            "Answer in short, punchy paragraphs. Keep it under 200 words.",
                    },
                    ...historyMessages,
                    { role: "user", content: message },
                ],
                max_tokens: 400,
                temperature: 0.7,
            }),
        });

        if (!groqRes.ok) {
            const errBody = await groqRes.text();
            throw new Error(`Groq API error ${groqRes.status}: ${errBody}`);
        }

        const completion = await groqRes.json();
        const text: string = completion.choices[0].message.content;

        // Return identical shape { text } — frontend requires no changes
        return NextResponse.json({ text });

    } catch (error: any) {
        console.error("Chat API Error:", error.message);

        // Preserve existing fallback system so the bot always responds
        const fallback = getFallbackResponse(message || "");
        return NextResponse.json({ text: fallback });
    }
}

// Local Knowledge Base — unchanged fallback for when Groq is unreachable
function getFallbackResponse(query: string): string {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("sip")) {
        return "🤖 **Auto-Reply**: SIP (Systematic Investment Plan) is like a gym membership for your money! 🏋️‍♂️ You invest a fixed amount (e.g., ₹500) every month. It averages out market highs/lows (Rupee Cost Averaging) and is the BEST way to start wealth creation. 💸";
    }
    if (lowerQuery.includes("crypto") || lowerQuery.includes("bitcoin")) {
        return "🤖 **Auto-Reply**: Crypto is the Wild West! 🤠 High risk, high reward. It's digital currency on the blockchain. \n\n**Rule #1:** Only invest what you can afford to lose. \n**Rule #2:** Not your keys, not your coins!";
    }
    if (lowerQuery.includes("stock") || lowerQuery.includes("share") || lowerQuery.includes("market")) {
        return "🤖 **Auto-Reply**: Stocks = Ownership. Buying a share means you own a tiny piece of a company (like Tata or Reliance). 🏢 Over the long run, stocks beat inflation, but they are volatile daily. Don't panic if they dip!";
    }
    if (lowerQuery.includes("mutual fund") || lowerQuery.includes("fund")) {
        return "🤖 **Auto-Reply**: Mutual Funds are like a potluck. 🍲 Many investors pool money, and a pro manager picks the best dishes (stocks) for everyone. It's safer and easier than picking individual stocks.";
    }
    if (lowerQuery.includes("fd") || lowerQuery.includes("deposit")) {
        return "🤖 **Auto-Reply**: FDs are safe but boring. 😴 They barely beat inflation (~6-7%). Use them for emergency funds, NOT for growing wealth.";
    }
    if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("hey")) {
        return "Yo! 👋 I'm **GenZ Bot**. Ask me about **SIP**, **Stocks**, **Crypto**, or **Mutual Funds** and I'll tell you what's up!";
    }

    return "🤖 **System Message**: My AI brain hit a snag. Try asking me specifically about: **SIP**, **Stocks**, **Crypto**, or **Mutual Funds**. I have those cached locally! 💾";
}
