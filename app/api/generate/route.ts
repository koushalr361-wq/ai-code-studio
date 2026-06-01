import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

// Force Edge runtime for high-velocity streaming response mechanics
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    // 1. Authenticate the active Clerk session context
    const { userId } = auth();
    if (!userId) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized session allocation." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2. Parse incoming prompt specifications from the dashboard console
    const { prompt, type } = await req.json();
    if (!prompt || !prompt.trim()) {
      return new NextResponse(JSON.stringify({ error: "Null prompt instruction vector." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 3. System Ororchesration System Prompt Matrix
    const systemPrompt = `
      You are the PromptArc Core Engine. You output strictly production-ready, raw standalone HTML code strings wrapped inside Tailwind CSS utility targets.
      Do NOT write markdown formatting, do NOT write markdown code blocks (\`\`\`html), and do NOT offer conversational text descriptions. 
      Synthesize a pristine application framework matching this explicit user query: "${prompt}" and deployment context: [${type?.toUpperCase()}].
    `;

    // 4. Dispatch payload execution directly to Anthropic's flagship model pipeline
    // Replacing this with your active proxy or direct API routing key credentials
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return new NextResponse(JSON.stringify({ error: "Upstream model pipeline allocation exception.", details: errorData }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const rawGeneratedCode = data.content[0]?.text || "";

    // 5. Return clean compiled operational string assets
    return new NextResponse(JSON.stringify({ code: rawGeneratedCode }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: "Internal generation gateway failure.", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
