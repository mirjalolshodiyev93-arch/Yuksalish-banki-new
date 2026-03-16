import React, { useState } from "react";
// Rasmlarni o'z joyida qoldiramiz
import Earch from "../assets/salom.png";
import Earch1 from "../assets/salom2.png";
import Earch2 from "../assets/salom3.png";

export default function Transfer() {
  const [activeService, setActiveService] = useState(null);
  const [amount, setAmount] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAmountChange = (e) => {
    const val = e.target.value;
    if (val === "" || (Number(val) >= 0 && val.length <= 9)) {
      setAmount(val);
    }
  };

  const getCommissionRate = () => {
    if (activeService === "inner") return 0;
    if (activeService === "p2p") return 0.5;
    if (activeService === "intl") return 1.0;
    return 0;
  };

  const handleTransfer = () => {
    if (amount > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setActiveService(null);
          setAmount("");
        }, 3500);
      }, 2000);
    }
  };

  const commissionRate = getCommissionRate();
  const commissionAmount = amount ? (amount * commissionRate) / 100 : 0;
  const totalAmount = amount ? Number(amount) - commissionAmount : 0;

  return (
    <div className="relative min-h-screen font-sans bg-[#050807] text-gray-100 selection:bg-green-500/30">
      {/* Toast Notification */}
      {isSuccess && (
        <div className="fixed top-10 right-6 z-[100] animate-in fade-in slide-in-from-right-full duration-500">
          <div className="bg-[#0c1410] border border-green-500/30 backdrop-blur-xl text-green-400 px-6 py-5 rounded-2xl shadow-[0_0_50px_rgba(34,197,94,0.2)] flex items-center gap-4 min-w-[350px]">
            <div className="p-2 text-black bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-bold">Muvaffaqiyatli!</h4>
              <p className="text-sm opacity-70">Mablag' manzilga yo'llandi.</p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
              <div className="h-full bg-green-500 animate-[progress_3.5s_linear]"></div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes progress { from { width: 100%; } to { width: 0%; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .yb-spinner {
          width: 22px; height: 22px;
          border: 3px solid rgba(0,0,0,0.1);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.8s cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite;
        }
        .dark-glass {
          background: rgba(17, 26, 22, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(34, 197, 94, 0.1);
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest text-green-500 uppercase border rounded-full bg-green-500/10 border-green-500/20">
            Secure Banking
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-white md:text-6xl">
            Yuksalish <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Bank</span>
          </h1>
          <p className="mt-4 text-[#5a7d61] font-medium max-w-md mx-auto">
            Premium darajadagi xavfsiz o'tkazmalar tizimi.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid gap-6 mb-16 md:grid-cols-3">
          {[
            { id: "inner", title: "Bank ichida", icon: Earch2, desc: "0% komissiya" },
            { id: "p2p", title: "P2P o'tkazma", icon: Earch1, desc: "0.5% komissiya" },
            { id: "intl", title: "Xalqaro SWIFT", icon: Earch, desc: "1.0% komissiya" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveService(item.id); setAmount(""); }}
              className={`relative overflow-hidden p-8 rounded-[32px] transition-all duration-500 text-left group border-2 ${
                activeService === item.id
                  ? "bg-[#0d1a12] border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.1)] scale-105"
                  : "bg-[#111a16]/40 border-white/5 hover:border-green-500/30 hover:bg-[#111a16]/60"
              }`}
            >
              <div className="relative z-10">
                <div className="w-20 h-20 mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <img src={item.icon} alt={item.title} className="object-contain w-full h-full" />
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold text-green-500/80">{item.desc}</p>
              </div>
              {activeService === item.id && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[60px] rounded-full -mr-10 -mt-10" />
              )}
            </button>
          ))}
        </div>

        {/* Transfer Form */}
        {activeService ? (
          <div className="max-w-3xl mx-auto duration-700 animate-in fade-in slide-in-from-bottom-10">
            <div className="dark-glass p-10 md:p-14 rounded-[40px] shadow-2xl relative">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h3 className="text-3xl font-black tracking-tight text-white uppercase">
                    {activeService === 'inner' ? 'Bank ichida' : activeService === 'p2p' ? 'Kartadan kartaga' : 'Xalqaro'}
                  </h3>
                  <div className="w-12 h-1 mt-2 bg-green-500 rounded-full"></div>
                </div>
                <button
                  onClick={() => setActiveService(null)}
                  className="p-3 transition-colors rounded-2xl bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-400"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="grid gap-12">
                <div className="space-y-8">
                  <div className="group">
                    <label className="block mb-4 text-xs font-black tracking-[0.2em] text-[#5a7d61] uppercase">
                      Yuboriladigan summa
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        className="w-full px-8 py-6 font-mono text-4xl transition-all border-2 outline-none bg-black/40 border-white/5 rounded-[24px] focus:border-green-500/50 focus:ring-4 ring-green-500/5 text-white placeholder:text-white/5"
                        placeholder="0"
                      />
                      <span className="absolute text-xl font-black text-green-500 -translate-y-1/2 right-8 top-1/2">UZS</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 border rounded-3xl bg-white/5 border-white/5">
                      <p className="text-xs text-[#5a7d61] uppercase font-bold mb-1">Komissiya ({commissionRate}%)</p>
                      <p className="text-xl font-bold text-white">{Math.round(commissionAmount).toLocaleString()} <span className="text-xs opacity-40">UZS</span></p>
                    </div>
                    <div className="p-6 border rounded-3xl bg-green-500/5 border-green-500/10">
                      <p className="mb-1 text-xs font-bold uppercase text-green-500/60">Jami chiqim</p>
                      <p className="text-xl font-bold text-green-400">{Math.round(Number(amount)).toLocaleString()} <span className="text-xs opacity-40">UZS</span></p>
                    </div>
                  </div>

                  <button
                    onClick={handleTransfer}
                    disabled={!amount || amount <= 0 || isLoading}
                    className="w-full relative overflow-hidden group bg-green-500 hover:bg-green-400 disabled:opacity-30 disabled:grayscale text-black font-black py-7 rounded-[24px] shadow-[0_20px_40px_rgba(34,197,94,0.2)] active:scale-[0.98] transition-all uppercase tracking-widest text-lg"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isLoading ? (
                        <>
                          <div className="yb-spinner"></div>
                          Yuborilmoqda...
                        </>
                      ) : (
                        "O'tkazmani tasdiqlash"
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-32 border-2 border-dashed border-white/5 rounded-[60px] bg-[#111a16]/20 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 text-4xl rounded-full bg-white/5 animate-bounce">
              🏦
            </div>
            <h2 className="text-2xl font-bold text-white/80">Xizmatni tanlang</h2>
            <p className="mt-2 text-[#5a7d61]">O'tkazmani boshlash uchun yuqoridagi kartalardan birini bosing</p>
          </div>
        )}
      </div>

      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/10 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
}