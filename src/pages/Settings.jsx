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
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sozlamalar</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <img
            src={avatar}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover border"
          />

       <label className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
    Upload
    <input
      type="file"
      accept="image/*"
      onChange={handleImage}
      className="hidden"
    />
  </label>
        </div>

        <label className="flex flex-col">
          Ism:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </label>

        <label className="flex flex-col">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </label>

        <label className="flex flex-col">
          Parol:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </label>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Saqlash
        </button>

      </form>

      {status && <p className="mt-2 text-blue-600">{status}</p>}
    </div>
  );
}