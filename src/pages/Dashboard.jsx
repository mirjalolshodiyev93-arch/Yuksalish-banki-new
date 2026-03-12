import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function DashboardLayout() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
   
    <div className="max-w-[1400px] mx-auto flex min-h-screen bg-gray-100 relative pt-[100px]">

    
      {!isOpen && (
        <button
          className="md:hidden fixed top-[115px] right-6 z-40 bg-white p-3 rounded-full shadow-lg border border-emerald-100 active:scale-95 transition-all"
          onClick={toggleSidebar}
        >
          <Menu size={24} className="text-emerald-600" />
        </button>
      )}

   
      <aside className="w-64 bg-white shadow-md p-6 hidden md:flex flex-col sticky top-[100px] h-[calc(100vh-100px)] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{t("dashboard.title")}</h2>
        <nav className="flex flex-col gap-3">
          <Link to="profile" className="p-2 rounded hover:bg-emerald-50 hover:text-emerald-600 transition-colors font-medium">{t("dashboard.profil")}</Link>
          <Link to="settings" className="p-2 rounded hover:bg-emerald-50 hover:text-emerald-600 transition-colors font-medium">{t("dashboard.sozlamalar")}</Link>
          <Link to="transactions" className="p-2 rounded hover:bg-emerald-50 hover:text-emerald-600 transition-colors font-medium">{t("dashboard.tranzaksiyalar")}</Link>
          <Link to="srm" className="p-2 rounded hover:bg-emerald-50 hover:text-emerald-600 transition-colors font-medium">{t("dashboard.sorovyuborish")}</Link>
          <Link to="/" className="p-2 rounded hover:bg-red-50 text-red-600 mt-auto font-bold">{t("dashboard.chiqish")}</Link>
        </nav>
      </aside>

     
      <div
        className={`fixed top-[100px] right-0 w-80 h-[calc(100vh-100px)] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] z-50 transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "translate-x-full"} md:hidden flex flex-col`}
      >
      
        <div className="bg-gradient-to-br from-emerald-600 to-green-500 p-6 relative min-h-[160px] flex flex-col justify-end">
    
          <button 
            onClick={toggleSidebar}
            className="absolute top-4 right-4 bg-white/20 p-2 rounded-full hover:bg-white/30 transition text-white"
          >
            <X size={24} />
          </button>
          
          <div className="flex flex-col gap-2">
             <h2 className="text-white font-bold text-xl leading-tight">Yuksalish Bank</h2>
             <p className="text-white/80 text-xs leading-tight italic">
               Sizning moliyaviy o'sishingiz va farovonligingiz uchun...
             </p>
          </div>
        </div>

    
        <nav className="flex flex-col gap-1 p-4 overflow-y-auto flex-1">
          <Link onClick={toggleSidebar} to="profile" className="flex items-center p-3 text-gray-700 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition font-medium">
            {t("dashboard.profil")}
          </Link>
          <Link onClick={toggleSidebar} to="settings" className="flex items-center p-3 text-gray-700 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition font-medium">
            {t("dashboard.sozlamalar")}
          </Link>
          <Link onClick={toggleSidebar} to="transactions" className="flex items-center p-3 text-gray-700 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition font-medium">
            {t("dashboard.tranzaksiyalar")}
          </Link>
          <Link onClick={toggleSidebar} to="srm" className="flex items-center p-3 text-gray-700 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition font-medium">
            {t("dashboard.sorovyuborish")}
          </Link>

          <div className="mt-auto border-t border-gray-100 pt-4">
            <Link onClick={toggleSidebar} to="/" className="flex items-center p-3 text-red-500 rounded-xl hover:bg-red-50 transition font-bold italic">
              {t("dashboard.chiqish")}
            </Link>
          </div>
        </nav>
      </div>

 
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 top-[100px] bg-black/40 backdrop-blur-sm z-30 md:hidden transition-all"
        />
      )}

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}