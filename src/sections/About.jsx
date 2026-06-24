// src/sections/About.jsx
import { motion } from "framer-motion";
import styles from "./About.module.css";
import { useEffect, useRef, useState } from "react";

function AnimatedNum({ target, suffix = "", green = false }) {
  const { count, ref } = useCountUp(target);
  return (
    <div
      ref={ref}
      className={`${styles.statNum} ${green ? styles.green : ""}`}
    >
      {count}{suffix}
    </div>
  );
}

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(target);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

const skills = [
  { label: "Python & ML",        pct: 90, color: "#e2e8f0" },
  { label: "Cloud & DevOps",     pct: 85, color: "#94a3b8" },
  { label: "Data Science",       pct: 88, color: "#c084fc" },
  { label: "AI Fundamentals",    pct: 92, color: "#f472b6" },
  { label: "CI/CD & Kubernetes", pct: 80, color: "#60a5fa" },
];

function DonutChart() {
  const cx = 100, cy = 100, R = 75, r = 48;
  const gap = 0.04;
  const total = skills.reduce((s, k) => s + k.pct, 0);

  let angle = -Math.PI / 2;
  const slices = skills.map((sk) => {
    const pct   = sk.pct / total;
    const sweep = pct * 2 * Math.PI - gap;
    const start = angle + gap / 2;
    const end   = start + sweep;
    angle      += pct * 2 * Math.PI;

    const x1  = cx + R * Math.cos(start);
    const y1  = cy + R * Math.sin(start);
    const x2  = cx + R * Math.cos(end);
    const y2  = cy + R * Math.sin(end);
    const ix1 = cx + r * Math.cos(start);
    const iy1 = cy + r * Math.sin(start);
    const ix2 = cx + r * Math.cos(end);
    const iy2 = cy + r * Math.sin(end);
    const lg  = sweep > Math.PI ? 1 : 0;

    return {
      ...sk,
      d: `M${x1},${y1} A${R},${R} 0 ${lg},1 ${x2},${y2} L${ix2},${iy2} A${r},${r} 0 ${lg},0 ${ix1},${iy1} Z`,
    };
  });

  return (
    <div className={styles.donutWrap}>
      {/* Chart only — no floating labels */}
      <svg viewBox="0 0 200 200" className={styles.donutSvg}>
        {/* Outer dark ring */}
        <circle cx={cx} cy={cy} r={R + 12} fill="#2a2a2a" />
        {/* Slices */}
        {slices.map((s, i) => (
          <motion.path
            key={s.label}
            d={s.d}
            fill={s.color}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          />
        ))}
        {/* Inner hole */}
        <circle cx={cx} cy={cy} r={r - 4} fill="#1a1a1a" />
      </svg>

      {/* Legend — clean rows below chart */}
      <div className={styles.legend}>
        {skills.map((s) => (
          <div key={s.label} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: s.color }} />
            <span className={styles.legendLabel}>{s.label}</span>
            <span className={styles.legendPct}>{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>

        {/* LEFT */}
        <div className={styles.left}>
          <p className={styles.tag}>About Me</p>
          <h2 className={styles.heading}>Passionate About<br />Tech Education</h2>
          <p className={styles.para}>
           Ajayeswaran Raja is an AI & Technology Trainer with expertise in Artificial Intelligence, Machine Learning, Data Science, DevOps, Cloud Computing, and Generative AI. Having trained 2,000+ learners, he specializes in delivering practical, industry-focused training that transforms complex technologies into real-world skills. Passionate about innovation and continuous learning, he is committed to empowering aspiring professionals with the knowledge and experience needed to succeed in today's technology-driven world.
          </p>
          <p className={styles.para}>
            Professional Motto:
            "Empowering learners with practical technology skills to innovate, adapt, and succeed in the digital era."
          </p>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <h3 className={styles.skillsTitle}>Skills &amp; Expertise</h3>
          <DonutChart />
        </div>

      </div>

      {/* Stats strip */}
      <div className={styles.statsWrap}>
        <div className={styles.statsDotBg}>
          <div className={styles.statsRow}>

            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.8">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <AnimatedNum target={2000} suffix="+" />
              <div className={styles.statLabel}>students trained</div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.8">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <AnimatedNum target={50} suffix="+" green />
              <div className={styles.statLabel}>sessions conducted</div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e07b54" strokeWidth="1.8">
                  <polyline points="17 1 21 5 17 9"/>
                  <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                  <polyline points="7 23 3 19 7 15"/>
                  <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                </svg>
              </div>
              <AnimatedNum target={6} suffix="+" />
              <div className={styles.statLabel}>tech domains covered</div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e07b54" strokeWidth="1.8">
                  <rect x="2" y="7" width="20" height="5" rx="1"/>
                  <rect x="2" y="14" width="20" height="5" rx="1"/>
                  <circle cx="6" cy="9.5" r="1" fill="#e07b54"/>
                  <circle cx="6" cy="16.5" r="1" fill="#e07b54"/>
                </svg>
              </div>
              <AnimatedNum target={10} suffix="+" />
              <div className={styles.statLabel}>certifications earned</div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}