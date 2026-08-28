import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";

/* =========================================================
   InclusiveX — From Audit to Action
   Self-contained prototype: React + browser APIs only
========================================================= */

const DEMO_TODAY = "2026-08-28";
const STORAGE_KEY = "inclusivex-demo-v1";

const initialActions = [
  {
    id: "AX-001",
    recommendation: "Improve accessible main entrance",
    priority: "Critical",
    department: "Facilities",
    owner: "Facilities Manager",
    deadline: "2026-09-15",
    estimatedCost: 80000,
    budgetStatus: "Approved",
    status: "In Progress",
    progress: 65,
    evidenceSubmitted: false,
    escalationLevel: "None",
    comments: "Ramp and entrance approach under implementation."
  },
  {
    id: "AX-002",
    recommendation: "Improve accessible toilet facilities",
    priority: "High",
    department: "Engineering",
    owner: "Project Manager",
    deadline: "2026-09-30",
    estimatedCost: 150000,
    budgetStatus: "Pending Approval",
    status: "Pending",
    progress: 0,
    evidenceSubmitted: false,
    escalationLevel: "None",
    comments: ""
  },
  {
    id: "AX-003",
    recommendation: "Install accessible signage",
    priority: "Medium",
    department: "Administration",
    owner: "Admin Manager",
    deadline: "2026-08-15",
    estimatedCost: 20000,
    budgetStatus: "Funded",
    status: "Completed",
    progress: 100,
    evidenceSubmitted: true,
    escalationLevel: "None",
    comments: "Directional and room signage completed."
  },
  {
    id: "AX-004",
    recommendation: "Improve accessible parking",
    priority: "Critical",
    department: "Facilities",
    owner: "Facilities Manager",
    deadline: "2026-08-20",
    estimatedCost: 90000,
    budgetStatus: "Pending Approval",
    status: "In Progress",
    progress: 35,
    evidenceSubmitted: false,
    escalationLevel: "Department",
    comments: "Parking redesign is awaiting funding."
  },
  {
    id: "AX-005",
    recommendation: "Remove pathway obstruction",
    priority: "High",
    department: "Facilities",
    owner: "Estate Officer",
    deadline: "2026-08-18",
    estimatedCost: 15000,
    budgetStatus: "Approved",
    status: "Completed",
    progress: 100,
    evidenceSubmitted: true,
    escalationLevel: "None",
    comments: ""
  },
  {
    id: "AX-006",
    recommendation: "Improve lift accessibility",
    priority: "Critical",
    department: "Engineering",
    owner: "Maintenance Head",
    deadline: "2026-09-05",
    estimatedCost: 225000,
    budgetStatus: "Pending Approval",
    status: "In Progress",
    progress: 55,
    evidenceSubmitted: false,
    escalationLevel: "None",
    comments: "Control panel upgrade planned."
  },
  {
    id: "AX-007",
    recommendation: "Improve emergency accessibility information",
    priority: "High",
    department: "Safety",
    owner: "Safety Officer",
    deadline: "2026-08-12",
    estimatedCost: 12000,
    budgetStatus: "Funded",
    status: "Completed",
    progress: 100,
    evidenceSubmitted: true,
    escalationLevel: "None",
    comments: ""
  },
  {
    id: "AX-008",
    recommendation: "Improve accessible communication",
    priority: "Medium",
    department: "Administration",
    owner: "Communications Officer",
    deadline: "2026-09-12",
    estimatedCost: 10000,
    budgetStatus: "Approved",
    status: "In Progress",
    progress: 60,
    evidenceSubmitted: false,
    escalationLevel: "None",
    comments: ""
  },
  {
    id: "AX-009",
    recommendation: "Improve wayfinding signage",
    priority: "Medium",
    department: "Administration",
    owner: "Admin Manager",
    deadline: "2026-09-25",
    estimatedCost: 18000,
    budgetStatus: "Estimate Available",
    status: "Assigned",
    progress: 10,
    evidenceSubmitted: false,
    escalationLevel: "None",
    comments: ""
  },
  {
    id: "AX-010",
    recommendation: "Improve ramp access",
    priority: "Critical",
    department: "Facilities",
    owner: "Facilities Manager",
    deadline: "2026-08-10",
    estimatedCost: 125000,
    budgetStatus: "Pending Approval",
    status: "Escalated",
    progress: 20,
    evidenceSubmitted: false,
    escalationLevel: "Nodal Officer",
    comments: "Funding and contractor confirmation pending."
  },
  {
    id: "AX-011",
    recommendation: "Improve accessible reception counter",
    priority: "High",
    department: "Facilities",
    owner: "Estate Officer",
    deadline: "2026-09-18",
    estimatedCost: 45000,
    budgetStatus: "Approved",
    status: "In Progress",
    progress: 50,
    evidenceSubmitted: false,
    escalationLevel: "None",
    comments: ""
  },
  {
    id: "AX-012",
    recommendation: "Provide accessible waiting area seating",
    priority: "Medium",
    department: "Administration",
    owner: "Admin Manager",
    deadline: "2026-10-02",
    estimatedCost: 30000,
    budgetStatus: "Estimate Available",
    status: "Assigned",
    progress: 15,
    evidenceSubmitted: false,
    escalationLevel: "None",
    comments: ""
  },
  {
    id: "AX-013",
    recommendation: "Improve accessible entrance lighting",
    priority: "Medium",
    department: "Electrical",
    owner: "Electrical Engineer",
    deadline: "2026-08-22",
    estimatedCost: 25000,
    budgetStatus: "Approved",
    status: "Completed",
    progress: 100,
    evidenceSubmitted: true,
    escalationLevel: "None",
    comments: ""
  },
  {
    id: "AX-014",
    recommendation: "Provide accessible emergency route maps",
    priority: "High",
    department: "Safety",
    owner: "Safety Officer",
    deadline: "2026-09-08",
    estimatedCost: 8000,
    budgetStatus: "Funded",
    status: "In Progress",
    progress: 70,
    evidenceSubmitted: false,
    escalationLevel: "None",
    comments: ""
  },
  {
    id: "AX-015",
    recommendation: "Improve accessible drinking water point",
    priority: "Low",
    department: "Facilities",
    owner: "Estate Officer",
    deadline: "2026-10-10",
    estimatedCost: 18000,
    budgetStatus: "Estimate Available",
    status: "Pending",
    progress: 0,
    evidenceSubmitted: false,
    escalationLevel: "None",
    comments: ""
  },
  {
    id: "AX-016",
    recommendation: "Improve accessible website communication materials",
    priority: "High",
    department: "IT",
    owner: "IT Manager",
    deadline: "2026-09-20",
    estimatedCost: 35000,
    budgetStatus: "Approved",
    status: "In Progress",
    progress: 55,
    evidenceSubmitted: false,
    escalationLevel: "None",
    comments: ""
  },
  {
    id: "AX-017",
    recommendation: "Improve accessible staff communication protocols",
    priority: "Medium",
    department: "Human Resources",
    owner: "HR Manager",
    deadline: "2026-09-28",
    estimatedCost: 5000,
    budgetStatus: "Not Required",
    status: "Completed",
    progress: 100,
    evidenceSubmitted: true,
    escalationLevel: "None",
    comments: ""
  },
  {
    id: "AX-018",
    recommendation: "Improve accessible visitor registration process",
    priority: "Medium",
    department: "Administration",
    owner: "Admin Manager",
    deadline: "2026-08-25",
    estimatedCost: 12000,
    budgetStatus: "Funded",
    status: "Completed",
    progress: 100,
    evidenceSubmitted: true,
    escalationLevel: "None",
    comments: ""
  },
  {
    id: "AX-019",
    recommendation: "Improve accessible internal pathways",
    priority: "High",
    department: "Facilities",
    owner: "Estate Officer",
    deadline: "2026-09-10",
    estimatedCost: 60000,
    budgetStatus: "Pending Approval",
    status: "In Progress",
    progress: 45,
    evidenceSubmitted: false,
    escalationLevel: "None",
    comments: ""
  },
  {
    id: "AX-020",
    recommendation: "Improve accessible door hardware",
    priority: "Medium",
    department: "Engineering",
    owner: "Maintenance Head",
    deadline: "2026-08-16",
    estimatedCost: 28000,
    budgetStatus: "Approved",
    status: "Completed",
    progress: 100,
    evidenceSubmitted: true,
    escalationLevel: "None",
    comments: ""
  },
  {
    id: "AX-021",
    recommendation: "Provide accessible public information desk support",
    priority: "High",
    department: "Administration",
    owner: "Admin Manager",
    deadline: "2026-09-06",
    estimatedCost: 15000,
    budgetStatus: "Funded",
    status: "In Progress",
    progress: 65,
    evidenceSubmitted: false,
    escalationLevel: "None",
    comments: ""
  },
  {
    id: "AX-022",
    recommendation: "Improve accessible stairway contrast markings",
    priority: "Low",
    department: "Facilities",
    owner: "Estate Officer",
    deadline: "2026-09-22",
    estimatedCost: 9000,
    budgetStatus: "Estimate Available",
    status: "Assigned",
    progress: 20,
    evidenceSubmitted: false,
    escalationLevel: "None",
    comments: ""
  },
  {
    id: "AX-023",
    recommendation: "Improve accessible staff training",
    priority: "Medium",
    department: "Human Resources",
    owner: "HR Manager",
    deadline: "2026-08-30",
    estimatedCost: 10000,
    budgetStatus: "Approved",
    status: "In Progress",
    progress: 75,
    evidenceSubmitted: false,
    escalationLevel: "None",
    comments: ""
  },
  {
    id: "AX-024",
    recommendation: "Improve accessible complaint and feedback process",
    priority: "High",
    department: "Administration",
    owner: "Grievance Officer",
    deadline: "2026-09-14",
    estimatedCost: 7000,
    budgetStatus: "Funded",
    status: "Completed",
    progress: 100,
    evidenceSubmitted: true,
    escalationLevel: "None",
    comments: ""
  },
  {
    id: "AX-025",
    recommendation: "Improve accessible transport drop-off area",
    priority: "Critical",
    department: "Facilities",
    owner: "Facilities Manager",
    deadline: "2026-08-19",
    estimatedCost: 75000,
    budgetStatus: "Pending Approval",
    status: "In Progress",
    progress: 30,
    evidenceSubmitted: false,
    escalationLevel: "Leadership",
    comments: "Capital approval required."
  },
  {
    id: "AX-026",
    recommendation: "Improve accessible public announcement information",
    priority: "Medium",
    department: "Communications",
    owner: "Communications Officer",
    deadline: "2026-09-17",
    estimatedCost: 16000,
    budgetStatus: "Approved",
    status: "In Progress",
    progress: 50,
    evidenceSubmitted: false,
    escalationLevel: "None",
    comments: ""
  },
  {
    id: "AX-027",
    recommendation: "Improve accessible service counter queue management",
    priority: "High",
    department: "Administration",
    owner: "Admin Manager",
    deadline: "2026-08-21",
    estimatedCost: 22000,
    budgetStatus: "Approved",
    status: "Completed",
    progress: 100,
    evidenceSubmitted: true,
    escalationLevel: "None",
    comments: ""
  }
];

const initialOrganisation = {
  name: "Jamshedpur Government Institution",
  location: "Jamshedpur, Jharkhand",
  auditDate: "2026-08-12",
  auditor: "Accessibility Audit Agency — Demo",
  reference: "AX-AUD-2026-014"
};

const publicOrganisations = [
  {
    name: "Jamshedpur Government Institution",
    location: "Jamshedpur, Jharkhand"
  },
  {
    name: "ABC Public Hospital",
    location: "Jamshedpur, Jharkhand"
  },
  {
    name: "XYZ University",
    location: "Jamshedpur, Jharkhand"
  }
];

function cloneDemoActions() {
  return initialActions.map((a) => ({ ...a }));
}

function daysBetween(a, b) {
  const first = new Date(`${a}T00:00:00`);
  const second = new Date(`${b}T00:00:00`);
  return Math.round((second - first) / 86400000);
}

function formatDate(date) {
  if (!date) return "—";
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function formatCurrency(value) {
  if (value === null || value === undefined || value === "" || Number(value) === 0) {
    return "Cost estimate not provided";
  }
  return `₹${new Intl.NumberFormat("en-IN").format(Number(value))}`;
}

function isOverdue(action) {
  return action.status !== "Completed" && action.deadline < DEMO_TODAY;
}

function isDueSoon(action) {
  const days = daysBetween(DEMO_TODAY, action.deadline);
  return action.status !== "Completed" && days >= 0 && days <= 7;
}

function getDeadlineLabel(action) {
  if (isOverdue(action)) {
    const days = Math.abs(daysBetween(DEMO_TODAY, action.deadline));
    return days === 0 ? "Due today" : `${days} day${days === 1 ? "" : "s"} overdue`;
  }
  if (action.status !== "Completed" && action.deadline === DEMO_TODAY) return "Due today";
  if (isDueSoon(action)) {
    const days = daysBetween(DEMO_TODAY, action.deadline);
    return days === 0 ? "Due today" : `Due in ${days} day${days === 1 ? "" : "s"}`;
  }
  return formatDate(action.deadline);
}

function calculateMetrics(actions) {
  const total = actions.length;
  const completed = actions.filter((a) => a.status === "Completed").length;
  const inProgress = actions.filter((a) =>
    ["In Progress", "Assigned", "Evidence Submitted", "Blocked"].includes(a.status)
  ).length;
  const overdue = actions.filter(isOverdue).length;
  const critical = actions.filter((a) => a.priority === "Critical");
  const criticalManaged = critical.filter((a) =>
    ["In Progress", "Evidence Submitted", "Completed", "Escalated"].includes(a.status)
  ).length;

  const eligible = actions.filter((a) => a.status !== "Pending").length || 0;
  const meetingDeadlines = actions.filter(
    (a) => a.status === "Completed" && !isOverdue(a)
  ).length;
  const documented = actions.filter((a) => a.evidenceSubmitted).length;

  const completionScore = total ? (completed / total) * 40 : 0;
  const timelinessScore = eligible ? (meetingDeadlines / eligible) * 25 : 0;
  const criticalScore = critical.length ? (criticalManaged / critical.length) * 20 : 0;
  const documentationScore = eligible ? (documented / eligible) * 15 : 0;

  const actionScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        completionScore + timelinessScore + criticalScore + documentationScore
      )
    )
  );

  const pendingBudget = actions
    .filter((a) =>
      ["Pending Approval", "Partially Approved"].includes(a.budgetStatus)
    )
    .reduce((sum, a) => sum + (Number(a.estimatedCost) || 0), 0);

  const estimatedCost = actions.reduce(
    (sum, a) => sum + (Number(a.estimatedCost) || 0),
    0
  );

  const budgetApproved = actions
    .filter((a) =>
      ["Approved", "Funded"].includes(a.budgetStatus)
    )
    .reduce((sum, a) => sum + (Number(a.estimatedCost) || 0), 0);

  let risk = "LOW";
  if (critical.filter(isOverdue).length >= 2 || overdue >= 6) risk = "CRITICAL";
  else if (critical.some(isOverdue) || overdue >= 3) risk = "HIGH";
  else if (overdue > 0 || actions.some((a) => isDueSoon(a))) risk = "MEDIUM";

  return {
    total,
    completed,
    inProgress,
    overdue,
    critical,
    criticalManaged,
    eligible,
    meetingDeadlines,
    documented,
    actionScore,
    completionScore: Math.round(completionScore),
    timelinessScore: Math.round(timelinessScore),
    criticalScore: Math.round(criticalScore),
    documentationScore: Math.round(documentationScore),
    pendingBudget,
    estimatedCost,
    budgetApproved,
    risk
  };
}

function Icon({ name, size = 20, strokeWidth = 1.8 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true
  };

  const paths = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    file: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h6" />
      </>
    ),
    checklist: (
      <>
        <path d="M9 5h11M9 12h11M9 19h11" />
        <path d="m3 5 1.5 1.5L7 4M3 12l1.5 1.5L7 11M3 19l1.5 1.5L7 18" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 20 6v5c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20h-2.6v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H6v-2.6h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V5h2.6v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1v2.6h-.1a1.7 1.7 0 0 0-1.6 1Z" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V4M8 8l4-4 4 4" />
        <path d="M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
      </>
    ),
    arrow: <path d="m9 18 6-6-6-6" />,
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    alert: (
      <>
        <path d="M12 3 22 20H2z" />
        <path d="M12 9v5M12 17h.01" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    menu: (
      <>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-5" />
      </>
    ),
    document: (
      <>
        <path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        <path d="M14 3v5h5M8 12h7M8 16h7" />
      </>
    ),
    building: (
      <>
        <path d="M4 21V5a2 2 0 0 1 2-2h9v18M15 9h5v12M8 7h3M8 11h3M8 15h3M8 19h3M18 13h1M18 17h1" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M16 2v4M8 2v4M3 9h18" />
      </>
    ),
    rupee: (
      <>
        <path d="M6 5h12M6 9h10M8 5c5 0 7 2 7 5s-2 5-7 5l7 5" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    trend: (
      <>
        <path d="m3 17 6-6 4 4 8-9" />
        <path d="M16 6h5v5" />
      </>
    ),
    flag: (
      <>
        <path d="M5 21V4" />
        <path d="M5 5c4-3 7 3 14 0v9c-7 3-10-3-14 0" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 11a8 8 0 0 0-14-5L4 8M4 4v4h4M4 13a8 8 0 0 0 14 5l2-2M20 20v-4h-4" />
      </>
    ),
    external: (
      <>
        <path d="M14 4h6v6M20 4l-9 9" />
        <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
      </>
    )
  };

  return <svg {...common}>{paths[name] || paths.info}</svg>;
}

