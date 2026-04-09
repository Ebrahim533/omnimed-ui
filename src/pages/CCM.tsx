import ServicePageLayout from "@/components/ServicePageLayout";
import { useServicePage } from "@/hooks/useSanity";
import { getSanityImageUrl } from "@/lib/sanity";
import { Loader2 } from "lucide-react";

const CCMPage = () => {
  const { servicePage, loading, error } = useServicePage("ccm");

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading service details...</p>
        </div>
      </div>
    );
  }

  // Show error state with fallback to hardcoded content
  if (error || !servicePage) {
    console.warn("[CCM Debug] Failed to load CCM from CMS, using fallback content. Error:", error, "ServicePage:", servicePage);
    // Fallback to hardcoded content if CMS fails
    return (
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
        featureHighlights={[
          "Multi-Condition Management",
          "Continuous Monitoring",
          "Patient Education",
          "CMS Compliant",
          "Data-Driven Care",
        ]}
        howItWorksSteps={[
          "Screen and enroll eligible patients with 2+ chronic conditions",
          "Create personalized, multi-condition care plans",
          "Care coordinators provide ongoing monthly engagement",
          "Measure outcomes and optimize treatment continuously",
        ]}
        howItWorksImage="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg"
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
  }

  // Transform CMS data to match ServicePageLayout props
  const heroImageUrl = servicePage.heroImage
    ? getSanityImageUrl(servicePage.heroImage, 1200, 600)
    : undefined;
  
  const howItWorksImageUrl = servicePage.howItWorksImage
    ? getSanityImageUrl(servicePage.howItWorksImage, 800, 600)
    : heroImageUrl;

  return (
    <ServicePageLayout
      label={servicePage.label}
      headline={servicePage.headline}
      subheadline={servicePage.subheadline}
      heroImage={heroImageUrl}
      heroStats={servicePage.heroStats ?? []}
      featureHighlights={servicePage.featureHighlights ?? []}
      howItWorksSteps={servicePage.howItWorksSteps ?? []}
      howItWorksImage={howItWorksImageUrl}
      supportItems={servicePage.supportItems ?? []}
      includedItems={servicePage.includedItems ?? []}
      ctaLabel={servicePage.ctaLabel ?? "Get Started"}
    />
  );
};

export default CCMPage;
