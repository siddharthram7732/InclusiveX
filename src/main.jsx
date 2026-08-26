import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'

function InclusiveXApp() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Action Score & Case Data State
  const [actionScore, setActionScore] = useState(78); // Out of 100
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedCaseForFeedback, setSelectedCaseForFeedback] = useState(null);

  // Sample Cases Data
  const [cases, setCases] = useState([
    {
      id: "CASE-101",
      title: "Main Entrance Wheelchair Ramp Damaged",
      location: "St. Xavier School, Jamshedpur",
      category: "Ramp",
      step: 4, // 1: Identify, 2: Audit, 3: Assign, 4: Act, 5: Monitor, 6: Verify
      stepName: "Act (Fix in Progress)",
      owner: "School Maintenance Team",
      deadline: "2026-09-05",
      status: "On Track",
      statusColor: "bg-blue-600",
      description: "Cracks on ramp surface making wheelchair access difficult."
    },
    {
      id: "CASE-102",
      title: "Tactile Floor Signage Missing in Lobby",
      location: "Civil Hospital, Jamshedpur",
      category: "Signage",
      step: 3,
      stepName: "Assign (Owner Pending)",
      owner: "Facility Manager",
      deadline: "2026-08-20",
      status: "Overdue",
      statusColor: "bg-red-600",
      description: "Visually impaired visitors finding navigation tough near OPD."
    },
    {
      id: "CASE-103",
      title: "Accessible Washroom Grab Bar Installed",
      location: "Public Library Block B",
      category: "Washroom",
      step: 6,
      stepName: "Verified & Closed",
      owner: "Public Works Dept",
      deadline: "2026-08-25",
      status: "Verified",
      statusColor: "bg-green-600",
      description: "New stainless steel safety grab bars mounted successfully."
    }
  ]);

  // Form State
  const [newReport, setNewReport] = useState({ title: '', location: '', category: 'Ramp', details: '' });
  const [feedback, setFeedback] = useState({ rating: 'like', comments: '' });
  const [generalFeedback, setGeneralFeedback] = useState('');

  // Handling New Case Submission
  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!newReport.title || !newReport.location) return;

    const newCase = {
      id: `CASE-${100 + cases.length + 1}`,
      title: newReport.title,
      location: newReport.location,
      category: newReport.category,
      step: 1,
      stepName: "Identify (Reported)",
      owner: "Assigning Soon",
      deadline: "Pending",
      status: "Assigned",
      statusColor: "bg-yellow-600",
      description: newReport.details || "New citizen report logged."
    };

    setCases([newCase, ...cases]);
    setNewReport({ title: '', location: '', category: 'Ramp', details: '' });
    setActiveTab('dashboard');
    alert("Accessibility issue reported successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 md:p-8">
      {/* Header & Accessibility Bar */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center border-b border-slate-700 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-yellow-400">InclusiveX</h1>
          <p className="text-slate-400 text-sm">Audit → Action → Monitor → Verify</p>
        </div>

        {/* Action Score Widget */}
        <div className="flex items-center gap-4 bg-slate-800 border-2 border-yellow-400/40 p-3 rounded-2xl shadow-lg">
          <div className="text-right">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">City Action Score</span>
            <span className="text-sm text-slate-300">Jamshedpur Pilot</span>
          </div>
          <div className="w-14 h-14 rounded-full bg-slate-900 border-4 border-green-500 flex items-center justify-center font-black text-xl text-green-400">
            {actionScore}
          </div>
        </div>
      </header>

      {/* Primary Accessible Navigation Bar */}
      <nav className="max-w-6xl mx-auto flex gap-3 mb-8">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 py-4 text-lg font-bold rounded-xl border-2 transition-all ${
            activeTab === 'dashboard'
              ? 'bg-yellow-400 text-slate-950 border-yellow-400'
              : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
          }`}
        >
          📋 Active Cases ({cases.length})
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`flex-1 py-4 text-lg font-bold rounded-xl border-2 transition-all ${
            activeTab === 'report'
              ? 'bg-yellow-400 text-slate-950 border-yellow-400'
              : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
          }`}
        >
          ➕ Report a Barrier
        </button>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-6xl mx-auto">
        {/* TAB 1: DASHBOARD & ACTIVE CASES */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-100 mb-4">Accessibility Tracking Dashboard</h2>
            
            {cases.map((item) => (
              <div key={item.id} className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-6 shadow-md hover:border-slate-500 transition-all">
                {/* Header row */}
                <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                  <div>
                    <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest">{item.id} • {item.category}</span>
                    <h3 className="text-xl font-bold text-white mt-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm">📍 {item.location}</p>
                  </div>
                  <span className={`${item.statusColor} text-white font-bold text-sm px-4 py-1.5 rounded-full uppercase tracking-wider`}>
                    {item.status}
                  </span>
                </div>

                {/* 6-Step Visual Workflow Stepper */}
                <div className="my-6 bg-slate-900 p-4 rounded-xl border border-slate-700">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-2">Live Status: {item.stepName}</div>
                  <div className="grid grid-cols-6 gap-1.5 md:gap-2">
                    {["Identify", "Audit", "Assign", "Act", "Monitor", "Verify"].map((stepLabel, idx) => {
                      const stepNum = idx + 1;
                      const isComplete = stepNum <= item.step;
                      return (
                        <div key={stepLabel} className="text-center">
                          <div
                            className={`h-3 rounded-full mb-1 ${
                              isComplete ? 'bg-yellow-400' : 'bg-slate-700'
                            }`}
                          />
                          <span className={`text-[10px] md:text-xs font-semibold block truncate ${isComplete ? 'text-yellow-400' : 'text-slate-500'}`}>
                            {stepLabel}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Case Info Footer */}
                <div className="flex flex-wrap justify-between items-center text-sm border-t border-slate-700/60 pt-4 text-slate-300 gap-2">
                  <div>👤 Responsible Owner: <strong className="text-white">{item.owner}</strong></div>
                  <div>🗓️ Deadline: <strong className="text-white">{item.deadline}</strong></div>
                  
                  {item.status === 'Verified' && (
                    <button
                      onClick={() => { setSelectedCaseForFeedback(item); setShowFeedbackModal(true); }}
                      className="bg-green-600 hover:bg-green-500 text-white font-bold px-4 py-2 rounded-lg text-sm transition-all"
                    >
                      👍 Give Fix Feedback
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: SIMPLE ACCESSIBLE REPORTING FORM */}
        {activeTab === 'report' && (
          <div className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto shadow-xl">
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">Report an Accessibility Barrier</h2>
            <p className="text-slate-400 text-sm mb-6">Help make public buildings accessible for everyone.</p>

            <form onSubmit={handleReportSubmit} className="space-y-6">
              {/* Category Selector Buttons */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">1. Barrier Category</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['Ramp', 'Washroom', 'Signage', 'Elevator'].map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setNewReport({ ...newReport, category: cat })}
                      className={`p-3 rounded-xl font-bold text-center border-2 transition-all ${
                        newReport.category === cat
                          ? 'bg-yellow-400 text-slate-950 border-yellow-400'
                          : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Location */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">2. What is the issue?</label>
                <input
                  type="text"
                  placeholder="e.g. Ramp is too steep or blocked"
                  value={newReport.title}
                  onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                  className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:border-yellow-400 focus:outline-none text-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">3. Building / Location</label>
                <input
                  type="text"
                  placeholder="e.g. MGM Hospital Gate 2, Jamshedpur"
                  value={newReport.location}
                  onChange={(e) => setNewReport({ ...newReport, location: e.target.value })}
                  className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:border-yellow-400 focus:outline-none text-lg"
                  required
                />
              </div>

              {/* Multimedia Accessibility Features */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => alert("Photo camera integration active in live app.")}
                  className="p-4 bg-slate-900 border-2 border-dashed border-slate-600 rounded-xl text-slate-300 font-bold hover:border-yellow-400 flex flex-col items-center justify-center gap-1"
                >
                  📷 Add Photo Evidence
                </button>
                <button
                  type="button"
                  onClick={() => alert("Voice note recorder active.")}
                  className="p-4 bg-slate-900 border-2 border-dashed border-slate-600 rounded-xl text-slate-300 font-bold hover:border-yellow-400 flex flex-col items-center justify-center gap-1"
                >
                  🎙️ Record Voice Note
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xl py-5 rounded-xl transition-all shadow-lg"
              >
                Submit Accessibility Case
              </button>
            </form>
          </div>
        )}
      </main>

      {/* FLOATING GENERAL FEEDBACK BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => { setSelectedCaseForFeedback(null); setShowFeedbackModal(true); }}
          className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-5 py-3 rounded-full shadow-2xl border-2 border-slate-900 flex items-center gap-2 text-base"
        >
          💡 Feedback & Ideas
        </button>
      </div>

      {/* FEEDBACK MODAL COMPONENT */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowFeedbackModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-white mb-2">
              {selectedCaseForFeedback ? `Feedback for ${selectedCaseForFeedback.id}` : 'Platform Feedback'}
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Is the fix completed properly, or do you have suggestions to improve InclusiveX?
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Did this fix resolve the barrier?</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setFeedback({ ...feedback, rating: 'like' })}
                    className={`flex-1 py-3 rounded-xl font-bold border-2 ${
                      feedback.rating === 'like' ? 'bg-green-600 text-white border-green-500' : 'bg-slate-900 text-slate-300 border-slate-700'
                    }`}
                  >
                    👍 Yes, Fixed!
                  </button>
                  <button
                    onClick={() => setFeedback({ ...feedback, rating: 'dislike' })}
                    className={`flex-1 py-3 rounded-xl font-bold border-2 ${
                      feedback.rating === 'dislike' ? 'bg-red-600 text-white border-red-500' : 'bg-slate-900 text-slate-300 border-slate-700'
                    }`}
                  >
                    👎 Still Blocked
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">Your Comments</label>
                <textarea
                  rows="3"
                  placeholder="Share details about the fix or UI suggestion..."
                  value={generalFeedback}
                  onChange={(e) => setGeneralFeedback(e.target.value)}
                  className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-yellow-400 text-sm"
                />
              </div>

              <button
                onClick={() => {
                  alert("Thank you! Your feedback helps keep accessibility accountable.");
                  setShowFeedbackModal(false);
                  setGeneralFeedback('');
                }}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold py-3 rounded-xl transition-all"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InclusiveXApp />
  </React.StrictMode>,
)
