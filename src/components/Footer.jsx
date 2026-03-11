import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";
import telegram from "../assets/telegram.png"; // Rasmni import qilish

// Instagram logotipini chizuvchi kichik komponent (CSS usulida qoldi)
const InstagramLogo = () => (
  <div className="w-full h-full flex items-center justify-center rounded-lg bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)] shadow-inner">
    <div className="w-5 h-5 border-[2px] border-white rounded-[6px] flex items-center justify-center relative">
      <div className="w-2.5 h-2.5 border-[2px] border-white rounded-full"></div>
      <div className="absolute top-[1px] right-[1px] w-[3px] h-[3px] bg-white rounded-full"></div>
    </div>
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
    <footer className="text-white relative transition-all">
      {/* TOAST CARD */}
      {card && (
        <div className="fixed top-[100px] right-6 z-50 animate-[toastIn_.4s_ease]">
          <div className={`relative flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl backdrop-blur-md border overflow-hidden
        ${card.type === "success"
              ? "bg-green-500/20 text-green-900 border-green-400/40 dark:text-green-400"
              : "bg-red-500/20 text-red-900 border-red-400/40 dark:text-red-400"}`}>
            <div className="text-lg">{card.type === "success" ? "✔" : "❗"}</div>
            <div className="text-sm font-medium">{card.text}</div>
            <div className={`absolute bottom-0 left-0 h-[3px] animate-[progress_3s_linear] ${card.type === "success" ? "bg-green-400" : "bg-red-400"}`}></div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 max-w-[1400px] m-auto px-6 py-10 transition-colors duration-500">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo & Socials */}
          <div>
            <div className="w-[300px] sm:w-[200px] mb-4 flex items-center justify-start">
              <img
                src={logo}
                alt="Logo"
                className="h-10 sm:h-12 w-full object-cover transition-transform duration-200 hover:scale-105"
              />
            </div>
            <p className="text-sm leading-relaxed mb-6 italic opacity-80">
              {t("footer.bank_desc")}
            </p>

            {/* Socials */}
            <div className="flex gap-4 items-center">
              <a
                href="https://www.instagram.com/_mirjalo0l_developer_/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 cursor-pointer hover:scale-110 transition-transform active:scale-95"
              >
                <InstagramLogo />
              </a>

              <a
                href="https://t.me/mirjalol_iq"
                target="_blank"
                rel="noreferrer"
                className="w-[60px] h-[60px] cursor-pointer hover:scale-110 transition-transform active:scale-95 overflow-hidden rounded-lg"
              >
                <img src={telegram} alt="Telegram" className="w-full h-full object-cover" />
              </a>

              <div className="w-9 h-9 rounded-lg bg-[#1877F2] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform active:scale-95 text-white shadow-inner">
                <span className="text-xl font-bold leading-none mb-1">f</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-5 border-b border-white/40 pb-2 inline-block">
              {t("footer.services")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white transition cursor-pointer"><Link to="/kredit">{t("footer.credits")}</Link></li>
              <li className="hover:text-white transition cursor-pointer"><Link to="/omonat">{t("footer.deposits")}</Link></li>
              <li className="hover:text-white transition cursor-pointer"><Link to="/card">{t("footer.cards")}</Link></li>
              <li className="hover:text-white transition cursor-pointer"><Link to="/transfer">{t("footer.transfers")}</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-bold mb-5 border-b border-white/40 pb-2 inline-block">
              {t("footer.help")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white transition cursor-pointer"><Link to="/tariflar">{t("footer.tariffs")}</Link></li>
              <li className="hover:text-white transition cursor-pointer"><Link to="/map">{t("footer.branches")}</Link></li>
              <li className="hover:text-white transition cursor-pointer"><Link to="/faq">{t("footer.faq")}</Link></li>
              <li className="hover:text-white transition cursor-pointer"><Link to="/contact">{t("footer.contact")}</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold mb-5 border-b border-white/40 pb-2 inline-block">
              {t("footer.news")}
            </h3>
            <p className="text-sm mb-4 italic leading-relaxed">
              {t("footer.news_desc")}
            </p>
            <div className="flex group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.email_placeholder")}
                className="flex-1 px-4 py-2 text-sm bg-white/10 border border-white/30 rounded-l-xl focus:outline-none focus:border-white text-white transition-all"
              />
              <button onClick={handleSubmit} className="bg-white/20 px-4 rounded-r-xl hover:bg-white/30 transition-colors text-white">
                ➤
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/30 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] sm:text-xs gap-4">
          <p className="opacity-70">{t("footer.copyright")}</p>
          <div className="flex gap-6 uppercase tracking-wider">
            <span className="hover:text-white cursor-pointer transition">{t("footer.privacy")}</span>
            <span className="hover:text-white cursor-pointer transition">{t("footer.offer")}</span>
            <span className="hover:text-white cursor-pointer transition">{t("footer.license")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}