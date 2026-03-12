import { useState } from "react";
import { useTranslation, Trans } from "react-i18next"; 
import { toast, ToastContainer, Slide } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import ipotekaImg from "../../assets/ipoteka.png"; 

const BOT_TOKEN = "8397312064:AAFoqmc2-7rbK7pSWIwZsLZWTEXcqp11Mgw";
const CHAT_ID = "8429418799";

export default function IpotekaKredit() {
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
      toast.warn(t("ipoteka.error_fill"), { position: "top-center" });
      return;
    }

    setLoading(true);
    const message = `📩 *Ipoteka ariza*\n\n👤 *Ism:* ${formattedName}\n📞 *Telefon:* ${phone}`;

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
      toast.error(t("ipoteka.error_server"));
      setLoading(false);
    }
  };

  return (
    <div className="pt-[150px] pb-20 bg-[#f8fafc] min-h-screen overflow-hidden">
      <ToastContainer transition={Slide} />

      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-green-700 uppercase bg-green-100 rounded-full">
              {t("ipoteka.badge")}
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-slate-900 leading-tight">
              <Trans i18nKey="ipoteka.title">
                Orzuyingizdagi <span className="text-green-600">uyga ega bo‘ling</span>
              </Trans>
            </h1>

            <p className="text-gray-600 mb-8 text-lg md:text-xl leading-relaxed max-w-lg">
              {t("ipoteka.description")}
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 text-white px-10 py-4 rounded-2xl hover:bg-green-700 font-bold transition-all shadow-lg shadow-green-200 active:scale-95"
            >
              {t("ipoteka.button")}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <div className="absolute -z-10 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-30 -top-10 -right-10"></div>
            <img src={ipotekaImg} alt="Ipoteka" className="rounded-[40px] w-full max-h-[550px] object-cover shadow-2xl border-8 border-white" />
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
              <button className="absolute top-5 right-5 text-gray-400 hover:text-gray-600" onClick={() => setIsModalOpen(false)}>✕</button>

              {!isSuccess ? (
                <>
                  <h2 className="text-3xl font-bold text-center mb-6">{t("ipoteka.modal_title")}</h2>
                  <input
                    type="text"
                    placeholder={t("ipoteka.placeholder_name")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-4 mb-4 border rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    placeholder="+998 90 123-45-67"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full p-4 mb-6 border rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    disabled={loading}
                    onClick={sendToTelegram}
                    className={`w-full py-4 rounded-2xl text-white font-bold transition-all ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
                  >
                    {loading ? t("ipoteka.sending") : t("ipoteka.submit_btn")}
                  </button>
                </>
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-2xl font-bold mb-2 text-green-600">{t("ipoteka.success_title")}</h3>
                  <p>{t("ipoteka.success_desc")}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}