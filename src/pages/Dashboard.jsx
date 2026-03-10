import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className=" max-w-[1400px] mx-auto  flex min-h-screen pt-[100px] bg-gray-100">

      {/* Sidebar */}
    <aside className="w-64  bg-white shadow-md p-6 hidden md:flex flex-col sticky top-[70px] h-[calc(100vh-70px)] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Shaxsiy Kabinet</h2>

        <nav className="flex flex-col gap-3">
          <Link to="profile" className="p-2 rounded hover:bg-gray-200">
            Profil
          </Link>

          <Link to="settings" className="p-2 rounded hover:bg-gray-200">
            Sozlamalar
          </Link>

          <Link to="transactions" className="p-2 rounded hover:bg-gray-200">
            Tranzaksiyalar
          </Link>

          <Link to="srm" className="p-2 rounded hover:bg-gray-200">
            So'rov yuborish
          </Link>

          <Link to="/" className="p-2 rounded hover:bg-red-200 text-red-600">
            Chiqish
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}