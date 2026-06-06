import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // 1. THIS IS THE MAGIC: It strips the invisible newlines from Vercel
    const rawKeys = [
      process.env.GEMINI_API_KEY,
      process.env.GEMINI_API_KEY_SECONDARY, 
    ];

    const cleanKeys = rawKeys
      .filter((key) => typeof key === "string" && key.trim().length > 0)
      .map((key) => key!.replace(/[\r\n\s]+/g, '')); // Destroys spaces and newlines

    if (cleanKeys.length === 0) {
      return NextResponse.json({ error: "No valid Gemini API keys found on the server" }, { status: 500 });
    }

    const activeApiKey = cleanKeys[Math.floor(Math.random() * cleanKeys.length)];

    // 2. We put the key in the URL, bypassing the Next.js header crash entirely
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
        { error: data.error?.message || "Google API rejected the request." },
        { status: response.status }
      );
    }

    const generatedCode = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedCode) {
      return NextResponse.json({ error: "No code text returned from AI engine" }, { status: 500 });
    }

    return NextResponse.json({ code: generatedCode });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
