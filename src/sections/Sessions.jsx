// src/sections/Sessions.jsx
// Fetches live session data from Firestore (falls back to static data)
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users } from "lucide-react";
import { sessionsService } from "../services/firestore";
import { sessions as staticSessions } from "../data/content";
import styles from "./Sessions.module.css";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    sessionsService.getAll()
      .then((data) => setSessions(data.length ? data : staticSessions))
      .catch(() => setSessions(staticSessions))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="sessions" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.tag}>Session Gallery</p>
        <h2 className={styles.heading}>Session Highlights</h2>
        <p className={styles.sub}>
          Glimpses from workshops, training sessions, and hands-on labs conducted across institutions.
        </p>

        {loading ? (
          <div className={styles.loadingGrid}>
            {[1,2,3,4,5].map((i) => <div key={i} className={styles.skeleton} />)}
          </div>
        ) : (
          <div className={styles.grid}>
            {sessions.map((s, i) => (
              <motion.div
                key={s.id}
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}
              >
                {/* Photo or gradient placeholder */}
                {s.photoUrl ? (
                  <img src={s.photoUrl} alt={s.title} className={styles.photo} />
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
                    {s.location      && <span><MapPin size={11} /> {s.location}</span>}
                    {s.date          && <span><Calendar size={11} /> {s.date}</span>}
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
