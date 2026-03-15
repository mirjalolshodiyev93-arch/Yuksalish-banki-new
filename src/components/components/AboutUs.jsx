import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Rocket, PhoneCall, ArrowRight, CheckCircle2, X, ShieldCheck, Globe, Users } from "lucide-react";
import bankImage from "../../assets/biz haqimizda.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function AboutUs() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal holati

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Modalni yopish uchun Esc tugmasini eshitish
  useEffect(() => {
    const handleEsc = (e) => { e.key === "Escape" && setIsModalOpen(false) };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const stats = [
    { label: t("about.stats.clients"), value: "50K+" },
    { label: t("about.stats.experience"), value: "10+ yil" },
    { label: t("about.stats.branches"), value: "25+" },
  ];

  const teamMembers = [
    { name: "Jahon ", role: t("about.team.roles.founder"), img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { name: "Olimbek X.", role: t("about.team.roles.ceo"), img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Dilshod R.", role: t("about.team.roles.cfo"), img: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600" }
  ];

  return (
    <>
      {/* 👇 LOADING OVERLAY */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-gray-950"
          >
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ rotate: 360, borderRadius: ["20%", "50%", "20%"], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-16 h-16 border-4 border-emerald-600 border-t-transparent shadow-xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 👇 MODAL OYNA (Batafsil ma'lumot uchun) */}
      {/* 👇 MODAL OYNA (Ko'p tilli versiya) */}
<AnimatePresence>
  {isModalOpen && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsModalOpen(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl overflow-hidden bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl z-10 border border-emerald-100 dark:border-emerald-900/30"
      >
        <button 
          onClick={() => setIsModalOpen(false)}
          className="absolute right-6 top-6 p-2 text-slate-400 hover:text-emerald-600 transition-colors bg-slate-100 dark:bg-slate-800 rounded-full"
        >
          <X size={20} />
        </button>
        
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6 text-emerald-600">
            <ShieldCheck size={32} />
            {/* 🌐 Modal Title */}
            <h3 className="text-2xl font-black dark:text-white uppercase tracking-tight">
              {t("about.modal.title")}
            </h3>
          </div>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
            {/* 🌐 Modal Text */}
            <p>{t("about.modal.text")}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl">
                <Globe className="text-emerald-600 shrink-0" size={24} />
                <div>
                  {/* 🌐 Global Info */}
                  <h4 className="font-bold dark:text-white">{t("about.modal.globalTitle")}</h4>
                  <p className="text-sm">{t("about.modal.globalDesc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl">
                <Users className="text-emerald-600 shrink-0" size={24} />
                <div>
                  {/* 🌐 Team Info */}
                  <h4 className="font-bold dark:text-white">{t("about.modal.teamTitle")}</h4>
                  <p className="text-sm">{t("about.modal.teamDesc")}</p>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsModalOpen(false)}
            className="w-full mt-10 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 dark:shadow-none"
          >
            {/* 🌐 Close Button */}
            {t("about.modal.closeBtn")}
          </button>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>

      <section className="overflow-hidden text-slate-900 transition-colors duration-500 bg-white dark:bg-gray-950 dark:text-slate-100">
        
        {/* Hero Section */}
        <div className="relative px-4 pt-32 pb-16 mx-auto sm:px-10 lg:px-20 max-w-7xl">
          <div className="flex flex-col-reverse items-center gap-12 lg:flex-row">
            <motion.div 
              className="w-full text-center lg:w-1/2 lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-bold tracking-wide text-emerald-700 dark:text-emerald-400 uppercase bg-emerald-50 dark:bg-emerald-900/30 rounded-full">
                <CheckCircle2 size={16} /> {t("about.badge")}
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] dark:text-white">
                <span className="text-transparent bg-gradient-to-r from-emerald-700 via-emerald-500 to-teal-400 bg-clip-text">
                  {t("about.heroTitle")}
                </span> <br /> {t("about.heroSubtitle")}
              </h1>
              <p className="max-w-2xl mb-10 text-lg leading-relaxed text-slate-600 dark:text-slate-400 md:text-xl">
                {t("about.heroDesc")}
              </p>
              <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                {/* 👇 MODALNI OCHUVCHI TUGMA */}
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="group flex items-center gap-2 px-10 py-5 font-black text-white transition-all bg-emerald-600 shadow-2xl rounded-2xl shadow-emerald-200 dark:shadow-none hover:bg-emerald-700 hover:-translate-y-1 active:scale-95"
                >
                  {t("about.btnMore")} <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            <motion.div 
              className="relative w-full lg:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative z-10 overflow-hidden rounded-[3rem] shadow-2xl border-[12px] border-emerald-50/50 dark:border-slate-900">
                <img src={bankImage} alt="Bank Office" className="w-full h-[350px] md:h-[550px] object-cover hover:scale-110 transition-transform duration-1000 dark:brightness-90" />
              </div>
              
              <div className="absolute z-20 hidden p-8 border border-emerald-100 shadow-2xl -bottom-10 -left-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-[2.5rem] dark:border-emerald-900/30 md:block">
                <div className="flex gap-10">
                  {stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{stat.value}</p>
                      <p className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase dark:text-slate-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ... (Mission, Vision va Team qismlari avvalgidek qoladi) ... */}
        
        {/* Mission & Vision Section */}
        <div className="px-4 py-24 transition-colors bg-emerald-50/50 dark:bg-emerald-950/20 sm:px-10 lg:px-20">
          <div className="grid grid-cols-1 gap-10 mx-auto max-w-7xl md:grid-cols-2">
            <motion.div {...fadeIn} className="group bg-white dark:bg-gray-900 p-12 rounded-[3rem] shadow-sm hover:shadow-2xl hover:shadow-emerald-200/50 dark:shadow-none transition-all border border-emerald-50 dark:border-emerald-900/20">
              <div className="flex items-center justify-center mb-8 text-emerald-600 transition-all bg-emerald-100 w-16 h-16 dark:bg-emerald-900/50 rounded-3xl dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white group-hover:rotate-6">
                <Target size={36} />
              </div>
              <h2 className="mb-4 text-3xl font-black dark:text-white">{t("about.mission.title")}</h2>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">{t("about.mission.desc")}</p>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="group bg-white dark:bg-gray-900 p-12 rounded-[3rem] shadow-sm hover:shadow-2xl hover:shadow-emerald-200/50 dark:shadow-none transition-all border border-emerald-50 dark:border-emerald-900/20">
              <div className="flex items-center justify-center mb-8 transition-all w-16 h-16 bg-teal-100 dark:bg-teal-900/50 rounded-3xl text-teal-600 dark:text-teal-400 group-hover:bg-teal-600 group-hover:text-white group-hover:-rotate-6">
                <Rocket size={36} />
              </div>
              <h2 className="mb-4 text-3xl font-black dark:text-white">{t("about.vision.title")}</h2>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">{t("about.vision.desc")}</p>
            </motion.div>
          </div>
        </div>

        {/* Team Section */}
        <div className="px-4 py-24 mx-auto sm:px-10 lg:px-20 max-w-7xl">
          <motion.div {...fadeIn} className="mb-20 text-center">
            <h2 className="mb-4 text-4xl font-black md:text-6xl dark:text-white">{t("about.team.title")}</h2>
            <div className="h-2 w-32 bg-emerald-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div key={index} {...fadeIn} transition={{ delay: index * 0.1 }} className="relative overflow-hidden bg-white dark:bg-gray-900 p-8 border border-emerald-50 dark:border-emerald-900/20 shadow-xl hover:shadow-emerald-200/50 dark:shadow-none transition-all group text-center rounded-[3.5rem]">
                <div className="relative w-48 h-48 mx-auto mb-8">
                  <div className="absolute inset-0 transition-transform duration-500 scale-0 bg-emerald-600 rounded-full group-hover:scale-105 -z-10 opacity-20"></div>
                  <img src={member.img} alt={member.name} className="object-cover w-full h-full transition-all duration-700 border-8 border-emerald-50/50 rounded-full shadow-lg group-hover:scale-95 dark:border-emerald-900/30" />
                </div>
                <h3 className="mb-2 text-2xl font-black text-slate-900 dark:text-white">{member.name}</h3>
                <p className="font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase text-xs">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-4 pb-24">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="max-w-6xl mx-auto relative overflow-hidden bg-emerald-600 dark:bg-emerald-700 rounded-[4rem] p-12 md:p-24 text-center text-white shadow-2xl shadow-emerald-200 dark:shadow-none">
            <div className="absolute top-0 right-0 w-80 h-80 translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/30 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="mb-8 text-4xl font-black md:text-6xl leading-tight">{t("about.cta.title")}</h2>
              <p className="max-w-3xl mx-auto mb-12 text-xl font-medium text-emerald-50 md:text-2xl opacity-90">{t("about.cta.desc")}</p>
              <Link to="/contact">
                <button className="group inline-flex items-center gap-4 px-12 py-6 text-xl font-black text-emerald-700 transition-all bg-white shadow-2xl rounded-[2rem] hover:bg-emerald-50 hover:scale-105 active:scale-95">
                  <PhoneCall size={26} className="group-hover:rotate-12 transition-transform" />
                  {t("about.cta.btn")}
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}