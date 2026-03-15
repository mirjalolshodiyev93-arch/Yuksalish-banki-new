import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion"; // Animatsiyalar uchun
import "react-toastify/dist/ReactToastify.css";

import ariza from "../../assets/ariza.png";
import kridit from "../../assets/kredit.png";
import { Link } from "react-router-dom";

const BOT_TOKEN = "8397312064:AAFoqmc2-7rbK7pSWIwZsLZWTEXcqp11Mgw";
const CHAT_ID = "8429418799";

export default function Kredit() {
  const { t } = useTranslation();
  const kalkulyatorRef = useRef(null);
  const [loading, setLoading] = useState(true); // Loading holati

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 soniya loading
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
      toast.error("Barcha maydonlarni to'ldiring", { autoClose: 3000 });
      return;
    }

    const message = `📩 KREDIT ARIZA\n👤 Ism: ${name}\n📞 Tel: ${phone}\n💳 Tur: ${type}\n💰 Summa: ${summa.toLocaleString()} UZS`;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
      });
      toast.success("✅ Ariza muvaffaqiyatli yuborildi!", { autoClose: 3000 });
      setIsFormSubmitted(true);
      setName("");
      setPhone("");
      setType("");
    } catch (err) {
      toast.error("Xatolik yuz berdi!", { autoClose: 3000 });
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          /* --- KREDIT LOADER (HOMENIKI BILAN BIR XIL) --- */
          <motion.div
            key="kredit-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-white dark:bg-slate-950"
          >
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg animate-pulse shadow-[0_0_20px_rgba(16,185,129,0.5)]"></div>
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute inset-0 border-t-4 border-b-4 border-emerald-600 rounded-full"
              ></motion.div>
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute inset-2 border-r-4 border-l-4 border-slate-200 dark:border-slate-800 rounded-full"
              ></motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-sm font-bold tracking-[0.3em] uppercase text-slate-500 dark:text-slate-400"
            >
              Kreditlar yuklanmoqda...
            </motion.p>
          </motion.div>
        ) : (
          /* --- ASOSIY SAHIFA KONTENTI --- */
          <motion.div
            key="kredit-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen font-sans transition-colors duration-500 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-emerald-100 dark:selection:bg-emerald-900 selection:text-emerald-900"
          >
            <ToastContainer position="top-right" theme="colored" />

            {/* HERO SECTION */}
            <section className="relative px-6 pt-32 pb-20 overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50/50 dark:bg-emerald-900/10 -z-10 rounded-l-[100px] hidden lg:block"></div>
              <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-8"
                >
                  <h1 className="text-5xl md:text-7xl font-black text-slate-800 dark:text-white leading-[1.1]">
                    {t("kredit.hero_title")}
                  </h1>
                  <p className="max-w-lg text-xl font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                    {t("kredit.hero_subtitle")}
                  </p>
                  <div className="flex flex-wrap gap-5">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="px-10 py-5 font-bold text-white transition-all shadow-xl bg-emerald-600 rounded-2xl hover:bg-emerald-700 shadow-emerald-200 dark:shadow-none hover:-translate-y-1 active:scale-95"
                    >
                      {t("kredit.btn_get")}
                    </button>
                    <button
                      onClick={() => kalkulyatorRef.current?.scrollIntoView({ behavior: "smooth" })}
                      className="px-10 py-5 font-bold transition-all bg-white border-2 dark:bg-slate-900 border-emerald-600 text-emerald-600 dark:text-emerald-500 rounded-2xl hover:bg-emerald-50 dark:hover:bg-slate-800 active:scale-95"
                    >
                      {t("kredit.btn_calc")}
                    </button>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="relative"
                >
                  <div className="absolute -inset-4 bg-emerald-100 dark:bg-emerald-900 rounded-[3rem] blur-2xl opacity-30 animate-pulse"></div>
                  <img
                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c"
                    alt="kredit"
                    className="relative rounded-[3rem] w-full h-[400px] md:h-[550px] object-cover shadow-2xl shadow-emerald-900/10 dark:shadow-none dark:brightness-90"
                  />
                </motion.div>
              </div>
            </section>

            {/* CREDIT TYPES */}
            <section className="max-w-[1400px] mx-auto px-6 py-24">
              <div className="mb-16 space-y-4 text-center">
                <h2 className="text-3xl font-black md:text-5xl text-slate-800 dark:text-white">{t("kredit.types_title")}</h2>
                <div className="w-24 h-2 mx-auto rounded-full bg-emerald-500"></div>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {kreditTurlari.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link to={item.link} className="group">
                      <div className="h-full bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-emerald-100/50 dark:hover:shadow-emerald-900/20 transition-all duration-500">
                        <div className="flex items-center justify-center mb-6 transition-colors w-14 h-14 bg-emerald-50 dark:bg-slate-800 rounded-2xl group-hover:bg-emerald-600">
                          <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="mb-6 text-2xl font-bold text-slate-800 dark:text-white">{item.title}</h3>
                        <div className="mb-8 space-y-4">
                          <div className="flex justify-between font-medium text-slate-500 dark:text-slate-400">
                            <span>Stavka:</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">{item.rate}</span>
                          </div>
                          <div className="flex justify-between font-medium text-slate-500 dark:text-slate-400">
                            <span>Maksimal:</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{item.max}</span>
                          </div>
                        </div>
                        <button className="w-full py-4 font-bold transition-all bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl group-hover:bg-emerald-600 group-hover:text-white">
                          Batafsil
                        </button>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* CALCULATOR SECTION */}
            <section ref={kalkulyatorRef} className="px-6 py-24 transition-colors bg-slate-50 dark:bg-slate-900/50">
              <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-20 items-center">
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="w-full space-y-10 lg:w-1/2"
                >
                  <h2 className="text-4xl font-black text-slate-800 dark:text-white">{t("kredit.calc_title")}</h2>
                  <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3rem] shadow-xl border border-white dark:border-slate-800">
                    <div className="space-y-8">
                      {/* Kredit Summasi Inputi */}
