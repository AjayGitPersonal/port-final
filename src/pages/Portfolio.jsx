// src/pages/Portfolio.jsx
import Navbar              from "../components/Navbar";
import Footer              from "../components/Footer";
import Hero                from "../sections/Hero";
import TechLogos           from "../sections/TechLogos";
import About               from "../sections/About";
import Domains             from "../sections/Domains";
import Experience          from "../sections/Experience";
import Sessions            from "../sections/Sessions";
import Certifications      from "../sections/Certifications";
import Contact             from "../sections/Contact";
import SEO                 from "../components/seo/SEO";
import { PersonJsonLd }    from "../components/seo/JsonLd";
import SectionErrorBoundary from "../components/SectionErrorBoundary";

export default function Portfolio() {
  return (
    <>
      <SEO />
      <PersonJsonLd />
      <Navbar />
      <main>
        <SectionErrorBoundary name="Hero">
          <Hero />
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
