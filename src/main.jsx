import React, { useState, useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";

// ==========================================
// MOBILE-FIRST ACCESSIBLE STYLES
// ==========================================
const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: #f8fafc;
    color: #0f172a;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  
  .app-header {
    background: #0f172a;
    color: #ffffff;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    border-bottom: 1px solid #1e293b;
  }
  
  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
  }
  
  /* LEFT-ALIGNED MOBILE NAV SCROLLER */
  .nav-left-section {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    padding-bottom: 2px;
  }
  .nav-left-section::-webkit-scrollbar { display: none; }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
  
  .nav-btn {
    background: transparent;
    color: #94a3b8;
    border: none;
    padding: 8px 14px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .nav-btn:hover, .nav-btn.active {
    color: #ffffff;
    background: #1e293b;
  }
  
  .nav-btn.active {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
  }
  
  .role-toggle {
    background: #1e293b;
    border: 1px solid #334155;
    color: #f59e0b;
    padding: 8px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    margin-left: auto;
    flex-shrink: 0;
  }

  .main-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px;
  }
  
  /* CARDS & CONTAINERS */
  .card {
    background: #ffffff;
    border-radius: 18px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .hero-card {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: #ffffff;
    border-radius: 20px;
    padding: 28px 20px;
    margin-bottom: 24px;
    box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.3);
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #ffffff;
    border: none;
    padding: 14px 22px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    width: 100%;
  }
  
  .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 14px 22px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
  }

  .btn-outline {
    background: #ffffff;
    color: #0f172a;
    border: 1px solid #cbd5e1;
    padding: 10px 16px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
  
  /* STABLE FORM INPUTS (Prevents mobile focus loss & auto-zoom) */
  .form-group { margin-bottom: 18px; }
  .form-label { display: block; font-size: 14px; font-weight: 700; color: #1e293b; margin-bottom: 6px; }
  .form-subtext { font-size: 12px; color: #64748b; margin-bottom: 6px; }
  .form-control {
    width: 100%;
    padding: 14px 16px;
    border-radius: 10px;
    border: 1px solid #cbd5e1;
    background: #ffffff;
    color: #0f172a;
    font-size: 16px; /* Prevents auto-zoom on iOS */
    outline: none;
  }
  .form-control:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
  
  /* GRID & LAYOUTS */
  .grid-2 { display: grid; grid-template-columns: 1fr; gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: 1fr; gap: 16px; }
  .grid-4 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  @media (min-width: 768px) {
    .grid-2 { grid-template-columns: repeat(2, 1fr); }
    .grid-3 { grid-template-columns: repeat(3, 1fr); }
    .grid-4 { grid-template-columns: repeat(4, 1fr); }
    .btn-primary, .btn-secondary { width: auto; }
  }

  /* 6-STEP MOBILE RESPONSIVE TRACKER */
  .step-tracker-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin: 20px 0;
    gap: 4px;
  }
  .step-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    text-align: center;
  }
  .step-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 13px;
    background: #e2e8f0;
    color: #64748b;
  }
  .step-node.active .step-circle { background: #2563eb; color: #ffffff; }
  .step-node.completed .step-circle { background: #10b981; color: #ffffff; }
  .step-node.overdue .step-circle { background: #ef4444; color: #ffffff; }
  .step-title { font-size: 10px; font-weight: 700; margin-top: 4px; color: #475569; }

  /* BADGES & SCORE METRICS */
  .score-card-box {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 14px;
  }
  .progress-bg { height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; margin-top: 6px; }
  .progress-fill { height: 100%; border-radius: 4px; transition: width 0.4s ease; }
  
  .badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 8px;
    border-radius: 16px;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
  }
  .badge-resolved { background: #dcfce7; color: #15803d; }
  .badge-active { background: #dbeafe; color: #1e40af; }
  .badge-overdue { background: #fee2e2; color: #b91c1c; }
  .badge-escalated { background: #f3e8ff; color: #6b21a8; }

  /* MODAL */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(15, 23, 42, 0.8);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 2000;
  }
  @media (min-width: 768px) {
    .modal-overlay { align-items: center; padding: 16px; }
  }
  .modal-box {
    background: #ffffff;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    max-width: 700px;
    width: 100%;
    max-height: 85vh;
    overflow-y: auto;
    padding: 24px 20px;
  }
  @media (min-width: 768px) {
    .modal-box { border-radius: 20px; max-height: 90vh; }
  }
`;

// Helper: Calculate days remaining
const calculateDaysRemaining = (deadlineStr) => {
  if (!deadlineStr) return 0;
  const target = new Date(deadlineStr);
  const today = new Date("2026-08-26");
  const diffTime = target - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// ==========================================
// MODERN VECTOR LOGO COMPONENT
// ==========================================
function InclusiveXLogo({ onClick }) {
  return (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", flexShrink: 0 }}>
      <div style={{
        width: "38px",
        height: "38px",
        borderRadius: "12px",
        background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(37, 99, 235, 0.4)",
        border: "1px solid rgba(255, 255, 255, 0.2)"
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="4" r="2" />
          <path d="M12 7v5" />
          <path d="M8 12h8" />
          <path d="M9 16l-2 4" />
          <path d="M15 16l2 4" />
          <path d="M5 9l2-1 3 2" />
        </svg>
      </div>
      <div>
        <div style={{ fontSize: "19px", fontWeight: "900", letterSpacing: "-0.5px", color: "#ffffff", lineHeight: "1" }}>
          Inclusive<span style={{ color: "#38bdf8" }}>X</span>
        </div>
        <div style={{ fontSize: "9px", fontWeight: "800", color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase", marginTop: "2px" }}>
          Audit to Action
        </div>
      </div>
    </div>
  );
}

// Initial Data
const SAMPLE_REPORTS = [
  {
    id: "IX-2026-00124",
    title: "Wheelchair ramp blocked by construction debris",
    institution: "MGM Hospital & Medical Centre",
    locationDetail: "Emergency Entrance Gate 2",
    placeCategory: "Hospital",
    accessCategory: "Ramp",
    severity: "High",
    description: "The primary ramp for wheelchair users is completely blocked by sand bags and leftover concrete pipes.",
    responsibleAuthority: "Jamshedpur Municipal Corporation",
    responsibleOfficer: "Er. Rajesh Kumar",
    department: "Public Works Infrastructure",
    assignedDate: "2026-08-20",
    deadline: "2026-08-25",
    status: "Overdue",
    step: 4,
    escalationLevel: 2,
    photoUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
    timeline: [
      { date: "2026-08-20", title: "Report Submitted", note: "Logged via InclusiveX platform." },
      { date: "2026-08-26", title: "SLA Deadline Exceeded", note: "Auto-escalated to Level 2 Cell." }
    ]
  },
  {
    id: "IX-2026-00125",
    title: "Tactile paving path broken near staircase",
    institution: "St. Xavier College Academic Block",
    locationDetail: "Library Pathway",
    placeCategory: "School / College",
    accessCategory: "Pathway",
    severity: "Medium",
    description: "Tactile warning tiles for visually impaired students are completely missing near the main staircase gap.",
    responsibleAuthority: "Campus Estate Dept",
    responsibleOfficer: "Prof. S. K. Verma",
    department: "Infrastructure Maintenance",
    assignedDate: "2026-08-22",
    deadline: "2026-08-29",
    status: "Awaiting Verification",
    step: 5,
    escalationLevel: 1,
    photoUrl: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=600&q=80",
    timeline: [
      { date: "2026-08-22", title: "Report Logged", note: "Assigned to Campus Estate Head." }
    ]
  }
];

const SAMPLE_PLACES = [
  {
    name: "MGM Hospital & Medical Centre",
    category: "Hospital",
    accessibilityScore: 82,
    actionScore: 74,
    breakdown: { entrance: 92, ramps: 76, toilets: 84, signage: 78, lifts: 90 }
  },
  {
    name: "St. Xavier College Academic Block",
    category: "School / College",
    accessibilityScore: 91,
    actionScore: 88,
    breakdown: { entrance: 95, ramps: 90, toilets: 88, signage: 82, lifts: 94 }
  }
];

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function InclusiveXApp() {
  const [reports, setReports] = useState(() => {
    const local = localStorage.getItem("inclusivex_reports");
    return local ? JSON.parse(local) : SAMPLE_REPORTS;
  });

  const [places] = useState(SAMPLE_PLACES);
  const [activeTab, setActiveTab] = useState("home");
  const [userRole, setUserRole] = useState("user");
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [submittedSuccessReport, setSubmittedSuccessReport] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // Controlled Form State
  const [newReport, setNewReport] = useState({
    description: "",
    placeCategory: "Hospital",
    institution: "",
    accessCategory: "Ramp",
    severity: "Medium"
  });

  useEffect(() => {
    localStorage.setItem("inclusivex_reports", JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
    return () => styleTag.remove();
  }, []);

  const handleCreateReport = (e) => {
    e.preventDefault();
    if (!newReport.institution || !newReport.description) {
      alert("Please fill in place name and description!");
      return;
    }

    const created = {
      id: `IX-2026-00${126 + reports.length}`,
      title: `${newReport.accessCategory} issue at ${newReport.institution}`,
      institution: newReport.institution,
      locationDetail: newReport.institution,
      placeCategory: newReport.placeCategory,
      accessCategory: newReport.accessCategory,
      severity: newReport.severity,
      description: newReport.description,
      responsibleAuthority: "Pending Triage",
      responsibleOfficer: "Unassigned",
      department: "Triage Cell",
      assignedDate: "2026-08-26",
      deadline: "2026-09-02",
      status: "Submitted",
      step: 1,
      escalationLevel: 1,
      photoUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
      timeline: [{ date: "2026-08-26", title: "Submitted", note: "Logged into pipeline." }]
    };

    setReports([created, ...reports]);
    setSubmittedSuccessReport(created);
    setNewReport({ description: "", placeCategory: "Hospital", institution: "", accessCategory: "Ramp", severity: "Medium" });
  };

  const activeModalReport = useMemo(() => reports.find(r => r.id === selectedReportId), [reports, selectedReportId]);

  return (
    <div>
      {/* HEADER WITH LEFT-ALIGNED NAV BUTTONS */}
      <header className="app-header">
        <div className="nav-container">
          <div className="nav-left-section">
            {/* MODERN LOGO */}
            <InclusiveXLogo onClick={() => setActiveTab("home")} />

            {/* NAV LINKS SHIFTED TO LEFT */}
            <nav className="nav-links">
              <button className={`nav-btn ${activeTab === "home" ? "active" : ""}`} onClick={() => setActiveTab("home")}>🏠 Home</button>
              <button className={`nav-btn ${activeTab === "report" ? "active" : ""}`} onClick={() => { setSubmittedSuccessReport(null); setActiveTab("report"); }}>📝 Report</button>
              <button className={`nav-btn ${activeTab === "track" ? "active" : ""}`} onClick={() => setActiveTab("track")}>🔍 Track</button>
              <button className={`nav-btn ${activeTab === "scores" ? "active" : ""}`} onClick={() => setActiveTab("scores")}>📊 Scores</button>
              <button className={`nav-btn ${activeTab === "reviews" ? "active" : ""}`} onClick={() => setActiveTab("reviews")}>💬 Reviews</button>
              <button className={`nav-btn ${activeTab === "complaints" ? "active" : ""}`} onClick={() => setActiveTab("complaints")}>⚠️ Complaints</button>
            </nav>

            <button
              className="role-toggle"
              onClick={() => {
                const nextRole = userRole === "user" ? "admin" : "user";
                setUserRole(nextRole);
                setActiveTab(nextRole === "admin" ? "admin" : "home");
              }}
            >
              {userRole === "user" ? "🛡️ Admin" : "👤 Public"}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN BODY CONTENT */}
      <main className="main-content">

        {/* 1. HOMEPAGE */}
        {activeTab === "home" && (
          <div>
            <div className="hero-card">
              <span style={{ color: "#38bdf8", fontWeight: "800", fontSize: "11px", letterSpacing: "1px" }}>
                YUVA 6.0 | AUDIT TO ACTION
              </span>
              <h1 style={{ fontSize: "28px", fontWeight: "900", margin: "8px 0 10px 0", lineHeight: "1.2" }}>
                Is this place accessible?
              </h1>
              <p style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "20px" }}>
                Report accessibility barriers, track what happens next, and make sure every issue leads to real action.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button className="btn-primary" onClick={() => { setSubmittedSuccessReport(null); setActiveTab("report"); }}>
                  📝 Report Accessibility Barrier
                </button>
                <button className="btn-secondary" onClick={() => setActiveTab("track")}>
                  🔍 Check Report Status
                </button>
              </div>
            </div>

            {/* 6-STEP WORKFLOW TRACKER */}
            <div className="card">
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>6-Step Audit to Action Pipeline</h3>
              <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "12px" }}>Nothing disappears after it is reported.</p>
              
              <div className="step-tracker-bar">
                {["Identify", "Audit", "Assign", "Act", "Monitor", "Verify"].map((step, idx) => (
                  <div key={step} className="step-node active">
                    <div className="step-circle">{idx + 1}</div>
                    <div className="step-title">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. REPORT FORM */}
        {activeTab === "report" && (
          <div>
            {submittedSuccessReport ? (
              <div className="card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "36px" }}>🎉</div>
                <h2 style={{ fontSize: "20px", fontWeight: "900" }}>Report Submitted!</h2>
                <p style={{ color: "#64748b", fontSize: "13px", margin: "6px 0 16px 0" }}>
                  Tracking ID: <strong>{submittedSuccessReport.id}</strong>
                </p>
                <button className="btn-primary" onClick={() => setActiveTab("track")}>🔍 Track Status</button>
              </div>
            ) : (
              <div className="card">
                <h2 style={{ fontSize: "20px", fontWeight: "900" }}>Report an Accessibility Barrier</h2>
                <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "16px" }}>Tell us what you found in your own words.</p>

                <form onSubmit={handleCreateReport}>
                  <div className="form-group">
                    <label className="form-label">A. What did you find? *</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="e.g. Ramp is blocked by parked delivery trucks..."
                      value={newReport.description}
                      onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">B. Place / Location Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. MGM Medical College Gate 2"
                      value={newReport.institution}
                      onChange={(e) => setNewReport({ ...newReport, institution: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">C. Category</label>
                      <select className="form-control" value={newReport.accessCategory} onChange={(e) => setNewReport({ ...newReport, accessCategory: e.target.value })}>
                        <option value="Ramp">Ramp / Slope</option>
                        <option value="Lift">Lift / Elevator</option>
                        <option value="Accessible Toilet">Accessible Toilet</option>
                        <option value="Pathway">Pathway / Tactile</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">D. Severity</label>
                      <select className="form-control" value={newReport.severity} onChange={(e) => setNewReport({ ...newReport, severity: e.target.value })}>
                        <option value="Medium">Medium (7 Days)</option>
                        <option value="High">High (3 Days)</option>
                        <option value="Critical">Critical (24-48 Hours)</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary">🚀 Submit Report</button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* 3. REPORT TRACKER */}
        {activeTab === "track" && (
          <div>
            <div className="card">
              <h2 style={{ fontSize: "20px", fontWeight: "900", marginBottom: "12px" }}>🔍 Track Reports</h2>
              <input
                type="text"
                className="form-control"
                placeholder="Search by ID or venue name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {reports.map((report) => (
              <div key={report.id} className="card" style={{ borderLeft: "5px solid #2563eb" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <span style={{ fontSize: "11px", fontWeight: "800", color: "#2563eb" }}>{report.id}</span>
                    <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>{report.title}</h3>
                  </div>
                  <span className="badge badge-active">{report.status}</span>
                </div>

                <div className="step-tracker-bar">
                  {["1", "2", "3", "4", "5", "6"].map((num, i) => (
                    <div key={num} className={`step-node ${i + 1 <= report.step ? "completed" : ""}`}>
                      <div className="step-circle">{num}</div>
                    </div>
                  ))}
                </div>

                <button className="btn-outline" style={{ width: "100%" }} onClick={() => setSelectedReportId(report.id)}>
                  📋 View Full Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 4. SCORES */}
        {activeTab === "scores" && (
          <div className="grid-2">
            {places.map((place) => (
              <div key={place.name} className="card">
                <h3 style={{ fontSize: "16px", fontWeight: "800" }}>{place.name}</h3>
                <div className="grid-4" style={{ margin: "12px 0" }}>
                  <div className="score-card-box">
                    <div style={{ fontSize: "10px", color: "#2563eb", fontWeight: "800" }}>ACCESSIBILITY</div>
                    <div style={{ fontSize: "22px", fontWeight: "900" }}>{place.accessibilityScore}/100</div>
                  </div>
                  <div className="score-card-box">
                    <div style={{ fontSize: "10px", color: "#10b981", fontWeight: "800" }}>ACTION SCORE</div>
                    <div style={{ fontSize: "22px", fontWeight: "900" }}>{place.actionScore}/100</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* MODAL VIEW */}
      {activeModalReport && (
        <div className="modal-overlay" onClick={() => setSelectedReportId(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <span className="badge badge-active">{activeModalReport.id}</span>
                <h2 style={{ fontSize: "18px", fontWeight: "900", marginTop: "4px" }}>{activeModalReport.title}</h2>
              </div>
              <button style={{ background: "none", border: "none", fontSize: "20px" }} onClick={() => setSelectedReportId(null)}>✕</button>
            </div>
            <p style={{ fontSize: "13px", color: "#475569", margin: "12px 0" }}>{activeModalReport.description}</p>
            <div className="score-card-box" style={{ fontSize: "12px" }}>
              <div><strong>Authority:</strong> {activeModalReport.responsibleAuthority}</div>
              <div><strong>Officer:</strong> {activeModalReport.responsibleOfficer}</div>
              <div><strong>Deadline:</strong> {activeModalReport.deadline}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// MOUNT TO REACT ROOT
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<InclusiveXApp />);
}
