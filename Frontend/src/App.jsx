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
import MyEvents from './pages/MyEvents';
import Footer from './components/Footer';
import About from './pages/About';
// import Login from './components/Login'
import Cricket from './pages/sports/Cricket';
import Football from './pages/sports/Football';
import Basketball from './pages/sports/Basketball';
import Badminton from './pages/sports/Badminton';

const App = () => {
  return (
    <>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <div className="min-h-screen">
            <Routes>
              <Route path="login" element={<AdminLogin />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="events" element={<AdminEventsList />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="events-form" element={<EventForm />} />
              <Route path="edit-event/:id" element={<EventForm />} />
              <Route path="event/:id" element={<EventInfo />} />
            </Routes>
          </div>
        } />

        {/* User Routes */}
        <Route path="/*" element={
          <div>
            <Navbar />
            <div className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="events" element={<AllEventsPage />} />
                <Route path="event/:id" element={<EventInfo />} />
                <Route path="my-events" element={<MyEvents />} />
                <Route path="about" element={<About />} />
                <Route path="sports/cricket" element={<Cricket />} />
                <Route path="sports/football" element={<Football />} />
                <Route path="sports/basketball" element={<Basketball />} />
                <Route path="sports/badminton" element={<Badminton />} />
              </Routes>
            </div>
            <Footer />
          </div>
        } />
      </Routes>
    </>
  );
};

export default App;
