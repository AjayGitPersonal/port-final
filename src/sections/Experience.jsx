// src/sections/Experience.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, ChevronDown, ChevronUp, Wifi, WifiOff, Award } from "lucide-react";
import styles from "./Experience.module.css";

const offline = [
  {
    id: 1,
    org: "PPG Institute of Technology",
    dept: "EEE, CSE, IT",
    count: 400,
    stack: "Data Science — In-depth with Projects",
    working: "Naan Mudhalvan (Govt) + Oracle + Adroit Technologies",
    location: "Tamil Nadu",
  },
  {
    id: 2,
    org: "Dhanalakshmi College of Engineering (DCE)",
    dept: "CSE",
    count: 104,
    stack: "Data Science — In-depth with Projects",
    working: "Naan Mudhalvan (Govt) + Oracle + Adroit Technologies",
    location: "Tamil Nadu",
  },
  {
    id: 3,
    org: "Dhanalakshmi College of Engineering (DCE)",
    dept: "AIDS",
    count: 55,
    stack: "DevOps — In-depth with Projects",
    working: "Naan Mudhalvan (Govt) + Oracle + Adroit Technologies",
    location: "Tamil Nadu",
  },
  {
    id: 4,
    org: "P. A. Polytechnic College",
    dept: "CS",
    count: 60,
    stack: "Cloud Computing & Oracle Cloud + Practicals",
    working: "Naan Mudhalvan (Govt) + Oracle + Adroit Technologies",
    location: "Pollachi",
  },
  {
    id: 5,
    org: "Govt Polytechnic College",
    dept: "CS",
    count: 48,
    stack: "Cloud Computing & Oracle Cloud + Practicals",
    working: "Naan Mudhalvan (Govt) + Oracle + Adroit Technologies",
    location: "Dharmapuri",
  },
  {
    id: 6,
    org: "Govt Polytechnic College",
    dept: "CS",
    count: 50,
    stack: "Cloud Computing & Oracle Cloud + Practicals",
    working: "Naan Mudhalvan (Govt) + Oracle + Adroit Technologies",
    location: "Kadathur",
  },
  {
    id: 7,
    org: "Shri Krishna Polytechnic College",
    dept: "CS",
    count: 10,
    stack: "Cloud Computing & Oracle Cloud + Practicals",
    working: "Naan Mudhalvan (Govt) + Oracle + Adroit Technologies",
    location: "Dharmapuri",
  },
  {
    id: 8,
    org: "N. V. Polytechnic College",
    dept: "CS",
    count: 50,
    stack: "Cloud Computing & Oracle Cloud + Practicals",
    working: "Naan Mudhalvan (Govt) + Oracle + Adroit Technologies",
    location: "Udumalaipettai",
  },
];

const onlineBU = [
  "Adharsh Vidyalaya College of Arts & Science for Women, Bhavani",
  "A.G. College of Arts and Science",
  "Cherran College for Women, Tirupur",
  "Government Arts and Science College, Kangeyam",
  "Government Arts and Science College, Modakkurichi",
  "Kamalam College of Arts and Science, Udumalpet",
  "NIFT-TEA College of Knitwear Fashion",
  "Pollachi College of Arts and Science",
  "San International College of Arts & Science, Coimbatore",
  "Sasurie College of Arts and Science, Erode",
  "Kamban College of Arts and Science, Palladam",
  "St Paul's College of Arts and Science for Women",
  "Government Arts and Science College, Valparai",
  "Kaypeeyes College of Arts and Science",
];

const onlineUM = [
  "Madha Arts and Science College, Thandalam, Chennai",
  "Prince Shri Venkateshwara Arts & Science College, Gowriwakkam, Chennai",
  "Sri Santhoshi College of Arts and Science, Paiyamvadi, Maduranthakam",
  "Tagore College of Arts and Science, Chrompet, Chennai",
];

const totalOffline = offline.reduce((s, e) => s + e.count, 0);

