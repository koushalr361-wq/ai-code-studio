"use client";

import React, { useState } from "react";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";

export default function PromptArcPremiumSuite() {
  const { user, isSignedIn } = useUser();
  const [viewMode, setViewMode] = useState<"landing" | "studio">("landing");
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Studio Core Infrastructure States
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);
  const [generatedHtmlText, setGeneratedHtmlText] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false); 
  const [copyStatus, setCopyStatus] = useState("Copy Code");

  // Handles the high-class viewport perspective transition overlay
  const handleLaunchStudio = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setViewMode("studio");
      setIsTransitioning(false);
    }, 450);
  };

  const handleGenerateApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedHtmlText(null);
    setGenerationLogs(["[SYSTEM] Executing structural context parsing algorithms..."]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setGenerationLogs((prev) => [...prev, "[ROUTER] Mapping prompt arc parameters into sandbox grid layers..."]);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Generation engine execution exception.");

      setGenerationLogs((prev) => [...prev, "[COMPILER] Structuring dark-mode Tailwind CSS distribution hooks..."]);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setGenerationLogs((prev) => [...prev, "[RUNTIME] Mounting dynamic environment preview frames..."]);

      let rawCode = data.code || "";
      if (rawCode.includes("```")) {
        rawCode = rawCode.replace(/```html/gi, "").replace(/```/g, "").trim();
      }

      const completeHtmlCode = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)"></script>
          <style>
            body { background-color: #030303; color: #ffffff; margin: 0; padding: 24px; font-family: system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
            ::-webkit-scrollbar { display: none; }
          </style>
        </head>
        <body>
          ${rawCode}
        </body>
        </html>
      `;

      setGenerationLogs((prev) => [...prev, "SUCCESS: Sandbox system fully synchronized. Target layer is live."]);
      setGeneratedHtmlText(completeHtmlCode);

    } catch (error: any) {
      setGenerationLogs((prev) => [...prev, `CRITICAL ERROR: ${error.message || "Connection failure."}`]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = () => {
    if (!generatedHtmlText) return;
    navigator.clipboard.writeText(generatedHtmlText);
    setCopyStatus("Copied Asset ✓");
    setTimeout(() => setCopyStatus("Copy Code"), 2000);
  };

  return (
    <div style={{
      backgroundColor: "#030307",
      color: "#ffffff",
      minHeight: "100vh",
      fontFamily: '"Plus Jakarta Sans", "Geist Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      
      {/* Font Imports, Core Animations, Glass Cards & Global Typography Optimization */}
      <style>{`
        @import url('[https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap](https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap)');
        
        @keyframes studioPopIn {
          0% { opacity: 0; transform: scale(0.97) translateY(24px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-studio-entry {
          animation: studioPopIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .premium-bg-glow {
          position: absolute;
          top: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: 1000px;
          height: 600px;
          background: radial-gradient(circle at center, rgba(99, 102, 241, 0.07) 0%, rgba(168, 85, 247, 0.04) 40%, rgba(56, 189, 248, 0.01) 70%, transparent 100%);
          filter: blur(60px);
          pointer-events: none;
          z-index: 1;
        }
        .glass-card-container {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          border: 1px solid rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .active-cyan-highlight {
          border: 1px solid rgba(56, 189, 248, 0.4) !important;
          box-shadow: 0 0 40px rgba(56, 189, 248, 0.08), inset 0 0 16px rgba(56, 189, 248, 0.03);
        }
        .glass-card-container:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.08);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
        }
        .visual-abstract-wireframe {
          height: 110px;
          width: 100%;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px dashed rgba(255, 255, 255, 0.04);
          display: flex;
          align-items: center;
          justifyContent: center;
          position: relative;
          overflow: hidden;
        }
      `}</style>

      {/* --- VIEW 1: LANDING ENTRY EXPERIENCE --- */}
      {viewMode === "landing" && (
        <div style={{
          flex: 1, display: "flex", flexDirection: "column", position: "relative",
          opacity: isTransitioning ? 0 : 1, transform: isTransitioning ? "translateY(-12px)" : "translateY(0)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
        }}>
          <div className="premium-bg-glow" />

          {/* Navigation Bar Header */}
          <header style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "32px 64px", zIndex: 10
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 800, fontSize: "16px", letterSpacing: "-0.8px" }}>
              PROMPTARC
            </div>
            <div>
              {isSignedIn ? (
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 500 }}>Developer Account: <strong style={{ color: "#ffffff", fontWeight: 600 }}>{user?.firstName}</strong></span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <SignInButton mode="modal">
                  <button style={{
                    backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    color: "#ffffff", padding: "8px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit"
                  }}>Sign In</button>
                </SignInButton>
              )}
            </div>
          </header>

          {/* Hero Identity Center Frame */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 24px", zIndex: 2, marginTop: "20px" }}>
            
            <h1 style={{
              fontSize: "68px", fontWeight: 800, letterSpacing: "-3.5px", margin: "0 0 20px 0", textAlign: "center",
              background: "linear-gradient(to bottom, #ffffff 40%, #71717a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              lineHeight: 0.95
            }}>
              PROMPTARC
            </h1>

            <p style={{ fontSize: "15px", color: "#94a3b8", lineHeight: "1.6", margin: "0 0 40px 0", textAlign: "center", maxWidth: "600px", fontWeight: 400, letterSpacing: "-0.1px" }}>
              Auto-generates clean HTML/Tailwind from text, mates with development, building expine, and ribeotvised action actions into a proper, premium startup-grade platform.
            </p>

            <div style={{ marginBottom: "80px" }}>
              <button onClick={handleLaunchStudio} style={{
                backgroundColor: "#ffffff", color: "#000000", padding: "14px 34px", borderRadius: "8px",
                fontSize: "14px", fontWeight: 600, cursor: "pointer", border: "none", boxShadow: "0 4px 30px rgba(255,255,255,0.15)", fontFamily: "inherit", letterSpacing: "-0.2px"
              }}>
                Launch Application Studio
              </button>
            </div>

            {/* --- THREE MAIN GLASS LABELS MAPPED DIRECTLY FROM DESIGN ARCHITECTURES --- */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", width: "100%", maxWidth: "1100px", paddingBottom: "40px" }}>
              
              {/* Box 1: Active Highlight State Frame */}
              <div className="glass-card-container active-cyan-highlight" style={{ borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className="visual-abstract-wireframe">
                  <div style={{ position: "absolute", width: "45px", height: "45px", borderRadius: "8px", border: "2px solid #38bdf8", boxShadow: "0 0 20px rgba(56,189,248,0.2)" }} />
                  <div style={{ position: "absolute", width: "80px", height: "1px", background: "linear-gradient(90deg, transparent, #38bdf8, transparent)" }} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>AI Prompt Engine</div>
                  <h3 style={{ fontSize: "19px", fontWeight: 700, margin: "0 0 8px 0", letterSpacing: "-0.4px" }}>Instant Compilation</h3>
                  <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0, lineHeight: "1.6", fontWeight: 400 }}>Auto-generates clean within/Tailwind from text. Responsive design, Ready-to-deploy logic.</p>
                </div>
              </div>

              {/* Box 2 */}
              <div className="glass-card-container" style={{ borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className="visual-abstract-wireframe" style={{ flexDirection: "column", gap: "6px", padding: "20px" }}>
                  <div style={{ width: "30%", height: "4px", background: "rgba(255,255,255,0.12)", borderRadius: "2px", alignSelf: "flex-start" }} />
                  <div style={{ width: "90%", height: "4px", background: "rgba(255,255,255,0.03)", borderRadius: "2px" }} />
                  <div style={{ width: "70%", height: "4px", background: "rgba(255,255,255,0.03)", borderRadius: "2px" }} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>Visualization Sandbox</div>
                  <h3 style={{ fontSize: "19px", fontWeight: 700, margin: "0 0 8px 0", letterSpacing: "-0.4px" }}>Real-Time Previews</h3>
                  <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0, lineHeight: "1.6", fontWeight: 400 }}>See your creation instantly within a secure canvas. Interactive state, Mock data injection.</p>
                </div>
              </div>

              {/* Box 3 */}
              <div className="glass-card-container" style={{ borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className="visual-abstract-wireframe">
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#a855f7", boxShadow: "0 0 12px #a855f7" }} />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>DevOps Integration</div>
                  <h3 style={{ fontSize: "19px", fontWeight: 700, margin: "0 0 8px 0", letterSpacing: "-0.4px" }}>One-Click Deploy</h3>
                  <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0, lineHeight: "1.6", fontWeight: 400 }}>Push directly to GitHub repos and launch live links. Clerk auth, Production hosting config.</p>
                </div>
              </div>

            </div>
          </div>

          <footer style={{ textAlign: "center", padding: "24px 0", fontSize: "11px", color: "#3f3f46", letterSpacing: "0.5px", fontWeight: 500 }}>
            © 2026 PROMPTARC CORE PLATFORM OPERATIONS SECURED.
          </footer>
        </div>
      )}

      {/* --- VIEW 2: PRODUCTION-GRADE WORKSPACE STUDIO --- */}
      {viewMode === "studio" && (
        <div className="animate-studio-entry" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          
          {/* Studio Navigation Bar Header */}
          <header style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "16px 32px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", backgroundColor: "#09090b", zIndex: 10
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <div onClick={() => setViewMode("landing")} style={{ fontWeight: 800, fontSize: "16px", color: "#ffffff", letterSpacing: "-0.8px", cursor: "pointer" }}>
                PROMPTARC
              </div>
              <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "14px" }}>/</span>
              <span style={{ fontSize: "13px", fontWeight: 500, color: "#94a3b8", letterSpacing: "-0.1px" }}>Application Studio</span>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>
                Account: <strong style={{ color: "#e2e8f0", fontWeight: 600 }}>{user?.firstName || "Developer"}</strong>
              </span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </header>

          {/* Operational Area Division Layout */}
          <main style={{ flex: 1, display: "flex", height: "calc(100vh - 65px)", overflow: "hidden" }}>
            
            {/* Control Panel Parameters Input Sheet (Left Side) */}
            <div style={{
              width: "420px", borderRight: "1px solid rgba(255, 255, 255, 0.05)",
              padding: "32px", display: "flex", flexDirection: "column", gap: "28px", backgroundColor: "#060608"
            }}>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>Application Generator</h2>
                <p style={{ color: "#71717a", fontSize: "13px", margin: 0, lineHeight: "1.5", fontWeight: 400 }}>
                  Declare deployment specifications. Our automation pipeline compiles the visual interface assets inside the sandboxed viewport.
                </p>
              </div>

              <form onSubmit={handleGenerateApp} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#a1a1aa", letterSpacing: "1px", textTransform: "uppercase" }}>Prompt Specifications</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Build a modern real estate dashboard with a dark-theme aesthetic, live status cards, filter settings, and custom analytics graphs..."
                  disabled={isGenerating}
                  style={{
                    backgroundColor: "#09090b", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px",
                    padding: "16px", color: "#ffffff", fontSize: "14px", fontFamily: "inherit", resize: "none", height: "140px", outline: "none", lineHeight: "1.5"
                  }}
                />
                <button
                  type="submit"
                  disabled={isGenerating || !prompt}
                  style={{
                    backgroundColor: isGenerating || !prompt ? "rgba(255,255,255,0.02)" : "#ffffff",
                    color: isGenerating || !prompt ? "#71717a" : "#000000",
                    border: isGenerating || !prompt ? "1px solid rgba(255,255,255,0.05)" : "none",
                    borderRadius: "10px", padding: "14px", fontSize: "14px", fontWeight: 600,
                    cursor: isGenerating || !prompt ? "not-allowed" : "pointer", fontFamily: "inherit", letterSpacing: "-0.1px"
                  }}
                >
                  {isGenerating ? "Compiling App Matrix..." : "Generate Web App"}
                </button>
              </form>

              {/* Console Pipeline Compilation Logs Widget */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#a1a1aa", letterSpacing: "1px", textTransform: "uppercase" }}>System Compilation Logs</span>
                <div style={{
                  flex: 1, backgroundColor: "#000000", border: "1px solid rgba(255, 255, 255, 0.04)",
                  borderRadius: "12px", padding: "16px", fontFamily: "monospace", fontSize: "12px",
                  color: "#38bdf8", overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px"
                }}>
                  {generationLogs.length === 0 && (
                    <span style={{ color: "#4b5563", fontStyle: "italic" }}>System log environment listening for structural execution parameters...</span>
                  )}
                  {generationLogs.map((log, index) => (
                    <div key={index}>{log}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Application Framer Component Canvas (Right Side) */}
            <div style={{ flex: 1, backgroundColor: "#0b0b0f", padding: "32px", display: "flex", flexDirection: "column", gap: "16px", position: "relative" }}>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: generatedHtmlText ? "#22c55e" : "#eab308" }} />
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "#a1a1aa", letterSpacing: "-0.1px" }}>
                    {generatedHtmlText ? "Live Application Sandbox Framework" : "Awaiting Output Compilation Sequence"}
                  </span>
                </div>

                {generatedHtmlText && (
                  <div style={{ display: "flex", gap: "10px", position: "relative", zIndex: 10 }}>
                    <button
                      onClick={handleCopyCode}
                      disabled={!isSubscribed}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                        color: isSubscribed ? "#e2e8f0" : "#52525b", padding: "6px 12px", borderRadius: "6px",
                        fontSize: "12px", fontWeight: 600, cursor: isSubscribed ? "pointer" : "not-allowed", fontFamily: "inherit"
                      }}
                    >
                      {copyStatus}
                    </button>
                    <button
                      disabled={!isSubscribed}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                        color: isSubscribed ? "#e2e8f0" : "#52525b", padding: "6px 12px", borderRadius: "6px",
                        fontSize: "12px", fontWeight: 600, cursor: isSubscribed ? "pointer" : "not-allowed", fontFamily: "inherit"
                      }}
                    >
                      Export to GitHub
                    </button>
                  </div>
                )}
              </div>

              {/* Primary Visual Mount Window Frame */}
              <div style={{
                flex: 1, backgroundColor: "#030303", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.05)",
                overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)", position: "relative"
              }}>
                {generatedHtmlText ? (
                  <>
                    <iframe
                      srcDoc={generatedHtmlText}
                      title="Generated Application Preview"
                      style={{ width: "100%", height: "100%", border: "none" }}
                    />

                    {/* Commercial Gating Panel Blur Overlay */}
                    {!isSubscribed && (
                      <div style={{
                        position: "absolute", inset: 0, backgroundColor: "rgba(3, 3, 3, 0.3)",
                        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20
                      }}>
                        <div style={{
                          backgroundColor: "#09090b", border: "1px solid rgba(255, 255, 255, 0.08)",
                          borderRadius: "16px", padding: "32px", maxWidth: "380px", textAlign: "center",
                          boxShadow: "0 30px 60px rgba(0,0,0,0.8)"
                        }}>
                          <div style={{ width: "40px", height: "40px", margin: "0 auto 16px auto", borderRadius: "50%", border: "1px solid #ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#ef4444" }} />
                          </div>
                          <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 8px 0", letterSpacing: "-0.3px" }}>
                            Unlock Your Application Assets
                          </h3>
                          <p style={{ color: "#a1a1aa", fontSize: "13px", lineHeight: "1.5", margin: "0 0 24px 0", fontWeight: 400 }}>
                            Your fully responsive sandbox layout has successfully compiled! Upgrade to PromptArc premium to export directly to GitHub and snap the clean source code files.
                          </p>
                          <button
                            onClick={() => setIsSubscribed(true)} 
                            style={{
                              backgroundColor: "#ffffff", color: "#000000", border: "none", borderRadius: "8px",
                              width: "100%", padding: "12px 16px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit"
                            }}
                          >
                            Upgrade to Premium
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ textAlign: "center", maxWidth: "320px" }}>
                    <div style={{ width: "32px", height: "32px", margin: "0 auto 16px auto", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "4px" }} />
                    <h4 style={{ fontSize: "14px", fontWeight: 600, margin: "0 0 6px 0", letterSpacing: "-0.3px" }}>
                      {isGenerating ? "Assembling Code Structures" : "Sandbox Matrix Completely Empty"}
                    </h4>
                    <p style={{ color: "#71717a", fontSize: "12px", margin: 0, lineHeight: "1.5", fontWeight: 400 }}>
                      {isGenerating ? "Our automated pipeline is building application frames and resolving asset allocations live." : "Your target live application view screen mounts programmatically immediately following generation sequence confirmation."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
