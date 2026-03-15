import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCreative } from "swiper/modules";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Swiper stillari
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = document.getElementById("network-bg");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const count = 60;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
      }
      move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        const isDark = document.documentElement.classList.contains("dark");
        ctx.fillStyle = isDark ? "rgba(74, 222, 128, 0.5)" : "rgba(34, 197, 94, 0.5)";
        ctx.fill();
      }
    }

    for (let i = 0; i < count; i++) particles.push(new Particle());
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => { p.move(); p.draw(); });
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  const Chip = () => (
    <div className="relative w-10 h-6 overflow-hidden rounded-lg shadow-inner sm:w-14 sm:h-10 bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600">
      <div className="absolute inset-1 border-[1px] border-yellow-900/30 rounded-md"></div>
    </div>
  );

  const slides = t("hero.slides", { returnObjects: true });

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <section className="relative w-full min-h-screen transition-colors duration-700 bg-white dark:bg-slate-950">
      <canvas id="network-bg" className="absolute inset-0 z-0 w-full h-full opacity-40 pointer-events-none" />

      <Swiper
        modules={[Autoplay, Pagination, EffectCreative]}
        effect={"creative"}
        creativeEffect={{
          prev: { shadow: true, translate: ["-20%", 0, -1], opacity: 0 },
          next: { translate: ["100%", 0, 0] },
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-screen"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="flex items-center justify-center">
            {/* RESPONSIVE PADDING & LAYOUT LOGIC:
                - < 400px: pt-[120px]
                - 400px - 600px: pt-[100px]
                - 600px - 1000px: pt-[80px]
                - > 1000px (md+): pt-0 (centered)
            */}
            <div className="container mx-auto px-6 h-full flex flex-col-reverse lg:flex-row items-center justify-center gap-8 
                            max-[400px]:pt-[120px] 
                            max-[600px]:pt-[100px] 
                            max-[1000px]:pt-[80px] 
                            lg:pt-0 lg:px-12 xl:px-20">

              {/* Text Content */}
              <motion.div 
                variants={containerVars}
                initial="hidden"
                whileInView="visible"
                className="z-10 w-full text-center lg:w-1/2 lg:text-left pb-14 lg:pb-0"
              >
                <motion.div variants={itemVars} className="inline-flex items-center gap-2 bg-green-50 dark:bg-emerald-500/10 text-green-700 dark:text-emerald-400 px-4 py-1 rounded-full text-[10px] sm:text-xs font-bold mb-4 sm:mb-6">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full animate-ping opacity-75"></span>
                    <span className="relative inline-flex w-2 h-2 bg-green-500 rounded-full"></span>
                  </span>
                  {slide.badge}
                </motion.div>

                <motion.h1 variants={itemVars} className="text-2xl min-[500px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-4 sm:mb-6">
                  {slide.title} <br />
                  <span className="text-transparent bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text">
                    {slide.subtitle}
                  </span>
                </motion.h1>

                <motion.p variants={itemVars} className="mx-auto text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base lg:text-lg mb-6 sm:mb-10 max-w-lg lg:mx-0">
                  {slide.desc}
                </motion.p>

                <motion.div variants={itemVars} className="flex flex-col gap-3 justify-center min-[450px]:flex-row lg:justify-start sm:gap-4">
                  <button onClick={() => navigate("/services")} className="px-6 py-3 text-sm font-bold text-white transition-all bg-green-600 sm:px-8 sm:py-4 sm:text-base rounded-2xl hover:bg-green-700 active:scale-95 shadow-lg shadow-green-500/20">
                    {t("hero.button")}
                  </button>
                  <button onClick={() => navigate("/hisob-ochish")} className="px-6 py-3 text-sm font-bold transition-all border-2 sm:px-8 sm:py-4 sm:text-base border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95">
                    {t("hero.button1")}
                  </button>
                </motion.div>
              </motion.div>

              {/* Visual Card Content */}
              <div className="flex justify-center w-full lg:w-1/2 lg:justify-end">
                <div className="relative w-[240px] min-[500px]:w-[300px] sm:w-[340px] md:w-[380px] lg:w-[420px] h-[150px] min-[500px]:h-[180px] sm:h-[210px] md:h-[240px] lg:h-[260px] group">
                  
                  {/* Orqa karta (faqat sm dan kattada) */}
                  <motion.div
                    initial={{ opacity: 0, x: 50, rotate: 15 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 12 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-4 left-6 w-full h-full rounded-2xl overflow-hidden shadow-xl border border-white/20 dark:border-gray-800 z-0 hidden sm:block"
                  >
                    <div className="absolute inset-0 bg-center bg-cover grayscale-[0.6] blur-[1px]" style={{ backgroundImage: `url(${slide.backImg})` }} />
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
                  </motion.div>

                  {/* Asosiy Premium Karta */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ rotateY: -10, rotateX: 5, scale: 1.02 }}
                    className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer shadow-2xl border border-white/10 dark:border-gray-700 z-10 preserve-3d"
                  >
                    <img src={slide.cardImg} alt="Card" className="absolute inset-0 object-cover w-full h-full" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/10" />

                    <div className="relative flex flex-col justify-between h-full p-4 text-white sm:p-6">
                      <div className="flex items-start justify-between">
                        <h2 className="text-sm font-bold italic tracking-tighter sm:text-xl">YUKSALISH</h2>
                        <Chip />
                      </div>

                      <div>
                        <p className="text-[7px] sm:text-[10px] tracking-[3px] uppercase opacity-60 mb-1">Premium Card</p>
                        <p className="font-mono text-xs sm:text-lg tracking-widest bg-black/20 backdrop-blur-sm rounded px-2 py-1 inline-block">
                          **** **** **** {1000 + i * 111}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet { background: #22c55e !important; width: 6px; height: 6px; transition: all 0.3s ease; }
        .swiper-pagination-bullet-active { width: 24px; border-radius: 4px; }
        .preserve-3d { transform-style: preserve-3d; perspective: 1000px; }
        .swiper-pagination { bottom: 20px !important; }
        
        /* Maxsus media so'rovlar orqali boshqarish */
        @media (max-width: 1000px) {
          .swiper-pagination { bottom: 10px !important; }
        }
        @media (max-height: 700px) and (max-width: 600px) {
           .container { gap: 1rem !important; }
           h1 { font-size: 1.75rem !important; }
           p { margin-bottom: 1.5rem !important; }
        }
      `}</style>
    </section>
  );
}