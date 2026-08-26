import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

const seedReports = [
  {
    id: "INC-2026-00124",
    title: "Wheelchair ramp is blocked",
    place: "ABC Hospital",
    location: "Jamshedpur",
    category: "Ramp",
    severity: "High",
    status: "Act",
    authority: "City Accessibility Authority",
    officer: "Rajesh Kumar",
    deadline: "2026-09-05",
    created: "2026-08-26",
    description: "The main wheelchair ramp is blocked, making the entrance difficult to access.",
    photo: "",
    timeline: [
      ["Identify", "26 Aug 2026", "Report submitted"],
      ["Audit", "27 Aug 2026", "Issue audited and marked High"],
      ["Assign", "28 Aug 2026", "Assigned to City Accessibility Authority"],
      ["Act", "28 Aug 2026", "Action is in progress"],
    ],
    reviews: []
  },
  {
    id: "INC-2026-00125",
    title: "Accessible toilet signage missing",
    place: "XYZ College",
    location: "Jamshedpur",
    category: "Signage",
    severity: "Medium",
    status: "Verify",
    authority: "XYZ College Administration",
    officer: "Anita Singh",
    deadline: "2026-08-30",
    created: "2026-08-20",
    description: "Accessible toilet exists but the entrance signage is unclear.",
    photo: "",
    timeline: [
      ["Identify", "20 Aug 2026", "Report submitted"],
      ["Audit", "21 Aug 2026", "Issue audited and marked Medium"],
      ["Assign", "21 Aug 2026", "College administration assigned"],
      ["Act", "24 Aug 2026", "New signage installed"],
      ["Monitor", "25 Aug 2026", "Action monitored"],
      ["Verify", "26 Aug 2026", "Waiting for user verification"],
    ],
    reviews: []
  },
  {
    id: "INC-2026-00126",
    title: "Lift is not working",
    place: "City Railway Station",
    location: "Jamshedpur",
    category: "Lift",
    severity: "Critical",
    status: "Escalated",
    authority: "Railway Station Management",
    officer: "Sanjay Verma",
    deadline: "2026-08-24",
    created: "2026-08-18",
    description: "The accessible lift near Platform 1 is currently not operational.",
    photo: "",
    timeline: [
      ["Identify", "18 Aug 2026", "Report submitted"],
      ["Audit", "19 Aug 2026", "Issue marked Critical"],
      ["Assign", "19 Aug 2026", "Assigned to station management"],
      ["Act", "20 Aug 2026", "Repair requested"],
      ["Monitor", "24 Aug 2026", "Deadline missed"],
      ["Escalate", "25 Aug 2026", "Escalated to Divisional Authority"],
    ],
    reviews: []
  }
];

const categories = ["Entrance", "Ramp", "Lift", "Accessible Toilet", "Signage", "Parking", "Pathway", "Hearing", "Visual", "Digital", "Other"];
const stages = ["Identify", "Audit", "Assign", "Act", "Monitor", "Verify"];

