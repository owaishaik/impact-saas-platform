import { useState } from "react";
import API from "../services/api";

export default function StartupDashboard() {
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

  const createProject = async () => {
    const res = await API.post("/projects/create", project);
    alert("Project Created!");
    setData({ ...data, projectId: res.data.id });
  };

  const addData = async () => {
    const res = await API.post("/projects/data", data);
    alert(`GHG Avoided: ${res.data.impact.ghgAvoided}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Startup Dashboard</h2>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">Create Project</h3>
        <input className="w-full p-2 mb-3 border rounded"
          placeholder="Name"
          onChange={(e) => setProject({ ...project, name: e.target.value })}
        />
        <input className="w-full p-2 mb-3 border rounded"
          placeholder="Year"
          onChange={(e) => setProject({ ...project, year: e.target.value })}
        />

        <select className="w-full p-2 mb-3 border rounded" onChange={(e) => setProject({ ...project, vehicleType: e.target.value })}>
          <option value="2W">2W</option>
          <option value="4W">4W</option>
        </select>

        <button className="w-full bg-blue-500 text-white p-2 rounded" onClick={createProject}>Create</button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Add Data</h3>
        <input className="w-full p-2 mb-3 border rounded"
          placeholder="Vehicles Sold"
          onChange={(e) => setData({ ...data, vehiclesSold: e.target.value })}
        />

        <input className="w-full p-2 mb-3 border rounded"
          placeholder="Distance"
          onChange={(e) => setData({ ...data, distanceTravelled: e.target.value })}
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded" onClick={addData}>Calculate Impact</button>
      </div>
    </div>
  );
}