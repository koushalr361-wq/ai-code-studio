"use client";
import React, { useState } from "react";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setOutput(data.output || "Error");
    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "20px" }}>
        {isSignedIn ? <UserButton /> : <SignInButton />}
      </header>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          style={{ width: "100%", height: "100px" }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Generate"}
        </button>
      </form>
      <div style={{ marginTop: "20px" }}>{output}</div>
    </div>
  );
}
