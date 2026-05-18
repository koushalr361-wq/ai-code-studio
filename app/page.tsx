"use client";

import React, { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Track which feature card is currently expanded in the popup modal
  const [activeModal, setActiveModal] = useState<number | null>(null);

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

  const modalDetails = [
    {
      title: "1-Click Client Handoff",
      tagline: "Go from Idea to Live URL in Seconds",
      extendedDesc: "Stop wasting billable hours configuring cloud servers, managing complicated DNS records, or troubleshooting build pipelines. VeloStack deploys your web projects to a lightning-fast global edge network the exact second you hit save. Instantly share progress with clients using clean, premium presentation links.",
      metric: "0 manual server maintenance overhead"
    },
    {
      title: "Client-Grade Security",
      tagline: "Enterprise-Level Safety Built-In",
      extendedDesc: "Keep your clients' business data entirely protected without needing a dedicated security team. Every single application you build is automatically shielded inside an isolated cloud sandbox environment. Built-in hack protection and automated SSL renewal come standard for every project.",
      metric: "100% automated uptime protection"
    },
    {
      title: "10x Production Speed",
      tagline: "Smart AI-Powered Workflow Optimization",
      extendedDesc: "Conquer deadlines and onboard more high-paying clients simultaneously. As you build out your software project, our context-aware AI assistant intelligently predicts your next design pattern, automatically generating highly clean, production-ready frontend components and boilerplate code.",
      metric: "Saves roughly 15+ hours per build"
    }
  ];

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
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "500px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(120, 119, 198, 0.4), transparent)", boxShadow: "0 0 100px 20px rgba(120, 119, 198, 0.15)", pointerEvents: "none" }} />

      {/* --- HERO INTERFACE SECTION --- */}
      <div style={{ textAlign: "center", maxWidth: "820px", animation: "fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
        <div className="premium-badge" style={{ display: "inline-block", padding: "6px 16px", borderRadius: "100px", background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)", border: "1px solid rgba(255,255,255,0.06)", color: "#e4e4e7", fontSize: "11px", letterSpacing: "2px", marginBottom: "32px", textTransform: "uppercase", fontWeight: 600, boxShadow: "0 4px 12px rgba(0,0,0,0.5)" }}>
          ✦ INTRODUCING <b>VELOSTACK</b> FOR AGENCIES
        </div>

        <h1 style={{ 
          fontSize: "68px", 
          fontWeight: 900, 
          marginBottom: "28px", 
          letterSpacing: "-3.5px", 
          lineHeight: "1.1", 
          background: "linear-gradient(180deg, #ffffff 40%, #64748b 100%)", 
          WebkitBackgroundClip: "text", 
          WebkitTextFillColor: "transparent",
          textTransform: "uppercase"
        }}>
          THE ENGINE OF MODERN PRODUCTION.
        </h1>
        
        <p style={{ color: "#94a3b8", fontSize: "20px", marginBottom: "54px", lineHeight: "1.6", fontWeight: 400, letterSpacing: "-0.4px", opacity: 0.85, maxWidth: "680px", margin: "0 auto 54px auto" }}>
          The zero-friction automated workspace engineered to scale freelance and agency developers. Launch hyper-fast client sites, secure critical user records, and complete scopes 10x faster.
        </p>

        {/* Action Form */}
        <div style={{ minHeight: "68px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "140px" }}>
          {isSubmitted ? (
            <div style={{ backgroundColor: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(76, 175, 80, 0.3)", boxShadow: "0 0 60px rgba(76, 175, 80, 0.05), inset 0 1px 0 rgba(255,255,255,0.05)", padding: "24px 64px", borderRadius: "16px", animation: "scaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
              <h3 style={{ fontSize: "17px", color: "#4caf50", margin: "0 0 4px 0", fontWeight: 600, letterSpacing: "-0.3px" }}>✦ Business Entry Secured</h3>
              <p style={{ color: "#71717a", margin: 0, fontSize: "14px" }}>We will connect via your WhatsApp workspace shortly with priority workspace keys.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "12px", width: "100%", maxWidth: "480px", backgroundColor: "rgba(10,10,10,0.8)", backdropFilter: "blur(20px)", padding: "7px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 30px 60px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.05)" }}>
              <input type="email" placeholder="Enter your agency or freelance email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ flex: 1, backgroundColor: "transparent", border: "none", padding: "12px 16px", color: "#ffffff", fontSize: "15px", outline: "none" }} />
              <button type="submit" disabled={loading} style={{ backgroundColor: "#ffffff", color: "#000000", border: "none", borderRadius: "11px", padding: "0 28px", fontSize: "14px", fontWeight: 600, cursor: "pointer", height: "44px", boxShadow: "0 4px 24px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.4)", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                {loading ? "Verifying..." : "Get Early Access"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* --- RE-ENGINEERED CONVERSION CARDS GRID --- */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", width: "100%", maxWidth: "1120px", animation: "fadeInUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
        
        {/* Card 1: 1-Click Client Handoff */}
        <div onClick={() => setActiveModal(0)} className="feature-card" style={{ backgroundColor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "24px", padding: "44px", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", cursor: "pointer", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.02)", position: "relative" }}>
          <div className="card-poster" style={{ height: "140px", width: "100%", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)", backgroundColor: "#06060a", marginBottom: "36px", padding: "14px", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", gap: "6px", borderBottom: "1px solid rgba(255,255,255,0.03)", paddingBottom: "8px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#ef4444" }} />
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#eab308" }} />
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#22c55e" }} />
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#38bdf8", display: "flex", alignItems: "center", gap: "6px" }}><span style={{ color: "#4b5563" }}>$</span> npm run deploy --live</div>
            <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#22c55e", opacity: 0.8 }}>✔ Production site live on global edge network!</div>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", background: "linear-gradient(to bottom, transparent 50%, rgba(56, 189, 248, 0.01) 50%)", backgroundSize: "100% 4px", pointerEvents: "none" }} />
          </div>
          <h4 style={{ fontSize: "19px", fontWeight: 600, marginBottom: "12px", color: "#f4f4f5", letterSpacing: "-0.4px" }}>1-Click Client Handoff →</h4>
          <p style={{ color: "#71717a", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>Go from a blank text page to a live production URL in seconds. No complex server maintenance required.</p>
        </div>

        {/* Card 2: Client-Grade Security */}
        <div onClick={() => setActiveModal(1)} className="feature-card" style={{ backgroundColor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "24px", padding: "44px", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", cursor: "pointer", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.02)", position: "relative" }}>
          <div className="card-poster" style={{ height: "140px", width: "100%", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)", backgroundColor: "#06060a", marginBottom: "36px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ width: "70px", height: "70px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "46px", height: "46px", borderRadius: "50%", border: "1px solid rgba(56, 189, 248, 0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#38bdf8", boxShadow: "0 0 12px 4px rgba(56, 189, 248, 0.3)" }} />
              </div>
            </div>
          </div>
          <h4 style={{ fontSize: "19px", fontWeight: 600, marginBottom: "12px", color: "#f4f4f5", letterSpacing: "-0.4px" }}>Client-Grade Security →</h4>
          <p style={{ color: "#71717a", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>Every build structure handles operations inside completely isolated data enclaves to keep user data pristine.</p>
        </div>

        {/* Card 3: 10x Production Speed */}
        <div onClick={() => setActiveModal(2)} className="feature-card" style={{ backgroundColor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "24px", padding: "44px", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", cursor: "pointer", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.02)", position: "relative" }}>
          <div className="card-poster" style={{ height: "140px", width: "100%", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)", backgroundColor: "#06060a", marginBottom: "36px", display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", padding: "20px" }}>
            <div style={{ padding: "8px 12px", backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", fontSize: "10px", fontFamily: "monospace", color: "#a1a1aa" }}>Design.wire</div>
            <div style={{ width: "30px", height: "1px", backgroundColor: "rgba(255,255,255,0.1)", position: "relative" }}>
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#38bdf8", position: "absolute", top: "-1.5px", left: "0", animation: "flowDot 2s ease-in-out infinite" }} />
            </div>
            <div style={{ padding: "8px 12px", backgroundColor: "rgba(56, 189, 248, 0.03)", border: "1px solid rgba(56, 189, 248, 0.2)", borderRadius: "8px", fontSize: "10px", fontFamily: "monospace", color: "#38bdf8" }}>Clean.code</div>
          </div>
          <h4 style={{ fontSize: "19px", fontWeight: 600, marginBottom: "12px", color: "#f4f4f5", letterSpacing: "-0.4px" }}>10x Production Speed →</h4>
          <p style={{ color: "#71717a", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>Our context-aware AI assistant predicts workflows seamlessly, turning quick ideas into clean components instantly.</p>
        </div>
      </div>

      {/* --- GLASS POPUP MODAL --- */}
      {activeModal !== null && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, animation: "fadeIn 0.2s ease-out" }} onClick={() => setActiveModal(null)}>
          <div style={{ backgroundColor: "#09090b", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 30px 70px rgba(0,0,0,0.9), 0 0 50px rgba(120, 119, 198, 0.1)", padding: "40px", borderRadius: "24px", maxWidth: "500px", width: "90%", position: "relative", animation: "scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActiveModal(null)} style={{ position: "absolute", top: "24px", right: "24px", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#a1a1aa", borderRadius: "50%", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "12px" }}>✕</button>
            <span style={{ fontSize: "11px", letterSpacing: "1.5px", color: "#38bdf8", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "8px" }}>{modalDetails[activeModal].tagline}</span>
            <h2 style={{ fontSize: "28px", fontWeight: 700, margin: "0 0 16px 0", letterSpacing: "-1px" }}>{modalDetails[activeModal].title}</h2>
            <p style={{ color: "#a1a1aa", fontSize: "15px", lineHeight: "1.6", margin: "0 0 28px 0" }}>{modalDetails[activeModal].extendedDesc}</p>
            <div style={{ backgroundColor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", padding: "14px 20px", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", color: "#71717a" }}>Workflow Advantage:</span>
              <span style={{ fontSize: "13px", color: "#22c55e", fontFamily: "monospace", fontWeight: 600 }}>{modalDetails[activeModal].metric}</span>
            </div>
          </div>
        </div>
      )}

      {/* --- AUTOMATED GLOW & SLIDE INTERACTIVE ANIMATIONS --- */}
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
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes flowDot {
          0% { left: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        
        /* Premium Glowing Border Interactions */
        .feature-card {
          position: relative;
          overflow: hidden;
        }
        .feature-card:hover {
          background-color: rgba(255,255,255,0.02) !important;
          border-color: rgba(56, 189, 248, 0.25) !important;
          transform: translateY(-6px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.8), 0 0 30px rgba(56, 189, 248, 0.03);
        }
        .feature-card:hover .card-poster {
          border-color: rgba(56, 189, 248, 0.2) !important;
          background-color: #020204 !important;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        form button:hover {
          opacity: 0.92;
          transform: scale(1.01);
          box-shadow: 0 4px 30px rgba(255,255,255,0.3);
        }
        input::placeholder { color: #4b5563; }
      `}</style>
    </div>
  );
}
