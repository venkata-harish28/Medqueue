import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, User, Heart, Activity, Bell, Search, TrendingUp, ArrowRight } from 'lucide-react';
import { appointmentAPI, doctorAPI } from '../services/api';

export default function PatientDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentDoctors, setRecentDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [appointmentsRes, doctorsRes] = await Promise.all([
        appointmentAPI.getMy(),
        doctorAPI.getAll({ limit: 3 })
      ]);
      
      setUpcomingAppointments(appointmentsRes.data.filter(apt => apt.status === 'booked').slice(0, 3));
      setRecentDoctors(doctorsRes.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Upcoming Appointments', value: upcomingAppointments.length, icon: Calendar, color: 'bg-blue-500' },
    { label: 'Total Visits', value: '12', icon: Activity, color: 'bg-green-500' },
    { label: 'Doctors Consulted', value: '5', icon: User, color: 'bg-purple-500' },
    { label: 'Health Score', value: '85%', icon: Heart, color: 'bg-pink-500' }
  ];

  const quickActions = [
    { label: 'Find Doctors', icon: Search, action: () => navigate('/doctors'), color: 'from-blue-500 to-blue-600' },
    { label: 'My Appointments', icon: Calendar, action: () => navigate('/appointments'), color: 'from-purple-500 to-purple-600' },
    { label: 'Health Records', icon: Activity, action: () => {}, color: 'from-green-500 to-green-600' }
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
            <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
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

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`bg-gradient-to-r ${action.color} text-white p-6 rounded-xl hover:shadow-lg transition group`}
              >
                <action.icon className="w-8 h-8 mb-3" />
                <div className="font-semibold">{action.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
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
              <div className="space-y-3">
                {upcomingAppointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{appointment.doctorId?.name || 'Doctor'}</p>
                        <p className="text-sm text-gray-600">{appointment.doctorId?.specialty || 'General'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{new Date(appointment.date).toLocaleDateString()}</p>
                      <p className="text-sm font-semibold text-blue-600">{appointment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recommended Doctors */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Recommended Doctors</h2>
            <div className="space-y-4">
              {recentDoctors.map((doctor, index) => (
                <div 
                  key={index} 
                  onClick={() => navigate(`/doctors/${doctor._id}`)}
                  className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 cursor-pointer hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{doctor.name}</p>
                        <p className="text-xs text-gray-600">{doctor.specialty}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">{doctor.experience}y exp</span>
                    <span className="text-sm font-bold text-blue-600">₹{doctor.fee}</span>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={() => navigate('/doctors')}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition font-semibold"
              >
                Browse All Doctors
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}