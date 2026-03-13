import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { UploadCloud } from "lucide-react";

export function Testimonials() {
  const { t, i18n } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    try {
      const data = t("uz1", { returnObjects: true });
      if (Array.isArray(data)) setTestimonials(data);
      else setTestimonials([]);
    } catch {
      setTestimonials([]);
    }
  }, [t, i18n.language]);

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
    <section className="bg-gray-50 dark:bg-slate-950 max-w-[1400px] mx-auto py-24 px-4 sm:px-10 lg:px-20 transition-colors duration-500">
      <motion.div {...fadeIn} className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-5xl dark:text-white">
          {t("uz.title")}
        </h2>
        <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-400">
          {t("uz.desc")}
        </p>

        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="text-xl text-yellow-400">
            {"★".repeat(Math.round(averageRating))}
            {"☆".repeat(5 - Math.round(averageRating))}
          </div>
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {roundedRating} / 5
          </span>
          <span className="text-gray-500 dark:text-gray-500">
            ({testimonials.length} {t("uz.stats")})
          </span>
        </div>
      </motion.div>

      <motion.form
        {...fadeIn}
        onSubmit={handleSubmit}
        className="flex flex-col max-w-2xl gap-4 mx-auto mb-12"
      >
        <input
          type="text"
          placeholder={t("uz.form.name")}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-4 bg-white border outline-none rounded-xl dark:border-slate-800 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-green-500"
          disabled={submitted}
        />
        <input
          type="text"
          placeholder={t("uz.form.role")}
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="p-4 bg-white border outline-none rounded-xl dark:border-slate-800 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-green-500"
          disabled={submitted}
        />
        <textarea
          placeholder={t("uz.form.msg")}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="p-4 bg-white border outline-none rounded-xl dark:border-slate-800 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-green-500"
          rows={4}
          disabled={submitted}
        />

        <div className="flex justify-center gap-2 text-2xl cursor-pointer">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => !submitted && setForm({ ...form, rating: star })}
              className={star <= form.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-700"}
            >
              ★
            </span>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <label
            htmlFor="file-upload"
            className={`flex flex-col items-center justify-center w-full max-w-xs p-6 rounded-2xl
                        border-2 border-dashed border-green-400 dark:border-green-800 bg-white dark:bg-slate-900 hover:bg-green-50 dark:hover:bg-slate-800 transition-all
                        cursor-pointer text-green-700 dark:text-green-400 ${
                          submitted ? "opacity-50 cursor-not-allowed" : ""
                        }`}
          >
            <UploadCloud size={36} className="mb-2 text-green-600 dark:text-green-500" />
            <span className="text-sm font-semibold">
              {form.imgFile ? form.imgFile.name : t("uz.form.upload")}
            </span>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={submitted}
            />
          </label>

          {form.imgPreview && (
            <img
              src={form.imgPreview}
              alt="Preview"
              className="object-cover w-32 h-32 mt-4 border-2 border-green-500 shadow-md rounded-xl"
            />
          )}
        </div>

        <button
          className={`bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition-colors ${
            submitted ? "opacity-50 cursor-not-allowed" : "hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-600"
          }`}
          disabled={submitted}
        >
          {t("uz.form.submit")}
        </button>

        {submitted && (
          <p className="mt-2 font-medium text-center text-green-600 dark:text-green-400">
            {t("uz.form.success")}
          </p>
        )}
      </motion.form>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            {...fadeIn}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center p-6 text-center bg-white border border-transparent shadow-lg dark:bg-slate-900 rounded-2xl dark:shadow-none dark:border-slate-800"
          >
            <div className="w-20 h-20 mb-4 overflow-hidden border-2 border-green-500 rounded-full">
              <img src={item.img} alt={item.name} className="object-cover w-full h-full" />
            </div>

            <div className="mb-2 text-lg text-yellow-400">
              {"★".repeat(item.rating || 0)}
              {"☆".repeat(5 - (item.rating || 0))}
            </div>

            <p className="mb-4 italic leading-relaxed text-gray-700 dark:text-gray-300">
              “{item.message}”
            </p>

            <h4 className="text-lg font-bold dark:text-white">{item.name}</h4>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              {item.role}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}