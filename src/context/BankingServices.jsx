import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Briefcase, Users, BarChart2, Shield, X, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CorporateServices() {
  const { t } = useTranslation();
  const [modalData, setModalData] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // AOS va Loadingni sozlash
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-out-back" });
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Ma'lumotlar yuklangandan keyin AOSni yangilash
  useEffect(() => {
    if (!isLoading) AOS.refresh();
  }, [isLoading]);

  const servicesKeys = ["corporate", "employees", "financial", "security"];
  const servicesIcons = [
    <Briefcase size={28} className="text-emerald-600 dark:text-emerald-400" />,
    <Users size={28} className="text-emerald-600 dark:text-emerald-400" />,
    <BarChart2 size={28} className="text-emerald-600 dark:text-emerald-400" />,
    <Shield size={28} className="text-emerald-600 dark:text-emerald-400" />
  ];

  const handleSubmit = () => {
    const serviceTitle = modalData.title;
    setModalData(null);
    setSuccessMessage(t("success", { service: serviceTitle }));
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors duration-500 font-sans">
      {/* LOADING SCREEN */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-gray-950"
          >
            <div className="flex flex-col items-center gap-4">
              <Loader2 size={48} className="text-emerald-600 animate-spin" />
              <p className="text-slate-500 dark:text-gray-400 font-medium animate-pulse">
                Xizmatlar yuklanmoqda...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <section className="relative pt-[150px] pb-32 px-6">
          {/* SUCCESS NOTIFICATION */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ y: -100, x: "-50%", opacity: 0 }}
                animate={{ y: 20, x: "-50%", opacity: 1 }}
                exit={{ y: -100, x: "-50%", opacity: 0 }}
                className="fixed top-20 left-1/2 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-2xl px-6 py-4 flex items-center gap-3 shadow-xl z-50"
              >
                <CheckCircle size={24} />
                <span className="font-semibold">{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* HERO SECTION */}
          <div className="max-w-7xl mx-auto text-center mb-20" data-aos="fade-down">
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              {t("hero1.title")}
            </h1>
            <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {t("hero1.description")}
            </p>
          </div>

          {/* SERVICES GRID */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesKeys.map((key, idx) => {
              const service = t(`services2.${key}`, { returnObjects: true });
              return (
                <div
                  key={key}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  onClick={() => setModalData({ ...service, key })}
                  className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 group cursor-pointer hover:-translate-y-2"
                >
                  <div className="w-16 h-16 mb-8 flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl transition-all group-hover:scale-110 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40">
                    {servicesIcons[idx]}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    {t("buttons1.details")} 
                  </div>
                </div>
              );
            })}
          </div>

          {/* MODAL */}
          <AnimatePresence>
            {modalData && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setModalData(null)}
                  className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="relative bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[3rem] max-w-xl w-full shadow-2xl border border-slate-100 dark:border-gray-800 overflow-hidden"
                >
                  <button
                    onClick={() => setModalData(null)}
                    className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
                  >
                    <X size={24} />
                  </button>

                  <div className="flex items-center gap-5 mb-8">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl">
                      {servicesIcons[servicesKeys.indexOf(modalData.key)]}
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                      {modalData.title}
                    </h2>
                  </div>

                  <div className="space-y-4 mb-10">
                    <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed">
                      {modalData.details}
                    </p>
                    <div className="h-1 w-20 bg-emerald-500 rounded-full" />
                  </div>

                  <button
                    className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl transition-all active:scale-95 shadow-lg shadow-emerald-200 dark:shadow-none uppercase tracking-widest"
                    onClick={handleSubmit}
                  >
                    {t("buttons1.request")}
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* FOOTER TEXT */}
          <div className="max-w-4xl mx-auto mt-40 text-center" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              {t("footer1.title")}
            </h2>
            <p className="text-slate-500 dark:text-gray-400 leading-relaxed italic">
              "{t("footer1.description")}"
            </p>
          </div>
        </section>
      )}
    </div>
  );
}