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

    <section className="bg-green-50/30 py-16 sm:py-20 text-gray-800 transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

       
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            {t("salom.home")}
          </h2>
         
          <div className="w-16 sm:w-20 h-1 bg-green-600 mx-auto mt-3 sm:mt-4 rounded-full"></div>
        </div>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((item, index) => (
            <div 
              onClick={() => item.link && navigate(item.link)}
              key={index}
              className={`p-6 sm:p-8 rounded-3xl border cursor-pointer transition-all duration-300 transform hover:-translate-y-2 sm:hover:-translate-y-3 hover:shadow-2xl ${
                item.active
                  ? "bg-white border-green-500 shadow-lg ring-1 ring-green-500"
                  : "bg-white border-gray-100 hover:border-green-400"
              }`}
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl mb-4 sm:mb-6 transition-all duration-300 ${
                  item.active
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {item.icon}
              </div>

              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-gray-900">
                {item.title}
              </h3>

              <p className="max-w-full break-words line-clamp-2 text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                {item.desc}
              </p>

              <button className="text-green-600 font-bold flex items-center gap-1 sm:gap-2 hover:gap-4 transition-all text-sm sm:text-base">
                {t("buttons.moreDetails")}
                <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}