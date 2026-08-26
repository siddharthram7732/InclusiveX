import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

// Comprehensive City Directory (Any institution can be reviewed)
const initialInstitutions = [
  {
    id: "INST-001",
    name: "St. Xavier School",
    type: "School",
    location: "Circuit House Area, Jamshedpur",
    accessibilityScore: 72,
    actionScore: 85,
    reviews: [
      { user: "Rohan K.", rating: 4, comment: "Ramp at main entrance is good, but 2nd floor elevator needs braille buttons." },
      { user: "Priya S.", rating: 5, comment: "Quick response by maintenance team when wheelchair ramp was damaged!" }
    ]
  },
  {
    id: "INST-002",
    name: "MGM Medical College & Hospital",
    type: "Hospital",
    location: "Sakchi, Jamshedpur",
    accessibilityScore: 54,
    actionScore: 42,
    reviews: [
      { user: "Amit M.", rating: 2, comment: "OPD ground floor is crowded and tactile paths for visually impaired are missing." }
    ]
  },
  {
    id: "INST-003",
    name: "Tata Main Hospital (TMH)",
    type: "Hospital",
    location: "Bistupur, Jamshedpur",
    accessibilityScore: 88,
    actionScore: 92,
    reviews: [
      { user: "Sunita D.", rating: 5, comment: "Excellent wheelchair support staff and accessible restrooms." }
    ]
  },
  {
    id: "INST-004",
    name: "Tatanagar Junction Railway Station",
    type: "Transit Hub",
    location: "Parsudih, Jamshedpur",
    accessibilityScore: 68,
    actionScore: 75,
    reviews: [
      { user: "Vikram R.", rating: 3, comment: "Platform 1 ramp is clear, but footover bridge lifts are frequently under maintenance." }
    ]
  },
  {
    id: "INST-005",
    name: "Jamshedpur Women's University",
    type: "College",
    location: "Bistupur, Jamshedpur",
    accessibilityScore: 65,
    actionScore: 70,
    reviews: []
  }
];

const initialCases = [
  { id: "JAM-AT-101", instId: "INST-001", title: "Main Ramp Handrail Broken", status: "In Progress", step: 4, owner: "School Estate Team", deadline: "2026-09-02" },
  { id: "JAM-AT-102", instId: "INST-002", title: "Tactile Floor Tiles Missing in Lobby", status: "Overdue", step: 3, owner: "Civil Facility Mgr", deadline: "2026-08-20" },
  { id: "JAM-AT-103", instId: "INST-003", title: "Accessible Washroom Grab-bar Fixed", status: "Verified", step: 6, owner: "TMH Public Works", deadline: "2026-08-25" }
];

