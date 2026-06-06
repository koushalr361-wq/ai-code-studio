import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // 1. THE FIX: .trim() completely destroys any hidden spaces or newlines from Vercel
    const keyPool = [
      process.env.GEMINI_API_KEY?.trim(),
      process.env.GEMINI_API_KEY_SECONDARY?.trim(), 
    ].filter(Boolean); 

    if (keyPool.length === 0) {
      return NextResponse.json({ error: "No Gemini API keys found on the server" }, { status: 500 });
    }

    const randomIndex = Math.floor(Math.random() * keyPool.length);
    const activeApiKey = keyPool[randomIndex];

    // 2. THE FIX: Attach the key directly to the URL instead of the Headers
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an expert full-stack AI developer. Generate a complete, beautifully styled HTML web component layout based on this specification: "${prompt}". Use Tailwind CSS via CDN for rich modern styling. Return ONLY the raw code elements. Do not include markdown code block backticks (\`\`\`) or any conversational text.`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 8000,
            temperature: 0.2, 
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "The cluster limits are full. Try again." },
        { status: response.status }
      );
    }

    const generatedCode = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedCode) {
      return NextResponse.json({ error: "No code text returned from AI engine" }, { status: 500 });
    }

    return NextResponse.json({ code: generatedCode });
  } catch (error: any) {
    console.error("Multi-User Distribution Routing Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
