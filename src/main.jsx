import React, { useState, useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";

// ==========================================
// INCLUSIVE-X STYLESHEET (MOBILE-FIRST)
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
  
  /* HEADER & NAVIGATION */
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
    padding: 10px 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  
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
    gap: 6px;
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
    padding: 7px 14px;
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
    padding: 26px 20px;
    margin-bottom: 24px;
    box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.3);
  }
  
  /* BUTTONS */
  .btn-primary {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #ffffff;
    border: none;
    padding: 12px 20px;
    border-radius: 12px;
    font-size: 14px;
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
    padding: 12px 20px;
    border-radius: 12px;
    font-size: 14px;
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
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-sm { padding: 6px 12px; font-size: 12px; border-radius: 8px; }

  /* FORM INPUTS (STABLE FOCUS FOCUS-SAFE) */
  .form-group { margin-bottom: 16px; }
  .form-label { display: block; font-size: 13px; font-weight: 700; color: #1e293b; margin-bottom: 6px; }
  .form-subtext { font-size: 12px; color: #64748b; margin-bottom: 6px; }
  .form-control {
    width: 100%;
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid #cbd5e1;
    background: #ffffff;
    color: #0f172a;
    font-size: 16px; /* Prevents auto-zoom on mobile */
    outline: none;
  }
  .form-control:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
  
  /* RESPONSIVE GRIDS */
  .grid-2 { display: grid; grid-template-columns: 1fr; gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: 1fr; gap: 16px; }
  .grid-5 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }

  @media (min-width: 768px) {
    .grid-2 { grid-template-columns: repeat(2, 1fr); }
    .grid-3 { grid-template-columns: repeat(3, 1fr); }
    .grid-5 { grid-template-columns: repeat(5, 1fr); }
    .btn-primary, .btn-secondary { width: auto; }
  }

  /* 6-STEP PIPELINE TRACKER */
  .step-tracker-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin: 16px 0;
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
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 12px;
    background: #e2e8f0;
    color: #64748b;
  }
  .step-node.completed .step-circle { background: #10b981; color: #ffffff; }
  .step-node.active .step-circle { background: #2563eb; color: #ffffff; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2); }
  .step-node.overdue .step-circle { background: #ef4444; color: #ffffff; }
  .step-title { font-size: 9px; font-weight: 700; margin-top: 4px; color: #475569; }

  /* BADGES & SCORE METRICS */
  .score-card-box {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 12px;
  }
  .progress-bg { height: 6px; background: #e2e8f0; border-radius: 4px; overflow: hidden; margin-top: 6px; }
  .progress-fill { height: 100%; border-radius: 4px; transition: width 0.4s ease; }
  
  .badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
  }
  .badge-resolved { background: #dcfce7; color: #15803d; }
  .badge-active { background: #dbeafe; color: #1e40af; }
  .badge-overdue { background: #fee2e2; color: #b91c1c; }
  .badge-escalated { background: #f3e8ff; color: #6b21a8; }
  .badge-warning { background: #fef3c7; color: #b45309; }

  /* MODAL */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(15, 23, 42, 0.75);
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
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    max-width: 700px;
    width: 100%;
    max-height: 85vh;
    overflow-y: auto;
    padding: 20px;
  }
  @media (min-width: 768px) {
    .modal-box { border-radius: 18px; max-height: 90vh; }
  }
`;

// Calculate days remaining from SLA deadline
const calculateDaysRemaining = (deadlineStr) => {
  if (!deadlineStr) return 0;
  const target = new Date(deadlineStr);
  const today = new Date("2026-08-26"); // 2026 Context
  const diffTime = target - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// ==========================================
// MODERN VECTOR LOGO
// ==========================================
function InclusiveXLogo({ onClick }) {
  return (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", flexShrink: 0 }}>
      <div style={{
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(37, 99, 235, 0.4)",
        border: "1px solid rgba(255, 255, 255, 0.2)"
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="4" r="2" />
          <path d="M12 7v5" />
          <path d="M8 12h8" />
          <path d="M9 16l-2 4" />
          <path d="M15 16l2 4" />
          <path d="M5 9l2-1 3 2" />
        </svg>
      </div>
      <div>
        <div style={{ fontSize: "18px", fontWeight: "900", letterSpacing: "-0.5px", color: "#ffffff", lineHeight: "1" }}>
          Inclusive<span style={{ color: "#38bdf8" }}>X</span>
        </div>
        <div style={{ fontSize: "8px", fontWeight: "800", color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase", marginTop: "2px" }}>
          Audit to Action
        </div>
      </div>
    </div>
  );
}

// Initial Sample Data Sets
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
      { date: "2026-08-21", title: "Audit Verified", note: "Ground auditor confirmed barrier width < 60cm." },
      { date: "2026-08-22", title: "Assigned", note: "Sent to JMC Infrastructure wing." },
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
      { date: "2026-08-22", title: "Report Logged", note: "Assigned to Campus Estate Head." },
      { date: "2026-08-24", title: "Action Taken", note: "Tiles re-laid; photo proof submitted by department." }
    ]
  },
  {
    id: "IX-2026-00126",
    title: "Main elevator out of service",
    institution: "City Railway Junction",
    locationDetail: "Platform 1 & 2 Overbridge",
    placeCategory: "Public Transport",
    accessCategory: "Lift",
    severity: "Critical",
    description: "Elevator connecting main entrance to overbridge is non-functional with no alternative ramp available.",
    responsibleAuthority: "Railway Division Office",
    responsibleOfficer: "S. K. Patnaik",
    department: "Electrical & Maintenance",
    assignedDate: "2026-08-24",
    deadline: "2026-08-26",
    status: "Escalated",
    step: 3,
    escalationLevel: 3,
    photoUrl: "",
    timeline: [
      { date: "2026-08-24", title: "Critical Escalation", note: "Logged as high severity due to public transit impact." }
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
  },
  {
    name: "City Railway Junction",
    category: "Public Transport",
    accessibilityScore: 64,
    actionScore: 51,
    breakdown: { entrance: 70, ramps: 60, toilets: 65, signage: 75, lifts: 50 }
  }
];

const SAMPLE_REVIEWS = [
  { id: 1, place: "MGM Hospital & Medical Centre", rating: 4, author: "Aman S.", text: "Entrance ramp is smooth now, but emergency block ramp still needs clearing.", targetId: "IX-2026-00124", resolved: true },
  { id: 2, place: "St. Xavier College Academic Block", rating: 5, author: "Priya M.", text: "Very supportive tactile paths across main corridor!", targetId: "IX-2026-00125", resolved: true }
];

const SAMPLE_COMPLAINTS = [
  { id: "CMP-2026-0042", title: "Elevator non-functional for 3 consecutive days", place: "City Railway Junction", urgency: "Critical", status: "Open" },
  { id: "CMP-2026-0043", title: "Handrail loose at central park entrance", place: "Jubilee Park Gate 1", urgency: "Medium", status: "Under Review" }
];

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function InclusiveXApp() {
  const [reports, setReports] = useState(() => {
    const local = localStorage.getItem("ix_reports");
    return local ? JSON.parse(local) : SAMPLE_REPORTS;
  });

  const [places] = useState(SAMPLE_PLACES);
  const [reviews, setReviews] = useState(SAMPLE_REVIEWS);
  const [complaints, setComplaints] = useState(SAMPLE_COMPLAINTS);
  const [feedbackList, setFeedbackList] = useState([]);

  const [activeTab, setActiveTab] = useState("home");
  const [userRole, setUserRole] = useState("user");
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [submittedSuccessReport, setSubmittedSuccessReport] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [scoreFilter, setScoreFilter] = useState("");

  // Controlled Form States (Focus-Safe)
  const [newReport, setNewReport] = useState({
    description: "",
    placeCategory: "Hospital",
    institution: "",
    accessCategory: "Ramp",
    severity: "Medium",
    photoUrl: ""
  });

  const [newReview, setNewReview] = useState({ place: SAMPLE_PLACES[0].name, rating: 5, author: "", text: "", resolved: true });
  const [newComplaint, setNewComplaint] = useState({ title: "", place: "", urgency: "High", reportId: "" });
  const [newFeedback, setNewFeedback] = useState({ type: "Suggestion", comment: "" });

  useEffect(() => {
    localStorage.setItem("ix_reports", JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
    return () => styleTag.remove();
  }, []);

  // Handlers
  const handleCreateReport = (e) => {
    e.preventDefault();
    if (!newReport.institution || !newReport.description) {
      alert("Please fill in place name and description!");
      return;
    }

    const created = {
      id: `IX-2026-00${127 + reports.length}`,
      title: `${newReport.accessCategory} barrier at ${newReport.institution}`,
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
      photoUrl: newReport.photoUrl || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
      timeline: [{ date: "2026-08-26", title: "Report Logged", note: "Logged into action pipeline." }]
    };

    setReports([created, ...reports]);
    setSubmittedSuccessReport(created);
    setNewReport({ description: "", placeCategory: "Hospital", institution: "", accessCategory: "Ramp", severity: "Medium", photoUrl: "" });
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.author || !newReview.text) return;
    setReviews([{ id: Date.now(), ...newReview, rating: Number(newReview.rating) }, ...reviews]);
    setNewReview({ place: SAMPLE_PLACES[0].name, rating: 5, author: "", text: "", resolved: true });
  };

  const handleAddComplaint = (e) => {
    e.preventDefault();
    if (!newComplaint.title || !newComplaint.place) return;
    setComplaints([{ id: `CMP-2026-00${44 + complaints.length}`, ...newComplaint, status: "Submitted" }, ...complaints]);
    setNewComplaint({ title: "", place: "", urgency: "High", reportId: "" });
  };

  const handleAddFeedback = (e) => {
    e.preventDefault();
    if (!newFeedback.comment) return;
    setFeedbackList([{ id: Date.now(), ...newFeedback, date: "2026-08-26" }, ...feedbackList]);
    setNewFeedback({ type: "Suggestion", comment: "" });
    alert("Thank you for your feedback!");
  };

  const handleAdminStepUpdate = (id, newStep) => {
    setReports(reports.map(r => {
      if (r.id === id) {
        let newStatus = r.status;
        if (newStep === 6) newStatus = "Resolved";
        else if (newStep === 5) newStatus = "Awaiting Verification";
        else if (newStep >= 2) newStatus = "Action In Progress";
        return { ...r, step: newStep, status: newStatus };
      }
      return r;
    }));
  };

  const handleAdminEscalate = (id) => {
    setReports(reports.map(r => {
      if (r.id === id) {
        const nextLvl = (r.escalationLevel || 1) + 1;
        return {
          ...r,
          escalationLevel: nextLvl,
          status: "Escalated",
          timeline: [...r.timeline, { date: "2026-08-26", title: `Escalated to Level ${nextLvl}`, note: "Manually escalated by Admin Nodal Cell." }]
        };
      }
      return r;
    }));
  };

  const filteredReports = useMemo(() => {
    return reports.filter(r => 
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [reports, searchQuery]);

  const filteredPlaces = useMemo(() => {
    return places.filter(p => p.name.toLowerCase().includes(scoreFilter.toLowerCase()) || p.category.toLowerCase().includes(scoreFilter.toLowerCase()));
  }, [places, scoreFilter]);

  const activeModalReport = useMemo(() => reports.find(r => r.id === selectedReportId), [reports, selectedReportId]);

  // Statistics
  const stats = useMemo(() => {
    const total = reports.length;
    const active = reports.filter(r => r.step >= 1 && r.step < 6).length;
    const resolved = reports.filter(r => r.step === 6 || r.status === "Resolved").length;
    const overdue = reports.filter(r => r.status === "Overdue" || calculateDaysRemaining(r.deadline) < 0).length;
    const avgActionScore = Math.round(places.reduce((acc, curr) => acc + curr.actionScore, 0) / (places.length || 1));
    return { total, active, resolved, overdue, avgActionScore };
  }, [reports, places]);

  return (
    <div>
      {/* APP HEADER */}
      <header className="app-header">
        <div className="nav-container">
          <div className="nav-left-section">
            <InclusiveXLogo onClick={() => setActiveTab("home")} />

            <nav className="nav-links">
              <button className={`nav-btn ${activeTab === "home" ? "active" : ""}`} onClick={() => setActiveTab("home")}>🏠 Home</button>
              <button className={`nav-btn ${activeTab === "report" ? "active" : ""}`} onClick={() => { setSubmittedSuccessReport(null); setActiveTab("report"); }}>📝 Report</button>
              <button className={`nav-btn ${activeTab === "track" ? "active" : ""}`} onClick={() => setActiveTab("track")}>🔍 Track</button>
              <button className={`nav-btn ${activeTab === "scores" ? "active" : ""}`} onClick={() => setActiveTab("scores")}>📊 Scores</button>
              <button className={`nav-btn ${activeTab === "reviews" ? "active" : ""}`} onClick={() => setActiveTab("reviews")}>💬 Reviews</button>
              <button className={`nav-btn ${activeTab === "complaints" ? "active" : ""}`} onClick={() => setActiveTab("complaints")}>⚠️ Complaints</button>
              <button className={`nav-btn ${activeTab === "feedback" ? "active" : ""}`} onClick={() => setActiveTab("feedback")}>💡 Feedback</button>
              {userRole === "admin" && (
                <button className={`nav-btn ${activeTab === "admin" ? "active" : ""}`} onClick={() => setActiveTab("admin")}>⚡ Admin Console</button>
              )}
            </nav>

            <button
              className="role-toggle"
              onClick={() => {
                const nextRole = userRole === "user" ? "admin" : "user";
                setUserRole(nextRole);
                setActiveTab(nextRole === "admin" ? "admin" : "home");
              }}
            >
              {userRole === "user" ? "🛡️ Switch to Admin" : "👤 Public View"}
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">

        {/* 1. HOMEPAGE */}
        {activeTab === "home" && (
          <div>
            <div className="hero-card">
              <span style={{ color: "#38bdf8", fontWeight: "800", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase" }}>
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
                  📝 Report an Accessibility Problem
                </button>
                <button className="btn-secondary" onClick={() => setActiveTab("track")}>
                  🔍 Check a Report Status
                </button>
              </div>
            </div>

            {/* LIVE STATISTICS */}
            <div className="grid-5" style={{ marginBottom: "20px" }}>
              <div className="score-card-box">
                <div style={{ fontSize: "10px", color: "#64748b", fontWeight: "800" }}>TOTAL REPORTS</div>
                <div style={{ fontSize: "22px", fontWeight: "900" }}>{stats.total}</div>
              </div>
              <div className="score-card-box">
                <div style={{ fontSize: "10px", color: "#2563eb", fontWeight: "800" }}>ACTIVE AUDITS</div>
                <div style={{ fontSize: "22px", fontWeight: "900", color: "#2563eb" }}>{stats.active}</div>
              </div>
              <div className="score-card-box">
                <div style={{ fontSize: "10px", color: "#10b981", fontWeight: "800" }}>RESOLVED</div>
                <div style={{ fontSize: "22px", fontWeight: "900", color: "#10b981" }}>{stats.resolved}</div>
              </div>
              <div className="score-card-box">
                <div style={{ fontSize: "10px", color: "#ef4444", fontWeight: "800" }}>OVERDUE CASES</div>
                <div style={{ fontSize: "22px", fontWeight: "900", color: "#ef4444" }}>{stats.overdue}</div>
              </div>
              <div className="score-card-box">
                <div style={{ fontSize: "10px", color: "#7c3aed", fontWeight: "800" }}>AVG ACTION SCORE</div>
                <div style={{ fontSize: "22px", fontWeight: "900", color: "#7c3aed" }}>{stats.avgActionScore}/100</div>
              </div>
            </div>

            {/* 6-STEP WORKFLOW TRACKER */}
            <div className="card">
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>6-Step Audit to Action Pipeline</h3>
              <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "12px" }}>Nothing should disappear after it is reported.</p>
              
              <div className="step-tracker-bar">
                {["1. Identify", "2. Audit", "3. Assign", "4. Act", "5. Monitor", "6. Verify"].map((step, idx) => (
                  <div key={step} className="step-node completed">
                    <div className="step-circle">{idx + 1}</div>
                    <div className="step-title">{step.split(" ")[1]}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="grid-2">
              <div className="card">
                <h4 style={{ fontSize: "14px", fontWeight: "800", marginBottom: "10px" }}>🔥 Recent Accessibility Reports</h4>
                {reports.slice(0, 3).map(r => (
                  <div key={r.id} style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "10px", marginBottom: "10px" }}>
                    <div style={{ fontSize: "13px", fontWeight: "700" }}>{r.title}</div>
                    <div style={{ fontSize: "11px", color: "#64748b", display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                      <span>🏢 {r.institution}</span>
                      <span className={`badge ${r.status === "Overdue" ? "badge-overdue" : "badge-active"}`}>{r.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card">
                <h4 style={{ fontSize: "14px", fontWeight: "800", marginBottom: "10px" }}>⭐ Verified Accessibility Scores</h4>
                {places.map(p => (
                  <div key={p.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px", marginBottom: "10px" }}>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "700" }}>{p.name}</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>{p.category}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "13px", fontWeight: "900", color: "#2563eb" }}>{p.accessibilityScore}/100</div>
                      <div style={{ fontSize: "10px", color: "#10b981", fontWeight: "800" }}>Action: {p.actionScore}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. REPORT AN ACCESSIBILITY PROBLEM */}
        {activeTab === "report" && (
          <div>
            {submittedSuccessReport ? (
              <div className="card" style={{ textAlign: "center", padding: "32px 20px" }}>
                <div style={{ fontSize: "40px" }}>🎉</div>
                <h2 style={{ fontSize: "20px", fontWeight: "900", margin: "10px 0 6px 0" }}>Report Submitted Successfully!</h2>
                <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "16px" }}>
                  Your report tracking ID: <strong style={{ color: "#2563eb" }}>{submittedSuccessReport.id}</strong>
                </p>
                
                <div className="score-card-box" style={{ textAlign: "left", maxWidth: "450px", margin: "0 auto 20px auto", fontSize: "12px" }}>
                  <div><strong>Place:</strong> {submittedSuccessReport.institution}</div>
                  <div><strong>Severity:</strong> {submittedSuccessReport.severity}</div>
                  <div><strong>Status:</strong> {submittedSuccessReport.status}</div>
                  <div><strong>Target SLA Deadline:</strong> {submittedSuccessReport.deadline}</div>
                </div>

                <button className="btn-primary" onClick={() => setActiveTab("track")}>🔍 Track Report Status Now</button>
              </div>
            ) : (
              <div className="card">
                <h2 style={{ fontSize: "20px", fontWeight: "900" }}>Report an Accessibility Barrier</h2>
                <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "16px" }}>
                  You don't need to know technical accessibility terms. Tell us what you found in your own words.
                </p>

                <form onSubmit={handleCreateReport}>
                  <div className="form-group">
                    <label className="form-label">A. What did you find? *</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="e.g. Ramp is blocked by parked delivery vehicles and heavy concrete sandbags..."
                      value={newReport.description}
                      onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">B. Location / Place Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. MGM Hospital Gate 2 Entrance"
                      value={newReport.institution}
                      onChange={(e) => setNewReport({ ...newReport, institution: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">C. Where is the problem?</label>
                      <select className="form-control" value={newReport.placeCategory} onChange={(e) => setNewReport({ ...newReport, placeCategory: e.target.value })}>
                        <option value="Hospital">Hospital / Health Center</option>
                        <option value="School / College">School / College</option>
                        <option value="Public Transport">Railway Station / Bus Depot</option>
                        <option value="Government Office">Government Office</option>
                        <option value="Commercial">Shopping / Commercial Area</option>
                        <option value="Other">Other Public Space</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">D. Accessibility Category</label>
                      <select className="form-control" value={newReport.accessCategory} onChange={(e) => setNewReport({ ...newReport, accessCategory: e.target.value })}>
                        <option value="Entrance">Main Entrance</option>
                        <option value="Ramp">Ramp / Slope</option>
                        <option value="Lift">Lift / Elevator</option>
                        <option value="Accessible Toilet">Accessible Toilet</option>
                        <option value="Pathway">Pathway / Tactile Paving</option>
                        <option value="Signage">Signage & Braille</option>
                        <option value="Parking">Disabled Parking</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">E. Severity Impact</label>
                      <select className="form-control" value={newReport.severity} onChange={(e) => setNewReport({ ...newReport, severity: e.target.value })}>
                        <option value="Low">Low (Minor improvement - 14 Days SLA)</option>
                        <option value="Medium">Medium (Important barrier - 7 Days SLA)</option>
                        <option value="High">High (Significant obstacle - 3 Days SLA)</option>
                        <option value="Critical">Critical (Severe hazard / blocked access - 24-48h SLA)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">F. Photo Evidence (Optional Image URL)</label>
                      <input
                        type="url"
                        className="form-control"
                        placeholder="Paste photo link or leave blank"
                        value={newReport.photoUrl}
                        onChange={(e) => setNewReport({ ...newReport, photoUrl: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary">🚀 Submit Accessibility Report</button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* 3. REPORT TRACKING */}
        {activeTab === "track" && (
          <div>
            <div className="card">
              <h2 style={{ fontSize: "20px", fontWeight: "900", marginBottom: "12px" }}>🔍 Track Accessibility Reports</h2>
              <input
                type="text"
                className="form-control"
                placeholder="Search by Report ID (e.g. IX-2026-00124), place, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {filteredReports.length === 0 ? (
              <div className="card" style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                We couldn't find that report. Check the Report ID and try again.
              </div>
            ) : (
              filteredReports.map((report) => {
                const daysLeft = calculateDaysRemaining(report.deadline);
                const isOverdue = daysLeft < 0 && report.status !== "Resolved";

                return (
                  <div key={report.id} className="card" style={{ borderLeft: isOverdue ? "5px solid #ef4444" : "5px solid #2563eb" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <span style={{ fontSize: "11px", fontWeight: "800", color: "#2563eb" }}>{report.id}</span>
                        <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>{report.title}</h3>
                        <div style={{ fontSize: "12px", color: "#64748b" }}>🏢 {report.institution}</div>
                      </div>
                      <span className={`badge ${isOverdue ? "badge-overdue" : report.status === "Resolved" ? "badge-resolved" : "badge-active"}`}>
                        {isOverdue ? "OVERDUE" : report.status}
                      </span>
                    </div>

                    {/* PIPELINE PROGRESS TRACKER */}
                    <div className="step-tracker-bar">
                      {[
                        { num: 1, label: "Identify" },
                        { num: 2, label: "Audit" },
                        { num: 3, label: "Assign" },
                        { num: 4, label: "Act" },
                        { num: 5, label: "Monitor" },
                        { num: 6, label: "Verify" }
                      ].map((s) => (
                        <div key={s.num} className={`step-node ${s.num <= report.step ? (isOverdue && s.num === report.step ? "overdue" : "completed") : ""}`}>
                          <div className="step-circle">{s.num}</div>
                          <div className="step-title">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {isOverdue && (
                      <div className="badge badge-overdue" style={{ width: "100%", justifyContent: "center", margin: "6px 0", padding: "6px" }}>
                        ⚠️ SLA Exceeded: Auto-escalated to Level {report.escalationLevel || 2} Officer
                      </div>
                    )}

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>
                        <strong>Authority:</strong> {report.responsibleAuthority} • ⌛ <strong>SLA:</strong> {daysLeft >= 0 ? `${daysLeft} days left` : `${Math.abs(daysLeft)} days overdue`}
                      </div>
                      <button className="btn-outline btn-sm" onClick={() => setSelectedReportId(report.id)}>
                        📋 View Full Details
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* 4. PUBLIC ACCESSIBILITY & ACTION SCORES */}
        {activeTab === "scores" && (
          <div>
            <div className="card">
              <h2 style={{ fontSize: "20px", fontWeight: "900" }}>📊 Accessibility & Action Scores</h2>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 12px 0" }}>
                <strong>Accessibility Score</strong> measures physical compliance. <strong>Action Score</strong> measures how fast reported problems are resolved.
              </p>
              <input
                type="text"
                className="form-control"
                placeholder="Search place by name..."
                value={scoreFilter}
                onChange={(e) => setScoreFilter(e.target.value)}
              />
            </div>

            <div className="grid-2">
              {filteredPlaces.map((place) => (
                <div key={place.name} className="card">
                  <h3 style={{ fontSize: "16px", fontWeight: "800" }}>{place.name}</h3>
                  <span style={{ fontSize: "12px", color: "#64748b" }}>Category: {place.category}</span>

                  <div className="grid-2" style={{ margin: "14px 0" }}>
                    <div className="score-card-box">
                      <div style={{ fontSize: "10px", color: "#2563eb", fontWeight: "800" }}>ACCESSIBILITY SCORE</div>
                      <div style={{ fontSize: "24px", fontWeight: "900", color: "#1e40af" }}>{place.accessibilityScore}/100</div>
                    </div>
                    <div className="score-card-box">
                      <div style={{ fontSize: "10px", color: "#10b981", fontWeight: "800" }}>ACTION SCORE</div>
                      <div style={{ fontSize: "24px", fontWeight: "900", color: "#047857" }}>{place.actionScore}/100</div>
                    </div>
                  </div>

                  <div style={{ fontSize: "12px", fontWeight: "700", marginBottom: "6px" }}>Detailed Access Breakdown</div>
                  {Object.entries(place.breakdown).map(([key, val]) => (
                    <div key={key} style={{ marginBottom: "6px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#475569" }}>
                        <span style={{ textTransform: "capitalize" }}>{key}</span>
                        <span>{val}%</span>
                      </div>
                      <div className="progress-bg">
                        <div className="progress-fill" style={{ width: `${val}%`, background: val >= 80 ? "#10b981" : val >= 60 ? "#f59e0b" : "#ef4444" }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. REVIEWS */}
        {activeTab === "reviews" && (
          <div>
            <div className="card">
              <h2 style={{ fontSize: "20px", fontWeight: "900", marginBottom: "6px" }}>💬 Community Reviews</h2>
              <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "14px" }}>
                Public verification reviews on resolved accessibility actions.
              </p>
              
              <form onSubmit={handleAddReview} style={{ marginBottom: "16px" }}>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Place Name</label>
                    <select className="form-control" value={newReview.place} onChange={(e) => setNewReview({ ...newReview, place: e.target.value })}>
                      {places.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Rating</label>
                    <select className="form-control" value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}>
                      <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                      <option value="4">⭐⭐⭐⭐ (4/5)</option>
                      <option value="3">⭐⭐⭐ (3/5)</option>
                      <option value="2">⭐⭐ (2/5)</option>
                      <option value="1">⭐ (1/5)</option>
                    </select>
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input type="text" className="form-control" placeholder="e.g. Rahul Sharma" value={newReview.author} onChange={(e) => setNewReview({ ...newReview, author: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Was this barrier actually resolved?</label>
                    <select className="form-control" value={newReview.resolved ? "yes" : "no"} onChange={(e) => setNewReview({ ...newReview, resolved: e.target.value === "yes" })}>
                      <option value="yes">👍 Yes, it looks resolved</option>
                      <option value="no">👎 No, it is still a problem</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Feedback Comments</label>
                  <textarea className="form-control" rows="2" placeholder="Tell us what you saw..." value={newReview.text} onChange={(e) => setNewReview({ ...newReview, text: e.target.value })} required />
                </div>
                <button type="submit" className="btn-primary">Post Community Review</button>
              </form>
            </div>

            <div className="grid-2">
              {reviews.map(rev => (
                <div key={rev.id} className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ fontSize: "14px", fontWeight: "800" }}>{rev.place}</h4>
                    <span style={{ color: "#f59e0b", fontSize: "12px" }}>{"⭐".repeat(rev.rating)}</span>
                  </div>
                  <div style={{ margin: "6px 0" }}>
                    <span className={`badge ${rev.resolved ? "badge-resolved" : "badge-overdue"}`}>
                      {rev.resolved ? "👍 Verified Fixed" : "👎 Still Broken"}
                    </span>
                  </div>
                  <p style={{ fontSize: "13px", color: "#475569", margin: "8px 0" }}>"{rev.text}"</p>
                  <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "700" }}>— {rev.author}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. COMPLAINTS */}
        {activeTab === "complaints" && (
          <div>
            <div className="card">
              <h2 style={{ fontSize: "20px", fontWeight: "900", marginBottom: "6px" }}>⚠️ Official Escalated Complaints</h2>
              <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "14px" }}>
                Submit a complaint if an authority missed deadlines or provided incorrect resolution proof.
              </p>
              
              <form onSubmit={handleAddComplaint} style={{ marginBottom: "16px" }}>
                <div className="form-group">
                  <label className="form-label">Complaint Title *</label>
                  <input type="text" className="form-control" placeholder="e.g. Ramp blocked again despite marked resolved" value={newComplaint.title} onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })} required />
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Location / Place *</label>
                    <input type="text" className="form-control" placeholder="e.g. City Railway Junction" value={newComplaint.place} onChange={(e) => setNewComplaint({ ...newComplaint, place: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Urgency Level</label>
                    <select className="form-control" value={newComplaint.urgency} onChange={(e) => setNewComplaint({ ...newComplaint, urgency: e.target.value })}>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn-primary">Lodge Official Complaint</button>
              </form>
            </div>

            {complaints.map(cmp => (
              <div key={cmp.id} className="card" style={{ borderLeft: "4px solid #f59e0b" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: "11px", fontWeight: "800", color: "#64748b" }}>{cmp.id}</span>
                    <h3 style={{ fontSize: "15px", fontWeight: "800" }}>{cmp.title}</h3>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>📍 {cmp.place}</div>
                  </div>
                  <span className="badge badge-overdue">{cmp.urgency}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 7. FEEDBACK & IDEAS */}
        {activeTab === "feedback" && (
          <div>
            <div className="card">
              <h2 style={{ fontSize: "20px", fontWeight: "900", marginBottom: "6px" }}>💡 Feedback & Ideas</h2>
              <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "14px" }}>
                Help us improve InclusiveX. No login required.
              </p>

              <form onSubmit={handleAddFeedback}>
                <div className="form-group">
                  <label className="form-label">Feedback Type</label>
                  <select className="form-control" value={newFeedback.type} onChange={(e) => setNewFeedback({ ...newFeedback, type: e.target.value })}>
                    <option value="Suggestion">Suggestion</option>
                    <option value="Bug">Bug Report</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Positive Feedback">Positive Feedback</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Comments</label>
                  <textarea className="form-control" rows="3" placeholder="Tell us how we can make accessibility reporting easier..." value={newFeedback.comment} onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })} required />
                </div>
                <button type="submit" className="btn-primary">Submit Feedback</button>
              </form>
            </div>

            {feedbackList.map(item => (
              <div key={item.id} className="card">
                <span className="badge badge-active">{item.type}</span>
                <p style={{ fontSize: "13px", margin: "8px 0" }}>"{item.comment}"</p>
                <div style={{ fontSize: "10px", color: "#94a3b8" }}>Date: {item.date}</div>
              </div>
            ))}
          </div>
        )}

        {/* 8. ADMIN DASHBOARD */}
        {userRole === "admin" && activeTab === "admin" && (
          <div>
            <div className="card" style={{ background: "#0f172a", color: "#ffffff" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#ffffff" }}>🛡️ Official Nodal Officer Dashboard</h2>
              <p style={{ fontSize: "13px", color: "#94a3b8" }}>Manage pipelines, enforce SLA deadlines, and escalate unresolved cases.</p>
            </div>

            {reports.map(r => (
              <div key={r.id} className="card">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: "11px", fontWeight: "800", color: "#2563eb" }}>{r.id}</span>
                    <h3 style={{ fontSize: "16px", fontWeight: "800" }}>{r.title}</h3>
                  </div>
                  <span className="badge badge-active">Step {r.step}/6</span>
                </div>

                <div className="grid-2" style={{ marginTop: "12px" }}>
                  <div className="form-group">
                    <label className="form-label">Update Pipeline Stage</label>
                    <select
                      className="form-control"
                      value={r.step}
                      onChange={(e) => handleAdminStepUpdate(r.id, Number(e.target.value))}
                    >
                      <option value="1">Step 1: Identify / Logged</option>
                      <option value="2">Step 2: Audit Verified</option>
                      <option value="3">Step 3: Department Assigned</option>
                      <option value="4">Step 4: Action Underway</option>
                      <option value="5">Step 5: Awaiting Verification</option>
                      <option value="6">Step 6: Verified & Resolved</option>
                    </select>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <button className="btn-secondary" style={{ background: "#ef4444", border: "none" }} onClick={() => handleAdminEscalate(r.id)}>
                      ⚡ Escalate SLA Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* FULL REPORT DETAIL MODAL */}
      {activeModalReport && (
        <div className="modal-overlay" onClick={() => setSelectedReportId(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span className="badge badge-active">{activeModalReport.id}</span>
                <h2 style={{ fontSize: "18px", fontWeight: "900", marginTop: "4px" }}>{activeModalReport.title}</h2>
              </div>
              <button style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }} onClick={() => setSelectedReportId(null)}>✕</button>
            </div>

            {activeModalReport.photoUrl && (
              <img src={activeModalReport.photoUrl} alt="Barrier Evidence" style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "12px", margin: "12px 0" }} />
            )}

            <p style={{ fontSize: "13px", color: "#475569", margin: "8px 0" }}>{activeModalReport.description}</p>

            <div className="score-card-box" style={{ fontSize: "12px", marginBottom: "16px" }}>
              <div><strong>Responsible Authority:</strong> {activeModalReport.responsibleAuthority}</div>
              <div><strong>Nodal Officer:</strong> {activeModalReport.responsibleOfficer}</div>
              <div><strong>Department:</strong> {activeModalReport.department}</div>
              <div><strong>Target Deadline:</strong> {activeModalReport.deadline}</div>
            </div>

            <h4 style={{ fontSize: "14px", fontWeight: "800", marginBottom: "8px" }}>Audit Progress Timeline</h4>
            <div style={{ paddingLeft: "10px", borderLeft: "2px solid #e2e8f0" }}>
              {activeModalReport.timeline.map((item, idx) => (
                <div key={idx} style={{ marginBottom: "10px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "800" }}>{item.title} <span style={{ fontSize: "10px", color: "#94a3b8" }}>({item.date})</span></div>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// MOUNT TO REACT ROOT CONTAINER
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<InclusiveXApp />);
}
