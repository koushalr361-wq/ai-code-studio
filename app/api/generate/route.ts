import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // 1. SET UP AN API KEY POOL FOR ROTATION
    const keyPool = [
      process.env.GEMINI_API_KEY,
      process.env.GEMINI_API_KEY_SECONDARY, // Your secondary backup key
    ].filter(Boolean); // Clears out any keys that aren't configured yet

    if (keyPool.length === 0) {
      return NextResponse.json({ error: "No Gemini API keys found on the server" }, { status: 500 });
    }

    // 2. INTELLIGENT ROTATION: Pick a random key out of the pool for this specific user request
    const randomIndex = Math.floor(Math.random() * keyPool.length);
    const activeApiKey = keyPool[randomIndex];

    // 3. TARGET THE ULTRA-FAST, HIGH-VOLUME INFRASTRUCTURE MODEL (gemini-3.1-flash-lite)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-3.1-flash-lite:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": activeApiKey!,
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
            temperature: 0.2, // Slightly lowered for faster, more deterministic generation speeds
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
  } catch (error) {
    console.error("Multi-User Distribution Routing Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
