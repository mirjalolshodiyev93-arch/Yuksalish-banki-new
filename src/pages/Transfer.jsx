    import React, { useState } from "react";
    import Earch from "../assets/salom.png";
        import Earch1 from "../assets/salom2.png";
            import Earch2 from "../assets/salom3.png";
    export default function Transfer() {
    const [activeService, setActiveService] = useState(null);
    const [amount, setAmount] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleAmountChange = (e) => {
        const val = e.target.value;
        // Faqat musbat sonlar va maksimal 7 ta raqam
        if (val === "" || (val >= 0 && val.length <= 7)) {
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
        setIsSuccess(true);
        // 3.5 soniyadan keyin xabarni yopish va formani tozalash
        setTimeout(() => {
            setIsSuccess(false);
            setActiveService(null);
            setAmount("");
        }, 3500);
        }
    };

    const commissionRate = getCommissionRate();
    const commissionAmount = amount ? (amount * commissionRate) / 100 : 0;
    const totalAmount = amount ? Number(amount) + commissionAmount : 0;

    return (
        <div className="bg-gray-50 min-h-screen font-sans relative">
        
        {/* 🟢 O'NG TOMONDAN CHIQUVCHI MUVAFFAQIYAT KARTI */}
        {isSuccess && (
            <div className="fixed top-[100px] right-6 z-50 animate-in fade-in slide-in-from-right-full duration-500">
            <div className="bg-white border-l-[6px] border-green-500 text-[#013220] px-6 py-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center gap-4 min-w-[350px] relative overflow-hidden">
                <div className="bg-green-500 text-white rounded-full p-2 shrink-0 shadow-lg shadow-green-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                </div>
                <div>
                <h4 className="font-extrabold text-green-700 text-lg leading-tight">Muvaffaqiyatli!</h4>
                <p className="text-sm text-gray-500 font-medium tracking-tight">O'tkazmangiz muvaffaqiyatli amalga oshirildi.</p>
                </div>
                {/* Pastki qismdagi taymer chizig'i (ixtiyoriy dekor) */}
                <div className="absolute bottom-0 left-0 h-1 bg-green-100 w-full">
                <div className="h-full bg-green-500 animate-[progress_3.5s_linear]"></div>
                </div>
            </div>
            </div>
        )}

        {/* Input ikonkasini yo'q qilish uchun CSS */}
        <style>{`
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
            input[type=number] { -moz-appearance: textfield; }
            @keyframes progress {
            from { width: 100%; }
            to { width: 0%; }
            }
        `}</style>

        <div className="max-w-[1400px] mx-auto px-6 py-16">
            <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-[#013220] mb-4">Yuksalish Bank</h1>
            <p className="text-gray-500 font-medium">Xavfsiz pul o'tkazmalari tizimi</p>
            </div>

            {/* Xizmat turlari */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
                { id: "inner", title: "Bank ichida", icon: Earch2, desc: "Komissiya 0%" },
                { id: "p2p", title: "Kartadan kartaga", icon: Earch1, desc: "Komissiya 0.5%" },
                { id: "intl", title: "Xalqaro", icon: Earch, desc: "Komissiya 1.0%" }
            ].map((item) => (
                <button 
                key={item.id}
                onClick={() => { setActiveService(item.id); setAmount(""); setIsSuccess(false); }}
                className={`p-8 bg-white border-b-4 rounded-[32px] shadow-lg transition-all text-left group ${
                    activeService === item.id ? "border-green-600 scale-105" : "border-gray-100 hover:border-green-400"
                }`}
                >
                <div className="text-5xl h-24 w-24 mb-6 group-hover:scale-110 transition-transform">
                    <img src={item.icon} alt={item.title} />
                </div>
                <h3 className="font-bold text-xl text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-400 mt-2 font-medium">{item.desc}</p>
                </button>
            ))}
            </div>

            {/* Kalkulyator */}
            {activeService && (
            <div className="animate-in fade-in zoom-in duration-300 max-w-4xl mx-auto">
                <div className="bg-[#013220] p-12 rounded-[48px] text-white shadow-2xl relative overflow-hidden">
                <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
                    <h3 className="text-2xl font-bold text-green-400 italic">
                    {activeService.toUpperCase()} O'TKAZMA
                    </h3>
                    <button 
                    onClick={() => setActiveService(null)} 
                    className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
                    >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                    <div>
                        <label className="text-xs text-gray-400 uppercase tracking-widest block mb-4 font-bold">Yuborish summasi</label>
                        <div className="relative">
                        <input 
                            type="number" 
                            value={amount}
                            onChange={handleAmountChange}
                            className="w-full bg-white/5 border border-green-800/50 rounded-2xl px-6 py-5 text-2xl font-mono outline-none focus:border-green-500 focus:bg-white/10 transition"
                            placeholder="0"
                        />
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-green-500 font-bold">UZS</span>
                        </div>
                    </div>

                    <div className="bg-black/20 p-6 rounded-3xl space-y-4 border border-white/5">
                        <div className="flex justify-between text-sm text-gray-400">
                        <span>Xizmat haqi:</span>
                        <span className="text-white font-bold">{commissionRate}%</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <span className="text-lg font-medium">Jami summa:</span>
                        <span className="text-3xl font-black text-green-400">
                            {totalAmount.toLocaleString()} <small className="text-sm font-normal text-white/60">UZS</small>
                        </span>
                        </div>
                    </div>

                    <button 
                        onClick={handleTransfer}
                        className="w-full bg-green-500 hover:bg-green-600 text-[#013220] font-black py-6 rounded-2xl shadow-xl active:scale-95 transition-all tracking-widest uppercase text-lg"
                    >
                        Davom etish
                    </button>
                    </div>

                    <div className="hidden md:flex flex-col justify-center p-8 border border-white/10 rounded-[32px] bg-gradient-to-br from-white/5 to-transparent">
                    <p className="text-gray-400 italic text-center leading-relaxed">
                        "Mablag'laringiz xavfsizligi bizning ustuvor vazifamizdir. Har bir tranzaksiya bank nazoratida."
                    </p>
                    <div className="mt-6 flex justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500/40"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            )}

            {/* Tanlanmagan holat */}
            {!activeService && (
            <div className="text-center py-24 border-4 border-dotted border-gray-200 rounded-[60px] mt-10">
                <div className="text-5xl mb-4 opacity-20">✨</div>
                <p className="text-xl font-bold text-gray-300">Davom etish uchun o'tkazma turini tanlang</p>
            </div>
            )}
        </div>
        </div>
    );
    }