import SEO from "../components/seo/SEO";

export default function Terms() {
  return (
    <main style={{ padding: "48px 5%", maxWidth: 900, margin: "0 auto" }}>
      <SEO title="Terms of Use" />
      <h1 style={{ fontFamily: "var(--font-display)", marginBottom: 18 }}>Terms of Use</h1>

      <p>This website and its contents are provided for educational and informational purposes.</p>

      <h2>Intended Use</h2>
      <p>Articles, projects, training materials, presentations, and code samples are intended for learning, evaluation, and professional reference.</p>

      <h2>Copyright</h2>
      <p>All original content, including code samples and designs, is protected by copyright. Unauthorized reproduction or commercial redistribution is prohibited.</p>

      <h2>Third-party Trademarks</h2>
      <p>Third-party logos, trademarks, certifications, and company references remain the property of their respective owners. Their inclusion does not imply endorsement or affiliation unless expressly stated.</p>

      <h2>Limitation</h2>
      <p>The site owner is not responsible for any damages arising from the use of the information on this website.</p>
    </main>
  );
}
