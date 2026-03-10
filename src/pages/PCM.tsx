import ServicePageLayout from "@/components/ServicePageLayout";

const PCMPage = () => (
  <ServicePageLayout
    label="Principal Care Management"
    headline="Specialist-Led Care for Complex Patients"
    subheadline="Our Principal Care Management program provides focused, specialist-led coordination for patients with a single high-risk chronic condition, ensuring they receive the dedicated attention their health demands."
    heroImage="https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg"
    heroStats={[
      { value: "98%", label: "Patient Satisfaction" },
      { value: "42%", label: "Fewer ER Visits" },
      { value: "24/7", label: "Care Team Access" },
      { value: "100%", label: "HIPAA Compliant" },
    ]}
    featureHighlights={[
      "Specialist-Led Care",
      "Evidence-Based Plans",
      "24/7 Support Access",
      "HIPAA Compliant",
      "EHR Integrated",
    ]}
    howItWorksSteps={[
      "Schedule your consultation and assess patient eligibility",
      "Our specialists develop a comprehensive care plan",
      "Dedicated coordinators manage ongoing patient engagement",
      "Track outcomes with real-time reporting dashboards",
    ]}
    supportItems={[
      { title: "Full Program Setup", description: "End-to-end workflow design tailored to your practice's unique patient population and specialties." },
      { title: "Patient Enrollment & Onboarding", description: "Streamlined enrollment with patient education materials and consent management." },
      { title: "Clinical Monitoring & Coordination", description: "Specialist-led oversight with real-time health data tracking and multi-provider coordination." },
      { title: "Documentation & Billing Compliance", description: "Automated CPT code capture and audit-ready documentation for every patient encounter." },
      { title: "Monthly Reporting & Insights", description: "Comprehensive performance dashboards with patient outcomes, revenue metrics, and trend analysis." },
      { title: "Medication Reconciliation", description: "Thorough medication reviews to prevent adverse interactions and ensure treatment adherence." },
    ]}
    includedItems={[
      { title: "Specialist-Led Comprehensive Care Plans", content: "Each patient receives an evidence-based care plan developed by a specialist who oversees their complete care journey, with regular reassessments and goal tracking." },
      { title: "24/7 Access to Care Team Resources", content: "Patients and providers have round-the-clock access to clinical support, educational materials, and emergency protocols through our secure platform." },
      { title: "Medication Management & Reconciliation", content: "Regular medication reviews ensure safety, reduce polypharmacy risks, and maintain alignment between all treating providers." },
      { title: "Longitudinal Condition Management", content: "Continuous tracking and management of the patient's primary chronic condition with regular wellness check-ins and proactive intervention." },
      { title: "Care Coordination Across Providers", content: "Seamless communication between specialists, PCPs, and ancillary care teams to eliminate gaps in the patient's treatment journey." },
    ]}
    ctaLabel="Get Started with PCM"
  />
);

export default PCMPage;
