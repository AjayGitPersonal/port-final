// src/sections/Sessions.jsx
// Uses TanStack Query for caching — no unnecessary Firestore refetches
import { motion } from "framer-motion";
import { MapPin, Calendar, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { sessionsService } from "../services/firestore";
import { sessions as staticSessions } from "../data/content";
import styles from "./Sessions.module.css";

// Module-level animation config — not recreated on every render
const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

function cloudinaryUrl(url, w = 600) {
  if (!url) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`);
}

export default function Sessions() {
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["sessions"],
    queryFn:  () => sessionsService.getAll(),
    staleTime: 1000 * 60 * 5,
    placeholderData: staticSessions,
  });

  return (
    <section id="sessions" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.tag}>Session Gallery</p>
        <h2 className={styles.heading}>Session Highlights</h2>
        <p className={styles.sub}>
          Glimpses from workshops, training sessions, and hands-on labs conducted across institutions.
        </p>

        {isLoading ? (
          <div className={styles.loadingGrid}>
            {[1, 2, 3, 4, 5].map((i) => <div key={i} className={styles.skeleton} />)}
          </div>
        ) : (
          <div className={styles.grid}>
            {sessions.map((s, i) => (
              <motion.div
                key={s.id}
                className={styles.card}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                {s.photoUrl ? (
                  <img
                    src={cloudinaryUrl(s.photoUrl)}
                    alt={s.title}
                    className={styles.photo}
                    loading="lazy"
                    width={600}
                    height={400}
                  />
                ) : (
                  <div
                    className={styles.thumb}
                    style={{ background: `linear-gradient(135deg, ${s.bg || "#1e3a5f"}, #1e40af)` }}
                  />
                )}

                <div className={styles.info}>
                  {s.type && (
                    <span className={`${styles.typeBadge} ${styles[s.type?.toLowerCase()]}`}>
                      {s.type}
                    </span>
                  )}
                  <h3 className={styles.title}>{s.title}</h3>
                  <p className={styles.org}>{s.org}</p>
                  <div className={styles.meta}>
                    {s.location       && <span><MapPin size={11} /> {s.location}</span>}
                    {s.date           && <span><Calendar size={11} /> {s.date}</span>}
                    {s.studentsCount > 0 && <span><Users size={11} /> {s.studentsCount} students</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
