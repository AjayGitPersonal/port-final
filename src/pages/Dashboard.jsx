// src/pages/Dashboard.jsx
import { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthStore } from "../store/authStore";
import {
  getSessions, getBlogs, getCertifications, getMessages, getUnreadCount
} from "../services/firestore";
import {
  LayoutDashboard, Calendar, FileText, Award, Mail,
  LogOut, ChevronRight, Menu, X, TrendingUp,
  Users, BookOpen, Shield, Inbox
} from "lucide-react";
import styles from "./Dashboard.module.css";

const SessionsManager    = lazy(() => import("./admin/SessionsManager"));
const BlogsManager       = lazy(() => import("./admin/BlogsManager"));
const CertificationsManager = lazy(() => import("./admin/CertificationsManager"));
const MessagesManager    = lazy(() => import("./admin/MessagesManager"));

const NAV_ITEMS = [
  { key: "overview",       label: "Overview",        icon: <LayoutDashboard size={17} /> },
  { key: "sessions",       label: "Sessions",         icon: <Calendar size={17} /> },
  { key: "blogs",          label: "Blog Posts",       icon: <FileText size={17} /> },
  { key: "certifications", label: "Certifications",   icon: <Award size={17} /> },
  { key: "messages",       label: "Messages",         icon: <Mail size={17} /> },
];

