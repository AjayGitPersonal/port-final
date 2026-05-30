// src/pages/admin/MessagesManager.jsx
import { useState, useEffect } from "react";
import {
  getMessages, markMessageRead, markMessageStarred, deleteMessage
} from "../../services/firestore";
import {
  Mail, Star, Trash2, RefreshCw, ChevronLeft, Search,
  MailOpen, AlertCircle
} from "lucide-react";
import styles from "./MessagesManager.module.css";

function timeAgo(ts) {
  if (!ts) return "";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  const diff = (Date.now() - date.getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function MessagesManager() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | unread | starred
  const [deleting, setDeleting] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openMessage = async (msg) => {
    setSelected(msg);
    if (!msg.read) {
      await markMessageRead(msg.id, true);
      setMessages(prev =>
        prev.map(m => m.id === msg.id ? { ...m, read: true } : m)
      );
    }
  };

  const toggleStar = async (e, msg) => {
    e.stopPropagation();
    const next = !msg.starred;
    await markMessageStarred(msg.id, next);
    setMessages(prev =>
      prev.map(m => m.id === msg.id ? { ...m, starred: next } : m)
    );
    if (selected?.id === msg.id) setSelected(prev => ({ ...prev, starred: next }));
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Delete this message?")) return;
    setDeleting(id);
    try {
      await deleteMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selected?.id === id) setSelected(null);
    } finally {
      setDeleting(null);
    }
  };

  const filtered = messages.filter(m => {
    const matchSearch =
      !search ||
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()) ||
      m.subject?.toLowerCase().includes(search.toLowerCase()) ||
      m.message?.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "all" ||
      (filter === "unread" && !m.read) ||
      (filter === "starred" && m.starred);

    return matchSearch && matchFilter;
  });

  const unreadCount = messages.filter(m => !m.read).length;
  const starredCount = messages.filter(m => m.starred).length;

  return (
    <div className={styles.root}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sideTop}>
          <h2 className={styles.sideTitle}>Inbox</h2>
          <button className={styles.refreshBtn} onClick={load} title="Refresh">
            <RefreshCw size={15} />
          </button>
        </div>

        <div className={styles.filterList}>
          {[
            { key: "all", label: "All Messages", count: messages.length, icon: <Mail size={14} /> },
            { key: "unread", label: "Unread", count: unreadCount, icon: <MailOpen size={14} /> },
            { key: "starred", label: "Starred", count: starredCount, icon: <Star size={14} /> },
          ].map(f => (
            <button
              key={f.key}
              className={`${styles.filterBtn} ${filter === f.key ? styles.filterActive : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.icon}
              <span>{f.label}</span>
              {f.count > 0 && (
                <span className={`${styles.badge} ${f.key === "unread" ? styles.badgeBlue : ""}`}>
                  {f.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Message list */}
      <div className={styles.list}>
        <div className={styles.searchWrap}>
          <Search size={14} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search messages..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className={styles.empty}>
            <div className={styles.spinner} />
            <p>Loading messages...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            <Mail size={36} strokeWidth={1.2} style={{ color: "var(--gray300)" }} />
            <p>{search ? "No results found" : "No messages yet"}</p>
          </div>
        ) : (
          filtered.map(msg => (
            <div
              key={msg.id}
              className={`${styles.msgRow} ${!msg.read ? styles.unread : ""} ${selected?.id === msg.id ? styles.active : ""}`}
              onClick={() => openMessage(msg)}
            >
              {/* Unread dot */}
              <span className={`${styles.dot} ${!msg.read ? styles.dotActive : ""}`} />

              <div className={styles.msgContent}>
                <div className={styles.msgTop}>
                  <span className={styles.msgName}>{msg.name}</span>
                  <span className={styles.msgTime}>{timeAgo(msg.createdAt)}</span>
                </div>
                <div className={styles.msgSubject}>{msg.subject}</div>
                <div className={styles.msgPreview}>{msg.message?.slice(0, 80)}...</div>
              </div>

              <div className={styles.msgActions}>
                <button
                  className={`${styles.iconBtn} ${msg.starred ? styles.starred : ""}`}
                  onClick={e => toggleStar(e, msg)}
                  title={msg.starred ? "Unstar" : "Star"}
                >
                  <Star size={14} fill={msg.starred ? "#f59e0b" : "none"} />
                </button>
                <button
                  className={styles.iconBtn}
                  onClick={e => handleDelete(e, msg.id)}
                  disabled={deleting === msg.id}
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail panel */}
      <div className={`${styles.detail} ${selected ? styles.detailOpen : ""}`}>
        {selected ? (
          <>
            <div className={styles.detailHeader}>
              <button className={styles.backBtn} onClick={() => setSelected(null)}>
                <ChevronLeft size={16} /> Back
              </button>
              <div className={styles.detailActions}>
                <button
                  className={`${styles.iconBtn} ${selected.starred ? styles.starred : ""}`}
                  onClick={e => toggleStar(e, selected)}
                  title={selected.starred ? "Unstar" : "Star"}
                >
                  <Star size={15} fill={selected.starred ? "#f59e0b" : "none"} />
                </button>
                <button
                  className={styles.iconBtn}
                  onClick={e => handleDelete(e, selected.id)}
                  title="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            <div className={styles.detailBody}>
              <h3 className={styles.detailSubject}>{selected.subject}</h3>

              <div className={styles.senderRow}>
                <div className={styles.senderAvatar}>
                  {selected.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <div className={styles.senderName}>{selected.name}</div>
                  <a href={`mailto:${selected.email}`} className={styles.senderEmail}>
                    {selected.email}
                  </a>
                </div>
                <div className={styles.detailTime}>{timeAgo(selected.createdAt)}</div>
              </div>

              <div className={styles.msgBody}>{selected.message}</div>

              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className={styles.replyBtn}
              >
                <Mail size={14} />
                Reply via Email
              </a>
            </div>
          </>
        ) : (
          <div className={styles.detailEmpty}>
            <Mail size={40} strokeWidth={1.2} style={{ color: "var(--gray300)" }} />
            <p>Select a message to read</p>
          </div>
        )}
      </div>
    </div>
  );
}
