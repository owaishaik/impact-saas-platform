import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STARTUP",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      setStatus({ type: "error", message: "Please fill all required fields." });
      return;
    }

    try {
      setLoading(true);
      setStatus({ type: "", message: "" });
      await API.post("/auth/signup", form);
      setStatus({ type: "ok", message: "Account created successfully. You can now log in." });
      setForm({ name: "", email: "", password: "", role: "STARTUP" });
    } catch {
      setStatus({ type: "error", message: "Signup failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell flex items-center">
      <div className="content-wrap">
        <div className="panel-light mx-auto w-full max-w-xl">
          <h2 className="text-2xl font-bold text-slate-900">Create your account</h2>
          <p className="mt-1 text-sm text-slate-600">
            Join as a startup or investor to access tailored analytics.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="field-label">Full name</label>
              <input
                className="input-base"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="sm:col-span-2">
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
                placeholder="Create a password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div>
              <label className="field-label">Role</label>
              <select
                className="select-base"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="STARTUP">Startup</option>
                <option value="INVESTOR">Investor</option>
              </select>
            </div>
          </div>

          {status.message && (
            <p className={`${status.type === "ok" ? "status-ok" : "status-error"} mt-4`}>
              {status.message}
            </p>
          )}

          <button onClick={handleSignup} className="btn-primary mt-6 w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="mt-4 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}