"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";

export default function ComplexNavbar() {
  const { isSignedIn } = useUser();
  const [activeTab, setActiveTab] = useState<"capabilities" | "pricing" | null>(null);

  return (
    <header 
      onMouseLeave={() => setActiveTab(null)}
      className="relative z-50 flex items-center justify-between px-16 py-8 border-b border-white/[0.02]"
    >
      <div className="flex items-center gap-12">
        <Link href="/" className="text-xl font-extrabold tracking-tighter font-display text-white">
          PROMPTARC
        </Link>
        
        <nav className="flex gap-8 text-sm font-medium text-zinc-400">
          <span 
            className="cursor-pointer hover:text-white transition-colors py-2"
            onMouseEnter={() => setActiveTab("capabilities")}
          >
            Capabilities ▾
          </span>
          <Link href="/showcase" className="hover:text-white transition-colors py-2">Community Showcase</Link>
          <Link href="/pricing" className="hover:text-white transition-colors py-2">Pricing Matrix</Link>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        {isSignedIn ? (
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-xs bg-white text-black font-semibold px-5 py-2.5 rounded-xl hover:bg-zinc-200 transition-all">
              Go to Workspace
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <SignInButton mode="modal">
            <button className="text-xs bg-white/[0.03] border border-white/[0.08] font-semibold px-5 py-2.5 rounded-xl hover:bg-white/[0.06] transition-all">
              Connect Framework
            </button>
          </SignInButton>
        )}
      </div>

      {/* --- MEGA DROPDOWN MENU CORE LAYOUT --- */}
      {activeTab === "capabilities" && (
        <div className="absolute top-full left-16 w-[640px] bg-zinc-950/90 border border-white/[0.06] backdrop-blur-3xl rounded-3xl p-8 grid grid-cols-2 gap-8 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div>
            <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-3">AI Agent Generation</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="hover:text-white cursor-pointer transition-colors">⚡ Full-Stack Web App Provisioning</li>
              <li className="hover:text-white cursor-pointer transition-colors">📱 Cross-Platform Mobile Native Compile</li>
              <li className="hover:text-white cursor-pointer transition-colors">🎨 High-Converting Marketing Landing Pages</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">Infrastructure System</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="hover:text-white cursor-pointer transition-colors">🐙 Direct Active GitHub Repository Sync</li>
              <li className="hover:text-white cursor-pointer transition-colors">🌐 Edge Staging Network Deployments</li>
              <li className="hover:text-white cursor-pointer transition-colors">🔒 Sandbox Isolation Frameworks</li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
