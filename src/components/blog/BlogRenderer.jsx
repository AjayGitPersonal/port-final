// src/components/blog/BlogRenderer.jsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import styles from "./BlogRenderer.module.css";

export default function BlogRenderer({ content }) {
  if (!content) return null;

  // If content is HTML from TipTap, render it directly
  if (content.trim().startsWith("<")) {
    return (
      <div
        className={styles.prose}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Otherwise render as Markdown
  return (
    <div className={styles.prose}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
