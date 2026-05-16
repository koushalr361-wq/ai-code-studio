export default function Dashboard() {
  const leads = [
    { id: 1, email: "rahul.sharma@example.com", date: "16 May 2026" },
    { id: 2, email: "priya.nair@example.com", date: "15 May 2026" },
    { id: 3, email: "amit.verma@example.com", date: "14 May 2026" },
  ];

  const handleWhatsApp = (email: string) => {
    const text = encodeURIComponent(`Hey! Thanks for joining the AI Code Studio waitlist (${email}).`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div style={{ backgroundColor: "#0a0a0a", color: "white", minHeight: "100vh", padding: "40px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", borderBottom: "1px solid #1a1a1a", paddingBottom: "20px" }}>
        <div>
          <h1 style={{ fontSize: "28px", margin: 0 }}>AI Code Studio</h1>
          <p style={{ color: "#a0a0a0", marginTop: "5px" }}>Lead Management Dashboard</p>
        </div>
      </div>

      <div style={{ backgroundColor: "#111111", borderRadius: "12px", border: "1px solid #1a1a1a", padding: "24px" }}>
        <h3 style={{ margin: "0 0 20px 0" }}>Recent Leads</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #222" }}>
              <th style={{ padding: "12px", color: "#a0a0a0" }}>Email Address</th>
              <th style={{ padding: "12px", color: "#a0a0a0" }}>Date</th>
              <th style={{ padding: "12px", color: "#a0a0a0", textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} style={{ borderBottom: "1px solid #1a1a1a" }}>
                <td style={{ padding: "16px 12px" }}>{lead.email}</td>
                <td style={{ padding: "16px 12px", color: "#a0a0a0" }}>{lead.date}</td>
                <td style={{ padding: "16px 12px", textAlign: "right" }}>
                  <button 
                    onClick={() => handleWhatsApp(lead.email)}
                    style={{ backgroundColor: "#25D366", color: "black", border: "none", padding: "8px 14px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
                  >
                    Chat on WhatsApp
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
