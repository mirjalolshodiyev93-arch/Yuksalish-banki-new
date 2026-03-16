  import React, { useEffect, useRef, useCallback } from "react";
  import { Swiper, SwiperSlide } from "swiper/react";
  import { Autoplay, Pagination, EffectCreative } from "swiper/modules";
  import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
  import { useTranslation } from "react-i18next";
  import { useNavigate } from "react-router-dom";

  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/effect-creative";

  // ─── Animated background canvas ──────────────────────────────────────────────
  function NetworkCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let animId;
      let particles = [];
      const COUNT = 70;

      const getColor = () =>
        document.documentElement.classList.contains("dark")
          ? "rgba(52, 211, 153, 0.55)"
          : "rgba(22, 163, 74, 0.45)";

      const resize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };

      // Use ResizeObserver instead of window resize for accuracy
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);
      resize();

      class Particle {
        constructor() { this.reset(); }
        reset() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.vx = (Math.random() - 0.5) * 0.35;
          this.vy = (Math.random() - 0.5) * 0.35;
          this.r = Math.random() * 1 + 1;
        }
        move() {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
          if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
          ctx.fillStyle = getColor();
          ctx.fill();
        }
      }

      for (let i = 0; i < COUNT; i++) particles.push(new Particle());

      const drawLines = () => {
        const color = getColor();
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = color.replace("0.55", String((1 - dist / 110) * 0.18));
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      };

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => { p.move(); p.draw(); });
        drawLines();
        animId = requestAnimationFrame(animate);
      };
      animate();

      return () => {
        cancelAnimationFrame(animId);
        ro.disconnect();
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full opacity-50 pointer-events-none"
      />
    );
  }


  function Chip() {
    return (
      <div className="relative h-6 overflow-hidden rounded-md shadow-inner w-9 sm:w-12 sm:h-8 shrink-0 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600">
        <div className="absolute inset-[3px] rounded-[3px] border border-yellow-800/25" />
        {/* chip lines */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-[3px] pl-[3px]">
          {[0,1,2].map(i => (
            <div key={i} className="w-1.5 h-[1.5px] bg-yellow-800/30 rounded-full" />
          ))}
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-[3px] pr-[3px]">
          {[0,1,2].map(i => (
            <div key={i} className="w-1.5 h-[1.5px] bg-yellow-800/30 rounded-full" />
          ))}
        </div>
      </div>
    );
  }


  function TiltCard({ slide, index }) {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 30 });

    const handleMouseMove = useCallback((e) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    }, [x, y]);

    const handleMouseLeave = useCallback(() => {
      x.set(0); y.set(0);
    }, [x, y]);

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-[240px] min-[500px]:w-[300px] sm:w-[340px] md:w-[390px] lg:w-[430px]
                  h-[148px] min-[500px]:h-[182px] sm:h-[212px] md:h-[244px] lg:h-[268px]"
        style={{ perspective: 1000 }}
      >
        {/* Back card — desktop only */}
        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 15 }}
          animate={{ opacity: 1, x: 0, rotate: 12, y: [0, -8, 0] }}
          transition={{ opacity: { duration: 0.6 }, x: { duration: 0.6 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 } }}
          className="absolute z-0 hidden w-full h-full overflow-hidden border shadow-xl top-3 left-5 rounded-2xl border-white/10 dark:border-gray-800 sm:block"
        >
          <div
            className="absolute inset-0 bg-center bg-cover grayscale-[0.5] scale-105"
            style={{ backgroundImage: `url(${slide.backImg})` }}
          />
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />
        </motion.div>

        {/* Main card */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full h-full overflow-hidden border shadow-2xl cursor-pointer rounded-2xl border-white/10 dark:border-gray-700"
        >
          <img
            src={slide.cardImg}
            alt="Card visual"
            className="absolute inset-0 object-cover w-full h-full"
            loading="lazy"
            draggable={false}
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/65 via-black/10 to-white/5" />
          {/* shimmer on hover */}
          <div className="absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-white/8 to-transparent" />

          <div className="relative flex flex-col justify-between h-full p-3.5 sm:p-5 text-white">
            <div className="flex items-start justify-between">
              <h2 className="text-[11px] sm:text-base font-extrabold italic tracking-tight drop-shadow">
                YUKSALISH
              </h2>
              <Chip />
            </div>

            <div>
              <p className="text-[6px] sm:text-[9px] tracking-[3px] uppercase opacity-55 mb-1">
                Premium Card
              </p>
              <p className="font-mono text-[10px] sm:text-base tracking-widest
                            bg-black/25 backdrop-blur-sm rounded px-2 py-0.5 inline-block">
                **** **** **** {1000 + index * 111}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Text content block ───────────────────────────────────────────────────────
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };
  const itemVars = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 18 } },
  };

  function SlideText({ slide, t, navigate }) {
    return (
      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="z-10 w-full text-center lg:w-1/2 lg:text-left pb-14 lg:pb-0"
      >
        {/* Badge */}
        <motion.div
          variants={itemVars}
          className="inline-flex items-center gap-2 bg-green-50 dark:bg-emerald-500/10
                    text-green-700 dark:text-emerald-400 px-4 py-1 rounded-full
                    text-[10px] sm:text-xs font-bold mb-4 sm:mb-6"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping" />
            <span className="relative inline-flex w-2 h-2 bg-green-500 rounded-full" />
          </span>
          {slide.badge}
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVars}
          className="text-2xl min-[500px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
                    font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-4 sm:mb-6"
        >
          {slide.title}
          <br />
          <span className="text-transparent bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text">
            {slide.subtitle}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVars}
          className="max-w-lg mx-auto mb-6 text-sm leading-relaxed sm:text-base lg:text-lg text-slate-500 dark:text-slate-400 sm:mb-10 lg:mx-0"
        >
          {slide.desc}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVars}
          className="flex flex-col gap-3 justify-center min-[450px]:flex-row lg:justify-start sm:gap-4"
        >
          <button
            onClick={() => navigate("/services")}
            className="relative px-6 py-3 overflow-hidden text-sm font-bold text-white transition-all duration-200 bg-green-600 shadow-lg sm:px-8 sm:py-4 sm:text-base rounded-2xl hover:bg-green-700 active:scale-95 shadow-green-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
          >
            {t("hero.button")}
          </button>
          <button
            onClick={() => navigate("/hisob-ochish")}
            className="px-6 py-3 text-sm font-bold transition-all duration-200 border-2 sm:px-8 sm:py-4 sm:text-base rounded-2xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            {t("hero.button1")}
          </button>
        </motion.div>
      </motion.div>
    );
  }

  // ─── Main Hero ────────────────────────────────────────────────────────────────
  export default function Hero() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const slides = t("hero.slides", { returnObjects: true });

    return (
      <section className="relative w-full transition-colors duration-700 bg-white mpt-in-h-screen dark:bg-slate-950 pt-[50px]">
        <NetworkCanvas />

        {/* Subtle radial glow for depth */}
        <div className="pointer-events-none absolute inset-0 z-0
                        bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(34,197,94,0.07),transparent)]
                        dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(52,211,153,0.06),transparent)]" />

        <Swiper
          modules={[Autoplay, Pagination, EffectCreative]}
          effect="creative"
          creativeEffect={{
            prev: { shadow: true, translate: ["-20%", 0, -1], opacity: 0 },
            next: { translate: ["100%", 0, 0] },
          }}
          autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          loop
          className="h-screen"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i} className="flex items-center justify-center">
              <div
                className="container mx-auto px-6 lg:px-12 xl:px-20 h-full
                          flex flex-col-reverse lg:flex-row items-center justify-center gap-8
                          pt-[clamp(80px,15vw,120px)] lg:pt-0"
              >
                <SlideText slide={slide} t={t} navigate={navigate} />

                <div className="flex justify-center w-full lg:w-1/2 lg:justify-end group">
                  <TiltCard slide={slide} index={i} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <style>{`
          .swiper-pagination-bullet {
            background: #22c55e !important;
            width: 6px; height: 6px;
            opacity: 0.5;
            transition: all 0.3s ease;
          }
          .swiper-pagination-bullet-active {
            width: 22px;
            border-radius: 4px;
            opacity: 1;
          }
          .swiper-pagination {
            bottom: 20px !important;
          }
          @media (max-width: 1000px) {
            .swiper-pagination { bottom: 10px !important; }
          }
          @media (max-height: 680px) and (max-width: 600px) {
            .container { gap: 0.75rem !important; }
          }
        `}</style>
      </section>
    );
  }