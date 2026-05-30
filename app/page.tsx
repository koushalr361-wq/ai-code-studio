"use client";

import React, { useState } from "react";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";

export default function PromptArcPremiumSuite() {
  const { user, isSignedIn } = useUser();
  const [viewMode, setViewMode] = useState<"landing" | "studio">("landing");
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Studio Core States
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);
  const [generatedHtmlText, setGeneratedHtmlText] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false); 
  const [copyStatus, setCopyStatus] = useState("Copy Code");

  // Handles the smooth perspective pop up slide transition shown in image 1
  const handleLaunchStudio = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setViewMode("studio");
      setIsTransitioning(false);
    }, 500);
  };

  const handleGenerateApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedHtmlText(null);
    setGenerationLogs(["🤖 Analyzing user request layout rules..."]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setGenerationLogs((prev) => [...prev, "⚡ Mapping prompt arc parameters into sandbox grid layers..."]);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Generation engine exception.");

      setGenerationLogs((prev) => [...prev, "🎨 Compiling custom dark-mode Tailwind CSS layout properties..."]);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setGenerationLogs((prev) => [...prev, "🚀 Injecting sandboxed runtime environment parameters..."]);

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
      setGenerationLogs((prev) => [...prev, `❌ Error: ${error.message || "Connection timed out."}`]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = () => {
    if (!generatedHtmlText) return;
    navigator.clipboard.writeText(generatedHtmlText);
    setCopyStatus("Copied! ✓");
    setTimeout(() => setCopyStatus("Copy Code"), 2000);
  };

  return (
    <div style={{
      backgroundColor: "#06060a",
      color: "#ffffff",
      minHeight: "100vh",
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      
      {/* Premium CSS Keyframe Injection for High-Class Transitions and Neon Highlight Glows */}
      <style>{`
        @keyframes pagePopIn {
          0% { opacity: 0; transform: scale(0.96) translateY(20px) rotateX(4deg); cubic-bezier(0.16, 1, 0.3, 1); }
          100% { opacity: 1; transform: scale(1) translateY(0) rotateX(0deg); }
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.03); }
        }
        .premium-transition {
          animation: pagePopIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .fade-exit {
          opacity: 0;
          transform: scale(1.05) translateY(-30px);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          border: 1px solid rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .active-glow-card {
          border: 1px solid rgba(56, 189, 248, 0.45) !important;
          box-shadow: 0 0 35px rgba(56, 189, 248, 0.12), inset 0 0 12px rgba(56, 189, 248, 0.05);
        }
        .glass-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.08);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
        }
      `}</style>

      {/* --- VIEW ROUTE 1: HIGH CLASS LANDING HOME PAGE --- */}
      {viewMode === "landing" && (
        <div className={isTransitioning ? "fade-exit" : "premium-transition"} style={{
          flex: 1, display: "flex", flexDirection: "column", position: "relative", minHeight: "100vh"
        }}>
          
          {/* Top Premium Navigation Header */}
          <header style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "28px 48px", borderBottom: "1px solid rgba(255,255,255,0.02)", zIndex: 10
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: 800, fontSize: "16px", letterSpacing: "-0.5px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              PROMPTARC
            </div>
            <div>
              {isSignedIn ? (
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <span style={{ fontSize: "13px", color: "#94a3b8" }}>Logged in: <strong style={{ color: "#ffffff" }}>{user?.firstName}</strong></span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <SignInButton mode="modal">
                  <button style={{
                    backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    color: "#ffffff", padding: "8px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer"
                  }}>Sign In</button>
                </SignInButton>
              )}
            </div>
          </header>

          {/* Deep Nebula Cosmic Backdrop Background Gradient Glow */}
          <div style={{
            position: "absolute", top: "35%", left: "50%", transform: "translate(-50%, -50%)",
            width: "700px", height: "700px", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.04) 35%, rgba(56,189,248,0.02) 60%, rgba(0,0,0,0) 80%)",
            zIndex: 1, animation: "subtlePulse 7s infinite ease-in-out"
          }} />

          {/* Hero Content Layer */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 24px", zIndex: 2, marginTop: "-20px" }}>
            
            <h1 style={{
              fontSize: "64px", fontWeight: 800, letterSpacing: "-2.5px", margin: "0 0 16px 0", textAlign: "center",
              background: "linear-gradient(to bottom, #ffffff 60%, #94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>
              PROMPTARC
            </h1>

            <p style={{ fontSize: "15px", color: "#94a3b8", lineHeight: "1.6", margin: "0 0 36px 0", textAlign: "center", maxWidth: "600px" }}>
              Auto-generates clean HTML/Tailwind from text, mates with development, building expine, and ribeotvised action actions into a proper, premium startup-grade platform.
            </p>

            <div style={{ marginBottom: "70px" }}>
              {isSignedIn ? (
                <button onClick={handleLaunchStudio} style={{
                  backgroundColor: "rgba(255,255,255,0.05)", color: "#ffffff", padding: "14px 32px", borderRadius: "8px",
                  fontSize: "14px", fontWeight: 600, cursor: "pointer", border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 0 30px rgba(255,255,255,0.02)", background: "linear-gradient(rgba(255,255,255,0.05), transparent)",
                  transition: "all 0.2s"
                }}>
                  Launch Application Studio 🚀
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button style={{
                    backgroundColor: "#ffffff", color: "#000000", padding: "14px 32px", borderRadius: "8px",
                    fontSize: "14px", fontWeight: 600, cursor: "pointer", border: "none", boxShadow: "0 4px 25px rgba(255,255,255,0.12)"
                  }}>
                    Launch Application Studio 🚀
                  </button>
                </SignInButton>
              )}
            </div>

            {/* --- THREE GLASS INFORMATION RECTANGLES MAPPED EXACTLY FROM IMAGES --- */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", width: "100%", maxWidth: "1140px" }}>
              
              {/* Card 1: AI Prompt Engine (ACTIVE CYAN HIGHLIGHT STATE FROM IMAGE 2) */}
              <div className="glass-card active-glow-card" style={{ borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", gap: "28px" }}>
                {/* 3D Object Illustration Component: Cybernetic Code Splicer Machine Robot Arm */}
                <div style={{ height: "120px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <svg width="90" height="90" viewBox="0 0 32 32" style={{ filter: "drop-shadow(0px 8px 16px rgba(56,189,248,0.3))" }}>
                    <defs>
                      <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#38bdf8" /><stop offset="100%" stopColor="#0369a1" /></linearGradient>
                    </defs>
                    {/* Platform Base */}
                    <path d="M4 22 L16 27 L28 22 L16 17 Z" fill="url(#cyanGrad)" opacity="0.3" />
                    <path d="M4 22 L4 24 L16 29 L16 27 Z" fill="#0284c7" />
                    <path d="M28 22 L28 24 L16 29 L16 27 Z" fill="#0369a1" />
                    {/* Robot Arm Nodes */}
                    <rect x="14" y="10" width="4" height="12" rx="2" fill="url(#cyanGrad)" transform="rotate(25 16 16)" />
                    <circle cx="13" cy="20" r="2.5" fill="#ffffff" />
                    {/* Floating Layout Code Panel Tag */}
                    <path d="M20 6 L27 9 L27 15 L20 12 Z" fill="#38bdf8" opacity="0.8" />
                    <text x="21" y="12" fill="#000000" fontSize="3" fontWeight="bold" fontFamily="monospace">{"{ }"}</text>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 500, color: "#38bdf8", marginBottom: "4px" }}>AI Prompt Engine</div>
                  <h3 style={{ fontSize: "19px", fontWeight: 700, margin: "0 0 10px 0", letterSpacing: "-0.3px" }}>Instant Compilation</h3>
                  <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0, lineHeight: "1.6" }}>Auto-generates clean within/Tailwind from text. Responsive design, Ready-to-deploy logic.</p>
                </div>
              </div>

              {/* Card 2: Visualization Sandbox */}
              <div className="glass-card" style={{ borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", gap: "28px" }}>
                {/* 3D Object Illustration Component: Holographic Metric Server Terminal Window */}
                <div style={{ height: "120px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="95" height="95" viewBox="0 0 32 32" style={{ filter: "drop-shadow(0px 8px 16px rgba(168,85,247,0.2))" }}>
                    <defs>
                      <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c084fc" /><stop offset="100%" stopColor="#6b21a8" /></linearGradient>
                    </defs>
                    {/* Angled Layout Window Box Isometric */}
                    <path d="M6 8 L24 5 L28 19 L10 22 Z" fill="url(#purpleGrad)" opacity="0.2" stroke="rgba(192,132,252,0.4)" strokeWidth="0.5" />
                    {/* Interior Analytics Grid Lines */}
                    <path d="M9 13 L15 11 L20 14 L25 10" fill="none" stroke="#c084fc" strokeWidth="1.5" />
                    {/* Small UI Interface Dots */}
                    <circle cx="8" cy="8" r="0.8" fill="#ef4444" /><circle cx="10" cy="7.7" r="0.8" fill="#eab308" />
                    <rect x="20" y="16" width="5" height="3" fill="#a855f7" opacity="0.6" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 500, color: "#94a3b8", marginBottom: "4px" }}>Visualization Sandbox</div>
                  <h3 style={{ fontSize: "19px", fontWeight: 700, margin: "0 0 10px 0", letterSpacing: "-0.3px" }}>Real-Time Previews</h3>
                  <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0, lineHeight: "1.6" }}>See your creation instantly within a secure canvas. Interactive state, Mock data injection.</p>
                </div>
              </div>

              {/* Card 3: DevOps Integration */}
              <div className="glass-card" style={{ borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", gap: "28px" }}>
                {/* 3D Object Illustration Component: Cloud Cluster Core Server Rocket */}
                <div style={{ height: "120px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="90" height="90" viewBox="0 0 32 32" style={{ filter: "drop-shadow(0px 8px 16px rgba(99,102,241,0.25))" }}>
                    <defs>
                      <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#818cf8" /><stop offset="100%" stopColor="#3730a3" /></linearGradient>
                    </defs>
                    {/* Base Database Stack Layer */}
                    <path d="M8 20 C8 18, 24 18, 24 20 C24 22, 8 22, 8 20" fill="url(#indigoGrad)" opacity="0.4" />
                    <path d="M8 23 C8 21, 24 21, 24 23 C24 25, 8 25, 8 23" fill="url(#indigoGrad)" opacity="0.6" />
                    {/* 3D Rocket Body Core */}
                    <path d="M13 6 C13 6, 16 2, 16 2 C16 2, 19 6, 19 6 L18 15 L14 15 Z" fill="#ffffff" />
                    <path d="M12 12 L14 15 L11 16 Z" fill="#818cf8" />
                    <path d="M20 12 L18 15 L21 16 Z" fill="#818cf8" />
                    {/* Floating Cumulus Vector Cloud */}
                    <path d="M6 12 C6 10, 10 9, 11 11 C12 9, 16 10, 15 12 C16 14, 8 15, 6 12 Z" fill="#38bdf8" opacity="0.3" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 500, color: "#94a3b8", marginBottom: "4px" }}>DevOps Integration</div>
                  <h3 style={{ fontSize: "19px", fontWeight: 700, margin: "0 0 10px 0", letterSpacing: "-0.3px" }}>One-Click Deploy</h3>
                  <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0, lineHeight: "1.6" }}>Push directly to GitHub repos and launch live links. Clerk auth, Production hosting config.</p>
                </div>
              </div>

            </div>
          </div>

          <footer style={{ textAlign: "center", paddingBottom: "32px", fontSize: "12px", color: "#3a3a44", letterSpacing: "0.5px", zIndex: 2 }}>
            © 2026 PROMPTARC. All rights reserved. Built for high-velocity software creation.
          </footer>
        </div>
      )}

      {/* --- VIEW ROUTE 2: FULL WORKSPACE DEV STUDIO MANAGEMENT VIEWPORT --- */}
      {viewMode === "studio" && (
        <div className="premium-transition" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          
          {/* Studio Header Panel */}
          <header style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "16px 32px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", backgroundColor: "#09090b"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <div onClick={() => setViewMode("landing")} style={{ fontWeight: 800, fontSize: "16px", color: "#ffffff", letterSpacing: "-0.5px", cursor: "pointer" }}>
                PROMPTARC
              </div>
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

          {/* Divided Panel Base */}
          <main style={{ flex: 1, display: "flex", height: "calc(100vh - 65px)", overflow: "hidden" }}>
            
            {/* Terminal Input Board Panel Sheet (Left Side) */}
            <div style={{
              width: "420px", borderRight: "1px solid rgba(255, 255, 255, 0.05)",
              padding: "32px", display: "flex", flexDirection: "column", gap: "28px", backgroundColor: "#060608"
            }}>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>Application Generator</h2>
                <p style={{ color: "#71717a", fontSize: "13px", margin: 0, lineHeight: "1.5" }}>
                  Input system layout declarations. Our automated engine will instantly provision code configurations and push them live.
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
                    cursor: isGenerating || !prompt ? "not-allowed" : "pointer"
                  }}
                >
                  {isGenerating ? "Compiling App Matrix..." : "Generate Web App ⚡"}
                </button>
              </form>

              {/* Dynamic Scrolling Terminal System Logs Line Card */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#a1a1aa", letterSpacing: "1px", textTransform: "uppercase" }}>System Compilation Logs</span>
                <div style={{
                  flex: 1, backgroundColor: "#000000", border: "1px solid rgba(255, 255, 255, 0.04)",
                  borderRadius: "12px", padding: "16px", fontFamily: "monospace", fontSize: "12px",
                  color: "#38bdf8", overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px"
                }}>
                  {generationLogs.length === 0 && (
                    <span style={{ color: "#4b5563", fontStyle: "italic" }}>System pipeline idle. Waiting for parameter configuration blocks...</span>
                  )}
                  {generationLogs.map((log, index) => (
                    <div key={index}>{log}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Sandbox Framework View Window Output Container (Right Side) */}
            <div style={{ flex: 1, backgroundColor: "#0b0b0f", padding: "32px", display: "flex", flexDirection: "column", gap: "16px", position: "relative" }}>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: generatedHtmlText ? "#22c55e" : "#eab308" }} />
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "#a1a1aa" }}>
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
                        fontSize: "12px", fontWeight: 500, cursor: isSubscribed ? "pointer" : "not-allowed"
                      }}
                    >
                      {copyStatus}
                    </button>
                    <button
                      disabled={!isSubscribed}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                        color: isSubscribed ? "#e2e8f0" : "#52525b", padding: "6px 12px", borderRadius: "6px",
                        fontSize: "12px", fontWeight: 500, cursor: isSubscribed ? "pointer" : "not-allowed"
                      }}
                    >
                      Export to GitHub 🐙
                    </button>
                  </div>
                )}
              </div>

              {/* Central Iframe Screen Mounting Box Frame Grid Node */}
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

                    {/* Dynamic Glassmorphic Subscription Guard Layer Blur Screen Overlay */}
                    {!isSubscribed && (
                      <div style={{
                        position: "absolute", inset: 0, backgroundColor: "rgba(3, 3, 3, 0.3)",
                        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20
                      }}>
                        <div style={{
                          backgroundColor: "#09090b", border: "1px solid rgba(255, 255, 255, 0.08)",
                          borderRadius: "16px", padding: "32px", maxWidth: "380px", textAlign: "center",
                          boxShadow: "0 30px 60px rgba(0,0,0,0.8)"
                        }}>
                          <div style={{ width: "42px", height: "42px", margin: "0 auto 16px auto", borderRadius: "50%", border: "2px solid #ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444" }} />
                          </div>
                          <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 8px 0", letterSpacing: "-0.3px" }}>
                            Unlock Your Application Assets
                          </h3>
                          <p style={{ color: "#a1a1aa", fontSize: "13px", lineHeight: "1.5", margin: "0 0 24px 0" }}>
                            Your fully responsive sandbox layout has successfully compiled! Upgrade to PromptArc premium to export directly to GitHub and snap the clean source code files.
                          </p>
                          <button
                            onClick={() => setIsSubscribed(true)} 
                            style={{
                              backgroundColor: "#ffffff", color: "#000000", border: "none", borderRadius: "8px",
                              width: "100%", padding: "12px 16px", fontSize: "14px", fontWeight: 600, cursor: "pointer"
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
                    <div style={{ width: "36px", height: "36px", margin: "0 auto 16px auto", border: "2px solid rgba(255,255,255,0.1)", borderRadius: "6px" }} />
                    <h4 style={{ fontSize: "14px", fontWeight: 600, margin: "0 0 6px 0" }}>
                      {isGenerating ? "Assembling Code Structures" : "Sandbox Matrix Completely Empty"}
                    </h4>
                    <p style={{ color: "#71717a", fontSize: "12px", margin: 0, lineHeight: "1.5" }}>
                      {isGenerating ? "The AI generator is compiling structural data streams and injecting nodes live into the sandboxed target frame view." : "Your target live application view screen mounts programmatically immediately following generation sequence confirmation."}
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
