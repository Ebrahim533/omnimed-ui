import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 pt-16">
      <PageTransition>{children}</PageTransition>
    </main>
    <Footer />
  </div>
);

export default Layout;
