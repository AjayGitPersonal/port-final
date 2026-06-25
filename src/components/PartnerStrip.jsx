// src/components/PartnerStrip.jsx
// Partner / accreditation logo strip — placed between Hero and TechLogos in Portfolio.jsx
// Uses text logos (no external images needed) — replace with <img> when you have actual logos
import { motion } from "framer-motion";
import styles from "./PartnerStrip.module.css";

const PARTNERS = [
  { name: "Oracle",           abbr: "ORACLE",          color: "#dc2626" },
  { name: "IBM",              abbr: "IBM",              color: "#1d4ed8" },
  { name: "Naan Mudhalvan",   abbr: "NAAN MUDHALVAN",  color: "#059669" },
  { name: "Anna University",  abbr: "ANNA UNIVERSITY", color: "#7c3aed" },
  { name: "Adroit Technologies", abbr: "ADROIT TECH",  color: "#0891b2" },
];

export default function PartnerStrip() {
  return (
    <section className={styles.strip} aria-label="Partner organisations">
      <p className={styles.label}>Trusted by & certified with</p>
      <div className={styles.logos}>
        {PARTNERS.map((p, i) => (
          <motion.div
            key={p.name}
            className={styles.logoWrap}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            title={p.name}
          >
            <span className={styles.logoText} style={{ color: p.color }}>
              {p.abbr}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
