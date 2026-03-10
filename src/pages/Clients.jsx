import { clients } from "../data/clients";

export default function Clients() {
  return (
    <div className="ml-64 p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8">Clients</h2>

      <table className="w-full bg-white rounded-2xl shadow">
        <thead>
          <tr className="text-left border-b">
            <th className="p-4">Name</th>
            <th>Phone</th>
            <th>Region</th>
            <th>Balance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-4">{c.name}</td>
              <td>{c.phone}</td>
              <td>{c.region}</td>
              <td>{c.balance.toLocaleString()} UZS</td>
              <td className="text-green-600">{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}