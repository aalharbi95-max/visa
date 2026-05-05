import React, { useMemo, useState } from "react";
import "./style.css";

const visaBatches = [
  { id: "VB-001", visaNo: "VISA-2026-1001", issueDate: "2026-01-05", project: "TBC Riyadh Schools", profession: "Cleaner", gender: "Male", nationality: "Bangladesh", qty: 200, authorized: 160 },
  { id: "VB-002", visaNo: "VISA-2026-1002", issueDate: "2026-01-05", project: "TBC Riyadh Schools", profession: "Cleaner", gender: "Female", nationality: "Bangladesh", qty: 200, authorized: 80 },
  { id: "VB-003", visaNo: "VISA-2026-1003", issueDate: "2026-01-12", project: "NWC Eastern Region", profession: "Electronics Technician", gender: "Male", nationality: "India", qty: 20, authorized: 20 },
  { id: "VB-004", visaNo: "VISA-2026-1004", issueDate: "2026-01-16", project: "NWC Riyadh", profession: "Electrical Technician", gender: "Male", nationality: "Philippines", qty: 10, authorized: 6 },
  { id: "VB-005", visaNo: "VISA-2026-1005", issueDate: "2026-01-20", project: "Corporate HQ", profession: "Engineer", gender: "Male", nationality: "Egypt", qty: 10, authorized: 4 },
];

const authorizations = [
  { id: "AUTH-0001", batchId: "VB-001", agency: "Noman Associates", country: "Bangladesh", qty: 120, authDate: "2026-01-10", sla: 90, submitted: 96, stamped: 58, arrived: 42 },
  { id: "AUTH-0002", batchId: "VB-001", agency: "Smart Care Corporation", country: "Bangladesh", qty: 40, authDate: "2026-02-01", sla: 60, submitted: 35, stamped: 18, arrived: 10 },
  { id: "AUTH-0003", batchId: "VB-002", agency: "Dynamic Enterprise", country: "Bangladesh", qty: 80, authDate: "2026-02-12", sla: 90, submitted: 62, stamped: 22, arrived: 8 },
  { id: "AUTH-0004", batchId: "VB-003", agency: "Pyramids International", country: "India", qty: 20, authDate: "2026-01-28", sla: 60, submitted: 20, stamped: 20, arrived: 18 },
  { id: "AUTH-0005", batchId: "VB-004", agency: "AMCO Skills", country: "Philippines", qty: 6, authDate: "2026-03-10", sla: 60, submitted: 4, stamped: 2, arrived: 0 },
];

const candidates = [
  { id: "C-0001", authId: "AUTH-0001", name: "Md Rahman", passport: "B1234567", profession: "Cleaner", medical: "Fit", stamping: "Stamped", ticket: "Issued", arrival: "Arrived", onboarding: "Joined" },
  { id: "C-0002", authId: "AUTH-0001", name: "Hasan Ali", passport: "B7654321", profession: "Cleaner", medical: "Fit", stamping: "Submitted", ticket: "Pending", arrival: "Pending", onboarding: "Pending" },
  { id: "C-0003", authId: "AUTH-0001", name: "Kamal Hossain", passport: "B9922110", profession: "Cleaner", medical: "Unfit", stamping: "Stopped", ticket: "Pending", arrival: "Pending", onboarding: "Pending" },
  { id: "C-0004", authId: "AUTH-0002", name: "Arif Khan", passport: "B3311220", profession: "Cleaner", medical: "Fit", stamping: "Stamped", ticket: "Issued", arrival: "Arrived", onboarding: "Joined" },
  { id: "C-0005", authId: "AUTH-0004", name: "Raj Kumar", passport: "I7834129", profession: "Electronics Technician", medical: "Fit", stamping: "Stamped", ticket: "Issued", arrival: "Arrived", onboarding: "Joined" },
  { id: "C-0006", authId: "AUTH-0005", name: "Jose Santos", passport: "P5532190", profession: "Electrical Technician", medical: "Pending", stamping: "Not Started", ticket: "Pending", arrival: "Pending", onboarding: "Pending" },
];

function daysBetween(dateString) {
  const start = new Date(dateString);
  const today = new Date("2026-05-05");
  return Math.max(0, Math.floor((today - start) / (1000 * 60 * 60 * 24)));
}

function Badge({ children, type = "gray" }) {
  return <span className={`badge ${type}`}>{children}</span>;
}

function StatCard({ label, value, sub }) {
  return (
    <div className="statCard">
      <span>{label}</span>
      <strong>{value}</strong>
      {sub && <p>{sub}</p>}
    </div>
  );
}

