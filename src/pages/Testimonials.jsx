import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function Testimonials() {
  const { t, i18n } = useTranslation(); // ✅ i18n qo'shildi

  // ✅ testimonials state
  const [testimonials, setTestimonials] = useState([]);

  // ✅ i18n arrayini olish
  useEffect(() => {
    const data = t("uz1", { returnObjects: true });
    if (Array.isArray(data)) {
      setTestimonials(data);
    }
  }, [t, i18n.language]); // til o'zgarganda array yangilanadi

  const [form, setForm] = useState({
    name: "",
    role: "",
    message: "",
    rating: 5,
    imgFile: null,
    imgPreview: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const averageRating =
    testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) /
    (testimonials.length || 1);
  const roundedRating = averageRating.toFixed(1);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        imgFile: file,
        imgPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.message) return;

    const newTestimonial = {
      name: form.name,
      role: form.role,
      rating: form.rating,
      message: form.message,
      img: form.imgPreview || `https://i.pravatar.cc/100?u=${form.name}`,
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setSubmitted(true);
  };

  return (
    <section className="bg-gray-50 py-24 px-4 sm:px-10 lg:px-20">
      <motion.div {...fadeIn} className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("uz.title")}</h2>
        <p className="text-gray-600 max-w-xl mx-auto">{t("uz.desc")}</p>

        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="text-yellow-400 text-xl">
            {"★".repeat(Math.round(averageRating))}
            {"☆".repeat(5 - Math.round(averageRating))}
          </div>
          <span className="text-lg font-semibold text-gray-800">
            {roundedRating} / 5
          </span>
          <span className="text-gray-500">
            ({testimonials.length} {t("uz.stats")})
          </span>
        </div>
      </motion.div>

      <motion.form
        {...fadeIn}
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto mb-12 flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder={t("uz.form.name")}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-4 rounded-xl border"
          disabled={submitted}
        />
        <input
          type="text"
          placeholder={t("uz.form.role")}
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="p-4 rounded-xl border"
          disabled={submitted}
        />
        <textarea
          placeholder={t("uz.form.msg")}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="p-4 rounded-xl border"
          rows={4}
          disabled={submitted}
        />

        <div className="flex justify-center gap-2 text-2xl cursor-pointer">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => !submitted && setForm({ ...form, rating: star })}
              className={star <= form.rating ? "text-yellow-400" : "text-gray-300"}
            >
              ★
            </span>
          ))}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="p-2 rounded-xl border"
          disabled={submitted}
        />

        <button
          className={`bg-blue-600 text-white px-6 py-3 rounded-xl ${
            submitted ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={submitted}
        >
          {t("uz.form.submit")}
        </button>

        {submitted && (
          <p className="text-green-600 mt-2 text-center">{t("uz.form.success")}</p>
        )}
      </motion.form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            {...fadeIn}
            transition={{ delay: index * 0.1 }}
            className="bg-white flex flex-col items-center p-6 rounded-2xl shadow-lg text-center"
          >
            <div className="w-20 h-20 mb-4 rounded-full overflow-hidden">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            </div>

            <div className="text-yellow-400 text-lg mb-2">
              {"★".repeat(item.rating || 0)}
              {"☆".repeat(5 - (item.rating || 0))}
            </div>

            <p className="text-gray-700 mb-4 italic">“{item.message}”</p>

            <h4 className="font-bold text-lg">{item.name}</h4>
            <span className="text-blue-600 text-sm">{item.role}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}