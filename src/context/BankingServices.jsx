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


  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-out-back" });
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);


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
    <div className="min-h-screen font-sans transition-colors duration-500 bg-slate-50 dark:bg-gray-950">
       <AnimatePresence>
        {isLoading && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-gray-950"
          >
            <div className="flex flex-col items-center gap-4">
              <Loader2 size={48} className="text-emerald-600 animate-spin" />
              <p className="font-medium text-slate-500 dark:text-gray-400 animate-pulse">
                Xizmatlar yuklanmoqda...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <section className="relative pt-[150px] pb-32 px-6">
        
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ y: -100, x: "-50%", opacity: 0 }}
                animate={{ y: 20, x: "-50%", opacity: 1 }}
                exit={{ y: -100, x: "-50%", opacity: 0 }}
                className="fixed z-50 flex items-center gap-3 px-6 py-4 border shadow-xl top-20 left-1/2 bg-emerald-100 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-2xl"
              >
                <CheckCircle size={24} />
                <span className="font-semibold">{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mx-auto mb-20 text-center max-w-7xl" data-aos="fade-down">
            <h1 className="mb-6 text-5xl font-black tracking-tight md:text-6xl text-slate-900 dark:text-white">
              {t("hero1.title")}
            </h1>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed text-slate-600 dark:text-gray-400">
              {t("hero1.description")}
            </p>
          </div>

       
          <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
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
                  <div className="flex items-center justify-center w-16 h-16 mb-8 transition-all bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl group-hover:scale-110 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40">
                    {servicesIcons[idx]}
                  </div>
                  <h3 className="mb-3 text-xl font-bold transition-colors text-slate-900 dark:text-white group-hover:text-emerald-600">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500 dark:text-gray-400">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 mt-8 text-sm font-bold tracking-wider uppercase transition-all transform translate-y-2 opacity-0 text-emerald-600 dark:text-emerald-400 group-hover:opacity-100 group-hover:translate-y-0">
                    {t("buttons1.details")} 
                  </div>
                </div>
              );
            })}
          </div>

  
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
                    className="absolute transition top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white"
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

                  <div className="mb-10 space-y-4">
                    <p className="text-lg leading-relaxed text-slate-600 dark:text-gray-300">
                      {modalData.details}
                    </p>
                    <div className="w-20 h-1 rounded-full bg-emerald-500" />
                  </div>

                  <button
                    className="w-full py-5 font-black tracking-widest text-white uppercase transition-all shadow-lg bg-emerald-600 hover:bg-emerald-700 rounded-2xl active:scale-95 shadow-emerald-200 dark:shadow-none"
                    onClick={handleSubmit}
                  >
                    {t("buttons1.request")}
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        
          <div className="max-w-4xl mx-auto mt-40 text-center" data-aos="fade-up">
            <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
              {t("footer1.title")}
            </h2>
            <p className="italic leading-relaxed text-slate-500 dark:text-gray-400">
              "{t("footer1.description")}"
            </p>
          </div>
        </section>
      )}
    </div>
  );
}