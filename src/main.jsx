import React, { createContext, useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  LayoutDashboard, FileText, CheckSquare, ShieldAlert, 
  TrendingUp, Globe, ScrollText, Settings, UserCheck, RefreshCw, 
  AlertTriangle, ArrowRight, CheckCircle, XCircle, ShieldCheck, 
  FileUp, ListChecks, Wallet, Clock, Search, Filter, 
  ChevronRight, Upload, Shield, Info, ArrowUpRight, Flag, Circle
} from 'lucide-react';

// ==========================================
// 1. INITIAL MOCK DATASET
// ==========================================
const INITIAL_AUDIT = {
  id: "AUD-2026-0891",
  orgName: "Jamshedpur Civil Hospital & Admin Complex",
  buildingName: "Main Outpatient & Administrative Block",
  auditDate: "2026-07-15",
  auditorAgency: "Equal Access Standards India (EASI)",
  reportRef: "EASI-JSR-2026-042",
  reportType: "Comprehensive Built-Environment Audit",
  totalRecommendations: 27,
  budgetTotal: 800000,
  budgetApproved: 500000,
  budgetPending: 300000,
};

const INITIAL_ACTIONS = [
  {
    id: "AX-001",
    recommendation: "Construct standard ramp with 1:12 gradient and double height handrails at Main OPD Ramp Entrance.",
    sourcePage: "Page 14, Sec 3.2",
    priority: "Critical",
    department: "Facilities & Engineering",
    owner: "R. K. Sharma (Facilities Lead)",
    deadline: "2026-09-15",
    estimatedCost: 85000,
    budgetStatus: "Approved",
    status: "In Progress",
    progress: 65,
    escalationLevel: "Department Head",
    lastUpdated: "2026-08-20",
    comments: [
      { sender: "Facilities Lead", text: "Concrete pouring completed. Handrail fabrication in progress.", date: "2026-08-20" }
    ],
    evidence: [
      { id: "EV-101", name: "ramp_construction_site.jpg", date: "2026-08-20", status: "Pending Review" }
    ]
  },
  {
    id: "AX-002",
    recommendation: "Convert Ground Floor Restroom into tactile-guided, wheelchair accessible toilet with emergency grab bars & call bell.",
    sourcePage: "Page 22, Sec 4.1",
    priority: "Critical",
    department: "Civil Works",
    owner: "Anita Roy (Project Manager)",
    deadline: "2026-08-10",
    estimatedCost: 150000,
    budgetStatus: "Approved",
    status: "Overdue",
    progress: 30,
    escalationLevel: "Nodal Officer Escalated",
    lastUpdated: "2026-08-12",
    delayReason: "Procurement delay for specialized stainless steel grab bars.",
    comments: [
      { sender: "Project Manager", text: "Vendor dispatch delayed by 2 weeks.", date: "2026-08-12" }
    ],
    evidence: []
  },
  {
    id: "AX-003",
    recommendation: "Install tactile ground surface indicators (TGSI) leading from main gate to reception desk and OPD counters.",
    sourcePage: "Page 08, Sec 2.1",
    priority: "High",
    department: "Administration",
    owner: "V. Verma (Admin Officer)",
    deadline: "2026-10-05",
    estimatedCost: 45000,
    budgetStatus: "Approved",
    status: "In Progress",
    progress: 40,
    escalationLevel: "Department Owner",
    lastUpdated: "2026-08-25",
    comments: [],
    evidence: []
  },
  {
    id: "AX-004",
    recommendation: "Re-align reception counter height to include a lowered knee-clearance section (750mm height) for wheelchair users.",
    sourcePage: "Page 10, Sec 2.4",
    priority: "Medium",
    department: "Interior Maintenance",
    owner: "S. Murmu (Furniture Supervisor)",
    deadline: "2026-07-30",
    estimatedCost: 20000,
    budgetStatus: "Approved",
    status: "Completed",
    progress: 100,
    escalationLevel: "Resolved",
    lastUpdated: "2026-07-28",
    comments: [
      { sender: "Furniture Supervisor", text: "Carpentry work completed and tested with wheelchair user group.", date: "2026-07-28" }
    ],
    evidence: [
      { id: "EV-099", name: "reception_counter_after.png", date: "2026-07-28", status: "Accepted" }
    ]
  },
  {
    id: "AX-005",
    recommendation: "Install high-contrast audio-visual emergency fire evacuation alarms across all 4 floor corridors.",
    sourcePage: "Page 35, Sec 6.3",
    priority: "Critical",
    department: "Electrical & Safety",
    owner: "A. K. Singh (Electrical Engineer)",
    deadline: "2026-08-15",
    estimatedCost: 220000,
    budgetStatus: "Pending Approval",
    status: "Overdue",
    progress: 10,
    escalationLevel: "Senior Leadership Escalated",
    lastUpdated: "2026-08-16",
    delayReason: "Capex approval pending with finance committee.",
    comments: [],
    evidence: []
  },
  {
    id: "AX-006",
    recommendation: "Add Braille indicators and audio prompt system to all 3 passenger elevator control panels.",
    sourcePage: "Page 18, Sec 3.7",
    priority: "High",
    department: "Lift Maintenance",
    owner: "P. Das (Lift Operations)",
    deadline: "2026-09-30",
    estimatedCost: 60000,
    budgetStatus: "Approved",
    status: "Assigned",
    progress: 0,
    escalationLevel: "Department Owner",
    lastUpdated: "2026-08-01",
    comments: [],
    evidence: []
  }
];

