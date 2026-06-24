// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      // Move keyboard focus to the section for accessibility
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    }
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`} role="navigation" aria-label="Main navigation">
      <div className={styles.inner}>
        <span className={styles.logo} aria-label="Ajayeswaran Raja">AR<span aria-hidden="true">.</span></span>

        <ul className={styles.links} role="list">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <button onClick={() => scrollTo(l.href)} className={styles.link}>
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <Link to="/admin" className={styles.adminBtn}>
          <Lock size={14} aria-hidden="true" />
          Admin
        </Link>

        <button
          className={styles.hamburger}
          onClick={() => setOpen(!open)}
          aria-label="Navigation menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className={styles.mobileMenu} role="menu">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              role="menuitem"
              className={styles.mobileLink}
              onClick={() => scrollTo(l.href)}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
