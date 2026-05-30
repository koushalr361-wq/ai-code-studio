"use client";

import React from "react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div style={{
      backgroundColor: "#030303",
      color: "#ffffff",
      minHeight: "100vh",
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "24px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Cinematic Background Glows */}
      <div style={{
        position: "absolute",
        top: "35%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "500px",
        height: "500px",
        background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, rgba(0,0,0,0) 70%)",
        zIndex: 1
      }} />

      {/* Main Hero Content */}
      <div style={{ textAlign: "center", maxWidth: "640px", zIndex: 2 }}>
        <div style={{
          display: "inline-block",
          padding: "6px 14px",
          backgroundColor: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "99px",
          fontSize: "12px",
          fontWeight: 600,
          color: "#38bdf8",
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginBottom: "28px"
        }}>
          ⚡ Next-Gen AI App Generation
        </div>

        <h1 style={{
          fontSize: "64px",
          fontWeight: 800,
          letterSpacing: "-2.5px",
          margin: "0 0 20px 0",
          lineHeight: "1.05",
          background: "linear-gradient(to bottom right, #ffffff 50%, #71717a)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          PROMPTARC
        </h1>

        <p style={{
          fontSize: "18px",
          color: "#a1a1aa",
          lineHeight: "1.6",
          margin: "0 0 44px 0",
          fontWeight: 400
        }}>
          Turn simple text prompts into fully interactive, beautifully styled web applications in seconds. Preview instantly, subscribe, and export straight to GitHub.
        </p>

        {/* Dynamic Action Entry Trigger */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <Link href="/generate" style={{ textDecoration: "none" }}>
            <button style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              padding: "16px 32px",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              boxShadow: "0 4px 25px rgba(255,255,255,0.15)",
              transition: "transform 0.2s ease"
            }}>
              Launch Application Studio 🚀
            </button>
          </Link>
        </div>
      </div>

      {/* Footer System Branding */}
      <footer style={{
        position: "absolute",
        bottom: "32px",
        fontSize: "12px",
        color: "#3f3f46",
        letterSpacing: "0.5px"
      }}>
        © 2026 PROMPTARC. All rights reserved. Built for high-velocity software creation.
      </footer>
    </div>
  );
}
