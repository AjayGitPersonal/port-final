// src/pages/Portfolio.jsx
import Navbar               from "../components/Navbar";
import Footer               from "../components/Footer";
import TickerBar            from "../components/TickerBar";
import PartnerStrip         from "../components/PartnerStrip";
import Hero                 from "../sections/Hero";
import TechLogos            from "../sections/TechLogos";
import About                from "../sections/About";
import Domains              from "../sections/Domains";
import Experience           from "../sections/Experience";
import Sessions             from "../sections/Sessions";
import Certifications       from "../sections/Certifications";
import Contact              from "../sections/Contact";
import SEO                  from "../components/seo/SEO";
import { PersonJsonLd }     from "../components/seo/JsonLd";
import SectionErrorBoundary from "../components/SectionErrorBoundary";

export default function Portfolio() {
  return (
    <>
      <SEO />
      <PersonJsonLd />

      {/* Both fixed — TickerBar at top:0 (z:101), Navbar at top:38px (z:100) */}
      <TickerBar />
      <Navbar />

      {/* Spacer pushes main content below the fixed ticker(38px) + navbar(76px) */}
      <div style={{ height: "114px" }} aria-hidden="true" />

      <main>
        <SectionErrorBoundary name="Hero">
          <Hero />
        </SectionErrorBoundary>

        {/* Partner logos — Oracle, IBM, AWS etc below Hero */}
        <SectionErrorBoundary name="PartnerStrip">
          <PartnerStrip />
        </SectionErrorBoundary>

        {/* StatsStrip removed — About section already has count-up stats */}

        <SectionErrorBoundary name="TechLogos">
          <TechLogos />
        </SectionErrorBoundary>
        <SectionErrorBoundary name="About">
          <About />
        </SectionErrorBoundary>
        <SectionErrorBoundary name="Domains">
          <Domains />
        </SectionErrorBoundary>
        <SectionErrorBoundary name="Experience">
          <Experience />
        </SectionErrorBoundary>
        <SectionErrorBoundary name="Sessions">
          <Sessions />
        </SectionErrorBoundary>
        <SectionErrorBoundary name="Certifications">
          <Certifications />
        </SectionErrorBoundary>
        <SectionErrorBoundary name="Contact">
          <Contact />
        </SectionErrorBoundary>
      </main>

      <Footer />
    </>
  );
}
