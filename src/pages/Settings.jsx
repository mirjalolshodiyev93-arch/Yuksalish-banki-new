import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Settings() {
  const { user, setUser } = useContext(UserContext);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(user.avatar);
  const [status, setStatus] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUser({
      ...user,
      name,
      email,
      avatar
    });

    setStatus("Sozlamalar saqlandi ✅");
    setPassword("");
    
    // 3 soniyadan keyin statusni o'chirish
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-500">
      <h1 className="mb-8 text-3xl font-bold text-slate-800 dark:text-white">Sozlamalar</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Avatar Section */}
        <div className="flex items-center gap-6 p-4 border border-gray-200 border-dashed bg-gray-50 dark:bg-slate-800/50 rounded-2xl dark:border-slate-700">
          <img
            src={avatar}
            alt="avatar"
            className="object-cover w-20 h-20 border-4 border-white rounded-full shadow-md dark:border-slate-700"
          />
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Profil surati</p>
            <label className="px-5 py-2 text-sm font-bold text-center text-white transition-all cursor-pointer bg-emerald-500 rounded-xl hover:bg-emerald-600 active:scale-95">
              Rasm yuklash
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Name Input */}
        <label className="flex flex-col gap-2">
          <span className="ml-1 text-sm font-bold text-slate-500 dark:text-slate-400">Ism:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-4 transition-all border-none outline-none bg-gray-50 dark:bg-slate-800 text-slate-800 dark:text-white rounded-2xl focus:ring-2 focus:ring-emerald-500"
            placeholder="Ismingizni kiriting"
          />
        </label>

        {/* Email Input */}
        <label className="flex flex-col gap-2">
          <span className="ml-1 text-sm font-bold text-slate-500 dark:text-slate-400">Email:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 transition-all border-none outline-none bg-gray-50 dark:bg-slate-800 text-slate-800 dark:text-white rounded-2xl focus:ring-2 focus:ring-emerald-500"
            placeholder="example@mail.com"
          />
        </label>

        {/* Password Input */}
        <label className="flex flex-col gap-2">
          <span className="ml-1 text-sm font-bold text-slate-500 dark:text-slate-400">Yangi parol:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 transition-all border-none outline-none bg-gray-50 dark:bg-slate-800 text-slate-800 dark:text-white rounded-2xl focus:ring-2 focus:ring-emerald-500"
            placeholder="********"
          />
        </label>

        <button
          type="submit"
          className="px-6 py-4 mt-2 text-lg font-bold text-white transition-all shadow-lg bg-emerald-600 rounded-2xl hover:bg-emerald-700 shadow-emerald-200 dark:shadow-none active:scale-95"
        >
          Saqlash
        </button>

      </form>

      {status && (
        <div className="p-4 mt-4 font-bold text-center bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl animate-pulse">
          {status}
        </div>
      )}
    </div>
  );
}