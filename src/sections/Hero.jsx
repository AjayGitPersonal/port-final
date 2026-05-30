// src/sections/Hero.jsx
import { motion } from "framer-motion";
import { ArrowRight, Download, Link2, GitBranch, Mail } from "lucide-react";
import styles from "./Hero.module.css";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <section id="home" className={styles.section}>
      <div className={styles.container}>
        {/* LEFT */}
        <div className={styles.left}>
          <motion.div {...fadeUp(0.1)} className={styles.tag}>
            <span className={styles.dot} />
            AI &amp; Tech Trainer
          </motion.div>

           <motion.p {...fadeUp(0.15)} className={styles.intro}>
    Empowering Future Tech Leaders
  </motion.p>

  <motion.h1 {...fadeUp(0.2)} className={styles.heading}>
    The best way to <br />
    predict the future <br />
    is to <span className={styles.accent}>build it.</span>
  </motion.h1>

  <motion.p {...fadeUp(0.3)} className={styles.sub}>
    Training the next generation of AI & Cloud professionals.
  </motion.p>

  <motion.p {...fadeUp(0.4)} className={styles.desc}>
    I help students and professionals gain practical industry-ready skills
    through real-world AI, DevOps, Cloud, and Data Engineering projects.
  </motion.p>

          <motion.div {...fadeUp(0.5)} className={styles.btns}>
            <button
              className={styles.btnPrimary}
              onClick={() => document.querySelector("#sessions")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore My Work <ArrowRight size={16} />
            </button>
            <a href="public/doc/Ajayeswaran_Raja.pdf" download className={styles.btnOutline}>
              Download CV <Download size={16} />
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.6)} className={styles.socials}>
            <a href="www.linkedin.com/in/ajayeswaran-raja" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
              <Link2 size={16} />
            </a>
            <a href="https://github.com/AjayGitPersonal" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="GitHub">
              <GitBranch size={16} />
            </a>
            <a href="mailto:ajayeswaran23@gmail.com" className={styles.socialIcon} aria-label="Email">
              <Mail size={16} />
            </a>
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div
  className={styles.right}
  initial={{ opacity: 0, scale: 0.96 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
>
  {/* Stacked card effect */}
  <div className={styles.cardStack}>
    <div className={styles.cardBack2} />
    <div className={styles.cardBack1} />

    {/* Main photo card */}
    <div className={styles.imgCard}>
      <img src="/logos/images/ajay.png.jpeg" alt="Ajayeswaran Raja" className={styles.heroPhoto} />

      {/* Voice chat bubble */}
      <div className={styles.voiceCard}>
        <div className={styles.voiceTop}>
          <span className={styles.voiceSpark}>✦</span>
          <p className={styles.voiceIntro}>
            Hi, I'm <strong>Ajayeswaran Raja.</strong>
          </p>
        </div>
        <p className={styles.voiceText}>
          I help students and professionals become industry-ready in
          AI, DevOps &amp; Cloud.
        </p>
        <p className={styles.voiceCta}>Let's build your future together!</p>

        {/* Wave + play button */}
        <div className={styles.voiceBottom}>
          <div className={styles.waveWrap}>
            {[...Array(28)].map((_, i) => (
              <div
                key={i}
                className={styles.waveBar}
                style={{ animationDelay: `${i * 0.07}s` }}
              />
            ))}
          </div>
          <button className={styles.playBtn} aria-label="Play">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* Students badge */}
  <div className={styles.badge}>
    <div className={styles.badgeAvatars}>
      {["S","M","K"].map((l) => (
        <span key={l} className={styles.badgeAvatar}>{l}</span>
      ))}
    </div>
    <div>
      <div className={styles.badgeNum}>2000+</div>
      <div className={styles.badgeText}>Students Trained</div>
    </div>
  </div>
</motion.div>
      </div>
    </section>
  );
}
