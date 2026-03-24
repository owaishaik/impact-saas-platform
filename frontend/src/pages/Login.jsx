import { useState } from "react";
import API, { setAuthToken } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await API.post("/auth/login", form);

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      setAuthToken(token);

      if (user.role === "STARTUP") {
        navigate("/startup");
      } else {
        navigate("/investor");
      }
    } catch {
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell flex items-center">
      <div className="content-wrap grid items-center gap-8 lg:grid-cols-2">
        <div className="hidden lg:block">
          <p className="mb-3 inline-flex rounded-full border border-indigo-300/40 bg-indigo-400/15 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-100">
            IMPACT PLATFORM
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white">
            Track climate impact with confidence.
          </h1>
          <p className="mt-4 max-w-lg text-slate-300">
            Securely log in to access startup project insights and investor impact analytics in one polished dashboard.
          </p>
        </div>

        <div className="panel-light mx-auto w-full max-w-md">
          <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
          <p className="mt-1 text-sm text-slate-600">Sign in to continue to your dashboard.</p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="field-label">Email</label>
              <input
                className="input-base"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="field-label">Password</label>
              <input
                className="input-base"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
              />
            </div>
          </div>

          {error && <p className="status-error mt-4">{error}</p>}

          <button onClick={handleLogin} className="btn-primary mt-5 w-full" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>

          <p className="mt-4 text-center text-sm text-slate-600">
            New here?{" "}
            <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}