function DataTable({ columns, rows }) {
  return (
    <div className="tableWrap">
      <table>
        <thead>
          <tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function Dashboard() {
  const totalVisas = visaBatches.reduce((s, v) => s + v.qty, 0);
  const totalAuthorized = visaBatches.reduce((s, v) => s + v.authorized, 0);
  const remaining = totalVisas - totalAuthorized;
  const delayed = authorizations.filter((a) => daysBetween(a.authDate) > a.sla && a.arrived < a.qty).length;
  const stamped = authorizations.reduce((s, a) => s + a.stamped, 0);
  const arrived = authorizations.reduce((s, a) => s + a.arrived, 0);

  return (
    <section className="page">
      <div className="pageHeader">
        <div>
          <p className="kicker">Executive View</p>
          <h1>Visa Operations Dashboard</h1>
          <p>Live visibility over inventory, authorizations, agency SLA, candidate progress, and onboarding.</p>
        </div>
        <button className="primaryBtn">+ New Visa Batch</button>
      </div>

      <div className="statsGrid">
        <StatCard label="Total Visas" value={totalVisas} sub="Issued visa balance" />
        <StatCard label="Authorized" value={totalAuthorized} sub="Delegated to agencies" />
        <StatCard label="Remaining" value={remaining} sub="Available for authorization" />
        <StatCard label="Delayed Authorizations" value={delayed} sub="SLA breached" />
        <StatCard label="Stamped" value={stamped} sub="Visa stamped candidates" />
        <StatCard label="Arrived" value={arrived} sub="Candidates arrived" />
      </div>

      <div className="panel">
        <div className="panelHeader">
          <h2>Agency SLA Status</h2>
          <span>Clicking rows will later open filtered details</span>
        </div>
        <DataTable
          columns={["Authorization", "Agency", "Qty", "Submitted", "Stamped", "Arrived", "Days", "SLA Status"]}
          rows={authorizations.map((a) => {
            const days = daysBetween(a.authDate);
            const delayedAuth = days > a.sla && a.arrived < a.qty;
            const nearDelay = days >= a.sla - 10 && !delayedAuth;
            return (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.agency}</td>
                <td>{a.qty}</td>
                <td>{a.submitted}</td>
                <td>{a.stamped}</td>
                <td>{a.arrived}</td>
                <td>{days}</td>
                <td><Badge type={delayedAuth ? "red" : nearDelay ? "yellow" : "green"}>{delayedAuth ? "Delayed" : nearDelay ? "Near Delay" : "On Time"}</Badge></td>
              </tr>
            );
          })}
        />
      </div>
    </section>
  );
}

function VisaInventory() {
  return (
    <section className="page">
      <div className="pageHeader">
        <div>
          <p className="kicker">Visa Inventory</p>
          <h1>Visa Batch Management</h1>
          <p>Enter issued visas by visa number, date, project, profession, gender, nationality, and quantity.</p>
        </div>
        <button className="primaryBtn">+ Add Visa Batch</button>
      </div>
      <div className="panel">
        <DataTable
          columns={["Batch ID", "Visa No", "Issue Date", "Project", "Profession", "Gender", "Nationality", "Qty", "Authorized", "Remaining"]}
          rows={visaBatches.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.visaNo}</td>
              <td>{v.issueDate}</td>
              <td>{v.project}</td>
              <td>{v.profession}</td>
              <td>{v.gender}</td>
              <td>{v.nationality}</td>
              <td>{v.qty}</td>
              <td>{v.authorized}</td>
              <td><Badge type={v.qty - v.authorized > 0 ? "green" : "gray"}>{v.qty - v.authorized}</Badge></td>
            </tr>
          ))}
        />
      </div>
    </section>
  );
}

function Authorization() {
  return (
    <section className="page">
      <div className="pageHeader">
        <div>
          <p className="kicker">Authorization</p>
          <h1>Agency Authorization Tracking</h1>
          <p>Delegate visa quantities to agencies and monitor SLA, submitted candidates, stamping, and arrivals.</p>
        </div>
        <button className="primaryBtn">+ New Authorization</button>
      </div>
      <div className="panel">
        <DataTable
          columns={["Auth ID", "Visa Batch", "Agency", "Country", "Qty", "Auth Date", "SLA", "Submitted", "Stamped", "Arrived", "Status"]}
          rows={authorizations.map((a) => {
            const days = daysBetween(a.authDate);
            const delayedAuth = days > a.sla && a.arrived < a.qty;
            return (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.batchId}</td>
                <td>{a.agency}</td>
                <td>{a.country}</td>
                <td>{a.qty}</td>
                <td>{a.authDate}</td>
                <td>{a.sla} days</td>
                <td>{a.submitted}</td>
                <td>{a.stamped}</td>
                <td>{a.arrived}</td>
                <td><Badge type={delayedAuth ? "red" : "green"}>{delayedAuth ? "Delayed" : "On Time"}</Badge></td>
              </tr>
            );
          })}
        />
      </div>
    </section>
  );
}

