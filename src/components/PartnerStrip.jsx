// src/components/PartnerStrip.jsx
import { motion } from "framer-motion";
import styles from "./PartnerStrip.module.css";

// Using devicons via CDN — already available, no install needed
// Replace src with your actual logo files if you have them
const PARTNERS = [
  {
    name: "Oracle",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
    height: 32,
  },
  {
    name: "IBM",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ibm/ibm-original.svg",
    height: 28,
  },
  {
    name: "Python",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    height: 28,
  },
  {
    name: "Google Cloud",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    height: 28,
  },
  {
    name: "AWS",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    height: 36,
  },
  {
    name: "Docker",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    height: 30,
  },
  {
    name: "Kubernetes",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    height: 28,
  },
];

export default function PartnerStrip() {
  return (
    <section className={styles.strip} aria-label="Technologies and partners">
      <p className={styles.label}>Certified with &amp; trained on</p>
      <div className={styles.logos}>
        {PARTNERS.map((p, i) => (
          <motion.div
            key={p.name}
            className={styles.logoWrap}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            title={p.name}
          >
            <img
              src={p.src}
              alt={p.name}
              height={p.height}
              width="auto"
              loading="lazy"
              className={styles.logo}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
