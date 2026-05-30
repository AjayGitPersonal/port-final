// src/pages/Portfolio.jsx
import Navbar         from "../components/Navbar";
import Footer         from "../components/Footer";
import Hero           from "../sections/Hero";
import TechLogos      from "../sections/TechLogos";
import About          from "../sections/About";
import Domains        from "../sections/Domains";
import Experience     from "../sections/Experience";
import Sessions       from "../sections/Sessions";
import Certifications from "../sections/Certifications";
import Contact        from "../sections/Contact";
import SEO            from "../components/seo/SEO";
import { PersonJsonLd } from "../components/seo/JsonLd";

export default function Portfolio() {
  return (
    <>
      <SEO />
      <PersonJsonLd />
      <Navbar />
      <main>
        <Hero />
        <TechLogos />
        <About />
        <Domains />
        <Experience />
        <Sessions />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
