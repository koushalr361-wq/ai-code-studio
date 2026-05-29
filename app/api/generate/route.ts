import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key missing on server" }, { status: 500 });
    }

    // Call Google's Gemini API with explicit Google-authorized headers
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey, // CRITICAL: Tells Google's mesh network to accept the key token
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an expert full-stack AI developer. Generate a complete, beautifully styled HTML web component layout based on this specification: "${prompt}". Use Tailwind CSS via CDN for rich modern styling. Return ONLY the raw code elements. Do not include markdown code block backticks (\`\`\`) or any conversation description.`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 4000,
            temperature: 0.3,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "Failed to fetch from Gemini" },
        { status: response.status }
      );
    }

    // Extract the text response containing our generated layout code
    const generatedCode = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedCode) {
      return NextResponse.json({ error: "No code text returned from AI engine" }, { status: 500 });
    }

    return NextResponse.json({ code: generatedCode });
  } catch (error) {
    console.error("Generation Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