// ==========================================
// 2. CONTEXT & STATE MANAGEMENT
// ==========================================
const AppContext = createContext();

function AppProvider({ children }) {
  const [role, setRole] = useState(() => localStorage.getItem('ix_role') || 'leadership');
  const [auditInfo, setAuditInfo] = useState(() => {
    const saved = localStorage.getItem('ix_audit');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT;
  });
  const [actions, setActions] = useState(() => {
    const saved = localStorage.getItem('ix_actions');
    return saved ? JSON.parse(saved) : INITIAL_ACTIONS;
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [isCommitmentApproved, setIsCommitmentApproved] = useState(() => {
    return localStorage.getItem('ix_commitment') === 'true';
  });

  useEffect(() => { localStorage.setItem('ix_role', role); }, [role]);
  useEffect(() => { localStorage.setItem('ix_audit', JSON.stringify(auditInfo)); }, [auditInfo]);
  useEffect(() => { localStorage.setItem('ix_actions', JSON.stringify(actions)); }, [actions]);
  useEffect(() => { localStorage.setItem('ix_commitment', isCommitmentApproved); }, [isCommitmentApproved]);

  const calculateActionScore = () => {
    if (!actions.length) return 0;
    const completedCount = actions.filter(a => a.status === 'Completed').length;
    const completionScore = (completedCount / actions.length) * 40;
    const overdueCount = actions.filter(a => a.status === 'Overdue').length;
    const timelinessScore = Math.max(0, 25 - (overdueCount * 5));
    const criticalActions = actions.filter(a => a.priority === 'Critical');
    const resolvedCritical = criticalActions.filter(a => a.status === 'Completed').length;
    const inProgCritical = criticalActions.filter(a => a.status === 'In Progress').length;
    const criticalScore = criticalActions.length 
      ? ((resolvedCritical * 1 + inProgCritical * 0.5) / criticalActions.length) * 20 
      : 20;
    const actionsWithEvidence = actions.filter(a => a.evidence && a.evidence.length > 0).length;
    const docScore = (actionsWithEvidence / actions.length) * 15;
    return Math.round(completionScore + timelinessScore + criticalScore + docScore);
  };

  const calculateComplianceRisk = () => {
    const overdueCritical = actions.filter(a => a.priority === 'Critical' && a.status === 'Overdue').length;
    const totalOverdue = actions.filter(a => a.status === 'Overdue').length;
    if (overdueCritical >= 2 || totalOverdue >= 5) return { level: 'HIGH', color: 'red', reason: `${totalOverdue} actions overdue (${overdueCritical} critical)` };
    if (overdueCritical === 1 || totalOverdue >= 2) return { level: 'MEDIUM', color: 'amber', reason: `${totalOverdue} actions overdue requiring escalation` };
    return { level: 'LOW', color: 'emerald', reason: 'Action plan tracking within operational targets' };
  };

  const updateActionStatus = (id, newStatus, extraData = {}) => {
    setActions(prev => prev.map(act => act.id === id ? {
      ...act,
      status: newStatus,
      lastUpdated: new Date().toISOString().split('T')[0],
      ...extraData
    } : act));
  };

  const addEvidence = (actionId, fileName) => {
    setActions(prev => prev.map(act => {
      if (act.id === actionId) {
        const newEv = {
          id: `EV-${Date.now()}`,
          name: fileName,
          date: new Date().toISOString().split('T')[0],
          status: 'Pending Review'
        };
        return {
          ...act,
          status: act.status === 'Completed' ? 'Completed' : 'Evidence Submitted',
          evidence: [...(act.evidence || []), newEv]
        };
      }
      return act;
    }));
  };

  const escalateAction = (actionId) => {
    setActions(prev => prev.map(act => {
      if (act.id === actionId) {
        const hierarchy = ['Department Owner', 'Department Head', 'Nodal Officer Escalated', 'Senior Leadership Escalated', 'Competent Authority Referral'];
        const currentIdx = hierarchy.indexOf(act.escalationLevel);
        const nextLevel = currentIdx < hierarchy.length - 1 ? hierarchy[currentIdx + 1] : hierarchy[hierarchy.length - 1];
        return { ...act, escalationLevel: nextLevel };
      }
      return act;
    }));
  };

  const resetDemoData = () => {
    localStorage.removeItem('ix_audit');
    localStorage.removeItem('ix_actions');
    localStorage.removeItem('ix_commitment');
    setAuditInfo(INITIAL_AUDIT);
    setActions(INITIAL_ACTIONS);
    setIsCommitmentApproved(false);
  };

  return (
    <AppContext.Provider value={{
      role, setRole,
      auditInfo, setAuditInfo,
      actions, setActions,
      activeTab, setActiveTab,
      isCommitmentApproved, setIsCommitmentApproved,
      actionScore: calculateActionScore(),
      complianceRisk: calculateComplianceRisk(),
      updateActionStatus, addEvidence, escalateAction, resetDemoData
    }}>
      {children}
    </AppContext.Provider>
  );
}

const useApp = () => useContext(AppContext);

// ==========================================
// 3. UI COMPONENTS
// ==========================================

function ActionTrackerStep({ status }) {
  const STEPS = [
    { id: 1, label: 'Audit Finding' },
    { id: 2, label: 'Action Assigned' },
    { id: 3, label: 'Plan & Budget' },
    { id: 4, label: 'Implementation' },
    { id: 5, label: 'Evidence Submitted' },
    { id: 6, label: 'Closed / Escalated' }
  ];

  const getStepIndex = () => {
    switch (status) {
      case 'Pending': return 0;
      case 'Assigned': return 1;
      case 'In Progress': return 3;
      case 'Evidence Submitted': return 4;
      case 'Completed': return 5;
      case 'Overdue': return 3;
      case 'Blocked': return 2;
      default: return 1;
    }
  };

  const currentIdx = getStepIndex();
  const isOverdue = status === 'Overdue';

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-indigo-600 -translate-y-1/2 transition-all duration-300 z-0"
          style={{ width: `${(currentIdx / (STEPS.length - 1)) * 100}%` }}
        />
        {STEPS.map((step, idx) => {
          const isDone = idx < currentIdx || status === 'Completed';
          const isCurrent = idx === currentIdx && status !== 'Completed';

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center group">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-colors ${
                isDone ? 'bg-emerald-600 text-white ring-4 ring-emerald-50' :
                isCurrent ? (isOverdue ? 'bg-red-600 text-white ring-4 ring-red-100 animate-pulse' : 'bg-indigo-600 text-white ring-4 ring-indigo-100') :
                'bg-slate-100 text-slate-400 border border-slate-300'
              }`}>
                {isDone ? <CheckCircle className="w-5 h-5" /> :
                 isCurrent && isOverdue ? <AlertTriangle className="w-5 h-5" /> :
                 isCurrent ? <Clock className="w-4 h-4 animate-spin" /> :
                 <span>{step.id}</span>}
              </div>
              <span className={`text-[11px] font-medium mt-2 text-center max-w-[80px] leading-tight ${
                isCurrent ? 'text-indigo-900 font-semibold' : isDone ? 'text-slate-700' : 'text-slate-400'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Navigation() {
  const { role, setRole, activeTab, setActiveTab, complianceRisk, actionScore, resetDemoData } = useApp();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'upload', label: 'Audit Reports', icon: FileText },
    { id: 'actions', label: 'Action Plan', icon: CheckSquare },
    { id: 'leadership', label: 'Leadership Dashboard', icon: TrendingUp },
    { id: 'risk', label: 'Compliance Risk', icon: ShieldAlert },
    { id: 'escalations', label: 'Escalations', icon: AlertTriangle },
    { id: 'public', label: 'Public Transparency', icon: Globe },
    { id: 'policy', label: 'Policy & Pilot Plan', icon: ScrollText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col justify-between shrink-0 border-r border-slate-800">
      <div>
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-blue-600 flex items-center justify-center font-black text-white text-xl shadow-md">
              IX
            </div>
            <div>
              <h1 className="font-bold text-base text-white leading-tight">InclusiveX</h1>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">Audit to Action Layer</p>
            </div>
          </div>
        </div>

        <div className="m-3 p-3 bg-slate-800/80 rounded-lg border border-slate-700/60">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">Role Preview Mode</span>
            <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="w-full text-xs bg-slate-900 border border-slate-700 text-slate-200 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
            aria-label="Select Demo Role"
          >
            <option value="leadership">Leadership View</option>
            <option value="owner">Action Owner View</option>
            <option value="public">Public Transparency</option>
          </select>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-xs font-medium transition-colors ${
                  isActive ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-slate-400">Action Score:</span>
          <span className="font-bold text-indigo-400">{actionScore}/100</span>
        </div>
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="text-slate-400">Compliance Risk:</span>
          <span className={`font-semibold text-xs px-2 py-0.5 rounded ${
            complianceRisk.level === 'HIGH' ? 'bg-red-900/60 text-red-300 border border-red-700' : 'bg-emerald-900/60 text-emerald-300'
          }`}>
            {complianceRisk.level}
          </span>
        </div>
        <button
          onClick={resetDemoData}
          className="w-full flex items-center justify-center space-x-1.5 px-2 py-1.5 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </aside>
  );
}

// ==========================================
// 4. PAGES
// ==========================================

function LandingPage() {
  const { setActiveTab } = useApp();

  const workflowSteps = [
    { title: '1. Audit Uploaded', desc: 'Existing PDF/DOCX report uploaded to digitize recommendations.', icon: FileUp },
    { title: '2. Action Created', desc: 'Recommendations assigned clear Action IDs and scope.', icon: ListChecks },
    { title: '3. Owner Assigned', desc: 'Designated department head & operational lead accountable.', icon: UserCheck },
    { title: '4. Budget & Deadline', desc: 'Approved financial requirements & firm completion targets.', icon: Wallet },
    { title: '5. Implementation', desc: 'Real-time progress tracking & site updates.', icon: Clock },
    { title: '6. Evidence Submitted', desc: 'Before/After documentation uploaded for management review.', icon: ShieldCheck },
    { title: '7. Closed / Escalated', desc: 'Resolved or escalated up leadership chain if delayed.', icon: AlertTriangle }
  ];

  return (
    <div className="space-y-12 max-w-6xl mx-auto py-4">
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-4">
          <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30">
            Civic-Tech Accessibility Accountability Layer
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            From Audit to Action.
          </h1>
          <p className="text-slate-300 text-base md:text-lg">
            Turn accessibility audit recommendations into leadership-owned, budgeted, time-bound, and trackable actions.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => setActiveTab('upload')}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-lg flex items-center space-x-2 transition-transform active:scale-95"
            >
              <span>Upload Audit Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('leadership')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-lg flex items-center space-x-2 transition-colors"
            >
              <span>View Demo Dashboard</span>
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-xs uppercase font-bold text-indigo-600 tracking-wider">The Problem Statement</h2>
          <h3 className="text-2xl font-bold text-slate-900">THE AUDIT-TO-ACTION GAP</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Organisations already receive detailed accessibility audit reports. The breakdown occurs when recommendations stay locked inside PDFs without assigned owners, approved budgets, or executive tracking.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg space-y-2 text-sm border border-slate-200">
            <div className="flex items-center text-emerald-700 font-medium space-x-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Audit Conducted</span>
            </div>
            <div className="flex items-center text-emerald-700 font-medium space-x-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Report Submitted & Recommendations Identified</span>
            </div>
            <div className="flex items-center text-red-600 font-bold space-x-2 pt-1 border-t border-slate-200">
              <XCircle className="w-4 h-4 shrink-0" />
              <span>Implementation & Leadership Follow-up Breakdown</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-slate-50 p-6 md:p-8 rounded-xl border border-indigo-100 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h2 className="text-xs uppercase font-bold text-indigo-600 tracking-wider">Product Differentiator</h2>
            <h3 className="text-2xl font-bold text-slate-900">Don't create another audit. Create accountability for the audit that already exists.</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              InclusiveX does not conduct audits or replace certified inspectors. It is the digital management layer that enforces budget allocation, deadlines, evidence submission, and escalation logic.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6 bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900">Core Workflow Engine</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workflowSteps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{s.title}</h4>
                <p className="text-xs text-slate-500 leading-normal">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function AuditUploadPage() {
  const { auditInfo, setAuditInfo, setActiveTab } = useApp();
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleSimulatedUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploaded(true);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Upload Accessibility Audit</h1>
        <p className="text-xs text-slate-500">Start by converting an existing accessibility audit report into actionable digital items.</p>
      </div>

      <div className="bg-white p-8 rounded-xl border-2 border-dashed border-slate-300 hover:border-indigo-500 transition-colors text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
          <Upload className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-800">Drag & drop your audit report here (PDF, DOCX)</p>
          <p className="text-xs text-slate-400">Supported format: PDF, DOCX up to 25MB</p>
        </div>
        <input 
          type="file" 
          onChange={(e) => setFileName(e.target.files[0]?.name || 'Audit_Report_2026.pdf')} 
          className="hidden" 
          id="audit-file-input"
        />
        <label 
          htmlFor="audit-file-input"
          className="inline-block px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md cursor-pointer"
        >
          Browse Files
        </label>
        {fileName && <p className="text-xs text-indigo-600 font-medium">Selected file: {fileName}</p>}
      </div>

      <form onSubmit={handleSimulatedUpload} className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
        <h2 className="text-xs uppercase font-bold text-slate-500 tracking-wider">Audit Metadata</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Organisation Name</label>
            <input 
              type="text" 
              value={auditInfo.orgName} 
              onChange={e => setAuditInfo({...auditInfo, orgName: e.target.value})}
              className="w-full border border-slate-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Building / Institution</label>
            <input 
              type="text" 
              value={auditInfo.buildingName} 
              onChange={e => setAuditInfo({...auditInfo, buildingName: e.target.value})}
              className="w-full border border-slate-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Audit Agency / Auditor</label>
            <input 
              type="text" 
              value={auditInfo.auditorAgency} 
              onChange={e => setAuditInfo({...auditInfo, auditorAgency: e.target.value})}
              className="w-full border border-slate-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Report Reference No.</label>
            <input 
              type="text" 
              value={auditInfo.reportRef} 
              onChange={e => setAuditInfo({...auditInfo, reportRef: e.target.value})}
              className="w-full border border-slate-300 rounded p-2"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          {isUploading ? <span>Extracting Audit Recommendations...</span> : (
            <>
              <FileText className="w-4 h-4" />
              <span>Process Audit & Generate Action Plan</span>
            </>
          )}
        </button>
      </form>

      {uploaded && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>Report uploaded successfully. 27 Action Items digitized.</span>
          </div>
          <button
            onClick={() => setActiveTab('actions')}
            className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded hover:bg-emerald-700 flex items-center space-x-1"
          >
            <span>View Action Plan</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}

function ActionPlanPage() {
  const { actions, updateActionStatus, addEvidence, escalateAction } = useApp();
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedAction, setSelectedAction] = useState(null);
  const [evidenceFileName, setEvidenceFileName] = useState('');

  const total = actions.length;
  const critical = actions.filter(a => a.priority === 'Critical').length;
  const completed = actions.filter(a => a.status === 'Completed').length;
  const inProgress = actions.filter(a => a.status === 'In Progress').length;
  const overdue = actions.filter(a => a.status === 'Overdue').length;

  const filteredActions = actions.filter(a => {
    const matchesSearch = a.recommendation.toLowerCase().includes(search.toLowerCase()) || 
                          a.id.toLowerCase().includes(search.toLowerCase()) ||
                          a.department.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || a.priority === priorityFilter;
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const handleUploadEvidence = (e) => {
    e.preventDefault();
    if (!evidenceFileName || !selectedAction) return;
    addEvidence(selectedAction.id, evidenceFileName);
    setEvidenceFileName('');
    setSelectedAction(prev => actions.find(a => a.id === prev.id));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Accessibility Action Plan</h1>
        <p className="text-slate-500 text-xs">Converted recommendations from uploaded audit report</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <div className="bg-white p-3 rounded-lg border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500">Total Items</span>
          <p className="text-xl font-bold text-slate-900">{total}</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-red-200 bg-red-50/20">
          <span className="text-[11px] font-semibold text-red-600">Critical Priority</span>
          <p className="text-xl font-bold text-red-700">{critical}</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-emerald-200 bg-emerald-50/20">
          <span className="text-[11px] font-semibold text-emerald-600">Completed</span>
          <p className="text-xl font-bold text-emerald-700">{completed}</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-blue-200 bg-blue-50/20">
          <span className="text-[11px] font-semibold text-blue-600">In Progress</span>
          <p className="text-xl font-bold text-blue-700">{inProgress}</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-red-300 bg-red-100/40">
          <span className="text-[11px] font-semibold text-red-700">Overdue</span>
          <p className="text-xl font-bold text-red-800">{overdue}</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500">Execution Rate</span>
          <p className="text-xl font-bold text-slate-800">{Math.round((completed/total)*100)}%</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search action ID, recommendation, dept..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <select 
            value={priorityFilter} 
            onChange={e => setPriorityFilter(e.target.value)}
            className="text-xs border border-slate-300 rounded-md px-2 py-1.5 text-slate-700"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
          </select>
          <select 
            value={statusFilter} 
            onChange={e => setStatusFilter(e.target.value)}
            className="text-xs border border-slate-300 rounded-md px-2 py-1.5 text-slate-700"
          >
            <option value="All">All Statuses</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Evidence Submitted">Evidence Submitted</option>
            <option value="Completed">Completed</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-600 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Action ID</th>
                <th className="p-3">Audit Recommendation</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Department / Owner</th>
                <th className="p-3">Deadline</th>
                <th className="p-3">Budget</th>
                <th className="p-3">Status</th>
                <th className="p-3">Escalation Level</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredActions.map(act => (
                <tr key={act.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-indigo-950">{act.id}</td>
                  <td className="p-3 max-w-xs leading-relaxed font-medium">
                    {act.recommendation}
                    <span className="block text-[10px] text-slate-400 mt-0.5">{act.sourcePage}</span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      act.priority === 'Critical' ? 'bg-red-100 text-red-700 border border-red-200' :
                      act.priority === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {act.priority}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="font-semibold">{act.department}</div>
                    <div className="text-[10px] text-slate-500">{act.owner}</div>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`font-semibold ${act.status === 'Overdue' ? 'text-red-600 font-bold' : 'text-slate-700'}`}>
                      {act.deadline}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <div>₹{act.estimatedCost.toLocaleString('en-IN')}</div>
                    <span className="text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium border border-emerald-100">
                      {act.budgetStatus}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      act.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                      act.status === 'Overdue' ? 'bg-red-100 text-red-800 border border-red-200 animate-pulse' :
                      act.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {act.status}
                    </span>
                  </td>
                  <td className="p-3 text-[11px] font-medium text-slate-600">
                    {act.escalationLevel}
                  </td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => setSelectedAction(act)}
                      className="px-2.5 py-1 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded transition-colors inline-flex items-center space-x-1"
                    >
                      <span>Inspect</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedAction && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex justify-end">
          <div className="w-full max-w-2xl bg-white h-full overflow-y-auto p-6 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-bold text-indigo-600">ACTION CASE #{selectedAction.id}</span>
                  <h2 className="text-lg font-bold text-slate-900">{selectedAction.recommendation}</h2>
                  <p className="text-xs text-slate-500">Source: Uploaded Audit Report ({selectedAction.sourcePage})</p>
                </div>
                <button
                  onClick={() => setSelectedAction(null)}
                  className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded font-semibold text-slate-600"
                >
                  Close
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-2">6-Step Action Progress</h3>
                <ActionTrackerStep status={selectedAction.status} />
              </div>

              <div className="p-4 bg-indigo-50/40 rounded-xl border border-indigo-100 space-y-4">
                <h3 className="text-xs uppercase font-bold text-indigo-900 tracking-wider">Update Implementation Status</h3>
                <div className="flex flex-wrap gap-2">
                  {['In Progress', 'Evidence Submitted', 'Completed', 'Overdue'].map(st => (
                    <button
                      key={st}
                      onClick={() => {
                        updateActionStatus(selectedAction.id, st);
                        setSelectedAction(prev => ({ ...prev, status: st }));
                      }}
                      className={`px-3 py-1.5 text-xs font-semibold rounded border ${
                        selectedAction.status === st ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      Set: {st}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-indigo-100 space-y-2">
                  <label className="text-xs font-semibold text-slate-800 block">Submit Implementation Evidence</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g., entrance_ramp_after_photos.pdf" 
                      value={evidenceFileName}
                      onChange={e => setEvidenceFileName(e.target.value)}
                      className="text-xs border border-slate-300 rounded px-3 py-1.5 flex-1"
                    />
                    <button 
                      onClick={handleUploadEvidence}
                      className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded hover:bg-indigo-700 flex items-center space-x-1"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Submit</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-50/50 rounded-xl border border-red-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-red-800 block">Escalation Engine</span>
                  <span className="text-[11px] text-slate-600">Current Tier: {selectedAction.escalationLevel}</span>
                </div>
                <button
                  onClick={() => {
                    escalateAction(selectedAction.id);
                    setSelectedAction(prev => ({ ...prev, escalationLevel: 'Nodal Officer Escalated' }));
                  }}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded shadow-xs"
                >
                  Escalate Tier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LeadershipDashboard() {
  const { actions, actionScore, complianceRisk, auditInfo, isCommitmentApproved, setIsCommitmentApproved } = useApp();

  const completed = actions.filter(a => a.status === 'Completed').length;
  const inProgress = actions.filter(a => a.status === 'In Progress').length;
  const overdue = actions.filter(a => a.status === 'Overdue').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-2">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Leadership Executive Overview</h1>
        <p className="text-slate-500 text-xs">Turn accessibility audit recommendations into executive management decisions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-5 rounded-xl shadow-md space-y-3 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs uppercase font-bold text-indigo-300 tracking-wider">Action Score</span>
            <span className="text-[10px] bg-indigo-800 text-indigo-200 px-2 py-0.5 rounded font-mono">0-100 Index</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-black">{actionScore}</span>
            <span className="text-indigo-300 text-sm">/ 100</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-normal">Reflects implementation progress from uploaded audit report.</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">Compliance Risk</span>
            <ShieldAlert className={`w-5 h-5 ${complianceRisk.level === 'HIGH' ? 'text-red-600' : 'text-emerald-600'}`} />
          </div>
          <div className="text-3xl font-black text-slate-900">{complianceRisk.level}</div>
          <p className="text-[11px] text-slate-600 font-medium">{complianceRisk.reason}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">Total Audit Items</span>
          <div className="text-3xl font-black text-slate-900">{actions.length}</div>
          <div className="text-[11px] text-slate-500">{completed} Completed | {inProgress} In Progress</div>
        </div>

        <div className="bg-red-50 p-5 rounded-xl border border-red-200 shadow-xs space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-xs uppercase font-bold text-red-700 tracking-wider">Overdue Actions</span>
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div className="text-3xl font-black text-red-700">{overdue}</div>
          <p className="text-[11px] text-red-800 font-medium">Requires immediate nodal escalation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm uppercase font-bold text-slate-900 tracking-wider">Budget Allocation Breakdown</h2>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Total Implementation Estimate:</span>
              <span className="font-bold">₹{auditInfo.budgetTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Approved Budget:</span>
              <span>₹{auditInfo.budgetApproved.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-amber-700 font-semibold">
              <span>Pending Approval:</span>
              <span>₹{auditInfo.budgetPending.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div className="bg-indigo-950 text-white p-6 rounded-xl shadow-md space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold text-indigo-300 tracking-wider">Executive Commitment</span>
            <h3 className="text-lg font-bold">Executive Accessibility Action Commitment</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              "The organisation acknowledges recommendations contained in the uploaded accessibility audit and commits to establishing a time-bound implementation plan."
            </p>
          </div>
          <div className="pt-3 border-t border-indigo-900 flex items-center justify-between">
            {isCommitmentApproved ? (
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>Action Plan Formally Approved by Leadership</span>
              </div>
            ) : (
              <button
                onClick={() => setIsCommitmentApproved(true)}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg shadow-sm transition-transform active:scale-95"
              >
                Approve Action Plan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ComplianceRiskPage() {
  const { actions, complianceRisk, actionScore } = useApp();
  const overdueTotal = actions.filter(a => a.status === 'Overdue');

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Compliance & Risk Exposure Matrix</h1>
        <p className="text-xs text-slate-500">Real-time assessment of operational delays against statutory standards.</p>
      </div>

      <div className={`p-6 rounded-xl border ${complianceRisk.level === 'HIGH' ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'} flex items-center justify-between`}>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <ShieldAlert className={`w-6 h-6 ${complianceRisk.level === 'HIGH' ? 'text-red-600' : 'text-emerald-600'}`} />
            <h2 className="text-lg font-bold text-slate-900">Current Risk Rating: {complianceRisk.level}</h2>
          </div>
          <p className="text-xs text-slate-600">{complianceRisk.reason}</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Action Index</span>
          <span className="text-2xl font-black text-indigo-900">{actionScore}/100</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Unresolved High-Risk Items ({overdueTotal.length})</h3>
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
            <tr>
              <th className="p-3">Action ID</th>
              <th className="p-3">Recommendation</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Department</th>
              <th className="p-3">Deadline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {overdueTotal.map(act => (
              <tr key={act.id}>
                <td className="p-3 font-bold text-red-900">{act.id}</td>
                <td className="p-3">{act.recommendation}</td>
                <td className="p-3 font-bold text-red-700">{act.priority}</td>
                <td className="p-3">{act.department}</td>
                <td className="p-3 font-bold text-red-700">{act.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EscalationsPage() {
  const { actions, escalateAction } = useApp();
  const escalatedActions = actions.filter(a => a.status === 'Overdue' || a.escalationLevel !== 'Department Owner');

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Accountability & Escalation Engine</h1>
        <p className="text-xs text-slate-500">Automated governance path for overdue accessibility items.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Active Escalation Alerts ({escalatedActions.length})</h3>
        <div className="space-y-4">
          {escalatedActions.map(act => (
            <div key={act.id} className="p-4 bg-red-50/40 rounded-xl border border-red-200 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-indigo-950">{act.id}</span> — {act.recommendation}
                <div className="text-slate-500">Owner: {act.owner} | Deadline: {act.deadline}</div>
              </div>
              <button
                onClick={() => escalateAction(act.id)}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded flex items-center space-x-1"
              >
                <span>Escalate Tier</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PublicTransparency() {
  const { actions, auditInfo, actionScore } = useApp();
  const completed = actions.filter(a => a.status === 'Completed').length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2">
      <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3">
        <span className="text-xs text-indigo-400 font-bold uppercase">Public Accessibility Progress Portal</span>
        <h1 className="text-3xl font-bold">{auditInfo.orgName}</h1>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Public Action Directory</h2>
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px]">
            <tr>
              <th className="p-3">Ref ID</th>
              <th className="p-3">Recommendation</th>
              <th className="p-3">Department</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {actions.map(act => (
              <tr key={act.id}>
                <td className="p-3 font-bold text-indigo-900">{act.id}</td>
                <td className="p-3">{act.recommendation}</td>
                <td className="p-3">{act.department}</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded font-bold bg-blue-100 text-blue-800">{act.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PolicyPilotPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3">
        <span className="text-xs uppercase font-bold text-indigo-400">Proposed Policy Framework</span>
        <h1 className="text-3xl font-bold">Make Accessibility Implementation Accountable</h1>
      </div>
      <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-200 space-y-4">
        <div className="flex items-center space-x-2">
          <Flag className="w-5 h-5 text-indigo-700" />
          <h2 className="text-base font-bold text-indigo-950">90-Day Implementation Pilot (Jamshedpur Region)</h2>
        </div>
        <p className="text-xs text-slate-600">Target Scope: 10 Public & Healthcare Institutions in Jamshedpur.</p>
      </div>
    </div>
  );
}

function SettingsPage() {
  const { role, setRole, resetDemoData, actions } = useApp();

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Settings & Data Control</h1>
        <p className="text-xs text-slate-500">Configure role testing environments and reset local data stores.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
        <div className="flex items-center space-x-2">
          <UserCheck className="w-5 h-5 text-indigo-600" />
          <h2 className="text-sm font-bold text-slate-900">Role Preview Configuration</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {['leadership', 'owner', 'public'].map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`p-4 rounded-lg border text-left text-xs font-bold capitalize ${role === r ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 bg-slate-50'}`}
            >
              {r} View
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
        <div>
          <span className="font-semibold text-slate-800">Active Records:</span>
          <span className="text-slate-600 ml-2">{actions.length} Action Items in LocalStorage</span>
        </div>
        <button onClick={resetDemoData} className="px-3 py-1.5 bg-red-600 text-white font-bold rounded flex items-center space-x-1">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 5. MAIN ROUTER & APP CONTAINER
// ==========================================
function MainContent() {
  const { activeTab } = useApp();

  return (
    <main className="flex-1 bg-slate-100 overflow-y-auto p-4 md:p-8">
      {activeTab === 'overview' && <LandingPage />}
      {activeTab === 'upload' && <AuditUploadPage />}
      {activeTab === 'actions' && <ActionPlanPage />}
      {activeTab === 'leadership' && <LeadershipDashboard />}
      {activeTab === 'policy' && <PolicyPilotPage />}
      {activeTab === 'risk' && <ComplianceRiskPage />}
      {activeTab === 'escalations' && <EscalationsPage />}
      {activeTab === 'public' && <PublicTransparency />}
      {activeTab === 'settings' && <SettingsPage />}
    </main>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="flex h-screen bg-slate-900 font-sans text-slate-800 antialiased overflow-hidden">
        <Navigation />
        <MainContent />
      </div>
    </AppProvider>
  );
}

// Uncomment below if putting directly in main.jsx:
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
