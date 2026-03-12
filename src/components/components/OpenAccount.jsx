import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CreditCard, Landmark, PiggyBank, Smartphone, ArrowLeft } from "lucide-react";

export default function OpenAccount() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const cards = [
    {
      icon: <Landmark size={40} className="text-green-600" />,
      title: t("details.banking_title"),
      desc: t("details.banking_desc"),
    },
    {
      icon: <CreditCard size={40} className="text-green-600" />,
      title: t("details.credit_title"),
      desc: t("details.credit_desc"),
    },
    {
      icon: <PiggyBank size={40} className="text-green-600" />,
      title: t("details.deposit_title"),
      desc: t("details.deposit_desc"),
    },
    {
      icon: <Smartphone size={40} className="text-green-600" />,
      title: t("details.app_title"),
      desc: t("details.app_desc"),
    },
  ];

  return (
  
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-[150px] pb-16 px-6">
      
      <div className="max-w-6xl mx-auto">

  
        <button
          onClick={() => navigate(-1)}
          className="group mb-8 flex items-center gap-2 px-4 py-2 text-green-700 font-medium hover:text-green-800 transition-all"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          {t("details.back")}
        </button>

       
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-green-900/5 p-8 md:p-12 mb-12 text-center border border-green-50">
          <h1 className="text-3xl md:text-5xl font-black text-green-600 mb-6 leading-tight">
            {t("details.title")}
          </h1>

          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-gray-600 text-lg leading-relaxed">
              {t("details.p1")}
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t("details.p2")}
            </p>
            <div className="h-px w-24 bg-green-200 mx-auto my-6"></div>
            <p className="text-green-700 font-medium">
              {t("details.p3")}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500 hover:-translate-y-3"
            >
              <div className="mb-6 inline-block p-4 bg-green-50 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                {card.icon}
              </div>

              <h3 className="font-bold text-xl mb-3 text-gray-900">
                {card.title}
              </h3>

              <p className="text-gray-500 leading-relaxed text-sm italic">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}