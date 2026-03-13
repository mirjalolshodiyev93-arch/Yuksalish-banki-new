import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Deposits() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(1000000);

  const depositTypes = [
    {
      id: 1,
      title: t("depositTypes.onlineDeposit.title"),
      rate: t("depositTypes.onlineDeposit.rate"),
      term: t("depositTypes.onlineDeposit.term"),
      minAmount: t("depositTypes.onlineDeposit.minAmount"),
      partialWithdrawal: t("depositTypes.onlineDeposit.partialWithdrawal"),
    },
    {
      id: 2,
      title: t("depositTypes.maxProfit.title"),
      rate: t("depositTypes.maxProfit.rate"),
      term: t("depositTypes.maxProfit.term"),
      minAmount: t("depositTypes.maxProfit.minAmount"),
      partialWithdrawal: t("depositTypes.maxProfit.partialWithdrawal"),
    },
    {
      id: 3,
      title: t("depositTypes.flexSavings.title"),
      rate: t("depositTypes.flexSavings.rate"),
      term: t("depositTypes.flexSavings.term"),
      minAmount: t("depositTypes.flexSavings.minAmount"),
      partialWithdrawal: t("depositTypes.flexSavings.partialWithdrawal"),
    }
  ];

  const handleDeposit = () => {
    toast.success(t("success3.depositOpened"), {
      position: "bottom-right",
      autoClose: 3000,
      theme: "colored"
    });
  };

  // --- CANVAS ANIMATION (Light Green Theme) ---
  useEffect(() => {
    const canvas = document.getElementById("deposits-bg");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const count = 50;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 1;
      }
      move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.fillStyle = "rgba(16, 185, 129, 0.2)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < count; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.move(); p.draw(); });
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="relative w-full pt-[50px] min-h-screen overflow-hidden bg-slate-50/50">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <canvas id="deposits-bg" className="w-full h-full"></canvas>
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-green-100/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        {/* LIGHT CLEAN HEADER */}
        <section className="px-4 py-16 text-center md:py-24">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-transparent md:text-6xl bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">
            {t("deposits.title")}
          </h1>
          <p className="max-w-2xl mx-auto text-lg font-medium leading-relaxed text-slate-600 md:text-xl">
            {t("deposits.subtitle")}
          </p>
        </section>

        {/* DEPOSIT CARDS */}
        <section className="px-4 py-10">
          <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-3">
            {depositTypes.map(item => (
              <div key={item.id} className="group relative bg-white p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm hover:shadow-2xl hover:shadow-green-200/50 transition-all duration-500 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
                    <div className="p-2 rounded-full bg-emerald-50">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <div className="text-4xl font-black text-emerald-600">{item.rate}</div>
                    <div className="mt-1 text-sm font-semibold tracking-wide uppercase text-slate-400">yillik daromad</div>
                  </div>

                  <ul className="mb-10 space-y-4">
                    <li className="flex items-center text-slate-600">
                      <span className="flex items-center justify-center w-6 h-6 mr-3 text-xs rounded-md bg-emerald-50 text-emerald-600">📅</span>
                      Muddat: <span className="ml-auto font-bold text-slate-800">{item.term}</span>
                    </li>
                    <li className="flex items-center text-slate-600">
                      <span className="flex items-center justify-center w-6 h-6 mr-3 text-xs rounded-md bg-emerald-50 text-emerald-600">💰</span>
                      Minimal: <span className="ml-auto font-bold text-slate-800">{item.minAmount}</span>
                    </li>
                    <li className="flex items-center font-medium text-emerald-600">
                      <span className="flex items-center justify-center w-6 h-6 mr-3 text-xs rounded-md bg-emerald-100">✓</span>
                      {item.partialWithdrawal}
                    </li>
                  </ul>
                </div>

                <button 
                  onClick={handleDeposit}
                  className="w-full py-4 font-bold text-white transition-all transform shadow-lg bg-emerald-600 rounded-2xl hover:bg-emerald-700 shadow-emerald-200 active:scale-95"
                >
                  {t("deposits.depositButton")}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* MODERN CALCULATOR */}
        <section className="px-4 py-20">
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl border border-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-emerald-100">
            <h2 className="mb-10 text-2xl font-bold text-center text-slate-800">{t("deposits.calculatorTitle")}</h2>
            
            <div className="space-y-10">
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <label className="text-sm font-bold tracking-widest uppercase text-slate-400">{t("deposits.investmentAmount")}</label>
                  <div className="px-6 py-2 text-2xl font-black rounded-2xl bg-emerald-50 text-emerald-600">
                    {amount.toLocaleString()} <span className="text-sm">so'm</span>
                  </div>
                </div>
                <input 
                  type="range" min="1000000" max="500000000" step="1000000" 
                  value={amount} 
                  onChange={e => setAmount(Number(e.target.value))} 
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-emerald-600 bg-slate-200"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 p-8 bg-slate-50 rounded-3xl sm:grid-cols-2">
                <div className="text-center sm:text-left">
                  <p className="mb-2 text-xs font-bold tracking-widest uppercase text-slate-400">{t("deposits.annualProfit")}</p>
                  <p className="text-3xl font-black text-emerald-600">+{(amount*0.25).toLocaleString()}</p>
                </div>
                <div className="text-center sm:text-right">
                  <p className="mb-2 text-xs font-bold tracking-widest uppercase text-slate-400">{t("deposits.totalReturn")}</p>
                  <p className="text-3xl font-black text-slate-800">{(amount*1.25).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="px-4 py-20 text-center">
          <div className="max-w-4xl p-12 mx-auto bg-emerald-600 rounded-[3rem] shadow-2xl shadow-emerald-200 relative overflow-hidden">
            {/* CTA Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 bg-white rounded-full opacity-10"></div>
            
            <h2 className="relative z-10 mb-8 text-3xl font-bold text-white md:text-4xl">{t("deposits.ctaTitle")}</h2>
            <Link to="/contact" className="relative z-10 inline-block px-12 py-5 text-lg font-bold transition-all bg-white text-emerald-600 rounded-2xl hover:shadow-2xl hover:-translate-y-1 active:scale-95">
              {t("deposits.ctaButton")}
            </Link>
          </div>
        </section>
      </div>

      <ToastContainer />
    </div>
  );
}