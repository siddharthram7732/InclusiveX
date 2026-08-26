import React, { useState, useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";

// ==========================================
// STYLES & ACCESSIBLE COLOR SYSTEM
// ==========================================
const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
  }
  
  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .brand-title {
    font-size: 22px;
    font-weight: 800;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    text-decoration: none;
  }
  
  .brand-badge {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .nav-links {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }
  
  .nav-btn {
    background: transparent;
    color: #94a3b8;
    border: none;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .nav-btn:hover, .nav-btn.active {
    color: #ffffff;
    background: #1e293b;
  }
  
  .nav-btn.active {
    border-bottom: 2px solid #3b82f6;
  }
  
  .role-toggle {
    background: #1e293b;
    border: 1px solid #334155;
    color: #f59e0b;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
  }
  .role-toggle:hover {
    background: #334155;
    color: #fff;
  }
  
  .main-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px 20px 60px 20px;
  }
  
  /* CARDS & CONTAINERS */
  .card {
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    padding: 24px;
    margin-bottom: 24px;
  }
  
  .hero-card {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: #ffffff;
    border-radius: 24px;
    padding: 40px 32px;
    margin-bottom: 32px;
    box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.3);
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #ffffff;
    border: none;
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.1s, box-shadow 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }
  .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
  }
  
  .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .btn-outline {
    background: #ffffff;
    color: #0f172a;
    border: 1px solid #cbd5e1;
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-outline:hover {
    background: #f1f5f9;
    border-color: #94a3b8;
  }
  
  /* FORMS & INPUTS - High stability to avoid focus loss */
  .form-group {
    margin-bottom: 20px;
  }
  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 6px;
  }
  .form-subtext {
    font-size: 12px;
    color: #64748b;
    margin-bottom: 6px;
  }
  .form-control {
    width: 100%;
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
    background: #ffffff;
    color: #0f172a;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
  }
  .form-control:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
  
  /* GRID & LAYOUTS */
  .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
  .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
  .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }

  /* 6-STEP TRACKER VISUAL */
  .step-tracker-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin: 24px 0;
  }
  .step-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
    flex: 1;
    text-align: center;
  }
  .step-circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 14px;
    background: #e2e8f0;
    color: #64748b;
    border: 3px solid #ffffff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  }
  .step-node.active .step-circle {
    background: #2563eb;
    color: #ffffff;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.25);
  }
  .step-node.completed .step-circle {
    background: #10b981;
    color: #ffffff;
  }
  .step-node.overdue .step-circle {
    background: #ef4444;
    color: #ffffff;
  }
  .step-title {
    font-size: 12px;
    font-weight: 700;
    margin-top: 6px;
    color: #475569;
  }
  .step-node.active .step-title { color: #1e293b; }

  /* SCORE BADGES & METRICS */
  .score-card-box {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 16px;
  }
  .progress-bg {
    height: 10px;
    background: #e2e8f0;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 6px;
  }
  .progress-fill {
    height: 100%;
    border-radius: 5px;
    transition: width 0.5s ease;
  }
  
  /* STATUS BADGES */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .badge-resolved { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
  .badge-active { background: #dbeafe; color: #1e40af; border: 1px solid #93c5fd; }
  .badge-warning { background: #fef3c7; color: #b45309; border: 1px solid #fde047; }
  .badge-overdue { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }
  .badge-escalated { background: #f3e8ff; color: #6b21a8; border: 1px solid #d8b4fe; }

  /* MODAL */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 16px;
  }
  .modal-box {
    background: #ffffff;
    border-radius: 20px;
    max-width: 750px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 28px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    .nav-container { flex-direction: column; align-items: flex-start; }
    .hero-card { padding: 24px 18px; }
    .step-title { font-size: 9px; }
    .step-circle { width: 28px; height: 28px; font-size: 11px; }
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

// Initial Seed Data for LocalStorage
const SAMPLE_REPORTS = [
  {
    id: "IX-2026-00124",
    title: "Wheelchair ramp blocked by construction debris",
    institution: "MGM Hospital & Medical Centre",
    locationDetail: "Emergency Entrance Gate 2, Jamshedpur",
    placeCategory: "Hospital",
    accessCategory: "Ramp",
    severity: "High",
    description: "The primary ramp for wheelchair users is completely blocked by sand bags and leftover concrete pipes. Wheelchair patients are forced to use the steep vehicle entry path.",
    responsibleAuthority: "Jamshedpur Municipal Corporation",
    responsibleOfficer: "Er. Rajesh Kumar",
    department: "Public Works Infrastructure Wing",
    assignedDate: "2026-08-20",
    deadline: "2026-08-25",
    status: "Overdue",
    step: 4,
    escalationLevel: 2,
    escalatedTo: "District Magistrate Governance Cell",
    photoUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
    timeline: [
      { date: "2026-08-20", title: "Report Submitted", note: "Citizen logged issue via InclusiveX platform." },
      { date: "2026-08-20", title: "Audit Completed", note: "Auditor validated photo evidence. High severity confirmed." },
      { date: "2026-08-21", title: "Assigned to Authority", note: "Assigned to Er. Rajesh Kumar (JMC)." },
      { date: "2026-08-22", title: "Field Action Initiated", note: "Contractor notified to remove debris." },
      { date: "2026-08-26", title: "SLA Deadline Exceeded", note: "Case auto-escalated to Level 2 (District Office)." }
    ]
  },
  {
    id: "IX-2026-00125",
    title: "Tactile paving path broken and missing braille indicators",
    institution: "St. Xavier College Academic Block",
    locationDetail: "Pathway connecting Library to Block B",
    placeCategory: "School / College",
    accessCategory: "Pathway",
    severity: "Medium",
    description: "Tactile warning tiles for visually impaired students are completely missing near the main staircase gap, creating a serious fall risk.",
    responsibleAuthority: "Campus Development & Estate Dept",
    responsibleOfficer: "Prof. S. K. Verma",
    department: "Infrastructure Maintenance",
    assignedDate: "2026-08-22",
    deadline: "2026-08-29",
    status: "Awaiting Verification",
    step: 5,
    escalationLevel: 1,
    photoUrl: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=600&q=80",
    timeline: [
      { date: "2026-08-22", title: "Report Submitted", note: "Logged by campus accessibility volunteer." },
      { date: "2026-08-23", title: "Assigned", note: "Assigned to Campus Estate Head." },
      { date: "2026-08-25", title: "Action Completed by Dept", note: "New yellow tactile tiles installed. Pending user verification." }
    ]
  },
  {
    id: "IX-2026-00126",
    title: "Elevator out of service on Platform 1 & 2 bridge",
    institution: "Tatanagar Junction Railway Station",
    locationDetail: "Platform 1 Foot Over Bridge Elevator",
    placeCategory: "Railway Station",
    accessCategory: "Lift",
    severity: "Critical",
    description: "The main elevator connecting Platform 1 to Footover bridge has been out of power for 8 days. Elderly passengers and wheelchair users cannot cross platforms.",
    responsibleAuthority: "Indian Railways - Engineering Division",
    responsibleOfficer: "Er. Amit Sharma (Senior Section Engineer)",
    department: "Electrical & Mechanical Ops",
    assignedDate: "2026-08-24",
    deadline: "2026-08-26",
    status: "Escalated",
    step: 4,
    escalationLevel: 3,
    escalatedTo: "Divisional Railway Manager (DRM)",
    photoUrl: "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80",
    timeline: [
      { date: "2026-08-24", title: "Critical Report Logged", note: "High impact on public transit." },
      { date: "2026-08-26", title: "Deadline Missed", note: "Automatic escalation triggered to Level 3 DRM cell." }
    ]
  },
  {
    id: "IX-2026-00127",
    title: "Disabled accessible toilet kept locked under key",
    institution: "District Collectorate Secretariat",
    locationDetail: "Ground Floor Public Service Block",
    placeCategory: "Government Office",
    accessCategory: "Accessible Toilet",
    severity: "High",
    description: "The designated accessible restroom is locked with a padlock and used as a storage closet for cleaning chemicals. Public is denied access.",
    responsibleAuthority: "District Administration",
    responsibleOfficer: "Priya Singh (Administrative Officer)",
    department: "Civil Care",
    assignedDate: "2026-08-15",
    deadline: "2026-08-22",
    status: "Resolved",
    step: 6,
    escalationLevel: 1,
    photoUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    timeline: [
      { date: "2026-08-15", title: "Report Logged", note: "Issue verified by auditor." },
      { date: "2026-08-18", title: "Storage Cleared", note: "Padlock removed and grab rails polished." },
      { date: "2026-08-20", title: "Verified by User", note: "Community user confirmed toilet is open 24/7." }
    ]
  }
];

const SAMPLE_PLACES = [
  {
    name: "MGM Hospital & Medical Centre",
    category: "Hospital",
    accessibilityScore: 82,
    actionScore: 74,
    breakdown: { entrance: 92, ramps: 76, toilets: 84, signage: 78, lifts: 90, pathways: 72, parking: 80 }
  },
  {
    name: "St. Xavier College Academic Block",
    category: "School / College",
    accessibilityScore: 91,
    actionScore: 88,
    breakdown: { entrance: 95, ramps: 90, toilets: 88, signage: 82, lifts: 94, pathways: 89, parking: 92 }
  },
  {
    name: "Tatanagar Junction Railway Station",
    category: "Railway Station",
    accessibilityScore: 64,
    actionScore: 51,
    breakdown: { entrance: 70, ramps: 60, toilets: 50, signage: 65, lifts: 40, pathways: 62, parking: 75 }
  },
  {
    name: "District Collectorate Secretariat",
    category: "Government Office",
    accessibilityScore: 88,
    actionScore: 92,
    breakdown: { entrance: 90, ramps: 88, toilets: 85, signage: 92, lifts: 86, pathways: 91, parking: 87 }
  }
];

const SAMPLE_REVIEWS = [
  {
    id: "REV-101",
    reportId: "IX-2026-00127",
    place: "District Collectorate Secretariat",
    user: "Sunil M. (Wheelchair User)",
    verdict: "RESOLVED",
    comment: "I personally checked the toilet on ground floor today. The padlock has been completely removed and it's sparkling clean with accessible handrails!",
    date: "2026-08-21"
  },
  {
    id: "REV-102",
    reportId: "IX-2026-00125",
    place: "St. Xavier College",
    user: "Ananya R.",
    verdict: "RESOLVED",
    comment: "New high-contrast tactile tiles installed near the library step. Much safer now!",
    date: "2026-08-25"
  }
];

// ==========================================
// MAIN INCLUSIVE-X COMPONENT
// ==========================================
export default function InclusiveXApp() {
  // Persistence State
  const [reports, setReports] = useState(() => {
    const local = localStorage.getItem("inclusivex_reports");
    return local ? JSON.parse(local) : SAMPLE_REPORTS;
  });

  const [places, setPlaces] = useState(() => {
    const local = localStorage.getItem("inclusivex_places");
    return local ? JSON.parse(local) : SAMPLE_PLACES;
  });

  const [reviews, setReviews] = useState(() => {
    const local = localStorage.getItem("inclusivex_reviews");
    return local ? JSON.parse(local) : SAMPLE_REVIEWS;
  });

  const [complaints, setComplaints] = useState(() => {
    const local = localStorage.getItem("inclusivex_complaints");
    return local ? JSON.parse(local) : [
      {
        id: "CMP-2026-0042",
        reportId: "IX-2026-00126",
        type: "Deadline Ignored / Delayed Action",
        description: "Elevator at railway station platform has missed its 48h critical SLA deadline. No maintenance crew on site.",
        status: "Escalated",
        date: "2026-08-26"
      }
    ];
  });

  const [feedbacks, setFeedbacks] = useState([
    { id: "FB-1", type: "Suggestion", comment: "Please add direct audio-guided narration for visually impaired users on report tracking.", date: "2026-08-24" }
  ]);

  // Navigation & Role State
  const [activeTab, setActiveTab] = useState("home"); // home, report, track, scores, reviews, complaints, feedback, about, admin
  const [userRole, setUserRole] = useState("user"); // user, admin
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [submittedSuccessReport, setSubmittedSuccessReport] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // FORM INPUT STATES (Kept at top level to PREVENT input focus loss!)
  const [newReport, setNewReport] = useState({
    description: "",
    placeCategory: "Hospital",
    institution: "",
    accessCategory: "Ramp",
    severity: "Medium",
    additionalInfo: "",
    photoUrl: ""
  });

  const [newComplaint, setNewComplaint] = useState({
    reportId: "",
    type: "Deadline Ignored",
    description: ""
  });

  const [newFeedback, setNewFeedback] = useState({
    type: "Suggestion",
    comment: ""
  });

  const [newReview, setNewReview] = useState({
    reportId: "IX-2026-00125",
    verdict: "RESOLVED",
    comment: ""
  });

  // Admin Triage Form State
  const [adminTriage, setAdminTriage] = useState({
    reportId: "",
    severity: "Medium",
    responsibleAuthority: "",
    responsibleOfficer: "",
    department: "",
    deadline: "",
    step: 3,
    status: "Assigned"
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem("inclusivex_reports", JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem("inclusivex_places", JSON.stringify(places));
  }, [places]);

  useEffect(() => {
    localStorage.setItem("inclusivex_reviews", JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem("inclusivex_complaints", JSON.stringify(complaints));
  }, [complaints]);

  // Global Styles Injector
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
    return () => styleTag.remove();
  }, []);

  // Compute Platform Metrics
  const metrics = useMemo(() => {
    const total = reports.length;
    const active = reports.filter(r => r.status !== "Resolved").length;
    const resolved = reports.filter(r => r.status === "Resolved").length;
    const overdue = reports.filter(r => calculateDaysRemaining(r.deadline) <= 0 && r.status !== "Resolved").length;
    const avgActionScore = Math.round(places.reduce((acc, p) => acc + p.actionScore, 0) / (places.length || 1));
    return { total, active, resolved, overdue, avgActionScore };
  }, [reports, places]);

  // Handle Report Creation
  const handleCreateReport = (e) => {
    e.preventDefault();
    if (!newReport.institution || !newReport.description) {
      alert("Please fill in the place name and description!");
      return;
    }

    const nextId = `IX-2026-00${128 + reports.length}`;
    
    // SLA Days based on Severity
    let slaDays = 7;
    if (newReport.severity === "Critical") slaDays = 2;
    if (newReport.severity === "High") slaDays = 3;
    if (newReport.severity === "Low") slaDays = 14;

    const deadlineDate = new Date("2026-08-26");
    deadlineDate.setDate(deadlineDate.getDate() + slaDays);
    const deadlineStr = deadlineDate.toISOString().split("T")[0];

    const created = {
      id: nextId,
      title: `${newReport.accessCategory} issue at ${newReport.institution}`,
      institution: newReport.institution,
      locationDetail: newReport.institution,
      placeCategory: newReport.placeCategory,
      accessCategory: newReport.accessCategory,
      severity: newReport.severity,
      description: newReport.description,
      responsibleAuthority: "Pending Triage & Audit",
      responsibleOfficer: "Unassigned",
      department: "Governance Triage Cell",
      assignedDate: "2026-08-26",
      deadline: deadlineStr,
      status: "Submitted",
      step: 1,
      escalationLevel: 1,
      photoUrl: newReport.photoUrl || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
      timeline: [
        { date: "2026-08-26", title: "Report Submitted", note: "Logged into InclusiveX pipeline." }
      ]
    };

    setReports([created, ...reports]);
    setSubmittedSuccessReport(created);
    setNewReport({
      description: "",
      placeCategory: "Hospital",
      institution: "",
      accessCategory: "Ramp",
      severity: "Medium",
      additionalInfo: "",
      photoUrl: ""
    });
  };

  // Handle Admin Update
  const handleAdminUpdate = (e) => {
    e.preventDefault();
    if (!adminTriage.reportId) return;

    setReports(prev => prev.map(r => {
      if (r.id === adminTriage.reportId) {
        return {
          ...r,
          severity: adminTriage.severity,
          responsibleAuthority: adminTriage.responsibleAuthority || r.responsibleAuthority,
          responsibleOfficer: adminTriage.responsibleOfficer || r.responsibleOfficer,
          department: adminTriage.department || r.department,
          deadline: adminTriage.deadline || r.deadline,
          step: Number(adminTriage.step),
          status: Number(adminTriage.step) === 5 ? "Awaiting Verification" : Number(adminTriage.step) === 6 ? "Resolved" : "In Progress",
          timeline: [
            ...r.timeline,
            { date: "2026-08-26", title: `Admin Updated (Step ${adminTriage.step})`, note: `Authority assigned: ${adminTriage.responsibleAuthority || 'Updated'}` }
          ]
        };
      }
      return r;
    }));

    alert(`Report ${adminTriage.reportId} successfully updated in SLA pipeline!`);
  };

  // Handle Manual Escalation
  const handleEscalateNow = (reportId) => {
    setReports(prev => prev.map(r => {
      if (r.id === reportId) {
        const newLevel = (r.escalationLevel || 1) + 1;
        return {
          ...r,
          status: "Escalated",
          escalationLevel: newLevel,
          escalatedTo: newLevel >= 3 ? "Divisional Railway / State Vigilance Commission" : "District Magistrate Governance Cell",
          responsibleOfficer: `L${newLevel} Escalation Authority`,
          timeline: [
            ...r.timeline,
            { date: "2026-08-26", title: "MANUAL ESCALATION TRIGGERED", note: `Escalated to Level ${newLevel} due to SLA breach risk.` }
          ]
        };
      }
      return r;
    }));
  };

  // Handle Community Verification (User Review)
  const handleVerifyResolution = (reportId, isResolved) => {
    setReports(prev => prev.map(r => {
      if (r.id === reportId) {
        return {
          ...r,
          status: isResolved ? "Resolved" : "Action Started",
          step: isResolved ? 6 : 4,
          timeline: [
            ...r.timeline,
            { date: "2026-08-26", title: isResolved ? "Verified Resolved by Citizen" : "User Rejected Fix - Re-opened", note: isResolved ? "Issue closed successfully." : "Sent back to authority." }
          ]
        };
      }
      return r;
    }));
  };

  // Filtered reports view
  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      const matchSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = categoryFilter === "ALL" || r.placeCategory === categoryFilter || r.accessCategory === categoryFilter;
      const matchStatus = statusFilter === "ALL" || r.status === statusFilter;
      return matchSearch && matchCat && matchStatus;
    });
  }, [reports, searchQuery, categoryFilter, statusFilter]);

  // Currently viewed report detail modal
  const activeModalReport = useMemo(() => {
    return reports.find(r => r.id === selectedReportId);
  }, [reports, selectedReportId]);

  return (
    <div>
      {/* APP HEADER & NAVBAR */}
      <header className="app-header">
        <div className="nav-container">
          <div className="brand-title" onClick={() => setActiveTab("home")}>
            <span>♿ InclusiveX</span>
            <span className="brand-badge">Yuva 6.0 | Audit to Action</span>
          </div>

          <nav className="nav-links">
            <button className={`nav-btn ${activeTab === "home" ? "active" : ""}`} onClick={() => setActiveTab("home")}>🏠 Home</button>
            <button className={`nav-btn ${activeTab === "report" ? "active" : ""}`} onClick={() => { setSubmittedSuccessReport(null); setActiveTab("report"); }}>📝 Report Problem</button>
            <button className={`nav-btn ${activeTab === "track" ? "active" : ""}`} onClick={() => setActiveTab("track")}>🔍 Track Reports</button>
            <button className={`nav-btn ${activeTab === "scores" ? "active" : ""}`} onClick={() => setActiveTab("scores")}>📊 Scores</button>
            <button className={`nav-btn ${activeTab === "reviews" ? "active" : ""}`} onClick={() => setActiveTab("reviews")}>💬 Reviews</button>
            <button className={`nav-btn ${activeTab === "complaints" ? "active" : ""}`} onClick={() => setActiveTab("complaints")}>⚠️ Complaints</button>
            <button className={`nav-btn ${activeTab === "feedback" ? "active" : ""}`} onClick={() => setActiveTab("feedback")}>💡 Feedback</button>
            <button className={`nav-btn ${activeTab === "about" ? "active" : ""}`} onClick={() => setActiveTab("about")}>ℹ️ About</button>

            <button
              className="role-toggle"
              onClick={() => {
                const nextRole = userRole === "user" ? "admin" : "user";
                setUserRole(nextRole);
                if (nextRole === "admin") setActiveTab("admin");
                else setActiveTab("home");
              }}
            >
              {userRole === "user" ? "👤 Public Mode → Switch to Admin" : "🛡️ Admin Mode Active → Switch to Public"}
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">

        {/* ==========================================
            1. HOMEPAGE VIEW
           ========================================== */}
        {activeTab === "home" && (
          <div>
            <div className="hero-card">
              <span style={{ color: "#38bdf8", fontWeight: "700", fontSize: "13px", textTransform: "uppercase" }}>
                Yuva 6.0 Accountability Platform
              </span>
              <h1 style={{ fontSize: "36px", fontWeight: "900", margin: "10px 0 12px 0", lineHeight: "1.2" }}>
                Is this place accessible?
              </h1>
              <p style={{ fontSize: "17px", color: "#94a3b8", maxWidth: "700px", marginBottom: "24px" }}>
                Report accessibility barriers, track what happens next, and make sure every issue leads to real action. Know who is responsible. Make sure nothing disappears.
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => { setSubmittedSuccessReport(null); setActiveTab("report"); }}>
                  📝 Report an Accessibility Problem
                </button>
                <button className="btn-secondary" onClick={() => setActiveTab("track")}>
                  🔍 Check a Report Status
                </button>
              </div>

              {/* Quick Jump Links */}
              <div style={{ display: "flex", gap: "16px", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Quick Links:</span>
                <a style={{ color: "#38bdf8", textDecoration: "underline", cursor: "pointer" }} onClick={() => setActiveTab("scores")}>View Accessibility Scores</a>
                <a style={{ color: "#38bdf8", textDecoration: "underline", cursor: "pointer" }} onClick={() => setActiveTab("reviews")}>Community Reviews</a>
                <a style={{ color: "#38bdf8", textDecoration: "underline", cursor: "pointer" }} onClick={() => setActiveTab("complaints")}>File SLA Complaint</a>
                <a style={{ color: "#38bdf8", textDecoration: "underline", cursor: "pointer" }} onClick={() => setActiveTab("feedback")}>Feedback & Ideas</a>
              </div>
            </div>

            {/* 6-STEP WORKFLOW TRACKER EXPLAINER */}
            <div className="card">
              <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a" }}>
                The 6-Step "Audit to Action" Pipeline
              </h2>
              <p style={{ color: "#64748b", fontSize: "14px" }}>
                <strong>Golden Rule:</strong> Nothing should disappear after it is reported. Every case is tracked along a strictly monitored SLA pipeline.
              </p>

              <div className="step-tracker-bar">
                {[
                  { num: 1, title: "1. Identify", sub: "Problem Reported" },
                  { num: 2, title: "2. Audit", sub: "Severity Verified" },
                  { num: 3, title: "3. Assign", sub: "Authority & Deadline" },
                  { num: 4, title: "4. Act", sub: "Field Repair Initiated" },
                  { num: 5, title: "5. Monitor", sub: "SLA Deadline Tracking" },
                  { num: 6, title: "6. Verify", sub: "Public Confirmation" }
                ].map((s) => (
                  <div key={s.num} className="step-node active">
                    <div className="step-circle">{s.num}</div>
                    <div className="step-title">{s.title}</div>
                    <div style={{ fontSize: "10px", color: "#94a3b8" }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* PLATFORM STATISTICS GRID */}
            <div className="grid-4" style={{ marginBottom: "28px" }}>
              <div className="card" style={{ textAlign: "center", borderTop: "4px solid #2563eb" }}>
                <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "700" }}>TOTAL REPORTS LOGGED</div>
                <div style={{ fontSize: "32px", fontWeight: "900", color: "#0f172a", marginTop: "4px" }}>{metrics.total}</div>
                <div style={{ fontSize: "11px", color: "#10b981" }}>Publicly Documented</div>
              </div>
              <div className="card" style={{ textAlign: "center", borderTop: "4px solid #f59e0b" }}>
                <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "700" }}>ACTIVE AUDITS & ACTIONS</div>
                <div style={{ fontSize: "32px", fontWeight: "900", color: "#f59e0b", marginTop: "4px" }}>{metrics.active}</div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>Under Resolution</div>
              </div>
              <div className="card" style={{ textAlign: "center", borderTop: "4px solid #10b981" }}>
                <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "700" }}>ISSUES VERIFIED RESOLVED</div>
                <div style={{ fontSize: "32px", fontWeight: "900", color: "#10b981", marginTop: "4px" }}>{metrics.resolved}</div>
                <div style={{ fontSize: "11px", color: "#10b981" }}>Verified by Citizens</div>
              </div>
              <div className="card" style={{ textAlign: "center", borderTop: "4px solid #ef4444" }}>
                <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "700" }}>OVERDUE / ESCALATED</div>
                <div style={{ fontSize: "32px", fontWeight: "900", color: "#ef4444", marginTop: "4px" }}>{metrics.overdue}</div>
                <div style={{ fontSize: "11px", color: "#ef4444" }}>SLA Deadline Breached</div>
              </div>
            </div>

            {/* ACCESSIBILITY VS ACTION SCORE EXPLAINER */}
            <div className="grid-2">
              <div className="card" style={{ borderLeft: "6px solid #2563eb" }}>
                <h3 style={{ fontSize: "18px", color: "#1e40af", fontWeight: "800" }}>🟦 ACCESSIBILITY SCORE</h3>
                <p style={{ fontSize: "14px", color: "#475569", marginTop: "6px" }}>
                  Measures how accessible a physical venue currently is (0–100) across ramps, elevators, tactile ground indicators, and restrooms.
                </p>
              </div>
              <div className="card" style={{ borderLeft: "6px solid #10b981" }}>
                <h3 style={{ fontSize: "18px", color: "#15803d", fontWeight: "800" }}>🟩 ACTION SCORE</h3>
                <p style={{ fontSize: "14px", color: "#475569", marginTop: "6px" }}>
                  Measures how effectively reported accessibility problems are being acted upon by responsible authorities and resolved before deadlines.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            2. REPORT AN ACCESSIBILITY PROBLEM VIEW
           ========================================== */}
        {activeTab === "report" && (
          <div>
            {submittedSuccessReport ? (
              /* SUCCESS SCREEN AFTER SUBMISSION */
              <div className="card" style={{ textAlign: "center", padding: "40px", borderHeader: "4px solid #10b981" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎉</div>
                <span className="badge badge-resolved" style={{ fontSize: "13px" }}>SUCCESSFULLY LOGGED INTO SLA PIPELINE</span>
                <h2 style={{ fontSize: "24px", fontWeight: "800", marginTop: "12px" }}>
                  Your accessibility report has been submitted!
                </h2>
                <p style={{ color: "#64748b", maxWidth: "550px", margin: "8px auto 20px auto", fontSize: "14px" }}>
                  Nothing disappears after reporting. Your issue has been assigned a unique tracking ID and SLA target deadline.
                </p>

                <div className="score-card-box" style={{ maxWidth: "500px", margin: "0 auto 24px auto", textAlign: "left" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontWeight: "800", color: "#2563eb" }}>REPORT ID:</span>
                    <span style={{ fontWeight: "900" }}>{submittedSuccessReport.id}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#64748b" }}>Institution:</span>
                    <strong style={{ color: "#0f172a" }}>{submittedSuccessReport.institution}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#64748b" }}>Target SLA Deadline:</span>
                    <strong style={{ color: "#d97706" }}>{submittedSuccessReport.deadline}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Current Stage:</span>
                    <strong style={{ color: "#2563eb" }}>Step 1: IDENTIFY</strong>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                  <button className="btn-primary" onClick={() => setActiveTab("track")}>
                    🔍 Track My Report
                  </button>
                  <button className="btn-outline" onClick={() => setSubmittedSuccessReport(null)}>
                    ➕ Report Another Problem
                  </button>
                </div>
              </div>
            ) : (
              /* SIMPLE ACCESSIBLE FORM */
              <div className="card" style={{ maxWidth: "750px", margin: "0 auto" }}>
                <h2 style={{ fontSize: "24px", fontWeight: "900", color: "#0f172a" }}>
                  Report an Accessibility Problem
                </h2>
                <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>
                  You don't need to know technical accessibility terms. Tell us what you found in your own words.
                </p>

                <form onSubmit={handleCreateReport}>
                  <div className="form-group">
                    <label className="form-label">A. What did you find? (Tell us in plain language) *</label>
                    <div className="form-subtext">Describe the obstacle so someone else can locate and fix it.</div>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="e.g. The wheelchair ramp at the main entrance is blocked by construction debris and parked delivery scooters..."
                      value={newReport.description}
                      onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">B. Where is the problem? *</label>
                      <select
                        className="form-control"
                        value={newReport.placeCategory}
                        onChange={(e) => setNewReport({ ...newReport, placeCategory: e.target.value })}
                      >
                        <option value="Hospital">Hospital / Medical Center</option>
                        <option value="School / College">School / College</option>
                        <option value="Railway Station">Railway Station</option>
                        <option value="Government Office">Government Office</option>
                        <option value="Public Place">Public Place / Park</option>
                        <option value="Shopping / Commercial Area">Shopping / Commercial Area</option>
                        <option value="Other">Other Public Building</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">C. Location / Place Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. MGM Medical College Emergency Entrance"
                        value={newReport.institution}
                        onChange={(e) => setNewReport({ ...newReport, institution: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">D. Accessibility Category</label>
                      <select
                        className="form-control"
                        value={newReport.accessCategory}
                        onChange={(e) => setNewReport({ ...newReport, accessCategory: e.target.value })}
                      >
                        <option value="Entrance">Entrance / Doorway</option>
                        <option value="Ramp">Ramp / Slope</option>
                        <option value="Lift">Lift / Elevator</option>
                        <option value="Accessible Toilet">Accessible Toilet</option>
                        <option value="Signage">Signage / Braille</option>
                        <option value="Parking">Disabled Parking</option>
                        <option value="Pathway">Pathway / Tactile Paving</option>
                        <option value="Seating">Seating / Waiting Area</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">E. Severity Level *</label>
                      <select
                        className="form-control"
                        value={newReport.severity}
                        onChange={(e) => setNewReport({ ...newReport, severity: e.target.value })}
                      >
                        <option value="Low">Low Priority (14 Days SLA)</option>
                        <option value="Medium">Medium Priority (7 Days SLA)</option>
                        <option value="High">High Priority (3 Days SLA)</option>
                        <option value="Critical">Critical Urgent Barrier (24–48 Hours SLA)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">F. Photo / Evidence URL (Optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Paste photo link or leave blank for default photo"
                      value={newReport.photoUrl}
                      onChange={(e) => setNewReport({ ...newReport, photoUrl: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px" }}>
                    🚀 Submit Report to Action Engine
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            3. REPORT TRACKING VIEW ("Check a Report")
           ========================================== */}
        {activeTab === "track" && (
          <div>
            <div className="card">
              <h2 style={{ fontSize: "22px", fontWeight: "900", marginBottom: "14px" }}>
                🔍 Public Report Tracker
              </h2>

              <div className="grid-3" style={{ marginBottom: "16px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by ID (e.g. IX-2026-00124), Place or Keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <select className="form-control" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option value="ALL">All Categories</option>
                  <option value="Ramp">Ramps</option>
                  <option value="Lift">Lifts / Elevators</option>
                  <option value="Accessible Toilet">Accessible Toilets</option>
                  <option value="Pathway">Pathways</option>
                  <option value="Hospital">Hospitals</option>
                </select>

                <select className="form-control" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="ALL">All Statuses</option>
                  <option value="Submitted">Submitted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Awaiting Verification">Awaiting Verification</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Overdue">Overdue / SLA Breached</option>
                  <option value="Escalated">Escalated</option>
                </select>
              </div>
            </div>

            {/* REPORT LIST */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {filteredReports.length === 0 ? (
                <div className="card" style={{ textAlign: "center", color: "#64748b" }}>
                  We couldn't find that report. Check the Report ID and try again.
                </div>
              ) : (
                filteredReports.map((report) => {
                  const daysLeft = calculateDaysRemaining(report.deadline);
                  const isOverdue = daysLeft <= 0 && report.status !== "Resolved";

                  return (
                    <div key={report.id} className="card" style={{ borderLeft: isOverdue ? "6px solid #ef4444" : "6px solid #2563eb" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
                        <div>
                          <span style={{ fontSize: "12px", fontWeight: "800", color: "#2563eb" }}>
                            {report.id} • {report.institution}
                          </span>
                          <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginTop: "2px" }}>
                            {report.title}
                          </h3>
                        </div>

                        <div>
                          {isOverdue && <span className="badge badge-overdue">🔴 OVERDUE — SLA BREACHED</span>}
                          {report.status === "Escalated" && <span className="badge badge-escalated">🚨 LEVEL {report.escalationLevel} ESCALATED</span>}
                          {report.status === "Resolved" && <span className="badge badge-resolved">VERIFIED RESOLVED</span>}
                          {report.status !== "Resolved" && !isOverdue && report.status !== "Escalated" && (
                            <span className="badge badge-active">{report.status}</span>
                          )}
                        </div>
                      </div>

                      {/* 6-STEP PROGRESS COMPONENT */}
                      <div className="step-tracker-bar">
                        {["Identify", "Audit", "Assign", "Act", "Monitor", "Verify"].map((stepName, idx) => {
                          const stepNum = idx + 1;
                          const isDone = stepNum <= report.step;
                          const isCurrent = stepNum === report.step;
                          return (
                            <div key={stepName} className={`step-node ${isDone ? (isOverdue ? "overdue" : "completed") : ""} ${isCurrent ? "active" : ""}`}>
                              <div className="step-circle">{stepNum}</div>
                              <div className="step-title">{stepName}</div>
                            </div>
                          );
                        })}
                      </div>

                      {/* ACCOUNTABILITY BOX */}
                      <div className="score-card-box" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", fontSize: "12px" }}>
                        <div>
                          <div style={{ color: "#64748b", fontWeight: "700" }}>ACCOUNTABLE OFFICER</div>
                          <div style={{ fontWeight: "800", color: "#0f172a" }}>👤 {report.responsibleOfficer}</div>
                          <div style={{ color: "#64748b" }}>{report.responsibleAuthority}</div>
                        </div>

                        <div>
                          <div style={{ color: "#64748b", fontWeight: "700" }}>SLA TARGET DEADLINE</div>
                          <div style={{ fontWeight: "800", color: isOverdue ? "#ef4444" : "#d97706" }}>
                            ⏳ {daysLeft > 0 ? `${daysLeft} Days Remaining` : "DEADLINE EXCEEDED"}
                          </div>
                          <div style={{ color: "#64748b" }}>Target: {report.deadline}</div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                          <button className="btn-outline" onClick={() => setSelectedReportId(report.id)}>
                            📋 View Full Audit & Timeline
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ==========================================
            4. PUBLIC ACCESSIBILITY SCORES VIEW
           ========================================== */}
        {activeTab === "scores" && (
          <div>
            <div className="card">
              <h2 style={{ fontSize: "22px", fontWeight: "900", marginBottom: "6px" }}>
                📊 Public Accessibility & Action Scores
              </h2>
              <p style={{ color: "#64748b", fontSize: "14px" }}>
                Transparent accessibility metrics for public institutions based on physical audits and SLA response times.
              </p>
            </div>

            <div className="grid-2">
              {places.map((place) => (
                <div key={place.name} className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <span className="badge badge-active">{place.category}</span>
                      <h3 style={{ fontSize: "18px", fontWeight: "800", marginTop: "4px" }}>{place.name}</h3>
                    </div>
                  </div>

                  {/* SCORE HEADERS */}
                  <div className="grid-2" style={{ marginTop: "16px", marginBottom: "16px" }}>
                    <div className="score-card-box" style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "11px", fontWeight: "800", color: "#2563eb" }}>ACCESSIBILITY SCORE</div>
                      <div style={{ fontSize: "32px", fontWeight: "900", color: "#2563eb" }}>{place.accessibilityScore}<span style={{ fontSize: "16px" }}>/100</span></div>
                      <div style={{ fontSize: "10px", color: "#64748b" }}>Physical Infrastructure</div>
                    </div>

                    <div className="score-card-box" style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "11px", fontWeight: "800", color: "#10b981" }}>ACTION SCORE</div>
                      <div style={{ fontSize: "32px", fontWeight: "900", color: "#10b981" }}>{place.actionScore}<span style={{ fontSize: "16px" }}>/100</span></div>
                      <div style={{ fontSize: "10px", color: "#64748b" }}>SLA Compliance & Speed</div>
                    </div>
                  </div>

                  {/* CATEGORY BREAKDOWN */}
                  <div style={{ fontSize: "12px" }}>
                    <div style={{ fontWeight: "700", marginBottom: "8px", color: "#475569" }}>Category Breakdown:</div>
                    {Object.entries(place.breakdown).map(([cat, val]) => (
                      <div key={cat} style={{ marginBottom: "6px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                          <span style={{ textTransform: "capitalize" }}>{cat}</span>
                          <strong>{val}%</strong>
                        </div>
                        <div className="progress-bg">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${val}%`,
                              background: val >= 80 ? "#10b981" : val >= 60 ? "#f59e0b" : "#ef4444"
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            5. COMMUNITY REVIEWS VIEW
           ========================================== */}
        {activeTab === "reviews" && (
          <div>
            <div className="card">
              <h2 style={{ fontSize: "22px", fontWeight: "900", marginBottom: "6px" }}>
                💬 Community Reviews & Physical Verification
              </h2>
              <p style={{ color: "#64748b", fontSize: "14px" }}>
                Public reviews are open to everyone without login. Citizens physically test repaired ramps, lifts, and toilets.
              </p>
            </div>

            <div className="grid-2">
              {/* Review Submission Card */}
              <div className="card">
                <h3 style={{ fontSize: "16px", fontWeight: "800", marginBottom: "12px" }}>
                  Submit Physical Verification Review
                </h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!newReview.comment) return;
                  const item = {
                    id: `REV-${Date.now()}`,
                    reportId: newReview.reportId,
                    place: "Public Report Location",
                    user: "Verified Citizen",
                    verdict: newReview.verdict,
                    comment: newReview.comment,
                    date: "2026-08-26"
                  };
                  setReviews([item, ...reviews]);
                  setNewReview({ reportId: "IX-2026-00125", verdict: "RESOLVED", comment: "" });
                  alert("Review posted!");
                }}>
                  <div className="form-group">
                    <label className="form-label">Select Report ID</label>
                    <select className="form-control" value={newReview.reportId} onChange={(e) => setNewReview({ ...newReview, reportId: e.target.value })}>
                      {reports.map(r => <option key={r.id} value={r.id}>{r.id} - {r.institution}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Was this issue actually resolved?</label>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        type="button"
                        className="btn-outline"
                        style={{ flex: 1, background: newReview.verdict === "RESOLVED" ? "#dcfce7" : "#fff", borderColor: newReview.verdict === "RESOLVED" ? "#16a34a" : "#cbd5e1" }}
                        onClick={() => setNewReview({ ...newReview, verdict: "RESOLVED" })}
                      >
                        👍 Yes, Resolved
                      </button>
                      <button
                        type="button"
                        className="btn-outline"
                        style={{ flex: 1, background: newReview.verdict === "REJECTED" ? "#fee2e2" : "#fff", borderColor: newReview.verdict === "REJECTED" ? "#dc2626" : "#cbd5e1" }}
                        onClick={() => setNewReview({ ...newReview, verdict: "REJECTED" })}
                      >
                        👎 No, Still a Problem
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tell us what happened...</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="e.g. Visited the site today morning, ramp is totally clear..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                    Post Public Review
                  </button>
                </form>
              </div>

              {/* Review Feed */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {reviews.map((rev) => (
                  <div key={rev.id} className="card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <strong style={{ fontSize: "14px", color: "#0f172a" }}>{rev.user}</strong>
                        <div style={{ fontSize: "11px", color: "#64748b" }}>{rev.place} • {rev.reportId}</div>
                      </div>
                      <span className={`badge ${rev.verdict === "RESOLVED" ? "badge-resolved" : "badge-overdue"}`}>
                        {rev.verdict === "RESOLVED" ? "👍 VERIFIED RESOLVED" : "👎 REJECTED / STILL BROKEN"}
                      </span>
                    </div>
                    <p style={{ fontSize: "13px", color: "#334155", marginTop: "10px" }}>"{rev.comment}"</p>
                    <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "6px" }}>{rev.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            6. COMPLAINTS VIEW
           ========================================== */}
        {activeTab === "complaints" && (
          <div>
            <div className="card">
              <h2 style={{ fontSize: "22px", fontWeight: "900", marginBottom: "6px" }}>
                ⚠️ File an Escalation Complaint
              </h2>
              <p style={{ color: "#64748b", fontSize: "14px" }}>
                Submit a formal grievance when an authority misses deadlines, ignores an assigned report, or provides false resolution info.
              </p>
            </div>

            <div className="grid-2">
              <div className="card">
                <h3 style={{ fontSize: "16px", fontWeight: "800", marginBottom: "12px" }}>Submit Complaint</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!newComplaint.description) return;
                  const cmp = {
                    id: `CMP-2026-00${40 + complaints.length}`,
                    reportId: newComplaint.reportId || "IX-2026-00124",
                    type: newComplaint.type,
                    description: newComplaint.description,
                    status: "Under Review",
                    date: "2026-08-26"
                  };
                  setComplaints([cmp, ...complaints]);
                  setNewComplaint({ reportId: "", type: "Deadline Ignored", description: "" });
                  alert(`Complaint logged! ID: ${cmp.id}`);
                }}>
                  <div className="form-group">
                    <label className="form-label">Related Report ID</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. IX-2026-00124"
                      value={newComplaint.reportId}
                      onChange={(e) => setNewComplaint({ ...newComplaint, reportId: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Complaint Reason</label>
                    <select className="form-control" value={newComplaint.type} onChange={(e) => setNewComplaint({ ...newComplaint, type: e.target.value })}>
                      <option value="Deadline Ignored">Deadline Ignored / Delayed Action</option>
                      <option value="False Resolution Claim">False Resolution Claimed</option>
                      <option value="Wrong Authority Assigned">Wrong Authority Assigned</option>
                      <option value="Unresponsive Officer">Unresponsive Officer</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Detailed Description</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Explain what failed in the accountability pipeline..."
                      value={newComplaint.description}
                      onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                    File Complaint to Vigilance Cell
                  </button>
                </form>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "800" }}>Recent Active Complaints</h3>
                {complaints.map((c) => (
                  <div key={c.id} className="card">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: "800", color: "#ef4444" }}>{c.id}</span>
                      <span className="badge badge-overdue">{c.status}</span>
                    </div>
                    <div style={{ fontSize: "12px", color: "#64748b", margin: "4px 0" }}>Report ID: {c.reportId} • {c.type}</div>
                    <p style={{ fontSize: "13px", color: "#334155" }}>{c.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            7. FEEDBACK & IDEAS VIEW
           ========================================== */}
        {activeTab === "feedback" && (
          <div>
            <div className="card">
              <h2 style={{ fontSize: "22px", fontWeight: "900", marginBottom: "6px" }}>
                💡 Feedback & Feature Ideas
              </h2>
              <p style={{ color: "#64748b", fontSize: "14px" }}>
                Help us improve the InclusiveX platform for Yuva 6.0! Suggest accessibility categories or feature improvements.
              </p>
            </div>

            <div className="grid-2">
              <div className="card">
                <h3 style={{ fontSize: "16px", fontWeight: "800", marginBottom: "12px" }}>Send Us Your Feedback</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!newFeedback.comment) return;
                  const item = {
                    id: `FB-${feedbacks.length + 1}`,
                    type: newFeedback.type,
                    comment: newFeedback.comment,
                    date: "2026-08-26"
                  };
                  setFeedbacks([item, ...feedbacks]);
                  setNewFeedback({ type: "Suggestion", comment: "" });
                  alert("Thank you for your feedback!");
                }}>
                  <div className="form-group">
                    <label className="form-label">Feedback Category</label>
                    <select className="form-control" value={newFeedback.type} onChange={(e) => setNewFeedback({ ...newFeedback, type: e.target.value })}>
                      <option value="Suggestion">Suggestion</option>
                      <option value="Bug">Bug Report</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Positive Feedback">Positive Feedback</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Feedback / Ideas</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Share your ideas to make accessibility action faster..."
                      value={newFeedback.comment}
                      onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                    Submit Feedback
                  </button>
                </form>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "800" }}>Public Suggestions</h3>
                {feedbacks.map((f) => (
                  <div key={f.id} className="card">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="badge badge-active">{f.type}</span>
                      <span style={{ fontSize: "11px", color: "#94a3b8" }}>{f.date}</span>
                    </div>
                    <p style={{ fontSize: "13px", color: "#334155", marginTop: "8px" }}>"{f.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            8. ABOUT / PURPOSE VIEW
           ========================================== */}
        {activeTab === "about" && (
          <div className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span className="badge badge-active" style={{ marginBottom: "8px" }}>Yuva 6.0 Initiative</span>
            <h2 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a" }}>
              About InclusiveX: From Audit to Real Action
            </h2>
            <p style={{ fontSize: "16px", color: "#475569", marginTop: "12px", lineHeight: "1.6" }}>
              InclusiveX is built around a simple idea: <strong>identifying an accessibility problem is only the first step.</strong> Real impact happens when that problem is assigned to a responsible authority, given a fixed deadline, acted upon, monitored, and finally verified by the community.
            </p>

            <div className="score-card-box" style={{ margin: "24px 0", background: "#f8fafc" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#2563eb" }}>Central Product Principle</h3>
              <p style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginTop: "4px" }}>
                “Nothing should disappear after it is reported.”
              </p>
            </div>

            <h3 style={{ fontSize: "18px", fontWeight: "800", marginTop: "20px" }}>Focus Areas:</h3>
            <ul style={{ paddingLeft: "20px", color: "#475569", margin: "10px 0", lineHeight: "1.8" }}>
              <li>Hospitals & Public Healthcare Infrastructure</li>
              <li>Schools, Colleges & Universities</li>
              <li>Railway Stations & Bus Terminals</li>
              <li>Government Secretariats & Public Service Offices</li>
              <li>Commercial Spaces & Public Parks</li>
            </ul>
          </div>
        )}

        {/* ==========================================
            9. ADMIN AUDIT & TRIAGE DASHBOARD
           ========================================== */}
        {activeTab === "admin" && (
          <div>
            <div className="card" style={{ background: "#0f172a", color: "#ffffff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                <div>
                  <span className="badge badge-warning">GOVERNANCE CELL</span>
                  <h2 style={{ fontSize: "24px", fontWeight: "900", marginTop: "4px" }}>
                    🛡️ Admin Triage & SLA Escalation Dashboard
                  </h2>
                  <p style={{ fontSize: "13px", color: "#94a3b8" }}>
                    Review evidence, assign responsible authorities, set binding SLA deadlines, and trigger manual escalations.
                  </p>
                </div>

                <div style={{ background: "#1e293b", padding: "12px 20px", borderRadius: "12px", textAlign: "right" }}>
                  <div style={{ fontSize: "11px", color: "#94a3b8" }}>SYSTEM STATUS</div>
                  <div style={{ color: "#4ade80", fontWeight: "800" }}>● Auto-Escalation Engine Active</div>
                </div>
              </div>
            </div>

            {/* ADMIN METRICS BAR */}
            <div className="grid-4" style={{ marginBottom: "20px" }}>
              <div className="card" style={{ padding: "16px" }}>
                <div style={{ fontSize: "11px", color: "#64748b" }}>TOTAL QUEUE</div>
                <div style={{ fontSize: "24px", fontWeight: "900" }}>{reports.length}</div>
              </div>
              <div className="card" style={{ padding: "16px" }}>
                <div style={{ fontSize: "11px", color: "#d97706" }}>PENDING ASSIGNMENT</div>
                <div style={{ fontSize: "24px", fontWeight: "900", color: "#d97706" }}>
                  {reports.filter(r => r.responsibleOfficer === "Unassigned").length}
                </div>
              </div>
              <div className="card" style={{ padding: "16px" }}>
                <div style={{ fontSize: "11px", color: "#ef4444" }}>OVERDUE CASES</div>
                <div style={{ fontSize: "24px", fontWeight: "900", color: "#ef4444" }}>{metrics.overdue}</div>
              </div>
              <div className="card" style={{ padding: "16px" }}>
                <div style={{ fontSize: "11px", color: "#9333ea" }}>ESCALATED LEVEL 2/3</div>
                <div style={{ fontSize: "24px", fontWeight: "900", color: "#9333ea" }}>
                  {reports.filter(r => r.status === "Escalated").length}
                </div>
              </div>
            </div>

            <div className="grid-2">
              {/* TRIAGE FORM CARD */}
              <div className="card">
                <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#2563eb", marginBottom: "12px" }}>
                  ⚙️ Assign Authority & SLA Target
                </h3>

                <form onSubmit={handleAdminUpdate}>
                  <div className="form-group">
                    <label className="form-label">Select Report Case *</label>
                    <select
                      className="form-control"
                      value={adminTriage.reportId}
                      onChange={(e) => {
                        const rId = e.target.value;
                        const target = reports.find(r => r.id === rId);
                        if (target) {
                          setAdminTriage({
                            reportId: target.id,
                            severity: target.severity,
                            responsibleAuthority: target.responsibleAuthority,
                            responsibleOfficer: target.responsibleOfficer,
                            department: target.department,
                            deadline: target.deadline,
                            step: target.step,
                            status: target.status
                          });
                        }
                      }}
                    >
                      <option value="">-- Choose Report to Audit --</option>
                      {reports.map(r => (
                        <option key={r.id} value={r.id}>
                          {r.id} ({r.institution}) - {r.status}
                        </option>
                      ))}
                    </select>
                  </div>

                  {adminTriage.reportId && (
                    <>
                      <div className="grid-2">
                        <div className="form-group">
                          <label className="form-label">Modify Severity</label>
                          <select
                            className="form-control"
                            value={adminTriage.severity}
                            onChange={(e) => setAdminTriage({ ...adminTriage, severity: e.target.value })}
                          >
                            <option value="Low">Low (14 Days)</option>
                            <option value="Medium">Medium (7 Days)</option>
                            <option value="High">High (3 Days)</option>
                            <option value="Critical">Critical (24-48 Hours)</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="form-label">Update Pipeline Step</label>
                          <select
                            className="form-control"
                            value={adminTriage.step}
                            onChange={(e) => setAdminTriage({ ...adminTriage, step: Number(e.target.value) })}
                          >
                            <option value={2}>Step 2: Audit Verified</option>
                            <option value={3}>Step 3: Authority Assigned</option>
                            <option value={4}>Step 4: Action Initiated</option>
                            <option value={5}>Step 5: Sent to User Verify</option>
                            <option value={6}>Step 6: Verified Closed</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Responsible Authority Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Jamshedpur Municipal Corp"
                          value={adminTriage.responsibleAuthority}
                          onChange={(e) => setAdminTriage({ ...adminTriage, responsibleAuthority: e.target.value })}
                          required
                        />
                      </div>

                      <div className="grid-2">
                        <div className="form-group">
                          <label className="form-label">Accountable Officer Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. Er. Rajesh Kumar"
                            value={adminTriage.responsibleOfficer}
                            onChange={(e) => setAdminTriage({ ...adminTriage, responsibleOfficer: e.target.value })}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">SLA Target Deadline</label>
                          <input
                            type="date"
                            className="form-control"
                            value={adminTriage.deadline}
                            onChange={(e) => setAdminTriage({ ...adminTriage, deadline: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                        💾 Commit Governance Update
                      </button>
                    </>
                  )}
                </form>
              </div>

              {/* OVERDUE MONITOR & ESCALATION CONTROL */}
              <div className="card">
                <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#ef4444", marginBottom: "12px" }}>
                  🚨 Overdue & Manual Escalation Trigger
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {reports.map((r) => {
                    const days = calculateDaysRemaining(r.deadline);
                    const isOverdue = days <= 0 && r.status !== "Resolved";

                    return (
                      <div key={r.id} style={{ padding: "10px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <strong style={{ fontSize: "13px" }}>{r.id}</strong> - {r.institution}
                          <div style={{ fontSize: "11px", color: isOverdue ? "#ef4444" : "#64748b" }}>
                            {isOverdue ? "🔴 OVERDUE" : `${days}d left`} • Officer: {r.responsibleOfficer}
                          </div>
                        </div>

                        {r.status !== "Resolved" && (
                          <button
                            className="btn-outline"
                            style={{ background: "#fee2e2", color: "#b91c1c", borderColor: "#fca5a5", fontSize: "11px", padding: "6px 10px" }}
                            onClick={() => handleEscalateNow(r.id)}
                          >
                            🚨 Escalate Now
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ==========================================
          10. REPORT DETAIL MODAL VIEW
         ========================================== */}
      {activeModalReport && (
        <div className="modal-overlay" onClick={() => setSelectedReportId(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span className="badge badge-active">{activeModalReport.id}</span>
                <h2 style={{ fontSize: "22px", fontWeight: "900", marginTop: "4px" }}>
                  {activeModalReport.title}
                </h2>
                <div style={{ color: "#64748b", fontSize: "13px" }}>📍 {activeModalReport.locationDetail}</div>
              </div>
              <button
                style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#64748b" }}
                onClick={() => setSelectedReportId(null)}
              >
                ✕
              </button>
            </div>

            <hr style={{ margin: "16px 0", borderColor: "#e2e8f0" }} />

            {/* Evidence Image */}
            <div style={{ marginBottom: "16px" }}>
              <img
                src={activeModalReport.photoUrl}
                alt="Evidence"
                style={{ width: "100%", maxHeight: "250px", objectFit: "cover", borderRadius: "12px" }}
              />
            </div>

            <p style={{ fontSize: "14px", color: "#334155", marginBottom: "16px" }}>
              {activeModalReport.description}
            </p>

            {/* Accountability Details Grid */}
            <div className="score-card-box" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "12px", marginBottom: "16px" }}>
              <div>
                <div style={{ color: "#64748b", fontWeight: "700" }}>RESPONSIBLE AUTHORITY</div>
                <div style={{ fontWeight: "800", color: "#0f172a" }}>{activeModalReport.responsibleAuthority}</div>
                <div>Officer: {activeModalReport.responsibleOfficer}</div>
                <div style={{ color: "#64748b" }}>Dept: {activeModalReport.department}</div>
              </div>

              <div>
                <div style={{ color: "#64748b", fontWeight: "700" }}>SLA DEADLINE STATUS</div>
                <div style={{ fontWeight: "800", color: "#d97706" }}>Target: {activeModalReport.deadline}</div>
                <div>Assigned: {activeModalReport.assignedDate}</div>
                {activeModalReport.escalationLevel > 1 && (
                  <div style={{ color: "#9333ea", fontWeight: "800", marginTop: "4px" }}>
                    🚨 Escalated to Level {activeModalReport.escalationLevel}: {activeModalReport.escalatedTo}
                  </div>
                )}
              </div>
            </div>

            {/* Timeline Log */}
            <h4 style={{ fontSize: "14px", fontWeight: "800", marginBottom: "8px" }}>📜 Activity Audit Timeline</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", marginBottom: "20px" }}>
              {activeModalReport.timeline.map((item, i) => (
                <div key={i} style={{ borderLeft: "2px solid #2563eb", paddingLeft: "10px" }}>
                  <div style={{ fontWeight: "700", color: "#0f172a" }}>{item.title} <span style={{ color: "#94a3b8", fontWeight: "400" }}>({item.date})</span></div>
                  <div style={{ color: "#64748b" }}>{item.note}</div>
                </div>
              ))}
            </div>

            {/* Public Action Trigger */}
            {activeModalReport.status === "Awaiting Verification" && (
              <div style={{ background: "#dcfce7", border: "1px solid #86efac", padding: "14px", borderRadius: "10px" }}>
                <strong style={{ color: "#15803d", fontSize: "13px" }}>Authority reported completion! Please verify:</strong>
                <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                  <button className="btn-primary" style={{ flex: 1, background: "#16a34a" }} onClick={() => handleVerifyResolution(activeModalReport.id, true)}>
                    👍 Confirm Fixed & Close
                  </button>
                  <button className="btn-outline" style={{ flex: 1, color: "#dc2626" }} onClick={() => handleVerifyResolution(activeModalReport.id, false)}>
                    👎 Still Broken (Re-open)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// REACT DOM MOUNT
// ==========================================
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<InclusiveXApp />);
}
