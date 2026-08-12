# Audit to Action — Accessibility Accountability Prototype

A demo-ready React + Vite prototype for the YUVA 6.0 Audit to Action concept.

## Included
- Dashboard / command centre
- Report Accessibility Issue form
- Case management
- Case detail drawer
- Audit/verification queue
- Facility portfolio
- Accessibility Score + Action Score
- Bar-chart analytics
- Deadline / overdue / escalation workflow
- Demo Jamshedpur data
- Responsive layout
- Explicit prototype boundary: not statutory certification

## Requirements
Install a current Node.js release compatible with Vite. The current Vite guide lists Node.js 20.19+ or 22.12+ for the current major line.

## Run
Extract the ZIP, open a terminal in the folder, then:

    npm install
    npm run dev

Open the local URL printed by Vite (normally http://localhost:5173).

## Build
    npm run build
    npm run preview

## Demo flow
1. Dashboard
2. Report issue
3. Submit a new barrier
4. Open Cases
5. Click the new case
6. Mark in progress
7. Verify closure
8. Open Analytics
9. Open Facilities

## Important
- Data is React state only and resets on refresh.
- Evidence upload is a UI placeholder in this MVP.
- Scores are illustrative and must be validated before real deployment.
- Escalation is a workflow; the prototype does not determine legal penalties.
- The platform is designed to complement authorised/qualified accessibility auditors, not replace them.

## Production roadmap
Authentication + database -> evidence storage -> auditor/facility roles -> real standards/checklists -> notifications -> audit logs -> re-audit verification -> city dashboards.

## Tech
React + Vite + Lucide React + CSS.
