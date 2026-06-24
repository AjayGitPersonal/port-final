// src/sections/Certifications.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, CheckCircle, Clock, Star, X, ZoomIn } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { certsService } from "../services/firestore";
import styles from "./Certifications.module.css";

const staticCerts = [
  {
    id: "1", abbr: "OCI", title: "OCI Foundations Associate",
    issuer: "Oracle", bg: "#fee2e2", color: "#dc2626", year: "2024",
    status: "completed", order: 1,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
    certImage: "",
  },
  {
    id: "2", abbr: "OCI", title: "Oracle DevOps Professional",
    issuer: "Oracle", bg: "#fee2e2", color: "#dc2626", year: "2025",
    status: "completed", order: 2,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
    certImage: "",
  },
  {
    id: "3", abbr: "AWS", title: "AWS Solutions Architect",
    issuer: "Amazon Web Services", bg: "#fef3c7", color: "#d97706", year: "2026+",
    status: "pursuing", order: 3,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    certImage: "",
  },
];

const values = [
  { icon: "🎯", label: "Goal Driven" },
  { icon: "📚", label: "Always Learning" },
  { icon: "⚙️", label: "Build & Implement" },
  { icon: "🚀", label: "Impact & Grow" },
];

function cloudinaryUrl(url, w = 800) {
  if (!url) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`);
}

export default function Certifications() {
  const [preview, setPreview] = useState(null);

  const { data: certs = [], isLoading } = useQuery({
    queryKey: ["certifications"],
    queryFn:  () => certsService.getAll(),
    staleTime: 1000 * 60 * 10,
    placeholderData: staticCerts,
  });

  const completed = certs.filter((c) => c.status === "completed" || !c.status);
  const pursuing  = certs.filter((c) => c.status === "pursuing");
  const sorted    = [...certs].sort((a, b) => (a.order || 99) - (b.order || 99));

  return (
    <section id="certifications" className={styles.section}>
      <div className={styles.container}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <p className={styles.tag}>Certifications</p>
          <h2 className={styles.heading}>Certification Journey</h2>
          <div className={styles.statsRow}>
            <span className={styles.statPill}>
              <CheckCircle size={13} /> {completed.length} Completed
            </span>
            <span className={`${styles.statPill} ${styles.pursuing}`}>
              <Clock size={13} /> {pursuing.length} Pursuing
            </span>
          </div>
        </div>

        {/* ── Timeline ── */}
        {isLoading ? (
          <div className={styles.loadingGrid}>
            {[1, 2, 3].map((i) => <div key={i} className={styles.skeleton} />)}
          </div>
        ) : (
          <div className={styles.timeline}>
            {sorted.map((c, i) => (
              <motion.div
                key={c.id}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.certCard} style={{ "--cert-color": c.color, "--cert-bg": c.bg }}>
                  <div className={styles.certTop}>
                    <div className={styles.logoWrap} style={{ background: c.bg }}>
                      <img
                        src={c.logo}
                        alt={c.issuer}
                        width={32}
                        height={32}
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.certInfo}>
                      <span className={styles.abbr}>{c.abbr}</span>
                      <h3 className={styles.certTitle}>{c.title}</h3>
                      <p className={styles.issuer}>{c.issuer} · {c.year}</p>
                    </div>
                    <span className={`${styles.statusBadge} ${styles[c.status]}`}>
                      {c.status === "completed" ? <CheckCircle size={11} /> : <Clock size={11} />}
                      {c.status === "completed" ? "Earned" : "In Progress"}
                    </span>
                  </div>

                  {/* Certificate image gallery */}
                  {c.certImage && (
                    <button
                      className={styles.previewBtn}
                      onClick={() => setPreview(c)}
                      aria-label={`View ${c.title} certificate`}
                    >
                      <img
                        src={cloudinaryUrl(c.certImage, 400)}
                        alt={`${c.title} certificate preview`}
                        className={styles.certThumb}
                        loading="lazy"
                        width={400}
                        height={280}
                      />
                      <div className={styles.previewOverlay}>
                        <ZoomIn size={20} />
                      </div>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Values strip ── */}
        <div className={styles.valuesStrip}>
          {values.map((v) => (
            <div key={v.label} className={styles.valueItem}>
              <span className={styles.valueIcon}>{v.icon}</span>
              <span className={styles.valueLabel}>{v.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Certificate lightbox ── */}
      <AnimatePresence>
        {preview && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${preview.title} certificate`}
          >
            <motion.div
              className={styles.lightboxInner}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeBtn}
                onClick={() => setPreview(null)}
                aria-label="Close certificate preview"
              >
                <X size={18} />
              </button>
              <img
                src={cloudinaryUrl(preview.certImage, 1200)}
                alt={`${preview.title} certificate`}
                className={styles.lightboxImg}
              />
              <p className={styles.lightboxTitle}>{preview.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
