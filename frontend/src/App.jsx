import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StartupDashboard from "./pages/StartupDashboard";
import InvestorDashboard from "./pages/InvestorDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/startup" element={<StartupDashboard />} />
        <Route path="/investor" element={<InvestorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;