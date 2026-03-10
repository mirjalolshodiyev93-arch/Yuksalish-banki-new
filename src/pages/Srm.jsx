import React, { useState } from "react";

export default function Srm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setStatus("Iltimos, xabar kiriting!");
      return;
    }
    setStatus("So'rovingiz yuborildi ✅");
    setMessage("");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">So'rov yuborish</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
        <textarea
          rows={5}
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Bu yerga so'rovingizni yozing..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Yuborish
        </button>
      </form>
      {status && <p className="mt-2 text-blue-600">{status}</p>}
    </div>
  );
}