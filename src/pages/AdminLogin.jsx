// src/pages/AdminLogin.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Lock, Eye, EyeOff, Shield } from "lucide-react";
import { parseError } from "../utils/errorHandler";
import useAuthStore from "../store/authStore";
import SEO from "../components/seo/SEO";
import AdminAILoader from "../components/admin/AdminAILoader";
import styles from "./AdminLogin.module.css";

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS   = 5 * 60 * 1000; // 5 minutes

export default function AdminLogin() {
  const navigate  = useNavigate();
  const user      = useAuthStore((s) => s.user);

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd]   = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(null);

  // Redirect if already logged in
  useEffect(() => { if (user) navigate("/dashboard", { replace: true }); }, [user, navigate]);

  // Lockout countdown
  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    if (!lockedUntil) return;
    const interval = setInterval(() => {
      const left = Math.max(0, lockedUntil - Date.now());
      setTimeLeft(Math.ceil(left / 1000));
      if (left <= 0) { setLockedUntil(null); setAttempts(0); setError(""); }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockedUntil]);

  const isLocked = lockedUntil && Date.now() < lockedUntil;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLocked) return;
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // ensure loader is visible for at least 1200ms so users see the AI initialization
      await new Promise((res) => setTimeout(res, 1200));
      navigate("/dashboard", { replace: true });
      return; // don't fallthrough to clearing loading here (component will unmount)
    } catch (err) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        setLockedUntil(Date.now() + LOCKOUT_MS);
        setError(`Too many failed attempts. Locked for 5 minutes.`);
      } else {
        setError(parseError(err) + ` (${MAX_ATTEMPTS - newAttempts} attempts left)`);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Admin Login" noindex />
      <div className={styles.page}>
        <div className={styles.left}>
          <div className={styles.leftLogo}>AR<span>.</span></div>

          <div className={styles.aiCore}>
            <div className={styles.aiWrap}>
              <img src="/adminprofile.gif" alt="AI Core" className={styles.aiGif} />
              <div className={styles.logoOverlay}>AR<span>.</span></div>
            </div>

            <div className={styles.badge}>AI Powered Administration</div>

            <ul className={styles.statusList} aria-hidden>
              <li className={styles.statusItem}><span className={styles.dot} />System Secure</li>
              <li className={styles.statusItem}><span className={styles.dot} />Authentication Ready</li>
              <li className={styles.statusItem}><span className={styles.dot} />Encrypted Access</li>
            </ul>
          </div>

          <h2 className={styles.leftTitle}>Admin Control Center</h2>
          <p className={styles.leftSub}>Secure authentication gateway for managing portfolio content, projects, blogs, analytics, training materials, and platform settings.</p>
        </div>

        <div className={styles.right}>
          <div className={styles.box}>
            <div className={styles.boxIcon}><Lock size={20} color="var(--navy)" /></div>
            <h3 className={styles.boxTitle}>Welcome Back</h3>
            <p className={styles.boxSub}>Sign in to your admin account</p>

            <form className={styles.form} onSubmit={handleLogin}>
              <div className={styles.group}>
                <label className={styles.label}>Email Address</label>
                <input
                  className={styles.input}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ajayeswaran.com"
                  required
                  autoComplete="email"
                  disabled={isLocked}
                />
              </div>

              <div className={styles.group}>
                <label className={styles.label}>Password</label>
                <div className={styles.pwdWrap}>
                  <input
                    className={styles.input}
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    required
                    autoComplete="current-password"
                    disabled={isLocked}
                  />
                  <button type="button" className={styles.eyeBtn} onClick={() => setShowPwd(!showPwd)}>
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className={styles.options}>
                <label className={styles.rememberLabel}>
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                  Remember me
                </label>
                <a href="#" className={styles.forgot}>Forgot password?</a>
              </div>

              {error && (
                <div className={`${styles.error} ${isLocked ? styles.locked : ""}`}>
                  {isLocked ? `🔒 Locked — try again in ${timeLeft}s` : error}
                </div>
              )}

              <button className={styles.loginBtn} type="submit" disabled={loading || isLocked}>
                <Lock size={15} />
                {loading ? "Signing in…" : isLocked ? `Locked (${timeLeft}s)` : "Sign In"}
              </button>

              {/* Admin AI loader during sign-in */}
              {loading && <AdminAILoader duration={3800} onComplete={() => { /* no-op, navigation handled above */ }} />}

              <p className={styles.secure}>
                <Shield size={12} /> Secure &amp; Private — Only authorised access is allowed.
              </p>
            </form>

            <div className={styles.back}>
              <Link to="/">← Back to Portfolio</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
