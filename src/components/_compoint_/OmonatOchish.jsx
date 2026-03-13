import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function OpenDeposit() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("+998 ");
  const [fullname, setFullname] = useState("");
  const [amount, setAmount] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [locked, setLocked] = useState(false);

  const selectedDeposit =
    location.state?.depositName || t("deposit.notSelected");

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.startsWith("998")) value = value.slice(3);
    value = value.slice(0, 9);

    let formatted = "+998 ";

    if (value.length > 0) formatted += value.slice(0, 2);
    if (value.length >= 3) formatted += "-" + value.slice(2, 5);
    if (value.length >= 6) formatted += "-" + value.slice(5, 7);
    if (value.length >= 8) formatted += "-" + value.slice(7, 9);

    setPhone(formatted);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullname || phone.length < 17 || !amount) {
      setError("Iltimos barcha maydonlarni to'ldiring!");
r
      setTimeout(() => setError(""), 3000);
      return;
    }

    setError("");
    setSuccess(true);
    setLocked(true);

   
    setTimeout(() => {
      setSuccess(false);
      navigate("/omonat/deposits");
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-[120px] pb-20 px-4 bg-gray-50">
      <div className="max-w-[600px] mx-auto bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center mb-6 text-green-600 hover:underline"
        >
          ← {t("deposit.back")}
        </button>

        <h2 className="mb-2 text-3xl font-bold text-gray-800">
          {t("deposit.title")}
        </h2>

        <p className="mb-8 text-gray-500">
          {t("deposit.selected")}{" "}
          <span className="font-bold text-green-600">{selectedDeposit}</span>
        </p>

        
        {error && (
          <div className="p-4 mb-6 text-red-800 bg-red-100 border border-red-300 rounded-xl">
             {error}
          </div>
        )}

    {success && (
  <div className="fixed z-50 px-6 py-4 text-green-800 bg-green-100 border border-green-300 shadow-lg top-[130px] right-6 rounded-xl">
    ✅ {t("deposit.success")}
  </div>
)}

        <form onSubmit={handleSubmit} className={`space-y-5 ${locked ? "opacity-60 pointer-events-none" : ""}`}>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              {t("deposit.fullname")}
            </label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              disabled={locked}
              className="w-full px-4 py-3 transition border border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-green-500"
              placeholder={t("deposit.fullnamePlaceholder")}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              {t("deposit.phone")}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              disabled={locked}
              className="w-full px-4 py-3 transition border border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              {t("deposit.amount")}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={locked}
              className="w-full px-4 py-3 transition border border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-green-500"
              placeholder="1 000 000"
            />
          </div>

          <div className="p-4 text-sm text-blue-700 bg-blue-50 rounded-xl">
            {t("deposit.info")}
          </div>

          <button
            type="submit"
            disabled={locked}
            className="w-full py-4 text-lg font-bold text-white transition bg-green-600 shadow-lg rounded-xl hover:bg-green-700 shadow-green-200"
          >
            {t("deposit.submit")}
          </button>

        </form>
      </div>
    </div>
  );
}