"use client";

import React, { useState } from "react";
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
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExecuteAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsProcessing(true);
    setGeneratedCode("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: activeTab }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Generation failed.");

      // This captures the AI output and displays it
      setGeneratedCode(data.code);
      triggerToast("Deployment routine successful!");
    } catch (err: any) {
      triggerToast("Error: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#020205", color: "#ffffff", minHeight: "100vh", fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Header */}
      <header style={{ padding: "16px 32px", borderBottom: "1px solid #333", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 800 }}>PROMPTARC</span>
        {isSignedIn ? <UserButton /> : <SignInButton />}
      </header>

      <main style={{ maxWidth: "900px", margin: "48px auto", padding: "0 24px" }}>
        {/* Input Area */}
        <div style={{ background: "#111", padding: "24px", borderRadius: "16px", border: "1px solid #333" }}>
          <form onSubmit={handleExecuteAgent}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your application..."
              style={{ width: "100%", height: "100px", background: "transparent", color: "#fff", border: "none", outline: "none" }}
            />
            <button 
              type="submit" 
              disabled={isProcessing}
              style={{ width: "100%", padding: "12px", background: "#fff", color: "#000", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}
            >
              {isProcessing ? "Processing..." : "Generate Code"}
            </button>
          </form>
        </div>

        {/* Output Area */}
        {generatedCode && (
          <div style={{ marginTop: "32px", background: "#000", padding: "24px", borderRadius: "16px", border: "1px solid #333" }}>
            <h3 style={{ marginBottom: "16px", color: "#71717a" }}>Generated Code:</h3>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: "12px", fontFamily: "monospace" }}>
              {generatedCode}
            </pre>
          </div>
        )}

        {/* Toast Notification */}
        {toastMessage && (
          <div style={{ position: "fixed", bottom: "40px", left: "50%", transform: "translateX(-50%)", background: "#fff", color: "#000", padding: "10px 20px", borderRadius: "8px", fontSize: "12px", fontWeight: 700 }}>
            {toastMessage}
          </div>
        )}
      </main>
    </div>
  );
}