const styles = `
:root{
  font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  color:#172033;background:#f6f8fb;font-synthesis:none;
}
*{box-sizing:border-box}
body{margin:0;background:#f6f8fb}
button,input,textarea,select{font:inherit}
button{cursor:pointer}
.app{min-height:100vh}
.nav{height:72px;background:#fff;border-bottom:1px solid #e7ebf1;display:flex;align-items:center;justify-content:space-between;padding:0 5%;position:sticky;top:0;z-index:20}
.logo{display:flex;align-items:center;gap:10px;font-weight:850;font-size:21px;color:#172033}
.logoMark{width:38px;height:38px;border-radius:12px;background:#172033;color:#fff;display:grid;place-items:center}
.navLinks{display:flex;gap:6px;align-items:center}
.nav button,.navLink{border:0;background:transparent;padding:10px 13px;border-radius:10px;color:#566174}
.nav button:hover,.navLink:hover{background:#f1f4f8;color:#172033}
.nav .primary{background:#172033;color:#fff}
.container{width:min(1160px,92%);margin:auto}
.hero{padding:72px 0 55px;background:linear-gradient(180deg,#fff 0%,#f6f8fb 100%)}
.heroGrid{display:grid;grid-template-columns:1.2fr .8fr;gap:42px;align-items:center}
.eyebrow{display:inline-flex;padding:7px 11px;border-radius:999px;background:#eef2f7;color:#4c586b;font-weight:700;font-size:13px}
h1{font-size:clamp(42px,6vw,72px);line-height:1.02;letter-spacing:-.045em;margin:17px 0}
h2{font-size:32px;letter-spacing:-.025em;margin:0 0 12px}
h3{margin:0 0 8px}
.hero p{font-size:18px;line-height:1.65;color:#647084;max-width:650px}
.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:27px}
.btn{border:1px solid #dce2ea;background:#fff;color:#172033;padding:12px 17px;border-radius:12px;font-weight:750;transition:.18s}
.btn:hover{transform:translateY(-1px);box-shadow:0 8px 22px #17203312}
.btn.dark{background:#172033;color:#fff;border-color:#172033}
.btn.danger{background:#fff1f1;border-color:#ffd2d2;color:#b42318}
.btn.success{background:#effaf3;border-color:#ccebd6;color:#137333}
.btn.small{padding:8px 11px;font-size:13px}
.heroCard{background:#172033;color:#fff;border-radius:24px;padding:27px;box-shadow:0 22px 60px #17203320}
.heroCard h3{font-size:21px}
.flow{display:grid;gap:12px;margin-top:20px}
.flowRow{display:flex;align-items:center;gap:12px}
.flowIcon{width:36px;height:36px;border-radius:11px;background:#ffffff14;display:grid;place-items:center}
.flowText{font-weight:700}.flowSub{color:#aeb8c9;font-size:12px}
.section{padding:55px 0}
.sectionHead{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:22px}
.muted{color:#6b7587}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:15px}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:17px}
.grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
.card{background:#fff;border:1px solid #e6eaf0;border-radius:18px;padding:21px;box-shadow:0 5px 25px #17203306}
.actionCard{min-height:150px}.actionIcon{font-size:28px;margin-bottom:16px}
.actionCard p,.reportCard p{color:#6b7587;line-height:1.55}
.reportCard{display:flex;flex-direction:column;gap:12px}
.reportTop{display:flex;justify-content:space-between;gap:12px}
.pill{display:inline-flex;align-items:center;gap:5px;padding:6px 9px;border-radius:999px;font-size:12px;font-weight:800;background:#f0f3f7;color:#4d596c}
.pill.high{background:#fff3df;color:#a45a00}.pill.critical{background:#fff0f0;color:#b42318}.pill.low{background:#effaf3;color:#137333}.pill.medium{background:#fff8d9;color:#856404}
.meta{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;font-size:13px}.meta strong{display:block;color:#1e293b}.meta span{color:#6b7587}
.page{padding:40px 0 70px}.pageTitle{margin-bottom:26px}
.form{max-width:760px}.field{display:grid;gap:7px;margin-bottom:18px}.field label{font-weight:750}.field small{color:#7b8493}
input,textarea,select{width:100%;border:1px solid #dce2ea;border-radius:11px;padding:12px 13px;background:#fff;color:#172033;outline:none}
input:focus,textarea:focus,select:focus{border-color:#172033;box-shadow:0 0 0 3px #17203312}
textarea{min-height:120px;resize:vertical}
.categoryGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.category{padding:13px;border:1px solid #dce2ea;border-radius:12px;background:#fff;text-align:left}
.category.selected{border-color:#172033;background:#f0f3f7;font-weight:800}
.notice{padding:14px 16px;border-radius:12px;background:#eef5ff;color:#28558c;margin-bottom:18px}
.successBox{padding:20px;border-radius:16px;background:#effaf3;border:1px solid #ccebd6;color:#137333}
.dashboardStats{display:grid;grid-template-columns:repeat(5,1fr);gap:13px;margin-bottom:22px}
.stat strong{font-size:28px;display:block;margin-top:8px}
.stat small{color:#6b7587}
.tracker{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;margin:22px 0}
.step{position:relative;text-align:center}.stepCircle{width:38px;height:38px;border-radius:50%;margin:auto;display:grid;place-items:center;background:#e8edf3;color:#657084;font-weight:800}.step.done .stepCircle{background:#172033;color:#fff}.step.active .stepCircle{background:#fff;border:3px solid #172033;color:#172033}.stepLabel{font-size:12px;font-weight:800;margin-top:8px}.stepLine{height:2px;background:#e0e5eb;position:absolute;top:19px;left:50%;width:100%;z-index:-1}.step:last-child .stepLine{display:none}.step.done .stepLine{background:#172033}
.detailGrid{display:grid;grid-template-columns:1.5fr .8fr;gap:20px}.sideStack{display:grid;gap:16px}.kv{display:flex;justify-content:space-between;gap:10px;padding:10px 0;border-bottom:1px solid #edf0f4}.kv:last-child{border-bottom:0}
.timeline{display:grid;gap:0}.timelineItem{display:grid;grid-template-columns:28px 1fr;gap:12px;position:relative;padding-bottom:20px}.timelineDot{width:12px;height:12px;background:#172033;border-radius:50%;margin-top:5px}.timelineItem:not(:last-child):before{content:"";position:absolute;left:5px;top:16px;bottom:0;width:2px;background:#e0e5eb}.timelineItem small{color:#7a8493}
.login{min-height:calc(100vh - 72px);display:grid;place-items:center;padding:35px 0}.loginCard{width:min(620px,94%);background:#fff;border:1px solid #e5e9ef;border-radius:22px;padding:30px}.roleGrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:20px 0}.role{border:1px solid #dce2ea;background:#fff;border-radius:15px;padding:18px;text-align:left}.role.selected{border-color:#172033;background:#f2f4f7}.role strong{display:block;margin-bottom:5px}
.tableWrap{overflow:auto}.table{width:100%;border-collapse:collapse}.table th,.table td{text-align:left;padding:13px;border-bottom:1px solid #edf0f4;white-space:nowrap}.table th{font-size:12px;text-transform:uppercase;color:#768093}
.score{font-size:54px;font-weight:900;letter-spacing:-.05em}.bar{height:9px;background:#edf0f4;border-radius:99px;overflow:hidden}.bar span{display:block;height:100%;background:#172033;border-radius:99px}
.feedbackFloat{position:fixed;right:20px;bottom:20px;z-index:30;border:0;border-radius:999px;background:#172033;color:#fff;padding:13px 17px;font-weight:800;box-shadow:0 12px 35px #17203330}
.modalBack{position:fixed;inset:0;background:#17203355;display:grid;place-items:center;padding:20px;z-index:50}.modal{width:min(520px,100%);background:#fff;border-radius:20px;padding:24px;max-height:90vh;overflow:auto}
.footer{padding:35px 0;border-top:1px solid #e5e9ef;color:#7a8493}
.toast{position:fixed;top:88px;right:20px;background:#172033;color:#fff;padding:13px 17px;border-radius:12px;z-index:60;box-shadow:0 12px 35px #17203330}
@media(max-width:900px){.heroGrid,.detailGrid{grid-template-columns:1fr}.grid4{grid-template-columns:repeat(2,1fr)}.grid3{grid-template-columns:1fr 1fr}.dashboardStats{grid-template-columns:repeat(3,1fr)}.navLinks button:nth-child(n+4){display:none}}
@media(max-width:650px){.nav{padding:0 4%}.navLinks button:not(.primary){display:none}.hero{padding-top:48px}.grid4,.grid3,.grid2,.dashboardStats,.categoryGrid,.roleGrid{grid-template-columns:1fr}.tracker{grid-template-columns:repeat(3,1fr);row-gap:22px}.stepLine{display:none}.section{padding:40px 0}h1{font-size:46px}.feedbackFloat{right:12px;bottom:12px}.meta{grid-template-columns:1fr}}
`;