function App() {
  const [viewMode, setViewMode] = useState("citizen"); // 'citizen' or 'admin'
  const [activeTab, setActiveTab] = useState("directory"); // 'directory' or 'cases'
  const [institutions, setInstitutions] = useState(initialInstitutions);
  const [cases, setCases] = useState(initialCases);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  
  // Selected Institution for Detailed Review Modal
  const [selectedInst, setSelectedInst] = useState(null);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", user: "" });
  
  // Floating App Feedback State
  const [showAppFeedback, setShowAppFeedback] = useState(false);
  const [appFeedbackText, setAppFeedbackText] = useState("");

  // New Institution Creation State
  const [showAddInst, setShowAddInst] = useState(false);
  const [newInstData, setNewInstData] = useState({ name: "", type: "School", location: "" });

  // Filtered Institutions based on search
  const filteredInstitutions = institutions.filter(inst => 
    inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Review Submission for ANY Institution
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.comment || !selectedInst) return;

    const updatedInsts = institutions.map((inst) => {
      if (inst.id === selectedInst.id) {
        return {
          ...inst,
          reviews: [
            { user: newReview.user || "Anonymous Resident", rating: Number(newReview.rating), comment: newReview.comment },
            ...inst.reviews
          ]
        };
      }
      return inst;
    });

    setInstitutions(updatedInsts);
    // Update currently open modal view
    const updatedCurrent = updatedInsts.find(i => i.id === selectedInst.id);
    setSelectedInst(updatedCurrent);

    setNewReview({ rating: 5, comment: "", user: "" });
    alert(`Thank you! Your review for ${selectedInst.name} has been published.`);
  };

  // Handle Adding a New Institution to Directory
  const handleAddInstitution = (e) => {
    e.preventDefault();
    if (!newInstData.name || !newInstData.location) return;

    const created = {
      id: `INST-00${institutions.length + 1}`,
      name: newInstData.name,
      type: newInstData.type,
      location: newInstData.location,
      accessibilityScore: 70, // Baseline rating
      actionScore: 100,
      reviews: []
    };

    setInstitutions([created, ...institutions]);
    setNewInstData({ name: "", type: "School", location: "" });
    setShowAddInst(false);
    alert(`${created.name} added to Jamshedpur Directory!`);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui, sans-serif", maxWidth: "1150px", margin: "0 auto", color: "#f8fafc" }}>
      
      {/* APP HEADER */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #334155", paddingBottom: "16px", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ margin: 0, color: "#f59e0b", fontSize: "28px", fontWeight: "800" }}>InclusiveX</h1>
          <p style={{ margin: "4px 0 0 0", color: "#94a3b8", fontSize: "14px" }}>Audit → Action → Monitor → Verify</p>
        </div>

        {/* Dual View Mode Selector */}
        <div style={{ display: "flex", background: "#1e293b", padding: "4px", borderRadius: "12px", border: "1px solid #334155" }}>
          <button
            onClick={() => setViewMode("citizen")}
            style={{
              padding: "10px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold",
              background: viewMode === "citizen" ? "#f59e0b" : "transparent",
              color: viewMode === "citizen" ? "#0f172a" : "#cbd5e1"
            }}
          >
            👤 Public / Citizen View
          </button>
          <button
            onClick={() => setViewMode("admin")}
            style={{
              padding: "10px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold",
              background: viewMode === "admin" ? "#f59e0b" : "transparent",
              color: viewMode === "admin" ? "#0f172a" : "#cbd5e1"
            }}
          >
            🛠️ Facility Manager Dashboard
          </button>
        </div>
      </header>

      {/* CITIZEN VIEW */}
      {viewMode === "citizen" && (
        <div>
          {/* NAVIGATION TAB BAR */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
            <button
              onClick={() => setActiveTab("directory")}
              style={{
                padding: "12px 20px", borderRadius: "10px", fontWeight: "bold", border: "none", cursor: "pointer",
                background: activeTab === "directory" ? "#38bdf8" : "#1e293b",
                color: activeTab === "directory" ? "#0f172a" : "#f8fafc"
              }}
            >
              🏢 City Institution Directory ({institutions.length})
            </button>
            <button
              onClick={() => setActiveTab("cases")}
              style={{
                padding: "12px 20px", borderRadius: "10px", fontWeight: "bold", border: "none", cursor: "pointer",
                background: activeTab === "cases" ? "#38bdf8" : "#1e293b",
                color: activeTab === "cases" ? "#0f172a" : "#f8fafc"
              }}
            >
              📋 Reported Barrier Cases ({cases.length})
            </button>
          </div>

          {/* TAB 1: INSTITUTION DIRECTORY (REVIEW ANY INSTITUTION) */}
          {activeTab === "directory" && (
            <div>
              {/* Search Bar & Add Button */}
              <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
                <input
                  type="text"
                  placeholder="🔍 Search ANY school, hospital, public building to view scores or leave a review..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ flex: 1, minWidth: "280px", padding: "14px", borderRadius: "10px", border: "1px solid #475569", background: "#0f172a", color: "#fff", fontSize: "15px" }}
                />
                <button
                  onClick={() => setShowAddInst(true)}
                  style={{ padding: "14px 20px", background: "#f59e0b", color: "#000", fontWeight: "bold", border: "none", borderRadius: "10px", cursor: "pointer" }}
                >
                  ➕ Add Building to Directory
                </button>
              </div>

              {/* Institution Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
                {filteredInstitutions.map((inst) => (
                  <div key={inst.id} style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "bold", color: "#38bdf8", background: "#0c4a6e", padding: "4px 8px", borderRadius: "6px" }}>{inst.type}</span>
                        <span style={{ fontSize: "12px", color: "#94a3b8" }}>{inst.reviews.length} Citizen Reviews</span>
                      </div>
                      <h3 style={{ margin: "4px 0 6px 0", fontSize: "18px", color: "#fff" }}>{inst.name}</h3>
                      <p style={{ margin: "0 0 16px 0", fontSize: "13px", color: "#94a3b8" }}>📍 {inst.location}</p>

                      {/* Dual Score Metric Display */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", background: "#0f172a", padding: "12px", borderRadius: "10px", marginBottom: "16px" }}>
                        <div>
                          <span style={{ fontSize: "10px", textTransform: "uppercase", color: "#94a3b8", fontWeight: "bold", block: true }}>Accessibility Score</span>
                          <span style={{ fontSize: "20px", fontWeight: "bold", color: inst.accessibilityScore > 75 ? "#4ade80" : "#facc15" }}>
                            {inst.accessibilityScore}/100
                          </span>
                        </div>
                        <div>
                          <span style={{ fontSize: "10px", textTransform: "uppercase", color: "#94a3b8", fontWeight: "bold", block: true }}>Action Score</span>
                          <span style={{ fontSize: "20px", fontWeight: "bold", color: inst.actionScore > 75 ? "#38bdf8" : "#f87171" }}>
                            {inst.actionScore}/100
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedInst(inst)}
                      style={{ width: "100%", padding: "12px", background: "#0f172a", border: "1px solid #38bdf8", color: "#38bdf8", fontWeight: "bold", borderRadius: "8px", cursor: "pointer", transition: "all 0.2s" }}
                    >
                      ⭐ Read & Cast Reviews ({inst.reviews.length})
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVE REPORTED CASES */}
          {activeTab === "cases" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {cases.map((c) => {
                const inst = institutions.find(i => i.id === c.instId);
                return (
                  <div key={c.id} style={{ background: "#1e293b", border: "1px solid #334155", padding: "20px", borderRadius: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
                      <div>
                        <span style={{ fontSize: "12px", color: "#f59e0b", fontWeight: "bold" }}>{c.id} • {inst ? inst.name : "Public Facility"}</span>
                        <h3 style={{ margin: "4px 0", color: "#fff" }}>{c.title}</h3>
                      </div>
                      <span style={{ background: c.status === "Verified" ? "#16a34a" : c.status === "Overdue" ? "#dc2626" : "#2563eb", padding: "6px 12px", borderRadius: "20px", fontWeight: "bold", fontSize: "12px" }}>
                        {c.status}
                      </span>
                    </div>

                    <div style={{ background: "#0f172a", padding: "12px", borderRadius: "10px", margin: "14px 0", fontSize: "13px" }}>
                      <span style={{ color: "#94a3b8" }}>Workflow Progress: Step {c.step} of 6</span>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "4px", marginTop: "6px" }}>
                        {[1,2,3,4,5,6].map(s => (
                          <div key={s} style={{ height: "6px", borderRadius: "3px", background: s <= c.step ? "#f59e0b" : "#334155" }} />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* BACKEND ADMIN DASHBOARD VIEW */}
      {viewMode === "admin" && (
        <div style={{ background: "#1e293b", border: "1px solid #334155", padding: "24px", borderRadius: "16px" }}>
          <h2 style={{ color: "#f59e0b", marginTop: 0 }}>Facility Accountability Matrix</h2>
          <p style={{ color: "#94a3b8", fontSize: "14px" }}>Track overdue actions, assign owners, and issue verification checks[cite: 1].</p>
          
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "16px", textAlign: "left", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #334155", color: "#94a3b8" }}>
                <th style={{ padding: "12px" }}>Case ID</th>
                <th style={{ padding: "12px" }}>Issue</th>
                <th style={{ padding: "12px" }}>Responsible Owner</th>
                <th style={{ padding: "12px" }}>Deadline</th>
                <th style={{ padding: "12px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {cases.map(c => (
                <tr key={c.id} style={{ borderBottom: "1px solid #334155" }}>
                  <td style={{ padding: "12px", fontWeight: "bold", color: "#f59e0b" }}>{c.id}</td>
                  <td style={{ padding: "12px" }}>{c.title}</td>
                  <td style={{ padding: "12px" }}>{c.owner}</td>
                  <td style={{ padding: "12px" }}>{c.deadline}</td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ color: c.status === "Overdue" ? "#f87171" : "#4ade80", fontWeight: "bold" }}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* INSTITUTION REVIEW MODAL (FOR ANY INSTITUTION) */}
      {selectedInst && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.85)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "16px" }}>
          <div style={{ background: "#1e293b", border: "1px solid #475569", borderRadius: "20px", padding: "24px", maxWidth: "550px", width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
            <button
              onClick={() => setSelectedInst(null)}
              style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", color: "#94a3b8", fontSize: "20px", cursor: "pointer" }}
            >
              ✕
            </button>

            <h2 style={{ color: "#f59e0b", margin: "0 0 4px 0" }}>{selectedInst.name}</h2>
            <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 16px 0" }}>📍 {selectedInst.location} • {selectedInst.type}</p>

            {/* Score Summary Header */}
            <div style={{ display: "flex", gap: "12px", background: "#0f172a", padding: "12px", borderRadius: "12px", marginBottom: "20px" }}>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>ACCESSIBILITY SCORE</div>
                <div style={{ fontSize: "22px", fontWeight: "bold", color: "#4ade80" }}>{selectedInst.accessibilityScore}/100</div>
              </div>
              <div style={{ flex: 1, textAlign: "center", borderLeft: "1px solid #334155" }}>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>ACTION SCORE</div>
                <div style={{ fontSize: "22px", fontWeight: "bold", color: "#38bdf8" }}>{selectedInst.actionScore}/100</div>
              </div>
            </div>

            {/* Review Input Form */}
            <form onSubmit={handleAddReview} style={{ background: "#0f172a", padding: "16px", borderRadius: "12px", marginBottom: "20px" }}>
              <h4 style={{ margin: "0 0 10px 0", color: "#fff" }}>Cast Citizen Review for this Institution</h4>
              
              <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={newReview.user}
                  onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
                  style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #334155", background: "#1e293b", color: "#fff" }}
                />
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                  style={{ padding: "10px", borderRadius: "8px", border: "1px solid #334155", background: "#1e293b", color: "#fff" }}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                  <option value={3}>⭐⭐⭐ (3/5)</option>
                  <option value={2}>⭐⭐ (2/5)</option>
                  <option value={1}>⭐ (1/5)</option>
                </select>
              </div>

              <textarea
                placeholder="Share your experience regarding ramps, elevators, washrooms, or staff assistance..."
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                rows={3}
                style={{ width: "95%", padding: "10px", borderRadius: "8px", border: "1px solid #334155", background: "#1e293b", color: "#fff", marginBottom: "10px" }}
                required
              />

              <button
                type="submit"
                style={{ width: "100%", padding: "10px", background: "#f59e0b", color: "#000", fontWeight: "bold", border: "none", borderRadius: "8px", cursor: "pointer" }}
              >
                Submit Institution Review
              </button>
            </form>

            {/* Existing Citizen Reviews List */}
            <h4 style={{ color: "#fff", marginBottom: "12px" }}>Public Feedback ({selectedInst.reviews.length})</h4>
            {selectedInst.reviews.length === 0 ? (
              <p style={{ color: "#94a3b8", fontSize: "13px" }}>No reviews cast yet. Be the first citizen to review this institution!</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {selectedInst.reviews.map((rev, idx) => (
                  <div key={idx} style={{ background: "#0f172a", padding: "12px", borderRadius: "10px", border: "1px solid #334155" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <strong style={{ fontSize: "14px", color: "#38bdf8" }}>{rev.user}</strong>
                      <span style={{ fontSize: "12px" }}>{"⭐".repeat(rev.rating)}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: "13px", color: "#cbd5e1" }}>{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: ADD NEW BUILDING TO DIRECTORY */}
      {showAddInst && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "16px" }}>
          <div style={{ background: "#1e293b", padding: "24px", borderRadius: "20px", maxWidth: "450px", width: "100%", position: "relative" }}>
            <button onClick={() => setShowAddInst(false)} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", color: "#fff", fontSize: "18px", cursor: "pointer" }}>✕</button>
            <h3 style={{ color: "#f59e0b", marginTop: 0 }}>Add New Building to City Directory</h3>
            
            <form onSubmit={handleAddInstitution} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input
                type="text"
                placeholder="Institution / Building Name"
                value={newInstData.name}
                onChange={(e) => setNewInstData({ ...newInstData, name: e.target.value })}
                style={{ padding: "12px", borderRadius: "8px", border: "1px solid #475569", background: "#0f172a", color: "#fff" }}
                required
              />
              <select
                value={newInstData.type}
                onChange={(e) => setNewInstData({ ...newInstData, type: e.target.value })}
                style={{ padding: "12px", borderRadius: "8px", border: "1px solid #475569", background: "#0f172a", color: "#fff" }}
              >
                <option value="School">School / Educational</option>
                <option value="Hospital">Hospital / Clinic</option>
                <option value="Transit Hub">Transit Hub / Railway / Bus</option>
                <option value="Govt Office">Government Office</option>
                <option value="Public Park">Public Facility / Park</option>
              </select>
              <input
                type="text"
                placeholder="Area / Location (e.g., Bistupur, Jamshedpur)"
                value={newInstData.location}
                onChange={(e) => setNewInstData({ ...newInstData, location: e.target.value })}
                style={{ padding: "12px", borderRadius: "8px", border: "1px solid #475569", background: "#0f172a", color: "#fff" }}
                required
              />
              <button type="submit" style={{ padding: "12px", background: "#f59e0b", color: "#000", fontWeight: "bold", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                Add Building
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FLOATING WEBSITE FEEDBACK BUTTON */}
      <button
        onClick={() => setShowAppFeedback(true)}
        style={{
          position: "fixed", bottom: "24px", right: "24px", background: "#f59e0b", color: "#000",
          padding: "12px 20px", borderRadius: "30px", fontWeight: "bold", border: "none", cursor: "pointer",
          boxShadow: "0 4px 16px rgba(0,0,0,0.5)", zIndex: 100
        }}
      >
        💡 App Ideas & Feedback
      </button>

      {/* APP FEEDBACK MODAL */}
      {showAppFeedback && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "16px" }}>
          <div style={{ background: "#1e293b", padding: "24px", borderRadius: "16px", maxWidth: "400px", width: "100%", position: "relative" }}>
            <button onClick={() => setShowAppFeedback(false)} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", color: "#fff", cursor: "pointer" }}>✕</button>
            <h3 style={{ color: "#f59e0b", marginTop: 0 }}>Website Feedback</h3>
            <textarea
              placeholder="Tell us what you like or suggest new features..."
              value={appFeedbackText}
              onChange={(e) => setAppFeedbackText(e.target.value)}
              rows={4}
              style={{ width: "93%", padding: "10px", borderRadius: "8px", background: "#0f172a", border: "1px solid #475569", color: "#fff", marginBottom: "12px" }}
            />
            <button
              onClick={() => { alert("Thank you for your feedback!"); setShowAppFeedback(false); setAppFeedbackText(""); }}
              style={{ width: "100%", padding: "12px", background: "#f59e0b", color: "#000", fontWeight: "bold", border: "none", borderRadius: "8px", cursor: "pointer" }}
            >
              Submit Feedback
            </button>
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
