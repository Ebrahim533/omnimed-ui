import ServicePageLayout from "@/components/ServicePageLayout";
import { useServicePage } from "@/hooks/useSanity";
import { getSanityImageUrl } from "@/lib/sanity";
import { Loader2 } from "lucide-react";

const RPMPage = () => {
  const { servicePage, loading, error } = useServicePage("rpm");

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
    console.warn("[RPM Debug] Failed to load RPM from CMS, using fallback content. Error:", error, "ServicePage:", servicePage);
    // Fallback to hardcoded content if CMS fails
    return (
      <ServicePageLayout
        label="Remote Patient Monitoring"
        headline="Enhance Patient Outcomes with Real-Time RPM"
        subheadline="Our RPM platform connects patients to their care team through wearable devices and smart sensors, enabling continuous health monitoring and proactive intervention from anywhere."
        heroImage="https://images.pexels.com/photos/8413183/pexels-photo-8413183.jpeg"
        heroStats={[
          { value: "15K+", label: "Devices Connected" },
          { value: "< 3s", label: "Alert Response" },
          { value: "HIPAA", label: "Fully Compliant" },
          { value: "87%", label: "Engagement Rate" },
        ]}
        featureHighlights={[
          "Real-Time Monitoring",
          "FDA-Approved Devices",
          "Smart Alerts",
          "Patient Mobile App",
          "EHR Integration",
        ]}
        howItWorksSteps={[
          "Enroll patients and deliver configured monitoring devices",
          "Patients record vitals from home via connected devices",
          "Care team monitors data with automated threshold alerts",
          "Proactive interventions prevent complications and ER visits",
        ]}
        howItWorksImage="https://images.pexels.com/photos/8413183/pexels-photo-8413183.jpeg"
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

export default RPMPage;
