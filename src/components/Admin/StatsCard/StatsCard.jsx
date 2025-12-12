// src/components/Admin/StatsCard/StatsCard.jsx
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ label, value, change, icon: Icon, color = 'bg-blue-500', trend = 'up' }) => {
  const isPositive = trend === 'up';

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="text-white" size={24} />
        </div>
        <div className={`flex items-center text-sm font-semibold ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
          {change}
        </div>
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{label}</h3>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default StatsCard;