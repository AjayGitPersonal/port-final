import React, { useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import useAICoreLoader from "./useAICoreLoader";

const NODE_COUNT = 7;

function NodeSVG({ x, y, r = 6, glow = false }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {glow && <circle cx={0} cy={0} r={r * 2.4} fill="rgba(96,165,250,0.06)" />}
      <circle cx={0} cy={0} r={r} fill="#60a5fa" stroke="rgba(96,165,250,0.25)" />
    </g>
  );
}

export default function AdminAILoader({ duration = 4800, onComplete }) {
  const { progress, status, finished } = useAICoreLoader({ duration });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (finished) {
      const t = setTimeout(() => onComplete && onComplete(), 700);
      return () => clearTimeout(t);
    }
  }, [finished, onComplete]);

  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const ang = (i / NODE_COUNT) * Math.PI * 2;
      const r = 84;
      arr.push({ x: Math.cos(ang) * r, y: Math.sin(ang) * r, ang });
    }
    return arr;
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(2,6,23,0.85)", backdropFilter: "blur(8px)" }}>
      <AnimatePresence>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} role="dialog" aria-label="AI initialization">
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 20, padding: 28, width: 560, maxWidth: "92vw", boxShadow: "0 10px 30px rgba(2,6,23,0.6)" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
              <div style={{ width: 320, height: 320, position: "relative" }}>
                <svg viewBox="-240 -240 480 480" style={{ width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid meet" aria-hidden>
                  <defs>
                    <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
                      <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.06" />
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {nodes.map((n, idx) => (
                    <motion.line key={`conn-${idx}`} x1={0} y1={0} x2={n.x} y2={n.y} stroke="rgba(99,102,241,0.12)" strokeWidth={1.6} strokeLinecap="round" animate={reduceMotion ? undefined : { strokeDashoffset: finished ? 0 : [0, -12, -24] }} transition={reduceMotion ? undefined : { duration: 2.6, repeat: Infinity, ease: "linear", delay: idx * 0.08 }} />
                  ))}

                  {nodes.map((n, idx) => (
                    <motion.circle key={`p-${idx}`} r={3} fill="#60a5fa" initial={reduceMotion ? undefined : { r: 0.8, opacity: 0 }} animate={reduceMotion ? undefined : { cx: [0, n.x * 0.3, n.x * 0.6, n.x], cy: [0, n.y * 0.3, n.y * 0.6, n.y], opacity: [0, 0.9, 0.6, 0] }} transition={reduceMotion ? undefined : { duration: 1.8 + idx * 0.12, repeat: Infinity, ease: "easeInOut", delay: idx * 0.06 }} />
                  ))}

                  <motion.g animate={reduceMotion ? undefined : { rotate: finished ? 0 : 360 }} transform="translate(0,0)" style={{ transformOrigin: "50% 50%" }} transition={reduceMotion ? undefined : { repeat: Infinity, ease: "linear", duration: 22 }}>
                    {nodes.map((n, i) => (
                      <g key={`node-${i}`}>
                        <NodeSVG x={n.x} y={n.y} r={7} glow={i % 2 === 0} />
                      </g>
                    ))}
                  </motion.g>

                  <motion.g initial={reduceMotion ? undefined : { scale: 0.92 }} animate={reduceMotion ? undefined : finished ? { scale: 1.08 } : { scale: [1, 1.04, 1] }} transition={reduceMotion ? undefined : { duration: 1.8, repeat: finished ? 0 : Infinity, ease: "easeInOut" }}>
                    <circle cx={0} cy={0} r={40} fill="url(#coreGlow)" />
                    <circle cx={0} cy={0} r={20} fill="#60a5fa" stroke="#8dd0ff" strokeWidth={1.4} />
                  </motion.g>
                </svg>

                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                  <div style={{ textAlign: "center", color: "white" }}>
                    {/* Logo reveal on finish */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={finished ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                    >
                        {/* Graphic logo (reveals when finished) */}
                        <motion.img
                          src="/logos/images/ajay.png.jpeg"
                          alt="AR logo"
                          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.6, y: 6 }}
                          animate={reduceMotion ? undefined : finished ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 6 }}
                          transition={{ duration: 0.6, ease: "easeOut", delay: finished ? 0.08 : 0 }}
                          style={{ width: 88, height: 88, borderRadius: 14, objectFit: "cover", boxShadow: "0 8px 26px rgba(2,6,23,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}
                        />
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }} style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>Preparing Personalized Learning Experience...</motion.div>
                  </div>
                </div>
              </div>

              <div style={{ width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
                <div style={{ width: "100%", background: "rgba(255,255,255,0.04)", borderRadius: 9999, height: 8, overflow: "hidden" }}>
                  <motion.div style={{ height: 8, borderRadius: 9999, background: "linear-gradient(90deg,#60a5fa,#7c3aed)" }} initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ ease: "easeOut", duration: 0.6 }} aria-hidden />
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.85)", fontSize: 13 }}>
                  <div>{status}</div>
                  <div style={{ fontWeight: 600 }}>{progress}%</div>
                </div>

                <div style={{ paddingTop: 6 }}>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ color: "rgba(255,255,255,0.95)", fontWeight: 600 }}>
                    {finished ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                          <circle cx="10" cy="10" r="9" stroke="#10b981" strokeWidth="1.6" />
                          <path d="M5.5 10.2l2.6 2.6L14.5 6" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div>✓ Intelligence Ready</div>
                      </div>
                    ) : (
                      <div>{status}</div>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
