"use client";

import React, { useState, useEffect } from "react";
import ComplexNavbar from "@/components/complex-navbar";
import ModelSelector from "@/components/model-selector";

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

export default function UnifiedWorkspaceStudio() {
  const { user, isSignedIn } = useUser();
  const [activeTab, setActiveTab] = useState<"web" | "mobile" | "landing">("web");
  const [feedMode, setFeedMode] = useState<"tasks" | "apps">("tasks");
  const [prompt, setPrompt] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clusterCapacity, setClusterCapacity] = useState(44);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  // Telemetry simulation matching live server ticks
  useEffect(() => {
    const interval = setInterval(() => {
      setClusterCapacity(() => Math.floor(39 + Math.random() * 12));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const recentTasks: TaskItem[] = [
    {
      id: "EMT - d42c09",
      task: "micro-analysis",
      description: "create an A website that takes input as photo, scans it and detects the microplastic content in par...",
      lastModified: "206 days ago"
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
    setConsoleLogs(["[INIT] Mapping orchestration network streams..."]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setConsoleLogs((prev) => [...prev, `[ROUTER] Instantiating isolated pipeline sandbox for context [${activeTab.toUpperCase()}]...`]);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setConsoleLogs((prev) => [...prev, "SUCCESS: Workspace deployment framework synced cleanly."]);
    } catch (err) {
      setConsoleLogs((prev) => [...prev, "CRITICAL ERROR: Matrix handshake configuration timeout."]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#030307", minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
      
      {/* Global Embedded Design Transitions & Wave Configurations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        @keyframes contextPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.02); }
        }
        @keyframes soundTick {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        .cosmic-nebula-glow {
          position: absolute;
          top: 15%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 900px;
          height: 400px;
          background: radial-gradient(circle, rgba(56,189,248,0.05) 0%, rgba(147,51,234,0.02) 60%, transparent 100%);
          filter: blur(60px);
          pointer-events: none;
          z-index: 0;
          animation: contextPulse 10s infinite ease-in-out;
        }
        .recording-wave-node {
          width: 2px;
          background-color: #ef4444;
          animation: soundTick 0.5s infinite ease-in-out;
        }
        .blur-discount-strip {
          background: linear-gradient(90deg, rgba(56, 189, 248, 0.12) 0%, rgba(147, 51, 234, 0.12) 100%);
          border: 1px solid rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .dark-console-card {
          background: rgba(9, 9, 11, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
        }
      `}</style>

      {/* Navigation Header */}
      <ComplexNavbar />

      <div className="cosmic-nebula-glow" />

      {/* Main Continuous Flow Dashboard Viewport */}
      <main style={{ flex: 1, width: "100%", maxWidth: "1140px", margin: "0 auto", padding: "48px 24px 96px 24px", zIndex: 10, position: "relative" }}>
        
        {/* Top Promotional Discount Layer Bar */}
        <div style={{ width: "100%", maxWidth: "560px", margin: "0 auto 48px auto" }}>
          <div className="blur-discount-strip" style={{ borderRadius: "9999px", padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: 500, color: "#bae6fd" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#38bdf8" }} />
              FLAT 85% off on Standard monthly plan.
            </div>
            <button type="button" style={{ backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", fontSize: "11px", fontWeight: 700, padding: "6px 14px", borderRadius: "9999px", cursor: "pointer" }}>
              Discount auto applied
            </button>
          </div>
        </div>

        {/* --- MAIN OPERATIONAL INPUT CONSOLE HUB --- */}
        <div style={{ width: "100%", maxWidth: "768px", margin: "0 auto 64px auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: '"Syne", sans-serif', fontSize: "36px", fontWeight: 800, color: "#ffffff", marginBottom: "8px" }}>
            Where ideas become reality
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "14px", fontWeight: 400, margin: "0 0 32px 0" }}>
            Build fully functional apps and websites through simple conversations
          </p>

          <div className="dark-console-card" style={{ borderRadius: "24px", padding: "20px", textAlign: "left" }}>
            
            {/* Horizontal Sub-Routing Context Toggles */}
            <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "16px", marginBottom: "16px" }}>
              <button
                type="button"
                onClick={() => setActiveTab("web")}
                style={{ backgroundColor: activeTab === "web" ? "rgba(255,255,255,0.05)" : "transparent", color: activeTab === "web" ? "#ffffff" : "#71717a", border: "none", borderRadius: "10px", padding: "8px 16px", fontSize: "12px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
              >
                Full Stack App
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("mobile")}
                style={{ backgroundColor: activeTab === "mobile" ? "rgba(255,255,255,0.05)" : "transparent", color: activeTab === "mobile" ? "#ffffff" : "#71717a", border: "none", borderRadius: "10px", padding: "8px 16px", fontSize: "12px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
              >
                Mobile App
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("landing")}
                style={{ backgroundColor: activeTab === "landing" ? "rgba(255,255,255,0.05)" : "transparent", color: activeTab === "landing" ? "#ffffff" : "#71717a", border: "none", borderRadius: "10px", padding: "8px 16px", fontSize: "12px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
              >
                Landing Page
              </button>
            </div>

            <form onSubmit={handleExecuteAgent} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Build me a SaaS app for..."
                style={{ width: "100%", backgroundColor: "transparent", color: "#ffffff", border: "none", outline: "none", resize: "none", height: "80px", fontSize: "14px", fontFamily: "inherit", fontWeight: 400, lineHeight: "1.6" }}
                disabled={isProcessing}
              />

              {/* Lower Active Action Parameter Strip Layout (TYPO REMOVED AND CORRECTED HERE) */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  
                  {/* LLM Routing Model Context Selector Component Container */}
                  <ModelSelector />

                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#bae6fd", backgroundColor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", padding: "6px 12px", borderRadius: "8px" }}>
                    CLUSTER CAP: {clusterCapacity}%
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative" }}>
                  
                  {/* Voice Streaming Interactivity Tool Option */}
                  <button
                    type="button"
                    onMouseEnter={() => setIsRecording(true)}
                    onMouseLeave={() => setIsRecording(false)}
                    style={{ backgroundColor: isRecording ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.01)", border: isRecording ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(255,255,255,0.05)", color: isRecording ? "#ef4444" : "#71717a", padding: "10px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                      <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 19v4M8 23h8"/>
                    </svg>
                  </button>

                  {isRecording && (
                    <div style={{ position: "absolute", bottom: "100%", right: 0, marginBottom: "12px", backgroundColor: "#09090b", border: "1px solid rgba(255,255,255,0.08)", padding: "10px 16px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", fontWeight: 600, color: "#e4e4e7", whiteSpace: "nowrap", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
                      <div style={{ display: "flex", gap: "2px", alignItems: "center", height: "16px" }}>
                        <div className="recording-wave-node" style={{ animationDelay: "0.1s" }} />
                        <div className="recording-wave-node" style={{ animationDelay: "0.3s" }} />
                        <div className="recording-wave-node" style={{ animationDelay: "0.2s" }} />
                      </div>
                      Start voice recording
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing || !prompt.trim()}
                    style={{ backgroundColor: !prompt.trim() || isProcessing ? "rgba(255,255,255,0.01)" : "#ffffff", color: !prompt.trim() || isProcessing ? "#3f3f46" : "#000000", border: !prompt.trim() || isProcessing ? "1px solid rgba(255,255,255,0.03)" : "none", borderRadius: "10px", padding: "10px", cursor: !prompt.trim() || isProcessing ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Dynamic Log Feed Box Module */}
        {consoleLogs.length > 0 && (
          <div style={{ width: "100%", maxWidth: "768px", margin: "-40px auto 48px auto", backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.02)", borderRadius: "16px", padding: "16px", fontFamily: "monospace", fontSize: "11px", color: "#38bdf8", display: "flex", flexDirection: "column", gap: "6px", height: "80px", overflowY: "auto" }}>
            {consoleLogs.map((log, index) => <div key={index}>{log}</div>)}
          </div>
        )}

        {/* --- THE SCROLL-DOWN FEED SUB-ROUTING METRIC TAB LEDGER --- */}
        <div style={{ width: "100%", maxWidth: "768px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Recent Tasks | Deployed Apps Tab Selector Layout */}
          <div style={{ display: "flex", gap: "24px", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "12px" }}>
            <button
              type="button"
              onClick={() => setFeedMode("tasks")}
              style={{ background: "none", border: "none", color: feedMode === "tasks" ? "#ffffff" : "#52525b", fontSize: "14px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Recent Tasks
            </button>
            <button
              type="button"
              onClick={() => setFeedMode("apps")}
              style={{ background: "none", border: "none", color: feedMode === "apps" ? "#ffffff" : "#52525b", fontSize: "14px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
              Deployed Apps
            </button>
          </div>

          {/* Table Data Render Blocks Context Mode Switch Mapping */}
          {feedMode === "tasks" && (
            <div style={{ backgroundColor: "rgba(9,9,11,0.2)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "16px", overflow: "hidden" }}>
              
              {/* Header Label Column Matrix Row */}
              <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 120px", padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.03)", fontSize: "11px", fontWeight: 700, color: "#52525b", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                <span>ID</span>
                <span>Task</span>
                <span style={{ textAlign: "right" }}>Last Modified</span>
              </div>
              
              {/* Execution Line Data Target Loop Rows */}
              <div>
                {recentTasks.map((item) => (
                  <div key={item.id} style={{ display: "grid", gridTemplateColumns: "140px 1fr 120px", padding: "20px 24px", fontSize: "13px", alignItems: "start", borderBottom: "1px solid rgba(255,255,255,0.01)" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#a1a1aa", fontWeight: 600 }}>{item.id}</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", paddingRight: "16px" }}>
                      <span style={{ color: "#e4e4e7", fontWeight: 600 }}>{item.task}</span>
                      <span style={{ color: "#71717a", fontSize: "12px", fontWeight: 400, lineHeight: "1.6" }}>{item.description}</span>
                    </div>
                    <span style={{ textAlign: "right", fontSize: "12px", color: "#71717a", fontWeight: 500 }}>{item.lastModified}</span>
                  </div>
                ))}
              </div>
              
              {/* Pagination Dashboard Ledger Sheet Controller Footer */}
              <div style={{ padding: "16px 24px", backgroundColor: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px", color: "#52525b", fontWeight: 500 }}>
                <span>Showing 1-1 out of 1 records</span>
                <div style={{ display: "flex", gap: "8px", fontSize: "11px" }}>
                  <span>Tasks per page: </span>
                  <select disabled style={{ backgroundColor: "rgba(255,255,255,0.02)", color: "#52525b", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "4px", padding: "2px 6px" }}>
                    <option>50</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Conditional App Distribution Blocks Hub Cards Display */}
          {feedMode === "apps" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {deployedApps.map((app) => (
                <div key={app.id} style={{ backgroundColor: "rgba(9,9,11,0.2)", border: "1px solid rgba(255,255,255,0.03)", padding: "20px", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#52525b", fontWeight: 600 }}>{app.id}</span>
                      <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#e4e4e7", margin: 0 }}>{app.name}</h4>
                    </div>
                    <span style={{ fontSize: "10px", fontWeight: 700, backgroundColor: app.tier === "scale" ? "rgba(168,85,247,0.1)" : "rgba(56,189,248,0.1)", color: app.tier === "scale" ? "#a855f7" : "#38bdf8", border: app.tier === "scale" ? "1px solid rgba(168,85,247,0.2)" : "1px solid rgba(56,189,248,0.2)", padding: "4px 10px", borderRadius: "9999px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {app.tier}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", borderTop: "1px solid rgba(255,255,255,0.02)", paddingTop: "12px" }}>
                    <span style={{ color: "#71717a", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{app.url}</span>
                    <span style={{ color: "#22c55e", fontWeight: 500, display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#22c55e" }} />
                      {app.timestamp}
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
