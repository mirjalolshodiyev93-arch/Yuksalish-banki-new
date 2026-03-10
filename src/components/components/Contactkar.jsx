import React, { useState } from "react"; // 1. useState qo'shildi
import { useTranslation } from "react-i18next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contacts() {
  const { t } = useTranslation();

  // 2. State qo'shildi
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // 3. Inputlarni kuzatish funksiyasi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 4. Tekshiruv funksiyasi
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    alert("Xabaringiz muvaffaqiyatli yuborildi!");
    setFormData({ name: "", email: "", message: "" }); // Tozalash
  };

  return (
    <div className="pt-[100px] sm:pt-[140px] bg-green-50 min-h-screen py-12 px-4 sm:px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Title qismi */}
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            {t("contacts.title")}
          </h1>
          <div className="w-20 h-1.5 bg-green-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-600 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            {t("contacts.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* Contact Info */}
          <div className="bg-green-50 p-6 sm:p-10 rounded-3xl shadow-sm border border-green-100 space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Phone className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{t("contacts.phone")}</h3>
                <p className="text-gray-600 mt-1 text-base">+998 71 123 45 67</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Mail className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{t("contacts.email")}</h3>
                <p className="text-gray-600 mt-1 text-base">info@bank.uz</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <MapPin className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{t("contacts.address")}</h3>
                <p className="text-gray-600 mt-1 text-base">{t("contacts.address_text")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Clock className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{t("contacts.work_hours")}</h3>
                <p className="text-gray-600 mt-1 text-base">{t("contacts.work_hours_text")}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-green-50">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{t("contacts.form_title")}</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("contacts.name_label")}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("contacts.name_placeholder")}
                  className="w-full p-3 bg-green-50 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("contacts.email_label")}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("contacts.email_placeholder")}
                  className="w-full p-3 bg-green-50 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("contacts.message_label")}</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("contacts.message_placeholder")}
                  className="w-full p-3 bg-green-50 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 active:scale-[0.98] transition-all shadow-lg shadow-green-200"
              >
                {t("contacts.send_btn")}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}