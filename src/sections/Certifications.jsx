// src/sections/Certifications.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, CheckCircle, Clock, Star, X, ZoomIn } from "lucide-react";
import { certsService } from "../services/firestore";
import styles from "./Certifications.module.css";

const staticCerts = [
  {
    id: "1",
    abbr: "OCI",
    title: "OCI Foundations Associate",
    issuer: "Oracle",
    bg: "#fee2e2",
    color: "#dc2626",
    year: "2024",
    status: "completed",
    order: 1,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
    certImage: "",
  },
  {
    id: "2",
    abbr: "OCI",
    title: "Oracle DevOps Professional",
    issuer: "Oracle",
    bg: "#fee2e2",
    color: "#dc2626",
    year: "2025",
    status: "completed",
    order: 2,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
    certImage: "",
  },
  {
    id: "3",
    abbr: "AWS",
    title: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    bg: "#fef3c7",
    color: "#d97706",
    year: "2026+",
    status: "pursuing",
    order: 3,
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

export default function Certifications() {
  const [certs, setCerts]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [preview, setPreview]   = useState(null);

  useEffect(() => {
    certsService.getAll()
      .then((data) => setCerts(data.length ? data : staticCerts))
      .catch(() => setCerts(staticCerts))
      .finally(() => setLoading(false));
  }, []);

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
          <p className={styles.sub}>Validated expertise across cloud, AI, and DevOps platforms.</p>
        </div>

        {/* ── PART 1: Timeline + Pursuing ── */}
        <div className={styles.mainGrid}>

          {/* Timeline */}
          <div className={styles.timelineWrap}>
            <p className={styles.sectionLabel}>JOURNEY TIMELINE</p>
            <div className={styles.track}>
              <div className={styles.trackLine} />
              {loading ? (
                <div className={styles.trackLoading}>Loading…</div>
              ) : (
                sorted.map((c, i) => (
                  <motion.div
                    key={c.id}
                    className={styles.trackItem}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className={`${styles.node} ${c.status === "pursuing" ? styles.nodePursuing : styles.nodeCompleted}`}>
                      {c.status === "pursuing" ? <Star size={13} /> : <CheckCircle size={13} />}
                    </div>
                    <div className={styles.timelineCard}>
                      <div className={styles.certLogoWrap} style={{ background: c.bg }}>
                        {c.logo
                          ? <img src={c.logo} alt={c.abbr} className={styles.certLogo} />
                          : <span style={{ color: c.color, fontWeight: 800, fontSize: 12 }}>{c.abbr}</span>
                        }
                      </div>
                      <div className={styles.certInfo}>
                        <div className={styles.certYear}>{c.year || "—"}</div>
                        <div className={styles.certTitle}>{c.title}</div>
                        <div className={styles.certIssuer}>{c.issuer || c.sub}</div>
                      </div>
                      <span className={styles.statusPill} data-status={c.status || "completed"}>
                        {c.status === "pursuing"
                          ? <><Clock size={10} /> In Progress</>
                          : <><CheckCircle size={10} /> Completed</>
                        }
                      </span>
                      {c.link && (
                        <a href={c.link} target="_blank" rel="noreferrer" className={styles.verifyLink}>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Currently Pursuing */}
          {pursuing.length > 0 && (
            <div className={styles.pursuingWrap}>
              <p className={styles.sectionLabel}>CURRENTLY PURSUING</p>
              <div className={styles.pursuingList}>
                {pursuing.map((c, i) => (
                  <motion.div
                    key={c.id}
                    className={styles.pursuingCard}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className={styles.pursuingLogo} style={{ background: c.bg }}>
                      {c.logo
                        ? <img src={c.logo} alt={c.abbr} style={{ width: 22, height: 22, objectFit: "contain" }} />
                        : <span style={{ color: c.color, fontWeight: 800, fontSize: 11 }}>{c.abbr}</span>
                      }
                    </div>
                    <div>
                      <div className={styles.pursuingTitle}>{c.title}</div>
                      <div className={styles.pursuingSub}>{c.issuer || c.sub}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── PART 2: Certificate Image Gallery ── */}
        <div className={styles.gallerySection}>
          <p className={styles.sectionLabel}>MY CERTIFICATES</p>
          <h3 className={styles.galleryHeading}>Check Out My Certificates</h3>
          <p className={styles.gallerySub}>
            Click any certificate to view it in full size.
          </p>

          <div className={styles.certGallery}>
            {sorted.filter(c => c.status !== "pursuing").map((c, i) => (
              <motion.div
                key={c.id}
                className={styles.certCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                onClick={() => c.certImage && setPreview(c)}
              >
                {/* Certificate image or placeholder */}
                <div className={styles.certImgWrap}>
                  {c.certImage ? (
                    <>
                      <img src={c.certImage} alt={c.title} className={styles.certImg} loading="lazy" />
                      <div className={styles.certImgOverlay}>
                        <ZoomIn size={24} color="#fff" />
                      </div>
                    </>
                  ) : (
                    <div className={styles.certPlaceholder}>
                      <div className={styles.placeholderTop}>
                        {c.logo
                          ? <img src={c.logo} alt={c.abbr} style={{ width: 48, height: 48, objectFit: "contain" }} />
                          : <div style={{ width: 48, height: 48, borderRadius: 10, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", color: c.color, fontWeight: 800 }}>{c.abbr}</div>
                        }
                        <div className={styles.placeholderBadge}>COURSE CERTIFICATE</div>
                      </div>
                      <div className={styles.placeholderName}>Ajayeswaran Raja</div>
                      <div className={styles.placeholderLine} />
                      <div className={styles.placeholderLine} style={{ width: "60%" }} />
                      <div className={styles.placeholderLine} style={{ width: "80%" }} />
                      <div className={styles.uploadHint}>Upload certificate image via Admin</div>
                    </div>
                  )}
                </div>

                {/* Info below */}
                <div className={styles.certCardInfo}>
                  <div className={styles.certCardTitle}>{c.title}</div>
                  <div className={styles.certCardIssuer}>{c.issuer || c.sub || c.abbr}</div>
                  <div className={styles.certCardYear}>{c.year}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Quote strip ── */}
        <div className={styles.quoteStrip}>
          <div className={styles.quoteLeft}>
            <span className={styles.quoteIcon}>"</span>
            <p className={styles.quoteText}>
              Continuous learning is the bridge between today's knowledge and tomorrow's innovation.
            </p>
          </div>
          <div className={styles.valuesRow}>
            {values.map((v) => (
              <div key={v.label} className={styles.valueItem}>
                <span className={styles.valueIcon}>{v.icon}</span>
                <span className={styles.valueLabel}>{v.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {preview && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
          >
            <motion.div
              className={styles.lightboxInner}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.lightboxClose} onClick={() => setPreview(null)}>
                <X size={20} />
              </button>
              <img src={preview.certImage} alt={preview.title} className={styles.lightboxImg} />
              <div className={styles.lightboxInfo}>
                <div className={styles.lightboxTitle}>{preview.title}</div>
                <div className={styles.lightboxIssuer}>{preview.issuer}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
