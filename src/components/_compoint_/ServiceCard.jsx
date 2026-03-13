import { CreditCard, Landmark, PiggyBank, RefreshCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ServicesData() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const services = [
    {
      icon: <CreditCard size={28} />,
      title: t("services1.plasticCards.title"),
      desc: t("services1.plasticCards.desc"),
      link: "/card"
    },
    {
      icon: <Landmark size={28} />,
      title: t("services1.loans.title"),
      desc: t("services1.loans.desc"),
      link: "/kredit"
    },
    {
      icon: <PiggyBank size={28} />,
      title: t("services1.deposits.title"),
      desc: t("services1.deposits.desc"),
      link: "/omonat"
    },
    {
      icon: <RefreshCcw size={28} />,
      title: t("services1.currency.title"),
      desc: t("services1.currency.desc"),
      link: "/salom"
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-16 text-gray-800 transition-colors duration-500 bg-green-50/30 dark:bg-slate-950 sm:py-20 dark:text-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl dark:text-white">
            {t("salom.home")}
          </h2>
          <div className="w-16 h-1 mx-auto mt-3 bg-green-600 rounded-full sm:w-20 dark:bg-green-500 sm:mt-4"></div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-8">
          {services.map((item, index) => (
            <div 
              onClick={() => item.link && navigate(item.link)}
              key={index}
              className={`p-6 sm:p-8 rounded-3xl border cursor-pointer transition-all duration-300 transform hover:-translate-y-2 sm:hover:-translate-y-3 hover:shadow-2xl 
                ${
                item.active
                  ? "bg-white dark:bg-slate-900 border-green-500 shadow-lg ring-1 ring-green-500"
                  : "bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 hover:border-green-400 dark:hover:border-green-500 hover:shadow-green-500/10"
              }`}
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl mb-4 sm:mb-6 transition-all duration-300 ${
                  item.active
                    ? "bg-green-600 text-white"
                    : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                }`}
              >
                {item.icon}
              </div>

              <h3 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl sm:mb-4 dark:text-white">
                {item.title}
              </h3>

              <p className="max-w-full mb-4 text-sm leading-relaxed text-gray-600 break-words line-clamp-2 dark:text-gray-400 sm:mb-6 sm:text-base">
                {item.desc}
              </p>

              <button className="flex items-center gap-1 text-sm font-bold text-green-600 transition-all dark:text-green-400 sm:gap-2 hover:gap-4 sm:text-base group">
                {t("buttons.moreDetails")}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}