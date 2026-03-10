import React, { useState } from "react";
import { ArrowUpDown, TrendingUp, ShieldCheck, Globe } from "lucide-react";
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
    <section className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 flex items-center gap-3">
              <Globe className="text-rose-700" /> Britaniya Funt Sterlingi (GBP)
            </h1>
            <p className="text-slate-500 mt-2">London birjasi va MB real vaqtdagi kursi</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex gap-8">
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold">Sotib olish</p>
              <p className="text-xl font-bold text-green-600">{buyRate.toLocaleString()} UZS</p>
            </div>
            <div className="w-[1px] bg-slate-100"></div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold">Sotish</p>
              <p className="text-xl font-bold text-rose-700">{sellRate.toLocaleString()} UZS</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Kalkulyator */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-xl shadow-rose-100/50 border border-rose-50 h-fit">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-rose-900">
              <ArrowUpDown size={20} className="text-rose-600" /> GBP Konvertatsiya
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Miqdorni kiriting (GBP)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pr-20 p-4 bg-slate-50 border-2 border-transparent focus:border-rose-500 focus:bg-white rounded-2xl outline-none transition-all text-xl font-bold"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">GBP</span>
                </div>
              </div>

              <div className="p-4 bg-rose-50 rounded-2xl">
                <p className="text-sm text-rose-700 font-medium">Siz olasiz (UZS):</p>
                <p className="text-2xl font-black text-rose-900 mt-1">
                  {(amount * buyRate).toLocaleString()} UZS
                </p>
              </div>

              <button className="w-full py-4 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-2xl transition-all shadow-lg shadow-rose-200">
                GBP Ayirboshlash
              </button>
            </div>
          </div>

          {/* Grafik */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-[380px] w-full">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
                <TrendingUp size={18} className="text-rose-600" /> Haftalik GBP Dinamikasi
              </h3>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 25 }}>
                    <defs>
                      <linearGradient id="colorGBP" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#be123c" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#be123c" stopOpacity={0.01}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} interval={0} padding={{ left: 15, right: 15 }} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} dy={15} />
                    <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="rate" stroke="#be123c" strokeWidth={3} fill="url(#colorGBP)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}