import React, { useState } from "react";
import { ArrowUpDown, TrendingUp, Globe } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";

export default function USDPage() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);  // natija saqlash uchun
  const [isModalOpen, setIsModalOpen] = useState(false); // modal state

  const buyRate = 12193;
  const sellRate = 12250;

  const chartData = [
    { day: t("usdPage.days.mon"), rate: 12780 },
    { day: t("usdPage.days.tue"), rate: 12820 },
    { day: t("usdPage.days.wed"), rate: 12800 },
    { day: t("usdPage.days.thu"), rate: 12890 },
    { day: t("usdPage.days.fri"), rate: 12850 },
    { day: t("usdPage.days.sat"), rate: 12900 },
    { day: t("usdPage.days.sun"), rate: 12920 },
  ];

  const handleExchange = () => {
    setResult(amount * buyRate); // natijani saqlaymiz
    setIsModalOpen(true);         // modalni ochamiz
  };

  return (
    <section className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto pt-[100px]">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 flex items-center gap-3">
              <Globe className="text-blue-600" /> {t("usdPage.title")}
            </h1>
            <p className="text-slate-500 mt-2">{t("usdPage.subtitle")}</p>
          </div>

          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex gap-8">
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold">{t("usdPage.buy")}</p>
              <p className="text-xl font-bold text-green-600">{buyRate.toLocaleString()} UZS</p>
            </div>

            <div className="w-[1px] bg-slate-100"></div>

            <div>
              <p className="text-xs text-slate-400 uppercase font-bold">{t("usdPage.sell")}</p>
              <p className="text-xl font-bold text-blue-600">{sellRate.toLocaleString()} UZS</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Converter */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-xl shadow-blue-100/50 border border-blue-50 h-fit">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ArrowUpDown size={20} className="text-blue-500" /> {t("usdPage.converter")}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">{t("usdPage.enterAmount")}</label>
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
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold pointer-events-none">USD</span>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-2xl overflow-hidden">
                <p className="text-sm text-blue-600 font-medium">{t("usdPage.youGet")}:</p>
                <p className="text-2xl font-black text-blue-800 mt-1 break-words leading-tight">{(amount * buyRate).toLocaleString()} UZS</p>
              </div>

              {/* Exchange button */}
              <button
                onClick={handleExchange}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-transform active:scale-95 shadow-lg shadow-blue-200"
              >
                {t("usdPage.exchange")}
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-[380px] w-full overflow-hidden">
              <div className="flex justify-between items-center mb-6 px-2">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp size={18} className="text-blue-500" /> {t("usdPage.weeklyRate")}
                </h3>
              </div>

              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 25 }}>
                    <defs>
                      <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} interval={0} padding={{ left: 15, right: 15 }} tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }} dy={15}/>
                    <YAxis hide domain={["dataMin - 100", "dataMax + 100"]}/>
                    <Tooltip contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}/>
                    <Area type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>

        {/* ✅ Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-3xl max-w-md w-full shadow-lg relative">
              <h2 className="text-xl font-bold mb-4">{t("usdPage.modalTitle")}</h2>
              <div className="p-4 bg-green-50 rounded-2xl border border-green-200 mb-6">
                <p className="text-sm text-green-700">{t("usdPage.modalText")}</p>
                <p className="text-2xl font-black text-green-900 mt-1">{result ? result.toLocaleString() : 0} UZS</p>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
                  onClick={() => setIsModalOpen(false)}
                >
                  {t("usdPage.cancel")}
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  onClick={() => setIsModalOpen(false)}
                >
                  {t("usdPage.confirm")}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center border-t border-slate-200 pt-8">
          <p className="text-slate-400 text-sm">{t("usdPage.lastUpdate")}: {new Date().toLocaleTimeString()} | {t("usdPage.autoUpdate")}</p>
        </div>

      </div>
    </section>
  );
}