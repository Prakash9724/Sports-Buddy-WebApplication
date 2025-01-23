import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Event from './pages/EventForm'
import SidebarDemo from './pages/SidebarDemo'
import AllEventsPage from './pages/AllEventsPage'
// import Login from './components/Login'
const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<SidebarDemo />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<Event />} />
        <Route path="/events" element={<AllEventsPage />} />
        
      </Routes>
    </div>
  )
}

export default App