import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = document.getElementById("network-bg");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    const count = 80;
    let mouse = { x: null, y: null };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const mouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", mouseMove);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
      }

      move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        // Dark modeda neon yashil, Light modeda standart yashil
        const isDark = document.documentElement.classList.contains('dark');
        ctx.fillStyle = isDark ? "#4ade80" : "#22c55e";
        ctx.shadowColor = isDark ? "#4ade80" : "#22c55e";
        ctx.shadowBlur = isDark ? 10 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const connect = () => {
      const isDark = document.documentElement.classList.contains('dark');
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = dx * dx + dy * dy;

          if (dist < 9000) {
            ctx.strokeStyle = isDark ? "rgba(74, 222, 128, 0.1)" : "rgba(34, 197, 94, 0.15)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }

          if (mouse.x && mouse.y) {
            const dxm = particles[a].x - mouse.x;
            const dym = particles[a].y - mouse.y;
            const distMouse = dxm * dxm + dym * dym;

            if (distMouse < 12000) {
              ctx.strokeStyle = isDark ? "rgba(74, 222, 128, 0.3)" : "rgba(34, 197, 94, 0.4)";
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
            }
          }
        }
      }
    };

    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.move();
        p.draw();
      });
      connect();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const Chip = () => (
    <div className="relative w-12 h-8 overflow-hidden rounded-lg shadow-inner sm:w-14 sm:h-10 bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600">
      <div className="absolute inset-1 border-[1px] border-yellow-900/30 rounded-md"></div>
      <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-yellow-900/20"></div>
      <div className="absolute left-2/3 top-0 bottom-0 w-[1px] bg-yellow-900/20"></div>
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-yellow-900/20"></div>
    </div>
  );

  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-screen px-4 py-20 overflow-hidden transition-colors duration-700 bg-white dark:bg-slate-950 sm:px-10">
      
      {/* Background Canvas */}
      <canvas
        id="network-bg"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 dark:opacity-30"
      />

      {/* Decorative Blur Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-500/10 dark:bg-emerald-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-lime-400/10 dark:bg-green-500/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col-reverse items-center justify-between w-full gap-12 max-w-7xl md:flex-row">

        {/* Text Content */}
        <div className="w-full text-center md:w-1/2 md:text-left">
          <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-emerald-500/10 text-green-700 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold mb-8 border border-green-100 dark:border-emerald-500/20 shadow-sm transition-all hover:scale-105">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
              <span className="relative inline-flex w-2 h-2 bg-green-500 rounded-full"></span>
            </span>
            <span className="tracking-wider uppercase">{t("hero.badle")}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] text-slate-900 dark:text-white mb-6">
            {t("hero.title")} <br />
            <span className="text-transparent bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text">
              {t("hero.subtitle")}
            </span>
          </h1>

          <p className="max-w-lg mx-auto mb-10 text-lg leading-relaxed text-slate-600 dark:text-slate-400 md:mx-0">
            {t("hero.desc")}
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
            <button
              onClick={() => navigate("/services")}
              className="relative px-8 py-4 overflow-hidden font-bold text-white transition-all bg-green-600 group rounded-2xl hover:bg-green-700 hover:shadow-2xl hover:shadow-green-500/30 active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t("hero.button")}
              </span>
            </button>

            <button
              onClick={() => navigate("/hisob-ochish")}
              className="px-8 py-4 font-bold transition-all border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95"
            >
              {t("hero.button1")}
            </button>
          </div>
        </div>

        {/* Visual Content (Animated Cards) */}
        <div className="flex justify-center w-full md:w-1/2 md:justify-end">
          <div className="relative w-[300px] sm:w-[400px] h-[200px] sm:h-[260px]">
            
            {/* Back Card (Glass effect) */}
            <div className="absolute top-8 left-8 w-full h-full rounded-[2rem] bg-slate-100/50 dark:bg-slate-800/40 backdrop-blur-md border border-white/20 dark:border-slate-700/50 shadow-xl transition-all duration-700 group-hover:translate-x-4 group-hover:-translate-y-4">
               <div className="flex justify-between p-6 sm:p-8">
                  <div className="w-8 h-8 rounded-full opacity-50 bg-slate-300 dark:bg-slate-700"></div>
                  <Chip />
               </div>
            </div>

            {/* Front Card */}
            <div className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-[1.02] hover:-rotate-1 border border-white/20 dark:border-slate-700">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900"></div>
              {/* Card Pattern Overlay */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
              
              <div className="relative flex flex-col justify-between h-full p-6 text-white sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">Yuksalish</h2>
                    <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">Digital Priority</p>
                  </div>
                  <Chip />
                </div>

                <div className="space-y-4">
                  <p className="text-lg sm:text-2xl font-mono tracking-[0.15em] text-slate-200">
                    4400 •••• •••• 8844
                  </p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[8px] uppercase opacity-50 mb-1">Card Holder</p>
                      <p className="text-sm font-medium tracking-wide">PREMIUM CLIENT</p>
                    </div>
                    <div className="flex -space-x-3">
                      <div className="w-8 h-8 rounded-full bg-red-500/80"></div>
                      <div className="w-8 h-8 rounded-full bg-yellow-500/80"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}