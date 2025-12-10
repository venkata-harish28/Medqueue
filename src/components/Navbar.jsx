// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, Home, Search, Clock, Calendar, LogOut, Shield } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">SmartCare AI</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition">
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>

            <Link to="/doctors" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition">
              <Search className="w-5 h-5" />
              <span>Find Doctors</span>
            </Link>

            <Link to="/appointments" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition">
              <Calendar className="w-5 h-5" />
              <span>Appointments</span>
            </Link>

            {user?.role === 'admin' && (
              <Link to="/admin" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition">
                <Shield className="w-5 h-5" />
                <span>Admin</span>
              </Link>
            )}

            <div className="flex items-center space-x-3 pl-6 border-l">
              <span className="text-gray-700 font-medium">{user?.name}</span>
              <button onClick={handleLogout} className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;