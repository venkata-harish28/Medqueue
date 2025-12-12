// src/App.jsx
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
import Profile from './pages/Profile';
import MedicalRecords from './pages/MedicalRecords';
import Prescriptions from './pages/Prescriptions';

import Sidebar from './components/Common/Sidebar/Sidebar';
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

  // Pages where sidebar should be hidden
  const hideLayout = ['/login', '/register', '/'].includes(location.pathname);
  
  // Show sidebar only for logged-in patients
  const showSidebar = user && user.role === 'patient' && !hideLayout;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SIDEBAR (only for logged-in patients) */}
      {showSidebar && <Sidebar />}

      {/* Main Content with appropriate padding */}
      <div className={showSidebar ? 'ml-64' : ''}>
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
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/medical-records"
            element={
              <PrivateRoute>
                <MedicalRecords />
              </PrivateRoute>
            }
          />

          <Route
            path="/prescriptions"
            element={
              <PrivateRoute>
                <Prescriptions />
              </PrivateRoute>
            }
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
    </div>
  );
}

export default App;