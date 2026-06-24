// src/components/seo/JsonLd.jsx
// Structured data for Google rich results — enhanced for Knowledge Panel

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ajayeswaran Raja",
    alternateName: "Ajju",
    jobTitle: "AI & Tech Trainer",
    description:
      "Corporate Trainer specialising in AI, Data Science, Machine Learning, Cloud Computing, and DevOps. 2000+ students trained across engineering, polytechnic, and arts & science institutions in Tamil Nadu.",
    url: "https://ajayeswaran.com",
    email: "ajayeswaran23@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    worksFor: {
      "@type": "Organization",
      name: "Adroit Technologies Innovative Solutions Pvt Ltd",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Anna University",
      description: "B.E. Computer Science and Engineering",
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Corporate Trainer",
      occupationLocation: {
        "@type": "State",
        name: "Tamil Nadu",
      },
      skills: "AI, Machine Learning, Data Science, Cloud Computing, DevOps, Oracle Cloud, Python",
    },
    knowsAbout: [
      "Python Programming",
      "Machine Learning",
      "Data Science",
      "Cloud Computing",
      "Oracle Cloud Infrastructure",
      "DevOps",
      "AI Fundamentals",
      "React.js",
      "Kubernetes",
      "CI/CD Pipelines",
    ],
    sameAs: [
      "https://www.linkedin.com/in/ajayeswaran-raja",
      "https://github.com/AjayGitPersonal",
    ],
    award: [
      "Oracle Cloud Infrastructure Foundations Associate",
      "Oracle DevOps Professional",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
    />
  );
}

export function BlogPostJsonLd({ post }) {
  if (!post) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline:      post.title,
    description:   post.excerpt,
    image:         post.coverUrl,
    url:           `https://ajayeswaran.com/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: "Ajayeswaran Raja",
      url: "https://ajayeswaran.com",
    },
    publisher: {
      "@type": "Person",
      name: "Ajayeswaran Raja",
    },
    datePublished: post.publishedAt,
    dateModified:  post.updatedAt || post.publishedAt,
    keywords:      post.tags?.join(", "),
    inLanguage:    "en",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
    />
  );
}
