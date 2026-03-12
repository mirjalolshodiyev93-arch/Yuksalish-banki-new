import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Briefcase, Users, BarChart2, Shield, X, CheckCircle } from "lucide-react";

export default function CorporateServices() {
  const { t } = useTranslation(); // i18n translate
  const [modalData, setModalData] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const servicesKeys = ["corporate", "employees", "financial", "security"];
  const servicesIcons = [
    <Briefcase size={28} className="text-green-600" />,
    <Users size={28} className="text-green-600" />,
    <BarChart2 size={28} className="text-green-600" />,
    <Shield size={28} className="text-green-600" />
  ];

  const handleSubmit = () => {
    setModalData(null);
    setSuccessMessage(t("success", { service: modalData.key }));
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <section className="relative min-h-screen bg-green-50 pt-[150px] pb-32 px-6">
    
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h1 className="text-5xl font-extrabold text-green-800 mb-4">
          {t("hero1.title")}
        </h1>
        <p className="text-lg text-green-700 max-w-2xl mx-auto">
          {t("hero1.description")}
        </p>
      </div>

    
      {successMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-100 border border-green-300 text-green-800 rounded-2xl px-6 py-4 flex items-center gap-3 shadow-lg z-50 animate-slide-down">
          <CheckCircle size={24} />
          <span className="font-semibold">{successMessage}</span>
        </div>
      )}

  
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {servicesKeys.map((key, idx) => {
          const service = t(`services2.${key}`, { returnObjects: true });
          return (
            <div
              key={key}
              onClick={() => setModalData({ ...service, key })}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer hover:-translate-y-2"
            >
              <div className="w-14 h-14 mb-6 flex items-center justify-center bg-green-50 rounded-xl transition-all group-hover:bg-green-100">
                {servicesIcons[idx]}
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-800">{service.title}</h3>
              <p className="text-green-700 text-sm">{service.description}</p>
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity text-green-600 font-semibold">
                {t("buttons1.details")}
              </div>
            </div>
          );
        })}
      </div>

  
      {modalData && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-8 relative border border-green-100">
            <button
              onClick={() => setModalData(null)}
              className="absolute top-4 right-4 text-green-400 hover:text-green-700 transition"
            >
              <X size={24} />
            </button>
            <div className="flex items-center gap-4 mb-6">
              {modalData.icon || servicesIcons[servicesKeys.indexOf(modalData.key)]}
              <h2 className="text-2xl font-bold text-green-800">{modalData.title}</h2>
            </div>
            <p className="text-green-700 mb-6">{modalData.details}</p>
            <button
              className="w-full py-3 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition"
              onClick={handleSubmit}
            >
              {t("buttons1.request")}
            </button>
          </div>
        </div>
      )}


      <div className="max-w-5xl mx-auto mt-32 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">{t("footer1.title")}</h2>
        <p className="text-green-700 max-w-3xl mx-auto">{t("footer1.description")}</p>
      </div>
    </section>
  );
}