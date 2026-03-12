import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpDown, TrendingUp, Globe } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RUBPage() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState(null); // natija card uchun
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ modal ochish uchun

  const buyRate = 153;
  const sellRate = 156;

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
    const calculated = amount * buyRate;
    setResult(calculated); // natijani saqlash
    setIsModalOpen(true);   // modal oynani ochish
  };

  return (
    <section className="min-h-screen pt-[120px] px-4 md:px-10 bg-slate-50 font-sans">
      <div className="max-w-6xl mx-auto md:pt-[100px]">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="w-full md:w-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 flex items-center gap-3">
              <Globe className="text-red-600 shrink-0" /> {t('rubPage.title')}
            </h1>
            <p className="text-slate-500 mt-2 text-sm md:text-base">{t('rubPage.subtitle')}</p>
          </div>

          <div className="w-full md:w-auto bg-white px-5 py-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between md:justify-start gap-6 md:gap-8">
            <div>
              <p className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-wider">{t('rubPage.buy')}</p>
              <p className="text-lg md:text-xl font-bold text-green-600">{buyRate.toLocaleString()} UZS</p>
            </div>
            <div className="w-[1px] bg-slate-100"></div>
            <div>
              <p className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-wider">{t('rubPage.sell')}</p>
              <p className="text-lg md:text-xl font-bold text-red-600">{sellRate.toLocaleString()} UZS</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Chart */}
          <div className="lg:col-span-2 space-y-8 order-1 lg:order-2">
            <div className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-slate-100 w-full overflow-hidden">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
                <TrendingUp size={18} className="text-red-600" /> {t('rubPage.weeklyRate')}
              </h3>
              <div className="h-[250px] md:h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRUB" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#dc2626" stopOpacity={0.01} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      interval={0}
                      minTickGap={0}
                      padding={{ left: 37, right: 0 }}
                      tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
                      dy={10}
                    />
                    <YAxis hide domain={['dataMin - 2', 'dataMax + 2']} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="rate" stroke="#dc2626" strokeWidth={3} fill="url(#colorRUB)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Calculator */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-xl shadow-red-100/30 border border-red-50 h-fit order-2 lg:order-1">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-red-900">
              <ArrowUpDown size={20} className="text-red-600" /> {t('rubPage.converter')}
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">{t('rubPage.enterAmount')}</label>
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
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">RUB</span>
                </div>
              </div>

              <button
                onClick={handleExchange}
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-red-200 active:scale-[0.98]"
              >
                {t('rubPage.exchange')}
              </button>
            </div>
          </div>

        </div>

        {/* ✅ Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-3xl max-w-md w-full shadow-lg relative">
              <h2 className="text-xl font-bold mb-4">{t("rubPage.modalTitle")}</h2>
              <div className="p-4 bg-green-50 rounded-2xl border border-green-100 mb-6">
                <p className="text-sm text-green-700">{t("rubPage.modalText")}</p>
                <p className="text-2xl font-black text-green-900 mt-1">{result ? result.toLocaleString() : 0} UZS</p>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
                  onClick={() => setIsModalOpen(false)}
                >
                  {t("rubPage.cancel")}
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
                  onClick={() => setIsModalOpen(false)}
                >
                  {t("rubPage.confirm")}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}