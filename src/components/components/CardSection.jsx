import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { cards } from "../../data/cards";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Loader2, CheckCircle2, AlertCircle } from "lucide-react"; 
import AOS from "aos";
import "aos/dist/aos.css";

export default function CardSection() {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  const [phone, setPhone] = useState("998");
  const [fullName, setFullName] = useState("");
  const [status, setStatus] = useState("idle"); 

  const cardData = cards(t);


  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (!value.startsWith("998")) value = "998" + value;
    if (value.length > 12) value = value.slice(0, 12);
    
    let formatted = value;
    if (value.length > 3) formatted = value.slice(0, 3) + " " + value.slice(3);
    if (value.length > 5) formatted = formatted.slice(0, 6) + "-" + formatted.slice(6);
    if (value.length > 8) formatted = formatted.slice(0, 10) + "-" + formatted.slice(10);
    if (value.length > 10) formatted = formatted.slice(0, 13) + "-" + formatted.slice(13);
    
    setPhone(formatted);
  };

  const openOrderModal = (card) => {
    setSelectedCard(card);
    setOpenModal(true);
    setStatus("idle");
    setFullName("");
    setPhone("998");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rawPhone = phone.replace(/\D/g, "");

   
    if (fullName.trim().length < 3 || rawPhone.length !== 12) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000); 
      return;
    }

    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setOpenModal(false), 3000); 
    }, 1500);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => AOS.refresh(), 100);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="pb-16 pt-32 bg-slate-50 dark:bg-gray-950 min-h-screen relative transition-colors duration-300">
      
     
      <AnimatePresence>
        {isLoading && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-gray-950"
          >
            <Loader2 size={40} className="text-green-600 animate-spin" />
            <p className="mt-4 font-medium text-gray-500 dark:text-gray-400 animate-pulse">
              {t("Yuklanmoqda...")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-4 space-y-10">
        {!isLoading && cardData.map((card, index) => (
          <div
            key={card.id}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"} 
            className="flex flex-col items-center justify-between gap-10 p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm rounded-3xl lg:flex-row hover:shadow-xl transition-all duration-300"
          >
            <div className="flex-1 space-y-6">
              <div className="inline-block px-4 py-1 text-sm font-bold text-green-700 dark:text-green-400 uppercase rounded-full bg-green-50 dark:bg-green-900/20">
                {t("Bank Kartasi")}
              </div>
              <h2 className="text-4xl font-black text-black dark:text-white leading-tight">{card.title}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">{card.description}</p>

              <div className="flex flex-wrap gap-10 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <h3 className="text-2xl font-bold text-black dark:text-white">{card.price}</h3>
                  <p className="text-sm text-gray-500">{card.priceLabel}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black dark:text-white">{card.deposit}</h3>
                  <p className="text-sm text-gray-500">{card.depositLabel}</p>
                </div>
              </div>

              <button
                onClick={() => openOrderModal(card)}
                className="flex items-center gap-3 px-8 py-4 font-bold text-white bg-green-600 rounded-2xl hover:bg-green-700 active:scale-95 transition-all"
              >
                <CreditCard size={20} />
                {t("buyurtma")}
              </button>
            </div>

            <div className="flex justify-center flex-1" data-aos="zoom-out">
              <img src={card.image} alt={card.title} className="w-[450px] object-contain drop-shadow-2xl" />
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {openModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpenModal(false)}
              className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm" 
            />
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-md p-8 bg-white dark:bg-gray-900 shadow-2xl rounded-[2.5rem] overflow-hidden transition-colors"
            >
          
              {status === "success" ? (
                <div className="py-10 text-center space-y-4">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto text-green-600 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-2xl font-bold dark:text-white">{t("Muvaffaqiyatli!")}</h2>
                  <p className="text-gray-500 dark:text-gray-400">{t("Tez orada operatorlarimiz bog'lanishadi.")}</p>
                </div>
              ) : (
                <>
                  <button onClick={() => setOpenModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black dark:hover:text-white">
                    <X size={24} />
                  </button>

                  <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCard?.title}</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">{t("buyurtma_text")}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                      <label className="ml-1 text-sm font-bold text-gray-700 dark:text-gray-300">{t("ism")}</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t("ism")}
                        className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-white outline-none rounded-2xl focus:ring-2 focus:ring-green-500 transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="ml-1 text-sm font-bold text-gray-700 dark:text-gray-300">{t("telefon")}</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={handlePhoneChange}
                        className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-white font-mono text-lg outline-none rounded-2xl focus:ring-2 focus:ring-green-500 transition-all"
                      />
                    </div>

                   
                    {status === "error" && (
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-red-500 text-sm font-medium">
                        <AlertCircle size={18} />
                        {t("Ma'lumotlarni to'liq kiriting!")}
                      </motion.div>
                    )}

                    <button 
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full py-5 font-bold text-white bg-green-600 rounded-2xl hover:bg-green-700 shadow-lg shadow-green-200 dark:shadow-none active:scale-95 transition-all flex justify-center"
                    >
                      {status === "submitting" ? <Loader2 className="animate-spin" /> : t("yuborish")}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}