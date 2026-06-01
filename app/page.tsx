"use client";

import React, { useState } from "react";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";

export default function Page() {
  const { isSignedIn } = useUser();
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setOutput(data.output || "Error: No output returned.");
    } catch (err) {
      setOutput("Error: Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px" }}>
        <h1>PROMPTARC</h1>
        {isSignedIn ? <UserButton afterSignOutUrl="/" /> : <SignInButton />}
      </header>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <textarea 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          style={{ width: "100%", height: "150px", padding: "10px" }}
          placeholder="Enter prompt..."
        />
        <button type="submit" disabled={loading} style={{ padding: "10px" }}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        {output}
      </div>
    </div>
  );
}
