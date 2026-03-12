import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const depositTypes = [
  {
    id: 1,
    title: "Onlayn Omonat",
    rate: "22%",
    term: "12 oy",
    minAmount: "500 000 so'm",
    color: "bg-green-50/80"
  },
  {
    id: 2,
    title: "Maksimal Daromad",
    rate: "25%",
    term: "24 oy",
    minAmount: "1 000 000 so'm",
    color: "bg-blue-50/80"
  },
  {
    id: 3,
    title: "Erkin Jamg'arma",
    rate: "18%",
    term: "6 oy",
    minAmount: "100 000 so'm",
    color: "bg-orange-50/80"
  }
];

export default function Deposits() {
  const [amount, setAmount] = useState(1000000);
  const navigate = useNavigate();

  // --- CANVAS ANIMATION LOGIC ---
  useEffect(() => {
    const canvas = document.getElementById("deposits-bg");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const count = 80; // Nuqtalar soni ko'paytirildi

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
        ctx.fillStyle = "rgba(34, 197, 94, 0.4)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = dx * dx + dy * dy;
          if (dist < 12000) {
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.15 - dist / 120000})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    for (let i = 0; i < count; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.move(); p.draw(); });
      connect();
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      
      {/* --- ASOSIY FON ELEMENTLARI (KO'PROQ VA DINAMIK) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <canvas id="deposits-bg" className="w-full h-full opacity-50"></canvas>
        
        {/* Suzuvchi yashil dog'lar (Blobs) */}
        <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-green-200 rounded-full blur-[100px] opacity-30 animate-blob"></div>
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-emerald-100 rounded-full blur-[120px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[10%] left-[10%] w-80 h-80 bg-lime-100 rounded-full blur-[80px] opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute top-[20%] left-[40%] w-64 h-64 bg-green-50 rounded-full blur-[60px] opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* HEADER SECTION */}
        <section className="bg-slate-900 text-white py-12 md:py-20 px-4">
          <div className="max-w-[1200px] mx-auto text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Omonatlar (Depozitlar)
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Mablag‘laringizni ishonchli va yuqori daromad bilan ko‘paytiring. 
              Biz bilan kelajagingizni bugundan rejalashtiring.
            </p>
          </div>
        </section>

        {/* OMONAT TURLARI */}
        <section className="py-10 md:py-16 px-4">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-gray-800">
              Omonat turlari
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {depositTypes.map((item) => (
                <div 
                  key={item.id} 
                  className={`${item.color} backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/50 flex flex-col justify-between shadow-xl shadow-green-900/5 hover:scale-[1.02] transition-all`}
                >
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800">{item.title}</h3>
                    <div className="my-4 md:my-6">
                      <span className="text-3xl md:text-4xl font-black text-green-600">{item.rate}</span>
                      <span className="text-gray-500 ml-2 text-sm md:text-base">yillik</span>
                    </div>
                    <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 text-sm md:text-base text-gray-600 font-medium">
                      <li className="flex items-center"><span className="mr-2">🗓</span> Muddat: <b>{item.term}</b></li>
                      <li className="flex items-center"><span className="mr-2">💰</span> Minimal: <b>{item.minAmount}</b></li>
                      <li className="flex items-center text-green-700"><span className="mr-2">✅</span> Qisman yechish</li>
                    </ul>
                  </div>
                  <button 
                    onClick={() => navigate("/omonat/deposits")}
                    className="w-full bg-green-600 text-white py-3 md:py-4 rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-200 active:scale-95 transition-all"
                  >
                    Omonat ochish
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KALKULYATOR */}
        <section className="py-12 md:py-20 px-4">
          <div className="max-w-[800px] mx-auto bg-white/70 backdrop-blur-lg border border-green-100 rounded-[2rem] p-6 md:p-10 shadow-2xl shadow-green-200/40">
            <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center text-gray-800">
              Daromadingizni hisoblang
            </h2>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm md:text-base font-semibold text-gray-700 italic">Sarmoya miqdori:</label>
                  <span className="text-lg md:text-xl font-bold text-green-600">{amount.toLocaleString()} so'm</span>
                </div>
                <input 
                  type="range" 
                  min="1000000" 
                  max="500000000" 
                  step="1000000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                <div className="text-center sm:text-left">
                  <p className="text-gray-500 text-xs md:text-sm uppercase tracking-wider mb-1">Yillik sof foyda (25%):</p>
                  <p className="text-xl md:text-2xl font-bold text-green-600">{(amount * 0.25).toLocaleString()} so'm</p>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-gray-500 text-xs md:text-sm uppercase tracking-wider mb-1">Jami qaytariladi:</p>
                  <p className="text-xl md:text-2xl font-bold text-slate-800">{(amount * 1.25).toLocaleString()} so'm</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="bg-green-600/90 backdrop-blur-sm py-10 md:py-14 px-4 text-center">
          <div className="max-w-[600px] mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
              Savollaringiz bormi? <br className="md:hidden" /> Mutaxassis bilan bog'laning
            </h2>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-white text-green-600 px-10 py-3 md:py-4 rounded-full font-bold hover:bg-gray-100 active:scale-95 transition-all inline-block shadow-xl"
            >
              Bog'lanish
            </Link>
          </div>
        </section>
      </div>

      {/* CUSTOM ANIMATIONS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}} />
    </div>
  );
}