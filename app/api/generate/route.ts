// app/api/generate/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body; // Your frontend prompt payload

    // 1. Secure & Clean the API Key (Prevents Vercel header crashes)
    const apiKey = process.env.GEMINI_API_KEY?.replace(/[^a-zA-Z0-9_-]/g, "");

    if (!apiKey) {
      return NextResponse.json({ error: "Server API key configuration missing." }, { status: 500 });
    }

    // 2. THE FIX: Point to the current 2026 Model Registry
    // Update targetUrl to use gemini-3.5-flash instead of 1.5-pro
    const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;

    // 3. System Instructions for the AI
    const systemInstruction = "You are an expert frontend developer. Return strictly raw, valid HTML and Tailwind CSS markup. Do not wrap the response in markdown backticks or block quotes.";

    // 4. Construct the Payload
    const payload = {
      system_instruction: {
        parts: [{ text: systemInstruction }]
      },
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      // Optional: You can add generationConfig here if you want to control temperature
    };

    // 5. Execute the Fetch Request
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      return NextResponse.json({ error: data.error?.message || "Failed to generate content" }, { status: response.status });
    }

    // 6. Extract the clean text response
    const generatedText = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ text: generatedText });

  } catch (error) {
    console.error("Generation API Catch Error:", error);
    return NextResponse.json({ error: "Internal Server Error during generation." }, { status: 500 });
  }
}
