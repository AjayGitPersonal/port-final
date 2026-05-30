// src/components/seo/JsonLd.jsx
// Structured data for Google rich results
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ajayeswaran Raja",
    jobTitle: "AI & Tech Trainer",
    description: "AI & Tech Trainer specialising in Python, Data Science, Machine Learning, Cloud Computing, and DevOps.",
    url: "https://ajayeswaran.com",
    sameAs: [
      "https://linkedin.com/in/ajayeswaran",
      "https://github.com/ajayeswaran",
    ],
    knowsAbout: [
      "Python Programming",
      "Data Science",
      "Machine Learning",
      "Cloud Computing",
      "DevOps",
      "AI Fundamentals",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BlogPostJsonLd({ post }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline:      post.title,
    description:   post.excerpt,
    image:         post.coverUrl,
    author: {
      "@type": "Person",
      name: "Ajayeswaran Raja",
    },
    publisher: {
      "@type": "Person",
      name: "Ajayeswaran Raja",
    },
    datePublished: post.publishedAt,
    dateModified:  post.updatedAt || post.publishedAt,
    keywords:      post.tags?.join(", "),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
