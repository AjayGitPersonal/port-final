// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Lock } from "lucide-react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { href: "#home",           label: "Home" },
  { href: "#about",          label: "About" },
  { href: "#domains",        label: "Domains" },
  { href: "#experience",     label: "Experience" },
  { href: "#sessions",       label: "Sessions" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact",        label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <span className={styles.logo}>AR<span>.</span></span>

        <ul className={styles.links}>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <button onClick={() => scrollTo(l.href)} className={styles.link}>
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <Link to="/admin" className={styles.adminBtn}>
          <Lock size={14} />
          Admin Login
        </Link>

        <button className={styles.hamburger} onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className={styles.mobileLink}>
              {l.label}
            </button>
          ))}
          <Link to="/admin" className={styles.mobileAdmin} onClick={() => setOpen(false)}>
            Admin Login
          </Link>
        </div>
      )}
    </nav>
  );
}
