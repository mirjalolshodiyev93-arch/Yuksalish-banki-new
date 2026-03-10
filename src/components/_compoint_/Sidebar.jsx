import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, CreditCard, Menu } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const links = [
    { icon: <LayoutDashboard size={18} />, title: "Dashboard", path: "/" },
    { icon: <Users size={18} />, title: "Clients", path: "/clients" },
    { icon: <CreditCard size={18} />, title: "Loans", path: "/loans" },
  ];


  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-5 left-5 z-50 p-2 rounded-md bg-blue-600 text-white"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-[#0B1F3A] text-white p-6
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          z-40
        `}
      >
        <h1 className="text-2xl font-bold mb-10">Agrobank CRM</h1>

        <nav className="space-y-4">
          {links.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="flex gap-3 items-center hover:text-green-400 transition"
              onClick={() => setOpen(false)} // mobil ochilganda link bosganda yopilsin
            >
              {item.icon} {item.title}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
        ></div>
      )}
    </>
  );
}