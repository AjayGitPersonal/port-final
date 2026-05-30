// src/data/content.js

export const domains = [
  { id: 1, title: "Python Programming",      color: "#dbeafe", icon: "code" },
  { id: 2, title: "Data Science & Analytics", color: "#d1fae5", icon: "bar-chart" },
  { id: 3, title: "Machine Learning",         color: "#ede9fe", icon: "cpu" },
  { id: 4, title: "Cloud Computing",          color: "#fef3c7", icon: "cloud" },
  { id: 5, title: "DevOps & CI/CD",           color: "#fee2e2", icon: "settings" },
  { id: 6, title: "AI Fundamentals",          color: "#e0e7ff", icon: "zap" },
];

export const experiences = [
  { id: 1, type: "Academic",  org: "PSG College of Technology",           role: "Oracle Cloud Workshop",         location: "Coimbatore" },
  { id: 2, type: "Academic",  org: "Nandha Polytechnic College",          role: "Python Programming Session",    location: "Erode" },
  { id: 3, type: "Corporate", org: "Adroit Tech — Corporate Batch",       role: "DevOps Training Program",       location: "Coimbatore" },
  { id: 4, type: "Academic",  org: "Sri Krishna Arts & Science College",  role: "ML Hands-on Workshop",          location: "Coimbatore" },
  { id: 5, type: "Corporate", org: "IBM — Corporate Intern Batch",        role: "Mentoring IBM Interns",         location: "Virtual" },
  { id: 6, type: "Online",    org: "PSG College of Technology",           role: "AI Workshop & Generative AI",   location: "Coimbatore" },
];

export const sessions = [
  { id: 1, title: "Oracle Cloud Workshop",       org: "PSG College of Technology",          location: "Coimbatore",  bg: "#1e3a5f" },
  { id: 2, title: "Python Programming Session",  org: "Nandha Polytechnic College",         location: "Erode",       bg: "#064e3b" },
  { id: 3, title: "DevOps Training Program",     org: "Adroit Tech — Corporate Batch",      location: "Coimbatore",  bg: "#78350f" },
  { id: 4, title: "ML Hands-on Workshop",        org: "Sri Krishna Arts & Science College", location: "Coimbatore",  bg: "#4c1d95" },
  { id: 5, title: "Student Interaction",         org: "Mentoring IBM Interns",              location: "Virtual",     bg: "#1e3a5f" },
];

export const certifications = [
  { id: 1, title: "Oracle Cloud Infrastructure", sub: "OCI Professional Certified",    abbr: "OCI", bg: "#fee2e2", color: "#dc2626" },
  { id: 2, title: "AWS Solutions Architect",      sub: "Associate Level Certification", abbr: "AWS", bg: "#fef3c7", color: "#d97706" },
  { id: 3, title: "IBM AI Engineering",           sub: "Professional Certificate",      abbr: "IBM", bg: "#dbeafe", color: "#2563eb" },
  { id: 4, title: "Certified Kubernetes Admin",   sub: "CNCF Certified",                abbr: "K8s", bg: "#d1fae5", color: "#059669" },
  { id: 5, title: "TensorFlow Developer",         sub: "Google Certification",          abbr: "ML",  bg: "#ede9fe", color: "#7c3aed" },
  { id: 6, title: "GitHub Actions",               sub: "CI/CD Specialization",          abbr: "GH",  bg: "#e0e7ff", color: "#4f46e5" },
];

export const skills = [
  { label: "Python & ML",       pct: 90, color: "#2563eb" },
  { label: "Cloud & DevOps",    pct: 85, color: "#10b981" },
  { label: "Data Science",      pct: 88, color: "#7c3aed" },
  { label: "AI Fundamentals",   pct: 92, color: "#f59e0b" },
  { label: "CI/CD & Kubernetes",pct: 80, color: "#ef4444" },
];

export const techLogos = ["Oracle", "AWS", "Docker", "Kubernetes", "GitHub", "Jenkins"];
