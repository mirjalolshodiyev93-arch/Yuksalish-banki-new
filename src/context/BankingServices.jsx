import React, { useState } from "react";
import { Smartphone, Laptop, X, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function BankingServices() {
  const { t } = useTranslation();
  const [modalData, setModalData] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const services = [
    {
      key: "internetBanking",
      title: t("services3.internetBanking.title"),
      description: t("services3.internetBanking.description"),
      details: t("services3.internetBanking.details"),
      icon: <Laptop size={32} className="text-green-600" />
    },
    {
      key: "mobileBanking",
      title: t("services3.mobileBanking.title"),
      description: t("services3.mobileBanking.description"),
      details: t("services3.mobileBanking.details"),
      icon: <Smartphone size={32} className="text-green-600" />
    }
  ];

  const handleSubmit = () => {
    setModalData(null);
    setSuccessMessage(t("success1", { service: modalData.title }));
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <section className="relative min-h-screen bg-green-50 pt-[150px] pb-32 px-6">
      {/* HERO */}
      <div className="max-w-5xl mx-auto text-center mb-20">
        <h1 className="text-5xl font-extrabold text-green-800 mb-4 animate-fade-in-down">
          {t("hero2.title")}
        </h1>
        <p className="text-lg text-green-700 max-w-3xl mx-auto animate-fade-in">
          {t("hero2.description")}
        </p>
      </div>

      {/* Success */}
      {successMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-100 border border-green-300 text-green-800 rounded-3xl px-6 py-4 flex items-center gap-3 shadow-xl z-50 animate-slide-down">
          <CheckCircle size={24} />
          <span className="font-semibold">{successMessage}</span>
        </div>
      )}

      {/* Services Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10">
        {services.map((s) => (
          <div
            key={s.key}
            onClick={() => setModalData(s)}
            className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer relative overflow-hidden transform hover:-translate-y-2 hover:scale-105"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-50 opacity-0 group-hover:opacity-30 rounded-3xl transition-opacity duration-500"></div>

            <div className="relative z-10 flex items-center justify-center w-16 h-16 mb-6 bg-green-50 rounded-xl shadow-inner group-hover:shadow-lg transition-all duration-500">
              {s.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-800 relative z-10">{s.title}</h3>
            <p className="text-green-700 text-sm relative z-10">{s.description}</p>
            <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity text-green-600 font-semibold relative z-10">
              {t("buttons2.details")}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative border border-green-100 animate-fade-in-up">
            <button
              onClick={() => setModalData(null)}
              className="absolute top-4 right-4 text-green-400 hover:text-green-700 transition"
            >
              <X size={24} />
            </button>
            <div className="flex items-center gap-4 mb-6">
              {modalData.icon}
              <h2 className="text-2xl font-bold text-green-800">{modalData.title}</h2>
            </div>
            <p className="text-green-700 mb-6">{modalData.details}</p>
            <button
              className="w-full py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-2xl hover:from-green-700 hover:to-green-600 transition-all shadow-lg transform hover:scale-105"
              onClick={handleSubmit}
            >
              {t("buttons2.request")}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="max-w-4xl mx-auto mt-32 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4 animate-fade-in-up">
          {t("footer2.title")}
        </h2>
        <p className="text-green-700 max-w-3xl mx-auto animate-fade-in">
          {t("footer2.description")}
        </p>
      </div>
    </section>
  );
}