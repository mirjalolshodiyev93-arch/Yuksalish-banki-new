import { useState, useRef } from "react"; // useRef qo'shildi
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ariza from "../../assets/ariza.png";
import kridit from "../../assets/kredit.png";
const BOT_TOKEN = "8397312064:AAFoqmc2-7rbK7pSWIwZsLZWTEXcqp11Mgw";
const CHAT_ID = "8429418799";

export default function Kredit() {
  const { t } = useTranslation();

  const kalkulyatorRef = useRef(null); // Kalkulyator section uchun ref

  const kreditTurlari = [
    { id: 1, title: t("kredit.types.mortgage"), rate: "18%", max: t("kredit.max_values.1b"), term: t("kredit.terms.20y") },
    { id: 2, title: t("kredit.types.auto"), rate: "20%", max: t("kredit.max_values.500m"), term: t("kredit.terms.5y") },
    { id: 3, title: t("kredit.types.business"), rate: "22%", max: t("kredit.max_values.2b"), term: t("kredit.terms.10y") },
    { id: 4, title: t("kredit.types.consumer"), rate: "24%", max: t("kredit.max_values.200m"), term: t("kredit.terms.3y") },
  ];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [summa, setSumma] = useState(10000000);
  const [muddat, setMuddat] = useState(12);
  const [foiz, setFoiz] = useState(20);

  // 🔹 Modal logikasi
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitModal = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSuccess(false);
    }, 3000);
  };

  const capitalizeName = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const oylikTolov = () => {
    const r = foiz / 100 / 12;
    if (r === 0) return (summa / muddat).toLocaleString();
    const payment = ((summa * r) / (1 - Math.pow(1 + r, -muddat))).toFixed(0);
    return Number(payment).toLocaleString();
  };

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.startsWith("998")) val = val.slice(3);
    if (val.length > 9) val = val.slice(0, 9);

    let formatted = "+998";
    if (val.length > 0) formatted += " " + val.slice(0, 2);
    if (val.length >= 3) formatted += "-" + val.slice(2, 5);
    if (val.length >= 6) formatted += "-" + val.slice(5, 7);
    if (val.length >= 8) formatted += "-" + val.slice(7, 9);

    setPhone(formatted);
  };

  const sendToTelegram = async () => {
    const formattedName = capitalizeName(name.trim());
    const digits = phone.replace(/\D/g, "").slice(3);

    if (formattedName.length < 2 || digits.length !== 9 || !type) {
      toast.error("Barcha maydonni toldiring", { autoClose: 3000 });
      return;
    }

    const message = ` 📩 ${t("kredit.form_title")} 👤 ${t("kredit.placeholder_name")}: ${formattedName} 📞 ${t(
      "kredit.placeholder_phone"
    )}: ${phone} 💳 ${t("kredit.select_type")}: ${type} 💰 Summa: ${summa.toLocaleString()} UZS `;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
      });

      toast.success("✅ Ariza muvaffaqiyatli yuborildi!", { autoClose: 3000 });
      setName("");
      setPhone("");
      setType("");
    } catch (err) {
      console.error(err);
      toast.error(" Xabar yuborilmadi, iltimos qayta urinib ko‘ring!", { autoClose: 3000 });
    }
  };

  return (
    <div className="bg-white pt-24 text-gray-800">
      <ToastContainer position="top-right" />

      {/* HERO */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">{t("kredit.hero_title")}</h1>
          <p className="text-gray-600 mb-6 text-lg">{t("kredit.hero_subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 font-bold"
              onClick={() => setIsModalOpen(true)}
            >
              {t("kredit.btn_get")}
            </button>
            <button
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-bold"
              onClick={() => kalkulyatorRef.current?.scrollIntoView({ behavior: "smooth" })}
            >
              {t("kredit.btn_calc")}
            </button>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c"
          alt="kredit"
          className="rounded-3xl w-full h-[300px] md:h-[450px] object-cover shadow-lg"
        />
      </section>

      {/* MODAL OYNA */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-[90%] max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>

            {!isSuccess ? (
              <>
                <h2 className="text-xl font-bold mb-4">{t("kredit.form_title")}</h2>
                <p className="mb-6">Siz kredit olish bo‘yicha ariza qoldirishingiz mumkin.</p>
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                  onClick={handleSubmitModal}
                >
                  Ariza yuborish
                </button>
              </>
            ) : (
              <div className="bg-green-100 border border-green-400 p-6 rounded-xl text-center">
                <h3 className="text-green-800 font-bold text-lg mb-2">✅ Ariza muvaffaqiyatli yuborildi!</h3>
                <p className="text-green-700">Biz siz bilan tez orada bog‘lanamiz.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* KREDIT TURLARI */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{t("kredit.types_title")}</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {kreditTurlari.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 p-6 rounded-2xl hover:shadow-xl transition border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-4 text-blue-600">{item.title}</h3>
              <p className="text-gray-600">
                <strong>{t("kredit.rate_label")}:</strong> {item.rate}
              </p>
              <p className="text-gray-600">
                <strong>{t("kredit.max_label")}:</strong> {item.max}
              </p>
              <p className="text-gray-600">
                <strong>{t("kredit.term_label")}:</strong> {item.term}
              </p>
              <button className="mt-4 bg-white border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg w-full transition font-semibold">
                {t("kredit.btn_more")}
              </button>
            </div>
          ))}
        </div>
      </section>

    <div className="max-w-[1400px] mx-auto px-4 py-16 flex flex-col-reverse lg:flex-row items-center gap-12">

  {/* Kalkulyator */}
  <section
    ref={kalkulyatorRef}
    className="w-full lg:w-1/2"
  >
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-green-700">
      {t("kredit.calc_title")}
    </h2>

    <div className="bg-green-50 p-6 md:p-10 rounded-3xl space-y-6 shadow-xl border border-green-100">

      <div>
        <label className="block text-sm font-medium mb-2">
          {t("kredit.placeholder_sum")}
        </label>
        <input
          type="number"
          value={summa}
          onChange={(e) => setSumma(+e.target.value)}
          className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none bg-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("kredit.placeholder_term")}
          </label>
          <input
            type="number"
            value={muddat}
            onChange={(e) => setMuddat(+e.target.value)}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t("kredit.placeholder_percent")}
          </label>
          <input
            type="number"
            value={foiz}
            onChange={(e) => setFoiz(+e.target.value)}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none bg-white"
          />
        </div>
      </div>

      {/* Natija */}
      <div className="text-2xl md:text-3xl font-extrabold text-center text-green-700 bg-white p-5 rounded-2xl shadow-md">
        {t("kredit.monthly_payment")}:
        <span className="ml-2">
          {oylikTolov()} {t("kredit.currency")}
        </span>
      </div>

    </div>
  </section>

  {/* Rasm */}
  <div className="w-full lg:w-1/2 flex justify-center">
    <img
      src={kridit}
      alt="Kredit kalkulyator"
      className="w-full max-w-[450px] rounded-3xl shadow-2xl h-[600px]"
    />
  </div>

</div>

      {/* ARIZA QOLDIRISH */}
      <div className="max-w-[1400px] mx-auto px-4 py-12 flex flex-col lg:flex-row items-center gap-10">

        {/* Rasm */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={ariza}
            alt="Kredit ariza"
            className="w-full h-[600px] max-w-[500px] rounded-2xl shadow-xl"
          />
        </div>

        {/* Forma */}
        <section className="w-full lg:w-1/2">
          <div className="bg-white p-8 md:p-10 rounded-3xl space-y-6 shadow-2xl border border-gray-100">

            <h2 className="text-2xl font-bold text-center">
              {t("kredit.form_title")}
            </h2>

            <input
              type="text"
              placeholder={t("kredit.placeholder_name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition outline-none"
            />

            <input
              type="text"
              placeholder="+998 99-999-99-99"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full p-4 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition outline-none"
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-4 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition outline-none"
            >
              <option value="">{t("kredit.select_type")}</option>
              {kreditTurlari.map((item) => (
                <option key={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>

            <button
              onClick={sendToTelegram}
              className="bg-blue-600 text-white w-full py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-95 transition-all"
            >
              {t("kredit.btn_send")}
            </button>

          </div>
        </section>
      </div>
    </div>
  );
}