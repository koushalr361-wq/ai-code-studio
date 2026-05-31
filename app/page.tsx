"use client";

import React, { useState, useEffect, useRef } from "react";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";

export default function PromptArcGodScaleSuite() {
  const { user, isSignedIn } = useUser();
  const [viewMode, setViewMode] = useState<"landing" | "studio">("landing");
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Studio Core States
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);
  const [generatedHtmlText, setGeneratedHtmlText] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false); 
  const [copyStatus, setCopyStatus] = useState("Copy Code");

  // WebGL 3D Canvas Context References
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // --- THREE.JS INTERACTIVE WEBGL PARTICLE ENGINE ---
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
        gl_PointSize = 2.2;
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

    const particleCount = 1400;
    const positions = new Float32Array(particleCount * 3);
    const alphas = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const dist = 12 + Math.random() * 22;

      positions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = dist * Math.cos(phi);
      alphas[i] = 0.1 + Math.random() * 0.5;
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

      gl.clearColor(0.02, 0.02, 0.04, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

      rotationX += (mouseY * 0.3 - rotationX) * 0.05;
      rotationY += (mouseX * 0.3 - rotationY) * 0.05;
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
        0, 0, -30.0, 1.0
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
    }, 450);
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
      backgroundColor: "#030307",
      color: "#ffffff",
      minHeight: "100vh",
      fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden"
    }}>
      
      {/* Dynamic 3D WebGL Background Mounting Node */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />
      
      {/* Style Sheet Declarations */}
      <style>{`
        @import url('[https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap](https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap)');
        @keyframes studioPopIn {
          0% { opacity: 0; transform: scale(0.97) translateY(24px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-studio-entry { animation: studioPopIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .glass-card-container {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          border: 1px solid rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .active-cyan-highlight {
          border: 1px solid rgba(56, 189, 248, 0.4) !important;
          box-shadow: 0 0 40px rgba(56, 189, 248, 0.08);
        }
        .visual-abstract-wireframe {
          height: 110px; width: 100%; border-radius: 8px; background: rgba(255, 255, 255, 0.01);
          border: 1px dashed rgba(255, 255, 255, 0.04); display: flex; align-items: center; justifyContent: center; position: relative;
        }
      `}</style>

      {/* --- VIEW 1: LANDING ENTRY SCREEN --- */}
      {viewMode === "landing" && (
        <div style={{
          flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 1,
          opacity: isTransitioning ? 0 : 1, transform: isTransitioning ? "translateY(-12px)" : "translateY(0)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
        }}>
          {/* Header Panel */}
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "32px 64px" }}>
            <div style={{ fontWeight: 800, fontSize: "16px", letterSpacing: "-0.8px" }}>PROMPTARC</div>
            <div>
              {isSignedIn ? (
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 500 }}>Account: <strong style={{ fontWeight: 600, color: "#ffffff" }}>{user?.firstName}</strong></span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <SignInButton mode="modal">
                  <button style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#ffffff", padding: "8px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Sign In</button>
                </SignInButton>
              )}
            </div>
          </header>

          {/* Hero Content Section */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 24px" }}>
            <h1 style={{ fontSize: "68px", fontWeight: 800, letterSpacing: "-3.5px", margin: "0 0 20px 0", textAlign: "center", background: "linear-gradient(to bottom, #ffffff 40%, #71717a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 0.95 }}>
              PROMPTARC
            </h1>
            <p style={{ fontSize: "15px", color: "#94a3b8", lineHeight: "1.6", margin: "0 0 40px 0", textAlign: "center", maxWidth: "600px" }}>
              Auto-generates clean HTML/Tailwind from text, mates with development, building expine, and ribeotvised action actions into a proper, premium startup-grade platform.
            </p>
            <div style={{ marginBottom: "80px" }}>
              <button onClick={handleLaunchStudio} style={{ backgroundColor: "#ffffff", color: "#000000", padding: "14px 34px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer", border: "none", boxShadow: "0 4px 30px rgba(255,255,255,0.15)" }}>
                Launch Application Studio
              </button>
            </div>

            {/* Three Glass Informational Feature Rectangles */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", width: "100%", maxWidth: "1100px", paddingBottom: "40px" }}>
              <div className="glass-card-container active-cyan-highlight" style={{ borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className="visual-abstract-wireframe">
                  <div style={{ position: "absolute", width: "45px", height: "45px", borderRadius: "8px", border: "2px solid #38bdf8" }} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>AI Prompt Engine</div>
                  <h3 style={{ fontSize: "19px", fontWeight: 700, margin: "0 0 8px 0", letterSpacing: "-0.4px" }}>Instant Compilation</h3>
                  <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0, lineHeight: "1.6" }}>Auto-generates clean within/Tailwind from text. Responsive design, Ready-to-deploy logic.</p>
                </div>
              </div>

              <div className="glass-card-container" style={{ borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className="visual-abstract-wireframe" style={{ flexDirection: "column", gap: "6px", padding: "20px" }}>
                  <div style={{ width: "30%", height: "4px", background: "rgba(255,255,255,0.12)", borderRadius: "2px", alignSelf: "flex-start" }} />
                  <div style={{ width: "90%", height: "4px", background: "rgba(255,255,255,0.03)", borderRadius: "2px" }} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>Visualization Sandbox</div>
                  <h3 style={{ fontSize: "19px", fontWeight: 700, margin: "0 0 8px 0", letterSpacing: "-0.4px" }}>Real-Time Previews</h3>
                  <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0, lineHeight: "1.6" }}>See your creation instantly within a secure canvas. Interactive state, Mock data injection.</p>
                </div>
              </div>

              <div className="glass-card-container" style={{ borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className="visual-abstract-wireframe">
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#a855f7" }} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>DevOps Integration</div>
                  <h3 style={{ fontSize: "19px", fontWeight: 700, margin: "0 0 8px 0", letterSpacing: "-0.4px" }}>One-Click Deploy</h3>
                  <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0, lineHeight: "1.6" }}>Push directly to GitHub repos and launch live links. Clerk auth, Production hosting config.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- VIEW 2: APPLICATION WORKSPACE STUDIO --- */}
      {viewMode === "studio" && (
        <div className="animate-studio-entry" style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", backgroundColor: "#09090b" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <div onClick={() => setViewMode("landing")} style={{ fontWeight: 800, fontSize: "16px", color: "#ffffff", letterSpacing: "-0.8px", cursor: "pointer" }}>PROMPTARC</div>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
              <span style={{ fontSize: "13px", fontWeight: 500, color: "#94a3b8" }}>Application Studio</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "13px", color: "#64748b" }}>Account: <strong style={{ color: "#e2e8f0" }}>{user?.firstName || "Developer"}</strong></span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </header>

          <main style={{ flex: 1, display: "flex", height: "calc(100vh - 65px)", overflow: "hidden" }}>
            <div style={{ width: "420px", borderRight: "1px solid rgba(255, 255, 255, 0.05)", padding: "32px", display: "flex", flexDirection: "column", gap: "28px", backgroundColor: "#060608" }}>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>Application Generator</h2>
                <p style={{ color: "#71717a", fontSize: "13px", margin: 0, lineHeight: "1.5" }}>Declare deployment specifications. Our automation pipeline compiles the interface inside the viewport.</p>
              </div>

              <form onSubmit={handleGenerateApp} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#a1a1aa", letterSpacing: "1px", textTransform: "uppercase" }}>Prompt Specifications</label>
                <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g., Build a modern dashboard..." style={{ backgroundColor: "#09090b", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "16px", color: "#ffffff", fontSize: "14px", fontFamily: "inherit", resize: "none", height: "140px", outline: "none" }} />
                <button type="submit" disabled={isGenerating || !prompt} style={{ backgroundColor: isGenerating || !prompt ? "rgba(255,255,255,0.02)" : "#ffffff", color: isGenerating || !prompt ? "#71717a" : "#000000", border: "none", borderRadius: "10px", padding: "14px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
                  {isGenerating ? "Compiling App Matrix..." : "Generate Web App"}
                </button>
              </form>

              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#a1a1aa", letterSpacing: "1px", textTransform: "uppercase" }}>System Compilation Logs</span>
                <div style={{ flex: 1, backgroundColor: "#000000", border: "1px solid rgba(255, 255, 255, 0.04)", borderRadius: "12px", padding: "16px", fontFamily: "monospace", fontSize: "12px", color: "#38bdf8", overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {generationLogs.length === 0 && <span style={{ color: "#4b5563", fontStyle: "italic" }}>Waiting for execution parameters...</span>}
                  {generationLogs.map((log, index) => <div key={index}>{log}</div>)}
                </div>
              </div>
            </div>

            <div style={{ flex: 1, backgroundColor: "#0b0b0f", padding: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: generatedHtmlText ? "#22c55e" : "#eab308" }} />
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "#a1a1aa" }}>{generatedHtmlText ? "Live Sandbox" : "Awaiting Output Sequence"}</span>
                </div>
                {generatedHtmlText && (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={handleCopyCode} disabled={!isSubscribed} style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: isSubscribed ? "#e2e8f0" : "#52525b", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 600 }}>{copyStatus}</button>
                    <button disabled={!isSubscribed} style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: isSubscribed ? "#e2e8f0" : "#52525b", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 600 }}>Export</button>
                  </div>
                )}
              </div>

              <div style={{ flex: 1, backgroundColor: "#030303", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.05)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                {generatedHtmlText ? (
                  <>
                    <iframe srcDoc={generatedHtmlText} title="Preview" style={{ width: "100%", height: "100%", border: "none" }} />
                    {!isSubscribed && (
                      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(3, 3, 3, 0.3)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ backgroundColor: "#09090b", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", padding: "32px", maxWidth: "380px", textAlign: "center" }}>
                          <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 8px 0" }}>Unlock Assets</h3>
                          <p style={{ color: "#a1a1aa", fontSize: "13px", margin: "0 0 24px 0" }}>Upgrade to premium to grab code assets.</p>
                          <button onClick={() => setIsSubscribed(true)} style={{ backgroundColor: "#ffffff", color: "#000000", border: "none", borderRadius: "8px", width: "100%", padding: "12px 16px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>Upgrade to Premium</button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ width: "32px", height: "32px", margin: "0 auto 16px auto", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "4px" }} />
                    <h4 style={{ fontSize: "14px", fontWeight: 600, margin: "0 0 6px 0" }}>Viewport Empty</h4>
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
