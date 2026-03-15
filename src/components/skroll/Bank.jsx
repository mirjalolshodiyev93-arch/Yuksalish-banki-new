import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function BankTimeline() {
  const { t } = useTranslation();
  const timelineData = t("timeline.data", { returnObjects: true }) || [];

  // Markaziy chiziq skroll bo'lganda to'lishi uchun
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="relative py-32 overflow-hidden transition-colors duration-700 bg-white dark:bg-slate-950">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-50/50 dark:from-green-900/10 to-transparent" />

      <div className="container relative px-6 mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="relative mb-32 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 rounded-full text-xs font-black tracking-[0.3em] text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 uppercase inline-block mb-4"
          >
            {t("timeline.badge", "Tarixiy yo'l")}
          </motion.span>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black tracking-tight md:text-7xl text-slate-900 dark:text-white"
          >
            {t("timeline.title_part1", "Muvaffaqiyat ")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400 dark:from-green-400 dark:to-emerald-300">
              {t("timeline.title_brand", "Banki")}
            </span>
            {t("timeline.title_part2", " sari")}
          </motion.h2>
        </div>

        <div className="relative">
          {/* Markaziy Chiziq (Dinamik to'lishi bilan) */}
          <div className="absolute w-1 h-full transform bg-slate-100 left-4 md:left-1/2 md:-translate-x-1/2 dark:bg-slate-900">
            <motion.div 
              style={{ scaleY }}
              className="absolute top-0 left-0 w-full h-full origin-top bg-gradient-to-b from-green-500 via-emerald-400 to-green-600"
            />
          </div>

          {Array.isArray(timelineData) && timelineData.map((item, index) => (
            <div
              key={index}
              className={`relative flex items-center justify-between mb-32 w-full ${
                index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
            >
              {/* Bo'sh joy (Desktop uchun) */}
              <div className="hidden w-5/12 md:block"></div>

              {/* Romb belgisi (Indicator) */}
              <motion.div 
                initial={{ scale: 0, rotate: 0 }}
                whileInView={{ scale: 1, rotate: 45 }}
                viewport={{ once: true, margin: "-100px" }}
                className="absolute z-30 flex items-center justify-center transform -translate-x-1/2 left-4 md:left-1/2"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-white border-4 border-green-500 shadow-xl dark:bg-slate-900 dark:border-green-400 rounded-xl group-hover:scale-110 transition-transform">
                  <span className="text-[10px] -rotate-45 font-black text-green-600 dark:text-green-400">
                    {item.year}
                  </span>
                </div>
              </motion.div>

              {/* Card Section */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                viewport={{ once: true }}
                className="w-full md:w-5/12 pl-16 md:pl-0"
              >
                <div
                  className={`
                    group relative p-10 rounded-[3rem] transition-all duration-500 hover:-translate-y-3
                    ${
                      index % 2 === 0
                        ? 'bg-white dark:bg-slate-900 shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800'
                        : 'bg-gradient-to-br from-green-600 to-emerald-700 text-white shadow-2xl shadow-green-500/20'
                    }
                  `}
                >
                  {/* Background Year Decor */}
                  <div className="absolute top-4 right-8 overflow-hidden pointer-events-none">
                     <span className={`text-8xl font-black opacity-[0.03] dark:opacity-[0.05] italic ${
                       index % 2 === 0 ? 'text-slate-900 dark:text-green-400' : 'text-white'
                     }`}>
                        {item.year}
                     </span>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-2xl font-black text-sm shadow-inner ${
                        index % 2 === 0 
                        ? 'bg-green-50 text-green-600 dark:bg-green-900/30' 
                        : 'bg-white/20 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      <h3 className={`text-2xl font-black tracking-tight ${
                        index % 2 === 0 ? 'text-slate-900 dark:text-white' : 'text-white'
                      }`}>
                        {item.title}
                      </h3>
                    </div>

                    <p className={`text-lg leading-relaxed font-medium ${
                      index % 2 === 0 ? 'text-slate-600 dark:text-slate-400' : 'text-green-50/90'
                    }`}>
                      {item.desc}
                    </p>

                    {/* Decorative Footer */}
                    <div className="flex items-center gap-3 mt-8">
                      <div className={`h-1.5 w-12 rounded-full ${
                        index % 2 === 0 ? 'bg-green-500' : 'bg-white'
                      }`} />
                      <div className={`w-1.5 h-1.5 rounded-full opacity-40 ${
                        index % 2 === 0 ? 'bg-green-500' : 'bg-white'
                      }`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}