"use client";

import React, { useState, useEffect, useRef } from "react";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, Code2, Copy, GitBranch, ArrowRight, Layers, Activity, Zap, Server, ChevronRight } from "lucide-react";

export default function PromptArcGodScaleWorkspace() {
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

  // WebGL Particle Engine
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
        gl_PointSize = 3.0;
      }
    `;

    const fsSource = `
      precision mediump float;
      varying float vAlpha;
      void main() {
        float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
        if (dist > 0.5) discard;
        gl_FragColor = vec4(0.4, 0.6, 1.0, vAlpha * (1.0 - dist * 2.0));
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

    const particleCount = 2500;
    const positions = new Float32Array(particleCount * 3);
    const alphas = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const dist = 10 + Math.random() * 40;

      positions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = dist * Math.cos(phi);
      alphas[i] = 0.15 + Math.random() * 0.4;
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
        f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, (2 * far * near) * nf, 0
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

      gl.clearColor(0.02, 0.02, 0.04, 1.0); 
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

      rotationX += (mouseY * 0.15 - rotationX) * 0.05;
      rotationY += (mouseX * 0.15 - rotationY) * 0.05;
      const currentRotation = time * 0.0001;

      const projMatrix = perspectiveMatrix(Math.PI / 4, canvas.width / canvas.height, 0.1, 100.0);
      const cX = Math.cos(rotationX);
      const sX = Math.sin(rotationX);
      const cY = Math.cos(rotationY + currentRotation);
      const sY = Math.sin(rotationY + currentRotation);

      const mvMatrix = new Float32Array([
        cY, sX * sY, -cX * sY, 0, 0, cX, sX, 0, sY, -sX * cY, cX * cY, 0, 0, 0, -35.0, 1.0
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

  const handleLaunchStudio = () => {
    setViewMode("studio");
  };

  const handleGenerateApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedHtmlText(null);
    setGenerationLogs(["[SYSTEM] Environment connected. Parsing tokens..."]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setGenerationLogs((prev) => [...prev, "[ROUTER] Provisioning sandboxed node arrays..."]);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Generation error.");

      setGenerationLogs((prev) => [...prev, "[COMPILER] Syncing responsive Tailwind hooks..."]);
      await new Promise((resolve) => setTimeout(resolve, 400));
      setGenerationLogs((prev) => [...prev, "[RUNTIME] Launching isolated viewport..."]);

      let rawCode = data.text || data.code || ""; 
      
      if (rawCode.includes("```")) {
        rawCode = rawCode.replace(/```html/gi, "").replace(/```/g, "").trim();
      }

      // THE FIX: Sandbox click interceptor script injected into the iframe
      const completeHtmlCode = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)"></script>
          <style>
            body { background-color: #050505; color: #ffffff; margin: 0; padding: 24px; font-family: system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
            ::-webkit-scrollbar { display: none; }
          </style>
          <script>
            document.addEventListener('DOMContentLoaded', () => {
              document.addEventListener('click', (e) => {
                const link = e.target.closest('a');
                if (link) {
                  e.preventDefault();
                }
              });
              document.addEventListener('submit', (e) => {
                e.preventDefault();
              });
            });
          </script>
        </head>
        <body>
          ${rawCode}
        </body>
        </html>
      `;

      setGenerationLogs((prev) => [...prev, "SUCCESS: Sandbox compiled."]);
      setGeneratedHtmlText(completeHtmlCode);

    } catch (error: any) {
      setGenerationLogs((prev) => [...prev, `CRITICAL ERROR: ${error.message}`]);
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

  // High-End Framer Motion Variants
  const pageVariants = {
    initial: { opacity: 0, filter: "blur(20px)", scale: 0.95 },
    in: { opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
    out: { opacity: 0, filter: "blur(20px)", scale: 1.05, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    in: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const staggerItem = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#020204] text-white font-sans selection:bg-indigo-500/30 overflow-hidden">
      
      {/* Dynamic 3D WebGL Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-80" />
      
      {/* 21st.dev Style Deep Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-indigo-500/20 blur-[120px] pointer-events-none z-0"></div>

      <AnimatePresence mode="wait">
        
        {/* ======================= LANDING PAGE ======================= */}
        {viewMode === "landing" && (
          <motion.div key="landing" variants={pageVariants} initial="initial" animate="in" exit="out" className="relative z-10 flex flex-col min-h-screen">
            
            {/* Crazy Glass Floating Navbar */}
            <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-6 py-3 flex justify-between items-center" onMouseLeave={() => setActiveMenu(null)}>
              <div className="flex items-center gap-10">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:scale-110 transition-transform">
                    <Zap size={14} className="text-white fill-white" />
                  </div>
                  <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">PromptArc</span>
                </div>
                
                <nav className="hidden md:flex gap-1">
                  {["Compute", "API Gateway", "Topology"].map((item) => (
                    <span key={item} className="px-4 py-2 rounded-full text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/10 cursor-pointer transition-all">
                      {item}
                    </span>
                  ))}
                </nav>
              </div>

              <div className="flex items-center gap-4">
                {isSignedIn ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-zinc-400 hidden sm:block">Session: <strong className="text-white">{user?.firstName}</strong></span>
                    <UserButton afterSignOutUrl="/" />
                  </div>
                ) : (
                  <SignInButton mode="modal">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow">
                      Connect Engine
                    </motion.button>
                  </SignInButton>
                )}
              </div>
            </header>

            {/* Heavy Animated Hero */}
            <main className="flex-1 flex flex-col items-center justify-center pt-32 px-6">
              <motion.div variants={staggerContainer} initial="initial" animate="in" className="text-center max-w-5xl mx-auto flex flex-col items-center">
                
                {/* THE FIX: Replaced AI-style ping badge with a clean, human-designed premium indicator */}
                <motion.div variants={staggerItem} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs font-medium tracking-wide mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  PromptArc Core v2.0
                </motion.div>
                
                <motion.h1 variants={staggerItem} className="text-6xl md:text-[5rem] lg:text-[6.5rem] font-extrabold tracking-tighter leading-[0.9] mb-8">
                  Ship Interfaces <br/> 
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 animate-pulse">
                    At God Scale.
                  </span>
                </motion.h1>
                
                <motion.p variants={staggerItem} className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mb-12">
                  Auto-generate production-ready React & Tailwind UI directly from natural language. Bypass the boilerplate. Deploy instantly to GitHub.
                </motion.p>

                <motion.div variants={staggerItem}>
                  <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(99,102,241,0.6)" }} 
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLaunchStudio}
                    className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 font-bold text-white bg-indigo-500 rounded-full overflow-hidden transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Sparkles className="relative z-10" size={20} />
                    <span className="relative z-10 text-lg">Launch Workspace</span>
                    <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={20} />
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Ultra-Premium Glass Bento Grid */}
              <motion.div variants={staggerContainer} initial="initial" animate="in" className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-32 mb-24">
                
                {[
                  { icon: Activity, title: "Compute Cluster", value: `● ${systemLoad}%`, color: "text-emerald-400", desc: "Isolated sandboxes for zero-latency component compilation." },
                  { icon: Terminal, title: "Engine Weights", value: `t=${engineTemperature.toFixed(1)}`, color: "text-indigo-400", desc: "Slide weights to control exact UI determinism vs abstract layouts.", isSlider: true },
                  { icon: Layers, title: "License Tier", value: selectedTier === "developer" ? "$19" : "$79", color: "text-amber-400", desc: "Push full React and Tailwind configurations directly to your GitHub repo.", isToggles: true }
                ].map((card, i) => (
                  <motion.div key={i} variants={staggerItem} className="group relative rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl p-8 flex flex-col gap-6 overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] rounded-full group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                    
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider z-10">
                      <span className="text-zinc-400 flex items-center gap-2"><card.icon size={14}/> {card.title}</span>
                      <span className={`${card.color} font-mono bg-white/5 px-2 py-1 rounded-md border border-white/5`}>{card.value}</span>
                    </div>

                    <div className="flex-1 flex flex-col justify-center z-10">
                      {card.isSlider ? (
                         <input 
                          type="range" min="0.1" max="1.5" step="0.1" 
                          value={engineTemperature} onChange={(e) => setEngineTemperature(parseFloat(e.target.value))}
                          className="w-full h-1.5 bg-white/10 rounded-full appearance-none outline-none cursor-pointer accent-indigo-500"
                        />
                      ) : card.isToggles ? (
                        <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
                          <button onClick={() => setSelectedTier("developer")} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${selectedTier === "developer" ? 'bg-indigo-500 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>Dev</button>
                          <button onClick={() => setSelectedTier("scale")} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${selectedTier === "scale" ? 'bg-indigo-500 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>Scale</button>
                        </div>
                      ) : (
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 shadow-[0_0_10px_#34d399] transition-all duration-500" style={{ width: `${systemLoad}%` }} />
                        </div>
                      )}
                    </div>
                    
                    <div className="z-10">
                      <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">{card.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </main>
          </motion.div>
        )}

        {/* ======================= STUDIO WORKSPACE ======================= */}
        {viewMode === "studio" && (
          <motion.div key="studio" variants={pageVariants} initial="initial" animate="in" exit="out" className="relative z-10 flex flex-col h-screen">
            
            {/* Minimal Glass Studio Header */}
            <header className="flex justify-between items-center px-6 py-4 bg-black/40 border-b border-white/10 backdrop-blur-2xl z-20">
              <div className="flex items-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} onClick={() => setViewMode("landing")} className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                    <Sparkles size={14} className="text-white" />
                  </div>
                  <span className="font-bold text-lg text-white tracking-tight">PromptArc</span>
                </motion.div>
                <span className="text-zinc-700">/</span>
                <span className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                  <Server size={14} /> Application Studio
                </span>
              </div>
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
                <span className="text-sm text-zinc-400 hidden sm:block">Session: <strong className="text-white">{user?.firstName || "Dev"}</strong></span>
                <UserButton afterSignOutUrl="/" />
              </div>
            </header>

            <main className="flex-1 flex overflow-hidden">
              
              {/* Left Panel - The Matrix Input */}
              <div className="w-[450px] flex flex-col gap-6 p-6 bg-black/60 border-r border-white/10 backdrop-blur-xl z-20">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Code2 className="text-indigo-400" size={20}/> Architecture Config
                  </h2>
                  <p className="text-sm text-zinc-400 leading-relaxed">Inject natural language instructions. The compiler will orchestrate raw Tailwind output.</p>
                </div>

                <form onSubmit={handleGenerateApp} className="flex flex-col gap-4">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <textarea 
                      value={prompt} 
                      onChange={(e) => setPrompt(e.target.value)} 
                      placeholder="e.g., Build a massive Web3 dashboard with crazy glowing glass panels and neon charts..." 
                      className="relative w-full h-48 bg-black/80 border border-white/10 rounded-2xl p-5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/80 transition-all resize-none no-scrollbar shadow-inner"
                    />
                  </div>
                  
                  <motion.button 
                    whileHover={!isGenerating && prompt ? { scale: 1.02, boxShadow: "0 0 20px rgba(255,255,255,0.2)" } : {}}
                    whileTap={!isGenerating && prompt ? { scale: 0.98 } : {}}
                    type="submit" disabled={isGenerating || !prompt} 
                    className={`w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${isGenerating || !prompt ? 'bg-white/5 text-zinc-600 border border-white/5 cursor-not-allowed' : 'bg-white text-black hover:bg-zinc-200'}`}
                  >
                    {isGenerating ? <div className="animate-spin h-5 w-5 border-2 border-zinc-500 border-t-transparent rounded-full" /> : <Zap size={18} />}
                    {isGenerating ? "Compiling Node Graph..." : "Execute Generation"}
                  </motion.button>
                </form>

                <div className="flex-1 flex flex-col gap-3 min-h-0 pt-2">
                  <span className="text-[11px] font-bold text-zinc-500 tracking-widest uppercase flex items-center gap-2">
                    <Terminal size={12}/> System Terminal
                  </span>
                  <div className="flex-1 bg-black/80 border border-white/10 rounded-2xl p-5 font-mono text-[12px] text-zinc-300 overflow-y-auto no-scrollbar flex flex-col gap-2 shadow-inner">
                    {generationLogs.length === 0 && <span className="text-zinc-600 italic">Waiting for compiler instructions...</span>}
                    {generationLogs.map((log, index) => (
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={index} className="flex items-start gap-2">
                        <ChevronRight size={14} className="text-indigo-500 shrink-0 mt-0.5" />
                        <span className={log.includes("SUCCESS") ? "text-emerald-400" : log.includes("ERROR") ? "text-rose-400" : ""}>{log}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel - Live Preview Sandbox */}
              <div className="flex-1 p-6 flex flex-col gap-4 relative z-10 bg-black/20 backdrop-blur-sm">
                <div className="flex justify-between items-center h-10 bg-black/40 border border-white/10 backdrop-blur-md rounded-2xl px-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_15px_currentColor] ${generatedHtmlText ? 'bg-emerald-400 text-emerald-400' : 'bg-amber-400 text-amber-400 animate-pulse'}`} />
                    <span className="text-sm font-bold text-white tracking-wide">Live Sandbox</span>
                  </div>
                  
                  {generatedHtmlText && (
                    <div className="flex gap-3">
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleCopyCode} className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs font-bold text-white hover:bg-white/20 transition-colors">
                        <Copy size={14} /> {copyStatus}
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => alert("GitHub export backend required.")} className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-indigo-500 text-white text-xs font-bold shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                        <GitBranch size={14} /> Export to Repo
                      </motion.button>
                    </div>
                  )}
                </div>

                <div className="flex-1 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl bg-[#050505] flex items-center justify-center relative">
                  {generatedHtmlText ? (
                    <motion.iframe 
                      initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                      srcDoc={generatedHtmlText} 
                      title="Generated Frame" 
                      sandbox="allow-scripts allow-same-origin allow-popups"
                      className="w-full h-full border-none bg-white" 
                    />
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center gap-6 text-zinc-600">
                      <div className="w-24 h-24 rounded-3xl border border-white/5 flex items-center justify-center bg-white/[0.02] shadow-[0_0_50px_rgba(255,255,255,0.02)]">
                        <Layers size={40} strokeWidth={1} />
                      </div>
                      <p className="text-base font-medium tracking-wide">Viewport Offline</p>
                    </motion.div>
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
