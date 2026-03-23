import { useEffect, useState } from "react";
import API from "../services/api";

export default function InvestorDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/investor/dashboard").then((res) => {
      setData(res.data);
    });
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Investor Dashboard</h2>

      <div className="bg-green-100 p-4 rounded mb-4">
        <h3 className="text-lg font-semibold">
          Total Impact: {data.totalImpact} tCO₂
        </h3>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Startup Impacts</h3>

        {data.startups.map((s) => (
          <div key={s.startupId} className="flex justify-between border-b py-2">
            <span>{s.startupName}</span>
            <span>{s.totalImpact}</span>
          </div>
        ))}
      </div>
    </div>
  );
}