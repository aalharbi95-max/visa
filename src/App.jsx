import React from "react";
import "./style.css";

const stats = [
  { value: "12,450+", label: "Visas Tracked" },
  { value: "100%", label: "SLA Visibility" },
  { value: "8", label: "Operational Stages" },
  { value: "Real-Time", label: "Cost Control" },
];

const features = [
  ["Visa Inventory", "Manage visa batches by visa number, issue date, profession, gender, nationality, project, and available balance."],
  ["Authorization Management", "Delegate visa quantities to agencies while automatically deducting from the correct visa batch balance."],
  ["Agency Follow-up", "Monitor each external office by authorization, submitted candidates, SLA days, delays, and completion rate."],
  ["Candidate Tracking", "Track every candidate: passport, medical fit/unfit, stamping, ticket, arrival, and onboarding status."],
  ["ATS & CV Matching", "Analyze CVs, extract experience and skills, rank candidates, and recommend the best match for each job."],
  ["Cost Tracking", "Control visa cost, ticket cost, agency commission, and total recruitment cost per candidate or project."],
];

const workflow = ["Request", "Visa Issuance", "Authorization", "Agency Processing", "Candidate Tracking", "Stamping", "Ticket", "Arrival", "Onboarding"];

const dashboardRows = [
  ["Authorized", "420", "blue"],
  ["Under Process - On Time", "310", "green"],
  ["Delayed +90 Days", "68", "red"],
  ["Stamped", "155", "purple"],
  ["Arrived", "235", "gray"],
];

function App() {
  return (
    <main>
      <nav className="navbar">
        <div className="brand">
          <div className="logo">VF</div>
          <div>
            <h3>VisaFlow KSA</h3>
            <span>Enterprise Visa & Recruitment Operations</span>
          </div>
        </div>
        <div className="navlinks">
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
          <a href="#pricing">Pricing</a>
          <a className="btn small" href="#demo">Request Demo</a>
        </div>
      </nav>

      <section className="hero">
        <div className="heroText">
          <p className="eyebrow">Built for large Saudi enterprises</p>
          <h1>Manage visas, agencies, candidates, costs, and onboarding from one platform.</h1>
          <p className="subtitle">
            VisaFlow KSA helps HR and recruitment teams control visa inventory, authorizations, external agencies, candidate progress, SLA delays, tickets, arrival, and onboarding.
          </p>
          <div className="heroActions">
            <a className="btn" href="#demo">Book a Demo</a>
            <a className="btn secondary" href="#features">View Features</a>
          </div>
          <div className="stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboardCard">
          <div className="dashHeader">
            <div>
              <span>Executive Dashboard</span>
              <h2>Visa Operations Overview</h2>
            </div>
            <b>Live</b>
          </div>
          <div className="dashStats">
            <div><strong>1,188</strong><span>Total Cases</span></div>
            <div><strong>94%</strong><span>SLA Compliance</span></div>
            <div><strong>SAR 3.7M</strong><span>Total Cost</span></div>
            <div><strong>24</strong><span>Agencies</span></div>
          </div>
          <div className="statusList">
            {dashboardRows.map(([name, qty, color]) => (
              <div className="statusRow" key={name}>
                <span>{name}</span>
                <strong className={color}>{qty}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="sectionTitle">
          <p className="eyebrow">Product Modules</p>
          <h2>One system for the full recruitment visa lifecycle</h2>
          <p>Designed around the real operational flow used by HR, recruitment, agencies, and project teams.</p>
        </div>
        <div className="featureGrid">
          {features.map(([title, text], i) => (
            <div className="featureCard" key={title}>
              <div className="featureIcon">{String(i + 1).padStart(2, "0")}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="workflow">
        <div className="workflowText">
          <p className="eyebrow light">Operational Workflow</p>
          <h2>From manpower request to onboarding, every stage is visible.</h2>
          <p>Each step is tracked with ownership, dates, SLA, delay reason, and next action.</p>
        </div>
        <div className="workflowGrid">
          {workflow.map((w, i) => (
            <div className="workflowStep" key={w}>
              <span>Step {i + 1}</span>
              <strong>{w}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="section twoCol">
        <div>
          <p className="eyebrow">Agency Portal</p>
          <h2>Control external offices with clear SLA and candidate-level follow-up.</h2>
          <p className="subtitle dark">Track what was authorized, how many candidates were submitted, who passed medical, who was stamped, who received tickets, and who arrived.</p>
          <ul className="checklist">
            <li>Clickable views for delayed, on-time, stamped, arrived, and pending cases.</li>
            <li>Agency performance scorecards based on SLA and completion progress.</li>
            <li>Candidate-level tracking under each authorization batch.</li>
            <li>Cost visibility across visa, ticket, commission, and other expenses.</li>
          </ul>
        </div>
        <div className="agencyCard">
          <h3>Noman Associates - Bangladesh</h3>
          <p>Authorization AUTH-0001</p>
          <div className="agencyGrid">
            <div><strong>200</strong><span>Authorized</span></div>
            <div><strong>142</strong><span>Candidates</span></div>
            <div><strong>89</strong><span>Stamped</span></div>
            <div className="danger"><strong>31</strong><span>Delayed</span></div>
          </div>
          <div className="nextAction">Next Action: Submit remaining candidates before SLA breach.</div>
        </div>
      </section>

      <section id="pricing" className="pricing">
        <div className="sectionTitle">
          <p className="eyebrow">Pricing</p>
          <h2>Enterprise-ready commercial model</h2>
          <p>Flexible plans based on users, visa volume, modules, and custom workflow requirements.</p>
        </div>
        <div className="priceGrid">
          <div className="priceCard"><h3>Starter</h3><p>Internal visa tracking</p><strong>SAR 5,000 / month</strong></div>
          <div className="priceCard featured"><h3>Professional</h3><p>Recruitment + agency operations</p><strong>SAR 15,000 / month</strong></div>
          <div className="priceCard"><h3>Enterprise</h3><p>Large companies and custom workflows</p><strong>Custom Pricing</strong></div>
        </div>
      </section>

      <section id="demo" className="cta">
        <h2>Ready to control your visa operations?</h2>
        <p>Book a product demo and see how VisaFlow KSA works end-to-end.</p>
        <a className="btn" href="mailto:sales@visaflowksa.com">Request Demo</a>
      </section>

      <footer>© 2026 VisaFlow KSA. Built for enterprise HR, recruitment, and manpower operations.</footer>
    </main>
  );
}

export default App;
