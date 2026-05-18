"use client";

import React, { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdpbB9V6F9oD2zX6wK_gUz_zE3fVv8N-Z7nKw/formResponse";
    const formData = new FormData();
    formData.append("emailAddress", email); 

    try {
      await fetch(FORM_URL, { method: "POST", mode: "no-cors", body: formData });
      setIsSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      backgroundColor: "#030303", 
      backgroundImage: "radial-gradient(circle at 50% -10%, #161625 0%, #030303 60%)",
      color: "#ffffff", 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center", 
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif', 
      padding: "120px 24px 160px 24px",
      overflowX: "hidden",
      position: "relative"
    }}>
      
      {/* Top Ambient Light Flare Beam */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "500px",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(120, 119, 198, 0.4), transparent)",
        boxShadow: "0 0 100px 20px rgba(120, 119, 198, 0.15)",
        pointerEvents: "none"
      }} />

      {/* --- HERO INTERFACE SECTION --- */}
      <div style={{ textAlign: "center", maxWidth: "680px", animation: "fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
        <div className="premium-badge" style={{
          display: "inline-block",
          padding: "6px 16px",
          borderRadius: "100px",
          background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
          color: "#e4e4e7",
          fontSize: "11px",
          letterSpacing: "2px",
          marginBottom: "32px",
          textTransform: "uppercase",
          fontWeight: 600,
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
        }}>
          ✦ AI Code Studio Enterprise v1.0
        </div>

        <h1 style={{ 
          fontSize: "76px", 
          fontWeight: 800, 
          marginBottom: "28px", 
          letterSpacing: "-3.5px",
          lineHeight: "1.02",
          background: "linear-gradient(180deg, #ffffff 30%, #94a3b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Build applications with absolute velocity.
        </h1>
        
        <p style={{ color: "#94a3b8", fontSize: "20px", marginBottom: "54px", lineHeight: "1.6", fontWeight: 400, letterSpacing: "-0.4px", opacity: 0.85 }}>
          The automated, zero-friction systems architecture platform engineered for teams. Compile instances, isolate runtimes, and deploy globally instantly.
        </p>

        {/* Action Form Component Interface */}
        <div style={{ minHeight: "68px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "140px" }}>
          {isSubmitted ? (
            <div style={{ 
              backgroundColor: "rgba(255, 255, 255, 0.01)", 
              border: "1px solid rgba(76, 175, 80, 0.3)", 
              boxShadow: "0 0 60px rgba(76, 175, 80, 0.05), inset 0 1px 0 rgba(255,255,255,0.05)",
              padding: "24px 64px", 
              borderRadius: "16px", 
              animation: "scaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards"
            }}>
              <h3 style={{ fontSize: "17px", color: "#4caf50", margin: "0 0 6px 0", fontWeight: 600, letterSpacing: "-0.3px" }}>✦ Private Coordinate Unlocked</h3>
              <p style={{ color: "#71717a", margin: 0, fontSize: "14px" }}>Check your WhatsApp workspace shorty for your network access coordinates.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ 
              display: "flex", gap: "12px", width: "100%", maxWidth: "480px",
              backgroundColor: "rgba(10,10,10,0.8)", backdropFilter: "blur(20px)", padding: "7px", borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 30px 60px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.05)"
            }}>
              <input
                type="email"
                placeholder="name@enterprise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ flex: 1, backgroundColor: "transparent", border: "none", padding: "12px 16px", color: "#ffffff", fontSize: "15px", outline: "none" }}
              />
              <button type="submit" disabled={loading} style={{ 
                backgroundColor: "#ffffff", color: "#000000", border: "none", borderRadius: "11px", 
                padding: "0 28px", fontSize: "14px", fontWeight: 600, cursor: "pointer", height: "44px",
                boxShadow: "0 4px 24px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.4)", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              }}>
                {loading ? "Verifying Layer..." : "Request Access Entry"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* --- GOD-TIER CUSTOM APPLICATION INFRASTRUCTURE POSTERS GRID --- */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
        gap: "40px", 
        width: "100%", 
        maxWidth: "1120px",
        animation: "fadeInUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards"
      }}>
        
        {/* Module 1: Live Interactive Code Execution Console UI */}
        <div className="feature-card" style={{ backgroundColor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "24px", padding: "44px", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", cursor: "pointer", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.02)" }}>
          {/* High Fidelity UI Poster: Cloud Server Mock Terminal Window */}
          <div className="card-poster" style={{ height: "140px", width: "100%", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)", backgroundColor: "#06060a", marginBottom: "36px", padding: "14px", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", gap: "6px", borderBottom: "1px solid rgba(255,255,255,0.03)", paddingBottom: "8px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#ef4444" }} />
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#eab308" }} />
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#22c55e" }} />
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#38bdf8", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#4b5563" }}>$</span> instance init --latency=34ms
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#22c55e", opacity: 0.8 }}>
              ✔ cluster-west deployment pipeline complete.
            </div>
            {/* Shifting Scanline Effect across the UI terminal */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", background: "linear-gradient(to bottom, transparent 50%, rgba(56, 189, 248, 0.02) 50%)", backgroundSize: "100% 4px", pointerEvents: "none" }} />
          </div>
          <h4 style={{ fontSize: "19px", fontWeight: 600, marginBottom: "12px", color: "#f4f4f5", letterSpacing: "-0.4px" }}>Instant Compilation Engine</h4>
          <p style={{ color: "#71717a", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>Zero-latency instance environments provisioned dynamically in sub-50ms cycles globally.</p>
        </div>

        {/* Module 2: High Fidelity Node Cryptographic Cluster Matrix Poster */}
        <div className="feature-card" style={{ backgroundColor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "24px", padding: "44px", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", cursor: "pointer", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.02)" }}>
          {/* High Fidelity UI Poster: Cryptographic Matrix Node System */}
          <div className="card-poster" style={{ height: "140px", width: "100%", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)", backgroundColor: "#06060a", marginBottom: "36px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ width: "70px", height: "70px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "46px", height: "46px", borderRadius: "50%", border: "1px solid rgba(147, 51, 234, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(147, 51, 234, 0.1)" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#9333ea", boxShadow: "0 0 12px 4px rgba(147, 51, 234, 0.4)" }} />
              </div>
            </div>
            {/* Minimal Outer Status Orbits */}
            <div style={{ position: "absolute", top: "30px", left: "40%", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.3)" }} />
            <div style={{ position: "absolute", bottom: "35px", right: "38%", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.3)" }} />
          </div>
          <h4 style={{ fontSize: "19px", fontWeight: 600, marginBottom: "12px", color: "#f4f4f5", letterSpacing: "-0.4px" }}>Isolated Secure Runtimes</h4>
          <p style={{ color: "#71717a", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>Every processing operations pipeline maps inside strict micro-enclave architectures.</p>
        </div>

        {/* Module 3: Neural Model Canvas Nodes Interface Mapping Poster */}
        <div className="feature-card" style={{ backgroundColor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "24px", padding: "44px", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", cursor: "pointer", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.02)" }}>
          {/* High Fidelity UI Poster: Node Visual Matrix Diagram Flow */}
          <div className="card-poster" style={{ height: "140px", width: "100%", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)", backgroundColor: "#06060a", marginBottom: "36px", display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", padding: "20px", position: "relative" }}>
            <div style={{ padding: "8px 12px", backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", fontSize: "10px", fontFamily: "monospace", color: "#a1a1aa" }}>Input.sys</div>
            <div style={{ width: "30px", height: "1px", backgroundColor: "rgba(255,255,255,0.1)", position: "relative" }}>
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#f43f5e", position: "absolute", top: "-1.5px", left: "0", animation: "flowDot 2s ease-in-out infinite" }} />
            </div>
            <div style={{ padding: "8px 12px", backgroundColor: "rgba(244, 63, 94, 0.03)", border: "1px solid rgba(244, 63, 94, 0.2)", borderRadius: "8px", fontSize: "10px", fontFamily: "monospace", color: "#f43f5e", boxShadow: "0 0 15px rgba(244, 63, 94, 0.05)" }}>Neural.core</div>
          </div>
          <h4 style={{ fontSize: "19px", fontWeight: 600, marginBottom: "12px", color: "#f4f4f5", letterSpacing: "-0.4px" }}>Neural Synthesis Engine</h4>
          <p style={{ color: "#71717a", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>Contextual parsing models restructure complex application graphs natively dynamically.</p>
        </div>

      </div>

      {/* --- PREMIUM GLOBAL LUXURY NATIVE COMPILATION ANIMATIONS --- */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes flowDot {
          0% { left: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        
        /* God-Tier Card Surface Dynamic Tracking Response */
        .feature-card:hover {
          background-color: rgba(255,255,255,0.015) !important;
          border-color: rgba(255,255,255,0.08) !important;
          transform: translateY(-6px);
          box-shadow: 0 50px 100px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.05);
        }
        
        .feature-card:hover .card-poster {
          border-color: rgba(255,255,255,0.12) !important;
          background-color: #020204 !important;
          box-shadow: 0 12px 24px rgba(0,0,0,0.6);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        button:hover {
          opacity: 0.92;
          transform: scale(1.01);
          box-shadow: 0 4px 30px rgba(255,255,255,0.3);
        }
        button:active {
          transform: scale(0.99);
        }
        input::placeholder {
          color: #4b5563;
        }
      `}</style>

    </div>
  );
}
