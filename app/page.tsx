"use client";

import React, { useState } from "react";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";

export default function PromptArcProduction() {
  const { isSignedIn } = useUser();
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Generation failed.");

      setOutput(data.output);
    } catch (err: any) {
      setOutput("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <header className="flex justify-between items-center pb-8 border-b border-zinc-800">
        <h1 className="text-xl font-bold tracking-tighter">PROMPTARC</h1>
        {isSignedIn ? <UserButton afterSignOutUrl="/" /> : <SignInButton />}
      </header>

      <main className="max-w-3xl mx-auto mt-16">
        <form onSubmit={handleExecute} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <textarea
            className="w-full h-32 bg-transparent text-white border-none focus:ring-0 resize-none"
            placeholder="Describe your application architecture..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Launch Generation"}
          </button>
        </form>

        {output && (
          <div className="mt-8 p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
            <h2 className="text-sm font-semibold text-zinc-400 mb-4 uppercase tracking-wider">Generated Output</h2>
            <pre className="text-sm text-zinc-200 whitespace-pre-wrap font-mono">
              {output}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
