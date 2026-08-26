import { NextResponse } from 'next/server';

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
      // THE FIX 1: Gemini REST API requires camelCase systemInstruction
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    };

    const modelsToTry = [
      "gemini-3.5-flash",
      "gemini-3.1-flash-lite", 
      "gemini-3.1-pro"         
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

      if (response.ok) {
        // THE FIX 2: Added optional chaining in case Google's safety filters wipe the text
        let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!rawText) {
          throw new Error("Gemini returned an empty response. It may have triggered a safety block.");
        }

        let cleanHtml = rawText
          .replace(/```html/gi, "") 
          .replace(/```/gi, "")     
          .trim();

        if (!cleanHtml.includes("cdn.tailwindcss.com")) {
          cleanHtml = `<script src="https://cdn.tailwindcss.com"></script>\n${cleanHtml}`;
        }

        // THE FIX 3: Returning BOTH keys guarantees your frontend will catch the data
        return NextResponse.json({ code: cleanHtml, text: cleanHtml });
      }

      if (response.status === 503) {
        console.warn(`Model ${currentModel} is busy (503). Retrying...`);
        if (i === modelsToTry.length - 1) {
           return NextResponse.json({ error: "All AI models are currently overloaded. Please try again in a few minutes." }, { status: 503 });
        }
        await delay(2000);
        continue;
      }
      
      console.error(`Gemini API Error with ${currentModel}:`, data);
      return NextResponse.json({ error: data.error?.message || "Failed to generate content" }, { status: response.status });
    }

  } catch (error: any) {
    console.error("Generation API Catch Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error during generation." }, { status: 500 });
  }
}
