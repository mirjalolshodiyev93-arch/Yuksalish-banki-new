import { getStatsData } from "../../data/stats";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Stats() {
  const { t } = useTranslation();
  const stats = getStatsData(t);
  const navigate = useNavigate();

  // Animatsiya variantlari
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 20 } 
    }
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0f172a] transition-colors duration-500 overflow-hidden relative">
      {/* Dekorativ orqa fon elementlari */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          variants={containerVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVars}
              onClick={() => navigate(stat.link || "/")}
              className="relative group cursor-pointer"
            >
              {/* Card Container */}
              <div className="relative overflow-hidden bg-white dark:bg-slate-800/40 backdrop-blur-xl p-10 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-700/50 hover:border-green-500/50 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-green-500/10 active:scale-95">
                
                {/* Hover Effect: Soft Glow */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all duration-700" />
                
                <div className="relative z-10">
                  {/* Stat Value */}
                  <div className="flex items-baseline gap-1 mb-2">
                    <h3 className="text-5xl font-black bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent group-hover:from-green-600 group-hover:to-emerald-500 dark:group-hover:from-green-400 dark:group-hover:to-emerald-300 transition-all duration-500">
                      {stat.value}
                    </h3>
                  </div>

                  {/* Animated Divider Line */}
                  <div className="h-1.5 w-10 bg-green-500 rounded-full mb-6 transform origin-left group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-emerald-400 transition-all duration-700 ease-out" />

                  {/* Label */}
                  <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>

                {/* Floating Icon or Decor (Optional) */}
                <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                  <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="Read More -> M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Bottom Decorative Element */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-green-500 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}