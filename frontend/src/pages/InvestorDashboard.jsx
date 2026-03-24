import { useEffect, useState } from "react";
import API, { setAuthToken } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function InvestorDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    API.get("/investor/dashboard")
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        setError("Could not load investor dashboard data.");
      });
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await API.post("/auth/logout");
    } catch {
      // Frontend token cleanup still signs the user out locally.
    } finally {
      localStorage.removeItem("token");
      setAuthToken(null);
      navigate("/");
    }
  };

  if (error) {
    return (
      <div className="app-shell">
        <div className="content-wrap">
          <p className="status-error">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="app-shell">
        <div className="content-wrap">
          <div className="panel text-white">Loading dashboard data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="content-wrap space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="page-title">Investor Dashboard</h2>
            <p className="page-subtitle">
              Review portfolio-level sustainability performance and startup-wise impact contributions.
            </p>
          </div>
          <button className="btn-secondary" onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="stat-card md:col-span-2">
            <p className="text-xs uppercase tracking-wide text-slate-200">Total Impact</p>
            <h3 className="mt-2 text-3xl font-bold">{data.totalImpact} tCO2</h3>
            <p className="mt-1 text-sm text-slate-200">Estimated greenhouse gas emissions avoided.</p>
          </div>
          <div className="stat-card">
            <p className="text-xs uppercase tracking-wide text-slate-200">Startups Tracked</p>
            <h3 className="mt-2 text-3xl font-bold">{data.startups.length}</h3>
          </div>
        </div>

        <div className="panel-light">
          <h3 className="text-lg font-semibold text-slate-900">Startup Impact Breakdown</h3>
          <p className="mt-1 text-sm text-slate-600">Comparative view of contribution by each startup.</p>

          <div className="mt-5 space-y-3">
            {data.startups.map((s) => (
              <div
                key={s.startupId}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <span className="font-medium text-slate-800">{s.startupName}</span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                  {s.totalImpact} tCO2
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}