// src/components/Doctor/TodayStatsCard/TodayStatsCard.jsx
import React from 'react';
import { Users, CheckCircle, Clock, TrendingUp, Calendar } from 'lucide-react';

const TodayStatsCard = ({ stats = {} }) => {
  const {
    totalAppointments = 0,
    completed = 0,
    pending = 0,
    revenue = 0,
    avgWaitTime = 0
  } = stats;

  const completionRate = totalAppointments > 0 
    ? Math.round((completed / totalAppointments) * 100) 
    : 0;

  const statsData = [
    {
      label: "Today's Patients",
      value: totalAppointments,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      label: 'Completed',
      value: completed,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      label: 'In Queue',
      value: pending,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      label: 'Revenue Today',
      value: `₹${revenue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
            <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Performance Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-600" />
          Today's Performance
        </h3>
        
        <div className="space-y-4">
          {/* Completion Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Completion Rate</span>
              <span className="text-sm font-bold text-blue-600">{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2.5 rounded-full transition-all"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>

          {/* Average Wait Time */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Avg Wait Time</span>
              <span className="text-sm font-bold text-yellow-600">{avgWaitTime}m</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2.5 rounded-full transition-all"
                style={{ width: `${Math.min((avgWaitTime / 60) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{completed}</p>
              <p className="text-xs text-gray-600 mt-1">Seen</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{pending}</p>
              <p className="text-xs text-gray-600 mt-1">Waiting</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{totalAppointments}</p>
              <p className="text-xs text-gray-600 mt-1">Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Time Distribution */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
        <h3 className="text-lg font-bold mb-4">Time Distribution</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-blue-100 mb-1">Morning</p>
            <p className="text-2xl font-bold">8</p>
          </div>
          <div>
            <p className="text-sm text-blue-100 mb-1">Afternoon</p>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div>
            <p className="text-sm text-blue-100 mb-1">Evening</p>
            <p className="text-2xl font-bold">3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayStatsCard;