import { useEffect, useMemo, useState } from "react";

type LoaderState = {
  progress: number; // 0-100
  status: string;
  finished: boolean;
};

const STATUS_STEPS = [
  "Initializing Neural Network...",
  "Loading Knowledge Base...",
  "Connecting Intelligence Nodes...",
  "Processing Learning Models...",
  "Analyzing Context...",
  "Generating Intelligence...",
  "Finalizing Experience...",
  "Ready",
];

export default function useAICoreLoader({ duration = 4800 } = {}) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const finished = progress >= 100;

  // compute timing segments for status updates
  const segments = useMemo(() => {
    const seg = STATUS_STEPS.length;
    return Array.from({ length: seg }, (_, i) => Math.round((i / (seg - 1)) * 100));
  }, []);

  useEffect(() => {
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease out
      const eased = 1 - Math.pow(1 - t, 2);
      const p = Math.round(eased * 100);
      setProgress(p);

      // update status index according to segments
      for (let i = segments.length - 1; i >= 0; i--) {
        if (p >= segments[i]) {
          setStatusIndex(i);
          break;
        }
      }

      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, segments]);

  return {
    progress,
    status: STATUS_STEPS[Math.min(statusIndex, STATUS_STEPS.length - 1)],
    finished,
  } as LoaderState;
}