<div>
  <label className="block mb-4 text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
    Kredit Summasi (UZS)
  </label>
  <input 
    type="number" 
    // Agar summa 0 bo'lsa, inputni bo'sh ko'rsatadi, aks holda nollar yig'ilib qoladi
    value={summa === 0 ? "" : summa} 
    onChange={(e) => {
      const val = e.target.value;
      // Faqat son bo'lsa va bo'sh bo'lmasa Numberga aylantiradi
      setSumma(val === "" ? 0 : Number(val));
    }} 
    className="w-full p-4 text-2xl font-black transition border-none outline-none rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500"
  />
</div>

<div className="grid grid-cols-2 gap-6">
  {/* Muddat Inputi */}
  <div>
    <label className="block mb-4 text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
      Muddat (oy)
    </label>
    <input 
      type="number" 
      value={muddat === 0 ? "" : muddat} 
      onChange={(e) => {
        const val = e.target.value;
        setMuddat(val === "" ? 0 : Number(val));
      }} 
      className="w-full p-4 text-xl font-bold outline-none rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500" 
    />
  </div>

  {/* Stavka Inputi */}
  <div>
    <label className="block mb-4 text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
      Stavka (%)
    </label>
    <input 
      type="number" 
      value={foiz === 0 ? "" : foiz} 
      onChange={(e) => {
        const val = e.target.value;
        setFoiz(val === "" ? 0 : Number(val));
      }} 
      className="w-full p-4 text-xl font-bold outline-none rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500" 
    />
  </div>
