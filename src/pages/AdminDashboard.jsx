// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { Users, Activity, Calendar, DollarSign, TrendingUp, UserCheck, UserX, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Users', value: '2,345', change: '+12%', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Doctors', value: '156', change: '+8%', icon: UserCheck, color: 'bg-green-500' },
    { label: 'Appointments Today', value: '489', change: '+23%', icon: Calendar, color: 'bg-purple-500' },
    { label: 'Revenue', value: '₹2.4L', change: '+15%', icon: DollarSign, color: 'bg-yellow-500' }
  ];

  const recentActivities = [
    { type: 'user', message: 'New patient registered: John Doe', time: '5 mins ago', icon: UserCheck },
    { type: 'doctor', message: 'Dr. Sarah verified successfully', time: '12 mins ago', icon: UserCheck },
    { type: 'appointment', message: '45 appointments booked in last hour', time: '1 hour ago', icon: Calendar },
    { type: 'alert', message: 'Server performance optimal', time: '2 hours ago', icon: Activity }
  ];

  const pendingVerifications = [
    { name: 'Dr. Michael Chen', specialty: 'Neurology', submitted: '2 days ago' },
    { name: 'Dr. Priya Sharma', specialty: 'Pediatrics', submitted: '1 day ago' },
    { name: 'Dr. Rajesh Kumar', specialty: 'Orthopedics', submitted: '3 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">Monitor and manage platform operations</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
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

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {['overview', 'users', 'doctors', 'reports'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 border-b-2 font-medium transition ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Recent Activities</h3>
                  <div className="space-y-3">
                    {recentActivities.map((activity, i) => (
                      <div key={i} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <activity.icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">{activity.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Verifications */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Pending Doctor Verifications</h3>
                  <div className="space-y-3">
                    {pendingVerifications.map((doc, i) => (
                      <div key={i} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold">{doc.name}</p>
                            <p className="text-sm text-gray-600">{doc.specialty}</p>
                          </div>
                          <span className="text-xs text-gray-500">{doc.submitted}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition">
                            Approve
                          </button>
                          <button className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition">
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h3 className="text-lg font-bold mb-4">User Management</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {[1, 2, 3].map((i) => (
                        <tr key={i}>
                          <td className="px-4 py-3">User {i}</td>
                          <td className="px-4 py-3">user{i}@example.com</td>
                          <td className="px-4 py-3">Patient</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                              Active
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button className="text-blue-600 hover:underline text-sm">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'doctors' && (
              <div>
                <h3 className="text-lg font-bold mb-4">Doctor Management</h3>
                <p className="text-gray-600">Manage doctor profiles and verifications</p>
              </div>
            )}

            {activeTab === 'reports' && (
              <div>
                <h3 className="text-lg font-bold mb-4">Analytics & Reports</h3>
                <p className="text-gray-600">View detailed analytics and generate reports</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;