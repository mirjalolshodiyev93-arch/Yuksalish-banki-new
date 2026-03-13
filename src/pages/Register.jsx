import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle"); 
  const [showPopup, setShowPopup] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const regions = [
    "Toshkent", "Samarqand", "Buxoro", "Andijon", "Namangan",
    "Farg'ona", "Qashqadaryo", "Surxondaryo", "Xorazm",
    "Navoiy", "Sirdaryo", "Jizzax", "Qoraqalpog'iston",
  ];

  const [form, setForm] = useState({
    fullName: "",
    region: "",
    city: "",
    email: "",
    phone: "+998 ",
    message: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const submitted = localStorage.getItem("form_submitted");
    if (submitted) {
      setIsLocked(true);
      setStatus("success");
    }
  }, []);

  const validateField = (name, value) => {
    let errorMsg = "";
    const cleanValue = typeof value === "string" ? value.trim() : value;

    switch (name) {
      case "fullName":
        if (!cleanValue) errorMsg = t("salom1.errors.fullNameWords");
        else if (cleanValue.split(/\s+/).length < 2) errorMsg = t("salom1.errors.fullNameFormat");
        break;
      case "email":
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!cleanValue) errorMsg = t("salom1.errors.email");
        else if (!emailRegex.test(cleanValue)) errorMsg = t("salom1.errors.email");
        break;
      case "phone":
        const phoneRegex = /^\+998 \d{2} \d{3}-\d{2}-\d{2}$/;
        if (!phoneRegex.test(cleanValue)) errorMsg = t("salom1.errors.phone");
        break;
      case "message":
        if (!cleanValue || cleanValue.length < 10) errorMsg = t("salom1.errors.message");
        break;
      case "region":
        if (!cleanValue) errorMsg = t("salom1.errors.region");
        break;
      case "city":
        if (!cleanValue) errorMsg = t("salom1.errors.city");
        break;
      case "agree":
        if (!value) errorMsg = t("salom1.errors.agree");
        break;
      default: break;
    }
    return errorMsg;
  };

  const handleChange = (e) => {
    if (isLocked) return;
    const { name, value, type, checked } = e.target;
    let fieldValue = type === "checkbox" ? checked : value;

    if (name === "phone") {
      const numbers = value.replace(/\D/g, "").slice(3);
      fieldValue = "+998 ";
      if (numbers.length > 0) fieldValue += numbers.substring(0, 2);
      if (numbers.length > 2) fieldValue += " " + numbers.substring(2, 5);
      if (numbers.length > 5) fieldValue += "-" + numbers.substring(5, 7);
      if (numbers.length > 7) fieldValue += "-" + numbers.substring(7, 9);
    }

    setForm({ ...form, [name]: fieldValue });
    setErrors({ ...errors, [name]: "" });
  };

  const selectRegion = (region) => {
    if (isLocked) return;
    setForm({ ...form, region });
    setErrors({ ...errors, region: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status !== "idle" || isLocked) return;

    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const err = validateField(key, form[key]);
      if (err) newErrors[key] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    const telegramText = `📌 Yangi Murojaat\n👤 ${form.fullName}\n📍 ${form.region}, ${form.city}\n📧 ${form.email}\n📞 ${form.phone}\n💬 ${form.message}`;

    const BOT_TOKEN = "8397312064:AAFoqmc2-7rbK7pSWIwZsLZWTEXcqp11Mgw";
    const CHAT_ID = "8429418799";

    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: telegramText }),
      });

      if (res.ok) {
        setStatus("success");
        setShowPopup(true);
        setIsLocked(true);
        localStorage.setItem("form_submitted", "true"); 
      } else {
        setStatus("error");
        setShowPopup(true);
      }
    } catch {
      setStatus("error");
      setShowPopup(true);
    } finally {
      setLoading(false);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  return (
    <div className="min-h-screen pt-[110px] flex items-center justify-center bg-gray-100 p-4 relative font-sans">
      {showPopup && (
        <div className="fixed top-10 right-10 z-[100] animate-bounce">
          <div className={`p-4 rounded-lg shadow-2xl text-white font-bold ${status === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {status === "success" ? t("salom1.alerts.success") : t("salom1.alerts.error")}
          </div>
        </div>
      )}

      <div className="w-full max-w-3xl bg-white p-6 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
          {isLocked ? t("salom1.alerts.success") : t("salom1.send")}
        </h2>

        {isLocked ? (
          <div className="text-center py-10">
            <div className="text-6xl mb-4 text-green-500">🎉</div>
            <p className="text-xl text-gray-600">{t("salom1.alerts.success")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">{t("salom1.fullName")}</label>
              <input name="fullName" placeholder={t("salom1.fullName")} value={form.fullName} onChange={handleChange} 
                className={`w-full border-2 p-3 rounded-2xl outline-none transition-all ${errors.fullName ? "border-red-400" : "border-gray-100 focus:border-green-500 bg-gray-50"}`}/>
              {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-2">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 ml-1">{t("salom1.region")}</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {regions.map((r) => (
                  <div key={r} onClick={() => selectRegion(r)}
                    className={`cursor-pointer py-2 px-3 text-center rounded-xl text-sm font-medium transition-all border-2 
                    ${form.region === r ? "bg-green-600 border-green-600 text-white shadow-lg scale-105" : "bg-white border-gray-100 text-gray-600 hover:border-green-200 hover:bg-green-50"}`}>
                    {r}
                  </div>
                ))}
              </div>
              {errors.region && <p className="text-red-500 text-xs mt-2 ml-2">{errors.region}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="city" placeholder={t("salom1.city")} value={form.city} onChange={handleChange} className="w-full border-2 p-3 rounded-2xl border-gray-100 bg-gray-50 focus:border-green-500 outline-none"/>
              <input name="email" placeholder={t("salom1.email")} value={form.email} onChange={handleChange} className="w-full border-2 p-3 rounded-2xl border-gray-100 bg-gray-50 focus:border-green-500 outline-none"/>
            </div>

            <input name="phone" value={form.phone} onChange={handleChange} className="w-full border-2 p-3 rounded-2xl border-gray-100 bg-gray-50 focus:border-green-500 outline-none font-mono text-lg"/>

            <textarea name="message" rows="3" placeholder={t("salom1.message")} value={form.message} onChange={handleChange} className="w-full border-2 p-3 rounded-2xl border-gray-100 bg-gray-50 focus:border-green-500 outline-none"/>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} className="w-5 h-5 accent-green-600"/>
              <span className="text-sm text-gray-500 group-hover:text-gray-700 transition">{t("salom1.agree")}</span>
            </label>

            <button disabled={loading} className={`w-full py-4 rounded-2xl font-bold text-white text-lg transition-all shadow-lg 
              ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700 hover:-translate-y-1 active:scale-95"}`}>
              {loading ? t("salom1.send") + "..." : t("salom1.send")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}