"use client";

import React, { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import ModelSelector from "@/components/model-selector";
import ComplexNavbar from "@/components/complex-navbar";

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
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<"web" | "mobile" | "landing">("web");
  const [feedMode, setFeedMode] = useState<"tasks" | "apps">("tasks");
  const [prompt, setPrompt] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

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
    setConsoleLogs(["[INIT] Connection secure. Initializing AI Agent system routing execution grids..."]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setConsoleLogs((prev) => [...prev, `[COMPILE] Parsing token contexts into responsive sandbox frames...`]);
    } catch (err) {
      setConsoleLogs((prev) => [...prev, "ERROR: Compilation window timed out."]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#09090b", color: "#ffffff", minHeight: "100vh", fontFamily: '"Space Grotesk", sans-serif', display: "flex", flexDirection: "column", position: "relative" }}>
      
      {/* Global Style Rules for Hover Effects & Layout Interactivity */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        
        .premium-discount-gradient {
          background: linear-gradient(90deg, #38bdf8 0%, #3b82f6 50%, #a855f7 100%);
          box-shadow: 0 0 30px rgba(56, 189, 248, 0.15);
        }
        .main-input-container {
          background: #18181b;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .suggestion-pill {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.2s ease;
        }
        .suggestion-pill:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }
        .recording-pulse-node {
          width: 2px;
          background-color: #ef4444;
          animation: soundWave 0.5s infinite ease-in-out;
        }
        @keyframes soundWave {
          0%, 100% { height: 4px; }
          50% { height: 14px; }
        }
      `}</style>

      {/* --- TOP BRANDED NAVIGATION HEADER MODULE --- */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid rgba(255, 255, 255, 0.03)", backgroundColor: "#09090b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ backgroundColor: "rgba(255,255,255,0.04)", padding: "8px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </div>
          <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-0.2px" }}>Home</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button type="button" style={{ backgroundColor: "#fef08a", color: "#000000", border: "none", borderRadius: "9999px", padding: "6px 16px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
            Buy Credits
          </button>
          <div style={{ color: "#71717a", cursor: "pointer", display: "flex", alignItems: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* --- CORE WORKSPACE WRAPPER CONSOLE FRAME --- */}
      <main style={{ flex: 1, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "32px 24px 96px 24px", display: "flex", flexDirection: "column", gap: "40px" }}>
        
        {/* Top Active Campaign Discount Strip Indicator Banner */}
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <div className="premium-discount-gradient" style={{ borderRadius: "9999px", padding: "8px 24px", display: "flex", alignItems: "center", gap: "24px" }}>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#ffffff" }}>
              FLAT 85% off on Standard monthly plan.
            </span>
            <button type="button" style={{ backgroundColor: "#000000", border: "none", color: "#ffffff", fontSize: "11px", fontWeight: 700, padding: "6px 16px", borderRadius: "9999px", cursor: "pointer" }}>
              Discount auto applied
            </button>
          </div>
        </div>

        {/* Project Selector Trigger Capsule Layout Element */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="button" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "9999px", padding: "6px 16px", display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#e4e4e7", cursor: "pointer" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "linear-gradient(to right, #f43f5e, #e11d48)" }} />
            {user?.firstName ? `${user.firstName}'s Project` : "Workspace Project"} ▾
          </button>
        </div>

        {/* Dynamic Typography Identity Block */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "40px", fontWeight: 500, color: "#ffffff", margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>
            Where ideas become reality
          </h1>
          <p style={{ color: "#71717a", fontSize: "14px", margin: 0, fontWeight: 400 }}>
            Build fully functional apps and websites through simple conversations
          </p>
        </div>

        {/* --- DYNAMIC TABBED CONVERSATIONAL INPUT BOX --- */}
        <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
          <div className="main-input-container" style={{ borderRadius: "20px", padding: "16px" }}>
            
            {/* Horizontal Sub-Routing Type Selection Anchors */}
            <div style={{ display: "flex", gap: "6px", borderBottom: "1px solid rgba(255,255,255,0.03)", paddingBottom: "12px", marginBottom: "16px" }}>
              <button
                type="button"
                onClick={() => setActiveTab("web")}
                style={{ backgroundColor: activeTab === "web" ? "rgba(255,255,255,0.04)" : "transparent", color: activeTab === "web" ? "#ffffff" : "#71717a", border: "none", borderRadius: "8px", padding: "6px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
              >
                Full Stack App
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("mobile")}
                style={{ backgroundColor: activeTab === "mobile" ? "rgba(255,255,255,0.04)" : "transparent", color: activeTab === "mobile" ? "#ffffff" : "#71717a", border: "none", borderRadius: "8px", padding: "6px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
              >
                Mobile App
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("landing")}
                style={{ backgroundColor: activeTab === "landing" ? "rgba(255,255,255,0.04)" : "transparent", color: activeTab === "landing" ? "#ffffff" : "#71717a", border: "none", borderRadius: "8px", padding: "6px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
              >
                Landing Page
              </button>
            </div>

            <form onSubmit={handleExecuteAgent} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Build me a SaaS app for..."
                style={{ width: "100%", backgroundColor: "transparent", color: "#ffffff", border: "none", outline: "none", resize: "none", height: "72px", fontSize: "14px", fontFamily: "inherit", lineHeight: "1.5" }}
                disabled={isProcessing}
              />

              {/* Lower Operational Utility Control Bar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.03)", paddingTop: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  
                  {/* File Attachment Mock Icon Buttons */}
                  <div style={{ color: "#52525b", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                  </div>
                  <div style={{ color: "#52525b", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  </div>

                  <span style={{ color: "rgba(255,255,255,0.1)", fontSize: "14px" }}>|</span>

                  {/* Core Intelligence Pipeline Dropdown Capsule */}
                  <ModelSelector />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative" }}>
                  <span style={{ fontSize: "11px", fontWeight: 500, color: "#52525b" }}>Public</span>
                  
                  <div style={{ color: "#52525b", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                  </div>

                  {/* Microphone Tool Handler Hooks */}
                  <button
                    type="button"
                    onMouseEnter={() => setIsRecording(true)}
                    onMouseLeave={() => setIsRecording(false)}
                    style={{ background: "none", border: "none", color: isRecording ? "#ef4444" : "#52525b", cursor: "pointer", display: "flex", alignItems: "center" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 19v4M8 23h8"/></svg>
                  </button>

                  {isRecording && (
                    <div style={{ position: "absolute", bottom: "100%", right: 0, marginBottom: "10px", backgroundColor: "#ffffff", color: "#000000", border: "1px solid #e4e4e7", padding: "8px 12px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "10px", fontSize: "11px", fontWeight: 600, whiteSpace: "nowrap", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
                      <div style={{ display: "flex", gap: "2px", alignItems: "center", height: "14px" }}>
                        <div className="recording-pulse-node" style={{ animationDelay: "0.1s" }} />
                        <div className="recording-pulse-node" style={{ animationDelay: "0.3s" }} />
                        <div className="recording-pulse-node" style={{ animationDelay: "0.2s" }} />
                      </div>
                      Start voice recording
                    </div>
                  )}

                  {/* Dynamic Action Trigger Submit Circle */}
                  <button
                    type="submit"
                    disabled={isProcessing || !prompt.trim()}
                    style={{ backgroundColor: !prompt.trim() || isProcessing ? "rgba(255,255,255,0.02)" : "#27272a", color: !prompt.trim() || isProcessing ? "#52525b" : "#ffffff", border: "none", width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: !prompt.trim() || isProcessing ? "not-allowed" : "pointer" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Quick Setup Navigation Suggestion Pills (Below Prompt Frame) */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
            <button type="button" className="suggestion-pill" style={{ borderRadius: "10px", padding: "6px 14px", color: "#71717a", fontSize: "12px", fontWeight: 500, cursor: "pointer" }}>My Counter Part</button>
            <button type="button" className="suggestion-pill" style={{ borderRadius: "10px", padding: "6px 14px", color: "#71717a", fontSize: "12px", fontWeight: 500, cursor: "pointer" }}>Bill Generator</button>
            <button type="button" className="suggestion-pill" style={{ borderRadius: "10px", padding: "6px 14px", color: "#71717a", fontSize: "12px", fontWeight: 500, cursor: "pointer" }}>Word of the Day</button>
          </div>
        </div>

        {/* Dynamic Log Streaming Block */}
        {consoleLogs.length > 0 && (
          <div style={{ width: "100%", maxWidth: "800px", margin: "-20px auto 0 auto", backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.02)", borderRadius: "16px", padding: "16px", fontFamily: "monospace", fontSize: "11px", color: "#38bdf8", height: "60px", overflowY: "auto" }}>
            {consoleLogs.map((log, index) => <div key={index}>{log}</div>)}
          </div>
        )}

        {/* --- CONTINUOUS VERTICAL SCROLL: PRODUCTION RECENT TASKS LEDGER FRAME --- */}
        <div style={{ width: "100%", maxWidth: "800px", margin: "24px auto 0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Tab Filter Links */}
          <div style={{ display: "flex", gap: "24px", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "12px" }}>
            <button
              type="button"
              onClick={() => setFeedMode("tasks")}
              style={{ background: "none", border: "none", color: feedMode === "tasks" ? "#ffffff" : "#52525b", fontSize: "13px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Recent Tasks
            </button>
            <button
              type="button"
              onClick={() => setFeedMode("apps")}
              style={{ background: "none", border: "none", color: feedMode === "apps" ? "#ffffff" : "#52525b", fontSize: "13px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
              Deployed Apps
            </button>
          </div>

          {/* Conditional Display Matrix: Recent Tasks Grid Table */}
          {feedMode === "tasks" && (
            <div style={{ backgroundColor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "16px", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 120px", padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.03)", fontSize: "11px", fontWeight: 700, color: "#52525b", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                <span>ID</span>
                <span>Task</span>
                <span style={{ textAlign: "right" }}>Last Modified</span>
              </div>
              
              <div>
                {recentTasks.map((item) => (
                  <div key={item.id} style={{ display: "grid", gridTemplateColumns: "140px 1fr 120px", padding: "20px 24px", fontSize: "13px", alignItems: "start", borderBottom: "1px solid rgba(255,255,255,0.01)" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#71717a", fontWeight: 600 }}>{item.id}</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", paddingRight: "16px" }}>
                      <span style={{ color: "#e4e4e7", fontWeight: 600 }}>{item.task}</span>
                      <span style={{ color: "#52525b", fontSize: "12px", fontWeight: 400, lineHeight: "1.6" }}>{item.description}</span>
                    </div>
                    <span style={{ textAlign: "right", fontSize: "12px", color: "#52525b", fontWeight: 500 }}>{item.lastModified}</span>
                  </div>
                ))}
              </div>
              
              <div style={{ padding: "16px 24px", backgroundColor: "rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px", color: "#52525b", fontWeight: 500 }}>
                <span>Showing 1-1 out of 1 records</span>
                <div style={{ display: "flex", gap: "8px", fontSize: "11px" }}>
                  <span>Tasks per page: </span>
                  <select disabled style={{ backgroundColor: "transparent", color: "#52525b", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "4px", padding: "2px 6px" }}>
                    <option>50</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Conditional Display Matrix: Deployed Apps Grid Showcase */}
          {feedMode === "apps" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {deployedApps.map((app) => (
                <div key={app.id} style={{ backgroundColor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", padding: "20px", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
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
                    <span style={{ color: "#52525b", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{app.url}</span>
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
