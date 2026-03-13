import React, { useContext } from "react";
import { loans } from "../data/loans";
import { transactions } from "../data/transactions";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { UserContext } from "../context/UserContext";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen p-4 transition-colors duration-500 bg-gray-50 dark:bg-slate-950 sm:p-8 lg:p-12">
      
      {/* Foydalanuvchi Profili Sarlavhasi */}
      <div className="flex items-center p-6 mb-8 transition-colors bg-white border border-gray-100 shadow-sm dark:bg-slate-900 rounded-3xl dark:border-slate-800">
        <img
          src={user.avatar}
          alt="avatar"
          className="object-cover w-20 h-20 mr-6 border-4 rounded-full border-emerald-500/20"
        />
        <div>
          <h1 className="text-2xl font-bold transition-colors sm:text-3xl text-slate-800 dark:text-white">
            {user.name}
          </h1>
          <p className="font-medium text-gray-500 dark:text-slate-400">{user.email}</p>
        </div>
      </div>

      {/* Statistika Kartalari */}
      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:mb-10">
        {[
          { label: t("stats1.clients"), value: "12,840" },
          { label: t("stats1.loans"), value: "4,120" },
          { label: t("stats1.deposits"), value: "940.5B UZS" },
          { label: t("stats1.revenue"), value: "12.4B UZS" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 transition-all hover:scale-[1.02]">
            <p className="mb-1 text-sm text-gray-500 sm:text-base dark:text-slate-400">{stat.label}</p>
            <h3 className="text-xl font-black sm:text-2xl text-slate-800 dark:text-emerald-500">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Grafik Seksiyasi */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            {t("loan")}
          </h3>
          <div className="px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
            {t("monthly_stats") || "Oylik tahlil"}
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={loans(t)}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94A3B8', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94A3B8', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgb(15, 23, 42)', 
                  border: 'none', 
                  borderRadius: '12px', 
                  color: '#fff',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                }}
                itemStyle={{ color: '#10B981' }}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#10B981" 
                strokeWidth={4} 
                dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}