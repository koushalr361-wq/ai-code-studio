"use client";

import React, { useState, useEffect, useRef } from "react";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";

export default function PromptArcUltimateStudio() {
  const { user, isSignedIn } = useUser();
  const [viewMode, setViewMode] = useState<"landing" | "studio">("landing");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  
  // Studio Core Operational States
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);
  const [generatedHtmlText, setGeneratedHtmlText] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false); 
  const [copyStatus, setCopyStatus] = useState("Copy Code");

  // WebGL Spatial Rendering Reference Node
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // --- THREE.JS LIVE WEBGL ACCELERATED PARTICLE FIELD ENGINE ---
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
        gl_PointSize = 2.4;
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

    const particleCount = 1800;
    const positions = new Float32Array(particleCount * 3);
    const alphas = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const dist = 10 + Math.random() * 25;

      positions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = dist * Math.cos(phi);
      alphas[i] = 0.15 + Math.random() * 0.55;
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

      rotationX += (mouseY * 0.25 - rotationX) * 0.05;
      rotationY += (mouseX * 0.25 - rotationY) * 0.05;
      const currentRotation = time * 0.00012;

      const projMatrix = perspectiveMatrix(Math.PI / 4, canvas.width / canvas.height, 0.1, 100.0);
      
      const cX = Math.cos(rotationX);
      const sX = Math.sin(rotationX);
      const cY = Math.cos(rotationY + currentRotation);
      const sY = Math.sin(rotationY + currentRotation);

      const mvMatrix = new Float32Array([
        cY, sX * sY, -cX * sY, 0,
        0, cX, sX, 0,
        sY, -sX * cY, cX * cY, 0,
        0, 0, -28.0, 1.0
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

  // Executes the custom cinematic scaling-exit translation sequence
  const handleLaunchStudio = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setViewMode("studio");
      setIsTransitioning(false);
    }, 700);
  };

  const handleGenerateApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedHtmlText(null);
    setGenerationLogs(["[SYSTEM] Executing structural context parsing algorithms..."]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setGenerationLogs((prev) => [...prev, "[ROUTER] Mapping prompt arc parameters into sandbox grid layers..."]);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Generation engine execution exception.");

      setGenerationLogs((prev) => [...prev, "[COMPILER] Structuring dark-mode Tailwind CSS distribution hooks..."]);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setGenerationLogs((prev) => [...prev, "[RUNTIME] Mounting dynamic environment preview frames..."]);

      let rawCode = data.code || "";
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
            body { background-color: #030303; color: #ffffff; margin: 0; padding: 24px; font-family: system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
            ::-webkit-scrollbar { display: none; }
          </style>
        </head>
        <body>
          ${rawCode}
        </body>
        </html>
      `;

      setGenerationLogs((prev) => [...prev, "SUCCESS: Sandbox system fully synchronized. Target layer is live."]);
      setGeneratedHtmlText(completeHtmlCode);

    } catch (error: any) {
      setGenerationLogs((prev) => [...prev, `CRITICAL ERROR: ${error.message || "Connection failure."}`]);
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

  return (
    <div style={{
      backgroundColor: "#020205",
      color: "#ffffff",
      minHeight: "100vh",
      fontFamily: '"Clash Display", "Space Grotesk", "Plus Jakarta Sans", -apple-system, sans-serif',
      WebkitFontSmoothing: "antialiased",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden"
    }}>
      
      {/* 3D Core WebGL Spatial Canvas Layer */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />
      
      {/* --- MASTER STARTUP CSS ANIMATIONS AND HOVER GRAPHICS LAYER --- */}
      <style>{`
        @import url('[https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap](https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap)');
        
        @keyframes godScaleExit {
          0% { opacity: 1; transform: scale(1) translateY(0) rotateX(0deg); filter: blur(0px); }
          100% { opacity: 0; transform: scale(0.9) translateY(-40px) rotateX(12deg); filter: blur(8px); }
        }
        @keyframes godScaleEntry {
          0% { opacity: 0; transform: scale(1.08) translateY(30px) rotateX(-8deg); filter: blur(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0) rotateX(0deg); filter: blur(0px); }
        }
        @keyframes dropdownSlide {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .anim-god-exit { animation: godScaleExit 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-god-entry { animation: godScaleEntry 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .nav-matrix-dropdown { animation: dropdownSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        /* Hyper-Premium Roundness and Blur Properties mapping the image architecture */
        .premium-glass-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.005) 100%);
          border: 1px solid rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border-radius: 28px !important; /* Premium Continuous Rounding */
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .premium-glass-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(255, 255, 255, 0.09);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
        }
        .cyan-highlight-glow {
          border: 1px solid rgba(56, 189, 248, 0.45) !important;
          box-shadow: 0 0 50px rgba(56, 189, 248, 0.12), inset 0 0 20px rgba(56, 189, 248, 0.04) !important;
        }
        .wireframe-vector-frame {
          height: 120px; width: 100%; border-radius: 18px; background: rgba(255, 255, 255, 0.008);
          border: 1px dashed rgba(255, 255, 255, 0.04); display: flex; align-items: center; justifyContent: center; position: relative;
        }
      `}</style>

      {/* --- VIEW ROUTE 1: LANDING ENTRY FLOW --- */}
      {viewMode === "landing" && (
        <div className={isTransitioning ? "anim-god-exit" : "anim-god-entry"} style={{
          flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 1, perspective: "1000px"
        }}>
          
          {/* TOP COMPLEX HEADER PANEL PLATFORM SYSTEM */}
          <header 
            onMouseLeave={() => setIsNavHovered(false)}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "32px 64px", position: "relative", zIndex: 100 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
              {/* Logo Link Hook with hovering context routing properties */}
              <div 
                onMouseEnter={() => setIsNavHovered(true)}
                style={{ fontWeight: 800, fontSize: "17px", letterSpacing: "-1px", cursor: "pointer", transition: "color 0.3s" }}
              >
                PROMPTARC ▾
              </div>

              {/* --- COMPLEX CORE NAVIGATION LAYER METRICS --- */}
              <nav style={{ display: "flex", gap: "28px", fontSize: "13px", fontWeight: 500, color: "#94a3b8" }}>
                <span style={{ cursor: "pointer" }} onClick={handleLaunchStudio}>Workspace Studio</span>
                <span style={{ cursor: "pointer" }}>Infrastructure Nodes</span>
                <span style={{ cursor: "pointer" }}>Cluster Grid API</span>
              </nav>
            </div>

            <div>
              {isSignedIn ? (
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 500 }}>Node Session: <strong style={{ fontWeight: 600, color: "#ffffff" }}>{user?.firstName}</strong></span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <SignInButton mode="modal">
                  <button style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#ffffff", padding: "10px 24px", borderRadius: "14px", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.3s" }}>Sign In</button>
                </SignInButton>
              )}
            </div>

            {/* --- HOVER MATRICES EXPLORATION DROPDOWN PANEL --- */}
            {isNavHovered && (
              <div className="nav-matrix-dropdown" style={{
                position: "absolute", top: "80px", left: "64px", width: "540px", backgroundColor: "rgba(9, 9, 12, 0.85)",
                border: "1px solid rgba(255, 255, 255, 0.06)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)",
                borderRadius: "20px", padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", boxShadow: "0 40px 80px rgba(0,0,0,0.6)"
              }}>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase", tracking: "1px", marginBottom: "4px" }}>Platform Engine Core</div>
                  <p style={{ color: "#a1a1aa", fontSize: "12px", margin: 0, lineHeight: "1.4" }}>Access active H100 GPU computing clusters, neural network node maps, and translation logs parsing prompt instructions template definitions.</p>
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#a855f7", textTransform: "uppercase", tracking: "1px", marginBottom: "4px" }}>System Documentation</div>
                  <p style={{ color: "#a1a1aa", fontSize: "12px", margin: 0, lineHeight: "1.4" }}>Review system specs for automated dark-mode Tailwind layout properties, state synchronization data frameworks, and remote deployment pipelines.</p>
                </div>
              </div>
            )}
          </header>

          {/* Hero Core Content Center Block */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 24px" }}>
            <h1 style={{ fontSize: "72px", fontWeight: 800, letterSpacing: "-3.5px", margin: "0 0 24px 0", textAlign: "center", background: "linear-gradient(to bottom, #ffffff 40%, #64748b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 0.9 }}>
              PROMPTARC
            </h1>
            
            <p style={{ fontSize: "15px", color: "#94a3b8", lineHeight: "1.6", margin: "0 0 44px 0", textAlign: "center", maxWidth: "600px", fontWeight: 400, letterSpacing: "-0.1px" }}>
              Auto-generates clean HTML/Tailwind from text, mates with development, building expine, and ribeotvised action actions into a proper, premium startup-grade platform.
            </p>

            <div style={{ marginBottom: "88px" }}>
              <button 
                onClick={handleLaunchStudio} 
                style={{ 
                  backgroundColor: "#ffffff", color: "#000000", padding: "16px 40px", borderRadius: "16px", 
                  fontSize: "14px", fontWeight: 600, cursor: "pointer", border: "none", boxShadow: "0 10px 40px rgba(255,255,255,0.2)",
                  transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)" 
                }}
              >
                Launch Application Studio 🚀
              </button>
            </div>

            {/* --- THE THREE PREMIUM ROUNDED COMPONENT BOXES WITH HOVER SEQUENCES --- */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px", width: "100%", maxWidth: "1140px", paddingBottom: "60px" }}>
              
              {/* Rectangle Card 1 (Active Glow Matrix Layout) */}
              <div className="premium-glass-card cyan-highlight-glow" style={{ padding: "36px", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className="wireframe-vector-frame">
                  <div style={{ position: "absolute", width: "50px", height: "50px", borderRadius: "12px", border: "2px solid #38bdf8", boxShadow: "0 0 25px rgba(56,189,248,0.3)" }} />
                  <div style={{ position: "absolute", width: "100px", height: "1px", background: "linear-gradient(90deg, transparent, #38bdf8, transparent)" }} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>AI Prompt Engine</div>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 8px 0", letterSpacing: "-0.5px" }}>Instant Compilation</h3>
                  <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0, lineHeight: "1.6" }}>Auto-generates clean within/Tailwind from text. Responsive design, Ready-to-deploy logic.</p>
                </div>
              </div>

              {/* Rectangle Card 2 */}
              <div className="premium-glass-card" style={{ padding: "36px", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className="wireframe-vector-frame" style={{ flexDirection: "column", gap: "8px", padding: "20px" }}>
                  <div style={{ width: "35%", height: "4px", background: "rgba(255,255,255,0.15)", borderRadius: "2px", alignSelf: "flex-start" }} />
                  <div style={{ width: "85%", height: "4px", background: "rgba(255,255,255,0.03)", borderRadius: "2px" }} />
                  <div style={{ width: "60%", height: "4px", background: "rgba(255,255,255,0.03)", borderRadius: "2px" }} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>Visualization Sandbox</div>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 8px 0", letterSpacing: "-0.5px" }}>Real-Time Previews</h3>
                  <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0, lineHeight: "1.6" }}>See your creation instantly within a secure canvas. Interactive state, Mock data injection.</p>
                </div>
              </div>

              {/* Rectangle Card 3 */}
              <div className="premium-glass-card" style={{ padding: "36px", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className="wireframe-vector-frame">
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#a855f7", boxShadow: "0 0 16px #a855f7" }} />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>DevOps Integration</div>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 8px 0", letterSpacing: "-0.5px" }}>One-Click Deploy</h3>
                  <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0, lineHeight: "1.6" }}>Push directly to GitHub repos and launch live links. Clerk auth, Production hosting config.</p>
                </div>
              </div>

            </div>
          </div>

          <footer style={{ textAlign: "center", paddingBottom: "32px", fontSize: "11px", color: "#3f3f46", letterSpacing: "0.5px", fontWeight: 600 }}>
            © 2026 PROMPTARC CORE OPERATIONS ARCHITECTURE LAYER FULLY UNLOCKED.
          </footer>
        </div>
      )}

      {/* --- VIEW ROUTE 2: UNTRUNCATED HARDWARE WORKSPACE STUDIO ENTRY --- */}
      {viewMode === "studio" && (
        <div className={isTransitioning ? "anim-god-exit" : "anim-god-entry"} style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 1, perspective: "1000px" }}>
          
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 32px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", backgroundColor: "#07070a" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <div onClick={() => setViewMode("landing")} style={{ fontWeight: 800, fontSize: "16px", color: "#ffffff", letterSpacing: "-0.8px", cursor: "pointer" }}>
                PROMPTARC
              </div>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
              <span style={{ fontSize: "13px", fontWeight: 500, color: "#94a3b8" }}>Application Studio</span>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>Account: <strong style={{ color: "#e2e8f0", fontWeight: 600 }}>{user?.firstName || "Developer"}</strong></span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </header>

          <main style={{ flex: 1, display: "flex", height: "calc(100vh - 65px)", overflow: "hidden" }}>
            
            {/* Console Settings Sheet Drawer Component (Left Side) */}
            <div style={{ width: "420px", borderRight: "1px solid rgba(255, 255, 255, 0.05)", padding: "32px", display: "flex", flexDirection: "column", gap: "28px", backgroundColor: "#040407" }}>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>Application Generator</h2>
                <p style={{ color: "#71717a", fontSize: "13px", margin: 0, lineHeight: "1.5" }}>Declare deployment specifications. Our automation pipeline compiles the visual interface assets inside the sandboxed viewport.</p>
              </div>

              <form onSubmit={handleGenerateApp} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#a1a1aa", letterSpacing: "1px", textTransform: "uppercase" }}>Prompt Specifications</label>
                <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g., Build a modern real estate dashboard..." style={{ backgroundColor: "#07070a", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", padding: "16px", color: "#ffffff", fontSize: "14px", fontFamily: "inherit", resize: "none", height: "140px", outline: "none", lineHeight: "1.5" }} />
                <button type="submit" disabled={isGenerating || !prompt} style={{ backgroundColor: isGenerating || !prompt ? "rgba(255,255,255,0.02)" : "#ffffff", color: isGenerating || !prompt ? "#71717a" : "#000000", border: "none", borderRadius: "12px", padding: "14px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  {isGenerating ? "Compiling App Matrix..." : "Generate Web App"}
                </button>
              </form>

              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#a1a1aa", letterSpacing: "1px", textTransform: "uppercase" }}>System Compilation Logs</span>
                <div style={{ flex: 1, backgroundColor: "#000000", border: "1px solid rgba(255, 255, 255, 0.04)", borderRadius: "16px", padding: "16px", fontFamily: "monospace", fontSize: "12px", color: "#38bdf8", overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {generationLogs.length === 0 && <span style={{ color: "#4b5563", fontStyle: "italic" }}>System log environment listening for structural parameters...</span>}
                  {generationLogs.map((log, index) => <div key={index}>{log}</div>)}
                </div>
              </div>
            </div>

            {/* Sandbox Canvas Mount Layer Display Block Component (Right Side) */}
            <div style={{ flex: 1, backgroundColor: "#08080c", padding: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: generatedHtmlText ? "#22c55e" : "#eab308" }} />
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "#a1a1aa" }}>{generatedHtmlText ? "Live Application Sandbox Framework" : "Awaiting Output Compilation Sequence"}</span>
                </div>
                {generatedHtmlText && (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={handleCopyCode} disabled={!isSubscribed} style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: isSubscribed ? "#e2e8f0" : "#52525b", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, fontFamily: "inherit" }}>{copyStatus}</button>
                    <button disabled={!isSubscribed} style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: isSubscribed ? "#e2e8f0" : "#52525b", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, fontFamily: "inherit" }}>Export to GitHub</button>
                  </div>
                )}
              </div>

              <div style={{ flex: 1, backgroundColor: "#020204", borderRadius: "24px", border: "1px solid rgba(255, 255, 255, 0.05)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: "0 30px 60px rgba(0,0,0,0.6)" }}>
                {generatedHtmlText ? (
                  <>
                    <iframe srcDoc={generatedHtmlText} title="Generated Preview Frame" style={{ width: "100%", height: "100%", border: "none" }} />
                    {!isSubscribed && (
                      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(2, 2, 5, 0.35)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}>
                        <div style={{ backgroundColor: "#07070a", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "24px", padding: "40px", maxWidth: "400px", textAlign: "center", boxShadow: "0 40px 80px rgba(0,0,0,0.8)" }}>
                          <div style={{ width: "40px", height: "40px", margin: "0 auto 16px auto", borderRadius: "50%", border: "1px solid #ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#ef4444" }} />
                          </div>
                          <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 10px 0", letterSpacing: "-0.5px" }}>Unlock Your Application Assets</h3>
                          <p style={{ color: "#a1a1aa", fontSize: "13px", lineHeight: "1.6", margin: "0 0 28px 0" }}>Your fully responsive sandbox layout has successfully compiled! Upgrade to PromptArc premium to export directly to GitHub and snap the clean source code files.</p>
                          <button onClick={() => setIsSubscribed(true)} style={{ backgroundColor: "#ffffff", color: "#000000", border: "none", borderRadius: "12px", width: "100%", padding: "14px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Upgrade to Premium ⚡</button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ textAlign: "center", maxWidth: "320px" }}>
                    <div style={{ width: "36px", height: "36px", margin: "0 auto 16px auto", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }} />
                    <h4 style={{ fontSize: "14px", fontWeight: 600, margin: "0 0 6px 0", letterSpacing: "-0.2px" }}>Viewport Architecture Empty</h4>
                    <p style={{ color: "#71717a", fontSize: "12px", margin: 0, lineHeight: "1.5" }}>Our automated pipeline is building application frames and resolving asset allocations live.</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
