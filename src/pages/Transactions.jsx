import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { transactions } from "../data/transactions";
import { Sun, Moon } from "lucide-react"; // Ikonkalar uchun

export default function Transactions() {
  const { t } = useTranslation();
  
  // Dark mode holatini tekshirish va saqlash
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" || 
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="max-w-6xl p-4 mx-auto transition-colors duration-500 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          {t("transactions.title")}
        </h1>
        
        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-2xl bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 transition-all hover:scale-110"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors duration-500">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                  {t("table.date")}
                </th>
                <th className="px-6 py-4 text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                  {t("table.client")}
                </th>
                <th className="px-6 py-4 text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                  {t("table.type")}
                </th>
                <th className="px-6 py-4 text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                  {t("table.amount")}
                </th>
                <th className="px-6 py-4 text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                  {t("table.status")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {transactions(t).map((item) => (
                <tr 
                  key={item.id} 
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-slate-800/30"
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-300">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800 dark:text-slate-200">
                    {item.client}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {item.type}
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-slate-800 dark:text-white">
                    {item.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === t("status.completed")
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                          : "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                        item.status === t("status.completed") ? "bg-emerald-500" : "bg-rose-500"
                      }`}></span>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}