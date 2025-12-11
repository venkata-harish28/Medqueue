import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Users, Clock, Activity, TrendingUp, Bell, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with actual API calls
  const stats = [
    { label: 'Today\'s Patients', value: '23', change: '+3', icon: Users, color: 'bg-blue-500' },
    { label: 'Completed', value: '15', change: '+5', icon: CheckCircle, color: 'bg-green-500' },
    { label: 'In Queue', value: '8', change: '-2', icon: Clock, color: 'bg-yellow-500' },
    { label: 'Revenue Today', value: '₹11,500', change: '+12%', icon: TrendingUp, color: 'bg-purple-500' }
  ];

  const todayAppointments = [
    { 
      id: 1,
      patient: 'Rajesh Kumar',
      time: '10:00 AM',
      tokenNumber: 'T-001',
      status: 'completed',
      symptoms: 'Regular checkup'
    },
    { 
      id: 2,
      patient: 'Priya Sharma',
      time: '10:30 AM',
      tokenNumber: 'T-002',
      status: 'in-progress',
      symptoms: 'Chest pain, breathing difficulty'
    },
    { 
      id: 3,
      patient: 'Amit Patel',
      time: '11:00 AM',
      tokenNumber: 'T-003',
      status: 'waiting',
      symptoms: 'Fever and headache'
    },
    { 
      id: 4,
      patient: 'Sneha Reddy',
      time: '11:30 AM',
      tokenNumber: 'T-004',
      status: 'waiting',
      symptoms: 'Follow-up consultation'
    },
    { 
      id: 5,
      patient: 'Vikram Singh',
      time: '2:00 PM',
      tokenNumber: 'T-005',
      status: 'scheduled',
      symptoms: 'Joint pain'
    }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      completed: 'bg-green-100 text-green-700',
      'in-progress': 'bg-blue-100 text-blue-700',
      waiting: 'bg-yellow-100 text-yellow-700',
      scheduled: 'bg-gray-100 text-gray-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return styles[status] || styles.scheduled;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Activity className="w-4 h-4 animate-pulse" />;
      case 'waiting': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Good Morning, Dr. {user?.name?.split(' ')[1] || user?.name}!</h1>
              <p className="text-indigo-100">You have 8 patients in queue today</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold">
                {user?.name?.charAt(0) || 'D'}
              </div>
            </div>
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
                <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-semibold">Mark as Seen</div>
                <div className="text-sm text-gray-600">Current patient</div>
              </div>
            </div>
          </button>

          <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold">View Queue</div>
                <div className="text-sm text-gray-600">8 patients waiting</div>
              </div>
            </div>
          </button>

          <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="font-semibold">Manage Schedule</div>
                <div className="text-sm text-gray-600">Set availability</div>
              </div>
            </div>
          </button>
        </div>

        {/* Today's Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Today's Appointments</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg transition ${activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setActiveTab('waiting')}
                  className={`px-4 py-2 rounded-lg transition ${activeTab === 'waiting' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
                >
                  Waiting
                </button>
                <button 
                  onClick={() => setActiveTab('completed')}
                  className={`px-4 py-2 rounded-lg transition ${activeTab === 'completed' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              {todayAppointments.map((appointment) => (
                <div 
                  key={appointment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-600">
                      {appointment.tokenNumber.split('-')[1]}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-semibold text-gray-800">{appointment.patient}</p>
                        <span className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 ${getStatusBadge(appointment.status)}`}>
                          {getStatusIcon(appointment.status)}
                          {appointment.status.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{appointment.symptoms}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">{appointment.time}</p>
                    <p className="text-xs text-gray-500">{appointment.tokenNumber}</p>
                  </div>

                  {appointment.status === 'in-progress' && (
                    <button className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
                      Complete
                    </button>
                  )}
                  {appointment.status === 'waiting' && (
                    <button className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium">
                      Start
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Preview */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-bold mb-4">This Week's Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Patients</span>
                <span className="font-semibold">124</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Wait Time</span>
                <span className="font-semibold">18 mins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Patient Satisfaction</span>
                <span className="font-semibold text-green-600">96%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Revenue</span>
                <span className="font-semibold">₹62,000</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
            <h3 className="text-lg font-bold mb-4">AI Insights</h3>
            <div className="space-y-3">
              <div className="bg-white/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Peak Hours Alert</p>
                    <p className="text-xs text-indigo-100 mt-1">Consider extending afternoon hours on Tuesdays</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-5 h-5 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Patient Growth</p>
                    <p className="text-xs text-indigo-100 mt-1">15% increase in new patients this month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}