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

  const handleOpenModal = (deposit) => {
    setSelectedDeposit(deposit);

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
        <div className="px-4 mx-auto max-w-7xl">
          <header className="py-16 text-center" data-aos="fade-down">
            <h1 className="mb-6 text-5xl font-black tracking-tighter uppercase md:text-7xl">Omonatlar</h1>
            <p className="max-w-xl mx-auto text-lg italic text-slate-500 dark:text-gray-400">Mablag'laringizni biz bilan ishonchli ko'paytiring.</p>
          </header>

          <div className="grid grid-cols-1 gap-8 mb-20 md:grid-cols-3">
            {depositTypes.map((item, index) => (
              <div 
                key={item.id} data-aos="fade-up" data-aos-delay={index * 150}
                className="bg-white dark:bg-gray-900 p-8 rounded-[3rem] border border-slate-100 dark:border-gray-800 shadow-xl hover:-translate-y-4 transition-all"
              >
                <div className="flex items-center justify-center mb-6 w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-2xl">
                  <ShieldCheck size={30} />
                </div>
                <h3 className="mb-2 text-2xl font-bold">{item.title}</h3>
                <div className="mb-6 text-4xl font-black text-emerald-600">{item.rate} <span className="text-xs text-gray-400">YILLIK</span></div>
                <button 
                  onClick={() => handleOpenModal(item)}
                  className="w-full py-4 font-bold text-white transition-all shadow-lg bg-slate-900 dark:bg-emerald-600 rounded-2xl hover:bg-emerald-600 dark:hover:bg-emerald-700"
                >
                  Omonat ochish
                </button>
              </div>
            ))}
          </div>

          <section className="py-20" data-aos="zoom-in">
            <div className="bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-[3.5rem] p-8 md:p-14 shadow-2xl">
               <div className="flex flex-col items-center gap-12 md:flex-row">
                  <div className="flex-1 w-full space-y-8">
                    <h2 className="flex items-center gap-3 text-3xl font-bold"><Calculator className="text-emerald-500" /> Kalkulyator</h2>
                    <div className="space-y-6">
                      <div className="flex items-end justify-between">
                        <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">Sarmoya miqdori</label>
                        <span className="text-2xl font-black text-emerald-600">{amount.toLocaleString()} UZS</span>
                      </div>
                      <input 
                        type="range" min="1000000" max="100000000" step="1000000"
                        value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-slate-100 dark:bg-gray-800 accent-emerald-600"
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
              <button onClick={() => setIsModalOpen(false)} className="absolute text-gray-400 transition-colors top-8 right-8 hover:text-black dark:hover:text-white"><X size={24} /></button>
              
              <h2 className="mb-2 text-3xl font-black">Ariza berish</h2>
              <p className="mb-8 text-sm italic font-bold tracking-tighter uppercase text-emerald-600 dark:text-emerald-400">{selectedDeposit?.title}</p>

              <form onSubmit={handleConfirmDeposit} className="space-y-6">
                <div className="relative">
                  <label className={`text-[10px] font-bold uppercase ml-1 ${errors.fullName ? "text-red-500" : "text-gray-400"}`}>To'liq Ismingiz</label>
                  <input 
                    type="text" placeholder="Azizbek Karimov"
                    value={formData.fullName}
                    onChange={(e) => { setFormData({...formData, fullName: e.target.value}); setErrors({...errors, fullName: false}); }}
                    className={`w-full p-4 mt-1 rounded-2xl bg-slate-50 dark:bg-gray-800 outline-none border-2 transition-all ${errors.fullName ? "border-red-500 bg-red-50/50 dark:bg-red-950/20" : "border-transparent focus:border-emerald-500 text-slate-900 dark:text-white"}`}
                  />
                  {errors.fullName && <div className="absolute text-red-500 right-4 top-11"><AlertCircle size={20} /></div>}
                </div>

                <div className="relative">
                  <label className={`text-[10px] font-bold uppercase ml-1 ${errors.phone ? "text-red-500" : "text-gray-400"}`}>Telefon raqam</label>
                  <input 
                    type="text" value={formData.phone} onChange={handlePhoneChange}
                    className={`w-full p-4 mt-1 rounded-2xl bg-slate-50 dark:bg-gray-800 font-mono text-lg border-2 transition-all ${errors.phone ? "border-red-500 bg-red-50/50 dark:bg-red-950/20" : "border-transparent focus:border-emerald-500 text-slate-900 dark:text-white"}`}
                  />
                  {errors.phone && <div className="absolute text-red-500 right-4 top-11"><AlertCircle size={20} /></div>}
                </div>

                <button 
                  disabled={isSubmitting}
                  className="flex items-center justify-center w-full gap-3 py-5 font-black text-white transition-all shadow-2xl bg-emerald-600 rounded-3xl hover:bg-emerald-700 active:scale-95 disabled:opacity-50"
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
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
                <CheckCircle2 size={50} />
              </div>
              <h2 className="mb-4 text-3xl font-black">Tayyor!</h2>
              <p className="mb-8 text-sm font-medium text-gray-500 dark:text-gray-400">Sizning arizangiz qabul qilindi. Operatorlarimiz 15 daqiqa ichida bog'lanishadi.</p>
              <button onClick={() => setIsSuccess(false)} className="w-full py-4 font-bold text-white transition-transform bg-slate-900 dark:bg-emerald-600 rounded-2xl active:scale-95">Yopish</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}