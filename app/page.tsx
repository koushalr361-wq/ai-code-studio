"use client";

import React, { useState, useEffect } from "react";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";

export default function PromptArcUltimateProduction() {
  const { user, isSignedIn } = useUser();
  const [activeTab, setActiveTab] = useState("fullstack");
  const [feedMode, setFeedMode] = useState("tasks");
  const [prompt, setPrompt] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [activeModel, setActiveModel] = useState("Claude 4.7 Opus");
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  // Simulation of task data matching your reference
  const recentTasks = [
    {
      id: "EMT - d42c09",
      task: "micro-analysis",
      description: "AI website that takes input as photo, scans it and detects the microplastic content in par...",
      lastModified: "206 days ago"
    },
    {
      id: "EMT - x11b22",
      task: "agent-research-node",
      description: "Recursive agentic workflow for multi-step full stack provisioning and edge deployment...",
      lastModified: "Just now"
    }
  ];

  const deployedApps = [
    {
      id: "DEP - 88102",
      name: "Auramax headphone website",
      url: "auramax-curated.promptarc.app",
      tier: "developer"
    },
    {
      id: "DEP - 77291",
      name: "Ocean research platform",
      url: "ocean-analytics.promptarc.app",
      tier: "scale"
    }
  ];

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsProcessing(true);
    setConsoleLogs(["[INIT] Securing environment...", "[ROUTER] Scaling compute clusters...", "[COMPILE] Generating targeted code blocks..."]);
    setTimeout(() => {
      setIsProcessing(false);
      setPrompt("");
      setConsoleLogs(prev => [...prev, "SUCCESS: Deployment live on staging."]);
    }, 2000);
  };

  return (
    <div style={{ backgroundColor: "#09090b", color: "#ffffff", minHeight: "100vh", fontFamily: 'Inter, system-ui, sans-serif', display: "flex", flexDirection: "column", position: "relative", overflowX: "hidden" }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        
        .mesh-glow {
          position: absolute;
          top: -100px; left: 50%;
          width: 1000px; height: 500px;
          background: radial-gradient(circle at center, rgba(56, 189, 248, 0.1) 0%, rgba(168, 85, 247, 0.05) 35%, transparent 70%);
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 0;
        }

        .glass-card {
          background: rgba(24, 24, 27, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .hover-action:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        @keyframes wave {
          0%, 100% { height: 4px; }
          50% { height: 14px; }
        }
        .recording-bar { width: 2px; background: #ef4444; animation: wave 0.6s infinite ease-in-out; border-radius: 2px; }
        
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <div className="mesh-glow" />

      {/* --- HEADER --- */}
      <header style={{ position: "relative", zIndex: 50, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 32px", borderBottom: "1px solid rgba(255,255,255,0.05)", backgroundColor: "rgba(9, 9, 11, 0.8)", backdropFilter: "blur(10px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "20px", height: "20px", background: "#fff", borderRadius: "4px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", padding: "3px" }}>
            <div style={{ background: "#000", borderRadius: "1px" }} /><div style={{ background: "#000", borderRadius: "1px" }} />
            <div style={{ background: "#000", borderRadius: "1px" }} /><div style={{ background: "#000", borderRadius: "1px" }} />
          </div>
          <span style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-0.5px", fontFamily: "Syne" }}>PROMPTARC</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <button style={{ backgroundColor: "#fef08a", color: "#000", border: "none", borderRadius: "9999px", padding: "6px 16px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>Buy Credits</button>
          
          <div style={{ display: "flex", gap: "16px", color: "#71717a" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </div>

          {isSignedIn ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "16px" }}>
              <span style={{ fontSize: "13px", color: "#a1a1aa" }}>{user?.firstName}</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <SignInButton mode="modal">
              <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "6px 14px", borderRadius: "9999px", fontSize: "12px", cursor: "pointer" }}>Sign In</button>
            </SignInButton>
          )}
        </div>
      </header>

      {/* --- MAIN DASHBOARD --- */}
      <main style={{ position: "relative", zIndex: 10, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 24px" }}>
        
        {/* Banner */}
        <div style={{ background: "linear-gradient(90deg, rgba(56,189,248,0.1) 0%, rgba(59,130,246,0.1) 100%)", border: "1px solid rgba(56,189,248,0.3)", borderRadius: "9999px", padding: "4px 4px 4px 16px", display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px" }}>
          <span style={{ fontSize: "13px", fontWeight: 500 }}>FLAT 85% off on Standard monthly plan.</span>
          <span style={{ background: "#000", color: "#fff", fontSize: "11px", fontWeight: 700, padding: "6px 12px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.1)" }}>Discount auto applied</span>
        </div>

        {/* Project Selector */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: "8px 16px", borderRadius: "9999px", display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px", cursor: "pointer" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "linear-gradient(to right, #f59e0b, #ec4899)" }} />
          <span style={{ fontSize: "13px", fontWeight: 500 }}>{user?.firstName ? `${user.firstName}'s Workspace` : "Main Project"}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>

        <h1 style={{ fontSize: "48px", fontWeight: 700, textAlign: "center", margin: "0 0 12px 0", letterSpacing: "-1px" }}>Where ideas become reality</h1>
        <p style={{ color: "#71717a", fontSize: "16px", marginBottom: "40px" }}>Build full-stack applications with simple conversations.</p>

        {/* --- INPUT CONSOLE --- */}
        <div className="glass-card" style={{ width: "100%", maxWidth: "800px", borderRadius: "20px", padding: "16px" }}>
          
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "12px" }}>
            {["fullstack", "mobile", "landing"].map((t) => (
              <button key={t} onClick={() => setActiveTab(t)} style={{ background: activeTab === t ? "rgba(255,255,255,0.08)" : "transparent", border: "none", color: activeTab === t ? "#fff" : "#71717a", padding: "8px 12px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>
                {t === "fullstack" ? "Full Stack App" : t + " App"}
              </button>
            ))}
          </div>

          <form onSubmit={handleExecute}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Build a modern SaaS for tracking environmental data..."
              style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "15px", height: "80px", resize: "none" }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                <div style={{ position: "relative" }}>
                  <div onClick={() => setShowModelDropdown(!showModelDropdown)} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 600, cursor: "pointer", color: "#f97316" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M17 5l-10 14M22 12H2M19 17L5 7"/></svg>
                    {activeModel}
                  </div>
                  {showModelDropdown && (
                    <div className="glass-card" style={{ position: "absolute", bottom: "100%", left: 0, width: "200px", borderRadius: "12px", padding: "8px", marginBottom: "10px", zIndex: 100 }}>
                      <div onClick={() => { setActiveModel("Claude 4.7 Opus"); setShowModelDropdown(false); }} style={{ padding: "8px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>Claude 4.7 Opus</div>
                      <div onClick={() => { setActiveModel("Claude 4.5 Sonnet"); setShowModelDropdown(false); }} style={{ padding: "8px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", color: "#71717a" }}>Claude 4.5 Sonnet</div>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "12px", color: "#71717a" }}>Public</span>
                <div onMouseEnter={() => setIsRecording(true)} onMouseLeave={() => setIsRecording(false)} style={{ position: "relative" }}>
                  <button type="button" style={{ background: isRecording ? "rgba(239, 68, 68, 0.1)" : "rgba(255,255,255,0.05)", border: "none", color: isRecording ? "#ef4444" : "#fff", width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 19v4M8 23h8"/></svg>
                  </button>
                  {isRecording && (
                    <div style={{ position: "absolute", bottom: "130%", left: "50%", transform: "translateX(-50%)", background: "#fff", color: "#000", padding: "6px 12px", borderRadius: "8px", fontSize: "11px", fontWeight: 700, whiteSpace: "nowrap", display: "flex", gap: "6px", alignItems: "center" }}>
                      <div className="recording-bar" /> <div className="recording-bar" style={{ animationDelay: "0.2s" }} /> <div className="recording-bar" style={{ animationDelay: "0.1s" }} />
                      Listening...
                    </div>
                  )}
                </div>
                <button type="submit" disabled={isProcessing || !prompt.trim()} style={{ background: isProcessing || !prompt.trim() ? "rgba(255,255,255,0.05)" : "#fff", border: "none", color: "#000", width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  {isProcessing ? <div className="spin" style={{ width: "14px", height: "14px", border: "2px solid #000", borderTopColor: "transparent", borderRadius: "50%" }} /> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Suggestion Pills */}
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          {["My Counter Part", "Bill Generator", "Word of the Day"].map((s, i) => (
            <div key={i} className="hover-action" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: "6px 14px", borderRadius: "8px", color: "#a1a1aa", fontSize: "13px", cursor: "pointer" }}>{s}</div>
          ))}
        </div>

        {/* Console Logs */}
        {consoleLogs.length > 0 && (
          <div style={{ width: "100%", maxWidth: "800px", marginTop: "24px", background: "rgba(0,0,0,0.4)", borderRadius: "12px", padding: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
            {consoleLogs.map((log, i) => (
              <div key={i} style={{ fontFamily: "monospace", fontSize: "11px", color: "#38bdf8", marginBottom: "4px" }}>{log}</div>
            ))}
          </div>
        )}

        {/* --- DATA SECTION --- */}
        <div style={{ width: "100%", maxWidth: "1000px", marginTop: "80px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px", marginBottom: "24px" }}>
            <div style={{ display: "flex", gap: "32px" }}>
              <button onClick={() => setFeedMode("tasks")} style={{ background: "none", border: "none", color: feedMode === "tasks" ? "#fff" : "#71717a", fontSize: "14px", fontWeight: 700, cursor: "pointer", borderBottom: feedMode === "tasks" ? "2px solid #fff" : "none", paddingBottom: "12px" }}>Recent Tasks</button>
              <button onClick={() => setFeedMode("apps")} style={{ background: "none", border: "none", color: feedMode === "apps" ? "#fff" : "#71717a", fontSize: "14px", fontWeight: 700, cursor: "pointer", borderBottom: feedMode === "apps" ? "2px solid #fff" : "none", paddingBottom: "12px" }}>Deployed Apps</button>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
          </div>

          {feedMode === "tasks" ? (
            <div className="glass-card" style={{ borderRadius: "16px", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "150px 1fr 150px", padding: "14px 24px", background: "rgba(255,255,255,0.02)", fontSize: "11px", color: "#71717a", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase" }}>
                <span>ID</span><span>Task Parameter</span><span style={{ textAlign: "right" }}>Modified</span>
              </div>
              {recentTasks.map((t) => (
                <div key={t.id} style={{ display: "grid", gridTemplateColumns: "150px 1fr 150px", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.03)", fontSize: "14px", alignItems: "center" }}>
                  <span style={{ fontFamily: "monospace", color: "#71717a" }}>{t.id}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{t.task}</div>
                    <div style={{ fontSize: "12px", color: "#71717a" }}>{t.description}</div>
                  </div>
                  <span style={{ textAlign: "right", color: "#71717a" }}>{t.lastModified}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {deployedApps.map((app) => (
                <div key={app.id} className="glass-card hover-action" style={{ padding: "20px", borderRadius: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ fontSize: "12px", color: "#71717a", fontFamily: "monospace" }}>{app.id}</span>
                    <span style={{ fontSize: "10px", fontWeight: 800, background: "rgba(56,189,248,0.1)", color: "#38bdf8", padding: "4px 8px", borderRadius: "4px", textTransform: "uppercase" }}>{app.tier}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: "16px", marginBottom: "4px" }}>{app.name}</div>
                  <div style={{ fontSize: "13px", color: "#38bdf8", marginBottom: "16px" }}>{app.url}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#4ade80", fontWeight: 700 }}>
                    <div style={{ width: "6px", height: "6px", background: "#4ade80", borderRadius: "50%" }} /> LIVE
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
