"use client";
import { useState } from "react";
export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <main style={{
      fontFamily: "Inter, Arial, sans-serif",
      backgroundColor: "#0a0a0a",
      color: "white",
      minHeight: "100vh"
    }}>

      {/* NAVBAR */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 40px",
        borderBottom: "1px solid #1a1a1a"
      }}>
        <h2>AI Code Studio</h2>
        <button style={{
          padding: "8px 16px",
          background: "white",
          color: "black",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}>
          Join Waitlist
        </button>
      </nav>

      {/* HERO */}
      <section style={{
        padding: "120px 20px",
        textAlign: "center",
        maxWidth: "900px",
        margin: "auto"
      }}>
        <h1 style={{
          fontSize: "56px",
          fontWeight: "700",
          marginBottom: "20px"
        }}>
          Build software faster with AI
        </h1>

        <p style={{
          fontSize: "18px",
          color: "#aaa",
          marginBottom: "40px"
        }}>
          Turn ideas into working apps and landing pages in minutes.
        </p>

        <form
  action="https://docs.google.com/forms/d/e/1FAIpQLSev1leZGuF5aikv6xc-S8gLzAr_1kqBO7nzOYKZ_YeFdg6GOg/formResponse"
  method="POST"
  target="_blank"
  onSubmit={() => setSubmitted(true)}
  style={{ display: "flex", justifyContent: "center", gap: "10px" }}
>
 {submitted && (
  <p style={{ marginTop: "15px", color: "#4ade80" }}>
    You're on the waitlist.
  </p>
)}
  <input
    name="entry.25840948"
    type="email"
    placeholder="Enter your email"
    required
    style={{
      padding: "14px",
      width: "250px",
      borderRadius: "8px",
      border: "1px solid #333",
      backgroundColor: "#111",
      color: "white"
    }}
  />

  <button style={{
    padding: "14px 20px",
    backgroundColor: "white",
    color: "black",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }}>
    Join Waitlist
  </button>
</form>
      </section>

      {/* FEATURES */}
      <section style={{
        padding: "80px 20px",
        maxWidth: "1000px",
        margin: "auto"
      }}>
        <h2 style={{ marginBottom: "40px" }}>Features</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}>
          {[
            "Generate apps from simple prompts",
            "Instant landing page builder",
            "No-code + AI workflow",
            "Deploy in minutes"
          ].map((item, i) => (
            <div key={i} style={{
              padding: "25px",
              border: "1px solid #222",
              borderRadius: "12px",
              transition: "all 0.2s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.border = "1px solid #555";
              e.currentTarget.style.transform = "translateY(-5px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.border = "1px solid #222";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{
        padding: "80px 20px",
        maxWidth: "1000px",
        margin: "auto"
      }}>
        <h2 style={{ marginBottom: "40px" }}>Pricing</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}>
          {[
            { name: "Starter", price: "₹799/month" },
            { name: "Creator", price: "₹1299/month" },
            { name: "Agency", price: "₹2499/month" }
          ].map((plan, i) => (
            <div key={i} style={{
              padding: "30px",
              border: "1px solid #222",
              borderRadius: "12px",
              textAlign: "center",
              transition: "all 0.2s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.border = "1px solid #555";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.border = "1px solid #222";
              e.currentTarget.style.transform = "scale(1)";
            }}
            >
              <h3>{plan.name}</h3>
              <p style={{ marginTop: "10px", color: "#aaa" }}>{plan.price}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}