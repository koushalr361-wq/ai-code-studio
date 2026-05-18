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

  const features = [
    { icon: "⚡", title: "Instant Compilation", desc: "Zero-latency cloud environments provisioned in sub-50ms intervals automatically." },
    { icon: "🛡️", title: "Isolated Runtimes", desc: "Your code executes inside cryptographically secure micro-enclaves." },
    { icon: "🤖", title: "Neural Synthesis", desc: "Context-aware AI structures your architecture mapping seamlessly as you write." }
  ];

  return (
    <div style={{ 
      backgroundColor: "#030303", 
      backgroundImage: "radial-gradient(circle at 50% 20%, #0d0d15 0%, #030303 60%)",
      color: "#ffffff", 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center", 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
      padding: "80px 20px 120px 20px",
      overflowX: "hidden"
    }}>
      
      {/* --- HERO SECTION --- */}
      <div style={{ textAlign: "center", maxWidth: "620px", animation: "fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
        <div className="premium-badge" style={{
          display: "inline-block",
          padding: "6px 14px",
          borderRadius: "100px",
          backgroundColor: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          color: "#888888",
          fontSize: "12px",
          letterSpacing: "1px",
          marginBottom: "28px",
          textTransform: "uppercase",
          fontWeight: 600
        }}>
          ✨ Introducing AI Code Studio v1.0
        </div>

        <h1 style={{ 
          fontSize: "64px", 
          fontWeight: 800, 
          marginBottom: "24px", 
          letterSpacing: "-2.5px",
          lineHeight: "1.05",
          background: "linear-gradient(180deg, #ffffff 30%, #888888 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Build applications with absolute velocity.
        </h1>
        
        <p style={{ color: "#8a8a93", fontSize: "19px", marginBottom: "44px", lineHeight: "1.6", fontWeight: 400 }}>
          The automated, zero-friction engine designed for modern web engineers. Run pipelines, compile states, and deploy Globally in seconds.
        </p>

        {/* Dynamic Action Container */}
        <div style={{ minHeight: "64px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "90px" }}>
          {isSubmitted ? (
            <div style={{ 
              backgroundColor: "rgba(255, 255, 255, 0.01)", 
              border: "1px solid rgba(76, 175, 80, 0.25)", 
              boxShadow: "0 0 40px rgba(76, 175, 80, 0.03)",
              padding: "20px 48px", 
              borderRadius: "16px", 
              animation: "scaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards"
            }}>
              <h3 style={{ fontSize: "18px", color: "#4caf50", margin: "0 0 4px 0", fontWeight: 600 }}>✦ Secure Entry Confirmed</h3>
              <p style={{ color: "#666666", margin: 0, fontSize: "14px" }}>Check your WhatsApp shortly for an early access link.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ 
              display: "flex", gap: "12px", width: "100%", maxWidth: "480px",
              backgroundColor: "rgba(255,255,255,0.01)", padding: "6px", borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 24px 50px rgba(0,0,0,0.6)"
            }}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ flex: 1, backgroundColor: "transparent", border: "none", padding: "12px 14px", color: "#ffffff", fontSize: "15px", outline: "none" }}
              />
              <button type="submit" disabled={loading} style={{ 
                backgroundColor: "#ffffff", color: "#000000", border: "none", borderRadius: "10px", 
                padding: "0 24px", fontSize: "14px", fontWeight: 600, cursor: "pointer", height: "44px",
                boxShadow: "0 4px 20px rgba(255,255,255,0.15)", transition: "all 0.2s ease"
              }}>
                {loading ? "Verifying..." : "Join VIP Waitlist"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* --- PREMIUM INTERACTIVE FEATURES GRID --- */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
        gap: "24px", 
        width: "100%", 
        maxWidth: "960px",
        animation: "fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards"
      }}>
        {features.map((feat, idx) => (
          <div key={idx} className="feature-card" style={{
            backgroundColor: "rgba(255,255,255,0.01)",
            border: "1px solid rgba(255,255,255,0.04)",
            borderRadius: "16px",
            padding: "32px",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            cursor: "pointer"
          }}>
            <div style={{ fontSize: "24px", marginBottom: "16px", background: "rgba(255,255,255,0.03)", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)" }}>
              {feat.icon}
            </div>
            <h4 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "8px", color: "#f4f4f5" }}>{feat.title}</h4>
            <p style={{ color: "#71717a", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>{feat.desc}</p>
          </div>
        ))}
      </div>

      {/* --- GLOBAL STYLING & ANIMATIONS INJECTION --- */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        
        /* Premium Feature Cards Hover Mechanics */
        .feature-card:hover {
          background-color: rgba(255,255,255,0.02) !important;
          border-color: rgba(255,255,255,0.12) !important;
          transform: translateY(-4px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4), 0 0 40px rgba(255,255,255,0.01);
        }
        
        /* Form Button Hover Effects */
        button:hover {
          background-color: #f4f4f5 !important;
          transform: scale(1.02);
        }
        button:active {
          transform: scale(0.99);
        }
        input::placeholder {
          color: #3f3f46;
        }
      `}</style>

    </div>
  );
}
