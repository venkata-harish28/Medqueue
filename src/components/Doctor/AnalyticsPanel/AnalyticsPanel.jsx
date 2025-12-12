// src/components/Doctor/AnalyticsPanel/AnalyticsPanel.jsx
import React from 'react';
import { TrendingUp, Users, Calendar, Clock, DollarSign, Star } from 'lucide-react';

const AnalyticsPanel = ({ data = {} }) => {
  const {
    totalPatients = 0,
    weeklyPatients = 0,
    avgConsultationTime = 0,
    revenue = 0,
    patientSatisfaction = 0,
    completionRate = 0
  } = data;

  const metrics = [
    {
      label: 'Total Patients',
      value: totalPatients,
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      label: 'This Week',
      value: weeklyPatients,
      change: '+8%',
      icon: Calendar,
      color: 'bg-green-500',
      bgLight: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      label: 'Avg Consultation',
      value: `${avgConsultationTime}m`,
      change: '-5%',
      icon: Clock,
      color: 'bg-purple-500',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      label: 'Revenue',
      value: `₹${revenue.toLocaleString()}`,
      change: '+15%',
      icon: DollarSign,
      color: 'bg-yellow-500',
      bgLight: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      label: 'Satisfaction',
      value: `${patientSatisfaction}%`,
      change: '+3%',
      icon: Star,
      color: 'bg-pink-500',
      bgLight: 'bg-pink-50',
      textColor: 'text-pink-600'
    },
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      change: '+2%',
      icon: TrendingUp,
      color: 'bg-indigo-500',
      bgLight: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Performance Analytics</h2>
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
          <option>This year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className={`${metric.bgLight} p-4 rounded-xl border border-gray-100`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`${metric.color} p-2 rounded-lg`}>
                <metric.icon className="text-white w-5 h-5" />
              </div>
              <span className={`text-sm font-semibold ${
                metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
            <p className={`text-2xl font-bold ${metric.textColor}`}>{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Chart Area */}
      <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Patient Trends</h3>
        <div className="h-48 flex items-end justify-between space-x-2">
          {[40, 65, 55, 80, 70, 90, 85].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg transition-all hover:opacity-80"
                style={{ height: `${height}%` }}
              />
              <span className="text-xs text-gray-600 mt-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;