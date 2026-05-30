import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import useAICoreLoader from "./useAICoreLoader";

type Props = {
  duration?: number; // ms
  onComplete?: () => void;
};

const NODE_COUNT = 7;

function NodeSVG({ x, y, r = 6, glow = false }: { x: number; y: number; r?: number; glow?: boolean }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {glow && (
        <circle cx={0} cy={0} r={r * 2.4} fill="rgba(96,165,250,0.06)" />
      )}
      <circle cx={0} cy={0} r={r} fill="#60a5fa" stroke="rgba(96,165,250,0.25)" />
    </g>
  );
}

export default function AdminAILoader({ duration = 4800, onComplete }: Props) {
  const { progress, status, finished } = useAICoreLoader({ duration });
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (finished) {
      const t = setTimeout(() => onComplete && onComplete(), 800);
      return () => clearTimeout(t);
    }
  }, [finished, onComplete]);

  // nodes positions around a circle
  const nodes = React.useMemo(() => {
    const arr = [] as { x: number; y: number; ang: number }[];
    for (let i = 0; i < NODE_COUNT; i++) {
      const ang = (i / NODE_COUNT) * Math.PI * 2;
      const r = 84;
      arr.push({ x: Math.cos(ang) * r, y: Math.sin(ang) * r, ang });
    }
    return arr;
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-black/80 via-black/70 to-black/90 backdrop-blur-sm">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-3xl mx-4"
          role="dialog"
          aria-label="AI initialization"
        >
          <div className="bg-white/5 dark:bg-white/3 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 border border-white/5">
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-64 h-64 md:w-72 md:h-72">
                {/* SVG network */}
                <svg viewBox="-240 -240 480 480" className="w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
                  <defs>
                    <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
                      <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.06" />
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* connections (animated stroke dash) */}
                  {nodes.map((n, idx) => (
                    <motion.line
                      key={`conn-${idx}`}
                      x1={0}
                      y1={0}
                      x2={n.x}
                      y2={n.y}
                      stroke="rgba(99,102,241,0.12)"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: 0 }}
                      animate={reduceMotion ? undefined : { strokeDashoffset: finished ? 0 : [0, -12, -24] }}
                      transition={reduceMotion ? undefined : { duration: 2.6, repeat: Infinity, ease: "linear", delay: idx * 0.08 }}
                    />
                  ))}

                  {/* moving energy particles along radial lines */}
                  {nodes.map((n, idx) => (
                    <motion.circle
                      key={`p-${idx}`}
                      r={3}
                      fill="#60a5fa"
                      initial={reduceMotion ? undefined : { r: 0.8, opacity: 0 }}
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              cx: [0, n.x * 0.3, n.x * 0.6, n.x],
                              cy: [0, n.y * 0.3, n.y * 0.6, n.y],
                              opacity: [0, 0.9, 0.6, 0],
                            }
                      }
                      transition={reduceMotion ? undefined : { duration: 1.8 + idx * 0.12, repeat: Infinity, ease: "easeInOut", delay: idx * 0.06 }}
                    />
                  ))}

                  {/* orbiting nodes */}
                  <motion.g
                    animate={reduceMotion ? undefined : { rotate: finished ? 0 : 360 }}
                    transform="translate(0,0)"
                    style={{ originX: "50%", originY: "50%" }}
                    transition={reduceMotion ? undefined : { repeat: Infinity, ease: "linear", duration: 22 }}
                  >
                    {nodes.map((n, i) => (
                      <motion.g key={`node-${i}`} whileHover={{ scale: 1.08 }}>
                        <NodeSVG x={n.x} y={n.y} r={7} glow={i % 2 === 0} />
                      </motion.g>
                    ))}
                  </motion.g>

                  {/* central core */}
                  <motion.g
                    initial={reduceMotion ? undefined : { scale: 0.92 }}
                    animate={
                      reduceMotion ? undefined : finished ? { scale: 1.08 } : { scale: [1, 1.04, 1] }
                    }
                    transition={reduceMotion ? undefined : { duration: 1.8, repeat: finished ? 0 : Infinity, ease: "easeInOut" }}
                  >
                    <circle cx={0} cy={0} r={40} fill="url(#coreGlow)" />
                    <circle cx={0} cy={0} r={20} fill="#60a5fa" stroke="#8dd0ff" strokeWidth={1.4} />
                  </motion.g>
                </svg>
                {/* center badge */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 }}
                      className="text-white text-lg md:text-2xl font-semibold"
                    >
                      ArcLup AI Core
                    </motion.div>
                    <motion.div className="text-sm text-white/80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}>
                      Preparing Personalized Learning Experience...
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* status and progress */}
              <div className="w-full max-w-md flex flex-col items-center gap-4">
                <div className="w-full bg-white/6 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-2 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500"
                    style={{ width: `${progress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut", duration: 0.6 }}
                    aria-hidden
                  />
                </div>

                <div className="flex items-center justify-between w-full">
                  <div className="text-sm text-white/80">{status}</div>
                  <div className="text-sm text-white font-medium">{progress}%</div>
                </div>

                <div className="pt-2">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={finished ? { opacity: 1, y: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center text-white/90"
                  >
                    {finished ? (
                      <div className="flex items-center gap-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                          <circle cx="10" cy="10" r="9" stroke="#10b981" strokeWidth="1.6" />
                          <path d="M5.5 10.2l2.6 2.6L14.5 6" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="text-sm font-semibold">✓ Intelligence Ready</div>
                      </div>
                    ) : (
                      <div className="text-sm">{status}</div>
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
