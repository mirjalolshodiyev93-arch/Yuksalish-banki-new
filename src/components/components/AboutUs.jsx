import React from "react";
import { motion } from "framer-motion";
import { Target, Rocket, PhoneCall, ArrowRight } from "lucide-react";
import bankImage from "../../assets/biz haqimizda.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function AboutUs() {
  const { t } = useTranslation();

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
    <section className="overflow-hidden text-gray-900 transition-colors duration-500 bg-white dark:bg-slate-950 dark:text-slate-100">
      
      {/* Hero Section */}
      <div className="relative px-4 pt-24 pb-16 mx-auto sm:px-10 lg:px-20 max-w-7xl">
        <div className="flex flex-col-reverse items-center gap-12 lg:flex-row">
          <motion.div 
            className="w-full text-center lg:w-1/2 lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-900/30 rounded-full">
              {t("about.badge")}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-[1.1] dark:text-white">
              <span className="text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 bg-clip-text">
                {t("about.heroTitle")}
              </span> <br /> {t("about.heroSubtitle")}
            </h1>
            <p className="max-w-2xl mb-8 text-lg leading-relaxed text-gray-600 dark:text-slate-400 md:text-xl">
              {t("about.heroDesc")}
            </p>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <button className="flex items-center gap-2 px-8 py-4 font-bold text-white transition-all bg-blue-600 shadow-xl rounded-2xl shadow-blue-200 dark:shadow-none hover:bg-blue-700 hover:-translate-y-1">
                {t("about.btnMore")} <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="relative w-full lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl border-8 border-white dark:border-slate-900">
              <img src={bankImage} alt="Bank Office" className="w-full h-[300px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-700 dark:brightness-90" />
            </div>
            
            {/* Floating Stats - Visible in Light & Dark */}
            <div className="absolute z-20 hidden p-6 border border-gray-100 shadow-2xl -bottom-6 -left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl dark:border-slate-800 md:block">
              <div className="flex gap-8">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</p>
                    <p className="text-xs tracking-wider text-gray-500 uppercase dark:text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="px-4 py-24 transition-colors bg-gray-50 dark:bg-slate-900/50 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl md:grid-cols-2">
          <motion.div {...fadeIn} className="group bg-white dark:bg-slate-900 p-10 rounded-[2rem] shadow-sm hover:shadow-xl dark:shadow-none transition-all border border-gray-100 dark:border-slate-800">
            <div className="flex items-center justify-center mb-6 text-blue-600 transition-colors bg-blue-100 w-14 h-14 dark:bg-blue-900/50 rounded-2xl dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white">
              <Target size={32} />
            </div>
            <h2 className="mb-4 text-2xl font-bold dark:text-white">{t("about.mission.title")}</h2>
            <p className="text-lg text-gray-600 dark:text-slate-400">{t("about.mission.desc")}</p>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="group bg-white dark:bg-slate-900 p-10 rounded-[2rem] shadow-sm hover:shadow-xl dark:shadow-none transition-all border border-gray-100 dark:border-slate-800">
            <div className="flex items-center justify-center mb-6 transition-colors w-14 h-14 bg-cyan-100 dark:bg-cyan-900/50 rounded-2xl text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white">
              <Rocket size={32} />
            </div>
            <h2 className="mb-4 text-2xl font-bold dark:text-white">{t("about.vision.title")}</h2>
            <p className="text-lg text-gray-600 dark:text-slate-400">{t("about.vision.desc")}</p>
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <div className="px-4 py-24 mx-auto sm:px-10 lg:px-20 max-w-7xl">
        <motion.div {...fadeIn} className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl dark:text-white">{t("about.team.title")}</h2>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.div key={index} {...fadeIn} transition={{ delay: index * 0.1 }} className="relative overflow-hidden bg-white dark:bg-slate-900 p-6 border border-gray-100 dark:border-slate-800 shadow-lg hover:shadow-2xl dark:shadow-none transition-all group text-center rounded-[2rem]">
              <div className="relative w-40 h-40 mx-auto mb-6">
                <div className="absolute inset-0 transition-transform duration-300 scale-0 bg-blue-600 rounded-full group-hover:scale-105 -z-10 opacity-10"></div>
                <img src={member.img} alt={member.name} className="object-cover w-full h-full transition-all duration-500 border-4 border-white rounded-full shadow-md grayscale group-hover:grayscale-0 dark:border-slate-800" />
              </div>
              <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
              <p className="font-medium tracking-wide text-blue-600 dark:text-blue-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 pb-24">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="max-w-5xl mx-auto relative overflow-hidden bg-blue-600 dark:bg-blue-700 rounded-[3rem] p-10 md:p-20 text-center text-white">
          <div className="absolute top-0 right-0 w-64 h-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">{t("about.cta.title")}</h2>
            <p className="max-w-2xl mx-auto mb-10 text-lg text-blue-100 md:text-xl">
              {t("about.cta.desc")}
            </p>
          
            <Link to="/contact">
              <button className="inline-flex items-center gap-3 px-10 py-4 text-lg font-bold text-blue-600 transition-colors bg-white shadow-xl dark:bg-slate-100 rounded-2xl hover:bg-gray-100">
                <PhoneCall size={22} />
                {t("about.cta.btn")}
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}