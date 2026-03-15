import React, { useState } from "react";
import { Send, MessageSquare, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Srm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError(true);
      setStatus("Iltimos, so'rov mazmunini kiriting!");
      return;
    }
    
    // Yuborish simulyatsiyasi
    setError(false);
    setStatus("So'rovingiz muvaffaqiyatli yuborildi ✅");
    setMessage("");

    // 3 soniyadan keyin statusni o'chirish
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center p-6 transition-colors duration-500 bg-white dark:bg-gray-950">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl p-8 bg-white border border-gray-100 shadow-2xl dark:bg-gray-900 rounded-[2.5rem] dark:border-emerald-900/20"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400">
            <MessageSquare size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 dark:text-white">
              So'rov yuborish
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Mutaxassislarimiz tez orada siz bilan bog'lanishadi
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <textarea
              rows={5}
              className={`w-full p-5 text-lg transition-all border-2 rounded-[1.5rem] outline-none bg-slate-50 dark:bg-slate-800/50 dark:text-white placeholder-slate-400 
                ${error 
                  ? "border-rose-400 focus:border-rose-500" 
                  : "border-transparent focus:border-emerald-500 dark:focus:border-emerald-600"
                }`}
              placeholder="Xabaringizni shu yerda batafsil yozing..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (error) setError(false);
              }}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="flex items-center justify-center w-full gap-3 py-4 text-lg font-bold text-white transition-all shadow-lg bg-emerald-600 rounded-2xl hover:bg-emerald-700 shadow-emerald-200 dark:shadow-none"
          >
            <Send size={20} />
            Yuborish
          </motion.button>
        </form>

        <AnimatePresence>
          {status && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`mt-6 p-4 rounded-xl flex items-center gap-3 font-medium 
                ${error 
                  ? "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30" 
                  : "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30"
                }`}
            >
              {error ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
              {status}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}