</div>
                      <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                        <p className="mb-2 text-sm font-bold text-slate-400 dark:text-slate-500">Oylik to'lov:</p>
                        <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400">
                          {oylikTolov()} <span className="text-lg">UZS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="relative w-full lg:w-1/2"
                >
                   <img src={kridit} alt="Kredit" className="w-full rounded-[3rem] shadow-2xl h-[500px] lg:h-[650px] object-cover dark:brightness-90" />
                   <div className="absolute hidden p-8 transition-colors bg-white border shadow-2xl dark:bg-slate-900 -bottom-10 -left-10 rounded-3xl md:block dark:border-slate-800">
                      <p className="text-3xl font-black text-emerald-600 dark:text-emerald-500">24/7</p>
                      <p className="text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400">Online Ariza</p>
                   </div>
                </motion.div>
              </div>
            </section>

            {/* APPLICATION FORM SECTION */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
              <div className="flex flex-col items-center gap-16 lg:flex-row">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-1/2"
                >
                  <img src={ariza} alt="Ariza" className="w-full rounded-[3rem] shadow-2xl h-[500px] object-cover dark:brightness-90" />
                </motion.div>
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-1/2"
                >
                  <div className="bg-white dark:bg-slate-900 p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-slate-50 dark:border-slate-800 transition-colors">
                    <h2 className="mb-4 text-3xl font-black text-slate-800 dark:text-white">{t("kredit.form_title")}</h2>
                    <p className="mb-10 font-medium text-slate-400 dark:text-slate-500">Ma'lumotlaringizni qoldiring, biz sizga qo'ng'iroq qilamiz.</p>
                    
                    <div className="space-y-6">
                      <input
                        type="text"
                        placeholder={t("kredit.placeholder_name")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-5 font-bold transition border-none outline-none rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500"
                        disabled={isFormSubmitted}
                      />
                      <input
                        type="text"
                        placeholder="+998 90 123 45 67"
                        value={phone}
                        onChange={handlePhoneChange}
                        className="w-full p-5 font-bold transition border-none outline-none rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500"
                        disabled={isFormSubmitted}
                      />
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full p-5 font-bold transition border-none outline-none appearance-none rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500"
                        disabled={isFormSubmitted}
                      >
                        <option value="">{t("kredit.select_type")}</option>
                        {kreditTurlari.map((item) => (
                          <option key={item.id} value={item.title}>{item.title}</option>
                        ))}
                      </select>

                      <button
                        onClick={sendToTelegram}
                        className={`w-full py-6 rounded-2xl font-black text-lg transition-all shadow-xl ${isFormSubmitted ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed" : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200 dark:shadow-none active:scale-95 hover:-translate-y-1"}`}
                        disabled={isFormSubmitted}
                      >
                        {isFormSubmitted ? "Yuborildi" : t("kredit.btn_send")}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* MODAL VA QOLGAN QISMLAR O'ZGARIShSIZ */}
            <AnimatePresence>
              {isModalOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
                >
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] w-full max-w-md relative shadow-2xl border dark:border-slate-800"
                  >
                    <button className="absolute transition-colors top-6 right-6 text-slate-300 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400" onClick={() => setIsModalOpen(false)}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    {!isSuccess ? (
                      <div className="space-y-6">
                        <h2 className="text-3xl font-black leading-tight text-slate-800 dark:text-white">Tezkor Ariza</h2>
                        <p className="font-medium text-slate-500 dark:text-slate-400">Shaxsiy menejer bilan bog'lanish uchun tugmani bosing.</p>
                        <button className="w-full py-5 text-lg font-black text-white transition shadow-xl bg-emerald-600 rounded-2xl hover:bg-emerald-700 shadow-emerald-100 dark:shadow-none" onClick={handleSubmitModal}>
                          Bog'lanish
                        </button>
                      </div>
                    ) : (
                      <div className="py-6 space-y-4 text-center">
                        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white">Muvaffaqiyatli!</h3>
                        <p className="font-medium text-slate-500 dark:text-slate-400">Siz bilan tez orada bog'lanamiz.</p>
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