import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer() {

  const [email, setEmail] = useState("");
  const [card, setCard] = useState(null);

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      setCard({ type: "success", text: "Email muvaffaqiyatli yuborildi!" });
      setEmail("");
    } else {
      setCard({ type: "error", text: "Email noto‘g‘ri kiritildi!" });
    }

   setTimeout(() => {
  setCard(null);
}, 5000); // 5 soniya
  };

  return (
    <footer className="text-gray-200 relative">

      {/* CARD */}
      {card && (
        <div className="fixed top-[100px] right-6 z-50 animate-[toastIn_.4s_ease]">
          
          <div
            className={`relative flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl backdrop-blur-md border overflow-hidden
            ${
              card.type === "success"
                ? "bg-green-500/20 text-green-900 border-green-400/40"
                : "bg-red-500/20 text-red-900 border-red-400/40"
            }`}
          >

            {/* ICON */}
            <div className="text-lg">
              {card.type === "success" ? "✔" : "❗"}
            </div>

            {/* TEXT */}
            <div className="text-sm font-medium">
              {card.text}
            </div>

            {/* PROGRESS BAR */}
            <div
              className={`absolute bottom-0 left-0 h-[3px] animate-[progress_3s_linear]
              ${card.type === "success" ? "bg-green-400" : "bg-red-400"}`}
            ></div>

          </div>

        </div>
      )}

      {/* Asosiy fonni to'q yashil qildim (#004d40 - banklar uchun xos rang) */}
      <div className="bg-[#013220] max-w-[1400px] m-auto mx-auto px-6 py-10">
        
        {/* Yuqori qism */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Chap taraf: Logo va ma'lumot */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center font-bold text-white">
                Y
              </div>
              <h2 className="font-semibold text-lg text-white tracking-wide">
                YUKSALISH BANK
              </h2>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              Sizning moliyaviy o'sishingiz va farovonligingiz uchun 
              zamonaviy va ishonchli bank xizmatlari.
            </p>

            {/* Ijtimoiy tarmoqlar */}
            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-full bg-green-800/50 flex items-center justify-center cursor-pointer hover:bg-green-600 transition text-white">
                🌐
              </div>
              <div className="w-9 h-9 rounded-full bg-green-800/50 flex items-center justify-center cursor-pointer hover:bg-green-600 transition text-white">
                🔗
              </div>
              <div className="w-9 h-9 rounded-full bg-green-800/50 flex items-center justify-center cursor-pointer hover:bg-green-600 transition text-white">
                💬
              </div>
            </div>
          </div>

          {/* Xizmatlar */}
          <div>
            <h3 className="text-white font-semibold mb-5">XIZMATLAR</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-green-400 cursor-pointer">
                <Link to="/kredit">Kreditlar</Link>
              </li>
              <li className="hover:text-green-400 cursor-pointer">
                <Link to="/omonat">Omonatlar</Link>
              </li>
              <li className="hover:text-green-400 cursor-pointer">
                <Link to="/card">Bank kartalari</Link>
              </li>
              <li className="hover:text-green-400 cursor-pointer">
                <Link to="/transfer">Pul o'tkazmalari</Link>
              </li>
            </ul>
          </div>

          {/* Qo'llab-quvvatlash */}
          <div>
            <h3 className="text-white font-semibold mb-5">YORDAM</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-green-400 cursor-pointer">
                <Link to="/tariflar">Tariflar</Link>
              </li>
              <li className="hover:text-green-400 cursor-pointer">
                <Link to="/map">Filiallar va bankomatlar</Link>
              </li>
              <li className="hover:text-green-400 cursor-pointer">
                <Link to="/savol-v-javoblar">Savol va javoblar</Link>
              </li>
              <li className="hover:text-green-400 cursor-pointer">Bog'lanish</li>
            </ul>
          </div>

          {/* Yangiliklar */}
          <div>
            <h3 className="text-white font-semibold mb-5">YANGILIKLAR</h3>
            <p className="text-sm text-gray-400 mb-4">
              Bank yangiliklari va aksiyalaridan xabardor bo'ling.
            </p>

            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email manzilingiz"
                className="flex-1 px-4 py-2 text-sm bg-white/10 border border-green-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-green-500 text-white placeholder:text-gray-500"
              />
              <button
                onClick={handleSubmit}
                className="bg-green-500 px-4 rounded-r-md hover:bg-green-600 transition text-white"
              >
                ➤
              </button>
            </div>
          </div>
        </div>

        {/* Chiziq va pastki qism */}
        <div className="border-t border-green-900 mt-14 pt-6 flex flex-col md:flex-row justify-between text-xs text-gray-500">
          <p>© 2026 "Yuksalish Bank" ATB. Barcha huquqlar himoyalangan.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Maxfiylik siyosati</span>
            <span className="hover:text-white cursor-pointer">Ommaviy oferta</span>
            <span className="hover:text-white cursor-pointer">Litsenziya</span>
          </div>
        </div>
      </div>
    </footer>
  );
}