function Badge({ children, tone = "neutral" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function getPriorityTone(priority) {
  return {
    Critical: "critical",
    High: "high",
    Medium: "medium",
    Low: "low"
  }[priority] || "neutral";
}

function getStatusTone(status) {
  return {
    Completed: "success",
    "In Progress": "info",
    Assigned: "info",
    Pending: "neutral",
    Blocked: "critical",
    "Evidence Submitted": "purple",
    Escalated: "warning"
  }[status] || "neutral";
}

function getRiskTone(risk) {
  return risk === "LOW"
    ? "success"
    : risk === "MEDIUM"
      ? "medium"
      : risk === "HIGH"
        ? "high"
        : "critical";
}

function StatCard({ label, value, caption, icon, tone = "" }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span className="stat-label">{label}</span>
        <span className={`stat-icon ${tone}`}>
          <Icon name={icon} size={18} />
        </span>
      </div>
      <div className="stat-value">{value}</div>
      {caption && <div className="stat-caption">{caption}</div>}
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div className="section-header">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function ProgressBar({ value, height = 8 }) {
  return (
    <div className="progress-track" style={{ height }}>
      <div className="progress-fill" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

function ActionScore({ score, size = 170 }) {
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div
      className="score-ring"
      style={{ width: size, height: size }}
      aria-label={`Action Score ${score} out of 100`}
    >
      <svg width={size} height={size} viewBox="0 0 160 160" aria-hidden="true">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          opacity=".12"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 80 80)"
          className="score-progress"
        />
      </svg>
      <div className="score-center">
        <strong>{score}</strong>
        <span>/100</span>
      </div>
    </div>
  );
}

function MiniBar({ label, value, total, tone = "" }) {
  const percentage = total ? (value / total) * 100 : 0;
  return (
    <div className="mini-bar-row">
      <div className="mini-bar-label">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="mini-bar-track">
        <div className={`mini-bar-fill ${tone}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

function EmptyState({ icon = "file", title, text }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Icon name={icon} size={28} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Modal({ title, children, onClose, width = 720 }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="modal"
        style={{ maxWidth: width }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button className="icon-button" onClick={onClose} aria-label="Close dialog">
            <Icon name="close" />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

function Toast({ toast, onClose }) {
  if (!toast) return null;
  return (
    <div className="toast" role="status">
      <div className="toast-icon">
        <Icon name="check" size={18} />
      </div>
      <div>
        <strong>{toast.title}</strong>
        <span>{toast.message}</span>
      </div>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        <Icon name="close" size={16} />
      </button>
    </div>
  );
}

function App() {
  const [activePage, setActivePage] = useState("Overview");
  const [role, setRole] = useState("Leadership");
  const [actions, setActions] = useState(cloneDemoActions);
  const [organisation, setOrganisation] = useState(initialOrganisation);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [commitment, setCommitment] = useState({
    officer: "",
    designation: "",
    date: "",
    approved: false
  });
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const [toast, setToast] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    priority: "All",
    status: "All",
    department: "All",
    owner: "All",
    overdue: "All",
    escalation: "All",
    sort: "Deadline"
  });

  const [evidenceForm, setEvidenceForm] = useState({
    type: "Photo",
    fileName: "",
    note: ""
  });

  const [actionForm, setActionForm] = useState({
    owner: "",
    deadline: "",
    budget: "",
    budgetStatus: "",
    status: "",
    progress: "",
    comments: ""
  });

  const [publicSearch, setPublicSearch] = useState("");
  const [selectedPublicOrg, setSelectedPublicOrg] = useState(publicOrganisations[0]);

  const metrics = useMemo(() => calculateMetrics(actions), [actions]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.actions) setActions(saved.actions);
        if (saved.organisation) setOrganisation(saved.organisation);
        if (saved.role) setRole(saved.role);
        if (saved.uploadedFile) setUploadedFile(saved.uploadedFile);
        if (saved.commitment) setCommitment(saved.commitment);
      }
    } catch {
      // Keep demo state if localStorage is unavailable/corrupt.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          actions,
          organisation,
          role,
          uploadedFile,
          commitment
        })
      );
    } catch {
      // Browser storage may be unavailable.
    }
  }, [actions, organisation, role, uploadedFile, commitment]);

  useEffect(() => {
    const generated = [];

    if (metrics.overdue > 0) {
      generated.push({
        id: "overdue",
        title: `${metrics.overdue} action${metrics.overdue === 1 ? "" : "s"} overdue.`,
        message: "Leadership attention may be required."
      });
    }

    actions.filter(isDueSoon).slice(0, 3).forEach((a) => {
      generated.push({
        id: `due-${a.id}`,
        title: `${a.id} deadline approaching.`,
        message: getDeadlineLabel(a)
      });
    });

    actions
      .filter((a) => a.evidenceSubmitted)
      .slice(-2)
      .forEach((a) => {
        generated.push({
          id: `evidence-${a.id}`,
          title: `Evidence submitted for ${a.id}.`,
          message: "Pending review by an authorised reviewer."
        });
      });

    if (!commitment.approved) {
      generated.push({
        id: "approval",
        title: "Leadership approval pending.",
        message: "Approve the prototype action plan when ready."
      });
    }

    setNotifications(generated.slice(0, 8));
  }, [actions, metrics.overdue, commitment.approved]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  const navItems = [
    { name: "Overview", icon: "grid" },
    { name: "Audit Reports", icon: "file" },
    { name: "Action Plan", icon: "checklist" },
    { name: "Leadership Dashboard", icon: "trend" },
    { name: "Compliance Risk", icon: "shield" },
    { name: "Escalations", icon: "flag" },
    { name: "Public Transparency", icon: "eye" },
    { name: "Policy Framework", icon: "document" },
    { name: "Settings", icon: "settings" }
  ];

  const rolePages = {
    Leadership: ["Leadership Dashboard", "Compliance Risk", "Escalations"],
    "Action Owner": ["Action Plan", "Escalations"],
    Public: ["Public Transparency"]
  };

  function navigate(page) {
    setActivePage(page);
    setMobileMenu(false);
    setShowNotifications(false);
  }

  function showToast(title, message) {
    setToast({ title, message });
  }

  function updateAction(id, updates) {
    setActions((current) =>
      current.map((action) => {
        if (action.id !== id) return action;
        const next = { ...action, ...updates };

        if (next.status === "Completed") {
          next.progress = 100;
        }

        if (next.status === "Evidence Submitted") {
          next.evidenceSubmitted = true;
        }

        if (next.status === "Escalated" && next.escalationLevel === "None") {
          next.escalationLevel = "Department";
        }

        return next;
      })
    );
  }

  function openAction(action) {
    setSelectedAction(action);
    setActionForm({
      owner: action.owner,
      deadline: action.deadline,
      budget: action.estimatedCost ?? "",
      budgetStatus: action.budgetStatus,
      status: action.status,
      progress: action.progress,
      comments: action.comments || ""
    });
    setModalMode("detail");
  }

  function closeModal() {
    setSelectedAction(null);
    setModalMode(null);
  }

  function saveActionForm() {
    if (!selectedAction) return;

    const progressValue = Math.max(
      0,
      Math.min(100, Number(actionForm.progress || 0))
    );

    updateAction(selectedAction.id, {
      owner: actionForm.owner.trim() || selectedAction.owner,
      deadline: actionForm.deadline || selectedAction.deadline,
      estimatedCost:
        actionForm.budget === "" ? selectedAction.estimatedCost : Number(actionForm.budget),
      budgetStatus: actionForm.budgetStatus,
      status: actionForm.status,
      progress: actionForm.status === "Completed" ? 100 : progressValue,
      comments: actionForm.comments
    });

    showToast("Action updated", `${selectedAction.id} has been updated.`);
    closeModal();
  }

  function escalateAction(action) {
    const levels = ["Department", "Nodal Officer", "Leadership", "Competent Authority"];
    const currentIndex = levels.indexOf(action.escalationLevel);
    const nextLevel = levels[Math.min(currentIndex + 1, levels.length - 1)];

    updateAction(action.id, {
      escalationLevel: nextLevel,
      status: "Escalated"
    });

    showToast(
      "Escalation updated",
      `${action.id} escalated to ${nextLevel}.`
    );
  }

  function submitEvidence() {
    if (!selectedAction || !evidenceForm.fileName.trim()) {
      showToast("File name required", "Enter a demo evidence file name.");
      return;
    }

    updateAction(selectedAction.id, {
      evidenceSubmitted: true,
      status:
        selectedAction.status === "Completed"
          ? "Completed"
          : "Evidence Submitted"
    });

    showToast(
      "Evidence submitted",
      `${selectedAction.id} evidence is pending review by an authorised reviewer.`
    );

    setEvidenceForm({
      type: "Photo",
      fileName: "",
      note: ""
    });
    closeModal();
  }

  function simulateUpload(file) {
    if (!file) return;

    const allowed =
      file.name.toLowerCase().endsWith(".pdf") ||
      file.name.toLowerCase().endsWith(".docx");

    if (!allowed) {
      showToast("Unsupported file", "Please choose a PDF or DOCX demo report.");
      return;
    }

    setUploadedFile({
      name: file.name,
      size: file.size,
      type: file.type || "document",
      uploadedAt: new Date().toISOString()
    });

    showToast("Report uploaded", "Report uploaded successfully.");
  }

  function createActionPlan() {
    if (!uploadedFile) {
      showToast("Upload required", "Upload an existing audit report first.");
      return;
    }

    navigate("Action Plan");
    showToast(
      "Prototype Demo Extraction",
      "Demo recommendations have been loaded for the uploaded report."
    );
  }

  function resetDemo() {
    setActions(cloneDemoActions());
    setOrganisation(initialOrganisation);
    setUploadedFile(null);
    setCommitment({
      officer: "",
      designation: "",
      date: "",
      approved: false
    });
    setRole("Leadership");
    setActivePage("Overview");
    setFilters({
      search: "",
      priority: "All",
      status: "All",
      department: "All",
      owner: "All",
      overdue: "All",
      escalation: "All",
      sort: "Deadline"
    });

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore.
    }

    showToast("Demo reset", "InclusiveX has been restored to the prototype data.");
  }

  function clearLocalData() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore.
    }
    showToast("Local data cleared", "Saved browser data has been removed.");
  }

  function approveCommitment(e) {
    e.preventDefault();

    if (!commitment.officer || !commitment.designation || !commitment.date) {
      showToast("Complete the fields", "Add officer, designation and commitment date.");
      return;
    }

    setCommitment((current) => ({
      ...current,
      approved: true
    }));

    showToast(
      "Action Plan Approved",
      "Senior Owner Assigned — prototype management commitment recorded."
    );
  }

  const departments = [...new Set(actions.map((a) => a.department))].sort();
  const owners = [...new Set(actions.map((a) => a.owner))].sort();

  const filteredActions = useMemo(() => {
    let result = [...actions];

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (a) =>
          a.id.toLowerCase().includes(q) ||
          a.recommendation.toLowerCase().includes(q) ||
          a.department.toLowerCase().includes(q) ||
          a.owner.toLowerCase().includes(q)
      );
    }

    if (filters.priority !== "All") {
      result = result.filter((a) => a.priority === filters.priority);
    }

    if (filters.status !== "All") {
      result = result.filter((a) => a.status === filters.status);
    }

    if (filters.department !== "All") {
      result = result.filter((a) => a.department === filters.department);
    }

    if (filters.owner !== "All") {
      result = result.filter((a) => a.owner === filters.owner);
    }

    if (filters.overdue === "Overdue") {
      result = result.filter(isOverdue);
    }

    if (filters.escalation === "Escalated") {
      result = result.filter((a) => a.escalationLevel !== "None");
    }

    result.sort((a, b) => {
      if (filters.sort === "Priority") {
        const weight = { Critical: 4, High: 3, Medium: 2, Low: 1 };
        return weight[b.priority] - weight[a.priority];
      }
      if (filters.sort === "Status") {
        return a.status.localeCompare(b.status);
      }
      return a.deadline.localeCompare(b.deadline);
    });

    return result;
  }, [actions, filters]);

  const publicResults = publicOrganisations.filter((org) =>
    org.name.toLowerCase().includes(publicSearch.toLowerCase())
  );

  function renderOverview() {
    return (
      <>
        <section className="hero">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span className="kicker-dot" />
              CIVIC-TECH ACCOUNTABILITY LAYER
            </div>
            <h1>
              FROM AUDIT
              <br />
              <span>TO ACTION.</span>
            </h1>
            <p className="hero-subtitle">
              Turn accessibility audit recommendations into accountable,
              time-bound organisational action.
            </p>
            <div className="hero-actions">
              <button className="button primary" onClick={() => navigate("Audit Reports")}>
                <Icon name="upload" size={18} />
                Upload Audit Report
              </button>
              <button
                className="button secondary"
                onClick={() => navigate("Leadership Dashboard")}
              >
                <Icon name="trend" size={18} />
                View Leadership Dashboard
              </button>
            </div>
            <div className="hero-trust">
              <span><Icon name="check" size={15} /> Existing audit first</span>
              <span><Icon name="check" size={15} /> Owner-led implementation</span>
              <span><Icon name="check" size={15} /> Leadership visibility</span>
            </div>
          </div>

          <div className="hero-flow-card">
            <div className="flow-card-head">
              <span>THE ACCOUNTABILITY LAYER</span>
              <Badge tone="info">Prototype</Badge>
            </div>
            <div className="flow-stack">
              {[
                ["01", "AUDIT REPORT", "Existing findings"],
                ["02", "ACTION PLAN", "What changes"],
                ["03", "OWNER", "Who acts"],
                ["04", "BUDGET", "What it needs"],
                ["05", "DEADLINE", "When it happens"],
                ["06", "TRACK + ESCALATE", "Leadership visibility"]
              ].map(([num, title, text], i) => (
                <div className="flow-item" key={title}>
                  <div className="flow-num">{num}</div>
                  <div>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                  {i < 5 && <div className="flow-line" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="gap-section">
          <div className="gap-left">
            <div className="eyebrow">THE GAP</div>
            <h2>
              An audit only creates change when its recommendations are acted
              upon.
            </h2>
            <p>
              Organisations may already know what needs to change. The missing
              layer is accountability for implementation.
            </p>
          </div>
          <div className="gap-track">
            {[
              ["Audit Conducted", true],
              ["Report Submitted", true],
              ["Recommendations Identified", true],
              ["Implementation Follow-up", false]
            ].map(([text, done]) => (
              <div className={`gap-step ${done ? "done" : "missing"}`} key={text}>
                <div className="gap-icon">
                  <Icon name={done ? "check" : "clock"} size={18} />
                </div>
                <span>{text}</span>
                <Badge tone={done ? "success" : "critical"}>
                  {done ? "Complete" : "Missing"}
                </Badge>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <SectionHeader
            eyebrow="WHAT INCLUSIVEX DOES"
            title="The missing management layer."
            subtitle="InclusiveX does not conduct the audit. It makes the recommendations actionable."
          />
          <div className="three-grid">
            <div className="feature-card">
              <div className="feature-icon"><Icon name="users" /></div>
              <h3>Make responsibility visible</h3>
              <p>
                Every recommendation can have a department, action owner and
                accountable leadership path.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Icon name="rupee" /></div>
              <h3>Make budgets and deadlines trackable</h3>
              <p>
                Record implementation costs, funding status and target dates in
                one action plan.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Icon name="flag" /></div>
              <h3>Escalate overdue actions</h3>
              <p>
                Delays become visible to the next accountability level instead
                of disappearing inside a report.
              </p>
            </div>
          </div>
        </section>

        <section className="story-banner">
          <div>
            <div className="eyebrow">THE CORE IDEA</div>
            <h2>
              An accessibility audit tells an organisation what needs to
              change.
            </h2>
            <p>InclusiveX helps make sure someone is responsible for changing it.</p>
          </div>
          <div className="story-quote">
            <span>DON'T CREATE ANOTHER AUDIT.</span>
            <strong>Create accountability for the audit that already exists.</strong>
          </div>
        </section>

        <section className="section">
          <SectionHeader
            eyebrow="WHO DOES WHAT?"
            title="A shared accountability model."
          />
          <div className="responsibility-grid">
            {[
              [
                "Organisation",
                "Provides the existing audit report and implementation updates.",
                "building"
              ],
              [
                "Leadership",
                "Approves priorities, budgets and monitors progress.",
                "trend"
              ],
              [
                "Departments",
                "Implement assigned actions and submit updates.",
                "users"
              ],
              [
                "InclusiveX",
                "Tracks, visualises and escalates implementation.",
                "target"
              ],
              [
                "Competent Authority",
                "Handles legal enforcement where applicable.",
                "shield"
              ]
            ].map(([title, text, icon]) => (
              <div className="responsibility-card" key={title}>
                <Icon name={icon} size={21} />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="central-message">
            <div className="central-message-icon">
              <Icon name="target" size={28} />
            </div>
            <div>
              <div className="eyebrow">WHY INCLUSIVEX</div>
              <h2>
                Organisations already know many of their accessibility gaps.
              </h2>
              <p>
                The missing layer is accountability for implementation.
                <strong> InclusiveX is that accountability layer.</strong>
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  function renderAuditReports() {
    return (
      <>
        <SectionHeader
          eyebrow="AUDIT REPORTS"
          title="Upload Accessibility Audit"
          subtitle="Start with an existing accessibility audit report."
          action={
            <Badge tone="info">Prototype Demo Extraction</Badge>
          }
        />

        <div className="audit-layout">
          <div className="panel upload-panel">
            <div
              className="upload-zone"
              tabIndex="0"
              role="button"
              aria-label="Choose an accessibility audit report"
              onClick={() => document.getElementById("audit-file-input").click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  document.getElementById("audit-file-input").click();
                }
              }}
            >
              <div className="upload-icon">
                <Icon name="upload" size={28} />
              </div>
              <h3>Drag & drop your audit report here</h3>
              <p>PDF / DOCX • Existing audit report only</p>
              <button
                className="button secondary"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById("audit-file-input").click();
                }}
              >
                Choose File
              </button>
              <input
                id="audit-file-input"
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                hidden
                onChange={(e) => simulateUpload(e.target.files?.[0])}
              />
            </div>

            {uploadedFile ? (
              <div className="uploaded-file">
                <div className="file-icon">
                  <Icon name="file" />
                </div>
                <div className="file-info">
                  <strong>{uploadedFile.name}</strong>
                  <span>
                    {uploadedFile.size
                      ? `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB`
                      : "Demo metadata"}
                  </span>
                  <Badge tone="success">Uploaded</Badge>
                </div>
                <button
                  className="icon-button"
                  onClick={() => setUploadedFile(null)}
                  aria-label="Remove uploaded report"
                >
                  <Icon name="close" />
                </button>
              </div>
            ) : (
              <div className="helper-note">
                <Icon name="info" size={17} />
                <span>
                  No report is sent to an external service in this prototype.
                  File selection is simulated locally in your browser.
                </span>
              </div>
            )}
          </div>

          <div className="panel audit-details">
            <div className="panel-title-row">
              <div>
                <span className="eyebrow">AUDIT DETAILS</span>
                <h3>Organisation record</h3>
              </div>
              <Icon name="building" size={22} />
            </div>

            <div className="form-grid">
              <label>
                Organisation
                <input
                  value={organisation.name}
                  onChange={(e) =>
                    setOrganisation({ ...organisation, name: e.target.value })
                  }
                />
              </label>
              <label>
                Building / Institution
                <input value={organisation.name} readOnly />
              </label>
              <label>
                Audit Date
                <input
                  type="date"
                  value={organisation.auditDate}
                  onChange={(e) =>
                    setOrganisation({ ...organisation, auditDate: e.target.value })
                  }
                />
              </label>
              <label>
                Auditor / Audit Agency
                <input
                  value={organisation.auditor}
                  onChange={(e) =>
                    setOrganisation({ ...organisation, auditor: e.target.value })
                  }
                />
              </label>
              <label className="full">
                Report Reference Number
                <input
                  value={organisation.reference}
                  onChange={(e) =>
                    setOrganisation({ ...organisation, reference: e.target.value })
                  }
                />
              </label>
            </div>

            <div className="audit-record">
              <div>
                <span>Location</span>
                <strong>{organisation.location}</strong>
              </div>
              <div>
                <span>Audit status</span>
                <Badge tone={uploadedFile ? "success" : "neutral"}>
                  {uploadedFile ? "Report uploaded" : "Awaiting report"}
                </Badge>
              </div>
            </div>

            <button className="button primary wide" onClick={createActionPlan}>
              Create Action Plan
              <Icon name="arrow" size={18} />
            </button>
          </div>
        </div>

        <div className="notice-card">
          <div className="notice-icon"><Icon name="info" /></div>
          <div>
            <strong>Prototype Demo Extraction</strong>
            <p>
              Selecting “Create Action Plan” loads hypothetical demonstration
              recommendations. This prototype does not claim to legally,
              perfectly or independently analyse the uploaded document.
            </p>
          </div>
        </div>

        <section className="section compact">
          <SectionHeader
            eyebrow="PRODUCT BOUNDARY"
            title="What InclusiveX does — and does not do."
          />
          <div className="boundary-grid">
            <div className="boundary-card positive">
              <h3>InclusiveX does</h3>
              <ul>
                <li>Record an existing audit report</li>
                <li>Convert recommendations into actions</li>
                <li>Assign owners and departments</li>
                <li>Track budgets and deadlines</li>
                <li>Track progress and evidence submissions</li>
                <li>Calculate Action Score and Compliance Risk</li>
                <li>Escalate overdue implementation</li>
              </ul>
            </div>
            <div className="boundary-card neutral">
              <h3>InclusiveX does not</h3>
              <ul>
                <li>Conduct physical accessibility audits</li>
                <li>Replace professional or certified auditors</li>
                <li>Certify buildings</li>
                <li>Independently verify physical evidence</li>
                <li>Legally declare an organisation compliant</li>
                <li>Impose or determine legal penalties</li>
              </ul>
            </div>
          </div>
        </section>
      </>
    );
  }

  function renderActionPlan() {
    const actionOwnerActions =
      role === "Action Owner"
        ? filteredActions.filter((a) => a.owner === "Facilities Manager")
        : filteredActions;

    return (
      <>
        <SectionHeader
          eyebrow="IMPLEMENTATION"
          title={role === "Action Owner" ? "My Action Plan" : "Action Plan"}
          subtitle={
            role === "Action Owner"
              ? "Track assigned responsibilities, deadlines and evidence."
              : "Turn audit recommendations into owners, budgets and deadlines."
          }
          action={
            <button className="button primary" onClick={() => navigate("Audit Reports")}>
              <Icon name="plus" size={18} />
              New Audit
            </button>
          }
        />

        <div className="stats-grid four">
          <StatCard label="Total Actions" value={metrics.total} caption="From audit recommendations" icon="checklist" />
          <StatCard label="Completed" value={metrics.completed} caption="Closed actions" icon="check" tone="success" />
          <StatCard label="In Progress" value={metrics.inProgress} caption="Active implementation" icon="trend" tone="info" />
          <StatCard label="Overdue" value={metrics.overdue} caption="Require attention" icon="alert" tone="critical" />
        </div>

        <div className="filter-panel">
          <div className="search-box">
            <Icon name="search" size={18} />
            <input
              aria-label="Search actions"
              placeholder="Search ID, recommendation, department or owner..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>

          <select
            aria-label="Filter by priority"
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          >
            <option>All</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select
            aria-label="Filter by status"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option>All</option>
            {["Pending", "Assigned", "In Progress", "Blocked", "Evidence Submitted", "Completed", "Escalated"].map(
              (s) => <option key={s}>{s}</option>
            )}
          </select>

          <select
            aria-label="Filter by department"
            value={filters.department}
            onChange={(e) => setFilters({ ...filters, department: e.target.value })}
          >
            <option>All</option>
            {departments.map((d) => <option key={d}>{d}</option>)}
          </select>

          <select
            aria-label="Filter by owner"
            value={filters.owner}
            onChange={(e) => setFilters({ ...filters, owner: e.target.value })}
          >
            <option>All</option>
            {owners.map((o) => <option key={o}>{o}</option>)}
          </select>

          <select
            aria-label="Filter overdue actions"
            value={filters.overdue}
            onChange={(e) => setFilters({ ...filters, overdue: e.target.value })}
          >
            <option value="All">Overdue: All</option>
            <option value="Overdue">Overdue Only</option>
          </select>

          <select
            aria-label="Filter escalation"
            value={filters.escalation}
            onChange={(e) => setFilters({ ...filters, escalation: e.target.value })}
          >
            <option value="All">Escalation: All</option>
            <option value="Escalated">Escalated Only</option>
          </select>

          <select
            aria-label="Sort actions"
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option>Deadline</option>
            <option>Priority</option>
            <option>Status</option>
          </select>
        </div>

        <div className="table-panel">
          <div className="table-topline">
            <span>
              Showing <strong>{actionOwnerActions.length}</strong> of {actions.length} actions
            </span>
            <span className="table-date">Demo date: {formatDate(DEMO_TODAY)}</span>
          </div>

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Recommendation</th>
                  <th>Priority</th>
                  <th>Department</th>
                  <th>Owner</th>
                  <th>Deadline</th>
                  <th>Budget</th>
                  <th>Status</th>
                  <th>Escalation</th>
                </tr>
              </thead>
              <tbody>
                {actionOwnerActions.map((action) => (
                  <tr key={action.id} onClick={() => openAction(action)} tabIndex="0" onKeyDown={(e) => {
                    if (e.key === "Enter") openAction(action);
                  }}>
                    <td><strong className="action-id">{action.id}</strong></td>
                    <td>
                      <div className="recommendation-cell">
                        <strong>{action.recommendation}</strong>
                        <span>{action.progress}% implemented</span>
                        <ProgressBar value={action.progress} />
                      </div>
                    </td>
                    <td><Badge tone={getPriorityTone(action.priority)}>{action.priority}</Badge></td>
                    <td>{action.department}</td>
                    <td>{action.owner}</td>
                    <td>
                      <div className={`deadline-cell ${isOverdue(action) ? "overdue" : ""}`}>
                        <span>{formatDate(action.deadline)}</span>
                        {isOverdue(action) && <Badge tone="critical">OVERDUE</Badge>}
                        {!isOverdue(action) && isDueSoon(action) && (
                          <Badge tone="medium">APPROACHING</Badge>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="budget-cell">{formatCurrency(action.estimatedCost)}</span>
                    </td>
                    <td><Badge tone={getStatusTone(action.status)}>{action.status}</Badge></td>
                    <td>
                      {action.escalationLevel === "None" ? (
                        <span className="muted">None</span>
                      ) : (
                        <Badge tone="warning">{action.escalationLevel}</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!actionOwnerActions.length && (
            <EmptyState
              icon="search"
              title="No matching actions"
              text="Try changing your search or filters."
            />
          )}
        </div>
      </>
    );
  }

  function renderLeadershipDashboard() {
    const statusData = [
      ["Completed", metrics.completed, "success"],
      ["In Progress", metrics.inProgress, "info"],
      ["Pending", actions.filter((a) => a.status === "Pending").length, "neutral"],
      ["Overdue", metrics.overdue, "critical"]
    ];

    const priorityData = ["Critical", "High", "Medium", "Low"].map((priority) => [
      priority,
      actions.filter((a) => a.priority === priority).length
    ]);

    return (
      <>
        <SectionHeader
          eyebrow="LEADERSHIP"
          title="Leadership Overview"
          subtitle="Turn audit findings into management decisions."
          action={
            <button className="button secondary" onClick={() => navigate("Action Plan")}>
              View Action Plan <Icon name="arrow" size={17} />
            </button>
          }
        />

        <div className="leadership-grid">
          <div className="score-panel">
            <div>
              <div className="eyebrow">ACTION SCORE</div>
              <h3>Implementation performance</h3>
              <p>
                Measures how effectively recommendations in the uploaded audit
                are being implemented.
              </p>
            </div>
            <ActionScore score={metrics.actionScore} />
            <div className="score-label">
              <strong>ACTION SCORE</strong>
              <span>0–100</span>
            </div>
            <div className="score-info">
              <Icon name="info" size={16} />
              <span>
                Action Score measures implementation progress against
                recommendations contained in the uploaded accessibility audit.
                It is not an independent rating of the building.
              </span>
            </div>
          </div>

          <div className="kpi-area">
            <div className="stats-grid two">
              <StatCard
                label="Compliance Risk"
                value={metrics.risk}
                caption="Rules-based implementation risk"
                icon="shield"
                tone={getRiskTone(metrics.risk)}
              />
              <StatCard label="Total Actions" value={metrics.total} caption="Recommendations tracked" icon="checklist" />
              <StatCard label="Overdue" value={metrics.overdue} caption="Need attention" icon="alert" tone="critical" />
              <StatCard label="Completed" value={metrics.completed} caption="Implementation closed" icon="check" tone="success" />
            </div>

            <div className="implementation-panel">
              <div className="panel-title-row">
                <div>
                  <span className="eyebrow">IMPLEMENTATION PROGRESS</span>
                  <h3>Where the action plan stands</h3>
                </div>
                <strong>{metrics.total ? Math.round((metrics.completed / metrics.total) * 100) : 0}%</strong>
              </div>
              <ProgressBar value={metrics.total ? (metrics.completed / metrics.total) * 100 : 0} height={12} />
              <div className="progress-legend">
                {statusData.map(([label, value, tone]) => (
                  <div key={label}>
                    <span className={`legend-dot ${tone}`} />
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="panel">
            <SectionHeader
              eyebrow="ACTION SCORE"
              title="Score breakdown"
              subtitle="Calculated dynamically from current demo action data."
            />
            <div className="score-breakdown">
              {[
                ["Completion", metrics.completionScore, 40],
                ["Timeliness", metrics.timelinessScore, 25],
                ["Critical Actions", metrics.criticalScore, 20],
                ["Documentation", metrics.documentationScore, 15]
              ].map(([label, value, max]) => (
                <div className="breakdown-row" key={label}>
                  <div className="breakdown-head">
                    <span>{label}</span>
                    <strong>{value}/{max}</strong>
                  </div>
                  <ProgressBar value={(value / max) * 100} />
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <SectionHeader
              eyebrow="PRIORITY DISTRIBUTION"
              title="Where attention is concentrated"
            />
            <div className="mini-bars">
              {priorityData.map(([label, value]) => (
                <MiniBar
                  key={label}
                  label={label}
                  value={value}
                  total={metrics.total}
                  tone={label.toLowerCase()}
                />
              ))}
            </div>
          </div>

          <div className="panel">
            <SectionHeader
              eyebrow="BUDGET"
              title="Implementation cost"
              subtitle="Organisation-provided estimates where available."
            />
            <div className="budget-summary">
              <div>
                <span>Estimated Implementation Cost</span>
                <strong>{formatCurrency(metrics.estimatedCost)}</strong>
              </div>
              <div>
                <span>Budget Approved / Funded</span>
                <strong>{formatCurrency(metrics.budgetApproved)}</strong>
              </div>
              <div>
                <span>Pending Approval</span>
                <strong>{formatCurrency(metrics.pendingBudget)}</strong>
              </div>
            </div>
            <div className="small-disclaimer">
              <Icon name="info" size={15} />
              Estimates are organisation-provided and may change during implementation.
            </div>
          </div>

          <div className="panel">
            <SectionHeader
              eyebrow="ACCOUNTABILITY"
              title="Escalation chain"
            />
            <div className="accountability-chain">
              {[
                ["Action Owner", "users"],
                ["Department Head", "building"],
                ["Accessibility / Compliance Nodal Officer", "shield"],
                ["Senior Leadership", "trend"],
                ["Competent Authority where applicable", "flag"]
              ].map(([text, icon], i) => (
                <React.Fragment key={text}>
                  <div className="chain-node">
                    <Icon name={icon} size={17} />
                    <span>{text}</span>
                  </div>
                  {i < 4 && <div className="chain-arrow">↓</div>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <section className="section compact">
          <SectionHeader
            eyebrow="EXECUTIVE ACCESSIBILITY ACTION COMMITMENT"
            title="Leadership commitment"
            subtitle="A prototype management commitment — not legal certification."
            action={
              commitment.approved ? (
                <Badge tone="success">Action Plan Approved</Badge>
              ) : (
                <Badge tone="warning">Approval Pending</Badge>
              )
            }
          />

          <div className="commitment-card">
            <div className="commitment-copy">
              <div className="commitment-mark">
                <Icon name={commitment.approved ? "check" : "target"} size={25} />
              </div>
              <p>
                “The organisation acknowledges the recommendations contained in
                the uploaded accessibility audit and commits to establishing a
                time-bound implementation plan.”
              </p>
              {commitment.approved && (
                <div className="commitment-confirmation">
                  <strong>Senior Owner Assigned</strong>
                  <span>
                    {commitment.officer} • {commitment.designation} •{" "}
                    {formatDate(commitment.date)}
                  </span>
                </div>
              )}
            </div>

            {!commitment.approved && (
              <form className="commitment-form" onSubmit={approveCommitment}>
                <label>
                  Senior Responsible Officer
                  <input
                    value={commitment.officer}
                    onChange={(e) =>
                      setCommitment({ ...commitment, officer: e.target.value })
                    }
                    placeholder="e.g. Chief Administrative Officer"
                  />
                </label>
                <label>
                  Designation
                  <input
                    value={commitment.designation}
                    onChange={(e) =>
                      setCommitment({ ...commitment, designation: e.target.value })
                    }
                    placeholder="Designation"
                  />
                </label>
                <label>
                  Commitment Date
                  <input
                    type="date"
                    value={commitment.date}
                    onChange={(e) =>
                      setCommitment({ ...commitment, date: e.target.value })
                    }
                  />
                </label>
                <button className="button primary" type="submit">
                  Approve Action Plan
                </button>
              </form>
            )}
          </div>
        </section>
      </>
    );
  }

  function renderRisk() {
    const criticalOverdue = actions.filter(
      (a) => a.priority === "Critical" && isOverdue(a)
    ).length;

    const missedDeadlines = actions.filter(
      (a) => isOverdue(a) && a.status !== "Completed"
    ).length;

    const approachingCritical = actions.filter(
      (a) => a.priority === "Critical" && isDueSoon(a)
    ).length;

    return (
      <>
        <SectionHeader
          eyebrow="RISK MONITORING"
          title="Compliance Risk"
          subtitle="A transparent, rules-based indicator of implementation risk — not a legal penalty calculator."
        />

        <div className="risk-hero">
          <div className="risk-main">
            <div className="eyebrow">CURRENT COMPLIANCE RISK</div>
            <div className="risk-value-row">
              <div className={`risk-shield ${getRiskTone(metrics.risk)}`}>
                <Icon name="shield" size={34} />
              </div>
              <div>
                <h1>{metrics.risk}</h1>
                <p>
                  Based on current overdue actions, critical priorities and
                  implementation timing.
                </p>
              </div>
            </div>
          </div>
          <div className="risk-levels">
            {["LOW", "MEDIUM", "HIGH", "CRITICAL"].map((level) => (
              <div
                key={level}
                className={`risk-level ${level === metrics.risk ? "active" : ""}`}
              >
                <span className={`risk-level-dot ${level.toLowerCase()}`} />
                <strong>{level}</strong>
                {level === metrics.risk && <Badge tone={getRiskTone(level)}>Current</Badge>}
              </div>
            ))}
          </div>
        </div>

        <div className="risk-grid">
          <div className="panel">
            <SectionHeader eyebrow="WHY IS THIS RISK LEVEL?" title="Current risk drivers" />
            <div className="risk-reasons">
              <div className={`risk-reason ${criticalOverdue ? "active" : ""}`}>
                <Icon name="alert" />
                <div>
                  <strong>{criticalOverdue} critical actions overdue</strong>
                  <span>Critical actions receive higher management attention.</span>
                </div>
              </div>
              <div className={`risk-reason ${missedDeadlines ? "active" : ""}`}>
                <Icon name="clock" />
                <div>
                  <strong>{missedDeadlines} deadlines missed</strong>
                  <span>Overdue implementation increases management risk.</span>
                </div>
              </div>
              <div className={`risk-reason ${metrics.pendingBudget ? "active" : ""}`}>
                <Icon name="rupee" />
                <div>
                  <strong>{formatCurrency(metrics.pendingBudget)} budget pending</strong>
                  <span>Pending funding may delay implementation.</span>
                </div>
              </div>
              <div className={`risk-reason ${approachingCritical ? "active" : ""}`}>
                <Icon name="flag" />
                <div>
                  <strong>{approachingCritical} critical action{approachingCritical === 1 ? "" : "s"} approaching deadline</strong>
                  <span>Early intervention can reduce escalation risk.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <SectionHeader eyebrow="RISK LOGIC" title="Transparent rules" />
            <div className="risk-rules">
              <div><Badge tone="success">LOW</Badge><span>No critical overdue actions and strong implementation progress.</span></div>
              <div><Badge tone="medium">MEDIUM</Badge><span>Some overdue actions or deadlines approaching.</span></div>
              <div><Badge tone="high">HIGH</Badge><span>At least one critical action overdue or multiple overdue actions.</span></div>
              <div><Badge tone="critical">CRITICAL</Badge><span>Multiple critical actions overdue or severe repeated delays.</span></div>
            </div>
          </div>
        </div>

        <div className="regulatory-panel">
          <div className="regulatory-icon"><Icon name="shield" size={25} /></div>
          <div>
            <div className="eyebrow">POTENTIAL REGULATORY EXPOSURE</div>
            <h3>Persistent non-compliance may have consequences.</h3>
            <p>
              Persistent non-compliance may result in regulatory action depending
              on the applicable legal framework, nature of the establishment and
              competent authority.
            </p>
            <div className="consequence-list">
              <span>Regulatory notice</span>
              <span>Corrective direction</span>
              <span>Escalation to competent authority</span>
              <span>Applicable monetary penalty</span>
              <span>Other legal consequences where provided by law</span>
            </div>
            <div className="legal-disclaimer">
              InclusiveX does not determine or impose legal penalties. Enforcement
              remains with the competent authority under applicable law.
            </div>
          </div>
        </div>
      </>
    );
  }

  function renderEscalations() {
    const escalated = actions.filter((a) => a.escalationLevel !== "None");
    const overdueActions = actions.filter(isOverdue);
    const criticalEscalations = escalated.filter((a) => a.priority === "Critical");
    const highEscalations = escalated.filter((a) => a.priority === "High");

    return (
      <>
        <SectionHeader
          eyebrow="ACCOUNTABILITY"
          title="Escalations"
          subtitle="Move delayed actions to the next management level."
          action={<Badge tone="warning">{escalated.length} active escalations</Badge>}
        />

        <div className="escalation-summary">
          <div><span>Critical Escalations</span><strong>{criticalEscalations.length}</strong></div>
          <div><span>High Priority Escalations</span><strong>{highEscalations.length}</strong></div>
          <div><span>Resolved Escalations</span><strong>{actions.filter((a) => a.status === "Completed" && a.escalationLevel !== "None").length}</strong></div>
        </div>

        <div className="panel">
          <div className="panel-title-row">
            <div>
              <span className="eyebrow">ESCALATION QUEUE</span>
              <h3>Actions requiring attention</h3>
            </div>
          </div>

          {overdueActions.length ? (
            <div className="escalation-list">
              {overdueActions.map((action) => (
                <div className="escalation-row" key={action.id}>
                  <div className="escalation-id">{action.id}</div>
                  <div className="escalation-main">
                    <strong>{action.recommendation}</strong>
                    <span>
                      {Math.abs(daysBetween(DEMO_TODAY, action.deadline))} day
                      {Math.abs(daysBetween(DEMO_TODAY, action.deadline)) === 1 ? "" : "s"} overdue
                    </span>
                  </div>
                  <Badge tone={getPriorityTone(action.priority)}>{action.priority}</Badge>
                  <div className="escalation-stage">
                    <span>Current escalation</span>
                    <strong>{action.escalationLevel}</strong>
                  </div>
                  <button className="button secondary small" onClick={() => escalateAction(action)}>
                    {action.escalationLevel === "None"
                      ? "Escalate"
                      : action.escalationLevel === "Department"
                        ? "Escalate to Nodal Officer"
                        : action.escalationLevel === "Nodal Officer"
                          ? "Escalate to Leadership"
                          : "Review Escalation"}
                  </button>
                  <button className="icon-button" onClick={() => openAction(action)} aria-label={`Open ${action.id}`}>
                    <Icon name="arrow" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon="check"
              title="No overdue actions"
              text="No current actions require escalation."
            />
          )}
        </div>

        <div className="escalation-footer-note">
          <Icon name="info" size={17} />
          <span>
            InclusiveX can recommend and record escalation. Legal enforcement,
            where applicable, remains with the competent authority.
          </span>
        </div>
      </>
    );
  }

  function renderPublicTransparency() {
    const publicActions =
      selectedPublicOrg.name === "Jamshedpur Government Institution"
        ? actions
        : initialActions.slice(0, selectedPublicOrg.name === "ABC Public Hospital" ? 19 : 23);

    const publicMetrics = calculateMetrics(publicActions);
    const publicCompleted = publicMetrics.completed;
    const publicInProgress = publicMetrics.inProgress;
    const publicOverdue = publicMetrics.overdue;
    const publicProgress = publicMetrics.total
      ? Math.round((publicCompleted / publicMetrics.total) * 100)
      : 0;

    return (
      <>
        <SectionHeader
          eyebrow="PUBLIC VIEW"
          title="Public Transparency"
          subtitle="A limited public view of implementation progress — without private operational details."
        />

        <div className="public-search-panel">
          <div className="search-box large">
            <Icon name="search" />
            <input
              aria-label="Search organisations"
              placeholder="Search organisation..."
              value={publicSearch}
              onChange={(e) => setPublicSearch(e.target.value)}
            />
          </div>
          <div className="public-results">
            {publicResults.map((org) => (
              <button
                key={org.name}
                className={`org-result ${selectedPublicOrg.name === org.name ? "active" : ""}`}
                onClick={() => setSelectedPublicOrg(org)}
              >
                <Icon name="building" size={18} />
                <span>
                  <strong>{org.name}</strong>
                  <small>{org.location}</small>
                </span>
                <Icon name="arrow" size={16} />
              </button>
            ))}
            {!publicResults.length && <span className="muted">No organisations found.</span>}
          </div>
        </div>

        <div className="public-hero">
          <div>
            <div className="eyebrow">PUBLIC IMPLEMENTATION PROFILE</div>
            <h2>{selectedPublicOrg.name}</h2>
            <p>{selectedPublicOrg.location}</p>
          </div>
          <ActionScore score={publicMetrics.actionScore} size={135} />
        </div>

        <div className="public-stats">
          <div><strong>{publicMetrics.actionScore}/100</strong><span>Action Score</span></div>
          <div><strong>{publicCompleted}</strong><span>Completed</span></div>
          <div><strong>{publicInProgress}</strong><span>In Progress</span></div>
          <div><strong>{publicOverdue}</strong><span>Overdue</span></div>
        </div>

        <div className="panel public-progress-panel">
          <div className="panel-title-row">
            <div>
              <span className="eyebrow">IMPLEMENTATION PROGRESS</span>
              <h3>Current public progress</h3>
            </div>
            <strong>{publicProgress}% completed</strong>
          </div>
          <ProgressBar value={publicProgress} height={14} />
          <div className="public-progress-meta">
            <span>Last Updated: <strong>28 Aug 2026</strong></span>
            <span>Public view excludes confidential comments, private documents, personal information and sensitive budget details.</span>
          </div>
        </div>

        <div className="public-disclaimer">
          <Icon name="info" size={18} />
          <p>
            Action Score reflects implementation progress against recommendations
            contained in the organisation's uploaded accessibility audit. It is
            not an independent accessibility certification.
          </p>
        </div>
      </>
    );
  }

  function renderPolicyFramework() {
    return (
      <>
        <SectionHeader
          eyebrow="PROPOSED POLICY"
          title="Make Accessibility Implementation Accountable"
          subtitle="A proposed policy and enforcement framework for discussion — not existing law."
        />

        <div className="policy-flow">
          {[
            "AUDIT REPORT",
            "MANDATORY ACTION PLAN",
            "LEADERSHIP OWNERSHIP",
            "BUDGET + RESPONSIBILITY",
            "TIME-BOUND IMPLEMENTATION",
            "PERIODIC REPORTING",
            "ESCALATION",
            "COMPETENT AUTHORITY"
          ].map((item, i) => (
            <React.Fragment key={item}>
              <div className="policy-step">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </div>
              {i < 7 && <div className="policy-arrow">↓</div>}
            </React.Fragment>
          ))}
        </div>

        <div className="policy-grid">
          {[
            "Applicable organisations should maintain a time-bound implementation plan for relevant accessibility audit findings.",
            "Senior leadership should have formal responsibility for approving and monitoring implementation.",
            "Each recommendation should have an owner and target date.",
            "Material budget requirements should be recorded.",
            "Implementation status should be periodically reported.",
            "Repeated overdue actions should trigger escalation.",
            "Persistent non-compliance may be referred to the competent authority under applicable law.",
            "Requirements should be proportionate to organisation size, building type and risk."
          ].map((text, i) => (
            <div className="policy-card" key={i}>
              <span>{i + 1}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <section className="section compact">
          <SectionHeader
            eyebrow="GOVERNMENT ADOPTION"
            title="A digital tracking layer — not a government authority."
          />

          <div className="government-flow">
            {[
              ["Government / Competent Authority", "shield"],
              ["Policy / Compliance Framework", "document"],
              ["InclusiveX Digital Tracking Layer", "target"],
              ["Organisations", "building"],
              ["Audit → Action → Tracking", "checklist"],
              ["Reporting / Escalation", "flag"]
            ].map(([label, icon], i) => (
              <React.Fragment key={label}>
                <div className="gov-node">
                  <Icon name={icon} size={22} />
                  <strong>{label}</strong>
                </div>
                {i < 5 && <div className="gov-arrow">→</div>}
              </React.Fragment>
            ))}
          </div>

          <div className="notice-card">
            <div className="notice-icon"><Icon name="info" /></div>
            <div>
              <strong>Important distinction</strong>
              <p>
                InclusiveX is not the government. It could be adopted or
                integrated into a government-backed framework, while legal
                authority remains with the relevant competent authority.
              </p>
            </div>
          </div>
        </section>

        <section className="section compact">
          <SectionHeader
            eyebrow="PROPORTIONATE MODEL"
            title="Public and private buildings."
            subtitle="The framework can be adapted according to organisation size, building type and risk."
          />
          <div className="building-grid">
            {[
              ["Government buildings", "Public services and administrative institutions"],
              ["Hospitals", "Healthcare facilities and patient-facing services"],
              ["Schools & universities", "Educational institutions and campuses"],
              ["Offices", "Workplaces and employee-facing facilities"],
              ["Malls & hotels", "Public-facing commercial environments"],
              ["Private institutions", "Other organisations serving the public"]
            ].map(([title, text]) => (
              <div className="building-card" key={title}>
                <Icon name="building" size={21} />
                <div><strong>{title}</strong><span>{text}</span></div>
              </div>
            ))}
          </div>
        </section>

        <section className="section compact">
          <SectionHeader
            eyebrow="90-DAY PILOT"
            title="Jamshedpur pilot plan"
            subtitle="A practical path from concept to measurable implementation behaviour."
          />
          <div className="pilot-grid">
            <div className="pilot-phase">
              <div className="phase-number">01</div>
              <Badge tone="info">Days 1–30</Badge>
              <h3>Build the action baseline</h3>
              <ul>
                <li>Collect existing audit reports</li>
                <li>Upload reports</li>
                <li>Digitise recommendations</li>
                <li>Assign owners</li>
              </ul>
            </div>
            <div className="pilot-phase">
              <div className="phase-number">02</div>
              <Badge tone="medium">Days 31–60</Badge>
              <h3>Start implementation</h3>
              <ul>
                <li>Establish deadlines</li>
                <li>Record budget requirements</li>
                <li>Begin implementation</li>
                <li>Leadership monitoring</li>
              </ul>
            </div>
            <div className="pilot-phase">
              <div className="phase-number">03</div>
              <Badge tone="success">Days 61–90</Badge>
              <h3>Measure behaviour</h3>
              <ul>
                <li>Track progress</li>
                <li>Escalate overdue actions</li>
                <li>Measure Action Score</li>
                <li>Evaluate implementation behaviour</li>
              </ul>
            </div>
          </div>

          <div className="pilot-kpis">
            {[
              "% recommendations with assigned owner",
              "% recommendations with deadlines",
              "% actions initiated",
              "% actions completed",
              "% overdue actions",
              "Average time from audit recommendation to action initiation"
            ].map((kpi) => <span key={kpi}>{kpi}</span>)}
          </div>
        </section>

        <section className="section compact">
          <SectionHeader
            eyebrow="POTENTIAL BUSINESS MODEL"
            title="A sustainable implementation platform."
          />
          <div className="business-grid">
            <div className="business-card">
              <h3>Potential customers</h3>
              <ul>
                <li>Large companies</li>
                <li>Hospitals</li>
                <li>Educational institutions</li>
                <li>Facility operators</li>
                <li>Government programmes</li>
                <li>Public institutions</li>
              </ul>
            </div>
            <div className="business-card">
              <h3>Possible revenue</h3>
              <ul>
                <li>Enterprise software</li>
                <li>Organisation dashboard</li>
                <li>Implementation management</li>
                <li>Analytics and reporting</li>
              </ul>
            </div>
            <div className="business-callout">
              <Icon name="lock" size={22} />
              <strong>What InclusiveX does not sell</strong>
              <p>
                Legal compliance certification or government certification.
                InclusiveX remains an implementation tracking layer.
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  function renderSettings() {
    return (
      <>
        <SectionHeader
          eyebrow="SYSTEM"
          title="Settings"
          subtitle="Manage prototype organisation data, role and browser-saved demo state."
        />

        <div className="settings-grid">
          <div className="panel">
            <div className="panel-title-row">
              <div>
                <span className="eyebrow">ORGANISATION PROFILE</span>
                <h3>Demo organisation</h3>
              </div>
              <Icon name="building" />
            </div>
            <div className="form-grid">
              <label>
                Organisation
                <input
                  value={organisation.name}
                  onChange={(e) => setOrganisation({ ...organisation, name: e.target.value })}
                />
              </label>
              <label>
                Location
                <input
                  value={organisation.location}
                  onChange={(e) => setOrganisation({ ...organisation, location: e.target.value })}
                />
              </label>
              <label>
                Audit Date
                <input
                  type="date"
                  value={organisation.auditDate}
                  onChange={(e) => setOrganisation({ ...organisation, auditDate: e.target.value })}
                />
              </label>
              <label>
                Report Reference
                <input
                  value={organisation.reference}
                  onChange={(e) => setOrganisation({ ...organisation, reference: e.target.value })}
                />
              </label>
            </div>
          </div>

          <div className="panel">
            <div className="panel-title-row">
              <div>
                <span className="eyebrow">NOTIFICATION PREFERENCES</span>
                <h3>Demo alerts</h3>
              </div>
              <Icon name="bell" />
            </div>
            <div className="settings-options">
              {[
                ["Deadline approaching", "Show alerts up to 7 days before a deadline."],
                ["Overdue actions", "Show overdue implementation alerts."],
                ["Evidence submissions", "Show submitted evidence notifications."],
                ["Leadership approval", "Show pending commitment alerts."]
              ].map(([title, text]) => (
                <label className="toggle-row" key={title}>
                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                  <input type="checkbox" defaultChecked />
                </label>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-title-row">
              <div>
                <span className="eyebrow">CURRENT DEMO ROLE</span>
                <h3>Role preview</h3>
              </div>
              <Icon name="users" />
            </div>
            <div className="role-settings">
              {["Leadership", "Action Owner", "Public"].map((item) => (
                <button
                  key={item}
                  className={`role-setting ${role === item ? "active" : ""}`}
                  onClick={() => setRole(item)}
                >
                  <strong>{item}</strong>
                  <span>
                    {item === "Leadership"
                      ? "Management, risk, budget and escalation"
                      : item === "Action Owner"
                        ? "Assigned actions, progress and evidence"
                        : "Public implementation transparency"}
                  </span>
                  {role === item && <Icon name="check" size={17} />}
                </button>
              ))}
            </div>
          </div>

          <div className="panel danger-panel">
            <div className="panel-title-row">
              <div>
                <span className="eyebrow">DEMO DATA</span>
                <h3>Reset prototype state</h3>
              </div>
              <Icon name="refresh" />
            </div>
            <p>
              Reset all action statuses, uploaded file metadata, role settings
              and leadership commitment to the original demonstration state.
            </p>
            <div className="button-row">
              <button className="button danger" onClick={resetDemo}>
                <Icon name="refresh" size={17} />
                Reset Demo Data
              </button>
              <button className="button secondary" onClick={clearLocalData}>
                Clear Local Data
              </button>
            </div>
            <div className="storage-note">
              <Icon name="lock" size={15} />
              Changes are stored only in this browser using localStorage.
            </div>
          </div>
        </div>
      </>
    );
  }

  function renderPage() {
    switch (activePage) {
      case "Overview":
        return renderOverview();
      case "Audit Reports":
        return renderAuditReports();
      case "Action Plan":
        return renderActionPlan();
      case "Leadership Dashboard":
        return renderLeadershipDashboard();
      case "Compliance Risk":
        return renderRisk();
      case "Escalations":
        return renderEscalations();
      case "Public Transparency":
        return renderPublicTransparency();
      case "Policy Framework":
        return renderPolicyFramework();
      case "Settings":
        return renderSettings();
      default:
        return renderOverview();
    }
  }

  return (
    <div className="app-shell">
      <style>{styles}</style>

      <aside className={`sidebar ${mobileMenu ? "mobile-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">X</div>
          <div>
            <strong>InclusiveX</strong>
            <span>From Audit to Action.</span>
          </div>
        </div>

        <div className="sidebar-label">WORKSPACE</div>

        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${activePage === item.name ? "active" : ""}`}
              onClick={() => navigate(item.name)}
            >
              <Icon name={item.icon} size={19} />
              <span>{item.name}</span>
              {item.name === "Escalations" && metrics.overdue > 0 && (
                <b className="nav-count">{metrics.overdue}</b>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-boundary">
            <Icon name="shield" size={17} />
            <div>
              <strong>Accountability layer</strong>
              <span>Not an audit or certification authority.</span>
            </div>
          </div>
          <div className="sidebar-user">
            <div className="avatar">{role === "Leadership" ? "L" : role === "Action Owner" ? "A" : "P"}</div>
            <div>
              <strong>{role}</strong>
              <span>Prototype Role Preview</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="main-shell">
        <header className="topbar">
          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle navigation menu"
          >
            <Icon name="menu" />
          </button>

          <div className="breadcrumb">
            <span>InclusiveX</span>
            <Icon name="arrow" size={13} />
            <strong>{activePage}</strong>
          </div>

          <div className="topbar-actions">
            <div className="role-switcher" aria-label="Prototype role preview">
              {["Leadership", "Action Owner", "Public"].map((item) => (
                <button
                  key={item}
                  className={role === item ? "active" : ""}
                  onClick={() => {
                    setRole(item);
                    const defaultPage =
                      item === "Leadership"
                        ? "Leadership Dashboard"
                        : item === "Action Owner"
                          ? "Action Plan"
                          : "Public Transparency";
                    navigate(defaultPage);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="notification-wrap">
              <button
                className="icon-button notification-button"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label={`Notifications, ${notifications.length} available`}
                aria-expanded={showNotifications}
              >
                <Icon name="bell" size={20} />
                {notifications.length > 0 && <span className="notification-dot">{notifications.length}</span>}
              </button>

              {showNotifications && (
                <div className="notification-panel">
                  <div className="notification-header">
                    <div>
                      <strong>Notifications</strong>
                      <span>Generated from current demo data</span>
                    </div>
                    <Badge tone={notifications.length ? "warning" : "success"}>
                      {notifications.length}
                    </Badge>
                  </div>
                  <div className="notification-list">
                    {notifications.length ? (
                      notifications.map((notification) => (
                        <div className="notification-item" key={notification.id}>
                          <div className="notification-item-icon">
                            <Icon
                              name={notification.id.startsWith("due") ? "clock" : notification.id === "approval" ? "users" : "alert"}
                              size={16}
                            />
                          </div>
                          <div>
                            <strong>{notification.title}</strong>
                            <span>{notification.message}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="notification-empty">
                        <Icon name="check" />
                        <span>No new notifications.</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="header-org">
              <div className="header-org-icon"><Icon name="building" size={17} /></div>
              <div>
                <strong>{organisation.name}</strong>
                <span>{organisation.location}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="content">
          <div className="content-width">{renderPage()}</div>
        </main>

        <footer className="footer">
          <div>
            <strong>InclusiveX</strong>
            <span>From Audit to Action.</span>
          </div>
          <p>
            InclusiveX is a prototype concept for accessibility implementation
            tracking. It does not conduct accessibility audits, provide legal
            certification, or impose regulatory penalties.
          </p>
        </footer>
      </div>

      {selectedAction && modalMode === "detail" && (
        <Modal title={`Action Detail • ${selectedAction.id}`} onClose={closeModal} width={860}>
          <div className="action-detail">
            <div className="action-detail-head">
              <div>
                <div className="eyebrow">AUDIT RECOMMENDATION</div>
                <h2>{selectedAction.recommendation}</h2>
                <div className="detail-meta">
                  <span>{selectedAction.id}</span>
                  <Badge tone={getPriorityTone(selectedAction.priority)}>
                    {selectedAction.priority}
                  </Badge>
                  <Badge tone={getStatusTone(selectedAction.status)}>
                    {selectedAction.status}
                  </Badge>
                  {isOverdue(selectedAction) && <Badge tone="critical">OVERDUE</Badge>}
                </div>
              </div>
              <div className="detail-score">
                <strong>{selectedAction.progress}%</strong>
                <span>progress</span>
              </div>
            </div>

            <div className="source-strip">
              <Icon name="file" size={17} />
              <span>
                Source: <strong>Accessibility Audit Report</strong> • Audit
                reference {organisation.reference}
              </span>
            </div>

            <div className="action-tracker">
              {[
                ["Audit Finding", true],
                ["Action Assigned", true],
                ["Plan & Budget", selectedAction.status !== "Pending"],
                ["Implementation", selectedAction.progress > 0],
                ["Evidence Submitted", selectedAction.evidenceSubmitted],
                ["Closed / Escalated", selectedAction.status === "Completed" || selectedAction.status === "Escalated"]
              ].map(([label, complete], index) => (
                <div className={`tracker-step ${complete ? "complete" : index === 3 ? "current" : ""}`} key={label}>
                  <div className="tracker-circle">
                    {complete ? <Icon name="check" size={14} /> : <span>{index + 1}</span>}
                  </div>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="detail-grid">
              <div className="detail-card">
                <span>Responsible Department</span>
                <strong>{selectedAction.department}</strong>
              </div>
              <div className="detail-card">
                <span>Action Owner</span>
                <strong>{selectedAction.owner}</strong>
              </div>
              <div className="detail-card">
                <span>Deadline</span>
                <strong>{formatDate(selectedAction.deadline)}</strong>
                <small>{getDeadlineLabel(selectedAction)}</small>
              </div>
              <div className="detail-card">
                <span>Estimated Cost</span>
                <strong>{formatCurrency(selectedAction.estimatedCost)}</strong>
                <small>{selectedAction.estimatedCost ? "Organisation-provided estimate" : "No estimate provided"}</small>
              </div>
              <div className="detail-card">
                <span>Budget Status</span>
                <strong>{selectedAction.budgetStatus}</strong>
              </div>
              <div className="detail-card">
                <span>Escalation Level</span>
                <strong>{selectedAction.escalationLevel}</strong>
              </div>
            </div>

            <div className="detail-section">
              <div className="panel-title-row">
                <div>
                  <span className="eyebrow">CURRENT STATUS</span>
                  <h3>Update implementation</h3>
                </div>
              </div>

              <div className="form-grid">
                <label>
                  Action Owner
                  <input
                    value={actionForm.owner}
                    onChange={(e) => setActionForm({ ...actionForm, owner: e.target.value })}
                  />
                </label>
                <label>
                  Deadline
                  <input
                    type="date"
                    value={actionForm.deadline}
                    onChange={(e) => setActionForm({ ...actionForm, deadline: e.target.value })}
                  />
                </label>
                <label>
                  Estimated Cost
                  <input
                    type="number"
                    min="0"
                    value={actionForm.budget}
                    onChange={(e) => setActionForm({ ...actionForm, budget: e.target.value })}
                    placeholder="Optional"
                  />
                </label>
                <label>
                  Budget Status
                  <select
                    value={actionForm.budgetStatus}
                    onChange={(e) => setActionForm({ ...actionForm, budgetStatus: e.target.value })}
                  >
                    {[
                      "Not Estimated",
                      "Estimate Available",
                      "Pending Approval",
                      "Approved",
                      "Partially Approved",
                      "Funded",
                      "Not Required"
                    ].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </label>
                <label>
                  Current Status
                  <select
                    value={actionForm.status}
                    onChange={(e) => setActionForm({ ...actionForm, status: e.target.value })}
                  >
                    {["Pending", "Assigned", "In Progress", "Blocked", "Evidence Submitted", "Completed", "Escalated"].map(
                      (s) => <option key={s}>{s}</option>
                    )}
                  </select>
                </label>
                <label>
                  Progress %
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={actionForm.progress}
                    onChange={(e) => setActionForm({ ...actionForm, progress: e.target.value })}
                  />
                </label>
                <label className="full">
                  Comments
                  <textarea
                    value={actionForm.comments}
                    onChange={(e) => setActionForm({ ...actionForm, comments: e.target.value })}
                    rows="3"
                    placeholder="Internal implementation note..."
                  />
                </label>
              </div>
            </div>

            <div className="evidence-card">
              <div>
                <span className="eyebrow">EVIDENCE</span>
                <h3>
                  {selectedAction.evidenceSubmitted
                    ? "Evidence Submitted"
                    : "No evidence submitted yet"}
                </h3>
                <p>
                  {selectedAction.evidenceSubmitted
                    ? "Evidence submitted by organisation. Pending review by authorised reviewer."
                    : "Submit implementation evidence for authorised review."}
                </p>
              </div>
              <button
                className="button secondary"
                onClick={() => setModalMode("evidence")}
              >
                <Icon name="upload" size={17} />
                Submit Evidence
              </button>
            </div>

            <div className="modal-actions">
              <button className="button secondary" onClick={() => {
                setModalMode("detail");
                showToast("Owner update", "Use the Action Owner field above and save changes.");
              }}>
                Change Owner
              </button>
              <button className="button secondary" onClick={() => {
                setModalMode("detail");
                showToast("Deadline update", "Use the Deadline field above and save changes.");
              }}>
                Update Deadline
              </button>
              <button className="button secondary" onClick={() => {
                setModalMode("detail");
                showToast("Budget update", "Use the budget fields above and save changes.");
              }}>
                Update Budget
              </button>
              <button className="button warning" onClick={() => {
                escalateAction(selectedAction);
                closeModal();
              }}>
                <Icon name="flag" size={17} />
                Escalate
              </button>
              <button className="button primary" onClick={saveActionForm}>
                Update Status
              </button>
            </div>
          </div>
        </Modal>
      )}

      {selectedAction && modalMode === "evidence" && (
        <Modal title={`Submit Evidence • ${selectedAction.id}`} onClose={() => setModalMode("detail")} width={620}>
          <div className="evidence-form">
            <div className="evidence-note">
              <Icon name="info" size={18} />
              <span>
                Evidence is recorded as submitted by the organisation. InclusiveX
                does not independently verify physical evidence.
              </span>
            </div>

            <label>
              Evidence Type
              <select
                value={evidenceForm.type}
                onChange={(e) => setEvidenceForm({ ...evidenceForm, type: e.target.value })}
              >
                <option>Photo</option>
                <option>Document</option>
                <option>Work Order</option>
                <option>Invoice</option>
                <option>Implementation Note</option>
              </select>
            </label>

            <label>
              File Name
              <input
                value={evidenceForm.fileName}
                onChange={(e) => setEvidenceForm({ ...evidenceForm, fileName: e.target.value })}
                placeholder="e.g. entrance-ramp-work-order.pdf"
              />
            </label>

            <label>
              Implementation Note
              <textarea
                rows="4"
                value={evidenceForm.note}
                onChange={(e) => setEvidenceForm({ ...evidenceForm, note: e.target.value })}
                placeholder="Optional context for the authorised reviewer..."
              />
            </label>

            <div className="evidence-status-preview">
              <span className="status-check"><Icon name="check" size={15} /></span>
              <div>
                <strong>Evidence Submitted</strong>
                <span>Pending review by authorised reviewer.</span>
              </div>
            </div>

            <div className="modal-actions">
              <button className="button secondary" onClick={() => setModalMode("detail")}>
                Cancel
              </button>
              <button className="button primary" onClick={submitEvidence}>
                Submit Evidence
              </button>
            </div>
          </div>
        </Modal>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

:root {
  --bg: #f5f7f9;
  --surface: #ffffff;
  --surface-2: #f8fafb;
  --text: #17212b;
  --muted: #65727e;
  --subtle: #8a96a1;
  --border: #dce3e8;
  --border-strong: #cbd5dc;
  --accent: #176b66;
  --accent-dark: #0e514e;
  --accent-soft: #e8f5f2;
  --blue: #2d67a7;
  --blue-soft: #eaf2fb;
  --green: #23794d;
  --green-soft: #eaf7ef;
  --amber: #a5680b;
  --amber-soft: #fff5df;
  --red: #b63c3c;
  --red-soft: #fdeeee;
  --purple: #7047a8;
  --purple-soft: #f3edfb;
  --shadow: 0 10px 28px rgba(18, 35, 47, .06);
  --shadow-lg: 0 22px 55px rgba(18, 35, 47, .14);
  --radius: 14px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: "DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 14px;
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
[tabindex="0"]:focus-visible {
  outline: 3px solid rgba(45, 103, 167, .28);
  outline-offset: 2px;
}

.app-shell {
  min-height: 100vh;
  display: flex;
}

.sidebar {
  width: 260px;
  flex: 0 0 260px;
  background: #102d31;
  color: #e8f1f0;
  min-height: 100vh;
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 22px 14px 16px;
  z-index: 50;
}

.brand {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 3px 9px 25px;
}

.brand-mark {
  width: 37px;
  height: 37px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: #e8f5f2;
  color: #123d3c;
  font-family: "Space Grotesk", sans-serif;
  font-weight: 700;
  font-size: 18px;
}

.brand strong {
  display: block;
  font-family: "Space Grotesk", sans-serif;
  font-size: 17px;
  letter-spacing: -.2px;
}

.brand span {
  display: block;
  color: #9fb3b5;
  font-size: 10px;
  margin-top: 2px;
}

.sidebar-label {
  padding: 0 11px 8px;
  color: #789093;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.3px;
}

.sidebar nav {
  display: grid;
  gap: 3px;
}

.nav-item {
  width: 100%;
  border: 0;
  color: #a9bcbd;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 10px 11px;
  border-radius: 9px;
  text-align: left;
  font-size: 13px;
  transition: .16s ease;
}

.nav-item:hover {
  background: rgba(255,255,255,.06);
  color: white;
}

.nav-item.active {
  background: #1b4c4e;
  color: white;
  box-shadow: inset 3px 0 0 #71bdb1;
}

.nav-count {
  margin-left: auto;
  min-width: 22px;
  height: 20px;
  padding: 0 6px;
  display: grid;
  place-items: center;
  background: #b63c3c;
  color: white;
  border-radius: 99px;
  font-size: 10px;
}

.sidebar-bottom {
  margin-top: auto;
}

.sidebar-boundary {
  border: 1px solid rgba(255,255,255,.09);
  background: rgba(255,255,255,.035);
  border-radius: 11px;
  padding: 11px;
  display: flex;
  gap: 9px;
  margin: 12px 4px;
}

.sidebar-boundary > svg {
  color: #71bdb1;
  flex: 0 0 auto;
}

.sidebar-boundary strong,
.sidebar-boundary span {
  display: block;
}

.sidebar-boundary strong {
  font-size: 11px;
}

.sidebar-boundary span {
  font-size: 10px;
  color: #91a7a8;
  line-height: 1.4;
  margin-top: 2px;
}

.sidebar-user {
  border-top: 1px solid rgba(255,255,255,.08);
  padding: 14px 5px 0;
  display: flex;
  align-items: center;
  gap: 9px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  background: #276365;
  color: white;
  font-weight: 700;
}

.sidebar-user strong,
.sidebar-user span {
  display: block;
}

.sidebar-user strong {
  font-size: 11px;
}

.sidebar-user span {
  font-size: 9px;
  color: #91a7a8;
  margin-top: 2px;
}

.main-shell {
  min-width: 0;
  flex: 1;
}

.topbar {
  height: 66px;
  background: rgba(255,255,255,.94);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 27px;
  position: sticky;
  top: 0;
  z-index: 40;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--subtle);
  font-size: 12px;
}

.breadcrumb strong {
  color: var(--text);
  font-weight: 600;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 13px;
}

.role-switcher {
  display: flex;
  padding: 3px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  border-radius: 9px;
}

.role-switcher button {
  border: 0;
  background: transparent;
  color: var(--muted);
  padding: 6px 10px;
  border-radius: 7px;
  font-size: 11px;
}

.role-switcher button.active {
  color: var(--accent-dark);
  background: white;
  box-shadow: 0 1px 5px rgba(0,0,0,.07);
  font-weight: 700;
}

.icon-button {
  width: 36px;
  height: 36px;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 9px;
  color: var(--muted);
  display: inline-grid;
  place-items: center;
}

.icon-button:hover {
  background: var(--surface-2);
  color: var(--text);
  border-color: var(--border);
}

.notification-wrap {
  position: relative;
}

.notification-button {
  position: relative;
}

.notification-dot {
  position: absolute;
  top: -2px;
  right: -2px;
  min-width: 17px;
  height: 17px;
  padding: 0 4px;
  border-radius: 99px;
  background: var(--red);
  color: white;
  border: 2px solid white;
  display: grid;
  place-items: center;
  font-size: 8px;
  font-weight: 700;
}

.notification-panel {
  position: absolute;
  top: 46px;
  right: 0;
  width: 350px;
  background: white;
  border: 1px solid var(--border);
  border-radius: 13px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.notification-header {
  padding: 14px;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-header strong,
.notification-header span {
  display: block;
}

.notification-header strong {
  font-size: 13px;
}

.notification-header span {
  color: var(--muted);
  font-size: 10px;
  margin-top: 2px;
}

.notification-list {
  max-height: 360px;
  overflow-y: auto;
}

.notification-item {
  padding: 12px 14px;
  display: flex;
  gap: 10px;
  border-bottom: 1px solid #eef1f3;
}

.notification-item-icon {
  flex: 0 0 30px;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  color: var(--accent);
  background: var(--accent-soft);
}

.notification-item strong,
.notification-item span {
  display: block;
}

.notification-item strong {
  font-size: 11px;
}

.notification-item span {
  color: var(--muted);
  font-size: 10px;
  line-height: 1.45;
  margin-top: 3px;
}

.notification-empty {
  padding: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--green);
}

.header-org {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 4px;
  max-width: 230px;
}

.header-org-icon {
  width: 31px;
  height: 31px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: var(--accent-soft);
  color: var(--accent);
}

.header-org strong,
.header-org span {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-org strong {
  font-size: 11px;
}

.header-org span {
  color: var(--muted);
  font-size: 9px;
  margin-top: 2px;
}

.mobile-menu-button {
  display: none;
  border: 0;
  background: transparent;
  color: var(--text);
}

.content {
  min-height: calc(100vh - 66px);
  padding: 30px 28px 44px;
}

.content-width {
  max-width: 1480px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 20px;
}

.eyebrow {
  color: var(--accent);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.4px;
  margin-bottom: 6px;
}

.section-header h2 {
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
  font-size: 24px;
  letter-spacing: -.55px;
}

.section-header p {
  margin: 6px 0 0;
  color: var(--muted);
  max-width: 720px;
  line-height: 1.5;
}

.section {
  margin-top: 42px;
}

.section.compact {
  margin-top: 34px;
}

.button {
  border: 1px solid var(--border);
  background: white;
  color: var(--text);
  border-radius: 9px;
  padding: 9px 13px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 700;
  transition: .15s ease;
}

.button:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 14px rgba(18,35,47,.08);
}

.button.primary {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

.button.primary:hover {
  background: var(--accent-dark);
}

.button.secondary:hover {
  border-color: var(--accent);
  color: var(--accent-dark);
}

.button.warning {
  background: var(--amber-soft);
  border-color: #edd49f;
  color: #8b5a0b;
}

.button.danger {
  background: var(--red-soft);
  border-color: #f0caca;
  color: var(--red);
}

.button.small {
  padding: 7px 10px;
  font-size: 10px;
}

.button.wide {
  width: 100%;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.badge {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  border-radius: 99px;
  padding: 4px 7px;
  font-size: 9px;
  line-height: 1;
  font-weight: 800;
  letter-spacing: .2px;
  white-space: nowrap;
}

.badge-neutral { background: #eef1f3; color: #5e6a73; }
.badge-success { background: var(--green-soft); color: var(--green); }
.badge-info { background: var(--blue-soft); color: var(--blue); }
.badge-medium { background: var(--amber-soft); color: var(--amber); }
.badge-high { background: #fff0e7; color: #ad5727; }
.badge-critical { background: var(--red-soft); color: var(--red); }
.badge-purple { background: var(--purple-soft); color: var(--purple); }
.badge-warning { background: var(--amber-soft); color: #98610a; }

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(390px, .75fr);
  gap: 24px;
  min-height: 455px;
  align-items: stretch;
}

.hero-copy {
  background: #102d31;
  color: white;
  border-radius: 18px;
  padding: 47px 48px;
  position: relative;
  overflow: hidden;
}

.hero-copy::after {
  content: "";
  position: absolute;
  width: 290px;
  height: 290px;
  right: -110px;
  bottom: -130px;
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 50%;
}

.hero-kicker {
  color: #8fb7b4;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.kicker-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #74bcb2;
}

.hero h1 {
  margin: 30px 0 18px;
  font-family: "Space Grotesk", sans-serif;
  font-size: clamp(45px, 5.5vw, 75px);
  line-height: .9;
  letter-spacing: -4px;
}

.hero h1 span {
  color: #78c2b8;
}

.hero-subtitle {
  color: #c0d0d1;
  font-size: 15px;
  line-height: 1.6;
  max-width: 580px;
  margin: 0;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 28px;
}

.hero-actions .secondary {
  background: rgba(255,255,255,.08);
  color: white;
  border-color: rgba(255,255,255,.16);
}

.hero-actions .secondary:hover {
  background: rgba(255,255,255,.13);
}

.hero-trust {
  position: absolute;
  left: 48px;
  bottom: 25px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  color: #91a8a9;
  font-size: 10px;
}

.hero-trust span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.hero-trust svg {
  color: #74bcb2;
}

.hero-flow-card {
  background: white;
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 25px;
  box-shadow: var(--shadow);
}

.flow-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--muted);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.2px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--border);
}

.flow-stack {
  padding-top: 9px;
}

.flow-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 57px;
}

.flow-num {
  width: 30px;
  height: 30px;
  border: 1px solid var(--border);
  color: var(--accent);
  display: grid;
  place-items: center;
  border-radius: 8px;
  font-size: 9px;
  font-weight: 800;
  background: var(--surface-2);
  z-index: 2;
}

.flow-item strong,
.flow-item span {
  display: block;
}

.flow-item strong {
  font-size: 11px;
}

.flow-item span {
  color: var(--muted);
  font-size: 9px;
  margin-top: 2px;
}

.flow-line {
  position: absolute;
  left: 14px;
  top: 43px;
  height: 28px;
  border-left: 1px dashed #b7c5c9;
}

.gap-section {
  margin-top: 22px;
  display: grid;
  grid-template-columns: .9fr 1.1fr;
  gap: 20px;
  background: white;
  border: 1px solid var(--border);
  border-radius: 15px;
  padding: 25px;
}

.gap-left h2 {
  font-family: "Space Grotesk", sans-serif;
  font-size: 22px;
  letter-spacing: -.4px;
  margin: 0;
  max-width: 540px;
}

.gap-left p {
  color: var(--muted);
  line-height: 1.5;
  max-width: 520px;
}

.gap-track {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  gap: 7px;
}

.gap-step {
  min-height: 108px;
  border: 1px solid var(--border);
  border-radius: 11px;
  padding: 13px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--surface-2);
}

.gap-step.missing {
  border-color: #e8cccc;
  background: #fffafa;
}

.gap-icon {
  width: 29px;
  height: 29px;
  border-radius: 8px;
  display: grid;
  place-items: center;
}

.gap-step.done .gap-icon {
  color: var(--green);
  background: var(--green-soft);
}

.gap-step.missing .gap-icon {
  color: var(--red);
  background: var(--red-soft);
}

.gap-step > span {
  font-size: 10px;
  line-height: 1.3;
  font-weight: 700;
}

.three-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.feature-card {
  background: white;
  border: 1px solid var(--border);
  border-radius: 13px;
  padding: 22px;
  min-height: 180px;
}

.feature-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: var(--accent-soft);
  color: var(--accent);
  margin-bottom: 18px;
}

.feature-card h3 {
  margin: 0;
  font-size: 14px;
}

.feature-card p {
  margin: 7px 0 0;
  color: var(--muted);
  line-height: 1.55;
  font-size: 12px;
}

.story-banner {
  margin-top: 42px;
  padding: 28px 32px;
  background: #e8f2f0;
  border: 1px solid #d1e3df;
  border-radius: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  align-items: center;
}

.story-banner h2 {
  font-family: "Space Grotesk", sans-serif;
  font-size: 25px;
  margin: 0;
  max-width: 680px;
}

.story-banner p {
  color: var(--accent-dark);
  margin: 8px 0 0;
}

.story-quote {
  border-left: 3px solid var(--accent);
  padding-left: 20px;
}

.story-quote span,
.story-quote strong {
  display: block;
}

.story-quote span {
  color: var(--accent);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
}

.story-quote strong {
  margin-top: 7px;
  font-family: "Space Grotesk", sans-serif;
  font-size: 18px;
  line-height: 1.3;
}

.responsibility-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.responsibility-card {
  border: 1px solid var(--border);
  background: white;
  border-radius: 11px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.responsibility-card > svg {
  color: var(--accent);
}

.responsibility-card h3 {
  margin: 0;
  font-size: 12px;
}

.responsibility-card p {
  margin: 5px 0 0;
  color: var(--muted);
  font-size: 10px;
  line-height: 1.5;
}

.central-message {
  background: #102d31;
  color: white;
  border-radius: 15px;
  padding: 28px;
  display: flex;
  align-items: center;
  gap: 18px;
}

.central-message-icon {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(255,255,255,.08);
  color: #79c1b7;
  flex: 0 0 auto;
}

.central-message .eyebrow {
  color: #79c1b7;
}

.central-message h2 {
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
  font-size: 22px;
}

.central-message p {
  margin: 7px 0 0;
  color: #b7c9ca;
}

.central-message strong {
  color: white;
}

.panel {
  background: white;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 21px;
}

.panel-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 17px;
}

.panel-title-row h3 {
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
  font-size: 16px;
  letter-spacing: -.2px;
}

.panel-title-row > svg {
  color: var(--subtle);
}

.audit-layout {
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  gap: 18px;
}

.upload-panel {
  padding: 17px;
}

.upload-zone {
  min-height: 330px;
  border: 1.5px dashed #b7c7cb;
  background: #f8fbfb;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 30px;
  transition: .15s;
}

.upload-zone:hover {
  border-color: var(--accent);
  background: #f4faf9;
}

.upload-icon {
  width: 62px;
  height: 62px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  color: var(--accent);
  background: var(--accent-soft);
  margin-bottom: 17px;
}

.upload-zone h3 {
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
  font-size: 17px;
}

.upload-zone p {
  color: var(--muted);
  font-size: 11px;
  margin: 7px 0 17px;
}

.uploaded-file {
  margin-top: 13px;
  border: 1px solid #cde2d7;
  background: #f7fcf8;
  border-radius: 10px;
  padding: 11px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.file-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: var(--green-soft);
  color: var(--green);
}

.file-info {
  min-width: 0;
  flex: 1;
}

.file-info strong,
.file-info span {
  display: block;
}

.file-info strong {
  font-size: 11px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-info span {
  color: var(--muted);
  font-size: 9px;
  margin: 2px 0 5px;
}

.helper-note {
  margin-top: 13px;
  display: flex;
  gap: 7px;
  color: var(--muted);
  font-size: 10px;
  line-height: 1.45;
  padding: 10px;
  background: var(--surface-2);
  border-radius: 9px;
}

.helper-note svg {
  flex: 0 0 auto;
  color: var(--blue);
}

.audit-details {
  padding: 23px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 13px;
}

.form-grid label,
.evidence-form > label,
.commitment-form label {
  display: grid;
  gap: 6px;
  color: #4f5c66;
  font-size: 10px;
  font-weight: 700;
}

.form-grid .full {
  grid-column: 1 / -1;
}

input,
select,
textarea {
  width: 100%;
  min-width: 0;
  border: 1px solid var(--border-strong);
  background: white;
  color: var(--text);
  border-radius: 8px;
  padding: 9px 10px;
  font-size: 12px;
  outline: none;
}

textarea {
  resize: vertical;
}

input:hover,
select:hover,
textarea:hover {
  border-color: #aebdc4;
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--accent);
}

input[readonly] {
  background: var(--surface-2);
  color: var(--muted);
}

.audit-record {
  margin: 18px 0;
  padding: 13px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 9px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.audit-record span,
.audit-record strong {
  display: block;
}

.audit-record span {
  color: var(--muted);
  font-size: 9px;
}

.audit-record strong {
  font-size: 11px;
  margin-top: 4px;
}

.notice-card {
  margin-top: 15px;
  border: 1px solid #d8e6eb;
  background: #f5fafc;
  border-radius: 11px;
  padding: 14px;
  display: flex;
  gap: 10px;
}

.notice-icon {
  width: 31px;
  height: 31px;
  flex: 0 0 auto;
  border-radius: 8px;
  background: var(--blue-soft);
  color: var(--blue);
  display: grid;
  place-items: center;
}

.notice-card strong {
  font-size: 11px;
}

.notice-card p {
  margin: 4px 0 0;
  color: var(--muted);
  line-height: 1.5;
  font-size: 10px;
}

.boundary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.boundary-card {
  background: white;
  border: 1px solid var(--border);
  border-radius: 13px;
  padding: 20px;
}

.boundary-card.positive {
  border-top: 3px solid var(--accent);
}

.boundary-card.neutral {
  border-top: 3px solid #9aa8b0;
}

.boundary-card h3 {
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
  font-size: 15px;
}

.boundary-card ul,
.business-card ul {
  padding-left: 18px;
  margin: 14px 0 0;
}

.boundary-card li,
.business-card li {
  color: var(--muted);
  margin: 7px 0;
  font-size: 11px;
}

.stats-grid {
  display: grid;
  gap: 13px;
  margin-bottom: 16px;
}

.stats-grid.four {
  grid-template-columns: repeat(4, 1fr);
}

.stats-grid.two {
  grid-template-columns: repeat(2, 1fr);
}

.stat-card {
  background: white;
  border: 1px solid var(--border);
  border-radius: 13px;
  padding: 17px;
  min-height: 119px;
}

.stat-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  color: var(--muted);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .8px;
  text-transform: uppercase;
}

.stat-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  color: var(--accent);
  background: var(--accent-soft);
}

.stat-icon.critical,
.stat-icon.high {
  color: var(--red);
  background: var(--red-soft);
}

.stat-icon.success {
  color: var(--green);
  background: var(--green-soft);
}

.stat-icon.info {
  color: var(--blue);
  background: var(--blue-soft);
}

.stat-value {
  margin-top: 13px;
  font-family: "Space Grotesk", sans-serif;
  font-weight: 700;
  font-size: 25px;
  letter-spacing: -.5px;
}

.stat-caption {
  margin-top: 3px;
  color: var(--muted);
  font-size: 9px;
}

.filter-panel {
  background: white;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px;
  display: grid;
  grid-template-columns: 2.2fr repeat(7, minmax(100px, 1fr));
  gap: 7px;
  margin-bottom: 12px;
}

.filter-panel select {
  padding: 8px 7px;
  font-size: 10px;
}

.search-box {
  min-width: 0;
  height: 35px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  border-radius: 8px;
}

.search-box svg {
  color: var(--subtle);
  flex: 0 0 auto;
}

.search-box input {
  border: 0;
  background: transparent;
  padding: 0;
  font-size: 10px;
}

.search-box input:focus {
  outline: 0;
}

.table-panel {
  background: white;
  border: 1px solid var(--border);
  border-radius: 13px;
  overflow: hidden;
}

.table-topline {
  min-height: 48px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
  color: var(--muted);
  font-size: 10px;
}

.table-date {
  color: var(--subtle);
}

.table-scroll {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1180px;
}

th {
  background: #f8fafb;
  color: #66737d;
  text-transform: uppercase;
  letter-spacing: .6px;
  font-size: 8px;
  font-weight: 800;
  text-align: left;
  padding: 11px 12px;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

td {
  padding: 12px;
  border-bottom: 1px solid #edf0f2;
  font-size: 10px;
  vertical-align: middle;
}

tbody tr {
  cursor: pointer;
  transition: background .12s ease;
}

tbody tr:hover {
  background: #f9fbfb;
}

.action-id {
  color: var(--accent);
  font-family: "Space Grotesk", sans-serif;
  font-size: 10px;
}

.recommendation-cell {
  min-width: 220px;
}

.recommendation-cell strong {
  display: block;
  font-size: 10px;
  line-height: 1.35;
}

.recommendation-cell span {
  display: block;
  color: var(--muted);
  font-size: 8px;
  margin: 5px 0;
}

.progress-track {
  width: 100%;
  min-width: 60px;
  background: #e7ecee;
  border-radius: 99px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent);
  border-radius: inherit;
  transition: width .25s ease;
}

.deadline-cell {
  display: grid;
  gap: 4px;
}

.deadline-cell.overdue span {
  color: var(--red);
  font-weight: 700;
}

.budget-cell {
  white-space: nowrap;
  color: #34424b;
}

.muted {
  color: var(--subtle);
}

.empty-state {
  padding: 45px 20px;
  text-align: center;
  color: var(--muted);
}

.empty-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: var(--surface-2);
  color: var(--subtle);
  margin: 0 auto 12px;
}

.empty-state h3 {
  margin: 0;
  color: var(--text);
  font-family: "Space Grotesk", sans-serif;
  font-size: 15px;
}

.empty-state p {
  margin: 6px 0 0;
  font-size: 11px;
}

.leadership-grid {
  display: grid;
  grid-template-columns: .7fr 1.3fr;
  gap: 16px;
}

.score-panel {
  background: #102d31;
  color: white;
  border-radius: 14px;
  padding: 23px;
  min-height: 340px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 18px;
}

.score-panel .eyebrow {
  color: #78c2b8;
}

.score-panel h3 {
  font-family: "Space Grotesk", sans-serif;
  margin: 0;
  font-size: 20px;
}

.score-panel p {
  color: #b4c5c6;
  font-size: 10px;
  line-height: 1.5;
  max-width: 300px;
}

.score-ring {
  position: relative;
  display: grid;
  place-items: center;
  color: #77c2b8;
  flex: 0 0 auto;
}

.score-ring svg {
  display: block;
}

.score-progress {
  color: #77c2b8;
  stroke: currentColor;
}

.score-center {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score-center strong {
  font-family: "Space Grotesk", sans-serif;
  font-size: 38px;
  line-height: .9;
}

.score-center span {
  color: #9eb5b5;
  font-size: 10px;
  margin-top: 5px;
}

.score-label {
  grid-column: 1 / -1;
  border-top: 1px solid rgba(255,255,255,.1);
  padding-top: 13px;
  display: flex;
  justify-content: space-between;
  color: #a6b9ba;
  font-size: 9px;
}

.score-label strong {
  color: white;
}

.score-info {
  grid-column: 1 / -1;
  display: flex;
  gap: 7px;
  color: #91a9aa;
  font-size: 9px;
  line-height: 1.45;
}

.score-info svg {
  flex: 0 0 auto;
}

.kpi-area {
  display: grid;
  gap: 13px;
}

.implementation-panel {
  background: white;
  border: 1px solid var(--border);
  border-radius: 13px;
  padding: 18px;
}

.implementation-panel .panel-title-row {
  align-items: center;
  margin-bottom: 13px;
}

.implementation-panel .panel-title-row strong {
  font-family: "Space Grotesk", sans-serif;
  font-size: 18px;
}

.progress-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 13px;
}

.progress-legend > div {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 9px;
  color: var(--muted);
}

.progress-legend strong {
  color: var(--text);
}

.legend-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #9aa7ad;
}

.legend-dot.success { background: var(--green); }
.legend-dot.info { background: var(--blue); }
.legend-dot.critical { background: var(--red); }
.legend-dot.neutral { background: #9aa7ad; }

.dashboard-grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.score-breakdown {
  display: grid;
  gap: 16px;
}

.breakdown-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
  font-size: 10px;
}

.breakdown-head span {
  color: var(--muted);
}

.mini-bars {
  display: grid;
  gap: 15px;
}

.mini-bar-label {
  display: flex;
  justify-content: space-between;
  color: var(--muted);
  font-size: 10px;
  margin-bottom: 5px;
}

.mini-bar-label strong {
  color: var(--text);
}

.mini-bar-track {
  height: 9px;
  background: #edf0f2;
  border-radius: 99px;
  overflow: hidden;
}

.mini-bar-fill {
  height: 100%;
  border-radius: inherit;
  background: var(--accent);
}

.mini-bar-fill.critical { background: var(--red); }
.mini-bar-fill.high { background: #c9763f; }
.mini-bar-fill.medium { background: #c6943a; }
.mini-bar-fill.low { background: #7e8b92; }

.budget-summary {
  display: grid;
  gap: 12px;
}

.budget-summary > div {
  padding-bottom: 11px;
  border-bottom: 1px solid #edf0f2;
}

.budget-summary span,
.budget-summary strong {
  display: block;
}

.budget-summary span {
  color: var(--muted);
  font-size: 9px;
}

.budget-summary strong {
  font-family: "Space Grotesk", sans-serif;
  font-size: 17px;
  margin-top: 4px;
}

.small-disclaimer {
  margin-top: 12px;
  display: flex;
  gap: 6px;
  color: var(--subtle);
  font-size: 9px;
  line-height: 1.4;
}

.accountability-chain {
  display: grid;
  justify-items: center;
  gap: 7px;
}

.chain-node {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  border-radius: 8px;
  font-size: 10px;
}

.chain-node svg {
  color: var(--accent);
}

.chain-arrow {
  color: #9caab0;
  font-size: 13px;
}

.commitment-card {
  background: white;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 23px;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 25px;
}

.commitment-copy {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.commitment-mark {
  width: 45px;
  height: 45px;
  border-radius: 11px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  color: var(--accent);
  background: var(--accent-soft);
}

.commitment-copy p {
  margin: 0;
  color: #45535d;
  font-family: "Space Grotesk", sans-serif;
  font-size: 14px;
  line-height: 1.5;
}

.commitment-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 11px;
  align-content: start;
}

.commitment-form label:last-of-type {
  grid-column: 1 / 2;
}

.commitment-form button {
  align-self: end;
  height: 38px;
}

.commitment-confirmation {
  margin-top: 14px;
  padding: 10px;
  background: var(--green-soft);
  border: 1px solid #cfe6d8;
  border-radius: 8px;
}

.commitment-confirmation strong,
.commitment-confirmation span {
  display: block;
}

.commitment-confirmation strong {
  color: var(--green);
  font-size: 10px;
}

.commitment-confirmation span {
  color: #4f6c5b;
  font-size: 9px;
  margin-top: 3px;
}

.risk-hero {
  background: white;
  border: 1px solid var(--border);
  border-radius: 15px;
  padding: 26px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  align-items: center;
}

.risk-value-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.risk-shield {
  width: 68px;
  height: 68px;
  border-radius: 17px;
  display: grid;
  place-items: center;
}

.risk-shield.success { background: var(--green-soft); color: var(--green); }
.risk-shield.medium { background: var(--amber-soft); color: var(--amber); }
.risk-shield.high { background: #fff0e7; color: #ad5727; }
.risk-shield.critical { background: var(--red-soft); color: var(--red); }

.risk-value-row h1 {
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
  font-size: 36px;
  letter-spacing: -1px;
}

.risk-value-row p {
  color: var(--muted);
  font-size: 10px;
  line-height: 1.45;
  margin: 4px 0 0;
}

.risk-levels {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 7px;
}

.risk-level {
  padding: 11px 8px;
  border: 1px solid var(--border);
  border-radius: 9px;
  background: var(--surface-2);
  text-align: center;
}

.risk-level.active {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.risk-level strong {
  display: block;
  font-size: 9px;
  margin-top: 6px;
}

.risk-level .badge {
  margin-top: 7px;
}

.risk-level-dot {
  width: 9px;
  height: 9px;
  display: inline-block;
  border-radius: 50%;
}

.risk-level-dot.low { background: var(--green); }
.risk-level-dot.medium { background: #c6943a; }
.risk-level-dot.high { background: #c9763f; }
.risk-level-dot.critical { background: var(--red); }

.risk-grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  gap: 16px;
}

.risk-reasons {
  display: grid;
  gap: 9px;
}

.risk-reason {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  border-radius: 9px;
  padding: 10px;
}

.risk-reason.active {
  border-color: #ead0d0;
  background: #fffafa;
}

.risk-reason > svg {
  color: var(--subtle);
}

.risk-reason.active > svg {
  color: var(--red);
}

.risk-reason strong,
.risk-reason span {
  display: block;
}

.risk-reason strong {
  font-size: 10px;
}

.risk-reason span {
  color: var(--muted);
  font-size: 9px;
  margin-top: 2px;
}

.risk-rules {
  display: grid;
  gap: 10px;
}

.risk-rules > div {
  display: flex;
  align-items: flex-start;
  gap: 9px;
}

.risk-rules span {
  color: var(--muted);
  font-size: 10px;
  line-height: 1.45;
}

.regulatory-panel {
  margin-top: 16px;
  background: #fffdf8;
  border: 1px solid #eadfca;
  border-radius: 14px;
  padding: 22px;
  display: flex;
  gap: 13px;
}

.regulatory-icon {
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  border-radius: 10px;
  background: var(--amber-soft);
  color: var(--amber);
  display: grid;
  place-items: center;
}

.regulatory-panel h3 {
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
  font-size: 16px;
}

.regulatory-panel p {
  color: #675f50;
  line-height: 1.5;
  font-size: 11px;
  margin: 6px 0 13px;
}

.consequence-list {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.consequence-list span {
  border: 1px solid #e9dcc3;
  background: #fffaf0;
  color: #725f3e;
  padding: 6px 8px;
  border-radius: 7px;
  font-size: 9px;
}

.legal-disclaimer {
  margin-top: 13px;
  padding-top: 11px;
  border-top: 1px solid #eadfca;
  color: #776d5b;
  font-size: 9px;
  line-height: 1.5;
}

.escalation-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.escalation-summary > div {
  background: white;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
}

.escalation-summary span,
.escalation-summary strong {
  display: block;
}

.escalation-summary span {
  color: var(--muted);
  font-size: 9px;
}

.escalation-summary strong {
  font-family: "Space Grotesk", sans-serif;
  font-size: 26px;
  margin-top: 7px;
}

.escalation-list {
  display: grid;
  gap: 7px;
}

.escalation-row {
  display: grid;
  grid-template-columns: 60px minmax(180px, 1fr) auto 135px auto 34px;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface-2);
}

.escalation-id {
  font-family: "Space Grotesk", sans-serif;
  font-weight: 700;
  color: var(--accent);
  font-size: 10px;
}

.escalation-main strong,
.escalation-main span {
  display: block;
}

.escalation-main strong {
  font-size: 10px;
}

.escalation-main span {
  color: var(--red);
  font-size: 9px;
  margin-top: 3px;
}

.escalation-stage span,
.escalation-stage strong {
  display: block;
}

.escalation-stage span {
  color: var(--muted);
  font-size: 8px;
}

.escalation-stage strong {
  font-size: 10px;
  margin-top: 2px;
}

.escalation-footer-note {
  margin-top: 13px;
  color: var(--muted);
  display: flex;
  gap: 7px;
  font-size: 9px;
  line-height: 1.5;
}

.public-search-panel {
  background: white;
  border: 1px solid var(--border);
  border-radius: 13px;
  padding: 15px;
  margin-bottom: 16px;
}

.search-box.large {
  height: 42px;
}

.search-box.large input {
  font-size: 12px;
}

.public-results {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 10px;
}

.org-result {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  border-radius: 9px;
  padding: 8px 10px;
  text-align: left;
  color: var(--muted);
}

.org-result.active {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--accent-dark);
}

.org-result span {
  min-width: 0;
}

.org-result strong,
.org-result small {
  display: block;
}

.org-result strong {
  font-size: 10px;
}

.org-result small {
  font-size: 8px;
  margin-top: 2px;
}

.org-result > svg:last-child {
  margin-left: 6px;
}

.public-hero {
  background: #102d31;
  color: white;
  border-radius: 15px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.public-hero .eyebrow {
  color: #78c2b8;
}

.public-hero h2 {
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
  font-size: 27px;
}

.public-hero p {
  color: #a9bdbe;
  margin: 5px 0 0;
  font-size: 11px;
}

.public-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 12px;
}

.public-stats > div {
  background: white;
  border: 1px solid var(--border);
  border-radius: 11px;
  padding: 15px;
}

.public-stats strong,
.public-stats span {
  display: block;
}

.public-stats strong {
  font-family: "Space Grotesk", sans-serif;
  font-size: 24px;
}

.public-stats span {
  color: var(--muted);
  font-size: 9px;
  margin-top: 3px;
}

.public-progress-panel {
  margin-top: 16px;
}

.public-progress-meta {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 12px;
  color: var(--muted);
  font-size: 9px;
}

.public-progress-meta span:last-child {
  text-align: right;
}

.public-disclaimer {
  margin-top: 13px;
  display: flex;
  gap: 8px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  padding: 13px;
  border-radius: 10px;
  color: var(--muted);
}

.public-disclaimer svg {
  flex: 0 0 auto;
  color: var(--blue);
}

.public-disclaimer p {
  margin: 0;
  font-size: 9px;
  line-height: 1.5;
}

.policy-flow {
  background: white;
  border: 1px solid var(--border);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  align-items: stretch;
  gap: 5px;
  overflow-x: auto;
}

.policy-step {
  min-width: 140px;
  flex: 1;
  border: 1px solid var(--border);
  background: var(--surface-2);
  border-radius: 9px;
  padding: 13px;
}

.policy-step span {
  color: var(--accent);
  font-size: 8px;
  font-weight: 800;
}

.policy-step strong {
  display: block;
  font-size: 9px;
  line-height: 1.35;
  margin-top: 7px;
}

.policy-arrow {
  align-self: center;
  color: #a2afb5;
  font-size: 15px;
}

.policy-grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.policy-card {
  display: flex;
  gap: 11px;
  padding: 15px;
  background: white;
  border: 1px solid var(--border);
  border-radius: 11px;
}

.policy-card > span {
  width: 25px;
  height: 25px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  background: var(--accent-soft);
  color: var(--accent);
  border-radius: 7px;
  font-size: 9px;
  font-weight: 800;
}

.policy-card p {
  margin: 2px 0 0;
  color: var(--muted);
  font-size: 10px;
  line-height: 1.5;
}

.government-flow {
  background: white;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px;
  display: flex;
  align-items: stretch;
  gap: 7px;
  overflow-x: auto;
}

.gov-node {
  min-width: 140px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 13px 9px;
  text-align: center;
  background: var(--surface-2);
  border-radius: 9px;
}

.gov-node svg {
  color: var(--accent);
}

.gov-node strong {
  font-size: 9px;
  line-height: 1.35;
}

.gov-arrow {
  align-self: center;
  color: #a1afb4;
}

.building-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.building-card {
  display: flex;
  gap: 10px;
  padding: 14px;
  background: white;
  border: 1px solid var(--border);
  border-radius: 10px;
}

.building-card svg {
  color: var(--accent);
  flex: 0 0 auto;
}

.building-card strong,
.building-card span {
  display: block;
}

.building-card strong {
  font-size: 10px;
}

.building-card span {
  color: var(--muted);
  font-size: 9px;
  line-height: 1.4;
  margin-top: 3px;
}

.pilot-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 13px;
}

.pilot-phase {
  background: white;
  border: 1px solid var(--border);
  border-radius: 13px;
  padding: 20px;
}

.phase-number {
  font-family: "Space Grotesk", sans-serif;
  color: var(--accent);
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 12px;
}

.pilot-phase h3 {
  font-family: "Space Grotesk", sans-serif;
  font-size: 15px;
  margin: 13px 0 0;
}

.pilot-phase ul {
  padding-left: 17px;
  margin: 11px 0 0;
}

.pilot-phase li {
  color: var(--muted);
  font-size: 10px;
  margin: 6px 0;
}

.pilot-kpis {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 11px;
}

.pilot-kpis span {
  border: 1px solid var(--border);
  background: white;
  color: var(--muted);
  padding: 7px 9px;
  border-radius: 7px;
  font-size: 9px;
}

.business-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 13px;
}

.business-card,
.business-callout {
  background: white;
  border: 1px solid var(--border);
  border-radius: 13px;
  padding: 20px;
}

.business-card h3 {
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
  font-size: 14px;
}

.business-callout {
  background: var(--accent-soft);
  border-color: #cfe3df;
  color: var(--accent-dark);
}

.business-callout svg {
  margin-bottom: 12px;
}

.business-callout strong,
.business-callout p {
  display: block;
}

.business-callout strong {
  font-size: 12px;
}

.business-callout p {
  color: #51706c;
  font-size: 10px;
  line-height: 1.5;
}

.settings-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.settings-options {
  display: grid;
}

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 12px 0;
  border-bottom: 1px solid #edf0f2;
}

.toggle-row:last-child {
  border-bottom: 0;
}

.toggle-row strong,
.toggle-row small {
  display: block;
}

.toggle-row strong {
  font-size: 10px;
}

.toggle-row small {
  color: var(--muted);
  font-size: 9px;
  margin-top: 3px;
}

.toggle-row input {
  appearance: none;
  width: 34px;
  height: 19px;
  padding: 0;
  border: 0;
  border-radius: 99px;
  background: #cbd4d8;
  position: relative;
  cursor: pointer;
}

.toggle-row input::after {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: white;
  top: 2px;
  left: 2px;
  transition: .15s;
  box-shadow: 0 1px 3px rgba(0,0,0,.2);
}

.toggle-row input:checked {
  background: var(--accent);
}

.toggle-row input:checked::after {
  left: 17px;
}

.role-settings {
  display: grid;
  gap: 7px;
}

.role-setting {
  border: 1px solid var(--border);
  background: var(--surface-2);
  border-radius: 9px;
  padding: 11px;
  text-align: left;
  position: relative;
}

.role-setting.active {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.role-setting strong,
.role-setting span {
  display: block;
  padding-right: 25px;
}

.role-setting strong {
  font-size: 10px;
}

.role-setting span {
  color: var(--muted);
  font-size: 9px;
  line-height: 1.4;
  margin-top: 3px;
}

.role-setting svg {
  position: absolute;
  top: 12px;
  right: 11px;
  color: var(--accent);
}

.danger-panel {
  border-color: #ecd5d5;
}

.danger-panel p {
  color: var(--muted);
  font-size: 10px;
  line-height: 1.5;
}

.storage-note {
  display: flex;
  gap: 6px;
  color: var(--subtle);
  font-size: 9px;
  margin-top: 12px;
}

.footer {
  border-top: 1px solid var(--border);
  background: white;
  padding: 20px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
}

.footer > div strong,
.footer > div span {
  display: block;
}

.footer > div strong {
  font-family: "Space Grotesk", sans-serif;
  font-size: 13px;
}

.footer > div span {
  color: var(--muted);
  font-size: 9px;
  margin-top: 2px;
}

.footer p {
  max-width: 700px;
  color: var(--muted);
  font-size: 9px;
  line-height: 1.5;
  margin: 0;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(8, 24, 28, .54);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
}

.modal {
  width: 100%;
  background: white;
  border-radius: 16px;
  box-shadow: var(--shadow-lg);
  max-height: calc(100vh - 40px);
  overflow-y: auto;
}

.modal-header {
  position: sticky;
  top: 0;
  z-index: 2;
  background: white;
  border-bottom: 1px solid var(--border);
  padding: 15px 19px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-header h2 {
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
  font-size: 16px;
}

.modal-body {
  padding: 21px;
}

.action-detail-head {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.action-detail-head h2 {
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
  font-size: 20px;
  max-width: 670px;
}

.detail-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
}

.detail-meta > span:first-child {
  color: var(--accent);
  font-family: "Space Grotesk", sans-serif;
  font-weight: 700;
  font-size: 10px;
}

.detail-score {
  min-width: 75px;
  text-align: right;
}

.detail-score strong,
.detail-score span {
  display: block;
}

.detail-score strong {
  font-family: "Space Grotesk", sans-serif;
  font-size: 26px;
}

.detail-score span {
  color: var(--muted);
  font-size: 9px;
}

.source-strip {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  border-radius: 8px;
  color: var(--muted);
  font-size: 9px;
}

.source-strip svg {
  color: var(--accent);
}

.action-tracker {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
  margin: 18px 0;
  padding: 14px 5px;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.tracker-step {
  position: relative;
  text-align: center;
}

.tracker-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #cbd5d9;
  color: #8b999f;
  background: white;
  display: grid;
  place-items: center;
  margin: 0 auto 6px;
  font-size: 9px;
  position: relative;
  z-index: 1;
}

.tracker-step.complete .tracker-circle {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}

.tracker-step.current .tracker-circle {
  border-color: var(--blue);
  color: var(--blue);
  box-shadow: 0 0 0 4px var(--blue-soft);
}

.tracker-step:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 14px;
  left: calc(50% + 15px);
  right: calc(-50% + 15px);
  border-top: 1px dashed #ccd5d9;
}

.tracker-step.complete:not(:last-child)::after {
  border-color: #79b9b0;
}

.tracker-step > span {
  display: block;
  font-size: 8px;
  line-height: 1.25;
  color: var(--muted);
}

.tracker-step.complete > span {
  color: var(--accent-dark);
  font-weight: 700;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.detail-card {
  border: 1px solid var(--border);
  background: var(--surface-2);
  border-radius: 9px;
  padding: 11px;
}

.detail-card span,
.detail-card strong,
.detail-card small {
  display: block;
}

.detail-card span {
  color: var(--muted);
  font-size: 8px;
}

.detail-card strong {
  font-size: 10px;
  margin-top: 4px;
}

.detail-card small {
  color: var(--subtle);
  font-size: 8px;
  margin-top: 3px;
  line-height: 1.35;
}

.detail-section {
  margin-top: 18px;
}

.evidence-card {
  margin-top: 17px;
  padding: 14px;
  border: 1px solid #d5e4e1;
  background: #f7fbfa;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.evidence-card h3 {
  margin: 0;
  font-size: 13px;
}

.evidence-card p {
  margin: 4px 0 0;
  color: var(--muted);
  font-size: 9px;
  line-height: 1.45;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 18px;
  padding-top: 15px;
  border-top: 1px solid var(--border);
}

.evidence-form {
  display: grid;
  gap: 14px;
}

.evidence-note {
  display: flex;
  gap: 8px;
  color: #53656c;
  background: #f3f8fa;
  border: 1px solid #d8e5e9;
  border-radius: 9px;
  padding: 11px;
  font-size: 10px;
  line-height: 1.5;
}

.evidence-note svg {
  flex: 0 0 auto;
  color: var(--blue);
}

.evidence-status-preview {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 11px;
  border: 1px solid #cfe6d8;
  background: var(--green-soft);
  border-radius: 9px;
}

.status-check {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--green);
  background: white;
}

.evidence-status-preview strong,
.evidence-status-preview span {
  display: block;
}

.evidence-status-preview strong {
  color: var(--green);
  font-size: 10px;
}

.evidence-status-preview span {
  color: #557062;
  font-size: 9px;
  margin-top: 2px;
}

.toast {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 150;
  width: min(390px, calc(100vw - 30px));
  background: #102d31;
  color: white;
  border-radius: 11px;
  box-shadow: var(--shadow-lg);
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 9px;
}

.toast-icon {
  width: 29px;
  height: 29px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: #1e5a59;
  color: #8dd0c6;
  flex: 0 0 auto;
}

.toast > div:nth-child(2) {
  flex: 1;
}

.toast strong,
.toast span {
  display: block;
}

.toast strong {
  font-size: 10px;
}

.toast span {
  color: #b8caca;
  font-size: 9px;
  margin-top: 2px;
  line-height: 1.4;
}

.toast-close {
  border: 0;
  background: transparent;
  color: #a6baba;
}

@media (max-width: 1250px) {
  .filter-panel {
    grid-template-columns: 2fr repeat(4, 1fr);
  }

  .filter-panel .search-box {
    grid-column: span 2;
  }

  .responsibility-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .hero {
    grid-template-columns: 1fr;
  }

  .hero-flow-card {
    min-height: auto;
  }

  .gap-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1050px) {
  .sidebar {
    width: 225px;
    flex-basis: 225px;
  }

  .leadership-grid,
  .risk-grid,
  .audit-layout,
  .commitment-card {
    grid-template-columns: 1fr;
  }

  .dashboard-grid,
  .settings-grid {
    grid-template-columns: 1fr;
  }

  .filter-panel {
    grid-template-columns: repeat(4, 1fr);
  }

  .filter-panel .search-box {
    grid-column: span 4;
  }

  .building-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .business-grid {
    grid-template-columns: 1fr 1fr;
  }

  .business-callout {
    grid-column: span 2;
  }

  .hero-copy {
    min-height: 450px;
  }
}

@media (max-width: 800px) {
  .app-shell {
    display: block;
  }

  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    transform: translateX(-100%);
    transition: transform .2s ease;
    width: 270px;
    box-shadow: var(--shadow-lg);
  }

  .sidebar.mobile-open {
    transform: translateX(0);
  }

  .mobile-menu-button {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
  }

  .topbar {
    padding: 0 14px;
  }

  .breadcrumb {
    display: none;
  }

  .topbar-actions {
    margin-left: auto;
  }

  .header-org {
    display: none;
  }

  .role-switcher button {
    padding: 6px 7px;
    font-size: 9px;
  }

  .content {
    padding: 22px 14px 35px;
  }

  .stats-grid.four {
    grid-template-columns: 1fr 1fr;
  }

  .three-grid,
  .responsibility-grid,
  .boundary-grid,
  .pilot-grid,
  .building-grid,
  .business-grid {
    grid-template-columns: 1fr;
  }

  .business-callout {
    grid-column: auto;
  }

  .story-banner {
    grid-template-columns: 1fr;
  }

  .public-stats {
    grid-template-columns: 1fr 1fr;
  }

  .risk-hero {
    grid-template-columns: 1fr;
  }

  .risk-levels {
    grid-template-columns: repeat(2, 1fr);
  }

  .escalation-row {
    grid-template-columns: 55px 1fr auto;
  }

  .escalation-stage,
  .escalation-row .button,
  .escalation-row .icon-button {
    grid-column: 2 / -1;
  }

  .policy-grid {
    grid-template-columns: 1fr;
  }

  .policy-flow,
  .government-flow {
    align-items: stretch;
  }

  .policy-step {
    min-width: 125px;
  }

  .gov-node {
    min-width: 125px;
  }

  .footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer p {
    max-width: none;
  }
}

@media (max-width: 600px) {
  body {
    font-size: 13px;
  }

  .topbar {
    height: 58px;
  }

  .content {
    min-height: calc(100vh - 58px);
  }

  .section-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .section-header h2 {
    font-size: 21px;
  }

  .hero-copy {
    padding: 31px 24px 85px;
    min-height: 420px;
  }

  .hero h1 {
    font-size: 48px;
    letter-spacing: -3px;
  }

  .hero-subtitle {
    font-size: 13px;
  }

  .hero-trust {
    left: 24px;
    right: 20px;
    bottom: 22px;
    gap: 8px;
  }

  .hero-trust span {
    font-size: 9px;
  }

  .hero-flow-card {
    padding: 18px;
  }

  .gap-track {
    grid-template-columns: 1fr 1fr;
  }

  .gap-step {
    min-height: 105px;
  }

  .stats-grid.four,
  .stats-grid.two {
    grid-template-columns: 1fr 1fr;
  }

  .score-panel {
    grid-template-columns: 1fr;
  }

  .score-ring {
    margin: 0 auto;
  }

  .score-label,
  .score-info {
    grid-column: 1;
  }

  .filter-panel {
    grid-template-columns: 1fr 1fr;
  }

  .filter-panel .search-box {
    grid-column: span 2;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-grid .full {
    grid-column: auto;
  }

  .audit-record {
    flex-direction: column;
  }

  .public-hero {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .public-hero .score-ring {
    margin: 0;
    align-self: center;
  }

  .public-progress-meta {
    flex-direction: column;
  }

  .public-progress-meta span:last-child {
    text-align: left;
  }

  .commitment-form {
    grid-template-columns: 1fr;
  }

  .commitment-form label:last-of-type {
    grid-column: auto;
  }

  .action-tracker {
    overflow-x: auto;
    min-width: 700px;
  }

  .action-detail {
    overflow-x: hidden;
  }

  .detail-grid {
    grid-template-columns: 1fr 1fr;
  }

  .action-detail-head {
    flex-direction: column;
  }

  .detail-score {
    text-align: left;
  }

  .modal-backdrop {
    padding: 8px;
  }

  .modal {
    max-height: calc(100vh - 16px);
  }

  .modal-body {
    padding: 15px;
  }

  .evidence-card {
    align-items: flex-start;
    flex-direction: column;
  }

  .modal-actions {
    justify-content: stretch;
  }

  .modal-actions .button {
    flex: 1;
  }

  .notification-panel {
    position: fixed;
    top: 58px;
    right: 8px;
    left: 8px;
    width: auto;
  }

  .role-switcher {
    display: none;
  }

  .risk-value-row h1 {
    font-size: 31px;
  }

  .escalation-summary {
    grid-template-columns: 1fr;
  }

  .toast {
    right: 10px;
    bottom: 10px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition: none !important;
    animation: none !important;
  }
}
`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
