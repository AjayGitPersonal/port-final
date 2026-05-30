import SEO from "../components/seo/SEO";

export default function ContactPage() {
  return (
    <main style={{ padding: "48px 5%", maxWidth: 900, margin: "0 auto" }}>
      <SEO title="Contact" />
      <h1 style={{ fontFamily: "var(--font-display)", marginBottom: 18 }}>Contact</h1>

      <section aria-labelledby="contact-details">
        <h2 id="contact-details">Get in touch</h2>
        <p><strong>Name:</strong> Ajayeswaran Raja</p>
        <p><strong>Role:</strong> AI &amp; Technology Trainer</p>
        <p><strong>Email:</strong> <a href="mailto:ajayeswaran23@gmail.com">ajayeswaran23@gmail.com</a></p>
        <p><strong>Location:</strong> Tamil Nadu, India</p>
      </section>

      <section aria-labelledby="services" style={{ marginTop: 20 }}>
        <h2 id="services">Services</h2>
        <ul>
          <li>Corporate Training</li>
          <li>AI &amp; Generative AI Training</li>
          <li>DevOps Training</li>
          <li>Cloud Computing Training</li>
          <li>Data Science Training</li>
          <li>Technical Consulting</li>
        </ul>
      </section>
    </main>
  );
}
