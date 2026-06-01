"use client";

import React, { useState, useEffect } from "react";
import ComplexNavbar from "@/components/complex-navbar";
import ModelSelector from "@/components/model-selector";

export default function WorkspaceStudioDashboard() {
  const [activeTab, setActiveTab] = useState<"web" | "mobile" | "landing">("web");
  const [prompt, setPrompt] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clusterCapacity, setClusterCapacity] = useState(48);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  // Simulates telemetry variations across distributed server instances
  useEffect(() => {
    const interval = setInterval(() => {
      setClusterCapacity(() => Math.floor(42 + Math.random() * 9));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleExecuteAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsProcessing(true);
    setConsoleLogs(["[INIT] Orchestrating autonomous agent infrastructure layers..."]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setConsoleLogs((prev) => [...prev, `[ROUTER] Allocating execution runtime for target architecture: [${activeTab.toUpperCase()}]`]);
      
      await new Promise((resolve) => setTimeout(resolve, 800));
      setConsoleLogs((prev) => [...prev, "[COMPILER] Syncing custom tailwind layout modules and structural nodes..."]);

      // Mock compilation delay to preserve system memory stack
      await new Promise((resolve) => setTimeout(resolve, 700));
      setConsoleLogs((prev) => [...prev, "SUCCESS: Staging build isolated. Workspace synchronized successfully."]);
    } catch (err) {
      setConsoleLogs((prev) => [...prev, "CRITICAL ERROR: Matrix pipeline timeout allocation error."]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-height-screen flex flex-col relative" style={{ backgroundColor: "#020205", minHeight: "100vh" }}>
      
      {/* Premium Keyframe Injector for Cinematic Scale Entries & Recording Waves */}
      <style>{`
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.02); }
        }
        @keyframes soundWave {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        .anim-ambient-glow {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 400px;
          background: radial-gradient(circle, rgba(56,189,248,0.04) 0%, rgba(147,51,234,0.02) 50%, transparent 80%);
          filter: blur(50px);
          pointer-events: none;
          z-index: 0;
          animation: subtlePulse 8s infinite ease-in-out;
        }
        .wave-bar {
          width: 2px;
          background-color: #ef4444;
          animation: soundWave 0.5s infinite ease-in-out;
        }
        .premium-blur-banner {
          background: linear-gradient(90deg, rgba(56, 189, 248, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}</style>

      {/* Global Specialized Navigation Layer */}
      <ComplexNavbar />

      <div className="anim-ambient-glow" />

      {/* Main Workspace Frame Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 pt-12 pb-24 relative z-10 flex flex-col justify-between">
        
        {/* Top Operational Pricing Discount Notification Alert Banner */}
        <div className="w-full max-w-xl mx-auto mb-10 text-center">
          <div className="premium-blur-banner rounded-full px-6 py-2.5 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-sky-200">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              FLAT 85% off on Standard monthly plan.
            </div>
            <button className="bg-black/50 border border-white/10 hover:bg-black/80 text-white text-[11px] font-bold px-4 py-1.5 rounded-full transition-all">
              Discount auto applied
            </button>
          </div>
        </div>

        {/* Core Prompt Routing Work Deck Component */}
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2 font-display" style={{ fontFamily: "var(--font-syne)" }}>
            Where ideas become reality
          </h2>
          <p className="text-zinc-400 text-sm mb-8 text-center max-w-md font-light">
            Build fully functional apps and websites through simple conversations
          </p>

          {/* Prompt Terminal Interface Wrapper Component Box */}
          <div className="w-full bg-zinc-900/30 border border-white/[0.04] backdrop-blur-3xl rounded-3xl p-5 shadow-2xl relative">
            
            {/* Horizontal Segmented Switcher Navigation Tabs */}
            <div className="flex gap-2 border-b border-white/[0.04] pb-4 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab("web")}
                className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
                  activeTab === "web" ? "bg-white/[0.05] text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                Full Stack App
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("mobile")}
                className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
                  activeTab === "mobile" ? "bg-white/[0.05] text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                Mobile App
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("landing")}
                className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
                  activeTab === "landing" ? "bg-white/[0.05] text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                Landing Page
              </button>
            </div>

            <form onSubmit={handleExecuteAgent} className="flex flex-col gap-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`Build me a sleek dark-theme architecture for a ${
                  activeTab === "web" ? "SaaS product analytics panel..." : activeTab === "mobile" ? "iOS cross-platform streaming view..." : "marketing capture system..."
                }`}
                className="w-full bg-transparent text-white placeholder-zinc-600 text-sm outline-none resize-none h-24 font-light leading-relaxed"
                disabled={isProcessing}
              />

              {/* Lower Parameter Toolbar System */}
              <div className="flex items-center justify-between border-t border-white/[0.04] pt-4">
                <div className="flex items-center gap-3">
                  
                  {/* Custom Intelligence Model Selector Layer Component */}
                  <ModelSelector />

                  <span className="text-[11px] font-bold text-zinc-500 bg-white/[0.02] border border-white/[0.04] px-3 py-1.5 rounded-lg tracking-widest uppercase">
                    Cluster Cap: {clusterCapacity}%
                  </span>
                </div>

                <div className="flex items-center gap-2 relative">
                  
                  {/* High-Fidelity Voice Recording Interactivity System */}
                  <button
                    type="button"
                    onMouseEnter={() => setIsRecording(true)}
                    onMouseLeave={() => setIsRecording(false)}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isRecording ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-white/[0.02] border-white/[0.05] text-zinc-400 hover:text-white"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                      <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 19v4M8 23h8"/>
                    </svg>
                  </button>

                  {/* Audio Feedback Pop-up Panel */}
                  {isRecording && (
                    <div className="absolute bottom-full right-0 mb-3 bg-zinc-950 border border-white/10 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-semibold text-zinc-300 whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
                      <div className="flex gap-0.5 items-center h-4">
                        <div className="wave-bar" style={{ animationDelay: "0.1s" }} />
                        <div className="wave-bar" style={{ animationDelay: "0.3s" }} />
                        <div className="wave-bar" style={{ animationDelay: "0.2s" }} />
                        <div className="wave-bar" style={{ animationDelay: "0.4s" }} />
                      </div>
                      Stream Listening Matrix Active
                    </div>
                  )}

                  {/* Submission Action Anchor Button */}
                  <button
                    type="submit"
                    disabled={isProcessing || !prompt.trim()}
                    className={`p-2.5 rounded-xl font-bold text-xs transition-all ${
                      !prompt.trim() || isProcessing
                        ? "bg-white/[0.01] border border-white/[0.03] text-zinc-600 cursor-not-allowed"
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

        {/* Dynamic System Compilation Terminal Log Ledger (Bottom Panel Component) */}
        {consoleLogs.length > 0 && (
          <div className="w-full max-w-3xl mx-auto mt-8 bg-black/40 border border-white/[0.02] rounded-2xl p-4 font-mono text-[11px] text-sky-400 space-y-2 h-24 overflow-y-auto shadow-inner animate-in fade-in duration-300">
            {consoleLogs.map((log, index) => (
              <div key={index} className="leading-relaxed tracking-wide">{log}</div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
