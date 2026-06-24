// src/components/seo/SEO.jsx
import { Helmet } from "react-helmet-async";

const DEFAULT = {
  title:       "AR. ",
  description: "AI & Tech Trainer specialising in Python, Data Science, Machine Learning, Cloud Computing, and DevOps. 2000+ students trained.",
  image:       "https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1/portfolio/og-image.jpg",
  url:         "https://ajayeswaran.com",
  type:        "website",
};

export default function SEO({
  title,
  description,
  image,
  url,
  type = "website",
  article,
  noindex = false,
}) {
  const t   = title       ? `${title} | Ajayeswaran Raja` : DEFAULT.title;
  const d   = description || DEFAULT.description;
  const img = image       || DEFAULT.image;
  const u   = url         || DEFAULT.url;

  return (
    <Helmet>
      <title>{t}</title>
      <meta name="description" content={d} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title"       content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:image"       content={img} />
      <meta property="og:url"         content={u} />
      <meta property="og:type"        content={type} />
      <meta property="og:site_name"   content="Ajayeswaran Raja" />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={t} />
      <meta name="twitter:description" content={d} />
      <meta name="twitter:image"       content={img} />

      {/* Article metadata */}
      {article && <meta property="article:published_time" content={article.publishedAt} />}
      {article && <meta property="article:author"         content="Ajayeswaran Raja" />}
      {article?.tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Canonical */}
      <link rel="canonical" href={u} />
    </Helmet>
  );
}