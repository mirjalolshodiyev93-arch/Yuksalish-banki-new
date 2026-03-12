import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpDown, TrendingUp, Globe } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function GBPPage() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState(null); // natija saqlanadi

  const buyRate = 16323;
  const sellRate = 16050;

  const chartData = [
    { day: t("gbpPage.days.mon"), rate: 16200 },
    { day: t("gbpPage.days.tue"), rate: 16250 },
    { day: t("gbpPage.days.wed"), rate: 16180 },
    { day: t("gbpPage.days.thu"), rate: 16300 },
    { day: t("gbpPage.days.fri"), rate: 16450 },
    { day: t("gbpPage.days.sat"), rate: 16400 },
    { day: t("gbpPage.days.sun"), rate: 16520 },
  ];

  const handleExchange = () => {
    setResult(amount * buyRate);
    setIsModalOpen(true);
  };

  return (
    <section className="min-h-screen pt-[120px] px-4 md:px-10 bg-slate-50 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 flex items-center gap-3">
              <Globe className="text-rose-700" /> {t("gbpPage.title")}
            </h1>
            <p className="text-slate-500 mt-2 text-sm md:text-base">{t("gbpPage.subtitle")}</p>
          </div>

          <div className="w-full md:w-auto bg-white px-5 py-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between md:justify-start gap-6 md:gap-8">
            <div>
              <p className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-wider">{t("gbpPage.buy")}</p>
              <p className="text-lg md:text-xl font-bold text-green-600">{buyRate.toLocaleString()} UZS</p>
            </div>
            <div className="w-[1px] bg-slate-100"></div>
            <div>
              <p className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-wider">{t("gbpPage.sell")}</p>
              <p className="text-lg md:text-xl font-bold text-rose-700">{sellRate.toLocaleString()} UZS</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Grafik */}
          <div className="lg:col-span-2 space-y-8 order-1 lg:order-2">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 w-full overflow-hidden">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
                <TrendingUp size={18} className="text-rose-600" /> {t("gbpPage.weeklyRate")}
              </h3>
              <div className="h-[250px] md:h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorGBP" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#be123c" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#be123c" stopOpacity={0.01}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="day" axisLine={false} tickLine={false} interval={0} minTickGap={0}
                      padding={{ left: 37, right: 0 }} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} dy={10}
                    />
                    <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="rate" stroke="#be123c" strokeWidth={3} fill="url(#colorGBP)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Kalkulyator */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-xl shadow-rose-100/30 border border-rose-50 h-fit order-2 lg:order-1">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-rose-900">
              <ArrowUpDown size={20} className="text-rose-600" /> {t("gbpPage.converter")}
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">{t("gbpPage.enterAmount")}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      let val = e.target.value.toString().replace(/\D/g, "");
                      if (val.length > 7) val = val.slice(0, 7);
                      setAmount(Number(val));
                    }}
                    className="w-full pr-16 p-4 bg-slate-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl outline-none transition-all text-xl font-bold"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">GBP</span>
                </div>
              </div>

              <div className="p-5 bg-rose-50 rounded-2xl border border-rose-100">
                <p className="text-xs text-rose-700 font-semibold uppercase tracking-wider">{t("gbpPage.youGet")}</p>
                <p className="text-2xl md:text-3xl font-black text-rose-900 mt-1">{(amount * buyRate).toLocaleString()} UZS</p>
              </div>

              {/* Tugma */}
              <button
                onClick={handleExchange}
                className="w-full py-4 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-2xl transition-all shadow-lg shadow-rose-200 active:scale-[0.98]"
              >
                {t("gbpPage.exchange")}
              </button>
            </div>
          </div>

        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-3xl max-w-md w-full shadow-lg relative">
              <h2 className="text-xl font-bold mb-4">{t("gbpPage.modalTitle")}</h2>
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 mb-6">
                <p className="text-sm text-rose-700">{t("gbpPage.modalText")}</p>
                <p className="text-2xl font-black text-rose-900 mt-1">{result ? result.toLocaleString() : 0} UZS</p>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
                  onClick={() => setIsModalOpen(false)}
                >
                  {t("gbpPage.cancel")}
                </button>
                <button
                  className="px-4 py-2 bg-rose-700 text-white rounded-xl hover:bg-rose-800"
                  onClick={() => setIsModalOpen(false)}
                >
                  {t("gbpPage.confirm")}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}