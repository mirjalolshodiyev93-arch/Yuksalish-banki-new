import React, { useState } from "react";
import { ArrowUpDown, TrendingUp, ShieldCheck, Globe } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { day: 'Dush', rate: 12780 },
  { day: 'Sesh', rate: 12820 },
  { day: 'Chor', rate: 12800 },
  { day: 'Pay', rate: 12890 },
  { day: 'Jum', rate: 12850 },
  { day: 'Shan', rate: 12900 },
  { day: 'Yak', rate: 12920 },
];

export default function USDPage() {
  const [amount, setAmount] = useState(1);
  const buyRate = 12200;
  const sellRate = 12920;

  return (
    <section className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans " >
      <div className="max-w-6xl mx-auto pt-[100px]">
        
        {/* Header qismi */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 flex items-center gap-3">
              <Globe className="text-blue-600" /> AQSH Dollari (USD)
            </h1>
            <p className="text-slate-500 mt-2">Markaziy bank va bozorning real vaqtdagi kursi</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex gap-8">
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold">Sotib olish</p>
              <p className="text-xl font-bold text-green-600">{buyRate.toLocaleString()} UZS</p>
            </div>
            <div className="w-[1px] bg-slate-100"></div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold">Sotish</p>
              <p className="text-xl font-bold text-blue-600">{sellRate.toLocaleString()} UZS</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. Kalkulyator Section */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-xl shadow-blue-100/50 border border-blue-50 h-fit">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ArrowUpDown size={20} className="text-blue-500" /> Konvertatsiya
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Miqdorni kiriting (USD)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pr-20 p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all text-xl font-bold"
                    placeholder="0.00"
                    style={{ appearance: 'textfield' }}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold pointer-events-none">USD</span>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-2xl overflow-hidden">
                <p className="text-sm text-blue-600 font-medium">Siz olasiz (UZS):</p>
                <p className="text-2xl font-black text-blue-800 mt-1 break-words leading-tight">
                  {(amount * buyRate).toLocaleString()} UZS
                </p>
              </div>

              <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-transform active:scale-95 shadow-lg shadow-blue-200">
                Ayirboshlashni boshlash
              </button>
            </div>
          </div>

          {/* 2. Grafik va Ma'lumotlar */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-[380px] w-full overflow-hidden">
              <div className="flex justify-between items-center mb-6 px-2">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp size={18} className="text-blue-500" /> Haftalik kurs dinamikasi
                </h3>
              </div>
              
             <div className="h-[280px] w-full">
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart 
      data={chartData} 
      /* Margin bottomni 20 yoki 30 qilsak, yozuvlar uchun joy ochiladi */
      margin={{ top: 10, right: 30, left: 10, bottom: 25 }} 
    >
      <defs>
        <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
      <XAxis 
        dataKey="day" 
        axisLine={false} 
        tickLine={false} 
        interval={0} 
        /* Faqat yon tomonlarga padding qoldiramiz */
        padding={{ left: 15, right: 15 }}
        tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
        /* Matnni biroz pastga suramiz */
        dy={15} 
      />
      <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
      <Tooltip 
        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
      />
      <Area 
        type="monotone" 
        dataKey="rate" 
        stroke="#3b82f6" 
        strokeWidth={3} 
        fillOpacity={1} 
        fill="url(#colorRate)" 
      />
    </AreaChart>
  </ResponsiveContainer>
</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="p-3 bg-green-50 rounded-xl text-green-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Xavfsiz Tranzaksiya</h3>
                  <p className="text-sm text-slate-500">Barcha amallar Yuksalish Banki himoyasida.</p>
                </div>
              </div>
              
              <div className="p-5 bg-white rounded-2xl border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Eng yaxshi kurs</h3>
                  <p className="text-sm text-slate-500">Biz bozordagi eng raqobatbardosh kursni taqdim etamiz.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 text-center border-t border-slate-200 pt-8">
          <p className="text-slate-400 text-sm">
            Oxirgi yangilanish: {new Date().toLocaleTimeString()} | Ma'lumotlar avtomatik yangilanadi.
          </p>
        </div>
      </div>
    </section>
  );
}