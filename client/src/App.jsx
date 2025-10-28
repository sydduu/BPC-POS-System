import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import RegistrationPage from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RoomTables from "./pages/RoomTables";
import Bookings from "./pages/Bookings";
import POS from "./pages/POS";
import Reports from "./pages/Reports";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rooms" element={<RoomTables />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/pos" element={<POS />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
