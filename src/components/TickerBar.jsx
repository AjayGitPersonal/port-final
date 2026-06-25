// src/components/TickerBar.jsx
// Scrolling announcement bar — sits above Navbar in Portfolio.jsx
// Self-contained: no external deps, no token conflicts, no z-index clash with Navbar (z-100)
import styles from "./TickerBar.module.css";

const ITEMS = [
  "🎓 2000+ Students Trained",
  "☁️ Oracle Cloud Certified",
  "🤖 IBM AI Partner",
  "🏛 15+ Institutions",
  "🏆 Naan Mudhalvan Trainer",
  "📍 Coimbatore · Tamil Nadu",
  "🚀 AI · DevOps · Cloud · Data Science",
];

// Duplicate items so the scroll loop is seamless
const TRACK = [...ITEMS, ...ITEMS];

export default function TickerBar() {
  return (
    <div className={styles.ticker} aria-hidden="true">
      <div className={styles.track}>
        {TRACK.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
