import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

// Inject lightweight CSS for mobile screen responsiveness & clean inputs
const responsiveStyles = `
  * { box-sizing: border-box; }
  body { margin: 0; background-color: #090d16; color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  .app-container { max-width: 1100px; margin: 0 auto; padding: 16px; min-height: 100vh; }
  .grid-2 { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 14px; }
  .input-field { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #334155; background: #0f172a; color: #fff; font-size: 14px; outline: none; }
  .input-field:focus { border-color: #f59e0b; }
  @media (max-width: 640px) {
    .app-container { padding: 12px; }
    .header-stack { flex-direction: column; align-items: flex-start !important; gap: 12px !important; }
    .nav-toggle { width: 100%; justify-content: space-between; }
    .toggle-btn { flex: 1; text-align: center; padding: 8px 10px !important; font-size: 12px !important; }
    .step-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 8px !important; }
    .modal-card { padding: 16px !important; width: 95% !important; max-height: 85vh !important; }
  }
`;

const initialInstitutions = [
  {
    id: "INST-001",
    name: "St. Xavier School",
    type: "School",
    location: "Circuit House Area, Jamshedpur",
    responsibleDept: "School Estate Team",
    headOfficer: "Fr. Principal / Estate Manager",
    accessibilityScore: 72,
    actionScore: 85,
    reviews: [{ user: "Rohan K.", rating: 4, comment: "Main entrance ramp fixed post audit." }]
  },
  {
    id: "INST-002",
    name: "MGM Medical College & Hospital",
    type: "Hospital",
    location: "Sakchi, Jamshedpur",
    responsibleDept: "PWD Health Cell",
    headOfficer: "Superintendent & PWD Exec Engineer",
    accessibilityScore: 54,
    actionScore: 42,
    reviews: [{ user: "Amit M.", rating: 2, comment: "OPD tactile flooring pending." }]
  },
  {
    id: "INST-003",
    name: "Tata Main Hospital (TMH)",
    type: "Hospital",
    location: "Bistupur, Jamshedpur",
    responsibleDept: "TMH Infrastructure Wing",
    headOfficer: "GM Facilities",
    accessibilityScore: 88,
    actionScore: 92,
    reviews: []
  }
];

const initialCases = [
  {
    id: "JAM-AT-101",
    instId: "INST-001",
    instName: "St. Xavier School",
    title: "Wheelchair Ramp Handrail Damaged",
    category: "Mobility",
    locationDetail: "Gate 2 Main Entrance",
    responsiblePerson: "Mr. Sharma (Estate Head)",
    dept: "School Estate Team",
    reportedDate: "2026-08-15",
    deadline: "2026-09-02",
    status: "In Progress",
    step: 4,
    auditHistory: [
      { date: "2026-08-15", event: "Identified by Citizen Audit" },
      { date: "2026-08-18", event: "Assigned to Mr. Sharma (Estate Head)" },
      { date: "2026-08-22", event: "Action: Repair work initiated" }
    ]
  },
  {
    id: "JAM-AT-102",
    instId: "INST-002",
    instName: "MGM Medical College & Hospital",
    title: "Tactile Tiles Missing in Emergency Lobby",
    category: "Navigation",
    locationDetail: "Emergency Ward Entrance",
    responsiblePerson: "Er. A. K. Singh (PWD Civil)",
    dept: "PWD Health Cell",
    reportedDate: "2026-07-28",
    deadline: "2026-08-20",
    status: "Overdue",
    step: 3,
    auditHistory: [
      { date: "2026-07-28", event: "Barrier Logged" },
      { date: "2026-08-01", event: "Assigned to PWD Exec Engineer" },
      { date: "2026-08-21", event: "Escalated: Target Deadline Overdue" }
    ]
  }
];

const WORKFLOW_STEPS = ["Identify", "Audit", "Assign", "Act", "Monitor", "Verify"];

