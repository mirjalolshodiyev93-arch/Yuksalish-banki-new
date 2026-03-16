import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; 

export default function Contacts() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true); 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
  
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    alert("Xabaringiz muvaffaqiyatli yuborildi!");
    setFormData({ name: "", email: "", message: "" }); 
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          /* --- KONTAKT LOADER --- */
          <motion.div
            key="contact-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-green-50 dark:bg-slate-950"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-16 h-16 border-4 border-green-200 rounded-full border-t-green-600"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Mail className="w-6 h-6 text-green-600" />
              </motion.div>
            </div>
            <p className="mt-4 font-bold tracking-widest text-green-700 uppercase animate-pulse">
              {t("contacts.loading_text") || "Bog'lanish..."}
            </p>
          </motion.div>
        ) : (
          /* --- ASOSIY KONTENT --- */
          <motion.div 
            key="contact-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-[100px] sm:pt-[140px] bg-green-50 dark:bg-slate-950 min-h-screen py-12 px-4 sm:px-6 lg:px-16 transition-colors duration-500"
          >
            <div className="max-w-6xl mx-auto">
              
              <motion.div 
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-10 text-center sm:mb-16"
              >
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
                  {t("contacts.title")}
                </h1>
                <div className="w-20 h-1.5 bg-green-600 mx-auto mt-4 rounded-full"></div>
                <p className="max-w-2xl mx-auto mt-4 text-base text-gray-600 dark:text-slate-400 sm:text-lg">
                  {t("contacts.subtitle")}
                </p>
              </motion.div>

              <div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                
                {/* Kontakt Ma'lumotlari Kartasi - Chapdan chiqadi */}
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="p-6 space-y-8 transition-colors border border-green-100 shadow-sm dark:border-slate-800 bg-green-50 dark:bg-slate-900 sm:p-10 rounded-3xl"
                >
                  <ContactItem icon={<Phone />} title={t("contacts.phone")} detail="+998 71 123 45 67" />
                  <ContactItem icon={<Mail />} title={t("contacts.email")} detail="info@bank.uz" />
                  <ContactItem icon={<MapPin />} title={t("contacts.address")} detail={t("contacts.address_text")} />
                  <ContactItem icon={<Clock />} title={t("contacts.work_hours")} detail={t("contacts.work_hours_text")} />
                </motion.div>

                {/* Aloqa Formasi - O'ngdan chiqadi */}
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 transition-colors bg-white border shadow-2xl dark:bg-slate-900 border-green-50 dark:border-slate-800 dark:shadow-none sm:p-10 rounded-3xl"
                >
                  <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">{t("contacts.form_title")}</h2>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <FormInput label={t("contacts.name_label")} name="name" value={formData.name} onChange={handleChange} placeholder={t("contacts.name_placeholder")} />
                    <FormInput label={t("contacts.email_label")} name="email" value={formData.email} onChange={handleChange} placeholder={t("contacts.email_placeholder")} type="email" />
                    
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-slate-300">{t("contacts.message_label")}</label>
                      <textarea
                        rows="4"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t("contacts.message_placeholder")}
                        className="w-full p-3 transition-all border border-green-200 outline-none dark:border-slate-700 bg-green-50 dark:bg-slate-800 dark:text-white rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white dark:focus:bg-slate-900"
                      />
                    </div>

                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 w-full bg-green-600 dark:bg-green-700 text-white py-4 rounded-xl font-bold hover:bg-green-700 dark:hover:bg-green-600 active:scale-[0.98] transition-all shadow-lg shadow-green-200 dark:shadow-none group"
                    >
                      {t("contacts.send_btn")}
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </form>
                </motion.div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Yordamchi komponentlar (kod tozaligi uchun)
function ContactItem({ icon, title, detail }) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="p-3 transition-transform bg-green-100 group-hover:scale-110 dark:bg-slate-800 rounded-xl">
        {React.cloneElement(icon, { className: "w-6 h-6 text-green-600 dark:text-green-500" })}
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-slate-200">{title}</h3>
        <p className="mt-1 text-base text-gray-600 dark:text-slate-400">{detail}</p>
      </div>
    </div>
  );
}

function FormInput({ label, type = "text", ...props }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-slate-300">{label}</label>
      <input
        type={type}
        className="w-full p-3 transition-all border border-green-200 outline-none dark:border-slate-700 bg-green-50 dark:bg-slate-800 dark:text-white rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white dark:focus:bg-slate-900"
        {...props}
      />
    </div>
  );
}