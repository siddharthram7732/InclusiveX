import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

// Global responsive dark UI styles
const styles = `
  * { box-sizing: border-box; }
  body { margin: 0; background-color: #090d16; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  .app-container { max-width: 1000px; margin: 0 auto; padding: 16px; min-height: 100vh; }
  .input-field { width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #334155; background: #0b1120; color: #fff; font-size: 13px; outline: none; }
  .input-field:focus { border-color: #f59e0b; }
  @media (max-width: 640px) {
    .admin-grid { grid-template-columns: 1fr !important; }
    .app-container { padding: 12px; }
  }
`;

// Workflow Steps Lifecycle
const WORKFLOW_STEPS = ["Identify", "Audit", "Assign", "Act", "Monitor", "Verify"];

const SeverityBadge = ({ level }) => {
  const colors = {
    Low: { bg: "#052e16", text: "#4ade80", border: "#15803d" },
    Medium: { bg: "#451a03", text: "#fbbf24", border: "#b45309" },
    High: { bg: "#431407", text: "#fb923c", border: "#c2410c" },
    Critical: { bg: "#450a0a", text: "#f87171", border: "#b91c1c" },
  };
  const style = colors[level] || colors.Medium;
  return (
    <span style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}`, padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700" }}>
      ● {level} Priority
    </span>
  );
};

const StepWorkflowTracker = ({ currentStep, status }) => {
  return (
    <div style={{ marginTop: "12px", marginBottom: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94a3b8", marginBottom: "6px" }}>
        <span>Workflow Progress (Step {currentStep}/6)</span>
        <span style={{ fontWeight: "700", color: status === "Overdue" ? "#ef4444" : "#f59e0b" }}>{WORKFLOW_STEPS[currentStep - 1]}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "4px" }}>
        {WORKFLOW_STEPS.map((step, idx) => {
          const stepNum = idx + 1;
          const isDone = stepNum <= currentStep;
          const isCurrent = stepNum === currentStep;
          return (
            <div key={step} style={{ textAlign: "center" }}>
              <div
                style={{
                  height: "6px",
                  borderRadius: "3px",
                  background: isDone ? (status === "Overdue" ? "#ef4444" : isCurrent ? "#f59e0b" : "#38bdf8") : "#1e293b",
                  transition: "all 0.3s ease",
                }}
              />
              <span style={{ fontSize: "9px", color: isDone ? "#f8fafc" : "#475569", fontWeight: isCurrent ? "700" : "400", display: "block", marginTop: "4px" }}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const UserDashboard = ({ reports, onVerifyReport }) => {
  const [filter, setFilter] = useState("ALL");

  const filteredReports = reports.filter((r) => {
    if (filter === "ACTIVE") return r.status !== "Resolved";
    if (filter === "VERIFY") return r.status === "Awaiting Verification";
    if (filter === "RESOLVED") return r.status === "Resolved";
    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px" }}>
        {[
          { label: "My Reports", count: reports.length, key: "ALL", color: "#cbd5e1" },
          { label: "Active", count: reports.filter((r) => r.status !== "Resolved").length, key: "ACTIVE", color: "#38bdf8" },
          { label: "Awaiting Verification", count: reports.filter((r) => r.status === "Awaiting Verification").length, key: "VERIFY", color: "#f59e0b" },
          { label: "Resolved", count: reports.filter((r) => r.status === "Resolved").length, key: "RESOLVED", color: "#4ade80" },
        ].map((item) => (
          <div
            key={item.key}
            onClick={() => setFilter(item.key)}
            style={{
              background: filter === item.key ? "#1e293b" : "#131b2e",
              border: `1px solid ${filter === item.key ? item.color : "#1e293b"}`,
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: "11px", color: "#94a3b8" }}>{item.label}</div>
            <div style={{ fontSize: "20px", fontWeight: "800", color: item.color, marginTop: "2px" }}>{item.count}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filteredReports.map((report) => (
          <div key={report.id} style={{ background: "#131b2e", border: "1px solid #1e293b", borderRadius: "12px", padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
              <div>
                <span style={{ fontSize: "11px", color: "#f59e0b", fontWeight: "700" }}>{report.id} • {report.institution}</span>
                <h3 style={{ margin: "4px 0", color: "#fff", fontSize: "15px" }}>{report.title}</h3>
                <span style={{ fontSize: "12px", color: "#94a3b8" }}>📍 {report.locationDetail}</span>
              </div>
              <SeverityBadge level={report.severity} />
            </div>

            <StepWorkflowTracker currentStep={report.step} status={report.status} />

            <div style={{ background: "#0b1120", border: "1px solid #1e293b", padding: "10px", borderRadius: "8px", fontSize: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "8px" }}>
              <div>
                <div style={{ color: "#64748b", fontSize: "10px", fontWeight: "700" }}>ACCOUNTABLE OFFICER</div>
                <div style={{ color: "#38bdf8", fontWeight: "700" }}>👤 {report.responsibleOfficer || "Unassigned"}</div>
                <div style={{ color: "#94a3b8", fontSize: "11px" }}>{report.department || "Triage Pending"}</div>
              </div>
              <div>
                <div style={{ color: "#64748b", fontSize: "10px", fontWeight: "700" }}>SLA TARGET DEADLINE</div>
                <div style={{ color: report.daysRemaining <= 0 ? "#ef4444" : "#f59e0b", fontWeight: "700" }}>
                  ⏳ {report.daysRemaining > 0 ? `${report.daysRemaining} Days Left` : "SLA OVERDUE"}
                </div>
                <div style={{ color: "#94a3b8", fontSize: "11px" }}>Target: {report.deadline}</div>
              </div>
            </div>

            {report.status === "Awaiting Verification" && (
              <div style={{ background: "#064e3b", border: "1px solid #10b981", borderRadius: "8px", padding: "12px", marginTop: "10px" }}>
                <div style={{ fontSize: "12px", color: "#a7f3d0", fontWeight: "700", marginBottom: "6px" }}>
                  🛡️ Action Completed by Authority. Please Verify Physical Resolution:
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => onVerifyReport(report.id, true)}
                    style={{ flex: 1, padding: "8px", background: "#10b981", color: "#000", fontWeight: "700", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}
                  >
                    👍 Yes, Resolved
                  </button>
                  <button
                    onClick={() => onVerifyReport(report.id, false)}
                    style={{ flex: 1, padding: "8px", background: "#ef4444", color: "#fff", fontWeight: "700", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}
                  >
                    👎 No, Still Inaccessible
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminDashboard = ({ reports, onUpdateReport }) => {
  const [selectedReport, setSelectedReport] = useState(reports[0] || null);

  const [triageForm, setTriageForm] = useState({
    severity: "Medium",
    officer: "",
    department: "",
    deadline: "",
    step: 3,
  });

  useEffect(() => {
    if (selectedReport) {
      setTriageForm({
        severity: selectedReport.severity || "Medium",
        officer: selectedReport.responsibleOfficer || "",
        department: selectedReport.department || "",
        deadline: selectedReport.deadline || "",
        step: selectedReport.step || 3,
      });
    }
  }, [selectedReport]);

  const handleSaveTriage = (e) => {
    e.preventDefault();
    onUpdateReport(selectedReport.id, {
      severity: triageForm.severity,
      responsibleOfficer: triageForm.officer,
      department: triageForm.department,
      deadline: triageForm.deadline,
      step: Number(triageForm.step),
      status: Number(triageForm.step) === 5 ? "Awaiting Verification" : "In Progress",
    });
    alert(`Case ${selectedReport.id} committed successfully!`);
  };

  const handleTriggerEscalation = (reportId) => {
    onUpdateReport(reportId, {
      status: "Overdue",
      responsibleOfficer: "District Magistrate / Zonal Escalation Cell",
      department: "Higher Governance Escalation",
      daysRemaining: 0,
    });
  };

  return (
    <div className="admin-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      <div style={{ background: "#131b2e", border: "1px solid #1e293b", borderRadius: "12px", padding: "16px" }}>
        <h3 style={{ color: "#f59e0b", margin: "0 0 12px 0", fontSize: "15px" }}>🛠️ Admin Audit & Triage Panel</h3>
        {selectedReport ? (
          <form onSubmit={handleSaveTriage} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ fontSize: "12px", color: "#94a3b8" }}>
              Case ID: <strong style={{ color: "#fff" }}>{selectedReport.id}</strong> ({selectedReport.institution})
            </div>

            <div>
              <label style={{ fontSize: "11px", color: "#64748b", fontWeight: "700" }}>SEVERITY CLASSIFICATION</label>
              <select
                className="input-field"
                style={{ marginTop: "4px" }}
                value={triageForm.severity}
                onChange={(e) => setTriageForm({ ...triageForm, severity: e.target.value })}
              >
                <option value="Low">Low (30 Days SLA)</option>
                <option value="Medium">Medium (14 Days SLA)</option>
                <option value="High">High (7 Days SLA)</option>
                <option value="Critical">Critical (72 Hours SLA)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: "11px", color: "#64748b", fontWeight: "700" }}>ASSIGN RESPONSIBLE OFFICER</label>
              <input
                className="input-field"
                style={{ marginTop: "4px" }}
                type="text"
                value={triageForm.officer}
                onChange={(e) => setTriageForm({ ...triageForm, officer: e.target.value })}
                placeholder="e.g. Er. Rajesh Kumar"
                required
              />
            </div>

            <div>
              <label style={{ fontSize: "11px", color: "#64748b", fontWeight: "700" }}>ACCOUNTABLE DEPARTMENT</label>
              <input
                className="input-field"
                style={{ marginTop: "4px" }}
                type="text"
                value={triageForm.department}
                onChange={(e) => setTriageForm({ ...triageForm, department: e.target.value })}
                placeholder="e.g. PWD Health Infrastructure"
                required
              />
            </div>

            <div>
              <label style={{ fontSize: "11px", color: "#64748b", fontWeight: "700" }}>TARGET DEADLINE</label>
              <input
                className="input-field"
                style={{ marginTop: "4px" }}
                type="date"
                value={triageForm.deadline}
                onChange={(e) => setTriageForm({ ...triageForm, deadline: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: "11px", color: "#64748b", fontWeight: "700" }}>WORKFLOW STEP</label>
              <select
                className="input-field"
                style={{ marginTop: "4px" }}
                value={triageForm.step}
                onChange={(e) => setTriageForm({ ...triageForm, step: e.target.value })}
              >
                <option value={2}>Step 2: Audit Verified</option>
                <option value={3}>Step 3: Officer Assigned</option>
                <option value={4}>Step 4: Field Action Initiated</option>
                <option value={5}>Step 5: Action Done (User Verify)</option>
              </select>
            </div>

            <button type="submit" style={{ padding: "10px", background: "#f59e0b", color: "#000", fontWeight: "700", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "6px", fontSize: "13px" }}>
              Save SLA Update
            </button>
          </form>
        ) : (
          <div style={{ color: "#64748b", fontSize: "13px" }}>Select a report from the table to triage.</div>
        )}
      </div>

      <div style={{ background: "#131b2e", border: "1px solid #1e293b", borderRadius: "12px", padding: "16px", overflowX: "auto" }}>
        <h3 style={{ color: "#38bdf8", margin: "0 0 12px 0", fontSize: "15px" }}>📋 Incoming Case Queue</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", color: "#cbd5e1" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #334155", color: "#64748b", textAlign: "left" }}>
              <th style={{ padding: "6px" }}>Case</th>
              <th style={{ padding: "6px" }}>SLA</th>
              <th style={{ padding: "6px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id} style={{ borderBottom: "1px solid #1e293b", background: selectedReport?.id === r.id ? "#1e293b" : "transparent" }}>
                <td style={{ padding: "8px" }} onClick={() => setSelectedReport(r)}>
                  <div style={{ fontWeight: "700", color: "#fff", cursor: "pointer" }}>{r.id}</div>
                  <div style={{ fontSize: "10px", color: "#94a3b8" }}>{r.institution}</div>
                </td>
                <td style={{ padding: "8px" }}>
                  <span style={{ color: r.daysRemaining <= 0 ? "#ef4444" : "#4ade80", fontWeight: "700" }}>
                    {r.daysRemaining > 0 ? `${r.daysRemaining}d left` : "OVERDUE"}
                  </span>
                </td>
                <td style={{ padding: "8px" }}>
                  {r.daysRemaining <= 0 && r.status !== "Overdue" && (
                    <button
                      onClick={() => handleTriggerEscalation(r.id)}
                      style={{ padding: "4px 8px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", fontSize: "10px", fontWeight: "700", cursor: "pointer" }}
                    >
                      🚨 Escalation
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function App() {
  const [role, setRole] = useState("USER");
  const [reports, setReports] = useState([
    {
      id: "INC-2026-00124",
      institution: "MGM Medical College & Hospital",
      title: "Wheelchair ramp blocked by construction debris",
      locationDetail: "Emergency Ward Entrance",
      severity: "High",
      step: 4,
      status: "In Progress",
      responsibleOfficer: "Er. A. K. Singh",
      department: "PWD Health Cell",
      deadline: "2026-09-02",
      daysRemaining: 5,
    },
    {
      id: "INC-2026-00125",
      institution: "St. Xavier School",
      title: "Tactile paving broken leading to main auditorium",
      locationDetail: "Academic Block A",
      severity: "Medium",
      step: 5,
      status: "Awaiting Verification",
      responsibleOfficer: "Mr. Sharma (Estate Head)",
      department: "School Infrastructure Wing",
      deadline: "2026-08-28",
      daysRemaining: 2,
    },
  ]);

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.innerHTML = styles;
    document.head.appendChild(styleEl);
    return () => styleEl.remove();
  }, []);

  const handleVerifyReport = (reportId, isResolved) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          return isResolved
            ? { ...r, status: "Resolved", step: 6 }
            : { ...r, status: "In Progress", step: 4, daysRemaining: 3 };
        }
        return r;
      })
    );
  };

  const handleUpdateReport = (reportId, updatedFields) => {
    setReports((prev) => prev.map((r) => (r.id === reportId ? { ...r, ...updatedFields } : r)));
  };

  return (
    <div className="app-container">
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e293b", paddingBottom: "12px", marginBottom: "16px" }}>
        <div>
          <h2 style={{ margin: 0, color: "#f59e0b", fontSize: "18px" }}>InclusiveX</h2>
          <span style={{ fontSize: "11px", color: "#38bdf8" }}>Audit → Action → Governance Pipeline</span>
        </div>
        <div style={{ display: "flex", gap: "6px", background: "#131b2e", padding: "4px", borderRadius: "8px" }}>
          <button
            onClick={() => setRole("USER")}
            style={{ padding: "6px 12px", border: "none", borderRadius: "6px", background: role === "USER" ? "#f59e0b" : "transparent", color: role === "USER" ? "#000" : "#94a3b8", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}
          >
            User View
          </button>
          <button
            onClick={() => setRole("ADMIN")}
            style={{ padding: "6px 12px", border: "none", borderRadius: "6px", background: role === "ADMIN" ? "#f59e0b" : "transparent", color: role === "ADMIN" ? "#000" : "#94a3b8", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}
          >
            Admin View
          </button>
        </div>
      </header>

      {role === "USER" ? <UserDashboard reports={reports} onVerifyReport={handleVerifyReport} /> : <AdminDashboard reports={reports} onUpdateReport={handleUpdateReport} />}
    </div>
  );
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