function App() {
  const [viewMode, setViewMode] = useState("citizen");
  const [activeTab, setActiveTab] = useState("cases");
  const [institutions, setInstitutions] = useState(initialInstitutions);
  const [cases, setCases] = useState(initialCases);

  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  const [complaintForm, setComplaintForm] = useState({
    instName: "",
    category: "Mobility",
    locationDetail: "",
    title: "",
    responsiblePerson: "",
    responsibleDept: ""
  });

  // Apply CSS styles dynamically
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.innerHTML = responsiveStyles;
    document.head.appendChild(styleEl);
    return () => styleEl.remove();
  }, []);

  const handleFileComplaint = (e) => {
    e.preventDefault();
    if (!complaintForm.instName || !complaintForm.title) return;

    const newCase = {
      id: `JAM-AT-${cases.length + 103}`,
      instName: complaintForm.instName,
      title: complaintForm.title,
      category: complaintForm.category,
      locationDetail: complaintForm.locationDetail || "Main Premises",
      responsiblePerson: complaintForm.responsiblePerson || "Assigned Officer",
      dept: complaintForm.responsibleDept || "Facility Dept",
      reportedDate: new Date().toISOString().split("T")[0],
      deadline: "7 Days",
      status: "Assigned",
      step: 2,
      auditHistory: [
        { date: new Date().toISOString().split("T")[0], event: "Audit Logged & Verified" },
        { date: new Date().toISOString().split("T")[0], event: `Assigned Officer: ${complaintForm.responsiblePerson || "Facility Lead"}` }
      ]
    };

    setCases([newCase, ...cases]);
    setShowComplaintModal(false);
    setComplaintForm({ instName: "", category: "Mobility", locationDetail: "", title: "", responsiblePerson: "", responsibleDept: "" });
    setActiveTab("cases");
  };

  return (
    <div className="app-container">
      
      {/* APP HEADER */}
      <header className="header-stack" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e293b", paddingBottom: "14px", marginBottom: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ background: "#f59e0b", color: "#000", fontWeight: "900", padding: "2px 8px", borderRadius: "6px", fontSize: "14px" }}>IX</span>
            <h1 style={{ margin: 0, color: "#fff", fontSize: "20px", fontWeight: "700" }}>InclusiveX</h1>
          </div>
          <p style={{ margin: "2px 0 0 0", color: "#64748b", fontSize: "12px" }}>Audit → Action → Governance Platform</p>
        </div>

        {/* MODE SWITCHER */}
        <div className="nav-toggle" style={{ display: "flex", background: "#1e293b", padding: "3px", borderRadius: "8px", border: "1px solid #334155" }}>
          <button
            className="toggle-btn"
            onClick={() => setViewMode("citizen")}
            style={{ padding: "6px 12px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "12px", background: viewMode === "citizen" ? "#f59e0b" : "transparent", color: viewMode === "citizen" ? "#0f172a" : "#94a3b8" }}
          >
            Public Tracker
          </button>
          <button
            className="toggle-btn"
            onClick={() => setViewMode("admin")}
            style={{ padding: "6px 12px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "12px", background: viewMode === "admin" ? "#f59e0b" : "transparent", color: viewMode === "admin" ? "#0f172a" : "#94a3b8" }}
          >
            Backend Admin
          </button>
        </div>
      </header>

      {/* CITIZEN VIEW */}
      {viewMode === "citizen" && (
        <div>
          {/* TABS & QUICK REPORT */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                onClick={() => setActiveTab("cases")}
                style={{ padding: "8px 14px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "600", background: activeTab === "cases" ? "#38bdf8" : "#1e293b", color: activeTab === "cases" ? "#0f172a" : "#cbd5e1" }}
              >
                📋 Active Cases ({cases.length})
              </button>
              <button
                onClick={() => setActiveTab("directory")}
                style={{ padding: "8px 14px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "600", background: activeTab === "directory" ? "#38bdf8" : "#1e293b", color: activeTab === "directory" ? "#0f172a" : "#cbd5e1" }}
              >
                🏢 City Buildings ({institutions.length})
              </button>
            </div>

            <button
              onClick={() => setShowComplaintModal(true)}
              style={{ padding: "8px 14px", background: "#ef4444", color: "#fff", fontWeight: "600", fontSize: "13px", border: "none", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
            >
              🚨 Report Barrier
            </button>
          </div>

          {/* TAB 1: CASES */}
          {activeTab === "cases" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {cases.map((c) => (
                <div key={c.id} style={{ background: "#131b2e", border: "1px solid #1e293b", borderRadius: "12px", padding: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
                    <div>
                      <span style={{ fontSize: "11px", color: "#f59e0b", fontWeight: "700" }}>{c.id} • {c.instName}</span>
                      <h3 style={{ margin: "2px 0 0 0", color: "#fff", fontSize: "15px", fontWeight: "600" }}>{c.title}</h3>
                    </div>
                    <span style={{ background: c.status === "Verified" ? "#16a34a" : c.status === "Overdue" ? "#dc2626" : "#2563eb", padding: "4px 8px", borderRadius: "12px", fontWeight: "700", fontSize: "11px", whiteSpace: "nowrap" }}>
                      {c.status}
                    </span>
                  </div>

                  {/* OFFICER & LOCATION */}
                  <div style={{ background: "#0b1120", padding: "8px 10px", borderRadius: "6px", fontSize: "12px", marginBottom: "10px", color: "#94a3b8" }}>
                    <div>📍 Location: <strong style={{ color: "#e2e8f0" }}>{c.locationDetail}</strong></div>
                    <div>👤 Responsible: <strong style={{ color: "#38bdf8" }}>{c.responsiblePerson}</strong> ({c.dept})</div>
                  </div>

                  {/* STEP LIFECYCLE BAR */}
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "4px", display: "flex", justifyContent: "space-between" }}>
                    <span>Progress: Step {c.step}/6</span>
                    <span>Current: {WORKFLOW_STEPS[c.step - 1]}</span>
                  </div>
                  <div className="step-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "4px", marginBottom: "10px" }}>
                    {WORKFLOW_STEPS.map((stepName, idx) => {
                      const stepNum = idx + 1;
                      const isCompleted = stepNum <= c.step;
                      return (
                        <div key={stepName} style={{ height: "4px", borderRadius: "2px", background: isCompleted ? (c.status === "Overdue" ? "#ef4444" : "#f59e0b") : "#1e293b" }} />
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setSelectedCase(c)}
                    style={{ width: "100%", padding: "6px", background: "transparent", border: "1px solid #334155", color: "#94a3b8", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}
                  >
                    📜 View Audit History ({c.auditHistory.length} Logs)
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: CITY DIRECTORY */}
          {activeTab === "directory" && (
            <div className="grid-2">
              {institutions.map(inst => (
                <div key={inst.id} style={{ background: "#131b2e", border: "1px solid #1e293b", borderRadius: "12px", padding: "14px" }}>
                  <span style={{ fontSize: "10px", color: "#38bdf8", background: "#0c4a6e", padding: "2px 6px", borderRadius: "4px", fontWeight: "700" }}>{inst.type}</span>
                  <h3 style={{ margin: "4px 0 2px 0", color: "#fff", fontSize: "15px" }}>{inst.name}</h3>
                  <p style={{ margin: "0 0 10px 0", fontSize: "12px", color: "#64748b" }}>📍 {inst.location}</p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", background: "#0b1120", padding: "8px", borderRadius: "8px", textAlign: "center", marginBottom: "10px" }}>
                    <div>
                      <div style={{ fontSize: "9px", color: "#64748b", fontWeight: "700" }}>ACCESSIBILITY</div>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "#4ade80" }}>{inst.accessibilityScore}/100</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "9px", color: "#64748b", fontWeight: "700" }}>ACTION SPEED</div>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "#38bdf8" }}>{inst.actionScore}/100</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setComplaintForm({ ...complaintForm, instName: inst.name, responsibleDept: inst.responsibleDept, responsiblePerson: inst.headOfficer });
                      setShowComplaintModal(true);
                    }}
                    style={{ width: "100%", padding: "8px", background: "#ef4444", color: "#fff", fontWeight: "600", fontSize: "12px", border: "none", borderRadius: "6px", cursor: "pointer" }}
                  >
                    🚨 Report Barrier Here
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* BACKEND ADMIN VIEW */}
      {viewMode === "admin" && (
        <div style={{ background: "#131b2e", border: "1px solid #1e293b", padding: "16px", borderRadius: "12px", overflowX: "auto" }}>
          <h2 style={{ color: "#f59e0b", margin: "0 0 6px 0", fontSize: "16px" }}>Officer Governance Table</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", color: "#cbd5e1" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #334155", color: "#64748b", textAlign: "left" }}>
                <th style={{ padding: "8px" }}>Case</th>
                <th style={{ padding: "8px" }}>Officer</th>
                <th style={{ padding: "8px" }}>Step</th>
                <th style={{ padding: "8px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {cases.map(c => (
                <tr key={c.id} style={{ borderBottom: "1px solid #1e293b" }}>
                  <td style={{ padding: "8px" }}><strong>{c.id}</strong><br/>{c.title}</td>
                  <td style={{ padding: "8px", color: "#38bdf8" }}>{c.responsiblePerson}</td>
                  <td style={{ padding: "8px" }}>Step {c.step}/6</td>
                  <td style={{ padding: "8px", color: c.status === "Overdue" ? "#ef4444" : "#4ade80" }}>{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL: REPORT COMPLAINT */}
      {showComplaintModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(2px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "12px" }}>
          <div className="modal-card" style={{ background: "#131b2e", border: "1px solid #ef4444", borderRadius: "16px", padding: "20px", maxWidth: "460px", width: "100%", overflowY: "auto", position: "relative" }}>
            <button onClick={() => setShowComplaintModal(false)} style={{ position: "absolute", top: "12px", right: "12px", background: "none", border: "none", color: "#64748b", fontSize: "18px", cursor: "pointer" }}>✕</button>

            <h3 style={{ color: "#ef4444", margin: "0 0 4px 0", fontSize: "16px" }}>🚨 Log Accessibility Barrier</h3>
            <p style={{ color: "#64748b", fontSize: "12px", margin: "0 0 12px 0" }}>Identify barrier & tag accountable authority.</p>

            <form onSubmit={handleFileComplaint} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input
                className="input-field"
                type="text"
                placeholder="Building / Hospital / School Name *"
                value={complaintForm.instName}
                onChange={(e) => setComplaintForm({ ...complaintForm, instName: e.target.value })}
                required
              />
              <input
                className="input-field"
                type="text"
                placeholder="Barrier Issue (e.g. Broken Ramp) *"
                value={complaintForm.title}
                onChange={(e) => setComplaintForm({ ...complaintForm, title: e.target.value })}
                required
              />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <select
                  className="input-field"
                  value={complaintForm.category}
                  onChange={(e) => setComplaintForm({ ...complaintForm, category: e.target.value })}
                >
                  <option value="Mobility">Mobility / Ramp</option>
                  <option value="Signage">Visually Impaired Signage</option>
                  <option value="Washroom">Accessible Washroom</option>
                  <option value="Elevator">Elevator / Lift</option>
                </select>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Exact Location"
                  value={complaintForm.locationDetail}
                  onChange={(e) => setComplaintForm({ ...complaintForm, locationDetail: e.target.value })}
                />
              </div>

              <div style={{ background: "#0b1120", padding: "10px", borderRadius: "8px", border: "1px solid #1e293b" }}>
                <div style={{ fontSize: "11px", color: "#f59e0b", fontWeight: "700", marginBottom: "6px" }}>👤 ACCOUNTABLE OFFICER (OPTIONAL)</div>
                <input
                  className="input-field"
                  style={{ marginBottom: "6px" }}
                  type="text"
                  placeholder="Officer Name / Role (e.g. Principal)"
                  value={complaintForm.responsiblePerson}
                  onChange={(e) => setComplaintForm({ ...complaintForm, responsiblePerson: e.target.value })}
                />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Department (e.g. PWD / Maintenance)"
                  value={complaintForm.responsibleDept}
                  onChange={(e) => setComplaintForm({ ...complaintForm, responsibleDept: e.target.value })}
                />
              </div>

              <button
                type="submit"
                style={{ padding: "12px", background: "#ef4444", color: "#fff", fontWeight: "700", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", marginTop: "4px" }}
              >
                Submit Barrier Case
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: HISTORY LOGS */}
      {selectedCase && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "12px" }}>
          <div className="modal-card" style={{ background: "#131b2e", border: "1px solid #334155", borderRadius: "16px", padding: "16px", maxWidth: "420px", width: "100%", position: "relative" }}>
            <button onClick={() => setSelectedCase(null)} style={{ position: "absolute", top: "12px", right: "12px", background: "none", border: "none", color: "#fff", cursor: "pointer" }}>✕</button>
            <h3 style={{ color: "#f59e0b", margin: "0 0 2px 0", fontSize: "15px" }}>Audit Trail ({selectedCase.id})</h3>
            <p style={{ color: "#94a3b8", fontSize: "12px", margin: "0 0 12px 0" }}>{selectedCase.title}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {selectedCase.auditHistory.map((hist, idx) => (
                <div key={idx} style={{ background: "#0b1120", padding: "8px", borderRadius: "6px", borderLeft: "2px solid #38bdf8" }}>
                  <div style={{ fontSize: "10px", color: "#64748b" }}>{hist.date}</div>
                  <div style={{ fontSize: "12px", color: "#fff" }}>{hist.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
