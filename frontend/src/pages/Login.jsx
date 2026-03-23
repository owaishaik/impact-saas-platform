import { useState } from "react";
import API, { setAuthToken } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await API.post("/auth/login", form);

    const { token, user } = res.data;

    localStorage.setItem("token", token);
    setAuthToken(token);

    if (user.role === "STARTUP") {
      navigate("/startup");
    } else {
      navigate("/investor");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-2xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input className="w-full p-2 mb-3 border rounded"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input className="w-full p-2 mb-3 border rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}