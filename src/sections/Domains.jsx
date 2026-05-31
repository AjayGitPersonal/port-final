// src/sections/Domains.jsx
import { motion } from "framer-motion";
import styles from "./Domains.module.css";

const domains = [
  {
  id: 1,
  title: "Python Programming",
  desc: "Core Python, OOP, libraries & real-world projects",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  syllabus: "public/syllabus/Comprehensive Python Mastery Syllabus 2026.pdf",
  learnMore: "https://www.python.org/about/",
},
{
  id: 2,
  title: "Data Science & Analytics",
  desc: "Pandas, NumPy, Matplotlib, EDA & dashboards",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  syllabus: "public/syllabus/Datascience And Analytics Mastery Syllabus 2026.pdf",
  learnMore: "https://en.wikipedia.org/wiki/Data_science",
},
{
  id: 3,
  title: "Machine Learning",
  desc: "Supervised, unsupervised, model building & deployment",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
  syllabus: "public/syllabus/Machine Learning Mastery Syllabus 2026.pdf",
  learnMore: "https://en.wikipedia.org/wiki/Machine_learning",
},
{
  id: 4,
  title: "Cloud Computing",
  desc: "Oracle Cloud, AWS fundamentals & cloud architecture",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
  secondaryLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  syllabus: "public/syllabus/Oracle Cloud Aws Cloud Architecture Mastery Syllabus 2026.pdf",
  learnMore: "https://www.oracle.com/in/cloud/",
},
{
  id: 5,
  title: "DevOps & CI/CD",
  desc: "Docker, Kubernetes, Jenkins & pipeline automation",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  syllabus: "public/syllabus/Devops And Cicd Mastery Syllabus 2026.pdf",
  learnMore: "https://en.wikipedia.org/wiki/DevOps",
},
{
  id: 6,
  title: "AI Fundamentals",
  desc: "AI concepts, Generative AI, prompt engineering & LLMs",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  syllabus: "public/syllabus/Ai.pdf",
  learnMore: "https://openai.com/academy/what-is-ai/",
},
{
  id: 7,
  title: "Core Java",
  desc: "Java fundamentals, OOP concepts, exception handling, collections & JDBC",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  syllabus: "public/syllabus/Core Java Mastery Syllabus 2026.pdf",
  learnMore: "https://www.oracle.com/java/"
},
{
  id: 8,
  title: "SQL",
  desc: "Database fundamentals, queries, joins, procedures, optimization & analytics",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg",
  syllabus: "public/syllabus/SQL Mastery Syllabus 2026.pdf",
  learnMore: "https://www.mysql.com/"
},
{
  id: 9,
  title: "Web Technologies",
  desc: "HTML, CSS, JavaScript, responsive design, frontend & backend integration",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  syllabus: "public/syllabus/Web Technologies Mastery Syllabus 2026.pdf",
  learnMore: "https://developer.mozilla.org/en-US/docs/Learn"
},
{
  id: 10,
  title: "Manual Testing",
  desc: "Software testing fundamentals, test cases, bug tracking & QA processes",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
  syllabus: "public/syllabus/Manual Testing Mastery Syllabus 2026.pdf",
  learnMore: "https://www.guru99.com/software-testing.html"
},
];

export default function Domains() {
  return (
    <section id="domains" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.tag}>Training Domains</p>
        <h2 className={styles.heading}>Areas of Expertise</h2>
        <p className={styles.sub}>
          Click any domain to explore the syllabus or learn what is covered.
        </p>
        <div className={styles.grid}>
          {domains.map((d, i) => (
            <motion.div
              key={d.id}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <div className={styles.logoWrap}>
                <img
                  src={d.logo}
                  alt={d.title}
                  className={styles.logo}
                  loading="lazy"
                />
              </div>

              <h3 className={styles.title}>{d.title}</h3>
              <p className={styles.desc}>{d.desc}</p>

              <div className={styles.actions}>
                <a
                  href={d.syllabus}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.syllabusBtn}
                >
                  Syllabus
                </a>
                <a
                  href={d.learnMore}
                  className={styles.learnBtn}
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
