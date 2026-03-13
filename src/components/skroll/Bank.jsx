import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function BankTimeline() {
  const { t } = useTranslation();

  const timelineData = t("timeline.data", { returnObjects: true }) || [];

  useEffect(() => {
    if (!Array.isArray(timelineData) || timelineData.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-x-0');
        }
      });
    }, { threshold: 0.2 });

    const cards = document.querySelectorAll('.timeline-card');
    cards.forEach((el) => observer.observe(el));

    return () => {
      cards.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [timelineData]);

  return (
    <section className="py-24 overflow-hidden transition-colors duration-500 bg-green-50 dark:bg-slate-950">
      <div className="max-w-6xl px-6 mx-auto">
        <div className="mb-24 text-center">
          <span className="text-sm italic font-bold tracking-widest text-green-600 uppercase dark:text-green-400">
            {t("timeline.badge", "Tarixiy yo'l")}
          </span>

          <h2 className="mt-2 mb-6 text-4xl font-black tracking-tight md:text-6xl text-slate-900 dark:text-white">
            {t("timeline.title_part1", "Muvaffaqiyat ")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-400 dark:to-emerald-300">
              {t("timeline.title_brand", "Banki")}
            </span>
            {t("timeline.title_part2", " sari")}
          </h2>

          <div className="flex justify-center gap-1">
            <div className="w-12 h-1 bg-green-600 rounded-full dark:bg-green-500"></div>
            <div className="w-4 h-1 bg-green-300 rounded-full dark:bg-green-800"></div>
          </div>
        </div>

        <div className="relative">
          {/* Markaziy chiziq */}
          <div className="absolute w-1 h-full transform bg-green-200 left-4 md:left-1/2 md:-translate-x-1/2 dark:bg-slate-800">
            <div className="absolute top-0 left-0 w-full h-full origin-top bg-gradient-to-b from-green-600 via-emerald-400 to-green-800 animate-pulse"></div>
          </div>

          {Array.isArray(timelineData) && timelineData.map((item, index) => (
            <div
              key={index}
              className={`relative flex items-center justify-between mb-20 w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
            >
              <div className="hidden w-5/12 md:block"></div>

              {/* Romb belgisi */}
              <div className="absolute z-20 flex items-center justify-center transform -translate-x-1/2 left-4 md:left-1/2">
                <div className="flex items-center justify-center w-10 h-10 rotate-45 bg-white border-4 border-green-600 shadow-lg dark:bg-slate-900 dark:border-green-500 rounded-xl">
                  <div className="w-2 h-2 bg-green-600 rounded-full dark:bg-green-400"></div>
                </div>
              </div>

              <div
                className={`w-full md:w-5/12 pl-12 md:pl-0 timeline-card opacity-0 transition-all duration-1000 ease-out ${
                  index % 2 === 0 ? 'md:translate-x-10' : 'md:-translate-x-10'
                }`}
              >
                <div
                  className={`
                    group relative p-8 rounded-[2rem] transition-all duration-500 hover:-translate-y-2
                    ${
                      index % 2 === 0
                        ? 'bg-white dark:bg-slate-900 shadow-xl hover:shadow-green-200 dark:hover:shadow-green-900/20'
                        : 'bg-green-700 dark:bg-green-800 text-white shadow-2xl shadow-green-200/50 dark:shadow-none'
                    }
                  `}
                >
                  {/* Orqa fondagi yil (shaffof) */}
                  <div
                    className={`text-5xl font-black absolute -top-10 ${
                      index % 2 === 0 ? 'left-4' : 'right-4'
                    } opacity-10 dark:opacity-20 italic dark:text-green-400`}
                  >
                    {item.year}
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                        index % 2 === 0
                          ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400'
                          : 'bg-green-500 text-white'
                      }`}
                    >
                      {index + 1}
                    </span>

                    <h3
                      className={`text-2xl font-extrabold tracking-tight ${
                        index % 2 === 0 ? 'text-green-900 dark:text-white' : 'text-white'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <p
                    className={`text-base leading-relaxed ${
                      index % 2 === 0 ? 'text-green-800 dark:text-slate-300' : 'text-green-500 dark:text-green-100'
                    }`}
                  >
                    {item.desc}
                  </p>

                  <div className="flex items-center gap-2 mt-6">
                    <div className="h-[2px] w-8 bg-green-500 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full opacity-50"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}