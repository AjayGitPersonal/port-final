// src/sections/TechLogos.jsx
import styles from "./TechLogos.module.css";

const logos = [
  {
    name: "Oracle",
    svg: (
      <img
        src="/logos/oracle-svgrepo-com.svg"
        alt="Oracle"
        style={{ width: 52, height: 36, objectFit: "contain" }}
      />
    ),
  },
  {
    name: "IBM",
    svg: (
      <img
        src="/logos/bee.svg"
        alt="IBM"
        style={{ width: 52, height: 36, objectFit: "contain" }}
      />
    ),
  },
  {
    name: "Docker",
    svg: (
      <img
        src="/logos/docker-svgrepo-com.svg"
        alt="Docker"
        style={{ width: 52, height: 36, objectFit: "contain" }}
      />
    ),
  },
  {
    name: "Kubernetes",
    svg: (
      <img
        src="/logos/kubernetes-svgrepo-com.svg"
        alt="Kubernetes"
        style={{ width: 52, height: 36, objectFit: "contain" }}
      />
    ),
  },
  {
    name: "GitHub",
    svg: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 4C11.2 4 4 11.2 4 20c0 7.1 4.6 13.1 11 15.2.8.1 1.1-.3 1.1-.8v-2.7c-4.5 1-5.4-2.1-5.4-2.1-.7-1.8-1.8-2.3-1.8-2.3-1.5-1 .1-1 .1-1 1.6.1 2.5 1.6 2.5 1.6 1.4 2.4 3.7 1.7 4.7 1.3.1-1 .6-1.7 1-2.1-3.5-.4-7.3-1.8-7.3-7.9 0-1.7.6-3.2 1.6-4.3-.2-.4-.7-2 .2-4.2 0 0 1.3-.4 4.4 1.6 1.3-.4 2.6-.5 4-.5s2.7.2 4 .5c3.1-2 4.4-1.6 4.4-1.6.9 2.2.3 3.8.2 4.2 1 1.1 1.6 2.5 1.6 4.3 0 6.1-3.7 7.5-7.3 7.9.6.5 1.1 1.5 1.1 3v4.4c0 .4.3.9 1.1.8C31.4 33.1 36 27.1 36 20c0-8.8-7.2-16-16-16z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "Jenkins",
    svg: (
      <img
        src="/logos/jenkins-svgrepo-com.svg"
        alt="Jenkins"
        style={{ width: 52, height: 36, objectFit: "contain" }}
      />
    ),
  },
];

export default function TechLogos() {
  return (
    <div className={styles.bar}>
      <div className={styles.track}>
        {[...logos, ...logos].map((l, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.icon}>{l.svg}</div>
            <span className={styles.label}>{l.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}