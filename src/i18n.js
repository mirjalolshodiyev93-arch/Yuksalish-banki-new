
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import uz from "./locales/uz.json";
import en from "./locales/en.json";
import ru from "./locales/ru.json";  // Rus tilini qo'shish uchun

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: uz },
      en: { translation: en },
      ru: { translation: ru },   // Rus tilining resurslarini qo'shish
    },
    lng: localStorage.getItem("lang") || "uz", // 
    fallbackLng: "uz",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
