import { Link } from "react-router-dom";
import { useState, useEffect } from "react"; // useEffect qo'shildi
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";
import AOS from "aos"; // AOS import qilindi
import "aos/dist/aos.css"; // AOS stillari

// Ijtimoiy tarmoq logotiplari (O'zgarishsiz qoldi)
const InstagramLogo = () => (
  <div className="w-full h-full flex items-center justify-center rounded-lg bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)] shadow-inner">
    <div className="w-5 h-5 border-[2px] border-white rounded-[6px] flex items-center justify-center relative">
      <div className="w-2.5 h-2.5 border-[2px] border-white rounded-full"></div>
      <div className="absolute top-[1px] right-[1px] w-[3px] h-[3px] bg-white rounded-full"></div>
    </div>
  </div>
);

const TelegramLogo = () => (
  <div className="w-full h-full flex items-center justify-center rounded-lg bg-[#229ED9] shadow-inner">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
      <path d="M9.04 15.35l-.39 5.46c.56 0 .8-.24 1.09-.53l2.63-2.52 5.46 3.99c1 .55 1.71.26 1.96-.92l3.55-16.62.01-.01c.3-1.4-.51-1.95-1.48-1.6L1.37 9.7c-1.36.53-1.34 1.29-.23 1.63l5.62 1.75L19.9 5.9c.62-.41 1.18-.18.72.23" />
    </svg>
  </div>
);

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [card, setCard] = useState(null);

  // AOS-ni ishga tushirish
  useEffect(() => {
    AOS.init({
      duration: 1000, // animatsiya davomiyligi
      once: true,     // faqat bir marta animatsiya bo'lishi uchun
      easing: "ease-out-cubic",
    });
  }, []);

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setCard({ type: "success", text: t("footer.success") });
      setEmail("");
    } else {
      setCard({ type: "error", text: t("footer.error") });
    }
    setTimeout(() => setCard(null), 5000);
  };

  return (
    <footer className="w-full overflow-hidden text-white transition-colors duration-500 border-t bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-white/20 dark:border-slate-800">
      
      {/* Toast Notification */}
      {card && (
        <div className="fixed top-[100px] right-6 z-50 animate-[toastIn_.4s_ease]">
          <div className={`relative flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl backdrop-blur-md border overflow-hidden
            ${card.type === "success"
              ? "bg-green-500/20 text-green-900 border-green-400/40 dark:text-green-400 dark:border-green-500/50"
              : "bg-red-500/20 text-red-900 border-red-400/40 dark:text-red-400 dark:border-red-500/50"}`}>
            <div className="text-lg">{card.type === "success" ? "✔" : "❗"}</div>
            <div className="text-sm font-medium">{card.text}</div>
            <div className={`absolute bottom-0 left-0 h-[3px] animate-[progress_3s_linear] ${card.type === "success" ? "bg-green-400" : "bg-red-400"}`}></div>
          </div>
        </div>
      )}

      <div className="container px-6 py-12 mx-auto lg:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Kolonna 1: Logo va Haqida */}
          <div className="flex flex-col space-y-4" data-aos="fade-up" data-aos-delay="0">
            <Link to="/" className="inline-block w-[180px] transition-transform hover:scale-105">
              <img src={logo} alt="Logo" className="w-full h-auto dark:brightness-110" />
            </Link>
            <p className="text-sm italic leading-relaxed text-white/80 dark:text-slate-400">
              {t("footer.bank_desc")}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="transition-transform w-9 h-9 hover:scale-110"><InstagramLogo /></a>
              <a href="https://t.me" target="_blank" rel="noreferrer" className="transition-transform w-9 h-9 hover:scale-110"><TelegramLogo /></a>
              <a href="#" className="w-9 h-9 rounded-lg bg-[#1877F2] flex items-center justify-center hover:scale-110 transition-transform font-bold text-xl shadow-inner">f</a>
            </div>
          </div>

          {/* Kolonna 2: Xizmatlar */}
          <div data-aos="fade-up" data-aos-delay="100">
            <h3 className="inline-block pb-2 mb-6 text-lg font-bold border-b border-white/20 dark:border-slate-700">
              {t("footer.services")}
            </h3>
            <ul className="space-y-4 text-sm text-white/70 dark:text-slate-400">
              <li><Link to="/kredit" className="transition-colors hover:text-white dark:hover:text-green-400">{t("footer.credits")}</Link></li>
              <li><Link to="/omonat" className="transition-colors hover:text-white dark:hover:text-green-400">{t("footer.deposits")}</Link></li>
              <li><Link to="/card" className="transition-colors hover:text-white dark:hover:text-green-400">{t("footer.cards")}</Link></li>
              <li><Link to="/transfer" className="transition-colors hover:text-white dark:hover:text-green-400">{t("footer.transfers")}</Link></li>
            </ul>
          </div>

          {/* Kolonna 3: Yordam */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="inline-block pb-2 mb-6 text-lg font-bold border-b border-white/20 dark:border-slate-700">
              {t("footer.help")}
            </h3>
            <ul className="space-y-4 text-sm text-white/70 dark:text-slate-400">
              <li><Link to="/tariflar" className="transition-colors hover:text-white dark:hover:text-green-400">{t("footer.tariffs")}</Link></li>
              <li><Link to="/map" className="transition-colors hover:text-white dark:hover:text-green-400">{t("footer.branches")}</Link></li>
              <li><Link to="/faq" className="transition-colors hover:text-white dark:hover:text-green-400">{t("footer.faq")}</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-white dark:hover:text-green-400">{t("footer.contact")}</Link></li>
            </ul>
          </div>

          {/* Kolonna 4: Obuna */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h3 className="inline-block pb-2 mb-6 text-lg font-bold border-b border-white/20 dark:border-slate-700">
              {t("footer.news")}
            </h3>
            <p className="mb-4 text-sm italic text-white/80 dark:text-slate-400">
              {t("footer.news_desc")}
            </p>
            <div className="flex overflow-hidden transition-all border rounded-xl border-white/30 dark:border-slate-700 focus-within:border-white">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.email_placeholder")}
                className="w-full px-4 py-3 text-sm bg-white/10 dark:bg-slate-800 focus:outline-none"
              />
              <button 
                onClick={handleSubmit}
                className="px-5 transition-colors border-l bg-white/20 dark:bg-slate-700 hover:bg-white/30 border-white/20"
              >
                ➤
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="mt-16 pt-8 border-t border-white/20 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] sm:text-xs text-white/60 dark:text-slate-500 uppercase tracking-widest"
          data-aos="fade-zoom-in"
          data-aos-offset="0"
        >
          <p>{t("footer.copyright")}</p>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="transition-colors cursor-pointer hover:text-white dark:hover:text-green-400">{t("footer.privacy")}</span>
            <span className="transition-colors cursor-pointer hover:text-white dark:hover:text-green-400">{t("footer.offer")}</span>
            <span className="transition-colors cursor-pointer hover:text-white dark:hover:text-green-400">{t("footer.license")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}