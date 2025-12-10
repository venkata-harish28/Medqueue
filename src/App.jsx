import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SearchDoctors from './pages/SearchDoctors';
import DoctorProfile from './pages/DoctorProfile';
import BookAppointment from './pages/BookAppointment';
import AppointmentHistory from './pages/AppointmentHistory';
import LiveQueue from './pages/LiveQueue';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import VoiceAssistant from './components/VoiceAssistant';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  return user && user.role === 'admin' ? children : <Navigate to="/dashboard" />;
};

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Navbar />}
      
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/doctors" element={<PrivateRoute><SearchDoctors /></PrivateRoute>} />
        <Route path="/doctors/:id" element={<PrivateRoute><DoctorProfile /></PrivateRoute>} />
        <Route path="/book/:doctorId" element={<PrivateRoute><BookAppointment /></PrivateRoute>} />
        <Route path="/appointments" element={<PrivateRoute><AppointmentHistory /></PrivateRoute>} />
        <Route path="/queue/:doctorId" element={<PrivateRoute><LiveQueue /></PrivateRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>

      {user && <VoiceAssistant />}
    </div>
  );
}

export default App;