import React from "react";
import { useTranslation } from "react-i18next";
import { transactions } from "../data/transactions";

export default function Transactions() {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t("transactions.title")}</h1>

      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-left min-w-[500px] sm:min-w-full">
          <thead>
            <tr>
              
              <th className="py-2 sm:py-3 text-sm sm:text-base">{t("table.date")}</th>
              <th className="py-2 sm:py-3 text-sm sm:text-base">{t("table.client")}</th>
              <th className="py-2 sm:py-3 text-sm sm:text-base">{t("table.type")}</th>
              <th className="py-2 sm:py-3 text-sm sm:text-base">{t("table.amount")}</th>
              <th className="py-2 sm:py-3 text-sm sm:text-base">{t("table.status")}</th>
            </tr>
          </thead>
          <tbody>
            {transactions(t).map((item) => (
              <tr key={item.id} className="border-t text-sm sm:text-base">
                <td className="py-2 sm:py-3">{item.date}</td>
                <td className="py-2 sm:py-3">{item.client}</td>
                <td className="py-2 sm:py-3">{item.type}</td>
                <td className="py-2 sm:py-3">{item.amount}</td>
                <td
                  className={`py-2 sm:py-3 ${
                    item.status === t("status.completed")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}