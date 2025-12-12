// src/components/Common/Sidebar/Sidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { 
  Home, 
  Search, 
  Calendar, 
  FileText,
  ClipboardList,
  LogOut,
  Activity 
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { label: 'Dashboard', icon: Home, path: '/dashboard' },
    { label: 'Find Doctors', icon: Search, path: '/doctors' },
    { label: 'Appointments', icon: Calendar, path: '/appointments' },

    // ⭐ NEW: Book Appointment added here
    { label: 'Book Appointment', icon: Calendar, path: '/book-appointment' },

    { label: 'Medical Records', icon: FileText, path: '/medical-records' },
    { label: 'Prescriptions', icon: ClipboardList, path: '/prescriptions' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 shadow-lg flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <Activity className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SmartCare AI
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              isActive(item.path)
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
