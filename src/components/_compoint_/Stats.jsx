import { getStatsData } from "../../data/stats";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Stats() {
  const { t } = useTranslation();
  const stats = getStatsData(t);
  const navigate = useNavigate(); // navigate funksiyasi

  return (
    <div className="max-w-[1400px] mx-auto bg-slate-300 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {stats.map((stat) => (
        <div
          key={stat.label}    
          className="p-6 rounded-2xl hover:shadow-lg transition cursor-pointer"
        >
          <h3 className="text-3xl font-bold text-green-600">{stat.value}</h3>
          <p className="text-gray-600 mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}