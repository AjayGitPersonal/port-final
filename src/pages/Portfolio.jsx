// src/pages/Portfolio.jsx
import Navbar               from "../components/Navbar";
import Footer               from "../components/Footer";
import TickerBar            from "../components/TickerBar";
import PartnerStrip         from "../components/PartnerStrip";
import StatsStrip           from "../components/StatsStrip";
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

      {/* Ticker sits above Navbar in normal flow */}
      <SectionErrorBoundary name="TickerBar">
        <TickerBar />
      </SectionErrorBoundary>
      <Navbar />

      <main>
        <SectionErrorBoundary name="Hero">
          <Hero />
        </SectionErrorBoundary>

        {/* New: partner logos immediately below Hero */}
        <SectionErrorBoundary name="PartnerStrip">
          <PartnerStrip />
        </SectionErrorBoundary>

        {/* New: dark stats strip — 2000+ numbers above the fold */}
        <SectionErrorBoundary name="StatsStrip">
          <StatsStrip />
        </SectionErrorBoundary>

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
