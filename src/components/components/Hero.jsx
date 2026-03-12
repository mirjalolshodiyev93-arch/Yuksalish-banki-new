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
        ctx.fillStyle = "#22c55e";
        ctx.shadowColor = "#22c55e";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = dx * dx + dy * dy;

          if (dist < 9000) {
            ctx.strokeStyle = "rgba(34,197,94,0.15)";
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
              ctx.strokeStyle = "rgba(34,197,94,0.4)";
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
    <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-yellow-300 to-yellow-600 shadow-inner relative overflow-hidden">
      <div className="absolute inset-1 border-2 border-yellow-800 rounded-md"></div>
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-yellow-800 -translate-x-1/2"></div>
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-yellow-800 -translate-y-1/2"></div>
    </div>
  );

  return (
    <section className="relative max-w-[1400px] mx-auto bg-gradient-to-b from-white to-green-50 px-4 sm:px-10 flex flex-col items-center pb-[80px] pt-[120px] md:py-[120px] overflow-hidden">

    
      <canvas
        id="network-bg"
        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
      />

      {/* GREEN BLUR BLOBS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-500/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute top-40 left-1/4 w-80 h-80 bg-emerald-400/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-lime-400/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-1/3 w-64 h-64 bg-green-300/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-72 h-72 bg-emerald-300/20 blur-3xl rounded-full animate-pulse"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full flex flex-col-reverse md:flex-row items-center justify-between">

        {/* LEFT */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 text-center md:text-left">

          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mb-6 shadow-sm border border-green-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
            </span>
            <p>{t("hero.badle")}</p>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
            {t("hero.title")} <br />
            <span className="text-green-600">{t("hero.subtitle")}</span>
          </h1>

          <p className="mt-6 text-gray-600 max-w-md mx-auto md:mx-0">
            {t("hero.desc")}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

            <button
              onClick={() => navigate("/services")}
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 transition-all duration-300 active:scale-95"
            >
              {t("hero.button")}
            </button>

            <button
              onClick={() => navigate("/hisob-ochish")}
              className="border border-green-600 text-green-600 px-8 py-3 rounded-xl hover:bg-green-600 hover:text-white hover:shadow-md transition-all duration-300 active:scale-95"
            >
              {t("hero.button1")}
            </button>

          </div>
        </div>

      
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">

          <div className="relative w-[280px] sm:w-[360px] md:w-[420px] h-[180px] sm:h-[220px] md:h-[260px] group">

          
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 w-[240px] sm:w-[320px] md:w-[380px] h-[160px] sm:h-[200px] md:h-[220px] rounded-2xl overflow-hidden shadow-xl transition-all duration-500 group-hover:rotate-3">

              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1200')",
                }}
              />

              <div className="relative p-4 sm:p-6 flex justify-between items-start h-full">
                <h2 className="text-gray-700 font-semibold text-sm sm:text-lg">
                  Yuksalish Bank
                </h2>
                <Chip />
              </div>

            </div>

       
            <div className="absolute w-[240px] sm:w-[320px] md:w-[380px] h-[160px] sm:h-[200px] md:h-[220px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 group-hover:-rotate-3 shadow-2xl">

              <img
                src="/card.png"
                alt="Card background"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40"></div>

              <div className="relative p-4 sm:p-6 flex flex-col justify-between h-full text-white">

                <div className="flex justify-between items-start">
                  <h2 className="text-lg sm:text-xl font-semibold tracking-wide">
                    Yuksalish Bank
                  </h2>
                  <Chip />
                </div>

                <div>
                  <p className="text-xs sm:text-sm opacity-80 uppercase tracking-wider">
                    Card Holder
                  </p>
                  <p className="text-sm sm:text-lg tracking-widest font-mono">
                    0000 0000 0000 0000
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}