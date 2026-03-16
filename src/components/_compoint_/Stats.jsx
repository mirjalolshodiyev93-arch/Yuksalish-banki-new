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
  
      <div className="absolute top-0 w-full h-px -translate-x-1/2 left-1/2 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      
      <div className="relative z-10 px-4 mx-auto max-w-7xl">
        <motion.div 
          variants={containerVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVars}
              onClick={() => navigate(stat.link || "/")}
              className="relative cursor-pointer group"
            >
      
              <div className="relative overflow-hidden bg-white dark:bg-slate-800/40 backdrop-blur-xl p-10 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-700/50 hover:border-green-500/50 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-green-500/10 active:scale-95">
                
            
                <div className="absolute w-32 h-32 transition-all duration-700 rounded-full -right-10 -top-10 bg-green-500/5 blur-3xl group-hover:bg-green-500/20" />
                
                <div className="relative z-10">
              
                  <div className="flex items-baseline gap-1 mb-2">
                    <h3 className="text-5xl font-black text-transparent transition-all duration-500 bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text group-hover:from-green-600 group-hover:to-emerald-500 dark:group-hover:from-green-400 dark:group-hover:to-emerald-300">
                      {stat.value}
                    </h3>
                  </div>

                
                  <div className="h-1.5 w-10 bg-green-500 rounded-full mb-6 transform origin-left group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-emerald-400 transition-all duration-700 ease-out" />

              
                  <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>

                
                <div className="absolute transition-all duration-500 opacity-0 bottom-6 right-8 group-hover:opacity-100 group-hover:translate-x-2">
                  <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="Read More -> M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              
              <div className="absolute w-1/2 h-1 transition-all duration-500 -translate-x-1/2 bg-green-500 rounded-full opacity-0 -bottom-2 left-1/2 blur-sm group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}