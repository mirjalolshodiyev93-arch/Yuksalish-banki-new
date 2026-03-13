import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { toast, ToastContainer, Slide } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

import car from "../../assets/car.png";

const BOT_TOKEN = "8397312064:AAFoqmc2-7rbK7pSWIwZsLZWTEXcqp11Mgw";
const CHAT_ID = "8429418799";

export default function AutoKredit() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");

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
      }, 3500);
    } catch (err) {
      toast.error(t("auto_kredit.error_server"));
      setLoading(false);
    }
  };

  return (
    <div className="pt-[150px] pb-20 bg-[#f8fafc] min-h-screen overflow-hidden">
      <ToastContainer transition={Slide} />

      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-green-700 uppercase bg-green-100 rounded-full">
             {t("ipoteka.badge")}
            </span>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl text-slate-900">
              <Trans i18nKey="auto_kredit.title">
                 <span className="text-green-600"></span> 
              </Trans>
            </h1>
            <p className="max-w-lg mb-8 text-lg leading-relaxed text-gray-600 md:text-xl">
              {t("auto_kredit.description")}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-10 py-4 font-bold text-white transition-all bg-green-600 shadow-lg rounded-2xl hover:bg-green-700 shadow-green-200 active:scale-95"
              >
                {t("auto_kredit.button")}
              </button>
            </div>
          </motion.div>

      
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex-1"
          >
            <div className="absolute bg-green-200 rounded-full -z-10 w-72 h-72 blur-3xl opacity-30 -top-10 -right-10"></div>
            <img src={car} alt="Avtokredit" className="rounded-[40px] w-full max-h-[550px] object-cover shadow-2xl border-8 border-white" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-8 rounded-[32px] w-full max-w-md relative shadow-2xl"
            >
              <button className="absolute text-gray-400 transition top-5 right-5 hover:text-gray-600" onClick={() => setIsModalOpen(false)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              {!isSuccess ? (
                <>
                  <div className="mb-8 text-center">
                    <h2 className="mb-2 text-3xl font-bold text-slate-800">{t("auto_kredit.modal_title")}</h2>
                    <p className="text-slate-500">{t("auto_kredit.modal_desc")}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block mb-1 ml-1 text-sm font-semibold text-slate-700">{t("auto_kredit.label_name")}</label>
                      <input
                        type="text"
                        placeholder={t("auto_kredit.placeholder_name")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-4 transition border outline-none bg-slate-50 border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 ml-1 text-sm font-semibold text-slate-700">{t("auto_kredit.label_phone")}</label>
                      <input
                        type="text"
                        placeholder="+998 90 123-45-67"
                        value={phone}
                        onChange={handlePhoneChange}
                        className="w-full p-4 transition border outline-none bg-slate-50 border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <button
                      disabled={loading}
                      onClick={sendToTelegram}
                      className={`w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg flex items-center justify-center ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700 shadow-green-200"}`}
                    >
                      {loading ? t("auto_kredit.sending") : t("auto_kredit.submit_btn")}
                    </button>
                  </div>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 text-green-600 bg-green-100 rounded-full">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-slate-800">{t("auto_kredit.success_title")}</h3>
                  <p className="text-slate-600">{t("auto_kredit.success_desc")}</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}