import React, { useState } from "react";
import { ArrowUpDown, TrendingUp, ShieldCheck, Globe } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// EUR haftalik simulyatsiya ma'lumotlari
const chartData = [
  { day: 'Dush', rate: 13800 },
  { day: 'Sesh', rate: 13850 },
  { day: 'Chor', rate: 13790 },
  { day: 'Pay', rate: 13920 },
  { day: 'Jum', rate: 14010 },
  { day: 'Shan', rate: 13980 },
  { day: 'Yak', rate: 14050 },

];

export default function EURPage() {
  const [amount, setAmount] = useState(1);
  const buyRate = 13850; // EUR sotib olish kursi
  const sellRate = 14100; // EUR sotish kursi

  return (
    <section className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header qismi */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 flex items-center gap-3">
              <Globe className="text-indigo-600" /> Yevropa Valyutasi (EUR)
            </h1>
            <p className="text-slate-500 mt-2">Yevro hududi va Markaziy bankning rasmiy kursi</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex gap-8">
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold">Sotib olish</p>
              <p className="text-xl font-bold text-green-600">{buyRate.toLocaleString()} UZS</p>
            </div>
            <div className="w-[1px] bg-slate-100"></div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold">Sotish</p>
              <p className="text-xl font-bold text-indigo-600">{sellRate.toLocaleString()} UZS</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. Kalkulyator Section */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-50 h-fit">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ArrowUpDown size={20} className="text-indigo-500" /> Konvertatsiya
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Miqdorni kiriting (EUR)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pr-20 p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all text-xl font-bold"
                    placeholder="0.00"
                    style={{ appearance: 'textfield' }}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold pointer-events-none">EUR</span>
                </div>
              </div>

              <div className="p-4 bg-indigo-50 rounded-2xl overflow-hidden">
                <p className="text-sm text-indigo-600 font-medium">Siz olasiz (UZS):</p>
                <p className="text-2xl font-black text-indigo-800 mt-1 break-words leading-tight">
                  {(amount * buyRate).toLocaleString()} UZS
                </p>
              </div>

              <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-transform active:scale-95 shadow-lg shadow-indigo-200">
                Yevro ayirboshlash
              </button>
            </div>
          </div>

          {/* 2. Grafik va Ma'lumotlar */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-[380px] w-full overflow-hidden">
              <div className="flex justify-between items-center mb-6 px-2">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp size={18} className="text-indigo-500" /> EUR/UZS Haftalik dinamikasi
                </h3>
              </div>
              
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart 
                    data={chartData} 
                    margin={{ top: 10, right: 30, left: 10, bottom: 25 }} 
                  >
                    <defs>
                      <linearGradient id="colorRateEUR" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.01}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      interval={0} 
                      padding={{ left: 15, right: 15 }}
                      tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                      dy={15} 
                    />
                    <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      formatter={(value) => [`${value.toLocaleString()} UZS`, 'Kurs']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="#4f46e5" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorRateEUR)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Yevropa Standarti</h3>
                  <p className="text-sm text-slate-500">Xalqaro darajadagi xavfsiz va tezkor o'tkazmalar.</p>
                </div>
              </div>
              
              <div className="p-5 bg-white rounded-2xl border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Komissiyasiz</h3>
                  <p className="text-sm text-slate-500">EUR ayirboshlashda eng past xarajatlar bizda.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="mt-12 text-center border-t border-slate-200 pt-8">
          <p className="text-slate-400 text-sm">
            Yangilangan vaqt: {new Date().toLocaleTimeString()} | Markaziy Bank EUR kursi asosida.
          </p>
        </div>
      </div>
    </section>
  );
}