import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Import pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import SearchDoctors from './pages/SearchDoctors';
import DoctorProfile from './pages/DoctorProfile';
import BookAppointment from './pages/BookAppointment';
import AppointmentHistory from './pages/AppointmentHistory';
import LiveQueue from './pages/LiveQueue';
import AdminDashboard from './pages/AdminDashboard';

import Navbar from './components/Navbar';
import VoiceAssistant from './components/VoiceAssistant';


// ---------------------- PRIVATE ROUTE ----------------------
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );

  return user ? children : <Navigate to="/login" />;
};


// ---------------------- ADMIN ROUTE ----------------------
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );

  return user && user.role === 'admin'
    ? children
    : <Navigate to="/dashboard" />;
};


// ---------------------- DASHBOARD ROUTER ----------------------
const DashboardRouter = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  switch (user.role) {
    case 'doctor':
      return <DoctorDashboard />;

    case 'admin':
      return <Navigate to="/admin" />;

    default:
      return <PatientDashboard />;
  }
};


// ---------------------- APP COMPONENT ----------------------
function App() {
  const { user } = useAuth();
  const location = useLocation();

  // Pages where navbar should be hidden
  const hideNavbar = ['/login', '/register', '/', '/dashboard'].includes(
    location.pathname
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR (only for logged-in users & visible pages) */}
      {user && !hideNavbar && <Navbar />}

      <Routes>

        {/* PUBLIC LANDING PAGE */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Landing />}
        />

        {/* DASHBOARD ROUTE (Auto-router based on role) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardRouter />
            </PrivateRoute>
          }
        />

        {/* AUTH ROUTES */}
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />

        {/* PATIENT ROUTES */}
        <Route
          path="/doctors"
          element={
            <PrivateRoute>
              <SearchDoctors />
            </PrivateRoute>
          }
        />

        <Route
          path="/doctors/:id"
          element={
            <PrivateRoute>
              <DoctorProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/book/:doctorId"
          element={
            <PrivateRoute>
              <BookAppointment />
            </PrivateRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <PrivateRoute>
              <AppointmentHistory />
            </PrivateRoute>
          }
        />

        <Route
          path="/queue/:doctorId"
          element={
            <PrivateRoute>
              <LiveQueue />
            </PrivateRoute>
          }
        />

        {/* ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

      </Routes>

      {/* VOICE ASSISTANT (logged-in only) */}
      {user && <VoiceAssistant />}
    </div>
  );
}

export default App;
