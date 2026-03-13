import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";

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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      className="w-5 h-5"
    >
      <path d="M9.04 15.35l-.39 5.46c.56 0 .8-.24 1.09-.53l2.63-2.52 5.46 3.99c1 .55 1.71.26 1.96-.92l3.55-16.62.01-.01c.3-1.4-.51-1.95-1.48-1.6L1.37 9.7c-1.36.53-1.34 1.29-.23 1.63l5.62 1.75L19.9 5.9c.62-.41 1.18-.18.72.23" />
    </svg>
  </div>
);

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [card, setCard] = useState(null);

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
    <footer className="relative text-white transition-all">
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

      {/* Main Footer Container */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 max-w-[1400px] m-auto px-6 py-10 transition-colors duration-500 border-t dark:border-slate-800">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

          {/* Logo and Socials */}
          <div>
            <div className="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px] flex items-center justify-start mb-4">
              <img
                src={logo}
                alt="Yuksalish Bank Logo"
                className="object-contain w-full h-auto transition-transform duration-200 hover:scale-105 dark:brightness-110"
              />
            </div>
            <p className="mb-6 text-sm italic leading-relaxed opacity-80 dark:text-slate-400">
              {t("footer.bank_desc")}
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/_mirjalo0l_developer_/"
                target="_blank"
                rel="noreferrer"
                className="transition-transform cursor-pointer w-9 h-9 hover:scale-110 active:scale-95"
              >
                <InstagramLogo />
              </a>

              <a
                href="https://t.me/mirjalol_iq"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#229ED9] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform active:scale-95 shadow-inner"
              >
                <TelegramLogo />
              </a>

              <a
                href="FACEBOOK_LINK_SHU_YERGA"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#1877F2] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform active:scale-95 text-white shadow-inner"
              >
                <span className="mb-1 text-2xl font-bold leading-none">f</span>
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="inline-block pb-2 mb-5 font-bold border-b border-white/40 dark:border-slate-700">
              {t("footer.services")}
            </h3>
            <ul className="space-y-3 text-sm text-white/80 dark:text-slate-400">
              <li className="transition cursor-pointer hover:text-white dark:hover:text-green-400"><Link to="/kredit">{t("footer.credits")}</Link></li>
              <li className="transition cursor-pointer hover:text-white dark:hover:text-green-400"><Link to="/omonat">{t("footer.deposits")}</Link></li>
              <li className="transition cursor-pointer hover:text-white dark:hover:text-green-400"><Link to="/card">{t("footer.cards")}</Link></li>
              <li className="transition cursor-pointer hover:text-white dark:hover:text-green-400"><Link to="/transfer">{t("footer.transfers")}</Link></li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="inline-block pb-2 mb-5 font-bold border-b border-white/40 dark:border-slate-700">
              {t("footer.help")}
            </h3>
            <ul className="space-y-3 text-sm text-white/80 dark:text-slate-400">
              <li className="transition cursor-pointer hover:text-white dark:hover:text-green-400"><Link to="/tariflar">{t("footer.tariffs")}</Link></li>
              <li className="transition cursor-pointer hover:text-white dark:hover:text-green-400"><Link to="/map">{t("footer.branches")}</Link></li>
              <li className="transition cursor-pointer hover:text-white dark:hover:text-green-400"><Link to="/faq">{t("footer.faq")}</Link></li>
              <li className="transition cursor-pointer hover:text-white dark:hover:text-green-400"><Link to="/contact">{t("footer.contact")}</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="inline-block pb-2 mb-5 font-bold border-b border-white/40 dark:border-slate-700">
              {t("footer.news")}
            </h3>
            <p className="mb-4 text-sm italic leading-relaxed opacity-80 dark:text-slate-400">
              {t("footer.news_desc")}
            </p>
            <div className="flex group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.email_placeholder")}
                className="flex-1 px-4 py-2 text-sm text-white transition-all border bg-white/10 dark:bg-slate-800 border-white/30 dark:border-slate-700 rounded-l-xl focus:outline-none focus:border-white dark:focus:border-green-500"
              />
              <button 
                onClick={handleSubmit} 
                className="px-4 text-white transition-colors bg-white/20 dark:bg-slate-700 rounded-r-xl hover:bg-white/30 dark:hover:bg-slate-600"
              >
                ➤
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/30 dark:border-slate-800 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] sm:text-xs gap-4">
          <p className="opacity-70 dark:text-slate-500">{t("footer.copyright")}</p>
          <div className="flex gap-6 tracking-wider uppercase opacity-70 dark:text-slate-500">
            <span className="transition cursor-pointer hover:text-white dark:hover:text-green-400">{t("footer.privacy")}</span>
            <span className="transition cursor-pointer hover:text-white dark:hover:text-green-400">{t("footer.offer")}</span>
            <span className="transition cursor-pointer hover:text-white dark:hover:text-green-400">{t("footer.license")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}