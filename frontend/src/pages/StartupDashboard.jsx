import { useState } from "react";
import API, { setAuthToken } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function StartupDashboard() {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    name: "",
    year: "",
    vehicleType: "2W",
  });

  const [data, setData] = useState({
    projectId: "",
    vehiclesSold: "",
    distanceTravelled: "",
  });
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingImpact, setLoadingImpact] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [impactResult, setImpactResult] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const createProject = async () => {
    if (!project.name || !project.year) {
      setStatus({ type: "error", message: "Enter project name and year to continue." });
      return;
    }

    try {
      setLoadingCreate(true);
      setStatus({ type: "", message: "" });
      const res = await API.post("/projects/create", project);
      setStatus({ type: "ok", message: "Project created successfully." });
      setData((prev) => ({ ...prev, projectId: res.data.id }));
    } catch {
      setStatus({ type: "error", message: "Could not create project. Please try again." });
    } finally {
      setLoadingCreate(false);
    }
  };

  const addData = async () => {
    if (!data.projectId || !data.vehiclesSold || !data.distanceTravelled) {
      setStatus({ type: "error", message: "Complete project ID, vehicles sold, and distance." });
      return;
    }

    try {
      setLoadingImpact(true);
      setStatus({ type: "", message: "" });
      const res = await API.post("/projects/data", data);
      setImpactResult(res.data.impact.ghgAvoided);
      setStatus({ type: "ok", message: "Impact calculated successfully." });
    } catch {
      setStatus({ type: "error", message: "Failed to calculate impact. Please retry." });
    } finally {
      setLoadingImpact(false);
    }
  };

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

  return (
    <div className="app-shell">
      <div className="content-wrap space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="page-title">Startup Dashboard</h2>
            <p className="page-subtitle">
              Create impact projects, upload project data, and track greenhouse gas reduction estimates.
            </p>
          </div>
          <button className="btn-secondary" onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="stat-card">
            <p className="text-xs uppercase tracking-wide text-slate-200">Vehicle Type</p>
            <p className="mt-2 text-2xl font-bold">{project.vehicleType}</p>
          </div>
          <div className="stat-card">
            <p className="text-xs uppercase tracking-wide text-slate-200">Project ID</p>
            <p className="mt-2 truncate text-lg font-semibold">{data.projectId || "Not created yet"}</p>
          </div>
          <div className="stat-card">
            <p className="text-xs uppercase tracking-wide text-slate-200">Latest GHG Avoided</p>
            <p className="mt-2 text-2xl font-bold">{impactResult ? `${impactResult} tCO2` : "--"}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="panel-light">
            <h3 className="text-lg font-semibold text-slate-900">Create Project</h3>
            <p className="mt-1 text-sm text-slate-600">Set up a project before adding mobility and distance data.</p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="field-label">Project name</label>
                <input
                  className="input-base"
                  placeholder="EV Mobility Program"
                  value={project.name}
                  onChange={(e) => setProject({ ...project, name: e.target.value })}
                />
              </div>
              <div>
                <label className="field-label">Year</label>
                <input
                  className="input-base"
                  placeholder="2026"
                  value={project.year}
                  onChange={(e) => setProject({ ...project, year: e.target.value })}
                />
              </div>
              <div>
                <label className="field-label">Vehicle type</label>
                <select
                  className="select-base"
                  value={project.vehicleType}
                  onChange={(e) => setProject({ ...project, vehicleType: e.target.value })}
                >
                  <option value="2W">2W</option>
                  <option value="4W">4W</option>
                </select>
              </div>
            </div>

            <button className="btn-primary mt-5 w-full" onClick={createProject} disabled={loadingCreate}>
              {loadingCreate ? "Creating..." : "Create Project"}
            </button>
          </div>

          <div className="panel-light">
            <h3 className="text-lg font-semibold text-slate-900">Add Data & Calculate Impact</h3>
            <p className="mt-1 text-sm text-slate-600">Submit activity data to estimate your environmental impact.</p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="field-label">Project ID</label>
                <input
                  className="input-base"
                  placeholder="Auto-filled after project creation"
                  value={data.projectId}
                  onChange={(e) => setData({ ...data, projectId: e.target.value })}
                />
              </div>
              <div>
                <label className="field-label">Vehicles sold</label>
                <input
                  className="input-base"
                  placeholder="1200"
                  value={data.vehiclesSold}
                  onChange={(e) => setData({ ...data, vehiclesSold: e.target.value })}
                />
              </div>
              <div>
                <label className="field-label">Distance travelled (km)</label>
                <input
                  className="input-base"
                  placeholder="15000"
                  value={data.distanceTravelled}
                  onChange={(e) => setData({ ...data, distanceTravelled: e.target.value })}
                />
              </div>
            </div>

            <button className="btn-primary mt-5 w-full" onClick={addData} disabled={loadingImpact}>
              {loadingImpact ? "Calculating..." : "Calculate Impact"}
            </button>
          </div>
        </div>

        {status.message && (
          <p className={status.type === "ok" ? "status-ok" : "status-error"}>{status.message}</p>
        )}
      </div>
    </div>
  );
}