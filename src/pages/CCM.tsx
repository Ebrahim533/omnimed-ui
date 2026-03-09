import ServicePageLayout from "@/components/ServicePageLayout";

const CCMPage = () => (
  <ServicePageLayout
    label="Chronic Care Management"
    headline="Long-Term Health Stability for Complex Patients"
    subheadline="Our CCM program provides ongoing, coordinated care for patients managing multiple chronic conditions — reducing hospitalizations, improving adherence, and elevating quality of life."
    heroImage="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg"
    heroStats={[
      { value: "35%", label: "Reduced Readmissions" },
      { value: "2M+", label: "Care Minutes Logged" },
      { value: "99.9%", label: "Uptime Reliability" },
      { value: "50+", label: "EHR Integrations" },
    ]}
    supportItems={[
      { title: "Full Program Setup", description: "Turnkey CCM workflow implementation customized to your clinic's size, specialty, and patient demographics." },
      { title: "Patient Enrollment & Onboarding", description: "Automated eligibility screening, consent collection, and patient education for seamless onboarding." },
      { title: "Clinical Monitoring & Coordination", description: "Continuous monitoring by dedicated care coordinators with escalation protocols for abnormal findings." },
      { title: "Documentation & Billing Compliance", description: "Automated time tracking, CPT code assignment, and CMS-compliant documentation for every interaction." },
      { title: "Monthly Reporting & Insights", description: "Actionable dashboards showing enrollment growth, patient outcomes, and revenue performance." },
      { title: "Health Education & Self-Management", description: "Personalized educational resources and coaching to empower patients in managing their conditions." },
    ]}
    includedItems={[
      { title: "Comprehensive Care for 2+ Chronic Conditions", content: "Structured care plans that address the interplay between multiple chronic conditions, with monthly revisions based on patient progress." },
      { title: "Continuous Communication with Care Team", content: "Patients have direct, ongoing access to their assigned care coordinator for questions, medication concerns, and health updates." },
      { title: "Medication Adherence Tracking", content: "Smart reminders, refill coordination, and regular medication reconciliation to ensure patients stay on track with their treatment regimens." },
      { title: "Preventive Care & Wellness Planning", content: "Proactive screening schedules, immunization tracking, and lifestyle modification support to prevent disease progression." },
      { title: "Data-Driven Care Adjustments", content: "We track outcomes and adjust care plans based on real health data — not guesswork — using trend analysis and clinical benchmarks." },
    ]}
    ctaLabel="Start CCM Program"
  />
);

export default CCMPage;
