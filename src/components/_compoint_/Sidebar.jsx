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
    
      <button
        onClick={() => setOpen(!open)}
        className="fixed z-50 p-2 text-white bg-blue-600 rounded-md md:hidden top-5 left-5"
      >
        <Menu size={24} />
      </button>

    
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-[#0B1F3A] text-white p-6
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          z-40
        `}
      >
        <h1 className="mb-10 text-2xl font-bold">Agrobank CRM</h1>

        <nav className="space-y-4">
          {links.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="flex items-center gap-3 transition hover:text-green-400"
              onClick={() => setOpen(false)}
            >
              {item.icon} {item.title}
            </NavLink>
          ))}
        </nav>
      </div>

    
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
        ></div>
      )}
    </>
  );
}