export default function Experience() {
  const [showAllOffline, setShowAllOffline] = useState(false);
  const [showBU, setShowBU] = useState(false);
  const [showUM, setShowUM] = useState(false);

  const visibleOffline = showAllOffline ? offline : offline.slice(0, 4);

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <p className={styles.tag}>Experience</p>
          <h2 className={styles.heading}>Training Experience</h2>
          <p className={styles.sub}>
            Delivered hands-on, industry-aligned training across government institutions,
            engineering colleges, and corporate programs.
          </p>
        </div>

        {/* ── OFFLINE ── */}
        <div className={styles.block}>
          <div className={styles.blockHeader}>
            <div className={styles.blockTitle}>
              <WifiOff size={16} />
              Offline — In-Person Training
            </div>
            <div className={styles.blockBadge}>{totalOffline}+ students · {offline.length} institutions</div>
          </div>

          <div className={styles.grid}>
            <AnimatePresence>
              {visibleOffline.map((e, i) => (
                <motion.div
                  key={e.id}
                  className={styles.card}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className={styles.cardTop}>
                    <div className={styles.orgName}>{e.org}</div>
                    <span className={styles.countBadge}>
                      <Users size={11} /> {e.count} students
                    </span>
                  </div>

                  <div className={styles.dept}>Dept: {e.dept}</div>

                  <div className={styles.stackRow}>
                    <span className={styles.stackLabel}>Tech Stack</span>
                    <span className={styles.stackVal}>{e.stack}</span>
                  </div>

                  <div className={styles.cardFooter}>
                    <span className={styles.location}>
                      <MapPin size={11} /> {e.location}
                    </span>
                    <span className={styles.working}>{e.working}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {offline.length > 4 && (
            <button
              className={styles.toggleBtn}
              onClick={() => setShowAllOffline(!showAllOffline)}
            >
              {showAllOffline ? (
                <><ChevronUp size={15} /> Show Less</>
              ) : (
                <><ChevronDown size={15} /> Show All {offline.length} Institutions</>
              )}
            </button>
          )}
        </div>

        {/* ── ONLINE ── */}
        <div className={styles.block}>
          <div className={styles.blockHeader}>
            <div className={styles.blockTitle}>
              <Wifi size={16} />
              Online Training
            </div>
            <div className={styles.blockBadge}>1400+ students · {onlineBU.length + onlineUM.length} colleges</div>
          </div>

          <div className={styles.onlineGrid}>

            {/* Bharathiyar University */}
            <div className={styles.uniBlock}>
              <div className={styles.uniHeader}>
                <div>
                  <div className={styles.uniName}>Under Bharathiyar University</div>
                  <div className={styles.uniCount}>800+ students · {onlineBU.length} colleges</div>
                </div>
                <button className={styles.collapseBtn} onClick={() => setShowBU(!showBU)}>
                  {showBU ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              <AnimatePresence>
                {showBU && (
                  <motion.ul
                    className={styles.collegeList}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {onlineBU.map((c, i) => (
                      <li key={i} className={styles.collegeItem}>
                        <span className={styles.collegeDot} />
                        {c}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              {!showBU && (
                <p className={styles.collapseHint}>Click to view all {onlineBU.length} colleges</p>
              )}
            </div>

            {/* University of Madras */}
            <div className={styles.uniBlock}>
              <div className={styles.uniHeader}>
                <div>
                  <div className={styles.uniName}>Under University of Madras</div>
                  <div className={styles.uniCount}>600+ students · {onlineUM.length} colleges</div>
                </div>
                <button className={styles.collapseBtn} onClick={() => setShowUM(!showUM)}>
                  {showUM ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              <AnimatePresence>
                {showUM && (
                  <motion.ul
                    className={styles.collegeList}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {onlineUM.map((c, i) => (
                      <li key={i} className={styles.collegeItem}>
                        <span className={styles.collegeDot} />
                        {c}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              {!showUM && (
                <p className={styles.collapseHint}>Click to view all {onlineUM.length} colleges</p>
              )}
            </div>

          </div>
        </div>

        {/* ── IBM INTERNSHIP ── */}
        <div className={styles.block}>
          <div className={styles.blockHeader}>
            <div className={styles.blockTitle}>
              <Award size={16} />
              Corporate & Freelance
            </div>
          </div>

          <div className={styles.ibmGrid}>
            <div className={styles.ibmCard}>
              <div className={styles.ibmLogo}>IBM</div>
              <div className={styles.ibmContent}>
                <div className={styles.ibmTitle}>Internship Team Lead</div>
                <div className={styles.ibmSub}>Project: Learning Management System (LMS)</div>
                <div className={styles.ibmTags}>
                  <span>3 Teams · 25 Interns/team</span>
                  <span>Guiding & Mentoring</span>
                  <span>Technical Guidance</span>
                  <span>Review 1, 2 & Final</span>
                </div>
                <div className={styles.ibmWorking}>IBM — Naan Mudhalvan</div>
              </div>
            </div>

            <div className={styles.ibmCard}>
              <div className={styles.ibmLogo} style={{ background: "#d1fae5", color: "#065f46" }}>F</div>
              <div className={styles.ibmContent}>
                <div className={styles.ibmTitle}>Freelance Trainer</div>
                <div className={styles.ibmSub}>Java & Python — Individual & Group Sessions</div>
                <div className={styles.ibmTags}>
                  <span>Java</span>
                  <span>Python</span>
                  <span>Custom Curriculum</span>
                </div>
              </div>
            </div>

            <div className={styles.ibmCard}>
              <div className={styles.ibmLogo} style={{ background: "#ede9fe", color: "#5b21b6" }}>AT</div>
              <div className={styles.ibmContent}>
                <div className={styles.ibmTitle}>Assist Faculty Training Programs</div>
                <div className={styles.ibmSub}>Web Technologies & Cloud</div>
                <div className={styles.ibmTags}>
                  <span>Web Tech</span>
                  <span>Cloud Computing</span>
                  <span>Faculty Development</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
