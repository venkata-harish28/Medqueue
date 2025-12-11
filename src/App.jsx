import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
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

  // FIX: redirect to login if NOT logged in
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


// ---------------------- APP COMPONENT ----------------------
function App() {
  const { user } = useAuth();
  const location = useLocation();

  // Hide Navbar on Dashboard ONLY
  const hideNavbar = location.pathname === "/dashboard";

  return (
    <div className="min-h-screen bg-red-200">

      {/* Hide navbar on dashboard */}
      {user && !hideNavbar && <Navbar />}

      <Routes>

        {/* LANDING PAGE = DASHBOARD */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" />}
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />

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

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

      </Routes>

      {/* Voice Assistant only when logged in */}
      {user && <VoiceAssistant />}
    </div>
  );
}

export default App;
