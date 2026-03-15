import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Calculator, ShieldCheck, X, CheckCircle2, AlertCircle } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import 'react-toastify/dist/ReactToastify.css';

export default function Deposits() {
  const { t } = useTranslation();
  
  const [amount, setAmount] = useState(1000000);
  const [selectedDeposit, setSelectedDeposit] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({ fullName: "", phone: "998" });
  const [errors, setErrors] = useState({ fullName: false, phone: false });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-out-back" });
    const timer = setTimeout(() => setIsLoadingPage(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoadingPage) {
      const refreshTimer = setTimeout(() => AOS.refreshHard(), 100);
      return () => clearTimeout(refreshTimer);
    }
  }, [isLoadingPage]);

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, "");
    const length = phoneNumber.length;
    if (length <= 3) return phoneNumber;
    if (length <= 5) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    if (length <= 8) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 5)}-${phoneNumber.slice(5)}`;
    if (length <= 10) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 5)}-${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8)}`;
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 5)}-${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8, 10)}-${phoneNumber.slice(10, 12)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    if (formatted.replace(/[^\d]/g, "").length <= 12) {
      setFormData({ ...formData, phone: formatted });
      setErrors({ ...errors, phone: false });
    }
  };

  // 👇 BU YERDA INPUTLARNI TOZALASH QO'SHILDI
  const handleOpenModal = (deposit) => {
    setSelectedDeposit(deposit);
    // Modal ochilganda ichini tozalaymiz
    setFormData({ fullName: "", phone: "998" });
    setErrors({ fullName: false, phone: false });
    setIsModalOpen(true);
  };

  const handleConfirmDeposit = (e) => {
    e.preventDefault();
    const rawPhone = formData.phone.replace(/[^\d]/g, "");
    
    let hasError = false;
    const newErrors = { fullName: false, phone: false };

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = true;
      hasError = true;
    }
    if (rawPhone.length < 12) {
      newErrors.phone = true;
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      toast.error("Iltimos, barcha maydonlarni to'ldiring!", { position: "top-center" });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
      setIsSuccess(true);
      
      // Yuborilgandan keyin ham tozalab qo'yamiz
      setFormData({ fullName: "", phone: "998" });
    }, 2000);
  };

  const depositTypes = [
    { id: 1, title: "Onlayn Omonat", rate: "24%", term: "24 oy", minAmount: "1 mln" },
    { id: 2, title: "Maksimal Foyda", rate: "26%", term: "18 oy", minAmount: "5 mln" },
    { id: 3, title: "Moslashuvchan", rate: "22%", term: "12 oy", minAmount: "500 ming" }
  ];

  return (
    <div className="relative w-full pt-[100px] min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors duration-500 overflow-hidden text-slate-900 dark:text-white font-sans">
      <ToastContainer limit={2} />

      <AnimatePresence>
        {isLoadingPage && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[250] flex items-center justify-center bg-white dark:bg-gray-950">
            <Loader2 size={50} className="text-emerald-600 animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoadingPage && (
        <div className="max-w-7xl mx-auto px-4">
          <header className="py-16 text-center" data-aos="fade-down">
            <h1 className="text-5xl font-black md:text-7xl mb-6 tracking-tighter uppercase">Omonatlar</h1>
            <p className="text-slate-500 dark:text-gray-400 text-lg max-w-xl mx-auto italic">Mablag'laringizni biz bilan ishonchli ko'paytiring.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {depositTypes.map((item, index) => (
              <div 
                key={item.id} data-aos="fade-up" data-aos-delay={index * 150}
                className="bg-white dark:bg-gray-900 p-8 rounded-[3rem] border border-slate-100 dark:border-gray-800 shadow-xl hover:-translate-y-4 transition-all"
              >
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck size={30} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <div className="text-4xl font-black text-emerald-600 mb-6">{item.rate} <span className="text-xs text-gray-400">YILLIK</span></div>
                <button 
                  onClick={() => handleOpenModal(item)}
                  className="w-full py-4 bg-slate-900 dark:bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-all shadow-lg"
                >
                  Omonat ochish
                </button>
              </div>
            ))}
          </div>

          <section className="py-20" data-aos="zoom-in">
            <div className="bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-[3.5rem] p-8 md:p-14 shadow-2xl">
               <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-1 w-full space-y-8">
                    <h2 className="text-3xl font-bold flex items-center gap-3"><Calculator className="text-emerald-500" /> Kalkulyator</h2>
                    <div className="space-y-6">
                      <div className="flex justify-between items-end">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sarmoya miqdori</label>
                        <span className="text-2xl font-black text-emerald-600">{amount.toLocaleString()} UZS</span>
                      </div>
                      <input 
                        type="range" min="1000000" max="100000000" step="1000000"
                        value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full h-3 bg-slate-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-80 p-8 bg-slate-900 dark:bg-emerald-950 rounded-[2.5rem] text-white space-y-6">
                    <p className="text-[10px] uppercase text-emerald-400 font-bold mb-1 tracking-widest">Yillik foyda</p>
                    <p className="text-4xl font-black">+{(amount * 0.24).toLocaleString()}</p>
                    <div className="h-px bg-white/10" />
                    <p className="text-sm text-gray-400">Jami: {(amount * 1.24).toLocaleString()} UZS</p>
                  </div>
               </div>
            </div>
          </section>
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-[3rem] p-10 shadow-2xl overflow-hidden">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-black dark:hover:text-white transition-colors"><X size={24} /></button>
              
              <h2 className="text-3xl font-black mb-2">Ariza berish</h2>
              <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-8 uppercase tracking-tighter italic">{selectedDeposit?.title}</p>

              <form onSubmit={handleConfirmDeposit} className="space-y-6">
                <div className="relative">
                  <label className={`text-[10px] font-bold uppercase ml-1 ${errors.fullName ? "text-red-500" : "text-gray-400"}`}>To'liq Ismingiz</label>
                  <input 
                    type="text" placeholder="Azizbek Karimov"
                    value={formData.fullName}
                    onChange={(e) => { setFormData({...formData, fullName: e.target.value}); setErrors({...errors, fullName: false}); }}
                    className={`w-full p-4 mt-1 rounded-2xl bg-slate-50 dark:bg-gray-800 outline-none border-2 transition-all ${errors.fullName ? "border-red-500 bg-red-50/50 dark:bg-red-950/20" : "border-transparent focus:border-emerald-500 text-slate-900 dark:text-white"}`}
                  />
                  {errors.fullName && <div className="absolute right-4 top-11 text-red-500"><AlertCircle size={20} /></div>}
                </div>

                <div className="relative">
                  <label className={`text-[10px] font-bold uppercase ml-1 ${errors.phone ? "text-red-500" : "text-gray-400"}`}>Telefon raqam</label>
                  <input 
                    type="text" value={formData.phone} onChange={handlePhoneChange}
                    className={`w-full p-4 mt-1 rounded-2xl bg-slate-50 dark:bg-gray-800 font-mono text-lg border-2 transition-all ${errors.phone ? "border-red-500 bg-red-50/50 dark:bg-red-950/20" : "border-transparent focus:border-emerald-500 text-slate-900 dark:text-white"}`}
                  />
                  {errors.phone && <div className="absolute right-4 top-11 text-red-500"><AlertCircle size={20} /></div>}
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full py-5 bg-emerald-600 text-white font-black rounded-3xl hover:bg-emerald-700 shadow-2xl transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center gap-3"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : "TASDIQLASH"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-[210] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSuccess(false)} className="absolute inset-0 bg-emerald-900/20 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-[3.5rem] p-12 text-center shadow-3xl">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={50} />
              </div>
              <h2 className="text-3xl font-black mb-4">Tayyor!</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm font-medium">Sizning arizangiz qabul qilindi. Operatorlarimiz 15 daqiqa ichida bog'lanishadi.</p>
              <button onClick={() => setIsSuccess(false)} className="w-full py-4 bg-slate-900 dark:bg-emerald-600 text-white font-bold rounded-2xl active:scale-95 transition-transform">Yopish</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}