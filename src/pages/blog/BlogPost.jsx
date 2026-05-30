// src/pages/blog/BlogPost.jsx
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import SEO from "../../components/seo/SEO";
import { BlogPostJsonLd } from "../../components/seo/JsonLd";
import BlogRenderer from "../../components/blog/BlogRenderer";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./Blog.module.css";

async function getBlogBySlug(slug) {
  const q = query(collection(db, "blogs"), where("slug", "==", slug), where("status", "==", "published"));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() };
}

export default function BlogPost() {
  const { slug } = useParams();
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["blog-slug", slug],
    queryFn:  () => getBlogBySlug(slug),
    enabled:  !!slug,
  });

  if (isLoading) return <LoadingState />;
  if (isError || !post) return <NotFound />;

  const publishedDate = post.publishedAt
    ? (() => { try { return format(new Date(post.publishedAt), "dd MMMM yyyy"); } catch { return ""; } })()
    : "";

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.coverUrl}
        url={`https://ajayeswaran.com/blog/${post.slug}`}
        type="article"
        article={{ publishedAt: post.publishedAt, tags: post.tags }}
      />
      <BlogPostJsonLd post={post} />
      <Navbar />

      <main className={styles.postPage}>
        <div className={styles.postContainer}>
          {/* Back */}
          <Link to="/blog" className={styles.back}>
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          {/* Header */}
          <header className={styles.postHeader}>
            {post.category && <span className={styles.category}>{post.category}</span>}
            <h1 className={styles.postTitle}>{post.title}</h1>
            {post.excerpt && <p className={styles.postExcerpt}>{post.excerpt}</p>}

            <div className={styles.postMeta}>
              {publishedDate && <span><Calendar size={13} /> {publishedDate}</span>}
              {post.readTime  && <span><Clock size={13} /> {post.readTime} min read</span>}
            </div>

            {post.tags?.length > 0 && (
              <div className={styles.cardTags}>
                {post.tags.map((t) => (
                  <span key={t} className={styles.cardTag}><Tag size={10} />{t}</span>
                ))}
              </div>
            )}
          </header>

          {/* Cover */}
          {post.coverUrl && (
            <img src={post.coverUrl} alt={post.title} className={styles.postCover} loading="lazy" />
          )}

          {/* Content */}
          <BlogRenderer content={post.content} />
        </div>
      </main>
      <Footer />
    </>
  );
}

function LoadingState() {
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 720, margin: "120px auto", padding: "0 24px" }}>
        {[1,2,3,4].map((i) => (
          <div key={i} style={{ height: i === 1 ? 40 : 16, background: "#f3f4f6", borderRadius: 8, marginBottom: 12, width: i === 3 ? "60%" : "100%", animation: "pulse 1.5s infinite" }} />
        ))}
      </div>
      <Footer />
    </>
  );
}

function NotFound() {
  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", padding: "120px 24px", fontFamily: "var(--font-body)" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--navy)", marginBottom: 8 }}>Post not found</h2>
        <p style={{ color: "var(--gray500)", marginBottom: 24 }}>This post doesn't exist or has been unpublished.</p>
        <Link to="/blog" style={{ background: "var(--navy)", color: "#fff", padding: "10px 24px", borderRadius: "var(--radius-sm)", fontSize: 14 }}>
          ← Back to Blog
        </Link>
      </div>
      <Footer />
    </>
  );
}
