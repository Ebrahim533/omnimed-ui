import ServicePageLayout from "@/components/ServicePageLayout";

const RPMPage = () => (
  <ServicePageLayout
    label="Remote Patient Monitoring"
    headline="Enhance Patient Outcomes with Real-Time RPM"
    subheadline="Our RPM platform connects patients to their care team through wearable devices and smart sensors, enabling continuous health monitoring and proactive intervention from anywhere."
    heroStats={[
      { value: "15K+", label: "Devices Connected" },
      { value: "< 3s", label: "Alert Response" },
      { value: "HIPAA", label: "Fully Compliant" },
      { value: "87%", label: "Engagement Rate" },
    ]}
    supportItems={[
      { title: "Full Program Setup", description: "Complete RPM infrastructure deployment including device procurement, configuration, and clinical workflow design." },
      { title: "Patient Enrollment & Onboarding", description: "White-glove device delivery, setup assistance, and patient training for confident self-monitoring at home." },
      { title: "Clinical Monitoring & Coordination", description: "24/7 automated vitals monitoring with clinical escalation for readings outside personalized thresholds." },
      { title: "Documentation & Billing Compliance", description: "Automated data logging, time tracking, and CPT code capture for seamless reimbursement." },
      { title: "Monthly Reporting & Insights", description: "Population health dashboards with trend analysis, device compliance rates, and clinical outcome metrics." },
      { title: "Device & Data Management", description: "End-to-end lifecycle management for all connected devices, including replacements, updates, and secure data transmission." },
    ]}
    includedItems={[
      { title: "Real-Time Vitals Monitoring", content: "Continuous tracking of blood pressure, glucose, SpO2, weight, and heart rate through FDA-approved wearable devices with instant cloud sync." },
      { title: "Automated Smart Alerts", content: "Intelligent notification system that alerts care teams when patient readings fall outside individually configured clinical thresholds." },
      { title: "Patient-Friendly Mobile App", content: "An intuitive companion app that empowers patients to view their own data, receive reminders, and communicate with their care team." },
      { title: "Clinical Analytics Dashboard", content: "Comprehensive provider portal with trend visualization, population health views, and exportable reports for quality measures." },
      { title: "EHR Integration & Interoperability", content: "Seamless bi-directional data flow with major EHR systems including Epic, Cerner, Athenahealth, and more." },
    ]}
    ctaLabel="Explore RPM"
  />
);

export default RPMPage;
