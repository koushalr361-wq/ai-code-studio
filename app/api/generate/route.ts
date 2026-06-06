import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // 1. THE MAGIC BULLET: This grabs your keys and aggressively destroys ANY hidden spaces, quotes, or newlines.
    const rawKeys = [
      process.env.GEMINI_API_KEY,
      process.env.GEMINI_API_KEY_SECONDARY, 
    ];

    const cleanKeys = rawKeys
      .filter((key) => typeof key === "string" && key.length > 0)
      .map((key) => key!.replace(/[^a-zA-Z0-9_-]/g, '')); // Strips EVERYTHING except valid API key characters

    if (cleanKeys.length === 0 || cleanKeys[0] === "") {
      return NextResponse.json({ error: "No valid Gemini API keys found on the server." }, { status: 500 });
    }

    const randomIndex = Math.floor(Math.random() * cleanKeys.length);
    const activeApiKey = cleanKeys[randomIndex];

    // 2. Exact stable endpoint for Gemini 1.5 Flash
    const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeApiKey}`;

    // 3. Fire the request
    const response = await fetch(targetUrl, {
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
    });

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
    console.error("System Core Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
