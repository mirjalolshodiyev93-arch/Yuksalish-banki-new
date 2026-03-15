import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { cards } from "../../data/cards";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Loader2 } from "lucide-react"; // Ikonkalar uchun

// 👇 AOS import
import AOS from "aos";
import "aos/dist/aos.css";

export default function CardSection() {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const cardData = cards(t);

  const openOrderModal = (card) => {
    setSelectedCard(card);
    setOpenModal(true);
  };

  useEffect(() => {
    // 1. AOSni sozlash
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });

    // 2. Sun'iy loading (ma'lumotlar kelishini simulyatsiya qilish)
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Loading tugagach AOSni yangilash
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="pb-16 pt-32 bg-[#f5f5f5] min-h-screen relative">
      
      {/* 👇 SECTION LOADING OVERLAY */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#f5f5f5]"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Loader2 size={40} className="text-green-600" />
            </motion.div>
            <p className="mt-4 text-gray-500 font-medium animate-pulse">
              Katalogni yuklamoqdamiz...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-4 space-y-10">
        {!isLoading && cardData.map((card, index) => (
          <div
            key={card.id}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"} // Juft va toq kartalar har xil tomondan chiqadi
            className="flex flex-col items-center justify-between gap-10 p-8 transition-all duration-500 bg-white border border-gray-200 shadow-sm rounded-2xl lg:flex-row hover:shadow-xl hover:-translate-y-1"
          >
            
            <div className="flex-1 space-y-6">
              <div className="inline-block px-4 py-1 bg-green-50 text-green-700 text-sm font-bold rounded-full uppercase tracking-wider">
                Bank Kartasi
              </div>
              <h2 className="text-4xl font-black text-black leading-tight">{card.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{card.description}</p>
              <p className="text-md text-gray-400 italic">{card.subDescription}</p>

              <div className="flex flex-wrap gap-10 pt-4 border-t border-gray-100">
                <div data-aos="zoom-in" data-aos-delay="300">
                  <h3 className="text-2xl font-bold text-black">{card.price}</h3>
                  <p className="text-gray-500 text-sm">{card.priceLabel}</p>
                </div>
                <div data-aos="zoom-in" data-aos-delay="500">
                  <h3 className="text-2xl font-bold text-black">{card.deposit}</h3>
                  <p className="text-gray-500 text-sm">{card.depositLabel}</p>
                </div>
              </div>

              <button
                onClick={() => openOrderModal(card)}
                className="group flex items-center gap-3 px-8 py-4 mt-4 text-white font-bold transition-all bg-green-600 rounded-xl hover:bg-green-700 hover:shadow-lg active:scale-95"
              >
                <CreditCard size={20} />
                {t("buyurtma")}
              </button>
            </div>

            <div 
              className="flex justify-center flex-1"
              data-aos="zoom-out" 
              data-aos-delay="200"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-[500px] max-w-full h-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>

      {/* 👇 MODAL WITH ANIMATION */}
      <AnimatePresence>
        {openModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl relative"
            >
              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black"
              >
                <X size={24} />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                   <CreditCard size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedCard?.title}</h2>
                <p className="text-gray-500 mt-2">{t("buyurtma_text")}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 ml-1">{t("ism")}</label>
                  <input
                    type="text"
                    placeholder="Ismingizni kiriting"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 ml-1">{t("telefon")}</label>
                  <input
                    type="tel"
                    placeholder="+998 (__) ___-__-__"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <button className="w-full py-4 text-white font-bold bg-green-600 rounded-xl hover:bg-green-700 shadow-lg shadow-green-200 transition-all active:scale-95 mt-2">
                  {t("yuborish")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}