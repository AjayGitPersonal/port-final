// src/components/StatsStrip.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Building2, CalendarDays, ThumbsUp } from "lucide-react";
import styles from "./StatsStrip.module.css";

const STATS = [
  { num: 2000, suffix: "+", label: "Students Trained",  Icon: GraduationCap },
  { num: 15,   suffix: "+", label: "Institutions",      Icon: Building2     },
  { num: 5,    suffix: "+", label: "Years Experience",  Icon: CalendarDays  },
  { num: 100,  suffix: "%", label: "Satisfaction Rate", Icon: ThumbsUp      },
];

function CountUp({ target, suffix, active }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;
    let current = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(current));
    }, step);
    return () => clearInterval(timer);
  }, [active, target]);

  return <>{val.toLocaleString()}{suffix}</>;
}

export default function StatsStrip() {
  const ref    = useRef(null);
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
        {STATS.map(({ num, suffix, label, Icon }, i) => (
          <motion.div
            key={label}
            className={styles.stat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.iconWrap}>
              <Icon size={22} strokeWidth={1.5} className={styles.icon} />
            </div>
            <div className={styles.num}>
              <CountUp target={num} suffix={suffix} active={active} />
            </div>
            <div className={styles.label}>{label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
