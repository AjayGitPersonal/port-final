// src/sections/Contact.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { saveMessage } from "../services/firestore";
import styles from "./Contact.module.css";

const SOCIAL = [
  {
    icon: (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM0 8.99h5v15H0v-15zm7.5 0H12v2.07h.07c.4-.76 1.38-1.57 2.84-1.57 3.04 0 3.6 2 3.6 4.59V24h-5v-7.5c0-1.8-.03-4.12-2.5-4.12-2.5 0-2.88 1.95-2.88 3.98V24h-5v-15z" />
      </svg>
    ),
    label: "LinkedIn",
    href: "https://linkedin.com/in/ajayeswaran-raja",
  },
  {
    icon: (
      <svg width={18} height={18} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ),
    label: "GitHub",
    href: "https://github.com/AjayGitPersonal",
  },
  {
    icon: <Mail size={18} />,
    label: "Email",
    href: "mailto:ajayeswaran23@gmail.com",
  },
];

const INFO = [
  { icon: <MapPin size={16} />, label: "Location", value: "Coimbatore, Tamil Nadu" },
  { icon: <Mail size={16} />, label: "Email", value: "ajayeswaran23@gmail.com" },
  { icon: <Phone size={16} />, label: "Available", value: "Mon–Sat, 9AM–7PM IST" },
];

const EMPTY = { name: "", email: "", subject: "", message: "", _hp: "" }; // _hp = honeypot

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    // Honeypot — bots fill hidden fields; humans don't
    if (form._hp) return { _hp: "spam" };
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    // Double-check honeypot on submit
    if (form._hp) return;
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStatus("loading");
    try {
      await saveMessage(form);
      setStatus("success");
      setForm(EMPTY);
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        {/* Left — Info */}
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.tag}>Get In Touch</p>
          <h2 className={styles.heading}>Let's work together</h2>
          <p className={styles.desc}>
            Whether you're looking for a trainer for your institution, a tech session
            for your students, or just want to connect — I'm happy to hear from you.
          </p>

          <div className={styles.infoList}>
            {INFO.map(item => (
              <div key={item.label} className={styles.infoRow}>
                <span className={styles.infoIcon}>{item.icon}</span>
                <div>
                  <div className={styles.infoLabel}>{item.label}</div>
                  <div className={styles.infoValue}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.socials}>
            {SOCIAL.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className={styles.socialBtn}
                aria-label={s.label}
              >
                {s.icon}
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className={styles.formCard}>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  className={styles.successState}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CheckCircle size={48} strokeWidth={1.5} className={styles.successIcon} />
                  <h3>Message Sent!</h3>
                  <p>Thanks for reaching out. I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label className={styles.label}>Your Name *</label>
                      <input
                        className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Rajesh Kumar"
                      />
                      {errors.name && <span className={styles.error}>{errors.name}</span>}
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Email Address *</label>
                      <input
                        className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        type="email"
                      />
                      {errors.email && <span className={styles.error}>{errors.email}</span>}
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Subject</label>
                    <input
                      className={styles.input}
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Training enquiry / Collaboration / General"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Message *</label>
                    <textarea
                      className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell me about your requirement..."
                    />
                    {errors.message && <span className={styles.error}>{errors.message}</span>}
                  </div>

                  {status === "error" && (
                    <div className={styles.errorBanner}>
                      <AlertCircle size={15} />
                      <span>Failed to send. Check your connection and try again.</span>
                    </div>
                  )}

                  <button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <span className={styles.spinner} />
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── HONEYPOT FIELD — add this inside your <form> JSX ────────────────────
   Place it after the last real input. Bots fill it; real users never see it.

   <div style={{ position: "absolute", left: "-9999px", visibility: "hidden" }} aria-hidden="true">
     <label htmlFor="_hp">Leave this empty</label>
     <input
       id="_hp"
       type="text"
       name="_hp"
       tabIndex={-1}
       autoComplete="off"
       value={form._hp}
       onChange={handleChange}
     />
   </div>
─────────────────────────────────────────────────────────────────────────── */
