// src/components/Footer.jsx
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} aria-labelledby="footer-heading">
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <div className={styles.copy}>
            © {new Date().getFullYear()} Ajayeswaran Raja. All Rights Reserved.
          </div>
          <div className={styles.tagline}>
            AI &amp; Technology Trainer | DevOps | Cloud | Data Science | Generative AI
          </div>
          <div className={styles.note}>
            Built with React, Firebase &amp; Modern Web Technologies.
          </div>
        </div>

        <div className={styles.linksCol}>
          <nav aria-label="Footer navigation" className={styles.nav}>
            <Link to="/privacy" className={styles.link}>Privacy Policy</Link>
            <Link to="/terms" className={styles.link}>Terms of Use</Link>
            <Link to="/contact" className={styles.link}>Contact</Link>
          </nav>
        </div>

        <div className={styles.legalCol}>
          <p className={styles.legalHeading}>Legal &amp; Copyright</p>
          <p className={styles.legalText}>
            The logos, trademarks, brand names, certifications, and company references displayed on this website are the property of their respective owners and are used solely for educational, portfolio, training, certification, and professional reference purposes. Their appearance does not imply affiliation, sponsorship, endorsement, or partnership unless explicitly stated.
          </p>
          <p className={styles.legalText}>
            All original content, projects, articles, training materials, presentations, code samples, and website designs are protected under applicable copyright laws.
          </p>
        </div>
      </div>
    </footer>
  );
}
