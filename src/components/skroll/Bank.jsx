import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function BankTimeline() {
  const { t } = useTranslation();
 
  // 1-TUZATISH: cardData qatori agar kerak bo'lmasa olib tashlandi. 
  // Agar u cards.js dan kelsa, import qilishni unutmang.

  // 2-TUZATISH: returnObjects: true orqali massivni xavfsiz olish
  const timelineData = t("timeline.data", { returnObjects: true }) || [];

  useEffect(() => {
    // Agar ma'lumot hali yuklanmagan bo'lsa, observerni ishlatmaymiz
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
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-green-600 font-bold tracking-widest uppercase text-sm italic">
            {t("timeline.badge", "Tarixiy yo'l")}
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mt-2 mb-6 tracking-tight">
            {t("timeline.title_part1", "Muvaffaqiyat ")} 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
              {t("timeline.title_brand", "Banki")}
            </span> 
            {t("timeline.title_part2", " sari")}
          </h2>
          <div className="flex justify-center gap-1">
            <div className="w-12 h-1 bg-green-600 rounded-full"></div>
            <div className="w-4 h-1 bg-green-300 rounded-full"></div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-slate-200">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-600 via-emerald-400 to-green-800 animate-pulse origin-top"></div>
          </div>

          {Array.isArray(timelineData) && timelineData.map((item, index) => (
            <div key={index} className={`relative flex items-center justify-between mb-20 w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
              
              <div className="hidden md:block w-5/12"></div>

              <div className="z-20 absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div className="w-10 h-10 bg-white border-4 border-green-600 rounded-xl rotate-45 flex items-center justify-center shadow-lg">
                   <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
              </div>

              <div className={`w-full md:w-5/12 pl-12 md:pl-0 timeline-card opacity-0 transition-all duration-1000 ease-out ${index % 2 === 0 ? 'md:translate-x-10' : 'md:-translate-x-10'}`}>
                <div className={`
                  group relative p-8 rounded-[2rem] transition-all duration-500 hover:-translate-y-2
                  ${index % 2 === 0 ? 'bg-white shadow-xl hover:shadow-green-100' : 'bg-slate-900 text-white shadow-2xl'}
                `}>
                  
                  <div className={`text-5xl font-black absolute -top-10 ${index % 2 === 0 ? 'left-4' : 'right-4'} opacity-10 italic`}>
                    {item.year}
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${index % 2 === 0 ? 'bg-green-100 text-green-700' : 'bg-green-600 text-white'}`}>
                      {index + 1}
                    </span>
                    <h3 className={`text-2xl font-extrabold tracking-tight ${index % 2 === 0 ? 'text-slate-800' : 'text-white'}`}>
                      {item.title}
                    </h3>
                  </div>
                  
                  <p className={`text-base leading-relaxed ${index % 2 === 0 ? 'text-slate-600' : 'text-slate-300'}`}>
                    {item.desc}
                  </p>

                  <div className="mt-6 flex items-center gap-2">
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