export default function Dashboard() {
  const [active, setActive]           = useState("overview");
  const [sideOpen, setSideOpen]       = useState(false);
  const [stats, setStats]             = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [unread, setUnread]           = useState(0);
  const navigate = useNavigate();
  const user = useAuthStore(s => s.user);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoadingStats(true);
    try {
      const [sessions, blogs, certs, messages, unreadCount] = await Promise.all([
        getSessions(),
        getBlogs({ adminView: true }),
        getCertifications(),
        getMessages(),
        getUnreadCount(),
      ]);
      setStats({
        sessions: sessions.length,
        publishedBlogs: blogs.filter(b => b.status === "published").length,
        draftBlogs: blogs.filter(b => b.status === "draft").length,
        certs: certs.length,
        messages: messages.length,
        recentMessages: messages.slice(0, 5),
        recentSessions: sessions.slice(0, 4),
      });
      setUnread(unreadCount);
    } catch (e) {
      console.error("Stats load error:", e);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin");
  };

  const navigate_to = (key) => {
    setActive(key);
    setSideOpen(false);
    if (key === "messages") setUnread(0);
  };

  return (
    <div className={styles.root}>
      {/* ── Sidebar ── */}
      <aside className={`${styles.sidebar} ${sideOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sideTop}>
          <div className={styles.brand}>
            <div className={styles.brandLogo}>AR</div>
            <div>
              <div className={styles.brandName}>AR. Admin</div>
              <div className={styles.brandSub}>Portfolio CMS</div>
            </div>
          </div>
          <button className={styles.closeSide} onClick={() => setSideOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              className={`${styles.navItem} ${active === item.key ? styles.navActive : ""}`}
              onClick={() => navigate_to(item.key)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
              {item.key === "messages" && unread > 0 && (
                <span className={styles.unreadBadge}>{unread}</span>
              )}
              {active === item.key && <ChevronRight size={14} className={styles.navChevron} />}
            </button>
          ))}
        </nav>

        <div className={styles.sideBottom}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>
              {user?.email?.charAt(0)?.toUpperCase()}
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>Admin</div>
              <div className={styles.userEmail}>{user?.email}</div>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Sidebar overlay on mobile */}
      {sideOpen && (
        <div className={styles.overlay} onClick={() => setSideOpen(false)} />
      )}

      {/* ── Main ── */}
      <main className={styles.main}>
        {/* Top bar */}
        <header className={styles.topbar}>
          <button className={styles.menuBtn} onClick={() => setSideOpen(true)}>
            <Menu size={20} />
          </button>
          <div className={styles.topTitle}>
            {NAV_ITEMS.find(n => n.key === active)?.label}
          </div>
          <div className={styles.topRight}>
            <div className={styles.topStatus}>
              <span className={styles.statusDot} />
              Live
            </div>
          </div>
        </header>

        {/* Content */}
        <div className={styles.content}>
          {active === "overview" && (
            <OverviewPage
              stats={stats}
              loading={loadingStats}
              onNavigate={navigate_to}
              unread={unread}
              onRefresh={loadStats}
            />
          )}

          <Suspense fallback={<PageLoader />}>
            {active === "sessions"       && <SessionsManager />}
            {active === "blogs"          && <BlogsManager />}
            {active === "certifications" && <CertificationsManager />}
            {active === "messages"       && <MessagesManager />}
          </Suspense>
        </div>
      </main>
    </div>
  );
}

// ── Overview Page ─────────────────────────────────────────────
function OverviewPage({ stats, loading, onNavigate, unread, onRefresh }) {
  const statCards = [
    {
      label: "Total Sessions",
      value: stats?.sessions ?? 0,
      icon: <Calendar size={20} />,
      color: "#2563eb",
      bg: "#eff6ff",
      action: "sessions",
    },
    {
      label: "Published Posts",
      value: stats?.publishedBlogs ?? 0,
      icon: <FileText size={20} />,
      color: "#7c3aed",
      bg: "#f5f3ff",
      action: "blogs",
    },
    {
      label: "Certifications",
      value: stats?.certs ?? 0,
      icon: <Award size={20} />,
      color: "#0891b2",
      bg: "#ecfeff",
      action: "certifications",
    },
    {
      label: "Messages",
      value: stats?.messages ?? 0,
      icon: <Mail size={20} />,
      color: "#059669",
      bg: "#ecfdf5",
      action: "messages",
      badge: unread,
    },
  ];

  return (
    <div className={styles.overview}>
      {/* Welcome */}
      <div className={styles.welcomeRow}>
        <div>
          <h1 className={styles.welcomeTitle}>Good {getGreeting()}, Ajayeswaran 👋</h1>
          <p className={styles.welcomeSub}>Here's what's happening with your portfolio today.</p>
        </div>
        <button className={styles.refreshBtn} onClick={onRefresh}>
          <TrendingUp size={14} />
          Refresh Stats
        </button>
      </div>

      {/* Stat cards */}
      <div className={styles.statGrid}>
        {statCards.map(card => (
          <button
            key={card.label}
            className={styles.statCard}
            onClick={() => onNavigate(card.action)}
          >
            <div className={styles.statIcon} style={{ background: card.bg, color: card.color }}>
              {card.icon}
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statValue}>
                {loading ? <span className={styles.skeletonNum} /> : card.value}
              </div>
              <div className={styles.statLabel}>{card.label}</div>
            </div>
            {card.badge > 0 && (
              <span className={styles.cardBadge}>{card.badge} new</span>
            )}
            <ChevronRight size={14} className={styles.statArrow} />
          </button>
        ))}
      </div>

      {/* Draft alert */}
      {!loading && (stats?.draftBlogs ?? 0) > 0 && (
        <div className={styles.draftAlert}>
          <BookOpen size={15} />
          <span>You have <strong>{stats.draftBlogs}</strong> unpublished blog draft{stats.draftBlogs > 1 ? "s" : ""}.</span>
          <button className={styles.draftBtn} onClick={() => onNavigate("blogs")}>
            Review →
          </button>
        </div>
      )}

      {/* Bottom grid */}
      <div className={styles.bottomGrid}>
        {/* Recent Messages */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitle}>
              <Inbox size={15} />
              Recent Messages
              {unread > 0 && <span className={styles.panelBadge}>{unread} unread</span>}
            </div>
            <button className={styles.panelLink} onClick={() => onNavigate("messages")}>
              View all
            </button>
          </div>

          {loading ? (
            <SkeletonList rows={4} />
          ) : !stats?.recentMessages?.length ? (
            <div className={styles.emptyPanel}>
              <Mail size={28} strokeWidth={1.2} />
              <p>No messages yet. Share your portfolio link!</p>
            </div>
          ) : (
            <div className={styles.msgList}>
              {stats.recentMessages.map(m => (
                <div key={m.id} className={styles.msgItem}>
                  <div className={styles.msgAvatar}>
                    {m.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className={styles.msgInfo}>
                    <div className={styles.msgName}>
                      {m.name}
                      {!m.read && <span className={styles.unreadDot} />}
                    </div>
                    <div className={styles.msgSubj}>{m.subject}</div>
                  </div>
                  <div className={styles.msgTime}>{timeAgo(m.createdAt)}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Sessions */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitle}>
              <Calendar size={15} />
              Recent Sessions
            </div>
            <button className={styles.panelLink} onClick={() => onNavigate("sessions")}>
              View all
            </button>
          </div>

          {loading ? (
            <SkeletonList rows={4} />
          ) : !stats?.recentSessions?.length ? (
            <div className={styles.emptyPanel}>
              <Calendar size={28} strokeWidth={1.2} />
              <p>No sessions yet.</p>
              <button
                className={styles.emptyAction}
                onClick={() => onNavigate("sessions")}
              >
                Add your first session →
              </button>
            </div>
          ) : (
            <div className={styles.sessionList}>
              {stats.recentSessions.map(s => (
                <div key={s.id} className={styles.sessionItem}>
                  {s.photo ? (
                    <img src={s.photo} alt={s.title} className={styles.sessionThumb} />
                  ) : (
                    <div className={styles.sessionThumbPlaceholder}>
                      <Calendar size={14} />
                    </div>
                  )}
                  <div className={styles.sessionInfo}>
                    <div className={styles.sessionTitle}>{s.title}</div>
                    <div className={styles.sessionMeta}>{s.institution || s.date}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className={styles.quickActions}>
        {[
          { label: "Add Session",    icon: <Calendar size={15} />,  key: "sessions" },
          { label: "Write Post",     icon: <FileText size={15} />,  key: "blogs" },
          { label: "Add Certificate",icon: <Award size={15} />,     key: "certifications" },
          { label: "Read Messages",  icon: <Mail size={15} />,      key: "messages" },
        ].map(a => (
          <button
            key={a.label}
            className={styles.quickBtn}
            onClick={() => onNavigate(a.key)}
          >
            {a.icon}
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  return "evening";
}

function timeAgo(ts) {
  if (!ts) return "";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  const diff = (Date.now() - date.getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function SkeletonList({ rows = 4 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "12px 0" }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ height: 44, background: "var(--gray100)", borderRadius: 8, animation: "pulse 1.5s ease infinite" }} />
      ))}
    </div>
  );
}

function PageLoader() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, gap: 12, color: "var(--gray400)", fontSize: 14 }}>
      <div style={{ width: 20, height: 20, border: "2px solid var(--gray200)", borderTopColor: "var(--blue)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
      Loading...
    </div>
  );
}
