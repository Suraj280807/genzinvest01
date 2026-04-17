import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const term = searchParams.get("term");

    if (!term) {
        return NextResponse.json({ explanation: "Bruh, you didn't highlight anything." });
    }

    try {
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            throw new Error("GROQ_API_KEY is not set in environment variables.");
        }

        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama3-8b-8192", // Fast model for quick lookups
                messages: [
                    {
                        role: "system",
                        content:
                            'You are a dictionary for GenZ. Explain the provided financial term in exactly 2 clear, punchy, GenZ-friendly sentences. Use emojis. Avoid boring jargon.'
                    },
                    { role: "user", content: `What is: ${term}` },
                ],
                max_tokens: 100,
                temperature: 0.7,
            }),
        });

        if (!groqRes.ok) {
            throw new Error(`Groq API error ${groqRes.status}`);
        }

        const completion = await groqRes.json();
        const explanation: string = completion.choices[0].message.content;

        return NextResponse.json({ explanation });

    } catch (error: any) {
        console.error("Explain API Error:", error.message);
        
        let fallback = "It's literally money magic, don't worry about it too much right now. 💸✨";
        if (term.toLowerCase() === "nav") fallback = "NAV is basically the price tag of one unit of a mutual fund. Buy low, hold forever. 📈";
        if (term.toLowerCase().includes("bull")) fallback = "Bull market means stocks are going up and vibes are immaculate. 🐂🚀";
        
        return NextResponse.json({ explanation: fallback });
    }
}
