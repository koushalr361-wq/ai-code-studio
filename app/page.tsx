"use client";

import React, { useState, useEffect, useRef } from "react";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";

interface TaskItem {
  id: string;
  task: string;
  description: string;
  lastModified: string;
}

interface DeployedApp {
  id: string;
  name: string;
  url: string;
  tier: "developer" | "scale";
  timestamp: string;
}

export default function PromptArcMasterStudio() {
  const { user, isSignedIn } = useUser();
  const [activeTab, setActiveTab] = useState<"fullstack" | "mobile" | "landing">("fullstack");
  const [feedMode, setFeedMode] = useState<"tasks" | "apps">("tasks");
  const [prompt, setPrompt] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [activeModel, setActiveModel] = useState("Claude 4.7 Opus");
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleLogs]);

  const recentTasks: TaskItem[] = [
    {
      id: "EMT - d42c09",
      task: "micro-analysis",
      description: "create an A website that takes input as photo, scans it and detects the microplastic content in par...",
      lastModified: "206 days ago"
    },
    {
      id: "EMT - x99f12",
      task: "auth-gateway-sync",
      description: "Implement secure JWT token rotation and edge-middleware routing for user sessions...",
      lastModified: "208 days ago"
    }
  ];

  const deployedApps: DeployedApp[] = [
    {
      id: "DEP - 88102",
      name: "Auramax headphone website",
      url: "auramax-curated.promptarc.app",
      tier: "developer",
      timestamp: "Active live link"
    },
    {
      id: "DEP - 77291",
      name: "Ocean research platform",
      url: "ocean-analytics.promptarc.app",
      tier: "scale",
      timestamp: "Active live link"
    }
  ];

  const handleExecuteAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsProcessing(true);
    setShowModelDropdown(false);
    setConsoleLogs(["[INIT] Securing remote environment parameters for synthesis..."]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setConsoleLogs((prev) => [...prev, `[ROUTER] Mapping system instructions directly to ${activeModel} layer...`]);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setConsoleLogs((prev) => [...prev, `[COMPILE] Provisioning targeted [${activeTab.toUpperCase()}] framework sandbox...`]);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setConsoleLogs((prev) => [...prev, "SUCCESS: Deployment routine initialized. System layer executing."]);
    } catch (err) {
      setConsoleLogs((prev) => [...prev, "ERROR: Target matrix compilation timeout."]);
    } finally {
      setIsProcessing(false);
      setPrompt("");
    }
  };

  return (
    <div style={{ backgroundColor: "#09090b", color: "#ffffff", minHeight: "100vh", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', display: "flex", flexDirection: "column", position: "relative", overflowX: "hidden" }}>
      
      {/* --- HIGH-PERFORMANCE CSS AMBIENT MESH & ANIMATIONS --- */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1) translate(-50%, -50%); }
          50% { opacity: 0.7; transform: scale(1.05) translate(-50%, -50%); }
        }
        @keyframes soundWave {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        .ambient-mesh {
          position: absolute;
          top: 0; left: 50%;
          width: 100vw; height: 600px;
          background: radial-gradient(circle at center, rgba(56, 189, 248, 0.08) 0%, rgba(168, 85, 247, 0.03) 40%, transparent 70%);
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 0;
          animation: pulseGlow 8s ease-in-out infinite;
        }
        .glass-panel {
          background: rgba(24, 24, 27, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .hover-lift { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .hover-lift:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.04); }
        .wave-bar { width: 2px; background-color: #ef4444; animation: soundWave 0.5s infinite ease-in-out; border-radius: 2px; }
        
        /* Custom Scrollbar for Logs */
        .log-scroll::-webkit-scrollbar { width: 6px; }
        .log-scroll::-webkit-scrollbar-track { background: transparent; }
        .log-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>

      <div className="ambient-mesh" />

      {/* --- 1. TOP HEADER --- */}
      <header style={{ position: "relative", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(9, 9, 11, 0.8)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ display: "flex", gap: "3px", flexWrap: "wrap", width: "19px", height: "19px", padding: "2px", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ width: "6px", height: "6px", backgroundColor: "#fff", borderRadius: "1px" }} />
            <div style={{ width: "6px", height: "6px", backgroundColor: "#fff", borderRadius: "1px" }} />
            <div style={{ width: "6px", height: "6px", backgroundColor: "#fff", borderRadius: "1px" }} />
            <div style={{ width: "6px", height: "6px", backgroundColor: "#fff", borderRadius: "1px" }} />
          </div>
          <span style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-0.3px" }}>PROMPTARC</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <button type="button" className="hover-lift" style={{ backgroundColor: "#fef08a", color: "#000000", border: "none", borderRadius: "9999px", padding: "8px 18px", fontSize: "13px", fontWeight: 700, cursor: "pointer", boxShadow: "0 0 20px rgba(254, 240, 138, 0.2)" }}>
            Buy Credits
          </button>
          
          <div style={{ display: "flex", gap: "16px", color: "#a1a1aa" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ cursor: "pointer" }}><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ cursor: "pointer" }}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </div>

          {isSignedIn ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "16px" }}>
              <span style={{ fontSize: "13px", color: "#a1a1aa", fontWeight: 500 }}>{user?.firstName}</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <SignInButton mode="modal">
              <button className="hover-lift" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "8px 18px", borderRadius: "9999px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Sign In</button>
            </SignInButton>
          )}
        </div>
      </header>

      {/* --- 2. MAIN CONTENT AREA --- */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 24px", position: "relative", zIndex: 10 }}>
        
        {/* Discount Banner */}
        <div style={{ background: "linear-gradient(90deg, rgba(56,189,248,0.15) 0%, rgba(59,130,246,0.15) 100%)", border: "1px solid rgba(56,189,248,0.3)", borderRadius: "9999px", padding: "6px 6px 6px 20px", display: "flex", alignItems: "center", gap: "20px", marginBottom: "40px", boxShadow: "0 0 30px rgba(56,189,248,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "16px" }}></span>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#fff", letterSpacing: "0.2px" }}>FLAT 85% off on Standard monthly plan.</span>
          </div>
          <span style={{ backgroundColor: "#000000", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "12px", fontWeight: 600, padding: "8px 16px", borderRadius: "9999px" }}>
            Discount auto applied
          </span>
        </div>

        {/* Project Selector */}
        <button type="button" className="hover-lift" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "9999px", padding: "10px 20px", display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", fontWeight: 500, color: "#e4e4e7", cursor: "pointer", marginBottom: "32px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6)", boxShadow: "0 0 10px rgba(236,72,153,0.5)" }} />
          {user?.firstName ? `${user.firstName}'s Production` : "Workspace Project"}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>

        {/* Hero Text */}
        <h1 style={{ fontSize: "48px", fontWeight: 700, color: "#ffffff", margin: "0 0 16px 0", letterSpacing: "-1px", textAlign: "center", background: "linear-gradient(180deg, #fff 0%, #a1a1aa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Where ideas become reality
        </h1>
        <p style={{ color: "#a1a1aa", fontSize: "16px", margin: "0 0 48px 0", fontWeight: 400, textAlign: "center", maxWidth: "600px" }}>
          Build fully functional apps and websites through simple conversations, deployed instantly to the edge.
        </p>

        {/* --- 3. THE COMPLEX INPUT CONSOLE --- */}
        <div className="glass-panel" style={{ width: "100%", maxWidth: "840px", borderRadius: "24px", padding: "20px" }}>
          
          {/* Integrated Tabs */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "16px" }}>
            {[
              { id: "fullstack", label: "Full Stack App", icon: <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/> },
              { id: "mobile", label: "Mobile App", icon: <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/> },
              { id: "landing", label: "Landing Page", icon: <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/> }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)} 
                style={{ 
                  backgroundColor: activeTab === tab.id ? "rgba(255,255,255,0.08)" : "transparent", 
                  color: activeTab === tab.id ? "#fff" : "#71717a", 
                  border: "none", borderRadius: "10px", padding: "10px 16px", fontSize: "13px", fontWeight: 600, cursor: "pointer", 
                  display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s" 
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  {tab.icon}
                  {tab.id === "fullstack" && <><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>}
                  {tab.id === "mobile" && <line x1="12" y1="18" x2="12.01" y2="18"/>}
                  {tab.id === "landing" && <><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>}
                </svg>
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleExecuteAgent} style={{ display: "flex", flexDirection: "column" }}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Describe your ${activeTab} architecture...`}
              style={{ width: "100%", backgroundColor: "transparent", color: "#fff", border: "none", outline: "none", resize: "none", height: "80px", fontSize: "15px", lineHeight: "1.6", fontWeight: 400 }}
              disabled={isProcessing}
            />

            {/* Bottom Console Action Row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              
              <div style={{ display: "flex", alignItems: "center", gap: "16px", color: "#a1a1aa" }}>
                <button type="button" className="hover-lift" style={{ background: "none", border: "none", color: "#a1a1aa", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                </button>
                <button type="button" className="hover-lift" style={{ background: "none", border: "none", color: "#a1a1aa", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                </button>
                
                <span style={{ width: "1px", height: "16px", backgroundColor: "rgba(255,255,255,0.1)" }} />
                
                {/* Inline Model Selector */}
                <div style={{ position: "relative" }}>
                  <button type="button" onClick={() => setShowModelDropdown(!showModelDropdown)} className="hover-lift" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "6px 12px", color: "#fff", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5"><path d="M12 2v20M17 5l-10 14M22 12H2M19 17L5 7"/></svg>
                    {activeModel} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {showModelDropdown && (
                    <div style={{ position: "absolute", bottom: "100%", left: 0, marginBottom: "8px", backgroundColor: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", width: "240px", padding: "6px", zIndex: 50, boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
                      <div onClick={() => { setActiveModel("Claude 4.7 Opus"); setShowModelDropdown(false); }} className="hover-lift" style={{ padding: "10px", color: "#fff", cursor: "pointer", borderRadius: "8px", backgroundColor: activeModel === "Claude 4.7 Opus" ? "rgba(255,255,255,0.06)" : "transparent" }}>
                        <div style={{ fontSize: "13px", fontWeight: 600 }}>Claude 4.7 Opus</div>
                        <div style={{ fontSize: "11px", color: "#71717a", marginTop: "2px" }}>Advanced logic synthesis</div>
                      </div>
                      <div onClick={() => { setActiveModel("Claude 4.5 Sonnet"); setShowModelDropdown(false); }} className="hover-lift" style={{ padding: "10px", color: "#fff", cursor: "pointer", borderRadius: "8px", backgroundColor: activeModel === "Claude 4.5 Sonnet" ? "rgba(255,255,255,0.06)" : "transparent" }}>
                        <div style={{ fontSize: "13px", fontWeight: 600 }}>Claude 4.5 Sonnet</div>
                        <div style={{ fontSize: "11px", color: "#71717a", marginTop: "2px" }}>Fast rendering & layouts</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#a1a1aa", fontSize: "12px", fontWeight: 500, backgroundColor: "rgba(255,255,255,0.03)", padding: "6px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  Public
                </div>
                
                <button type="button" className="hover-lift" style={{ background: "none", border: "none", color: "#a1a1aa", cursor: "pointer", display: "flex", alignItems: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
                </button>
                
                {/* Mic Icon with Tooltip */}
                <div style={{ position: "relative" }} onMouseEnter={() => setIsRecording(true)} onMouseLeave={() => setIsRecording(false)}>
                  <button type="button" style={{ background: isRecording ? "rgba(239, 68, 68, 0.1)" : "rgba(255,255,255,0.05)", border: isRecording ? "1px solid rgba(239, 68, 68, 0.3)" : "none", color: isRecording ? "#ef4444" : "#fff", cursor: "pointer", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 19v4M8 23h8"/></svg>
                  </button>
                  {isRecording && (
                    <div style={{ position: "absolute", bottom: "130%", left: "50%", transform: "translateX(-50%)", backgroundColor: "#fff", color: "#000", padding: "8px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}>
                      <div style={{ display: "flex", gap: "2px", alignItems: "center", height: "14px" }}>
                        <div className="wave-bar" style={{ animationDelay: "0.1s" }} />
                        <div className="wave-bar" style={{ animationDelay: "0.3s" }} />
                        <div className="wave-bar" style={{ animationDelay: "0.2s" }} />
                      </div>
                      Start voice recording
                      <div style={{ position: "absolute", bottom: "-5px", left: "50%", transform: "translateX(-50%)", width: "0", height: "0", borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid #fff" }}></div>
                    </div>
                  )}
                </div>

                {/* Submit Arrow */}
                <button type="submit" disabled={isProcessing || !prompt.trim()} style={{ backgroundColor: isProcessing || !prompt.trim() ? "rgba(255,255,255,0.05)" : "#fff", border: "none", color: isProcessing || !prompt.trim() ? "#52525b" : "#000", cursor: isProcessing || !prompt.trim() ? "not-allowed" : "pointer", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                  {isProcessing ? (
                    <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid #52525b", borderTopColor: "transparent", animation: "spin 1s linear infinite" }} />
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Suggestion Pills */}
        <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          {[
            { label: "My Counter Part", icon: <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/> },
            { label: "Bill Generator", icon: <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><ellipse cx="12" cy="5" rx="9" ry="3"/> },
            { label: "Word of the Day", icon: <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/> }
          ].map((pill, idx) => (
            <button key={idx} type="button" className="suggestion-pill hover-lift" style={{ padding: "8px 16px", borderRadius: "10px", fontSize: "13px", color: "#a1a1aa", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 500 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {pill.icon}
                <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              {pill.label}
            </button>
          ))}
        </div>

        {/* Streaming Logs */}
        {consoleLogs.length > 0 && (
          <div className="log-scroll glass-panel" style={{ width: "100%", maxWidth: "840px", marginTop: "24px", borderRadius: "16px", padding: "16px", maxHeight: "100px", overflowY: "auto" }}>
            {consoleLogs.map((log, index) => (
              <div key={index} style={{ fontFamily: "monospace", fontSize: "12px", color: "#38bdf8", marginBottom: "4px" }}>{log}</div>
            ))}
            <div ref={logsEndRef} />
          </div>
        )}

        {/* --- 4. RECENT TASKS DATA TABLE --- */}
        <div style={{ width: "100%", maxWidth: "1040px", marginTop: "80px" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "16px", marginBottom: "24px" }}>
            <div style={{ display: "flex", gap: "32px" }}>
              <button onClick={() => setFeedMode("tasks")} style={{ background: "none", border: "none", color: feedMode === "tasks" ? "#fff" : "#71717a", fontSize: "15px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", transition: "color 0.2s" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Recent Tasks
              </button>
              <button onClick={() => setFeedMode("apps")} style={{ background: "none", border: "none", color: feedMode === "apps" ? "#fff" : "#71717a", fontSize: "15px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", transition: "color 0.2s" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                Deployed Apps
              </button>
            </div>
            <button className="hover-lift" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "8px", color: "#a1a1aa", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            </button>
          </div>

          {feedMode === "tasks" && (
            <div className="glass-panel" style={{ borderRadius: "16px", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 150px 50px", padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: "12px", fontWeight: 600, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                <span>ID</span>
                <span>Task</span>
                <span>Last Modified</span>
                <span></span>
              </div>
              
              <div>
                {recentTasks.map((item) => (
                  <div key={item.id} className="hover-lift" style={{ display: "grid", gridTemplateColumns: "180px 1fr 150px 50px", padding: "20px 24px", fontSize: "14px", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.02)", cursor: "pointer" }}>
                    <span style={{ color: "#a1a1aa", fontFamily: "monospace", fontSize: "13px" }}>{item.id}</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", paddingRight: "24px" }}>
                      <span style={{ color: "#fff", fontWeight: 600 }}>{item.task}</span>
                      <span style={{ color: "#71717a", fontSize: "13px", lineHeight: "1.5" }}>{item.description}</span>
                    </div>
                    <span style={{ color: "#a1a1aa", fontSize: "13px" }}>{item.lastModified}</span>
                    <button style={{ background: "none", border: "none", color: "#a1a1aa", cursor: "pointer", textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: "#71717a", backgroundColor: "rgba(0,0,0,0.2)" }}>
                <span>Showing 1-2 out of 2</span>
                <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button style={{ background: "none", border: "none", color: "#71717a", cursor: "pointer" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg></button>
                    <button style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: "6px", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>1</button>
                    <button style={{ background: "none", border: "none", color: "#71717a", cursor: "pointer" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    Tasks per page: 
                    <select style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", padding: "6px 12px", outline: "none", cursor: "pointer" }}>
                      <option>50</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {feedMode === "apps" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {deployedApps.map((app) => (
                <div key={app.id} className="glass-panel hover-lift" style={{ padding: "24px", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "20px", cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#71717a", fontWeight: 600 }}>{app.id}</span>
                      <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#fff", margin: 0 }}>{app.name}</h4>
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: app.tier === "scale" ? "rgba(168,85,247,0.15)" : "rgba(56,189,248,0.15)", color: app.tier === "scale" ? "#d8b4fe" : "#7dd3fc", border: app.tier === "scale" ? "1px solid rgba(168,85,247,0.3)" : "1px solid rgba(56,189,248,0.3)", padding: "4px 12px", borderRadius: "9999px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {app.tier}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px" }}>
                    <span style={{ color: "#a1a1aa" }}>{app.url}</span>
                    <span style={{ color: "#4ade80", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#4ade80", boxShadow: "0 0 10px rgba(74,222,128,0.5)" }} />
                      LIVE
                    </span>
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
