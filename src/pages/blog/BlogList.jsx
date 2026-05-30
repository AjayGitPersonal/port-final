// src/pages/blog/BlogList.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Tag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useBlogsQuery } from "../../hooks/queries";
import { toDate } from "../../services/firestore";
import { format } from "date-fns";
import SEO from "../../components/seo/SEO";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./Blog.module.css";

export default function BlogList() {
  const { data: blogs = [], isLoading } = useBlogsQuery();
  const [activeTag, setActiveTag] = useState("All");

  const published = blogs.filter((b) => b.status === "published");
  const allTags   = ["All", ...new Set(published.flatMap((b) => b.tags || []))];
  const filtered  = activeTag === "All"
    ? published
    : published.filter((b) => b.tags?.includes(activeTag));

  return (
    <>
      <SEO
        title="Blog"
        description="Articles on AI, Data Science, Python, Cloud Computing, and DevOps by Ajayeswaran Raja."
        url="https://ajayeswaran.com/blog"
      />
      <Navbar />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.tag}>Blog</p>
            <h1 className={styles.heading}>Articles & Insights</h1>
            <p className={styles.sub}>Thoughts on AI, Cloud, DevOps and tech education.</p>
          </div>

          {/* Tag filter */}
          {allTags.length > 1 && (
            <div className={styles.tags}>
              {allTags.map((t) => (
                <button
                  key={t}
                  className={`${styles.tagBtn} ${activeTag === t ? styles.tagActive : ""}`}
                  onClick={() => setActiveTag(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          {isLoading ? (
            <div className={styles.grid}>
              {[1,2,3].map((i) => <div key={i} className={styles.skeleton} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className={styles.empty}>No posts yet. Check back soon!</div>
          ) : (
            <div className={styles.grid}>
              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  className={styles.card}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  {post.coverUrl && (
                    <Link to={`/blog/${post.slug}`}>
                      <img src={post.coverUrl} alt={post.title} className={styles.cover} loading="lazy" />
                    </Link>
                  )}
                  <div className={styles.cardBody}>
                    {post.category && <span className={styles.category}>{post.category}</span>}
                    <h2 className={styles.cardTitle}>
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
                    <div className={styles.meta}>
                      {post.readTime && <span><Clock size={12} /> {post.readTime} min read</span>}
                      {post.publishedAt && (
                        <span>{format(new Date(post.publishedAt), "dd MMM yyyy")}</span>
                      )}
                    </div>
                    {post.tags?.length > 0 && (
                      <div className={styles.cardTags}>
                        {post.tags.slice(0, 3).map((t) => (
                          <span key={t} className={styles.cardTag}><Tag size={10} />{t}</span>
                        ))}
                      </div>
                    )}
                    <Link to={`/blog/${post.slug}`} className={styles.readMore}>
                      Read Article <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
