import React, { useEffect } from 'react'; // useEffect qo'shildi
import { useTranslation } from "react-i18next";
import AOS from "aos"; // AOS import
import "aos/dist/aos.css"; // AOS stillari

import img10 from "../../assets/img10.png";
import img9 from "../../assets/rasm.jpg";

export default function YuksalishPage() {
  const { t } = useTranslation();

  useEffect(() => {
    // AOSni ishga tushirish
    AOS.init({
      duration: 1000, // Animatsiya davomiyligi (ms)
      once: true,     // Faqat bir marta ishlashi uchun
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 font-sans transition-colors duration-500 bg-white dark:bg-slate-950 md:p-8 lg:p-12 overflow-hidden">
      <div className="flex flex-col w-full gap-6 max-w-7xl lg:flex-row md:gap-8">
        
        {/* Chap taraf - Instagram Promo (Chapdan chiqib keladi) */}
        <div 
          data-aos="fade-right" 
          className="flex flex-col items-center bg-[#f8fafc] dark:bg-slate-900 p-6 md:p-8 rounded-[35px] w-full lg:w-[360px] text-center shadow-sm border border-gray-100 dark:border-slate-800 transition-colors"
        >
          <div className="relative mb-8 transition-transform duration-500 transform hover:-translate-y-2">
            <div className="w-[170px] md:w-[190px] h-[340px] md:h-[380px] bg-white dark:bg-slate-800 rounded-[35px] border-6 border-[#1e293b] dark:border-slate-700 shadow-2xl overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src={img9}
                alt="Instagram preview"
              />
            </div>
          </div>

          <h3 className="mb-6 text-lg font-bold leading-snug text-gray-800 md:text-xl dark:text-white md:mb-8">
            {t("promo.instagram_title")}
          </h3>

          <a
            href="https://www.instagram.com/_mirjalo0l_developer_/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-85"
          >
            <button className="bg-[#008141] dark:bg-green-600 hover:bg-[#006b35] dark:hover:bg-green-500 text-white font-bold py-3 px-8 md:py-3.5 md:px-10 rounded-xl transition-all shadow-lg active:scale-95">
              {t("promo.subscribe")}
            </button>
          </a>
        </div>

        {/* O'ng taraf - App Download Promo (O'ngdan chiqib keladi) */}
        <div 
          data-aos="fade-left"
          data-aos-delay="200" // Biroz kechikish bilan chiqadi
          className="flex flex-col lg:flex-row items-center justify-between bg-[#f8fafc] dark:bg-slate-900 p-6 md:p-10 rounded-[35px] flex-1 shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors"
        >
          
          <div className="relative w-full lg:w-1/2 h-[250px] md:h-[350px] lg:h-[420px] flex items-center justify-center mb-8 lg:mb-0">
            <img
              className="object-contain w-full h-full drop-shadow-2xl"
              src={img10}
              alt="Yuksalish app"
            />
          </div>

          <div className="flex flex-col items-center w-full text-center lg:w-1/2 lg:items-start lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#008141] dark:text-green-500 mb-3">
              {t("promo.bank_name")}
            </h2>

            <p className="mb-8 text-lg font-medium text-gray-500 md:text-xl dark:text-slate-400 md:mb-10">
              {t("promo.app_download")}
            </p>

            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <a
                href="https://play.google.com/store/apps/details?id=com.hamkorbank.mobile"
                className="hover:opacity-85 transition-opacity dark:bg-white dark:rounded-lg dark:p-0.5"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="App Store"
                  className="w-auto h-10 md:h-12"
                />
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.hamkorbank.mobile"
                className="hover:opacity-85 transition-opacity dark:bg-white dark:rounded-lg dark:p-0.5"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="w-auto h-10 md:h-12"
                />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}