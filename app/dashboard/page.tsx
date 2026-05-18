"use client";

import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [leads, setLeads] = useState<{ email: string; date: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // ⚠️ PASTE YOUR ACTUAL GOOGLE SHEET ID STRING BETWEEN THE QUOTES BELOW:
  const SHEET_ID = "166hobvDz67EcKLCl86wOXGstTcvfG0VDfX4uwT1TIdk"; 

  useEffect(() => {
    if (SHEET_ID === "YOUR_SHEET_ID_HERE") {
      setLoading(false);
      return;
    }

    // Fetches your live Google Sheet data cleanly as a CSV file parse
    fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`)
      .then((res) => res.text())
      .then((data) => {
        const rows = data.split("\n").slice(1); // Skip the sheet's header row
        const formattedLeads = rows.map((row) => {
          const columns = row.split(",");
          return {
            date: columns[0]?.replace(/"/g, "") || "N/A",
            email: columns[1]?.replace(/"/g, "") || "No Email",
          };
        }).filter(lead => lead.email !== "No Email" && lead.email.trim() !== "");
        
        setLeads(formattedLeads);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error connecting to Google Sheet database:", err);
        setLoading(false);
      });
  }, []);

  const handleWhatsApp = (email: string) => {
    const text = encodeURIComponent(`Hey! Thanks for joining the AI Code Studio waitlist (${email}). I'd love to jump on a quick chat and hear what features you're most excited about building!`);
    if (typeof window !== "undefined") {
      window.open(`https://wa.me/?text=${text}`, "_blank");
    }
  };

  return (
    <div style={{ backgroundColor: "#0a0a0a", color: "white", minHeight: "100vh", padding: "40px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", borderBottom: "1px solid #1a1a1a", paddingBottom: "20px" }}>
        <div>
          <h1 style={{ fontSize: "28px", margin: 0, fontWeight: "bold" }}>AI Code Studio</h1>
          <p style={{ color: "#a0a0a0", marginTop: "5px" }}>Live Customer Validation Database</p>
        </div>
        <span style={{ backgroundColor: "#111", padding: "8px 16px", borderRadius: "20px", fontSize: "14px", color: "#4caf50", border: "1px solid #14532d", height: "fit-content" }}>
          ● Sync Active
        </span>
      </div>

      <div style={{ backgroundColor: "#111111", borderRadius: "12px", border: "1px solid #1a1a1a", padding: "24px" }}>
        <h3 style={{ margin: "0 0 20px 0", fontSize: "18px" }}>Real-time Leads ({leads.length})</h3>
        
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #222" }}>
                <th style={{ padding: "12px", color: "#a0a0a0", fontSize: "14px" }}>Email Address</th>
                <th style={{ padding: "12px", color: "#a0a0a0", fontSize: "14px" }}>Date Joined</th>
                <th style={{ padding: "12px", color: "#a0a0a0", fontSize: "14px", textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} style={{ padding: "30px", textAlign: "center", color: "#a0a0a0" }}>Fetching latest responses from secure sheet...</td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ padding: "30px", textAlign: "center", color: "#a0a0a0" }}>
                    {SHEET_ID === "YOUR_SHEET_ID_HERE" 
                      ? "⚠️ Please add your sheet ID inside the code to connect your database." 
                      : "No leads found yet. Try signing up on your landing page!"}
                  </td>
                </tr>
              ) : (
                leads.map((lead, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #1a1a1a" }}>
                    <td style={{ padding: "16px 12px", fontWeight: "500" }}>{lead.email}</td>
                    <td style={{ padding: "16px 12px", color: "#a0a0a0" }}>{lead.date}</td>
                    <td style={{ padding: "16px 12px", textAlign: "right" }}>
                      <button 
                        onClick={() => handleWhatsApp(lead.email)}
                        style={{ backgroundColor: "#25D366", color: "black", border: "none", padding: "8px 14px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}
                      >
                        Chat on WhatsApp
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