function CandidateFollowup() {
  const [authFilter, setAuthFilter] = useState("All");
  const filtered = authFilter === "All" ? candidates : candidates.filter((c) => c.authId === authFilter);

  return (
    <section className="page">
      <div className="pageHeader">
        <div>
          <p className="kicker">Candidate Follow-up</p>
          <h1>Candidate-Level Operations</h1>
          <p>Each authorization must be supported by candidate records equal to the authorized quantity.</p>
        </div>
        <select value={authFilter} onChange={(e) => setAuthFilter(e.target.value)}>
          <option>All</option>
          {authorizations.map((a) => <option key={a.id}>{a.id}</option>)}
        </select>
      </div>
      <div className="panel">
        <DataTable
          columns={["Candidate ID", "Authorization", "Name", "Passport", "Profession", "Medical", "Stamping", "Ticket", "Arrival", "Onboarding"]}
          rows={filtered.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.authId}</td>
              <td>{c.name}</td>
              <td>{c.passport}</td>
              <td>{c.profession}</td>
              <td><Badge type={c.medical === "Fit" ? "green" : c.medical === "Unfit" ? "red" : "yellow"}>{c.medical}</Badge></td>
              <td>{c.stamping}</td>
              <td>{c.ticket}</td>
              <td>{c.arrival}</td>
              <td>{c.onboarding}</td>
            </tr>
          ))}
        />
      </div>
    </section>
  );
}

function AICVAnalyzer() {
  const [job, setJob] = useState("Electrical Technician with 3+ years FM/O&M experience, English basics, GCC experience preferred.");
  const [cvText, setCvText] = useState("Jose Santos - Electrical Technician - 5 years experience in facility maintenance, panels, pumps, preventive maintenance, basic English, worked in Qatar.");
  const result = useMemo(() => {
    const score = cvText.toLowerCase().includes("electrical") ? 86 : 58;
    return {
      score,
      recommendation: score >= 80 ? "Recommended" : "Review Needed",
      summary: "Candidate appears aligned with the technical requirement. GCC exposure and FM maintenance background improve the fit.",
      questions: ["Describe your preventive maintenance experience.", "What electrical panels have you worked on?", "Are you available for Saudi mobilization within 60 days?"],
    };
  }, [cvText]);

  return (
    <section className="page">
      <div className="pageHeader">
        <div>
          <p className="kicker">AI Assistant</p>
          <h1>CV Analyzer & Candidate Recommendation</h1>
          <p>This is the first AI workflow mockup. Later it will connect to a real AI API and parse PDF/Word CVs.</p>
        </div>
      </div>
      <div className="aiGrid">
        <div className="panel">
          <h2>Job Requirement</h2>
          <textarea value={job} onChange={(e) => setJob(e.target.value)} />
          <h2>CV Text</h2>
          <textarea value={cvText} onChange={(e) => setCvText(e.target.value)} />
          <button className="primaryBtn">Analyze CV</button>
        </div>
        <div className="panel resultPanel">
          <p className="kicker">AI Result</p>
          <h1>{result.score}% Match</h1>
          <Badge type={result.score >= 80 ? "green" : "yellow"}>{result.recommendation}</Badge>
          <p>{result.summary}</p>
          <h2>Suggested Interview Questions</h2>
          <ul>
            {result.questions.map((q) => <li key={q}>{q}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [page, setPage] = useState("Dashboard");
  const menu = ["Dashboard", "Visa Inventory", "Authorization", "Candidate Follow-up", "AI CV Analyzer"];

  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="sideBrand">
          <div className="sideLogo">VF</div>
          <div>
            <h2>VisaFlow KSA</h2>
            <span>Recruitment VisaOps</span>
          </div>
        </div>
        <nav>
          {menu.map((m) => (
            <button key={m} onClick={() => setPage(m)} className={page === m ? "active" : ""}>{m}</button>
          ))}
        </nav>
        <div className="sideFooter">
          <strong>MVP Version</strong>
          <span>Frontend prototype</span>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <strong>{page}</strong>
            <span>Saudi enterprise recruitment and visa operations system</span>
          </div>
          <button className="ghostBtn">Export Report</button>
        </header>

        {page === "Dashboard" && <Dashboard />}
        {page === "Visa Inventory" && <VisaInventory />}
        {page === "Authorization" && <Authorization />}
        {page === "Candidate Follow-up" && <CandidateFollowup />}
        {page === "AI CV Analyzer" && <AICVAnalyzer />}
      </main>
    </div>
  );
}

export default App;
