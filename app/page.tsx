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
      backgroundImage: "radial-gradient(circle at 50% 15%, #0d0d16 0%, #030303 50%)",
      color: "#ffffff", 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center", 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
      padding: "100px 20px 140px 20px",
      overflowX: "hidden"
    }}>
      
      {/* --- HERO SECTION --- */}
      <div style={{ textAlign: "center", maxWidth: "640px", animation: "fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
        <div className="premium-badge" style={{
          display: "inline-block",
          padding: "6px 14px",
          borderRadius: "100px",
          backgroundColor: "rgba(255,255,255,0.01)",
          border: "1px solid rgba(255,255,255,0.05)",
          color: "#71717a",
          fontSize: "11px",
          letterSpacing: "1.5px",
          marginBottom: "32px",
          textTransform: "uppercase",
          fontWeight: 600
        }}>
          ✦ AI Code Studio Enterprise v1.0
        </div>

        <h1 style={{ 
          fontSize: "68px", 
          fontWeight: 800, 
          marginBottom: "24px", 
          letterSpacing: "-2.5px",
          lineHeight: "1.05",
          background: "linear-gradient(180deg, #ffffff 40%, #71717a 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Build applications with absolute velocity.
        </h1>
        
        <p style={{ color: "#8a8a93", fontSize: "19px", marginBottom: "48px", lineHeight: "1.6", fontWeight: 400, letterSpacing: "-0.2px" }}>
          The automated, zero-friction engine designed for modern web engineers. Run pipelines, compile states, and deploy globally in seconds.
        </p>

        {/* Dynamic Action Container */}
        <div style={{ minHeight: "64px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "110px" }}>
          {isSubmitted ? (
            <div style={{ 
              backgroundColor: "rgba(255, 255, 255, 0.01)", 
              border: "1px solid rgba(76, 175, 80, 0.2)", 
              boxShadow: "0 0 50px rgba(76, 175, 80, 0.03)",
              padding: "22px 54px", 
              borderRadius: "16px", 
              animation: "scaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards"
            }}>
              <h3 style={{ fontSize: "17px", color: "#4caf50", margin: "0 0 4px 0", fontWeight: 600, letterSpacing: "-0.3px" }}>✦ Secure Entry Confirmed</h3>
              <p style={{ color: "#52525b", margin: 0, fontSize: "14px" }}>Check your WhatsApp shortly for an early access coordinate link.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ 
              display: "flex", gap: "12px", width: "100%", maxWidth: "460px",
              backgroundColor: "rgba(255,255,255,0.01)", padding: "6px", borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.05)", boxShadow: "0 24px 50px rgba(0,0,0,0.7)"
            }}>
              <input
                type="email"
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ flex: 1, backgroundColor: "transparent", border: "none", padding: "12px 14px", color: "#ffffff", fontSize: "15px", outline: "none" }}
              />
              <button type="submit" disabled={loading} style={{ 
                backgroundColor: "#ffffff", color: "#000000", border: "none", borderRadius: "10px", 
                padding: "0 24px", fontSize: "14px", fontWeight: 600, cursor: "pointer", height: "44px",
                boxShadow: "0 4px 20px rgba(255,255,255,0.15)", transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
              }}>
                {loading ? "Verifying..." : "Join VIP Waitlist"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* --- RE-ENGINEERED HIGH-CLASS FEATURE CARDS --- */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "32px", 
        width: "100%", 
        maxWidth: "1040px",
        animation: "fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards"
      }}>
        
        {/* Card 1: Compilation */}
        <div className="feature-card" style={{ backgroundColor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "20px", padding: "40px", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", cursor: "pointer" }}>
          {/* Abstract Line Poster Design */}
          <div className="card-poster" style={{ height: "100px", width: "100%", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.04)", backgroundColor: "rgba(0,0,0,0.3)", marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", relative: "linear" }}>
            <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, transparent, #38bdf8, transparent)", animation: "scanLine 2s linear infinite" }} />
          </div>
          <h4 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "10px", color: "#f4f4f5", letterSpacing: "-0.3px" }}>Instant Compilation</h4>
          <p style={{ color: "#71717a", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>Zero-latency cloud environments provisioned in sub-50ms intervals automatically.</p>
        </div>

        {/* Card 2: Runtimes */}
        <div className="feature-card" style={{ backgroundColor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "20px", padding: "40px", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", cursor: "pointer" }}>
          {/* Concentric Geometric Radar Design */}
          <div className="card-poster" style={{ height: "100px", width: "100%", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.04)", backgroundColor: "rgba(0,0,0,0.3)", marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: "1px dashed rgba(255,255,255,0.2)" }} />
            </div>
          </div>
          <h4 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "10px", color: "#f4f4f5", letterSpacing: "-0.3px" }}>Isolated Runtimes</h4>
          <p style={{ color: "#71717a", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>Your operational stacks execute inside cryptographically secure sandbox micro-enclaves.</p>
        </div>

        {/* Card 3: Neural Synthesis */}
        <div className="feature-card" style={{ backgroundColor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "20px", padding: "40px", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", cursor: "pointer" }}>
          {/* Structural Mesh Dot Grid Design */}
          <div className="card-poster" style={{ height: "100px", width: "100%", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.04)", backgroundColor: "rgba(0,0,0,0.3)", marginBottom: "32px", display: "flex", gap: "6px", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)" }} />
            <div style={{ width: "6px", height: "24px", borderRadius: "100px", background: "linear-gradient(180deg, rgba(255,255,255,0.4), transparent)" }} />
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)" }} />
          </div>
          <h4 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "10px", color: "#f4f4f5", letterSpacing: "-0.3px" }}>Neural Synthesis</h4>
          <p style={{ color: "#71717a", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>Context-aware models map your foundational infrastructure seamlessly as you write.</p>
        </div>

      </div>

      {/* --- GLOBAL ANIMATIONS & INTERACTIVE ACTIONS --- */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes scanLine {
          0% { transform: translateX(-80px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(80px); opacity: 0; }
        }
        
        /* High-End Card Response */
        .feature-card:hover {
          background-color: rgba(255,255,255,0.02) !important;
          border-color: rgba(255,255,255,0.1) !important;
          transform: translateY(-5px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
        }
        
        .feature-card:hover .card-poster {
          border-color: rgba(255,255,255,0.15) !important;
          background-color: rgba(255,255,255,0.01) !important;
          transition: all 0.3s ease;
        }

        button:hover {
          opacity: 0.95;
          transform: scale(1.015);
        }
        button:active {
          transform: scale(0.985);
        }
        input::placeholder {
          color: #27272a;
        }
      `}</style>

    </div>
  );
}
