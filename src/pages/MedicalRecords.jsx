// src/pages/MedicalRecords.jsx
import React, { useState } from 'react';
import { FileText, Download, Eye, Upload, Plus, Calendar, User } from 'lucide-react';

const MedicalRecords = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [records] = useState([
    {
      id: 1,
      title: 'Blood Test Report',
      date: '2024-12-10',
      doctor: 'Dr. Sarah Johnson',
      type: 'Lab Report',
      size: '2.3 MB'
    },
    {
      id: 2,
      title: 'X-Ray - Chest',
      date: '2024-12-05',
      doctor: 'Dr. Michael Chen',
      type: 'Radiology',
      size: '5.1 MB'
    },
    {
      id: 3,
      title: 'Prescription',
      date: '2024-11-28',
      doctor: 'Dr. Priya Sharma',
      type: 'Prescription',
      size: '0.8 MB'
    },
    {
      id: 4,
      title: 'ECG Report',
      date: '2024-11-15',
      doctor: 'Dr. Sarah Johnson',
      type: 'Diagnostic',
      size: '1.2 MB'
    }
  ]);

  const getTypeColor = (type) => {
    const colors = {
      'Lab Report': 'bg-blue-100 text-blue-700',
      'Radiology': 'bg-purple-100 text-purple-700',
      'Prescription': 'bg-green-100 text-green-700',
      'Diagnostic': 'bg-orange-100 text-orange-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Medical Records</h1>
          <p className="text-blue-100">Manage and view your medical documents</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex gap-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Types</option>
              <option>Lab Report</option>
              <option>Radiology</option>
              <option>Prescription</option>
              <option>Diagnostic</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
              <option>All Time</option>
            </select>
          </div>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Record
          </button>
        </div>

        {/* Records Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map((record) => (
            <div key={record.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(record.type)}`}>
                  {record.type}
                </span>
              </div>

              <h3 className="font-semibold text-gray-800 mb-2">{record.title}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(record.date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  {record.doctor}
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-4">Size: {record.size}</div>

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">Upload Medical Record</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Record Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Blood Test Report"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Record Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Lab Report</option>
                  <option>Radiology</option>
                  <option>Prescription</option>
                  <option>Diagnostic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Upload File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;