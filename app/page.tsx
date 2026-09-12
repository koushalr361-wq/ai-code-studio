"use client";

import React, { useState, useEffect, useRef } from "react";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, GitBranch, Copy, Activity, Zap, Layers, Server } from "lucide-react";

export default function PromptArcGodScaleSuite() {
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

  // WebGL Background
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
        gl_PointSize = 2.5;
      }
    `;

    const fsSource = `
      precision mediump float;
      varying float vAlpha;
      void main() {
        float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
        if (dist > 0.5) discard;
        gl_FragColor = vec4(0.22, 0.74, 0.97, vAlpha * (1.0 - dist * 2.0));
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

    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const alphas = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const dist = 6 + Math.random() * 26;

      positions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = dist * Math.cos(phi);
      alphas[i] = 0.25 + Math.random() * 0.55;
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

      gl.clearColor(0.01, 0.01, 0.02, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

      rotationX += (mouseY * 0.18 - rotationX) * 0.05;
      rotationY += (mouseX * 0.18 - rotationY) * 0.05;
      const currentRotation = time * 0.0001;

      const projMatrix = perspectiveMatrix(Math.PI / 4, canvas.width / canvas.height, 0.1, 100.0);
      const cX = Math.cos(rotationX);
      const sX = Math.sin(rotationX);
      const cY = Math.cos(rotationY + currentRotation);
      const sY = Math.sin(rotationY + currentRotation);

      const mvMatrix = new Float32Array([
        cY, sX * sY, -cX * sY, 0, 0, cX, sX, 0, sY, -sX * cY, cX * cY, 0, 0, 0, -25.0, 1.0
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
    setGenerationLogs(["[SYSTEM] Environment successfully connected. Parsing tokens..."]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setGenerationLogs((prev) => [...prev, "[ROUTER] Provisioning active sandboxed node arrays..."]);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Generation error.");

      setGenerationLogs((prev) => [...prev, "[COMPILER] Syncing responsive Tailwind layer hooks..."]);
      await new Promise((resolve) => setTimeout(resolve, 400));
      setGenerationLogs((prev) => [...prev, "[RUNTIME] Launching local framing isolation preview..."]);

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
            body { background-color: #ffffff; color: #000000; margin: 0; padding: 24px; font-family: system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
            ::-webkit-scrollbar { display: none; }
          </style>
        </head>
        <body>
          ${rawCode}
        </body>
        </html>
      `;

      setGenerationLogs((prev) => [...prev, "SUCCESS: Interface sandbox compiled successfully."]);
      setGeneratedHtmlText(completeHtmlCode);

    } catch (error: any) {
      setGenerationLogs((prev) => [...prev, `CRITICAL EXCEPTION: ${error.message || "Timeout."}`]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = () => {
    if (!generatedHtmlText) return;
    navigator.clipboard.writeText(generatedHtmlText);
    setCopyStatus("Copied Asset ✓");
    setTimeout(() => setCopyStatus("Copy Code"), 2000);
  };

  // Page Transition Variants
  const pageVariants = {
    initial: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
    in: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
    out: { opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 0.4, ease: "easeIn" } }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#020205] text-white">
      {/* Absolute WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-80" />

      <AnimatePresence mode="wait">
        {/* ================= LANDING PAGE ================= */}
        {viewMode === "landing" && (
          <motion.div key="landing" variants={pageVariants} initial="initial" animate="in" exit="out" className="relative z-10 flex flex-col min-h-screen">
            
            {/* Elite Header */}
            <header className="flex justify-between items-center px-12 py-8" onMouseLeave={() => setActiveMenu(null)}>
              <div className="flex items-center gap-12">
                <div className="font-display font-bold text-2xl tracking-tighter flex items-center gap-2 text-white">
                  <div className="w-6 h-6 rounded-md bg-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.5)] flex items-center justify-center">
                    <Zap size={14} className="text-black" />
                  </div>
                  PROMPTARC
                </div>
                
                <nav className="flex gap-8 text-sm font-medium text-slate-400">
                  <span className={`cursor-pointer transition-colors ${activeMenu === "compute" ? "text-white" : "hover:text-white"}`} onMouseEnter={() => setActiveMenu("compute")}>Staging Core</span>
                  <span className={`cursor-pointer transition-colors ${activeMenu === "api" ? "text-white" : "hover:text-white"}`} onMouseEnter={() => setActiveMenu("api")}>API Gateway</span>
                  <span className={`cursor-pointer transition-colors ${activeMenu === "nodes" ? "text-white" : "hover:text-white"}`} onMouseEnter={() => setActiveMenu("nodes")}>Network Topology</span>
                </nav>
              </div>

              <div>
                {isSignedIn ? (
                  <div className="flex items-center gap-4 glass-panel px-4 py-2 rounded-full">
                    <span className="text-sm text-slate-400">Cluster: <strong className="text-white">{user?.firstName}</strong></span>
                    <UserButton afterSignOutUrl="/" />
                  </div>
                ) : (
                  <SignInButton mode="modal">
                    <button className="glass-panel px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all text-white">
                      Connect Engine
                    </button>
                  </SignInButton>
                )}
              </div>
            </header>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center px-6">
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-cyan-400 text-xs font-bold tracking-widest uppercase mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  PromptArc Core v2.0 Live
                </div>
                
                <h1 className="font-display text-7xl md:text-[6rem] font-extrabold tracking-tighter leading-[0.9] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 pb-2">
                  Ship Interfaces <br/> <span className="text-glow-cyan text-cyan-400">At God Scale.</span>
                </h1>
                
                <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto mb-12">
                  Auto-generate production-ready React & Tailwind UI directly from natural language. Bypass the boilerplate. Deploy instantly to GitHub.
                </p>

                <button 
                  onClick={() => setViewMode("studio")}
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black bg-white rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-cyan-400 rounded-full group-hover:w-72 group-hover:h-72 opacity-10"></span>
                  <Sparkles className="mr-2" size={18} />
                  Launch Application Studio
                </button>
              </motion.div>

              {/* Bento Box Grid */}
              <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-24 mb-16">
                
                {/* Card 1 */}
                <div className="glass-panel glass-panel-hover rounded-[2rem] p-8 flex flex-col gap-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full group-hover:bg-cyan-500/20 transition-all duration-700"></div>
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                    <span className="text-cyan-400 flex items-center gap-2"><Activity size={14}/> Compute Cluster</span>
                    <span className="text-green-400 font-mono">● {systemLoad}%</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-3">
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 shadow-[0_0_10px_#38bdf8] transition-all duration-500" style={{ width: `${systemLoad}%` }} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-2">Instant Compilation</h3>
                    <p className="text-sm text-slate-400">Deep layout generation parsing directly into isolated sandboxes.</p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="glass-panel glass-panel-hover rounded-[2rem] p-8 flex flex-col gap-6">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                    <span className="text-purple-400 flex items-center gap-2"><Terminal size={14}/> Engine Weights</span>
                    <span className="text-white font-mono">t={engineTemperature.toFixed(1)}</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-4">
                    <input 
                      type="range" min="0.1" max="1.5" step="0.1" 
                      value={engineTemperature} 
                      onChange={(e) => setEngineTemperature(parseFloat(e.target.value))}
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase">
                      <span>Deterministic</span>
                      <span>Creative</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-2">Hyper-Tuned LLM</h3>
                    <p className="text-sm text-slate-400">Slide weights to control exact UI determinism vs abstract layouts.</p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="glass-panel glass-panel-hover rounded-[2rem] p-8 flex flex-col gap-6">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                    <span className="text-emerald-400 flex items-center gap-2"><Layers size={14}/> License Tier</span>
                    <span className="text-white">{selectedTier === "developer" ? "$19/mo" : "$79/mo"}</span>
                  </div>
                  <div className="flex-1 flex gap-2 items-center">
                    <button onClick={() => setSelectedTier("developer")} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${selectedTier === "developer" ? 'bg-white/10 text-white border border-white/20' : 'text-slate-500 hover:bg-white/5'}`}>Dev</button>
                    <button onClick={() => setSelectedTier("scale")} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${selectedTier === "scale" ? 'bg-white/10 text-white border border-white/20' : 'text-slate-500 hover:bg-white/5'}`}>Scale</button>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-2">One-Click Export</h3>
                    <p className="text-sm text-slate-400">Push full React and Tailwind configurations directly to your GitHub repo.</p>
                  </div>
                </div>

              </motion.div>
            </main>
          </motion.div>
        )}

        {/* ================= STUDIO WORKSPACE ================= */}
        {viewMode === "studio" && (
          <motion.div key="studio" variants={pageVariants} initial="initial" animate="in" exit="out" className="relative z-10 flex flex-col h-screen overflow-hidden">
            
            {/* Studio Header */}
            <header className="flex justify-between items-center px-6 py-4 glass-panel border-b-0 border-white/5 bg-[#040407]/80">
              <div className="flex items-center gap-4">
                <div onClick={() => setViewMode("landing")} className="font-display font-bold text-lg tracking-tight flex items-center gap-2 cursor-pointer hover:text-cyan-400 transition-colors">
                  <Zap size={16} className="text-cyan-400" />
                  PROMPTARC
                </div>
                <span className="text-white/20">/</span>
                <span className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  <Server size={14} /> Application Studio
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-500 font-medium">Session: <strong className="text-white">{user?.firstName || "Dev"}</strong></span>
                <UserButton afterSignOutUrl="/" />
              </div>
            </header>

            <main className="flex-1 flex h-full overflow-hidden">
              
              {/* Left Sidebar - Prompt Config */}
              <div className="w-[420px] flex flex-col gap-6 p-6 glass-panel border-r-0 border-y-0 rounded-none bg-[#020204]/90 z-20">
                <div>
                  <h2 className="font-display text-xl font-bold mb-1 flex items-center gap-2"><Sparkles size={16} className="text-cyan-400"/> Architecture Matrix</h2>
                  <p className="text-xs text-slate-400 leading-relaxed">Inject natural language instructions. The compiler will orchestrate raw Tailwind output.</p>
                </div>

                <form onSubmit={handleGenerateApp} className="flex flex-col gap-3">
                  <textarea 
                    value={prompt} 
                    onChange={(e) => setPrompt(e.target.value)} 
                    placeholder="e.g., Build a cyberpunk themed dashboard with glowing bento box cards..." 
                    className="w-full h-40 bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none no-scrollbar"
                  />
                  <button type="submit" disabled={isGenerating || !prompt} className={`w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${isGenerating || !prompt ? 'bg-white/5 text-slate-500 cursor-not-allowed' : 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02]'}`}>
                    {isGenerating ? <div className="animate-spin h-4 w-4 border-2 border-slate-500 border-t-transparent rounded-full" /> : <Zap size={16} />}
                    {isGenerating ? "Compiling Node Graph..." : "Execute Generation"}
                  </button>
                </form>

                <div className="flex-1 flex flex-col gap-2 min-h-0">
                  <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">System Terminal</span>
                  <div className="flex-1 bg-[#010102] border border-white/5 rounded-2xl p-4 font-mono text-[11px] text-cyan-400 overflow-y-auto no-scrollbar flex flex-col gap-2 shadow-inner">
                    {generationLogs.length === 0 && <span className="text-slate-600 italic">Waiting for compiler instructions...</span>}
                    {generationLogs.map((log, index) => (
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={index}>{log}</motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Live Preview */}
              <div className="flex-1 p-6 flex flex-col gap-4 relative z-10 bg-[#000000]/40">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor] ${generatedHtmlText ? 'bg-green-500 text-green-500' : 'bg-yellow-500 text-yellow-500'}`} />
                    <span className="text-sm font-medium text-slate-300">Sandboxed Environment</span>
                  </div>
                  
                  {generatedHtmlText && (
                    <div className="flex gap-3">
                      <button onClick={handleCopyCode} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 hover:border-white/20 transition-all text-white">
                        <Copy size={14} /> {copyStatus}
                      </button>
                      <button onClick={() => alert("GitHub API backend wired!")} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(56,189,248,0.1)]">
                        {/* FIX: Using GitBranch instead of Github */}
                        <GitBranch size={14} /> Export to GitHub
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex-1 rounded-[2rem] border border-white/10 overflow-hidden relative shadow-2xl bg-[#040407] flex items-center justify-center">
                  {generatedHtmlText ? (
                    <motion.iframe 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      srcDoc={generatedHtmlText} 
                      title="Generated Frame" 
                      sandbox="allow-scripts allow-same-origin allow-popups"
                      className="w-full h-full border-none bg-white" 
                    />
                  ) : (
                    <div className="text-center flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                        <Terminal size={24} className="text-slate-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold mb-1 text-slate-300">Viewport Offline</h4>
                        <p className="text-xs text-slate-600">Awaiting code synthesis from the LLM core.</p>
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
