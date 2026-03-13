import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// 👇 Clerk hookini qo'shdik
import { useSignIn } from "@clerk/clerk-react";

export default function SignIn() {
  const { isLoaded, signIn } = useSignIn();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 👇 Google orqali kirish funksiyasi
  const signInWithGoogle = async () => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrlComplete: "/", // muvaffaqiyatli login so'ng asosiy sahifaga yo'naltirish
      });
    } catch (err) {
      console.error("Xatolik:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) {
      console.log("Clerk hali yuklanmadi");
      return;
    }

    try {
      await signIn.create({
        identifier: email,
        password: password,
      });
      alert("Muvaffaqiyatli kirdingiz!");
      navigate("/");
    } catch (err) {
      console.error("Login xatolik:", err);
      alert("Email yoki parol xato!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f172a] overflow-hidden relative font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse transition-all duration-1000"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse transition-all duration-1000"></div>

      <div className="relative w-full max-w-md p-4">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[3rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
          
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black tracking-tight text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Xush kelibsiz
            </h2>
            <p className="text-gray-400 font-medium">Hisobingizga kiring</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="group space-y-2">
              <label className="text-sm font-semibold text-gray-300 ml-1">Email manzilingiz</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="misol@gmail.com"
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 pl-12"
                  required
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400">📧</span>
              </div>
            </div>

            {/* Password Input */}
            <div className="group space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-semibold text-gray-300">Parol</label>
                <Link to="#" className="text-xs text-blue-400 hover:underline">Unutdingizmi?</Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 pl-12"
                  required
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400">🔒</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full relative group overflow-hidden py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl active:scale-[0.98] transition-all"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Tizimga kirish <span>→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            {/* OR Separator */}
            <div className="flex items-center gap-4 py-2">
              <div className="h-[1px] flex-1 bg-white/10"></div>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Yoki</span>
              <div className="h-[1px] flex-1 bg-white/10"></div>
            </div>

            {/* Google SignIn Button */}
            <button
              type="button"
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 py-3.5 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg active:scale-[0.98]"
            >
              <img 
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                alt="Google" 
                className="w-5 h-5"
              />
              Google orqali kirish
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Hisobingiz yo'qmi?{" "}
              <Link to="/signup" className="text-white font-black hover:text-blue-400 ml-1">
                Ro'yxatdan o'ting
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2">
            <p className="text-gray-600 text-[10px] tracking-[0.2em] uppercase font-bold">Secure Authentication</p>
            <p className="text-gray-700 text-xs">&copy; 2026 Barcha huquqlar himoyalangan</p>
        </div>
      </div>
    </div>
  );
}