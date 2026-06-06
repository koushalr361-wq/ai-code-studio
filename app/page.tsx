 "use client";

import React, { useState, useEffect, useRef } from "react";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";

export default function PromptArcGodScaleSuite() {
  const { user, isSignedIn } = useUser();
  const [viewMode, setViewMode] = useState<"landing" | "studio">("landing");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"compute" | "api" | "nodes" | null>(null);
  
  // High-Fidelity Active Telemetry States
  const [engineTemperature, setEngineTemperature] = useState(0.7);
  const [selectedTier, setSelectedTier] = useState<"developer" | "scale">("developer");
  const [systemLoad, setSystemLoad] = useState(42);

  // Studio Core Frame States
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);
  const [generatedHtmlText, setGeneratedHtmlText] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false); 
  const [copyStatus, setCopyStatus] = useState("Copy Code");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background metric loop simulation tracking live server ticks
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemLoad(() => Math.floor(41 + Math.random() * 11));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // --- THREE.JS LIVE KINETIC SHADER MATRIX BACKGROUND ---
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
        cY, sX * sY, -cX * sY, 0,
        0, cX, sX, 0,
        sY, -sX * cY, cX * cY, 0,
        0, 0, -25.0, 1.0
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
    setGenerationLogs(["[SYSTEM] Parsing deployment context tokens..."]);

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

      let rawCode = data.code || "";
      if (rawCode.includes("```")) {
        rawCode = rawCode.replace(/```html/gi, "").replace(/```/g, "").trim();
      }

      // 100% FIXED TAILWIND SCRIPT TAG URL 
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

  return (
    <div style={{
      backgroundColor: "#010103",
      color: "#ffffff",
      minHeight: "100vh",
      fontFamily: '"Space Grotesk", -apple-system, sans-serif',
      WebkitFontSmoothing: "antialiased",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden"
    }}>
      
      {/* 3D WebGL Background Canvas Frame */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />
      
      {/* --- PREMIUM COMPONENT STYLING SYSTEM --- */}
      <style>{`
        @import url('[https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@700;800&display=swap](https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@700;800&display=swap)');
        
        @keyframes godScaleExit {
          0% { opacity: 1; transform: scale(1) translateY(0) rotateX(0deg); filter: blur(0px); }
          100% { opacity: 0; transform: scale(0.92) translateY(-40px) rotateX(10deg); filter: blur(12px); }
        }
        @keyframes godScaleEntry {
          0% { opacity: 0; transform: scale(1.06) translateY(24px) rotateX(-6deg); filter: blur(8px); }
          100% { opacity: 1; transform: scale(1) translateY(0) rotateX(0deg); filter: blur(0px); }
        }
        @keyframes menuPop {
          from { opacity: 0; transform: translateY(12px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .anim-scale-exit { animation: godScaleExit 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-scale-entry { animation: godScaleEntry 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .mega-menu-entry { animation: menuPop 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        .god-tier-card {
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.002) 100%);
          border: 1px solid rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          border-radius: 32px !important;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .god-tier-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
        }
        .cyan-glow-barrier {
          border-color: rgba(56, 189, 248, 0.45) !important;
          box-shadow: 0 0 40px rgba(56, 189, 248, 0.06), inset 0 0 20px rgba(56, 189, 248, 0.02) !important;
        }
        .premium-slider { "-webkit-appearance": "none", width: "100%", background: "transparent", outline: "none" }
        .premium-slider::-webkit-slider-runnable-track { background: rgba(255,255,255,0.06); height: 4px; border-radius: 2px; }
        .premium-slider::-webkit-slider-thumb { -webkit-appearance: none; background: #38bdf8; width: 12px; height: 12px; border-radius: 50%; margin-top: -4px; cursor: pointer; box-shadow: 0 0 10px #38bdf8; }
      `}</style>

      {/* --- VIEW ROUTE 1: HIGH-CONVERTING INTERACTIVE LANDING TIERS --- */}
      {viewMode === "landing" && (
        <div className={isTransitioning ? "anim-scale-exit" : "anim-scale-entry"} style={{
          flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 1, perspective: "1200px"
        }}>
          
          {/* HEADER INFRASTRUCTURE WITH DROPDOWN TRIGGER MATRIX */}
          <header 
            onMouseLeave={() => setActiveMenu(null)}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "36px 64px", position: "relative", zIndex: 100 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "48px" }}>
              <div 
                style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: "19px", letterSpacing: "-1px", cursor: "pointer" }}
              >
                PROMPTARC
              </div>

              {/* ACTIVE OPTION SWITCHERS */}
              <nav style={{ display: "flex", gap: "32px", fontSize: "13px", fontWeight: 500, color: "#94a3b8" }}>
                <span style={{ cursor: "pointer", color: activeMenu === "compute" ? "#ffffff" : "#94a3b8" }} onMouseEnter={() => setActiveMenu("compute")}>Staging Core ▾</span>
                <span style={{ cursor: "pointer", color: activeMenu === "api" ? "#ffffff" : "#94a3b8" }} onMouseEnter={() => setActiveMenu("api")}>API Gateway ▾</span>
                <span style={{ cursor: "pointer", color: activeMenu === "nodes" ? "#ffffff" : "#94a3b8" }} onMouseEnter={() => setActiveMenu("nodes")}>Network Topology ▾</span>
              </nav>
            </div>

            <div>
              {isSignedIn ? (
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontSize: "13px", color: "#94a3b8" }}>Cluster Session: <strong style={{ color: "#ffffff", fontWeight: 600 }}>{user?.firstName}</strong></span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <SignInButton mode="modal">
                  <button style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "#ffffff", padding: "10px 24px", borderRadius: "14px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Connect Engine</button>
                </SignInButton>
              )}
            </div>

            {/* --- MEGA-MENU OPERATIONAL MATRICES --- */}
            {activeMenu && (
              <div className="mega-menu-entry" style={{
                position: "absolute", top: "84px", left: "190px", width: "420px", backgroundColor: "rgba(4, 4, 6, 0.94)",
                border: "1px solid rgba(255, 255, 255, 0.06)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)",
                borderRadius: "24px", padding: "28px", boxShadow: "0 50px 100px rgba(0,0,0,0.8)"
              }}>
                {activeMenu === "compute" && (
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>Isolated Staging Core</div>
                    <p style={{ color: "#94a3b8", fontSize: "12px", margin: "0 0 16px 0", lineHeight: "1.4" }}>Launch direct execution nodes to process full-stack visual layouts synchronously inside production sandboxes.</p>
                    <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600, cursor: "pointer" }} onClick={handleLaunchStudio}>Launch Active Studio Terminal →</span>
                  </div>
                )}
                {activeMenu === "api" && (
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#a855f7", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>Asynchronous Schema Protocols</div>
                    <p style={{ color: "#94a3b8", fontSize: "12px", margin: "0 0 16px 0", lineHeight: "1.4" }}>Stitch language parameters directly into deployment targets using structured webhooks and secure API secret blocks.</p>
                    <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600, cursor: "pointer" }}>Review API Framework →</span>
                  </div>
                )}
                {activeMenu === "nodes" && (
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>Distributed Server Cluster</div>
                    <p style={{ color: "#94a3b8", fontSize: "12px", margin: "0 0 16px 0", lineHeight: "1.4" }}>Verify global telemetry sync operations, compute core configurations, and file execution connection lines.</p>
                    <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600, cursor: "pointer" }}>Explore Telemetry Nodes →</span>
                  </div>
                )}
              </div>
            )}
          </header>

          {/* Hero Header Presentation Area */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 24px" }}>
            <h1 style={{ fontFamily: '"Syne", sans-serif', fontSize: "78px", fontWeight: 800, letterSpacing: "-4px", margin: "0 0 20px 0", textAlign: "center", background: "linear-gradient(to bottom, #ffffff 40%, #4b5563 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 0.95 }}>
              PROMPTARC
            </h1>
            
            <p style={{ fontSize: "16px", color: "#94a3b8", lineHeight: "1.6", margin: "0 0 48px 0", textAlign: "center", maxWidth: "580px", fontWeight: 400 }}>
              Auto-generates clean HTML/Tailwind from text, mates with development, building expine, and ribeotvised action actions into a proper, premium startup-grade platform.
            </p>

            <div style={{ marginBottom: "96px" }}>
              <button 
                onClick={handleLaunchStudio} 
                style={{ 
                  backgroundColor: "#ffffff", color: "#000000", padding: "18px 44px", borderRadius: "16px", 
                  fontSize: "14px", fontWeight: 600, cursor: "pointer", border: "none", boxShadow: "0 10px 40px rgba(255,255,255,0.25)"
                }}
              >
                Launch Application Studio 
              </button>
            </div>

            {/* --- RE-ENGINEERED SAAS MICRO INSTRUMENTATION CARD WIDGETS --- */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px", width: "100%", maxWidth: "1140px", paddingBottom: "60px" }}>
              
              {/* Box 1: Real-Time Cluster Core Diagnostic Tool */}
              <div className="god-tier-card cyan-glow-barrier" style={{ padding: "36px", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "1px" }}>Compute Cluster Status</span>
                  <span style={{ fontSize: "12px", color: "#22c55e", fontWeight: 600, fontFamily: "monospace" }}>● LIVE</span>
                </div>
                <div style={{ height: "90px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#94a3b8" }}>
                    <span>Active Memory Allocation</span>
                    <span style={{ color: "#ffffff", fontWeight: 600 }}>{systemLoad}% System</span>
                  </div>
                  <div style={{ width: "100%", height: "4px", backgroundColor: "rgba(255,255,255,0.03)", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ width: `${systemLoad}%`, height: "100%", backgroundColor: "#38bdf8", boxShadow: "0 0 10px #38bdf8", transition: "width 0.4s ease" }} />
                  </div>
                  <div style={{ display: "flex", gap: "6px", marginTop: "2px" }}>
                    <div style={{ flex: 1, height: "16px", background: "rgba(56,189,248,0.12)", borderRadius: "4px" }} />
                    <div style={{ flex: 1, height: "16px", background: "rgba(56,189,248,0.12)", borderRadius: "4px" }} />
                    <div style={{ flex: 1, height: "16px", background: systemLoad > 45 ? "rgba(56,189,248,0.12)" : "rgba(255,255,255,0.02)", borderRadius: "4px" }} />
                  </div>
                </div>
                <div>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>Instant Compilation</h3>
                  <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0, lineHeight: "1.6" }}>Auto-generates clean within/Tailwind from text. Responsive design, Ready-to-deploy logic.</p>
                </div>
              </div>

              {/* Box 2: Hyperparameter Weights Token Utility */}
              <div className="god-tier-card" style={{ padding: "36px", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>Model Generation Weights</span>
                  <span style={{ fontSize: "12px", color: "#38bdf8", fontFamily: "monospace" }}>t={engineTemperature}</span>
                </div>
                <div style={{ height: "90px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px" }}>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="1.5" 
                    step="0.1" 
                    value={engineTemperature} 
                    onChange={(e) => setEngineTemperature(parseFloat(e.target.value))}
                    className="premium-slider"
                    style={{ WebkitAppearance: "none", width: "100%", background: "transparent", outline: "none" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b" }}>
                    <span>Deterministic</span>
                    <span>Fluid / Creative</span>
                  </div>
                </div>
                <div>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>Real-Time Previews</h3>
                  <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0, lineHeight: "1.6" }}>See your creation instantly within a secure canvas. Interactive state, Mock data injection.</p>
                </div>
              </div>

              {/* Box 3: COMMERCIAL TRANSPARENT PRICING MATRIX PLATFORM */}
              <div className="god-tier-card" style={{ padding: "36px", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#a855f7", textTransform: "uppercase", letterSpacing: "1px" }}>Commercial Licensing</span>
                  <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>
                    {selectedTier === "developer" ? "$19/mo" : "$79/mo"}
                  </span>
                </div>
                <div style={{ height: "90px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <button 
                    type="button"
                    onClick={() => setSelectedTier("developer")}
                    style={{ flex: 1, padding: "10px 14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", background: selectedTier === "developer" ? "rgba(255,255,255,0.07)" : "transparent", color: "#ffffff", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                  >
                    Developer Plan
                  </button>
                  <button 
                    type="button"
                    onClick={() => setSelectedTier("scale")}
                    style={{ flex: 1, padding: "10px 14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", background: selectedTier === "scale" ? "rgba(255,255,255,0.07)" : "transparent", color: "#ffffff", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                  >
                    Scale Tier
                  </button>
                </div>
                <div>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>One-Click Deploy</h3>
                  <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0, lineHeight: "1.6" }}>Push directly to GitHub repos and launch live links. Clerk auth, Production hosting config.</p>
                </div>
              </div>

            </div>
          </div>

          <footer style={{ textAlign: "center", paddingBottom: "32px", fontSize: "11px", color: "#3f3f46", letterSpacing: "0.5px", fontWeight: 600 }}>
            © 2026 PROMPTARC CORE INFRASTRUCTURE PIPELINES PROTECTED.
          </footer>
        </div>
      )}

      {/* --- VIEW ROUTE 2: FULL COMPACT RE-NAMED CORE DEV WORKSPACE --- */}
      {viewMode === "studio" && (
        <div className={isTransitioning ? "anim-scale-exit" : "anim-scale-entry"} style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 1, perspective: "1200px" }}>
          
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 32px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", backgroundColor: "#07070a" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <div onClick={() => setViewMode("landing")} style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: "16px", color: "#ffffff", letterSpacing: "-0.5px", cursor: "pointer" }}>
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
            
            <div style={{ width: "420px", borderRight: "1px solid rgba(255, 255, 255, 0.05)", padding: "32px", display: "flex", flexDirection: "column", gap: "28px", backgroundColor: "#040407" }}>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>Application Generator</h2>
                <p style={{ color: "#71717a", fontSize: "13px", margin: 0, lineHeight: "1.5" }}>Declare deployment specifications. Our automation pipeline compiles the visual interface assets inside the sandboxed viewport.</p>
              </div>

              <form onSubmit={handleGenerateApp} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#a1a1aa", letterSpacing: "1px", textTransform: "uppercase" }}>Prompt Specifications</label>
                <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g., Build a modern real estate dashboard..." style={{ backgroundColor: "#07070a", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", padding: "16px", color: "#ffffff", fontSize: "14px", fontFamily: "inherit", resize: "none", height: "140px", outline: "none", lineHeight: "1.5" }} />
                <button type="submit" disabled={isGenerating || !prompt} style={{ backgroundColor: isGenerating || !prompt ? "rgba(255,255,255,0.02)" : "#ffffff", color: isGenerating || !prompt ? "#71717a" : "#000000", border: "none", borderRadius: "12px", padding: "14px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
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

            <div style={{ flex: 1, backgroundColor: "#08080c", padding: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: generatedHtmlText ? "#22c55e" : "#eab308" }} />
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "#a1a1aa" }}>Live Application Sandbox Framework</span>
                </div>
                {generatedHtmlText && (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={handleCopyCode} disabled={!isSubscribed} style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: isSubscribed ? "#e2e8f0" : "#52525b", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 600 }}>{copyStatus}</button>
                    <button disabled={!isSubscribed} style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: isSubscribed ? "#e2e8f0" : "#52525b", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 600 }}>Export to GitHub</button>
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
                          <button onClick={() => setIsSubscribed(true)} style={{ backgroundColor: "#ffffff", color: "#000000", border: "none", borderRadius: "12px", width: "100%", padding: "14px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>Upgrade to Premium ⚡</button>
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
