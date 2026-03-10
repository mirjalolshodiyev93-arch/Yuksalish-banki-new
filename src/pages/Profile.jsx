import React, { useContext } from "react";
import { loans } from "../data/loans";
import { transactions } from "../data/transactions";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { UserContext } from "../context/UserContext";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();

  return (
    <div>
      {/* Profil header */}
      <div className="flex items-center mb-8">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-16 h-16 rounded-full mr-4 border-2 object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow">
          <p className="text-sm sm:text-base">{t("stats1.clients")}</p>
          <h3 className="text-xl sm:text-2xl font-bold">12,840</h3>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow">
          <p className="text-sm sm:text-base">{t("stats1.loans")}</p>
          <h3 className="text-xl sm:text-2xl font-bold">4,120</h3>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow">
          <p className="text-sm sm:text-base">{t("stats1.deposits")}</p>
          <h3 className="text-xl sm:text-2xl font-bold">940.5B UZS</h3>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow">
          <p className="text-sm sm:text-base">{t("stats1.revenue")}</p>
          <h3 className="text-xl sm:text-2xl font-bold">12.4B UZS</h3>
        </div>
      </div>

      {/* Loan Chart */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow mb-6 sm:mb-10">
        <h3 className="mb-3 sm:mb-4 font-semibold text-sm sm:text-base">
          {t("loan")}
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={loans(t)}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#16A34A" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
   
    </div>
  );
}