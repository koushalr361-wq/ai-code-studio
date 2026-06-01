"use client";

import React, { useState, useEffect } from "react";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";

interface UserTask {
  id: string;
  projectType: string;
  queryDetails: string;
  timestamp: string;
  status: "idle" | "building" | "deployed" | "failed";
}

export default function PromptArcPersonalDashboard() {
  const { user, isSignedIn } = useUser();
  const [activeTab, setActiveTab] = useState<"fullstack" | "mobile" | "landing">("fullstack");
  const [feedMode, setFeedMode] = useState<"tasks" | "apps">("tasks");
  const [prompt, setPrompt] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [activeModel, setActiveModel] = useState("Claude 4.7 Opus");
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Dynamic user data generation built from your real Arduino configuration project context
  const [personalTasks, setPersonalTasks] = useState<UserTask[]>([
    {
      id: "ARC-UNO-9051",
      projectType: "Electronics Hardware Integration",
      queryDetails: "Configuring layout schematics and verifying physical pin configurations for an Arduino Uno dev board pipeline.",
      timestamp: "Active development loop",
      status: "idle"
    }
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSuggestionClick = (text: string) => {
    setPrompt(`Create a customized premium template architecture for a ${text.toLowerCase()} platform...`);
    triggerToast(`Context loaded: ${text}`);
  };

  const handleExecuteAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsProcessing(true);
    setConsoleLogs(["[SYSTEM] Allocating dedicated kernel instance..."]);

    const newTaskID = `ARC-${Math.floor(1000 + Math.random() * 9000)}`;
    const freshNode: UserTask = {
      id: newTaskID,
      projectType: activeTab === "fullstack" ? "Full Stack Application" : activeTab === "mobile" ? "Mobile View Node" : "Premium Landing Matrix",
      queryDetails: prompt,
      timestamp: "Just now",
      status: "building"
    };

    setPersonalTasks(prev => [freshNode, ...prev]);

    try {
      await new Promise(r => setTimeout(r, 800));
      setConsoleLogs(prev => [...prev, `[ROUTER] Mapping instruction sequence directly to ${activeModel}...`]);
      await new Promise(r => setTimeout(r, 900));
      setConsoleLogs(prev => [...prev, `[STAGING] Compiling asset distribution networks onto edge storage layers...`]);
      await new Promise(r => setTimeout(r, 700));
      
      setPersonalTasks(prev => 
        prev.map(t => t.id === newTaskID ? { ...t, status: "deployed" } : t)
      );
      setConsoleLogs(prev => [...prev, `[COMPILER] Build sequence verified cleanly. Generation ${newTaskID} successfully deployed live.`]);
      triggerToast("Application orchestrated and deployed successfully.");
    } catch (err) {
      setPersonalTasks(prev => 
        prev.map(t => t.id === newTaskID ? { ...t, status: "failed" } : t)
      );
      setConsoleLogs(prev => [...prev, "[CRITICAL] Deployment stack dropped due to communication buffer limit."]);
    } finally {
      setIsProcessing(false);
      setPrompt("");
    }
  };

  return (
    <div style={{ backgroundColor: "#020205", color: "#ffffff", minHeight: "100vh", fontFamily: '"Space Grotesk", system-ui, -apple-system, sans-serif', display: "flex", flexDirection: "column", position: "relative", overflowX: "hidden" }}>
      
      {/* --- PRESET INTERFACE KEYFRAME COEFFICIENTS AND ANIMATIONS --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        
        @keyframes gentlePulse {
          0%, 100% { opacity: 0.15; transform: scale(1) translate(-50%, -50%); }
          50% { opacity: 0.25; transform: scale(1.08) translate(-50%, -50%); }
        }
        @keyframes slideUpToast {
          from { transform: translateY(100px) translateX(-50%); opacity: 0; }
          to { transform: translateY(0) translateX(-50%); opacity: 1; }
        }
        @keyframes modalPop {
          from { transform: scale(0.9) translate(-50%, -50%); opacity: 0; }
          to { transform: scale(1) translate(-50%, -50%); opacity: 1; }
        }
        @keyframes rotatingSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes floatEffect {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        .kinetic-backdrop {
          position: absolute;
          top: -150px; left: 50%;
          width: 1200px; height: 600px;
          background: radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, rgba(56, 189, 248, 0.04) 45%, transparent 75%);
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 0;
          animation: gentlePulse 12s ease-in-out infinite;
        }

        .bubbly-surface {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.05);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .bubbly-pop-button {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
        }
        .bubbly-pop-button:hover {
          transform: translateY(-3px) scale(1.02);
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
        }
        .bubbly-pop-button:active {
          transform: scale(0.95);
        }

        .interactive-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          letter-spacing: -1px;
          background: linear-gradient(90deg, #ffffff, #a1a1aa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          cursor: pointer;
        }
        .interactive-logo:hover {
          letter-spacing: 2px;
          background: linear-gradient(90deg, #38bdf8, #a855f7);
          -webkit-background-clip: text;
          text-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
        }

        .spinning-loader { animation: rotatingSpin 1s linear infinite; }
        .floating-banner { animation: floatEffect 4s ease-in-out infinite; }
        .recording-pulse-node { width: 2px; background-color: #ef4444; animation: soundWave 0.5s infinite ease-in-out; border-radius: 2px; }
        @keyframes soundWave { 0%, 100% { height: 4px; } 50% { height: 14px; } }
      `}</style>

      <div className="kinetic-backdrop" />

      {/* --- TOP HEADER NAVIGATION FRAME --- */}
      <header style={{ position: "relative", zIndex: 40, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(9, 9, 11, 0.4)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="bubbly-pop-button" style={{ width: "24px", height: "24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
          </div>
          <span className="interactive-logo">PROMPTARC</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <button type="button" onClick={() => setShowCreditModal(true)} className="bubbly-pop-button" style={{ backgroundColor: "#ffffff", color: "#000000", border: "none", borderRadius: "12px", padding: "8px 20px", fontSize: "13px", fontWeight: 700, boxShadow: "0 10px 20px rgba(255,255,255,0.05)" }}>
            Allocation Ledger
          </button>
          
          <div style={{ display: "flex", gap: "16px", color: "#71717a" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="bubbly-pop-button" onClick={() => triggerToast("Notification registry cache synced clean.")} style={{ cursor: "pointer" }}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </div>

          {isSignedIn ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: "16px" }}>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <SignInButton mode="modal">
              <button type="button" className="bubbly-pop-button" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "8px 18px", borderRadius: "12px", fontSize: "13px", fontWeight: 600 }}>Sign In</button>
            </SignInButton>
          )}
        </div>
      </header>

      {/* --- WORKSPACE CORE MAIN DECK --- */}
      <main style={{ flex: 1, width: "100%", maxWidth: "1140px", margin: "0 auto", padding: "64px 24px 120px 24px", display: "flex", flexDirection: "column", gap: "48px", position: "relative", zIndex: 10 }}>
        
        {/* Dynamic Project Target Node */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="button" onClick={() => triggerToast("Workspace context profile initialized.")} className="bubbly-pop-button" style={{ backgroundColor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "9999px", padding: "8px 20px", display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", fontWeight: 500, color: "#d4d4d8" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "linear-gradient(90deg, #a855f7, #38bdf8)" }} />
            {user?.firstName ? `${user.firstName}'s Session Staging` : "Staging Instance Loop"}
          </button>
        </div>

        {/* Branding Subtitles */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "44px", fontWeight: 700, margin: "0 0 12px 0", letterSpacing: "-1px" }}>
            Where ideas become reality
          </h1>
          <p style={{ color: "#71717a", fontSize: "15px", margin: 0, fontWeight: 400 }}>
            Provision application sandboxes and physical computing structures directly via plain dialogue.
          </p>
        </div>

        {/* --- DYNAMIC INTERACTIVE CONSOLE FRAME --- */}
        <div className="bubbly-surface" style={{ width: "100%", maxWidth: "800px", margin: "0 auto", borderRadius: "24px", padding: "20px" }}>
          
          {/* Internal Tab Switches */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "16px" }}>
            {[
              { id: "fullstack", label: "Full Stack App" },
              { id: "mobile", label: "Mobile Node" },
              { id: "landing", label: "Staging Landing" }
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => { setActiveTab(t.id as any); triggerToast(`Target context altered: ${t.label}`); }}
                style={{
                  backgroundColor: activeTab === t.id ? "rgba(255,255,255,0.04)" : "transparent",
                  color: activeTab === t.id ? "#ffffff" : "#52525b",
                  border: "none", borderRadius: "10px", padding: "8px 16px", fontSize: "12px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleExecuteAgent} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Define structural application targets, schema layouts, or microcontroller processing instructions..."
              style={{ width: "100%", backgroundColor: "transparent", color: "#ffffff", border: "none", outline: "none", resize: "none", height: "80px", fontSize: "14px", fontFamily: "inherit", lineHeight: "1.6" }}
              disabled={isProcessing}
            />

            {/* Parameter Controls Dock Bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                
                {/* Core Model Dropdown System Context Anchor */}
                <div style={{ position: "relative" }}>
                  <button
                    type="button"
                    onClick={() => setShowModelDropdown(!showModelDropdown)}
                    className="bubbly-pop-button"
                    style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "6px 14px", color: "#fff", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#f97316" }} />
                    {activeModel} ▾
                  </button>
                  {showModelDropdown && (
                    <div className="bubbly-surface" style={{ position: "absolute", bottom: "100%", left: 0, marginBottom: "8px", borderRadius: "12px", width: "220px", padding: "6px", zIndex: 100 }}>
                      {["Claude 4.7 Opus", "Claude 4.5 Sonnet"].map((m) => (
                        <div
                          key={m}
                          onClick={() => { setActiveModel(m); setShowModelDropdown(false); triggerToast(`Routing context shifted to ${m}`); }}
                          className="bubbly-pop-button"
                          style={{ padding: "8px 12px", borderRadius: "8px", fontSize: "12px", color: m === activeModel ? "#fff" : "#71717a", backgroundColor: m === activeModel ? "rgba(255,255,255,0.04)" : "transparent" }}
                        >
                          {m}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bubbly-pop-button" onClick={() => setShowSettingsModal(true)} style={{ color: "#52525b", display: "flex", alignItems: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                
                {/* Voice Interactivity Hooks */}
                <button
                  type="button"
                  onMouseEnter={() => setIsRecording(true)}
                  onMouseLeave={() => setIsRecording(false)}
                  className="bubbly-pop-button"
                  style={{ background: "none", border: "none", color: isRecording ? "#ef4444" : "#52525b", display: "flex", alignItems: "center" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 19v4M8 23h8"/></svg>
                </button>

                {isRecording && (
                  <div className="bubbly-surface" style={{ position: "absolute", bottom: "100%", right: "40px", marginBottom: "12px", padding: "10px 16px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "10px", fontSize: "11px", color: "#a1a1aa", whiteSpace: "nowrap" }}>
                    <div style={{ display: "flex", gap: "2px", alignItems: "center", height: "14px" }}>
                      <div className="recording-pulse-node" style={{ animationDelay: "0.1s" }} />
                      <div className="recording-pulse-node" style={{ animationDelay: "0.3s" }} />
                      <div className="recording-pulse-node" style={{ animationDelay: "0.2s" }} />
                    </div>
                    Listening stream node active
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing || !prompt.trim()}
                  style={{
                    backgroundColor: !prompt.trim() || isProcessing ? "rgba(255,255,255,0.01)" : "#ffffff",
                    color: !prompt.trim() || isProcessing ? "#3f3f46" : "#000000",
                    border: "none", width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: !prompt.trim() || isProcessing ? "not-allowed" : "pointer", transition: "all 0.2s"
                  }}
                >
                  {isProcessing ? (
                    <div className="spinning-loader" style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid #000", borderTopColor: "transparent" }} />
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Fully Interactive Suggestion Template Injection Array */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "-16px" }}>
          {["Hardware Synthesis", "API Matrix Framework", "Staging Canvas"].map((text) => (
            <button
              key={text}
              type="button"
              onClick={() => handleSuggestionClick(text)}
              className="bubbly-pop-button"
              style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "10px", padding: "8px 16px", color: "#71717a", fontSize: "12px", fontWeight: 500 }}
            >
              {text}
            </button>
          ))}
        </div>

        {/* Real-time Staging Stream Terminal Log Module */}
        {consoleLogs.length > 0 && (
          <div className="bubbly-surface" style={{ width: "100%", maxWidth: "800px", margin: "0 auto", padding: "16px", borderRadius: "14px", fontFamily: "monospace", fontSize: "11px", color: "#38bdf8", height: "80px", overflowY: "auto" }}>
            {consoleLogs.map((log, i) => <div key={i} style={{ marginBottom: "4px" }}>{log}</div>)}
          </div>
        )}

        {/* --- COMPREHENSIBLY SEPARATED DYNAMIC LEDGER ARRAY --- */}
        <div style={{ width: "100%", maxWidth: "900px", margin: "32px auto 0 auto" }}>
          
          {/* Section Filter Link Array Layout Frame */}
          <div style={{ display: "flex", gap: "32px", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "12px", marginBottom: "24px" }}>
            <button
              type="button"
              onClick={() => setFeedMode("tasks")}
              style={{ background: "none", border: "none", color: feedMode === "tasks" ? "#ffffff" : "#3f3f46", fontSize: "14px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Recent Staging Tasks
            </button>
            <button
              type="button"
              onClick={() => setFeedMode("apps")}
              style={{ background: "none", border: "none", color: feedMode === "apps" ? "#ffffff" : "#3f3f46", fontSize: "14px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
              Live Framework Links
            </button>
          </div>

          {/* Conditional Frame Node: Active Personalized History Stream Sheet */}
          {feedMode === "tasks" && (
            <div className="bubbly-surface" style={{ borderRadius: "16px", overflow: "hidden" }}>
              {/* FIXED: 'tracking' completely updated to standard React TypeScript 'letterSpacing' */}
              <div style={{ display: "grid", gridTemplateColumns: "160px 1fr 140px", padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: "11px", fontWeight: 700, color: "#52525b", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                <span>Session ID</span>
                <span>Context Pipeline Parameters</span>
                <span style={{ textAlign: "right" }}>Staging Status</span>
              </div>

              <div style={{ divideY: "1px solid rgba(255,255,255,0.02)" }}>
                {personalTasks.map((t) => (
                  <div key={t.id} style={{ display: "grid", gridTemplateColumns: "160px 1fr 140px", padding: "20px 24px", fontSize: "13px", alignItems: "start", borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#71717a", fontWeight: 600 }}>{t.id}</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", paddingRight: "16px" }}>
                      <span style={{ color: "#e4e4e7", fontWeight: 600 }}>{t.projectType}</span>
                      <span style={{ color: "#52525b", fontSize: "12px", fontWeight: 400, lineHeight: "1.6" }}>{t.queryDetails}</span>
                    </div>
                    <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
                      <span style={{
                        fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", textTransform: "uppercase",
                        backgroundColor: t.status === "deployed" ? "rgba(16,185,129,0.1)" : t.status === "building" ? "rgba(59,130,246,0.1)" : "rgba(255,255,255,0.02)",
                        color: t.status === "deployed" ? "#10b981" : t.status === "building" ? "#3b82f6" : "#71717a"
                      }}>
                        {t.status}
                      </span>
                      <span style={{ fontSize: "11px", color: "#3f3f46" }}>{t.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conditional Frame Node: Active Connected Deployment App Nodes */}
          {feedMode === "apps" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="bubbly-surface" style={{ padding: "20px", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h4 style={{ fontSize: "14px", fontWeight: 600, margin: 0 }}>Auramax Hub</h4>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#38bdf8", backgroundColor: "rgba(56,189,248,0.1)", padding: "2px 8px", borderRadius: "4px" }}>DEV</span>
                </div>
                <span style={{ fontSize: "12px", color: "#52525b" }}>auramax.promptarc.app</span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#10b981", fontWeight: 600 }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10b981" }} /> Live Edge Deployment
                </div>
              </div>
              
              <div className="bubbly-surface" style={{ padding: "20px", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h4 style={{ fontSize: "14px", fontWeight: 600, margin: 0 }}>Oceanic Registry</h4>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#a855f7", backgroundColor: "rgba(168,85,247,0.1)", padding: "2px 8px", borderRadius: "4px" }}>SCALE</span>
                </div>
                <span style={{ fontSize: "12px", color: "#52525b" }}>oceanic.promptarc.app</span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#10b981", fontWeight: 600 }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10b981" }} /> Live Edge Deployment
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* --- FLOATING TOAST SYSTEM NOTIFICATION WINDOW --- */}
      {toastMessage && (
        <div className="bubbly-surface" style={{ position: "fixed", bottom: "40px", left: "50%", transform: "translateX(-50%)", zIndex: 100, padding: "12px 24px", borderRadius: "12px", fontSize: "13px", fontWeight: 500, color: "#ffffff", animation: "slideUpToast 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}>
          {toastMessage}
        </div>
      )}

      {/* --- CREDIT ACCOUNT BALANCES MODAL LAYER PANEL --- */}
      {showCreditModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", zIndex: 200 }}>
          <div className="bubbly-surface" style={{ position: "absolute", top: "50%", left: "50%", width: "90%", maxWidth: "500px", padding: "32px", borderRadius: "24px", animation: "modalPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", transform: "translate(-50%, -50%)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
              <h3 style={{ fontFamily: "Syne", fontSize: "20px", fontWeight: 700, margin: 0 }}>Framework Resource Allocation</h3>
              <button type="button" onClick={() => setShowCreditModal(false)} style={{ background: "none", border: "none", color: "#71717a", fontSize: "16px", cursor: "pointer" }}>✕</button>
            </div>
            <p style={{ fontSize: "13px", color: "#71717a", lineHeight: "1.6", marginBottom: "20px" }}>
              Your current environment maintains 1,250 prompt-ticks. Scale your distributed runtime layers via direct token provisioning nodes.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button type="button" onClick={() => { setShowCreditModal(false); triggerToast("Sandbox allocation scaled successfully."); }} className="bubbly-pop-button" style={{ width: "100%", padding: "12px", border: "none", borderRadius: "12px", backgroundColor: "#fff", color: "#000", fontWeight: 700 }}>Provision 5,000 Compute Ticks</button>
              <button type="button" onClick={() => setShowCreditModal(false)} className="bubbly-pop-button" style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", color: "#fff", fontWeight: 600 }}>Dismiss Matrix Ledger</button>
            </div>
          </div>
        </div>
      )}

      {/* --- CORE INFRASTRUCTURE CONFIGURATION OPTIONS MODAL --- */}
      {showSettingsModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", zIndex: 200 }}>
          <div className="bubbly-surface" style={{ position: "absolute", top: "50%", left: "50%", width: "90%", maxWidth: "450px", padding: "32px", borderRadius: "24px", animation: "modalPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", transform: "translate(-50%, -50%)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <h3 style={{ fontFamily: "Syne", fontSize: "18px", fontWeight: 700, margin: 0 }}>Gateway Staging Properties</h3>
              <button type="button" onClick={() => setShowSettingsModal(false)} style={{ background: "none", border: "none", color: "#71717a", fontSize: "16px", cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "13px", color: "#a1a1aa" }}>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span>Isolated Sandbox Target Port</span>
                <input type="text" defaultValue="localhost:3000" style={{ backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", padding: "10px", borderRadius: "8px", color: "#fff", outline: "none" }} />
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <input type="checkbox" defaultChecked style={{ accentColor: "#a855f7" }} />
                <span>Enforce strict production TypeScript type-check assertions</span>
              </label>
            </div>
            <button type="button" onClick={() => { setShowSettingsModal(false); triggerToast("Staging gateway properties synchronized."); }} className="bubbly-pop-button" style={{ width: "100%", padding: "12px", border: "none", borderRadius: "12px", backgroundColor: "#fff", color: "#000", fontWeight: 700, marginTop: "24px" }}>
              Save Staging Rules
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
