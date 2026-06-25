// src/components/StatsStrip.jsx
// Full-bleed dark stats strip — placed after PartnerStrip, before About
// Uses IntersectionObserver count-up (same pattern as About.jsx — no new deps)
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./StatsStrip.module.css";

const STATS = [
  { num: 2000, suffix: "+", label: "Students Trained",   icon: "🎓" },
  { num: 15,   suffix: "+", label: "Institutions",       icon: "🏛" },
  { num: 5,    suffix: "+", label: "Years Experience",   icon: "📅" },
  { num: 100,  suffix: "%", label: "Satisfaction Rate",  icon: "⭐" },
];

function CountUp({ target, suffix, active }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [active, target]);

  return <>{val.toLocaleString()}{suffix}</>;
}

export default function StatsStrip() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className={styles.strip} ref={ref} aria-label="Key statistics">
      <div className={styles.inner}>
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className={styles.stat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.icon} aria-hidden="true">{s.icon}</div>
            <div className={styles.num}>
              <CountUp target={s.num} suffix={s.suffix} active={active} />
            </div>
            <div className={styles.label}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
