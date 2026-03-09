import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ContactFormSection from "@/components/ContactFormSection";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const hideContactForm = pathname === "/contact";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <PageTransition>{children}</PageTransition>
      </main>
      {!hideContactForm && <ContactFormSection />}
      <Footer />
    </div>
  );
};

export default Layout;
