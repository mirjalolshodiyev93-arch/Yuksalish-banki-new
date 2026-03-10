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
       link:"/card"
    },
    {
      icon: <Landmark size={28} />,
      title: t("services1.loans.title"),
      desc: t("services1.loans.desc"),
      active: true,
       link:"/kredit"
    },
    {
      icon: <PiggyBank size={28} />,
      title: t("services1.deposits.title"),
      desc: t("services1.deposits.desc"),
       link:"/omonat"
    },
    {
      icon: <RefreshCcw size={28} />,
      title: t("services1.currency.title"),
      desc: t("services1.currency.desc"),
      link:"/salom"
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <section className="bg-white py-16 sm:py-20 text-gray-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            {t("salom.home")}
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto mt-3 sm:mt-4 rounded-full"></div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((item, index) => (
            <div 
          onClick={() => item.link && navigate(item.link)}
              key={index}
              className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 transform hover:-translate-y-2 sm:hover:-translate-y-3 hover:shadow-lg sm:hover:shadow-xl ${
                item.active
                  ? "bg-blue-50 border-blue-500 shadow-md"
                  : "bg-white border-gray-200 hover:border-blue-400"
              }`}
            >
              <div
                onClick={() => navigate("/credits")}
                className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl mb-4 sm:mb-6 transition-all duration-300 ${
                  item.active
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-blue-500"
                }`}
              >
                {item.icon}
              </div>

              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-gray-900">
                {item.title}
              </h3>

              <p className="max-w-full break-words line-clamp-2 text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                {item.desc}
              </p>

              <button className="text-blue-600 font-medium flex items-center gap-1 sm:gap-2 hover:gap-3 transition-all text-sm sm:text-base">
                {t("buttons.moreDetails")}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}