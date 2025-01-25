import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EventForm from "./pages/EventForm";
// import SidebarDemo from '../Backup/SidebarDemo'
import AllEventsPage from "./pages/AllEventsPage";
import EventInfo from "./pages/EventInfo";
import Slidebar from "./components/Slidebar";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEvents from "./pages/AdminEvents";
import AdminLogin from './pages/AdminLogin';
import AdminEventsList from './pages/AdminEventsList';
import AdminUsers from './pages/AdminUsers';
import Navbar from './components/Navbar';
// import Login from './components/Login'
const App = () => {
  return (
    <>
      <Navbar />
      {/* Add margin-top to account for fixed navbar */}
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/events" element={<AdminEventsList />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/events-form" element={<EventForm />} />
          <Route path="/edit-event/:id" element={<EventForm />} />
          <Route path="/event/:id" element={<EventInfo />} />
          
          {/* Public Routes */}
          <Route path="/events" element={<AllEventsPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
