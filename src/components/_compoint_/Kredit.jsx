import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion"; 
import "react-toastify/dist/ReactToastify.css";

import ariza from "../../assets/ariza.png";
import kridit from "../../assets/kredit.png";
import { Link } from "react-router-dom";

const BOT_TOKEN = "8397312064:AAFoqmc2-7rbK7pSWIwZsLZWTEXcqp11Mgw";
const CHAT_ID = "8429418799";

export default function Kredit() {
  const { t } = useTranslation();
  const kalkulyatorRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const kreditTurlari = [
    { id: 1, title: t("kredit.types.mortgage"), rate: "18%", max: t("kredit.max_values.1b"), term: t("kredit.terms.20y"), link: "/IpotekaKredit" },
    { id: 2, title: t("kredit.types.auto"), rate: "20%", max: t("kredit.max_values.500m"), term: t("kredit.terms.5y"), link: "/autoKredit" },
    { id: 3, title: t("kredit.types.business"), rate: "22%", max: t("kredit.max_values.2b"), term: t("kredit.terms.10y"), link: "/BusinessKredit" },
    { id: 4, title: t("kredit.types.consumer"), rate: "24%", max: t("kredit.max_values.200m"), term: t("kredit.terms.3y"), link: "/IstemolKredit" },
  ];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [summa, setSumma] = useState(10000000);
  const [muddat, setMuddat] = useState(12);
  const [foiz, setFoiz] = useState(20);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmitModal = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSuccess(false);
    }, 3000);
  };

  const oylikTolov = () => {
    const r = foiz / 100 / 12;
    if (r === 0) return (summa / muddat).toLocaleString();
    const payment = ((summa * r) / (1 - Math.pow(1 + r, -muddat))).toFixed(0);
    return Number(payment).toLocaleString();
  };

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.startsWith("998")) val = val.slice(3);
    if (val.length > 9) val = val.slice(0, 9);
    let formatted = "+998";
    if (val.length > 0) formatted += " " + val.slice(0, 2);
    if (val.length >= 3) formatted += "-" + val.slice(2, 5);
    if (val.length >= 6) formatted += "-" + val.slice(5, 7);
    if (val.length >= 8) formatted += "-" + val.slice(7, 9);
    setPhone(formatted);
  };

  const sendToTelegram = async () => {
    if (isFormSubmitted) return;
    if (name.length < 2 || phone.length < 13 || !type) {
      toast.error(t("kredit.alert_fill"), { autoClose: 3000 });
      return;
    }

    const message = `📩 KREDIT ARIZA\n👤 Ism: ${name}\n📞 Tel: ${phone}\n💳 Tur: ${type}\n💰 Summa: ${summa.toLocaleString()} ${t("kredit.currency")}`;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
      });
      toast.success(t("kredit.alert_success"), { autoClose: 3000 });
      setIsFormSubmitted(true);
      setName("");
      setPhone("");
      setType("");
    } catch (err) {
      toast.error("Error!", { autoClose: 3000 });
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="kredit-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-white dark:bg-slate-950"
          >
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg animate-pulse"></div>
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute inset-0 border-t-4 border-b-4 border-emerald-600 rounded-full"
              ></motion.div>
            </div>
            <motion.p className="mt-8 text-sm font-bold tracking-[0.3em] uppercase text-slate-500 dark:text-slate-400">
              {/* Loader matni uchun json'ga "loading" qo'shish tavsiya etiladi, hozircha qo'lda */}
              Loading...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="kredit-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen font-sans bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
          >
            <ToastContainer position="top-right" theme="colored" />

            {/* HERO SECTION */}
            <section className="relative px-6 pt-32 pb-20 overflow-hidden">
              <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <motion.div className="space-y-8">
                  <h1 className="text-5xl md:text-7xl font-black leading-[1.1]">
                    {t("kredit.hero_title")}
                  </h1>
                  <p className="max-w-lg text-xl font-medium text-slate-500">
                    {t("kredit.hero_subtitle")}
                  </p>
                  <div className="flex flex-wrap gap-5">
                    <button onClick={() => setIsModalOpen(true)} className="px-10 py-5 font-bold text-white bg-emerald-600 rounded-2xl">
                      {t("kredit.btn_get")}
                    </button>
                    <button onClick={() => kalkulyatorRef.current?.scrollIntoView({ behavior: "smooth" })} className="px-10 py-5 font-bold border-2 border-emerald-600 text-emerald-600 rounded-2xl">
                      {t("kredit.btn_calc")}
                    </button>
                  </div>
                </motion.div>
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c" alt="hero" className="rounded-[3rem] w-full h-[400px] md:h-[550px] object-cover" />
                </div>
              </div>
            </section>

            {/* CREDIT TYPES */}
            <section className="max-w-[1400px] mx-auto px-6 py-24">
              <h2 className="mb-16 text-center text-3xl font-black md:text-5xl">{t("kredit.types_title")}</h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {kreditTurlari.map((item) => (
                  <Link key={item.id} to={item.link} className="group">
                    <div className="h-full bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 transition-all shadow-sm hover:shadow-xl">
                      <h3 className="mb-6 text-2xl font-bold">{item.title}</h3>
                      <div className="mb-8 space-y-4">
                        <div className="flex justify-between">
                          <span>{t("kredit.rate_label")}:</span>
                          <span className="font-bold text-emerald-600">{item.rate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t("kredit.max_label")}:</span>
                          <span className="font-bold">{item.max}</span>
                        </div>
                      </div>
                      <button className="w-full py-4 font-bold bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        {t("kredit.btn_more")}
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* CALCULATOR SECTION */}
            <section ref={kalkulyatorRef} className="px-6 py-24 bg-slate-50 dark:bg-slate-900/50">
              <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-20 items-center">
                <div className="w-full lg:w-1/2 space-y-10">
                  <h2 className="text-4xl font-black">{t("kredit.calc_title")}</h2>
                  <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3rem] shadow-xl">
                    <div className="space-y-8">
                      <div>
                        <label className="block mb-4 text-xs font-bold uppercase text-slate-400">{t("kredit.placeholder_sum")} ({t("kredit.currency")})</label>
                        <input type="number" value={summa || ""} onChange={(e) => setSumma(Number(e.target.value))} className="w-full p-4 text-2xl font-black bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500" />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block mb-4 text-xs font-bold uppercase text-slate-400">{t("kredit.placeholder_term")}</label>
                          <input type="number" value={muddat || ""} onChange={(e) => setMuddat(Number(e.target.value))} className="w-full p-4 font-bold bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none" />
                        </div>
                        <div>
                          <label className="block mb-4 text-xs font-bold uppercase text-slate-400">{t("kredit.placeholder_percent")}</label>
                          <input type="number" value={foiz || ""} onChange={(e) => setFoiz(Number(e.target.value))} className="w-full p-4 font-bold bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none" />
                        </div>
                      </div>
                      <div className="pt-8 border-t dark:border-slate-800">
                        <p className="mb-2 text-sm font-bold text-slate-400">{t("kredit.monthly_payment")}:</p>
                        <div className="text-4xl font-black text-emerald-600">
                          {oylikTolov()} <span className="text-lg">{t("kredit.currency")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                   <img src={kridit} alt="Kredit" className="w-full rounded-[3rem] shadow-2xl h-[500px] object-cover" />
                </div>
              </div>
            </section>

            {/* FORM SECTION */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="w-full lg:w-1/2">
                  <img src={ariza} alt="Ariza" className="w-full rounded-[3rem] shadow-2xl h-[500px] object-cover" />
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] shadow-2xl border dark:border-slate-800">
                    <h2 className="mb-4 text-3xl font-black">{t("kredit.form_title")}</h2>
                    <div className="space-y-6">
                      <input type="text" placeholder={t("kredit.placeholder_name")} value={name} onChange={(e) => setName(e.target.value)} className="w-full p-5 font-bold bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none" />
                      <input type="text" placeholder={t("kredit.placeholder_phone")} value={phone} onChange={handlePhoneChange} className="w-full p-5 font-bold bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none" />
                      <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-5 font-bold bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none appearance-none">
                        <option value="">{t("kredit.select_type")}</option>
                        {kreditTurlari.map((item) => <option key={item.id} value={item.title}>{item.title}</option>)}
                      </select>
                      <button onClick={sendToTelegram} disabled={isFormSubmitted} className={`w-full py-6 rounded-2xl font-black text-lg transition-all ${isFormSubmitted ? "bg-slate-200 text-slate-400" : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xl"}`}>
                        {isFormSubmitted ? t("kredit.btn_sent") : t("kredit.btn_send")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* MODAL */}
            <AnimatePresence>
              {isModalOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] w-full max-w-md relative shadow-2xl">
                    <button className="absolute top-6 right-6" onClick={() => setIsModalOpen(false)}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    {!isSuccess ? (
                      <div className="space-y-6">
                        <h2 className="text-3xl font-black">{t("kredit.modal_title")}</h2>
                        <p className="text-slate-500">{t("kredit.modal_desc")}</p>
                        <button className="w-full py-5 text-lg font-black text-white bg-emerald-600 rounded-2xl" onClick={handleSubmitModal}>
                          {t("kredit.modal_btn")}
                        </button>
                      </div>
                    ) : (
                      <div className="py-6 text-center space-y-4">
                        <h3 className="text-2xl font-black text-emerald-600">{t("kredit.modal_success")}</h3>
                        <p>{t("kredit.modal_success_desc")}</p>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}