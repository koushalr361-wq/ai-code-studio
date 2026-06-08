// app/api/generate/route.ts
import { NextResponse } from 'next/server';

// Helper function to pause execution (for backoff)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    const apiKey = process.env.GEMINI_API_KEY?.replace(/[^a-zA-Z0-9_-]/g, "");

    if (!apiKey) {
      return NextResponse.json({ error: "Server API key configuration missing." }, { status: 500 });
    }

    const systemInstruction = "You are an expert frontend developer. Return strictly raw, valid HTML and Tailwind CSS markup. Do not wrap the response in markdown backticks or block quotes.";

    const payload = {
      system_instruction: { parts: [{ text: systemInstruction }] },
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    };

    // THE FIX: The Fallback Matrix
    // If one model is busy, we cascade to the next.
    const modelsToTry = [
      "gemini-3.5-flash",
      "gemini-3.1-flash-lite", // Lighter model, less likely to be congested
      "gemini-3.1-pro"         // Premium model, used as a final fallback
    ];

    for (let i = 0; i < modelsToTry.length; i++) {
      const currentModel = modelsToTry[i];
      const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${apiKey}`;

      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // 1. If successful, return the data immediately!
      if (response.ok) {
        const generatedText = data.candidates[0].content.parts[0].text;
        return NextResponse.json({ text: generatedText });
      }

      // 2. If we get a 503 (High Demand) and we still have models left to try
      if (response.status === 503) {
        console.warn(`Model ${currentModel} is busy (503). Retrying...`);
        
        // If it's the last model in our array, we must break and throw the error
        if (i === modelsToTry.length - 1) {
           return NextResponse.json({ error: "All AI models are currently overloaded. Please try again in a few minutes." }, { status: 503 });
        }
        
        // Wait 2 seconds before firing the fetch request to the next backup model
        await delay(2000);
        continue;
      }
      
      // 3. If it's a different error (like 400 Bad Request), don't retry, just throw it
      console.error(`Gemini API Error with ${currentModel}:`, data);
      return NextResponse.json({ error: data.error?.message || "Failed to generate content" }, { status: response.status });
    }

  } catch (error) {
    console.error("Generation API Catch Error:", error);
    return NextResponse.json({ error: "Internal Server Error during generation." }, { status: 500 });
  }
}
