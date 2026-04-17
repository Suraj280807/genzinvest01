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
                model: "llama3-8b-8192", // Using 8b as it is faster and often more reliable for simple tasks
                messages: [
                    {
                        role: "system",
                        content:
                            'You are "Tax Scholar" 👨‍⚕️ — a brilliant Indian Tax Expert. ' +
                            "Help GenZ Indians understand Income Tax (FY 2024-25). " +
                            "Explain Section 80C, 80D, Old vs New Regime, HRA, and TDS clearly. " +
                            "Vibe: informative, uses emojis, no boring legalese. " +
                            "Keep answers under 150 words. Remind users it is educational advice only.",
                    },
                    ...historyMessages,
                    { role: "user", content: message },
                ],
                max_tokens: 500,
                temperature: 0.6,
            }),
        });

        if (!groqRes.ok) {
            const errBody = await groqRes.text();
            console.error(`Groq API error ${groqRes.status}: ${errBody}`);
            // If API fails, use a semi-intelligent local fallback based on keywords
            return NextResponse.json({ text: getTaxFallback(message) });
        }

        const completion = await groqRes.json();
        const text: string = completion.choices[0].message.content;

        return NextResponse.json({ text });

    } catch (error: any) {
        console.error("Tax Chat API Error:", error.message);
        return NextResponse.json({ text: getTaxFallback(message) });
    }
}

function getTaxFallback(query: string): string {
    const q = query.toLowerCase();
    if (q.includes("80c")) return "🤖 **Tax Tip**: Section 80C lets you deduct up to ₹1.5 Lakh from your taxable income! Invest in ELSS, PPF, or LIC to save. 💸";
    if (q.includes("regime")) return "🤖 **Tax Tip**: The New Regime is simpler but has no deductions. The Old Regime is better if you have high investments (LIC, Rent, Loans). Check our Old vs New calculator soon! ⚖️";
    if (q.includes("80d") || q.includes("health")) return "🤖 **Tax Tip**: Section 80D covers health insurance premiums. You can save up to ₹25,000 for yourself and extra for parents! 🏥";
    
    return "🤖 **System Message**: My tax analyzer is momentarily busy calculating deductions. 🧾 Try asking specifically about **80C**, **80D**, or **Old vs New Regime**!";
}
