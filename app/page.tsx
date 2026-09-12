"use client";

import React, { useState, useEffect, useRef } from "react";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, GitBranch, Copy, Activity, Zap, Layers, Server, ArrowRight } from "lucide-react";

export default function PromptArcWorkspace() {
  const { user, isSignedIn } = useUser();
  const [viewMode, setViewMode] = useState<"landing" | "studio">("landing");
  const [activeMenu, setActiveMenu] = useState<"compute" | "api" | "nodes" | null>(null);
  
  const [engineTemperature, setEngineTemperature] = useState(0.7);
  const [selectedTier, setSelectedTier] = useState<"developer" | "scale">("developer");
  const [systemLoad, setSystemLoad] = useState(42);

  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);
  const [generatedHtmlText, setGeneratedHtmlText] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false); 
  const [copyStatus, setCopyStatus] = useState("Copy Code");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // System Load Simulator
  useEffect(() => {
    const interval = setInterval(() => setSystemLoad(() => Math.floor(41 + Math.random() * 11)), 2000);
    return () => clearInterval(interval);
  }, []);

  // Premium Subtle WebGL Background (Soft Indigo/Violet Dust)
  useEffect(() => {
    if (!canvasRef.current) return;
    let canvas = canvasRef.current;
    let gl = canvas.getContext("webgl");
    if (!gl) return;

    const vsSource = `
      attribute vec3 position;
      attribute float alpha;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      varying float vAlpha;
      void main() {
        vAlpha = alpha;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 2.0;
      }
    `;

    const fsSource = `
      precision mediump float;
      varying float vAlpha;
      void main() {
        float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
        if (dist > 0.5) discard;
        // Soft Indigo Color
        gl_FragColor = vec4(0.39, 0.40, 0.95, vAlpha * (1.0 - dist * 2.0));
      }
    `;

    function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    const shaderProgram = gl.createProgram();
    if (!shaderProgram || !vertexShader || !fragmentShader) return;
    
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);
    const alphas = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const dist = 8 + Math.random() * 30;

      positions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = dist * Math.cos(phi);
      alphas[i] = 0.1 + Math.random() * 0.3; // Very subtle opacity
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const alphaBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, alphaBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, alphas, gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(shaderProgram, "position");
    gl.enableVertexAttribArray(posAttr);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(posAttr, 3, gl.FLOAT, false, 0, 0);

    const alphaAttr = gl.getAttribLocation(shaderProgram, "alpha");
    gl.enableVertexAttribArray(alphaAttr);
    gl.bindBuffer(gl.ARRAY_BUFFER, alphaBuffer);
    gl.vertexAttribPointer(alphaAttr, 1, gl.FLOAT, false, 0, 0);

    const uModelView = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    const uProjection = gl.getUniformLocation(shaderProgram, "projectionMatrix");

    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    function perspectiveMatrix(fovy: number, aspect: number, near: number, far: number) {
      const f = 1.0 / Math.tan(fovy / 2);
      const nf = 1 / (near - far);
      return new Float32Array([
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (far + near) * nf, -1,
        0, 0, (2 * far * near) * nf, 0
      ]);
    }

    let rotationX = 0;
    let rotationY = 0;

    function renderEngine(time: number) {
      if (!gl || !canvas) return;
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      // Deep Zinc Background
      gl.clearColor(0.04, 0.04, 0.045, 1.0); 
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

      rotationX += (mouseY * 0.1 - rotationX) * 0.02;
      rotationY += (mouseX * 0.1 - rotationY) * 0.02;
      const currentRotation = time * 0.00005;

      const projMatrix = perspectiveMatrix(Math.PI / 4, canvas.width / canvas.height, 0.1, 100.0);
      const cX = Math.cos(rotationX);
      const sX = Math.sin(rotationX);
      const cY = Math.cos(rotationY + currentRotation);
      const sY = Math.sin(rotationY + currentRotation);

      const mvMatrix = new Float32Array([
        cY, sX * sY, -cX * sY, 0, 0, cX, sX, 0, sY, -sX * cY, cX * cY, 0, 0, 0, -30.0, 1.0
      ]);

      gl.uniformMatrix4fv(uProjection, false, projMatrix);
      gl.uniformMatrix4fv(uModelView, false, mvMatrix);
      gl.drawArrays(gl.POINTS, 0, particleCount);
      animId = requestAnimationFrame(renderEngine);
    }

    let animId = requestAnimationFrame(renderEngine);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // API Route Handlers
  const handleGenerateApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedHtmlText(null);
    setGenerationLogs(["Initializing compiler environment..."]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setGenerationLogs((prev) => [...prev, "Provisioning sandboxed nodes..."]);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Generation error.");

      setGenerationLogs((prev) => [...prev, "Syncing Tailwind DOM hooks..."]);
      await new Promise((resolve) => setTimeout(resolve, 400));
      setGenerationLogs((prev) => [...prev, "Mounting application preview..."]);

      let rawCode = data.text || data.code || ""; 
      
      if (rawCode.includes("```")) {
        rawCode = rawCode.replace(/```html/gi, "").replace(/```/g, "").trim();
      }

      const completeHtmlCode = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)"></script>
          <style>
            body { background-color: #ffffff; color: #09090b; margin: 0; padding: 24px; font-family: system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
            ::-webkit-scrollbar { display: none; }
          </style>
        </head>
        <body>
          ${rawCode}
        </body>
        </html>
      `;

      setGenerationLogs((prev) => [...prev, "Success: Application compiled."]);
      setGeneratedHtmlText(completeHtmlCode);

    } catch (error: any) {
      setGenerationLogs((prev) => [...prev, `Exception: ${error.message || "Timeout."}`]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = () => {
    if (!generatedHtmlText) return;
    navigator.clipboard.writeText(generatedHtmlText);
    setCopyStatus("Copied ✓");
    setTimeout(() => setCopyStatus("Copy Code"), 2000);
  };

  const pageVariants = {
    initial: { opacity: 0, filter: "blur(8px)" },
    in: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } },
    out: { opacity: 0, filter: "blur(8px)", transition: { duration: 0.4, ease: "easeIn" } }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#09090B] text-zinc-100 font-sans selection:bg-indigo-500/30">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(99,102,241,0.15),transparent_50%)] pointer-events-none z-0" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40 mix-blend-screen" />

      <AnimatePresence mode="wait">
        {/* ================= LANDING PAGE ================= */}
        {viewMode === "landing" && (
          <motion.div key="landing" variants={pageVariants} initial="initial" animate="in" exit="out" className="relative z-10 flex flex-col min-h-screen pb-20">
            
            {/* Elegant Header */}
            <header className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                  <Sparkles size={16} className="text-white" />
                </div>
                <span className="font-semibold text-lg tracking-tight text-white">PromptArc</span>
              </div>
              
              <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-md">
                {["Products", "Solutions", "Resources", "Enterprise"].map((item) => (
                  <span key={item} className="px-5 py-2 rounded-full text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer transition-all">
                    {item}
                  </span>
                ))}
              </nav>

              <div>
                {isSignedIn ? (
                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2 rounded-full backdrop-blur-md">
                    <span className="text-sm text-zinc-400">Workspace: <strong className="text-white font-medium">{user?.firstName}</strong></span>
                    <UserButton afterSignOutUrl="/" />
                  </div>
                ) : (
                  <SignInButton mode="modal">
                    <button className="bg-white text-zinc-950 px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors shadow-lg">
                      Sign In
                    </button>
                  </SignInButton>
                )}
              </div>
            </header>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 mt-16 md:mt-24">
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-center max-w-4xl mx-auto flex flex-col items-center">
                
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-8">
                  <Sparkles size={12} /> Introducing PromptArc 2.0
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
                  Design at the speed <br className="hidden md:block" /> of thought.
                </h1>
                
                <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mb-10">
                  Generate production-ready React and Tailwind interfaces instantly through natural language. Push directly to GitHub. 
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button 
                    onClick={() => setViewMode("studio")}
                    className="flex items-center gap-2 px-8 py-4 font-medium text-zinc-950 bg-white rounded-full hover:scale-105 hover:bg-zinc-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                  >
                    Open Workspace <ArrowRight size={16} />
                  </button>
                  <button className="flex items-center gap-2 px-8 py-4 font-medium text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                    View Documentation
                  </button>
                </div>
              </motion.div>

              {/* Sophisticated Bento Grid */}
              <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto mt-24">
                
                {/* Card 1 */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 flex flex-col gap-8 transition-all hover:bg-white/[0.07]">
                  <div className="flex justify-between items-center text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    <span className="flex items-center gap-2"><Activity size={14}/> Engine Status</span>
                    <span className="text-indigo-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" /> Live
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 shadow-[0_0_10px_#6366f1] transition-all duration-500" style={{ width: `${systemLoad}%` }} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Compute Cluster</h3>
                    <p className="text-sm text-zinc-400">Isolated sandbox instances for zero-latency component compilation.</p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 flex flex-col gap-8 transition-all hover:bg-white/[0.07]">
                  <div className="flex justify-between items-center text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    <span className="flex items-center gap-2"><Terminal size={14}/> Model Weight</span>
                    <span className="text-white bg-white/10 px-2 py-1 rounded-md">t={engineTemperature.toFixed(1)}</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                     <input 
                      type="range" min="0.1" max="1.5" step="0.1" 
                      value={engineTemperature} 
                      onChange={(e) => setEngineTemperature(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer h-1 bg-white/10 rounded-lg appearance-none"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Generation Fluidity</h3>
                    <p className="text-sm text-zinc-400">Control the exactness of the LLM response vs creative liberty.</p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 flex flex-col gap-8 transition-all hover:bg-white/[0.07]">
                  <div className="flex justify-between items-center text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    <span className="flex items-center gap-2"><Layers size={14}/> License Tier</span>
                  </div>
                  <div className="flex-1 flex gap-2 items-center">
                    <button onClick={() => setSelectedTier("developer")} className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${selectedTier === "developer" ? 'bg-indigo-500 text-white shadow-lg' : 'bg-white/5 text-zinc-400 hover:bg-white/10'}`}>Dev</button>
                    <button onClick={() => setSelectedTier("scale")} className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${selectedTier === "scale" ? 'bg-indigo-500 text-white shadow-lg' : 'bg-white/5 text-zinc-400 hover:bg-white/10'}`}>Scale</button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Commercial Access</h3>
                    <p className="text-sm text-zinc-400">Unlock private GitHub repositories and unrestricted API hooks.</p>
                  </div>
                </div>

              </motion.div>
            </main>
          </motion.div>
        )}

        {/* ================= STUDIO WORKSPACE ================= */}
        {viewMode === "studio" && (
          <motion.div key="studio" variants={pageVariants} initial="initial" animate="in" exit="out" className="relative z-10 flex flex-col h-screen overflow-hidden bg-[#09090B]">
            
            {/* Minimalist Studio Header */}
            <header className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-[#09090B]/80 backdrop-blur-xl z-20">
              <div className="flex items-center gap-3">
                <div onClick={() => setViewMode("landing")} className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-6 h-6 rounded-lg bg-indigo-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Sparkles size={12} className="text-white" />
                  </div>
                  <span className="font-semibold text-white tracking-tight">PromptArc</span>
                </div>
                <span className="text-zinc-600">/</span>
                <span className="text-sm font-medium text-zinc-400">Workspace</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-zinc-400">Session: <strong className="text-white font-medium">{user?.firstName || "Dev"}</strong></span>
                <UserButton afterSignOutUrl="/" />
              </div>
            </header>

            <main className="flex-1 flex h-full overflow-hidden">
              
              {/* Left Sidebar - Prompt Config */}
              <div className="w-[400px] flex flex-col gap-6 p-6 border-r border-white/10 bg-[#09090B] z-20">
                <div>
                  <h2 className="text-lg font-semibold text-white mb-1">Architecture Config</h2>
                  <p className="text-sm text-zinc-500 leading-relaxed">Describe the interface you want to generate. The compiler will handle the utility classes.</p>
                </div>

                <form onSubmit={handleGenerateApp} className="flex flex-col gap-4">
                  <textarea 
                    value={prompt} 
                    onChange={(e) => setPrompt(e.target.value)} 
                    placeholder="e.g., Build a modern SaaS pricing section with 3 tiers and a toggle switch..." 
                    className="w-full h-48 bg-zinc-900/50 border border-white/10 rounded-2xl p-4 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none"
                  />
                  <button type="submit" disabled={isGenerating || !prompt} className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${isGenerating || !prompt ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-white text-zinc-950 hover:bg-zinc-200'}`}>
                    {isGenerating ? <div className="animate-spin h-4 w-4 border-2 border-zinc-500 border-t-transparent rounded-full" /> : <Zap size={16} />}
                    {isGenerating ? "Compiling Generation..." : "Generate Interface"}
                  </button>
                </form>

                <div className="flex-1 flex flex-col gap-2 min-h-0 pt-4 border-t border-white/10">
                  <span className="text-xs font-semibold text-zinc-500">System Logs</span>
                  <div className="flex-1 bg-zinc-950 border border-white/5 rounded-xl p-4 font-mono text-[11px] text-zinc-400 overflow-y-auto flex flex-col gap-2">
                    {generationLogs.length === 0 && <span className="text-zinc-600">Waiting for compiler instructions...</span>}
                    {generationLogs.map((log, index) => (
                      <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} key={index}>{log}</motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Live Preview */}
              <div className="flex-1 p-6 flex flex-col gap-4 relative z-10 bg-[#050505]">
                <div className="flex justify-between items-center h-8">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${generatedHtmlText ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-amber-500 shadow-[0_0_10px_#f59e0b]'}`} />
                    <span className="text-sm font-medium text-zinc-400">Sandbox Preview</span>
                  </div>
                  
                  {generatedHtmlText && (
                    <div className="flex gap-2">
                      <button onClick={handleCopyCode} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white hover:bg-white/10 transition-colors">
                        <Copy size={14} /> {copyStatus}
                      </button>
                      <button onClick={() => alert("GitHub API backend wired!")} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-white text-xs font-medium hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20">
                        <GitBranch size={14} /> Export to GitHub
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex-1 rounded-2xl border border-white/10 overflow-hidden relative shadow-2xl bg-[#0A0A0A] flex items-center justify-center">
                  {generatedHtmlText ? (
                    <motion.iframe 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      srcDoc={generatedHtmlText} 
                      title="Generated Frame" 
                      sandbox="allow-scripts allow-same-origin allow-popups"
                      className="w-full h-full border-none bg-white" 
                    />
                  ) : (
                    <div className="text-center flex flex-col items-center gap-4 text-zinc-500">
                      <Server size={32} strokeWidth={1} />
                      <div>
                        <p className="text-sm">Viewport Offline</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