function loadReports() {
  try {
    const saved = localStorage.getItem("inclusivex_reports");
    return saved ? JSON.parse(saved) : seedReports;
  } catch { return seedReports; }
}

function daysLeft(deadline) {
  const d = new Date(deadline + "T23:59:59");
  return Math.ceil((d - new Date()) / 86400000);
}

function severityClass(s) {
  return String(s).toLowerCase();
}

function App() {
  const [reports, setReports] = useState(loadReports);
  const [page, setPage] = useState("home");
  const [selectedId, setSelectedId] = useState(null);
  const [role, setRole] = useState(null);
  const [toast, setToast] = useState("");
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [loginRole, setLoginRole] = useState("user");
  const [reportForm, setReportForm] = useState({ title:"", place:"", location:"", category:"Ramp", description:"", photo:"" });
  const [search, setSearch] = useState("");
  const [review, setReview] = useState({ vote:"", comment:"" });
  const [complaint, setComplaint] = useState("");
  const [adminDraft, setAdminDraft] = useState(null);

  useEffect(() => {
    localStorage.setItem("inclusivex_reports", JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  // Automatic overdue detection + escalation demo.
  useEffect(() => {
    const now = new Date();
    setReports(prev => prev.map(r => {
      if (!["Resolved", "Escalated"].includes(r.status) && new Date(r.deadline + "T23:59:59") < now) {
        const already = r.timeline.some(x => x[0] === "Escalate");
        if (already) return r;
        return {
          ...r,
          status: "Escalated",
          authority: "Higher District Authority",
          officer: "Escalation Officer",
          deadline: new Date(Date.now() + 7*86400000).toISOString().slice(0,10),
          timeline: [...r.timeline, ["Escalate", new Date().toLocaleDateString("en-IN", {day:"2-digit",month:"short",year:"numeric"}), "Deadline missed — automatically escalated to Higher District Authority"]]
        };
      }
      return r;
    }));
  }, []);

  const selected = reports.find(r => r.id === selectedId);
  const activeReports = reports.filter(r => !["Resolved"].includes(r.status));
  const overdue = reports.filter(r => !["Resolved","Escalated"].includes(r.status) && daysLeft(r.deadline) < 0).length;
  const escalated = reports.filter(r => r.status === "Escalated").length;

  const show = p => { setPage(p); window.scrollTo({top:0,behavior:"smooth"}); };

  function openReport(id) {
    setSelectedId(id);
    setAdminDraft(reports.find(r => r.id === id));
    show("detail");
  }

  function submitReport(e) {
    e.preventDefault();
    if (!reportForm.title || !reportForm.place || !reportForm.description) {
      setToast("Please fill the required fields.");
      return;
    }
    const id = `INC-2026-${String(Date.now()).slice(-5)}`;
    const report = {
      ...reportForm,
      id,
      severity:"Pending Audit",
      status:"Identify",
      authority:"Awaiting assignment",
      officer:"Not assigned",
      deadline:new Date(Date.now()+7*86400000).toISOString().slice(0,10),
      created:new Date().toISOString().slice(0,10),
      timeline:[["Identify",new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}),"Report submitted and waiting for audit"]],
      reviews:[]
    };
    setReports(prev => [report,...prev]);
    setReportForm({title:"",place:"",location:"",category:"Ramp",description:"",photo:""});
    setSelectedId(id);
    setToast("Report submitted successfully.");
    show("detail");
  }

  function updateReport(patch) {
    if (!selectedId) return;
    setReports(prev => prev.map(r => r.id === selectedId ? {...r,...patch} : r));
    setAdminDraft(prev => ({...prev,...patch}));
    setToast("Report updated.");
  }

  function submitReview() {
    if (!review.vote) return setToast("Please choose Yes or No.");
    const text = review.comment.trim();
    setReports(prev => prev.map(r => r.id === selectedId ? {
      ...r,
      reviews:[...(r.reviews||[]),{vote:review.vote,comment:text,date:new Date().toISOString()}],
      status:review.vote === "yes" ? "Resolved" : "Act",
      timeline:[...r.timeline,["Verify",new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}),review.vote === "yes" ? "User verified the issue as resolved" : "User reported that the issue is still not resolved"]]
    } : r));
    setReview({vote:"",comment:""});
    setToast(review.vote === "yes" ? "Thanks — issue verified as resolved." : "Thanks — the issue will remain active.");
  }

  const filtered = useMemo(() => reports.filter(r =>
    `${r.id} ${r.title} ${r.place} ${r.location} ${r.category}`.toLowerCase().includes(search.toLowerCase())
  ), [reports, search]);

  function Header() {
    return <header className="nav">
      <button className="logo" onClick={() => show("home")} aria-label="InclusiveX home">
        <span className="logoMark">IX</span> InclusiveX
      </button>
      <nav className="navLinks">
        <button onClick={() => show("home")}>Home</button>
        <button onClick={() => show("report")}>Report</button>
        <button onClick={() => show("track")}>Track Reports</button>
        <button onClick={() => show("scores")}>See Scores</button>
        <button onClick={() => show("reviews")}>Reviews</button>
        <button onClick={() => show("complaints")}>Complaints</button>
        <button className="primary" onClick={() => show(role ? "dashboard" : "login")}>{role ? `${role === "admin" ? "Admin" : "User"} Dashboard` : "Login"}</button>
      </nav>
    </header>
  }

  function Home() {
    return <>
      <section className="hero">
        <div className="container heroGrid">
          <div>
            <span className="eyebrow">Accessibility • Action • Accountability</span>
            <h1>Is this place accessible?</h1>
            <p>Report accessibility problems, see how the audit is moving, know who is responsible, follow the deadline, and verify whether the problem was actually fixed.</p>
            <div className="actions">
              <button className="btn dark" onClick={() => show("report")}>📝 Report a Problem</button>
              <button className="btn" onClick={() => show("track")}>🔍 Check a Report</button>
              <button className="btn" onClick={() => show("scores")}>📊 See Scores</button>
              <button className="btn" onClick={() => show("reviews")}>⭐ Reviews</button>
            </div>
          </div>
          <div className="heroCard">
            <h3>Nothing should disappear after it is reported.</h3>
            <div className="flow">
              {["Report","Audit","Assign","Act","Monitor","Verify"].map((x,i)=><div className="flowRow" key={x}><div className="flowIcon">{["📝","🔎","👤","🛠️","⏱️","✓"][i]}</div><div><div className="flowText">{x}</div><div className="flowSub">{["Problem is recorded","Severity is decided","Responsibility is clear","Work begins","Deadline is watched","User confirms"][i]}</div></div></div>)}
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="sectionHead"><div><h2>What can you do?</h2><div className="muted">Everything important is one click away.</div></div></div>
          <div className="grid4">
            {[
              ["📝","Report","Tell us about an accessibility problem.","report"],
              ["🔎","Track","See audit stage, authority and deadline.","track"],
              ["📊","See Scores","Understand accessibility performance.","scores"],
              ["💡","Feedback & Ideas","Tell us what should be better.","feedback"]
            ].map(([icon,title,text,p])=><button className="card actionCard" key={title} onClick={()=>show(p)} style={{textAlign:"left",border:"1px solid #e6eaf0"}}><div className="actionIcon">{icon}</div><h3>{title}</h3><p>{text}</p></button>)}
          </div>
        </div>
      </section>
      <section className="section" style={{paddingTop:0}}>
        <div className="container">
          <div className="sectionHead"><div><h2>Recent accessibility issues</h2><div className="muted">Follow real-time demo cases.</div></div><button className="btn small" onClick={()=>show("track")}>View all</button></div>
          <div className="grid3">{reports.slice(0,3).map(r=><ReportCard key={r.id} report={r}/>)}</div>
        </div>
      </section>
    </>
  }

  function ReportCard({report:r}) {
    const left = daysLeft(r.deadline);
    return <div className="card reportCard">
      <div className="reportTop"><span className={`pill ${severityClass(r.severity)}`}>{r.severity}</span><span className="pill">{r.status}</span></div>
      <div><h3>{r.title}</h3><p>{r.place} • {r.location}</p></div>
      <div className="meta">
        <div><span>Responsible</span><strong>{r.authority}</strong></div>
        <div><span>Deadline</span><strong>{r.deadline}</strong></div>
        <div><span>Officer</span><strong>{r.officer}</strong></div>
        <div><span>Time</span><strong>{left < 0 ? `${Math.abs(left)}d overdue` : `${left}d left`}</strong></div>
      </div>
      <button className="btn small" onClick={()=>openReport(r.id)}>View Full Report →</button>
    </div>
  }

  function ReportPage() {
    return <div className="page"><div className="container">
      <div className="pageTitle"><h2>Report an Accessibility Problem</h2><p className="muted">You don't need to know technical accessibility terms. Just tell us what you found.</p></div>
      <div className="card form">
        <form onSubmit={submitReport}>
          <div className="field"><label>What did you find? *</label><input placeholder="Example: Ramp is blocked" value={reportForm.title} onChange={e=>setReportForm({...reportForm,title:e.target.value})}/></div>
          <div className="grid2">
            <div className="field"><label>Where is the problem? *</label><input placeholder="Example: ABC Hospital" value={reportForm.place} onChange={e=>setReportForm({...reportForm,place:e.target.value})}/></div>
            <div className="field"><label>Location</label><input placeholder="City / area" value={reportForm.location} onChange={e=>setReportForm({...reportForm,location:e.target.value})}/></div>
          </div>
          <div className="field"><label>What type of problem?</label><div className="categoryGrid">{categories.map(c=><button type="button" className={`category ${reportForm.category===c?"selected":""}`} key={c} onClick={()=>setReportForm({...reportForm,category:c})}>{c}</button>)}</div></div>
          <div className="field"><label>Add a photo (optional)</label><input type="file" accept="image/*" onChange={e=>setReportForm({...reportForm,photo:e.target.files?.[0]?.name||""})}/><small>{reportForm.photo ? `Selected: ${reportForm.photo}` : "A photo can help the audit team understand the problem."}</small></div>
          <div className="field"><label>Tell us more *</label><textarea placeholder="Describe what happened..." value={reportForm.description} onChange={e=>setReportForm({...reportForm,description:e.target.value})}/></div>
          <button className="btn dark" type="submit">Submit Report</button>
        </form>
      </div>
    </div></div>
  }

  function TrackPage() {
    return <div className="page"><div className="container">
      <div className="pageTitle"><h2>Check & Track Reports</h2><p className="muted">Search by report ID, place or problem.</p></div>
      <div className="card" style={{marginBottom:18}}><input placeholder="Search: INC-2026-00124, hospital, ramp..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      <div className="grid2">{filtered.map(r=><ReportCard key={r.id} report={r}/>)}</div>
      {!filtered.length && <div className="card"><h3>No reports found</h3><p className="muted">Try another search or be the first to report a problem.</p><button className="btn dark" onClick={()=>show("report")}>Report a Problem</button></div>}
    </div></div>
  }

  function Tracker({status}) {
    let idx = stages.indexOf(status);
    if (status==="Escalated") idx = 4;
    if (status==="Resolved") idx = 5;
    if (status==="Identify" || status==="Audit" || status==="Assign" || status==="Act" || status==="Monitor" || status==="Verify") {}
    return <div className="tracker">{stages.map((s,i)=><div className={`step ${i<idx || status==="Resolved" ? "done":""} ${i===idx && status!=="Resolved" ? "active":""}`} key={s}><span className="stepLine"></span><div className="stepCircle">{i<idx || status==="Resolved" ? "✓":i+1}</div><div className="stepLabel">{s}</div></div>)}</div>
  }

  function DetailPage() {
    if (!selected) return <div className="page"><div className="container"><div className="card">Report not found.</div></div></div>;
    const r = selected;
    const left = daysLeft(r.deadline);
    const isAdmin = role==="admin";
    return <div className="page"><div className="container">
      <div className="pageTitle">
        <button className="btn small" onClick={()=>show("track")}>← Back</button>
        <div style={{marginTop:18}}><span className="pill">{r.id}</span><h2 style={{marginTop:10}}>{r.title}</h2><p className="muted">{r.place} • {r.location}</p></div>
      </div>
      <div className="detailGrid">
        <main className="card">
          <div className="reportTop"><div><h3>Audit progress</h3><p className="muted">See exactly where the issue is right now.</p></div><span className={`pill ${severityClass(r.severity)}`}>{r.severity}</span></div>
          <Tracker status={r.status}/>
          <div className="notice"><strong>Current status: {r.status}</strong><br/>This report remains visible until it is verified as resolved.</div>
          <h3>Problem</h3><p>{r.description}</p>
          <h3 style={{marginTop:28}}>Activity timeline</h3>
          <div className="timeline">{r.timeline.map((x,i)=><div className="timelineItem" key={i}><div className="timelineDot"></div><div><strong>{x[0]}</strong><br/><small>{x[1]}</small><p style={{margin:"5px 0 0"}}>{x[2]}</p></div></div>)}</div>
          {r.status==="Verify" && <div className="card" style={{background:"#f8fafc",marginTop:20}}>
            <h3>Was this issue actually resolved?</h3><p className="muted">Your verification matters. If it is still a problem, it will stay active.</p>
            <div className="actions">
              <button className={`btn ${review.vote==="yes"?"success":""}`} onClick={()=>setReview({...review,vote:"yes"})}>👍 Yes, looks resolved</button>
              <button className={`btn ${review.vote==="no"?"danger":""}`} onClick={()=>setReview({...review,vote:"no"})}>👎 No, still a problem</button>
            </div>
            <div className="field" style={{marginTop:16}}><label>Tell us what happened (optional)</label><textarea placeholder="Write your feedback..." value={review.comment} onChange={e=>setReview({...review,comment:e.target.value})}/></div>
            <button className="btn dark" onClick={submitReview}>Submit Verification</button>
          </div>}
          {r.reviews?.length>0 && <div style={{marginTop:25}}><h3>Verification history</h3>{r.reviews.map((v,i)=><div className="notice" key={i}>{v.vote==="yes"?"👍 Verified as resolved":"👎 Reported as still active"}{v.comment && <><br/><small>{v.comment}</small></>}</div>)}</div>}
        </main>
        <aside className="sideStack">
          <div className="card"><h3>Responsible authority</h3><div className="kv"><span>Authority</span><strong>{r.authority}</strong></div><div className="kv"><span>Officer</span><strong>{r.officer}</strong></div><div className="kv"><span>Assigned</span><strong>28 Aug 2026</strong></div></div>
          <div className="card"><h3>Deadline</h3><div className="score" style={{fontSize:38}}>{left<0?"Overdue":left}</div><p className="muted">{left<0?`${Math.abs(left)} days overdue`:"days remaining"}</p><div className="kv"><span>Deadline</span><strong>{r.deadline}</strong></div></div>
          <div className="card"><h3>Audit details</h3><div className="kv"><span>Category</span><strong>{r.category}</strong></div><div className="kv"><span>Criticality</span><strong>{r.severity}</strong></div><div className="kv"><span>Report date</span><strong>{r.created}</strong></div></div>
          <button className="btn" onClick={()=>show("complaints")}>⚠️ Make a Complaint</button>
          {isAdmin && <AdminPanel report={r}/>}
        </aside>
      </div>
    </div></div>
  }

  function AdminPanel({report:r}) {
    const d = adminDraft || r;
    return <div className="card"><h3>Admin controls</h3><p className="muted">Demo admin controls are working locally in this prototype.</p>
      <div className="field"><label>Criticality</label><select value={d.severity} onChange={e=>setAdminDraft({...d,severity:e.target.value})}><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></div>
      <div className="field"><label>Responsible authority</label><input value={d.authority} onChange={e=>setAdminDraft({...d,authority:e.target.value})}/></div>
      <div className="field"><label>Responsible officer</label><input value={d.officer} onChange={e=>setAdminDraft({...d,officer:e.target.value})}/></div>
      <div className="field"><label>Deadline</label><input type="date" value={d.deadline} onChange={e=>setAdminDraft({...d,deadline:e.target.value})}/></div>
      <div className="field"><label>Status</label><select value={d.status} onChange={e=>setAdminDraft({...d,status:e.target.value})}><option>Identify</option><option>Audit</option><option>Assign</option><option>Act</option><option>Monitor</option><option>Verify</option><option>Escalated</option><option>Resolved</option></select></div>
      <button className="btn dark" onClick={()=>updateReport({severity:d.severity,authority:d.authority,officer:d.officer,deadline:d.deadline,status:d.status})}>Save Changes</button>
      {r.status!=="Escalated" && r.status!=="Resolved" && daysLeft(r.deadline)<0 && <button className="btn danger" style={{marginTop:9,width:"100%"}} onClick={()=>updateReport({status:"Escalated",authority:"Higher District Authority",officer:"Escalation Officer",deadline:new Date(Date.now()+7*86400000).toISOString().slice(0,10),timeline:[...r.timeline,["Escalate",new Date().toLocaleDateString("en-IN"),"Admin escalated the overdue report to a higher authority"]]})}>🚨 Escalate to Higher Authority</button>}
    </div>
  }

  function Dashboard() {
    if (!role) return <div className="page"><div className="container"><div className="card"><h3>Please login first.</h3><button className="btn dark" onClick={()=>show("login")}>Login</button></div></div></div>;
    const mine = role==="user" ? reports.slice(0,4) : reports;
    return <div className="page"><div className="container">
      <div className="pageTitle"><h2>{role==="admin"?"Admin Dashboard":"Your Dashboard"}</h2><p className="muted">{role==="admin"?"Review, audit, assign, monitor and escalate accessibility cases.":"Track your reports and see what happens next."}</p></div>
      <div className="dashboardStats">
        {[["Reports",reports.length],["Active",activeReports.length],["Due Soon",reports.filter(r=>daysLeft(r.deadline)>=0&&daysLeft(r.deadline)<=3).length],["Overdue",overdue],["Escalated",escalated]].map(([a,b])=><div className="card stat" key={a}><small>{a}</small><strong>{b}</strong></div>)}
      </div>
      <div className="sectionHead"><h3>{role==="admin"?"All reports":"Your reports"}</h3>{role==="admin"&&<span className="pill">Admin mode</span>}</div>
      <div className="grid2">{mine.map(r=><ReportCard key={r.id} report={r}/>)}</div>
    </div></div>
  }

  function Login() {
    function enter() {
      setRole(loginRole);
      setToast(`Logged in as ${loginRole}.`);
      show("dashboard");
    }
    return <div className="login"><div className="loginCard">
      <span className="eyebrow">InclusiveX access</span><h2 style={{marginTop:12}}>Welcome to InclusiveX</h2><p className="muted">Choose how you want to use the platform.</p>
      <div className="roleGrid">
        <button className={`role ${loginRole==="user"?"selected":""}`} onClick={()=>setLoginRole("user")}><strong>👤 Login as User</strong><span className="muted">Report, track, review and verify.</span></button>
        <button className={`role ${loginRole==="admin"?"selected":""}`} onClick={()=>setLoginRole("admin")}><strong>🛡️ Login as Admin</strong><span className="muted">Audit, assign, modify and escalate.</span></button>
      </div>
      <div className="notice">{loginRole==="admin"?"Demo admin mode: all administrative controls are enabled locally.":"Demo user mode: you can report and track issues."}</div>
      <div className="field"><label>Email</label><input placeholder="demo@example.com"/></div>
      <div className="field"><label>Password</label><input type="password" placeholder="••••••••"/></div>
      <button className="btn dark" style={{width:"100%"}} onClick={enter}>Login as {loginRole==="admin"?"Admin":"User"}</button>
      <p className="muted" style={{fontSize:12,marginTop:15}}>This prototype uses demo login only. Connect a real authentication provider before production use.</p>
    </div></div>
  }

  function Scores() {
    const places = [
      ["ABC Hospital",82,4,17,1],["XYZ College",91,2,21,0],["City Railway Station",64,7,11,3]
    ];
    return <div className="page"><div className="container">
      <div className="pageTitle"><h2>Accessibility Scores</h2><p className="muted">A simple view of accessibility performance based on reports, audits, actions and verification.</p></div>
      <div className="grid3">{places.map(p=><div className="card" key={p[0]}><div className="score">{p[1]}<span style={{fontSize:18}}>/100</span></div><h3>{p[0]}</h3><p className="muted">Based on current audit data.</p><div className="kv"><span>Active issues</span><strong>{p[2]}</strong></div><div className="kv"><span>Resolved</span><strong>{p[3]}</strong></div><div className="kv"><span>Overdue</span><strong>{p[4]}</strong></div><button className="btn small" onClick={()=>setSearch(p[0]) || show("track")}>View issues →</button></div>)}</div>
      <div className="card" style={{marginTop:20}}><h3>How the score works</h3><p className="muted">The prototype score combines accessibility reports, audit outcomes, completed actions, overdue cases and user verification. In production, configure the scoring formula with your actual audit framework.</p></div>
    </div></div>
  }

  function Reviews() {
    return <div className="page"><div className="container">
      <div className="pageTitle"><h2>Reviews</h2><p className="muted">See what people say after accessibility issues are handled.</p></div>
      <div className="grid2">{reports.flatMap(r=>(r.reviews||[]).map((v,i)=><div className="card" key={r.id+i}><h3>{v.vote==="yes"?"👍 Resolved":"👎 Still a problem"}</h3><p>{v.comment||"No written comment."}</p><small className="muted">{r.place} • {r.id}</small></div>))}</div>
      {!reports.some(r=>r.reviews?.length) && <div className="card"><h3>No reviews yet</h3><p className="muted">Reviews appear here after users verify a report.</p></div>}
    </div></div>
  }

  function Complaints() {
    const [id,setId]=useState(selectedId||"");
    return <div className="page"><div className="container"><div className="pageTitle"><h2>Complaints</h2><p className="muted">Use a complaint when you believe the process itself was not handled correctly.</p></div>
      <div className="card form">
        <div className="field"><label>Report ID</label><input placeholder="INC-2026-00124" value={id} onChange={e=>setId(e.target.value)}/></div>
        <div className="field"><label>What went wrong?</label><select><option>No action taken</option><option>Deadline ignored</option><option>Incorrect status</option><option>Issue marked resolved incorrectly</option><option>Poor handling by authority</option><option>Other</option></select></div>
        <div className="field"><label>Complaint</label><textarea placeholder="Explain what happened..." value={complaint} onChange={e=>setComplaint(e.target.value)}/></div>
        <button className="btn dark" onClick={()=>{setComplaint("");setToast("Complaint submitted.");}}>Submit Complaint</button>
      </div>
    </div></div>
  }

  function Feedback() {
    return <div className="page"><div className="container"><div className="pageTitle"><h2>Feedback & Ideas</h2><p className="muted">Tell us what is confusing, what works, or what InclusiveX should add.</p></div>
      <div className="card form"><div className="field"><label>Category</label><select><option>Website feedback</option><option>Report experience</option><option>Accessibility problem</option><option>Feature idea</option><option>Something confusing</option><option>Other</option></select></div><div className="field"><label>Your feedback</label><textarea placeholder="Tell us what you think..." value={feedbackText} onChange={e=>setFeedbackText(e.target.value)}/></div><button className="btn dark" onClick={()=>{setFeedbackText("");setFeedbackOpen(false);setToast("Thanks! Your feedback helps improve InclusiveX.");}}>Send Feedback</button></div>
    </div></div>
  }

  let content;
  if (page==="home") content=<Home/>;
  else if (page==="report") content=<ReportPage/>;
  else if (page==="track") content=<TrackPage/>;
  else if (page==="detail") content=<DetailPage/>;
  else if (page==="login") content=<Login/>;
  else if (page==="dashboard") content=<Dashboard/>;
  else if (page==="scores") content=<Scores/>;
  else if (page==="reviews") content=<Reviews/>;
  else if (page==="complaints") content=<Complaints/>;
  else if (page==="feedback") content=<Feedback/>;
  else content=<Home/>;

  return <>
    <style>{styles}</style>
    <div className="app">
      <Header/>
      {content}
      <footer className="footer"><div className="container"><strong>InclusiveX</strong><p>Report → Track → Act → Verify. Nothing should disappear after it is reported.</p></div></footer>
      <button className="feedbackFloat" onClick={()=>show("feedback")}>💡 Feedback & Ideas</button>
      {toast && <div className="toast">{toast}</div>}
    </div>
  </>;
}

createRoot(document.getElementById("root")).render(<App />);
