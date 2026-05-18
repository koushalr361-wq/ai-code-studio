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

    // ⚠️ Points to your connected Google Form action URL
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdpbB9V6F9oD2zX6wK_gUz_zE3fVv8N-Z7nKw/formResponse";

    const formData = new FormData();
    formData.append("emailAddress", email); 

    try {
      await fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      
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
      backgroundImage: "radial-gradient(circle at 50% 30%, #111115 0%, #030303 70%)",
      color: "#ffffff", 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center", 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
      padding: "20px" 
    }}>
      <div style={{ 
        textAlign: "center", 
        maxWidth: "580px",
        padding: "40px 20px",
        animation: "fadeIn 1s ease-out"
      }}>
        {/* Premium Badge */}
        <div style={{
          display: "inline-block",
          padding: "6px 14px",
          borderRadius: "100px",
          backgroundColor: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#a0a0a0",
          fontSize: "13px",
          letterSpacing: "0.5px",
          marginBottom: "24px",
          fontWeight: 500
        }}>
          ✨ Introducing AI Code Studio v1.0
        </div>

        {/* Hero Typography */}
        <h1 style={{ 
          fontSize: "56px", 
          fontWeight: 800, 
          marginBottom: "20px", 
          letterSpacing: "-2px",
          lineHeight: "1.1",
          background: "linear-gradient(180deg, #ffffff 0%, #a3a3a3 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Build apps with absolute velocity.
        </h1>
        
        <p style={{ 
          color: "#888888", 
          fontSize: "18px", 
          marginBottom: "40px", 
          lineHeight: "1.6",
          fontWeight: 400
        }}>
          The automated, zero-friction workspace designed for modern creators. Secure your early spot in the engineering ecosystem of tomorrow.
        </p>

        {/* Dynamic State Container with CSS Animation */}
        <div style={{
          minHeight: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          {isSubmitted ? (
            <div style={{ 
              backgroundColor: "rgba(255, 255, 255, 0.01)", 
              border: "1px solid rgba(76, 175, 80, 0.3)", 
              boxShadow: "0 0 30px rgba(76, 175, 80, 0.05)",
              padding: "24px 40px", 
              borderRadius: "16px", 
              textAlign: "center",
              animation: "scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards"
            }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>✦</div>
              <h3 style={{ fontSize: "19px", color: "#4caf50", margin: "0 0 6px 0", fontWeight: 600 }}>Secure Entry Confirmed</h3>
              <p style={{ color: "#666666", margin: 0, fontSize: "14px" }}>Check your WhatsApp shortly for an early access coordinate link.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ 
              display: "flex", 
              gap: "12px", 
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.02)",
              padding: "8px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
            }}>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ 
                  flex: 1, 
                  backgroundColor: "transparent", 
                  border: "none", 
                  padding: "12px 16px", 
                  color: "#ffffff", 
                  fontSize: "16px", 
                  outline: "none"
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{ 
                  backgroundColor: "#ffffff", 
                  color: "#000000", 
                  border: "none", 
                  borderRadius: "10px", 
                  padding: "0 28px", 
                  fontSize: "15px", 
                  fontWeight: 600, 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "46px",
                  boxShadow: "0 4px 12px rgba(255,255,255,0.1)"
                }}
              >
                {loading ? "Verifying..." : "Join VIP Waitlist"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Global CSS Inject for Ultra-Premium Native Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        button:hover {
          opacity: 0.92;
          transform: translateY(-1px);
          transition: all 0.2s ease;
        }
        button:active {
          transform: translateY(0px);
        }
        input::placeholder {
          color: #444444;
        }
      `}</style>
    </div>
  );
}
