import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const btnRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 18 });
  const sy = useSpring(my, { stiffness: 220, damping: 18 });

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrolled > 300);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseMove = (e) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  const circumference = 2 * Math.PI * 22;
  const dash = circumference * progress;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          ref={btnRef}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ x: sx, y: sy }}
          initial={{ opacity: 0, scale: 0.4, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 40 }}
          whileTap={{ scale: 0.88 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          aria-label="Scroll to top"
          className="fixed z-50 flex items-center justify-center bottom-8 right-8 w-14 h-14"
        >
      
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 48 48"
          >

            <circle
              cx="24" cy="24" r="22"
              fill="none"
              stroke="rgba(52,211,153,0.15)"
              strokeWidth="2"
            />
    
            <motion.circle
              cx="24" cy="24" r="22"
              fill="none"
              stroke="url(#ring-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${circumference}`}
              animate={{ strokeDashoffset: circumference - dash }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
            <defs>
              <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>

          
          <div className="relative w-10 h-10 rounded-[14px] flex items-center justify-center
                          bg-gradient-to-br from-emerald-400/90 to-emerald-600/90
                          backdrop-blur-md
                          shadow-[0_8px_24px_-4px_rgba(16,185,129,0.55),inset_0_1px_0_rgba(255,255,255,0.3)]
                          border border-emerald-300/30
                          overflow-hidden
                          transition-shadow duration-300
                          hover:shadow-[0_12px_32px_-4px_rgba(16,185,129,0.7),inset_0_1px_0_rgba(255,255,255,0.35)]">
      
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/20 to-transparent" />

      
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10 w-5 h-5 drop-shadow-sm"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </motion.svg>
          </div>

      
          <span className="absolute inset-[6px] rounded-[12px] bg-emerald-400 blur-md opacity-30 animate-pulse pointer-events-none" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}