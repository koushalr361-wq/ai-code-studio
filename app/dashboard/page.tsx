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
  status: "active" | "building";
  tier: "developer" | "scale";
  timestamp: string;
}

export default function WorkspaceStudioDashboard() {
  const [activeTab, setActiveTab] = useState<"web" | "mobile" | "landing">("web");
  const [feedMode, setFeedMode] = useState<"tasks" | "apps">("tasks");
  const [prompt, setPrompt] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clusterCapacity, setClusterCapacity] = useState(42);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  // Simulated live production data arrays built directly from the UI screenshots
  const recentTasks: TaskItem[] = [
    {
      id: "EMT - d42c09",
      task: "micro-analysis-matrix",
      description: "Assembled an optimized canvas that takes an input photo configuration, parses it, and dynamically tracks layout properties in parallel threads.",
      lastModified: "206 days ago"
    },
    {
      id: "EMT - x89a11",
      task: "cross-platform-native-framer",
      description: "Provisioned an isolated execution bundle mapping views directly into a multi-tier sandbox grid framework.",
      lastModified: "210 days ago"
    }
  ];

  const deployedApps: DeployedApp[] = [
    {
      id: "DEP - 00291",
      name: "Auramax headphone website",
      url: "auramax-curated.promptarc.app",
      status: "active",
      tier: "developer",
      timestamp: "Active live link"
    },
    {
      id: "DEP - 00184",
      name: "Ocean research platform",
      url: "ocean-analytics.promptarc.app",
      status: "active",
      tier: "scale",
      timestamp: "Active live link"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setClusterCapacity(() => Math.floor(38 + Math.random() * 11));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleExecuteAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsProcessing(true);
    setConsoleLogs(["[INIT] Securing remote environment parameters for synthesis..."]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setConsoleLogs((prev) => [...prev, `[ROUTER] Mapping system instructions directly to model layer token context...`]);
      await new Promise((resolve) => setTimeout(resolve, 700));
      setConsoleLogs((prev) => [...prev, "SUCCESS: Deployment routine initialized. System layer listening."]);
    } catch (err) {
      setConsoleLogs((prev) => [...prev, "ERROR: Target matrix compilation timeout."]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative" style={{ backgroundColor: "#020205", minHeight: "100vh" }}>
      
      <style>{`
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.01); }
        }
        @keyframes soundWave {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        .anim-ambient-glow {
          position: absolute;
          top: 15%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 900px;
          height: 450px;
          background: radial-gradient(circle, rgba(56,189,248,0.04) 0%, rgba(168,85,247,0.02) 60%, transparent 100%);
          filter: blur(60px);
          pointer-events: none;
          z-index: 0;
          animation: subtlePulse 10s infinite ease-in-out;
        }
        .wave-bar {
          width: 2px;
          background-color: #ef4444;
          animation: soundWave 0.5s infinite ease-in-out;
        }
        .premium-blur-banner {
          background: linear-gradient(90deg, rgba(56, 189, 248, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        .custom-terminal-input {
          background: rgba(10, 10, 14, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
        }
      `}</style>

      {/* Global Specialized Navigation Menu */}
      <ComplexNavbar />

      <div className="anim-ambient-glow" />

      {/* Main Workspace Operational Frame */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 pt-12 pb-24 relative z-10 flex flex-col justify-between">
        
        {/* Top Active Discount Gating Banner */}
        <div className="w-full max-w-xl mx-auto mb-12">
          <div className="premium-blur-banner rounded-full px-6 py-2.5 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-sky-200">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              FLAT 85% off on Standard monthly plan.
            </div>
            <button className="bg-black/50 border border-white/10 text-white text-[11px] font-bold px-4 py-1.5 rounded-full hover:bg-black/80 transition-all">
              Discount auto applied
            </button>
          </div>
        </div>

        {/* Console Workspace Entry Core */}
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2 font-display" style={{ fontFamily: "var(--font-syne)" }}>
            Where ideas become reality
          </h2>
          <p className="text-zinc-400 text-sm mb-8 text-center max-w-md font-light">
            Build fully functional apps and websites through simple conversations
          </p>

          {/* Interactive Console Prompt Input Utility Module */}
          <div className="w-full custom-terminal-input rounded-3xl p-5 shadow-2xl">
            
            {/* Tab Switches (Full Stack, Mobile, Landing Pages) */}
            <div className="flex gap-2 border-b border-white/[0.04] pb-4 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab("web")}
                className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
                  activeTab === "web" ? "bg-white/[0.05] text-white" : "text-zinc-500 hover:text-white"
                }`}
              >
                Full Stack App
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("mobile")}
                className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
                  activeTab === "mobile" ? "bg-white/[0.05] text-white" : "text-zinc-500 hover:text-white"
                }`}
              >
                Mobile App
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("landing")}
                className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
                  activeTab === "landing" ? "bg-white/[0.05] text-white" : "text-zinc-500 hover:text-white"
                }`}
              >
                Landing Page
              </button>
            </div>

            <form onSubmit={handleExecuteAgent} className="flex flex-col gap-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Build me a SaaS app for..."
                className="w-full bg-transparent text-white placeholder-zinc-600 text-sm outline-none resize-none h-20 font-light leading-relaxed"
                disabled={isProcessing}
              />

              {/* Toolbar Mechanics */}
              <div className="flex items-center justify-between border-t border-white/[0.04] pt-4">
                <div className="flex items-center gap-3">
                  
                  {/* Dedicated Core Model Selector Dropdown Tool */}
                  <ModelSelector />

                  <span className="text-[10px] font-bold text-zinc-500 bg-white/[0.01] border border-white/[0.04] px-3 py-1.5 rounded-lg tracking-wider">
                    CLUSTER LOAD: {clusterCapacity}%
                  </span>
                </div>

                <div className="flex items-center gap-2 relative">
                  
                  {/* Voice Context Action Loop Hooks */}
                  <button
                    type="button"
                    onMouseEnter={() => setIsRecording(true)}
                    onMouseLeave={() => setIsRecording(false)}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isRecording ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-white/[0.01] border-white/[0.04] text-zinc-500 hover:text-white"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                      <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 19v4M8 23h8"/>
                    </svg>
                  </button>

                  {isRecording && (
                    <div className="absolute bottom-full right-0 mb-3 bg-zinc-950 border border-white/10 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-semibold text-zinc-300 whitespace-nowrap">
                      <div className="flex gap-0.5 items-center h-4">
                        <div className="wave-bar" style={{ animationDelay: "0.1s" }} />
                        <div className="wave-bar" style={{ animationDelay: "0.3s" }} />
                        <div className="wave-bar" style={{ animationDelay: "0.2s" }} />
                      </div>
                      Start voice recording
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing || !prompt.trim()}
                    className={`p-2.5 rounded-xl transition-all ${
                      !prompt.trim() || isProcessing
                        ? "bg-white/[0.01] border border-white/[0.03] text-zinc-700 cursor-not-allowed"
                        : "bg-white text-black hover:bg-zinc-200 shadow-xl"
                    }`}
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

        {/* --- REPLACED 3 CARDS WITH THE REAL ENTERPRISE RESOURCE LOG UTILITIES --- */}
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
          
          {/* Feed Filter Headers mapping image 3 and 4 layout parameters */}
          <div className="flex items-center gap-6 border-b border-white/[0.04] pb-3">
            <button
              type="button"
              onClick={() => setFeedMode("tasks")}
              className={`text-sm font-semibold flex items-center gap-2 transition-all ${
                feedMode === "tasks" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Recent Tasks
            </button>
            <button
              type="button"
              onClick={() => setFeedMode("apps")}
              className={`text-sm font-semibold flex items-center gap-2 transition-all ${
                feedMode === "apps" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
              Deployed Apps
            </button>
          </div>

          {/* Conditional View Layer: Tasks Matrix Tracker Panel (Screenshot 4 layout) */}
          {feedMode === "tasks" && (
            <div className="bg-zinc-950/40 border border-white/[0.03] rounded-2xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-4 px-6 py-3 border-b border-white/[0.03] text-[11px] font-bold text-zinc-500 tracking-wider uppercase">
                <span>ID</span>
                <span className="col-span-2">Task Parameters</span>
                <span className="text-right">Last Modified</span>
              </div>
              
              <div className="divide-y divide-white/[0.02]">
                {recentTasks.map((item) => (
                  <div key={item.id} className="grid grid-cols-4 px-6 py-5 text-sm items-start hover:bg-white/[0.01] transition-all">
                    <span className="font-mono text-xs text-zinc-400 font-semibold">{item.id}</span>
                    <div className="col-span-2 flex flex-col gap-1 pr-4">
                      <span className="text-zinc-200 font-semibold">{item.task}</span>
                      <span className="text-zinc-500 text-xs font-light leading-relaxed">{item.description}</span>
                    </div>
                    <span className="text-right text-xs text-zinc-500 font-medium">{item.lastModified}</span>
                  </div>
                ))}
              </div>
              
              <div className="px-6 py-4 border-t border-white/[0.02] flex items-center justify-between text-xs text-zinc-500 font-medium bg-black/20">
                <span>Showing 1-2 out of 2 records</span>
                <div className="flex gap-2">
                  <button type="button" className="px-3 py-1.5 bg-white/[0.02] border border-white/[0.05] rounded-lg disabled:opacity-40" disabled>Previous</button>
                  <button type="button" className="px-3 py-1.5 bg-white/[0.02] border border-white/[0.05] rounded-lg disabled:opacity-40" disabled>Next</button>
                </div>
              </div>
            </div>
          )}

          {/* Conditional View Layer: Deployed Web Apps Registry Panel */}
          {feedMode === "apps" && (
            <div className="grid grid-cols-2 gap-4">
              {deployedApps.map((app) => (
                <div key={app.id} className="bg-zinc-950/40 border border-white/[0.03] p-5 rounded-2xl flex flex-col justify-between gap-4 hover:border-white/[0.08] transition-all shadow-xl">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-mono text-zinc-500 font-semibold">{app.id}</span>
                      <h4 className="text-sm font-semibold text-zinc-200">{app.name}</h4>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      app.tier === "scale" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                    }`}>
                      {app.tier}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs border-t border-white/[0.02] pt-3 mt-1">
                    <span className="text-zinc-500 font-light truncate max-w-[180px]">{app.url}</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
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
