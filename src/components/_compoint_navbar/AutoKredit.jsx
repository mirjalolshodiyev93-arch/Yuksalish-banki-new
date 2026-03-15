import { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { toast, ToastContainer, Slide } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, X, User, Phone, Car } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

import carImg from "../../assets/car.png";

const BOT_TOKEN = "8397312064:AAFoqmc2-7rbK7pSWIwZsLZWTEXcqp11Mgw";
const CHAT_ID = "8429418799";

export default function AutoKredit() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Telegram loading
  const [pageLoading, setPageLoading] = useState(true); // Sahifa loading
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-out-back" });
    const timer = setTimeout(() => setPageLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

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
    const formattedName = name.trim();
    const digits = phone.replace(/\D/g, "").slice(3);

    if (formattedName.length < 2 || digits.length !== 9) {
      toast.warn(t("auto_kredit.error_fill"), { position: "top-center" });
      return;
    }

    setLoading(true);
    const message = `📩 *Avtokredit ariza*\n\n👤 *Ism:* ${formattedName}\n📞 *Telefon:* ${phone}`;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: "Markdown" }),
      });

      setIsSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccess(false);
        setName("");
        setPhone("+998");
        setLoading(false);
      }, 3000);
    } catch (err) {
      toast.error(t("auto_kredit.error_server"));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors duration-500 font-sans">
      <ToastContainer transition={Slide} theme="colored" />

      {/* PAGE INITIAL LOADING */}
      <AnimatePresence>
        {pageLoading && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-white dark:bg-gray-950"
          >
            <div className="flex flex-col items-center gap-4">
              <Loader2 size={48} className="text-green-600 animate-spin" />
              <p className="text-slate-500 dark:text-gray-400 font-medium animate-pulse">
                Avtokredit shartlari yuklanmoqda...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!pageLoading && (
        <section className="pt-[150px] pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
              
              {/* TEXT CONTENT */}
              <div className="flex-1 text-center lg:text-left" data-aos="fade-right">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-green-700 dark:text-green-400 uppercase bg-green-100 dark:bg-green-900/30 rounded-full">
                  <Car size={16} /> {t("auto_kredit.badge") || "Avto Kredit"}
                </span>

                <h1 className="mb-6 text-4xl font-black leading-tight md:text-6xl text-slate-900 dark:text-white">
                  <Trans i18nKey="auto_kredit.title">
                    Yangi avtomobil <span className="text-green-600">sari bir qadam</span>
                  </Trans>
                </h1>

                <p className="max-w-xl mb-10 text-lg leading-relaxed text-slate-600 dark:text-gray-400 md:text-xl">
                  {t("auto_kredit.description")}
                </p>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-10 py-5 font-black text-white transition-all bg-green-600 shadow-xl rounded-2xl hover:bg-green-700 hover:shadow-green-500/30 active:scale-95 shadow-green-200 dark:shadow-none"
                >
                  {t("auto_kredit.button")}
                </button>
              </div>

              {/* IMAGE CONTENT */}
              <div className="relative flex-1" data-aos="zoom-in" data-aos-delay="200">
                <div className="absolute -z-10 w-80 h-80 bg-green-400/20 rounded-full blur-[100px] -top-10 -right-10 animate-pulse"></div>
                <motion.div
                  whileHover={{ y: -10, rotate: 1 }}
                  className="relative p-3 bg-white dark:bg-gray-900 rounded-[48px] shadow-2xl border border-slate-100 dark:border-gray-800"
                >
                  <img 
                    src={carImg} 
                    alt="Auto Credit" 
                    className="rounded-[40px] w-full h-auto max-h-[500px] object-contain" 
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MODAL WINDOW */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => !loading && setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              className="relative bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[3rem] w-full max-w-md shadow-2xl border border-white dark:border-gray-800"
            >
              <button 
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" 
                onClick={() => setIsModalOpen(false)}
              >
                <X size={24} />
              </button>

              {!isSuccess ? (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                      {t("auto_kredit.modal_title")}
                    </h2>
                    <p className="text-slate-500 dark:text-gray-400 text-sm">
                      {t("auto_kredit.modal_desc")}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="text"
                        placeholder={t("auto_kredit.placeholder_name")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-green-500 dark:text-white outline-none rounded-2xl transition-all"
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="text"
                        placeholder="+998 90 123-45-67"
                        value={phone}
                        onChange={handlePhoneChange}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-green-500 dark:text-white outline-none rounded-2xl transition-all font-mono"
                      />
                    </div>

                    <button
                      disabled={loading}
                      onClick={sendToTelegram}
                      className="w-full py-5 mt-4 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 dark:disabled:bg-gray-800 text-white font-black rounded-2xl transition-all shadow-lg shadow-green-200 dark:shadow-none flex items-center justify-center gap-2"
                    >
                      {loading && <Loader2 className="animate-spin" size={20} />}
                      {loading ? t("auto_kredit.sending") : t("auto_kredit.submit_btn")}
                    </button>
                  </div>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                    {t("auto_kredit.success_title")}
                  </h3>
                  <p className="text-slate-500 dark:text-gray-400 leading-relaxed">
                    {t("auto_kredit.success_desc")}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}