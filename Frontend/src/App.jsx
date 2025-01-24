import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Event from "./pages/EventForm";
// import SidebarDemo from '../Backup/SidebarDemo'
import AllEventsPage from "./pages/AllEventsPage";
import EventForm from "./pages/EventForm";
import EventInfo from "./pages/EventInfo";
import Slidebar from "./components/Slidebar";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEvents from "./pages/AdminEvents";
import AdminLogin from './pages/AdminLogin';
// import Login from './components/Login'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/admin-events" element={<AdminEvents />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<Event />} />
        <Route path="/events" element={<AllEventsPage />} />
        <Route path="/events-form" element={<EventForm />} />
        <Route path="/event/:eventId" element={<EventInfo />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/slidebar" element={<Slidebar />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </div>
  );
};

export default App;
