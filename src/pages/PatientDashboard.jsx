// src/pages/PatientDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, User, Heart, Activity, ArrowRight, Bell, FileText, ClipboardList } from 'lucide-react';
import { appointmentAPI, doctorAPI } from '../services/api';

export default function PatientDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentDoctors, setRecentDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [appointmentsRes, doctorsRes] = await Promise.all([
        appointmentAPI.getMy(),
        doctorAPI.getAll({ limit: 6 })
      ]);
      
      setUpcomingAppointments(appointmentsRes.data.filter(apt => apt.status === 'booked').slice(0, 3));
      setRecentDoctors(doctorsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Upcoming Appointments', value: upcomingAppointments.length, icon: Calendar, color: 'bg-blue-500' },
    { label: 'Total Visits', value: '12', icon: Activity, color: 'bg-green-500' },
    { label: 'Medical Records', value: '8', icon: FileText, color: 'bg-purple-500' },
    { label: 'Prescriptions', value: '15', icon: ClipboardList, color: 'bg-pink-500' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
              <p className="text-blue-100">Here's your health overview</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-lg hover:shadow-lg transition"
                >
                  {user?.name?.charAt(0) || 'U'}
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-sm text-blue-100">{user?.email}</p>
                    </div>
                    <div className="p-2">
                      <button 
                        onClick={() => navigate('/profile')}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-700"
                      >
                        View Profile
                      </button>
                      <button 
                        onClick={() => navigate('/medical-records')}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-700"
                      >
                        Medical Records
                      </button>
                      <button 
                        onClick={() => navigate('/prescriptions')}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-700"
                      >
                        Prescriptions
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Upcoming Appointments</h2>
            <button 
              onClick={() => navigate('/appointments')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No upcoming appointments</p>
              <button 
                onClick={() => navigate('/doctors')}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Book Appointment
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{appointment.doctorId?.name || 'Doctor'}</p>
                      <p className="text-xs text-gray-600">{appointment.doctorId?.specialty || 'General'}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{new Date(appointment.date).toLocaleDateString()}</div>
                  <div className="text-sm font-semibold text-blue-600">{appointment.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recommended Doctors */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Available Doctors</h2>
            <button 
              onClick={() => navigate('/doctors')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentDoctors.map((doctor, index) => (
              <div 
                key={index} 
                className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{doctor.name}</p>
                      <p className="text-xs text-gray-600">{doctor.specialty}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500">{doctor.experience}y exp</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    doctor.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {doctor.available ? 'Available' : 'Busy'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">₹{doctor.fee}</span>
                  <button 
                    onClick={() => navigate(`/book/${doctor._id}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}