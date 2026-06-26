// src/components/TickerBar.jsx
import { Award, Building2, Users, MapPin, Cpu, Cloud, BrainCircuit } from "lucide-react";
import styles from "./TickerBar.module.css";

const ITEMS = [
  { icon: Users,        text: "2000+ Students Trained" },
  { icon: Cloud,        text: "Oracle DevOps Certified" },
  { icon: BrainCircuit, text: "IBM" },
  { icon: Building2,    text: "15+ Institutions" },
  { icon: Award,        text: "TN Skills Trainer" },
  { icon: MapPin,       text: "Coimbatore · Tamil Nadu" },
  { icon: Cpu,          text: "AI · DevOps · Cloud · Data Science" },
];

const TRACK = [...ITEMS, ...ITEMS];

export default function TickerBar() {
  return (
    <div className={styles.ticker} aria-hidden="true">
      <div className={styles.track}>
        {TRACK.map((item, i) => (
          <span key={i} className={styles.item}>
            <item.icon size={12} className={styles.icon} strokeWidth={2} />
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
