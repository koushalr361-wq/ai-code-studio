"use client";

import React, { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function GenerateWorkspace() {
  const { user } = useUser();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);
  const [generatedHtmlText, setGeneratedHtmlText] = useState<string | null>(null);
  
  // Simulated SaaS states - set this to true if a user pays!
  const [isSubscribed, setIsSubscribed] = useState(false); 
  const [copyStatus, setCopyStatus] = useState("Copy Code");

  const handleGenerateApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedHtmlText(null);
    // Updated initial branding log text
    setGenerationLogs(["🤖 Analyzing user request layout rules..."]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      // Updated Step 2 log text matching the PromptArc identity
      setGenerationLogs((prev) => [...prev, "⚡ Mapping prompt arc parameters into sandbox grid layers..."]);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation engine hit a structural exception.");
      }

      setGenerationLogs((prev) => [...prev, "🎨 Compiling custom dark-mode Tailwind CSS layout properties..."]);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setGenerationLogs((prev) => [...prev, "🚀 Injecting sandboxed runtime environment parameters..."]);

      let rawCode = data.code || "";
      if (rawCode.includes("```")) {
        rawCode = rawCode.replace(/```html/gi, "").replace(/```/g, "").trim();
      }

      if (!rawCode) {
        throw new Error("The AI backend returned an empty response string.");
      }

      const completeHtmlCode = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)"></script>
          <style>
            body { background-color: #030303; color: #ffffff; margin: 0; padding: 24px; font-family: system-ui, sans-serif; }
            ::-webkit-scrollbar { display: none; }
          </style>
        </head>
        <body>
          ${rawCode}
        </body>
        </html>
      `;

      setGenerationLogs((prev) => [...prev, "✔ Deployment fully successful! App is live in production frame."]);
      setGeneratedHtmlText(completeHtmlCode);

    } catch (error: any) {
      console.error("Workspace Engine Error:", error);
      setGenerationLogs((prev) => [...prev, `❌ Error: ${error.message || "Connection timed out."}`]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Raw clipboard logic engine
  const handleCopyCode = () => {
    if (!generatedHtmlText) return;
    navigator.clipboard.writeText(generatedHtmlText);
    setCopyStatus("Copied! ✓");
    setTimeout(() => setCopyStatus("Copy Code"), 2000);
  };

  return (
    <div style={{
      backgroundColor: "#030303",
      color: "#ffffff",
      minHeight: "100vh",
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      display: "flex",
      flexDirection: "column"
    }}>
      
      {/* --- WORKSPACE HEADER PANEL --- */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        backgroundColor: "#09090b"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link href="/" style={{ textDecoration: "none", fontWeight: 800, fontSize: "16px", color: "#ffffff", letterSpacing: "-0.5px" }}>
            PROMPTARC
          </Link>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "14px" }}>/</span>
          <span style={{ fontSize: "13px", fontWeight: 500, color: "#94a3b8" }}>Application Studio</span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "13px", color: "#64748b" }}>
            Account: <strong style={{ color: "#e2e8f0" }}>{user?.firstName || "Developer"}</strong>
          </span>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* --- WORKSPACE SPLIT COMPONENT LAYOUT --- */}
      <main style={{ flex: 1, display: "flex", height: "calc(100vh - 65px)", overflow: "hidden" }}>
        
        {/* LEFT WORKSPACE: Control Terminal Input Sheet */}
        <div style={{
          width: "420px",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
          backgroundColor: "#060608"
        }}>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>Application Generator</h2>
            <p style={{ color: "#71717a", fontSize: "13px", margin: 0, lineHeight: "1.5" }}>
              Input your structured design requirements. Our automated engine will instantly provision code configurations and push them live.
            </p>
          </div>

          <form onSubmit={handleGenerateApp} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <label style={{ fontSize: "11px", fontWeight: 600, color: "#a1a1aa", letterSpacing: "1px", textTransform: "uppercase" }}>Prompt Specifications</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Build a modern real estate dashboard with a dark-theme aesthetic, live status cards, filter settings, and custom analytics graphs..."
              disabled={isGenerating}
              style={{
                backgroundColor: "#09090b",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "16px",
                color: "#ffffff",
                fontSize: "14px",
                fontFamily: "inherit",
                resize: "none",
                height: "140px",
                outline: "none",
                lineHeight: "1.5"
              }}
            />
            <button
              type="submit"
              disabled={isGenerating || !prompt}
              style={{
                backgroundColor: isGenerating || !prompt ? "rgba(255,255,255,0.02)" : "#ffffff",
                color: isGenerating || !prompt ? "#71717a" : "#000000",
                border: isGenerating || !prompt ? "1px solid rgba(255,255,255,0.05)" : "none",
                borderRadius: "10px",
                padding: "14px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: isGenerating || !prompt ? "not-allowed" : "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {isGenerating ? "Compiling App Matrix..." : "Generate Web App ⚡"}
            </button>
          </form>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#a1a1aa", letterSpacing: "1px", textTransform: "uppercase" }}>System Compilation Logs</span>
            <div style={{
              flex: 1,
              backgroundColor: "#000000",
              border: "1px solid rgba(255, 255, 255, 0.04)",
              borderRadius: "12px",
              padding: "16px",
              fontFamily: "monospace",
              fontSize: "12px",
              color: "#38bdf8",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            }}>
              {generationLogs.length === 0 && (
                <span style={{ color: "#4b5563", fontStyle: "italic" }}>System waiting for execution prompt configuration...</span>
              )}
              {generationLogs.map((log, index) => (
                <div key={index}>{log}</div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT WORKSPACE: Automated Live Application Framer Window */}
        <div style={{ flex: 1, backgroundColor: "#0b0b0f", padding: "32px", display: "flex", flexDirection: "column", gap: "16px", position: "relative" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: generatedHtmlText ? "#22c55e" : "#eab308" }} />
              <span style={{ fontSize: "13px", fontWeight: 500, color: "#a1a1aa" }}>
                {generatedHtmlText ? "Live Application Sandbox Framework" : "Awaiting Output Compilation Sequence"}
              </span>
            </div>

            {/* --- ACTION BAR BARRIER STYLES --- */}
            {generatedHtmlText && (
              <div style={{ display: "flex", gap: "10px", position: "relative", zIndex: 10 }}>
                <button
                  onClick={handleCopyCode}
                  disabled={!isSubscribed}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: isSubscribed ? "#e2e8f0" : "#52525b",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 500,
                    cursor: isSubscribed ? "pointer" : "not-allowed"
                  }}
                >
                  {copyStatus}
                </button>
                <button
                  disabled={!isSubscribed}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: isSubscribed ? "#e2e8f0" : "#52525b",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 500,
                    cursor: isSubscribed ? "pointer" : "not-allowed"
                  }}
                >
                  Export to GitHub 🐙
                </button>
              </div>
            )}
          </div>

          {/* APPLICATION MAIN DISPLAY PREVIEW BOX CONTAINER */}
          <div style={{
            flex: 1,
            backgroundColor: "#030303",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            position: "relative"
          }}>
            {generatedHtmlText ? (
              <>
                <iframe
                  srcDoc={generatedHtmlText}
                  title="Generated Application Preview"
                  style={{ width: "100%", height: "100%", border: "none" }}
                />

                {/* --- INTERACTIVE SLEEK GLASSMORPHIC PAYWALL BLUR GATE --- */}
                {!isSubscribed && (
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(3, 3, 3, 0.4)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 20
                  }}>
                    <div style={{
                      backgroundColor: "#09090b",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "16px",
                      padding: "32px",
                      maxWidth: "380px",
                      textAlign: "center",
                      boxShadow: "0 30px 60px rgba(0,0,0,0.8)"
                    }}>
                      <div style={{ fontSize: "32px", marginBottom: "16px" }}>🔒</div>
                      <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 8px 0", letterSpacing: "-0.3px" }}>
                        Unlock Your Application Assets
                      </h3>
                      <p style={{ color: "#a1a1aa", fontSize: "13px", lineHeight: "1.5", margin: "0 0 24px 0" }}>
                        Your fully responsive layout has successfully compiled! Upgrade to PromptArc premium to export directly to GitHub and snap the source code.
                      </p>
                      <button
                        onClick={() => setIsSubscribed(true)} // Clicking hooks up a test pass upgrade!
                        style={{
                          backgroundColor: "#ffffff",
                          color: "#000000",
                          border: "none",
                          borderRadius: "8px",
                          width: "100%",
                          padding: "12px 16px",
                          fontSize: "14px",
                          fontWeight: 600,
                          cursor: "pointer"
                          }}
                        >
                          Upgrade to Premium ⚡
                        </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div style={{ textAlign: "center", maxWidth: "320px" }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{isGenerating ? "⚙️" : "🖥️"}</div>
                <h4 style={{ fontSize: "14px", fontWeight: 600, margin: "0 0 6px 0" }}>
                  {isGenerating ? "Assembling Code Structures" : "Sandbox Matrix Completely Empty"}
                </h4>
                <p style={{ color: "#71717a", fontSize: "12px", margin: 0, lineHeight: "1.5" }}>
                  {isGenerating ? "The AI generator is compiling files and provisioning assets on the cloud network layout." : "Your target live application view screen mounts programmatically immediately following generation sequence confirmation."}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
