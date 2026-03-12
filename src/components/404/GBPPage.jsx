import React, { useState } from "react";
import { ArrowUpDown, TrendingUp, Globe } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { day: 'Dush', rate: 16200 },
  { day: 'Sesh', rate: 16250 },
  { day: 'Chor', rate: 16180 },
  { day: 'Pay', rate: 16300 },
  { day: 'Jum', rate: 16450 },
  { day: 'Shan', rate: 16400 },
  { day: 'Yak', rate: 16520 },
];

export default function GBPPage() {
  const [amount, setAmount] = useState(1);
  const buyRate = 16200;
  const sellRate = 16650;

  return (
    <section className="min-h-screen pt-[120px] px-4 md:px-10 bg-slate-50 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 flex items-center gap-3">
              <Globe className="text-rose-700" /> Britaniya Funt Sterlingi (GBP)
            </h1>
            <p className="text-slate-500 mt-2 text-sm md:text-base">London birjasi va MB real vaqtdagi kursi</p>
          </div>
          <div className="w-full md:w-auto bg-white px-5 py-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between md:justify-start gap-6 md:gap-8">
            <div>
              <p className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-wider">Sotib olish</p>
              <p className="text-lg md:text-xl font-bold text-green-600">{buyRate.toLocaleString()} UZS</p>
            </div>
            <div className="w-[1px] bg-slate-100"></div>
            <div>
              <p className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-wider">Sotish</p>
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
                <TrendingUp size={18} className="text-rose-600" /> Haftalik GBP Dinamikasi
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
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      interval={0} 
                      minTickGap={0}
                      padding={{ left: 37, right: 0 }} 
                      tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} 
                      dy={10}
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
              <ArrowUpDown size={20} className="text-rose-600" /> GBP Konvertatsiya
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Miqdorni kiriting (GBP)</label>
                <div className="relative">
                 <input
  type="number"
  value={amount}
  onChange={(e) => {
    let val = e.target.value.toString().replace(/\D/g, ""); // faqat raqam
    if (val.length > 7) val = val.slice(0, 7);             // maksimal 7 raqam
    setAmount(Number(val));
  }}
  className="w-full pr-16 p-4 bg-slate-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl outline-none transition-all text-xl font-bold"
/>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">GBP</span>
                </div>
              </div>

              <div className="p-5 bg-rose-50 rounded-2xl border border-rose-100">
                <p className="text-xs text-rose-700 font-semibold uppercase tracking-wider">Siz olasiz (UZS):</p>
                <p className="text-2xl md:text-3xl font-black text-rose-900 mt-1">
                  {(amount * buyRate).toLocaleString()} UZS
                </p>
              </div>

              <button className="w-full py-4 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-2xl transition-all shadow-lg shadow-rose-200 active:scale-[0.98]">
                GBP Ayirboshlash
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}