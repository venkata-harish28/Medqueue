// src/pages/Prescriptions.jsx
import React, { useState } from 'react';
import { Pill, Calendar, User, Clock, Download, Eye, Search } from 'lucide-react';

const Prescriptions = () => {
  const [prescriptions] = useState([
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      date: '2024-12-10',
      diagnosis: 'Seasonal Flu',
      medicines: [
        { name: 'Paracetamol 500mg', dosage: '1 tablet', frequency: 'Twice daily', duration: '5 days' },
        { name: 'Vitamin C', dosage: '1 tablet', frequency: 'Once daily', duration: '7 days' }
      ],
      status: 'active'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      date: '2024-11-25',
      diagnosis: 'Hypertension',
      medicines: [
        { name: 'Amlodipine 5mg', dosage: '1 tablet', frequency: 'Once daily', duration: '30 days' },
        { name: 'Aspirin 75mg', dosage: '1 tablet', frequency: 'Once daily', duration: '30 days' }
      ],
      status: 'active'
    },
    {
      id: 3,
      doctor: 'Dr. Priya Sharma',
      date: '2024-11-10',
      diagnosis: 'Acid Reflux',
      medicines: [
        { name: 'Omeprazole 20mg', dosage: '1 capsule', frequency: 'Before breakfast', duration: '14 days' }
      ],
      status: 'completed'
    }
  ]);

  const [selectedPrescription, setSelectedPrescription] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Prescriptions</h1>
          <p className="text-blue-100">View and manage your medical prescriptions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-6 flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search prescriptions..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Prescriptions List */}
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <div key={prescription.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Pill className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{prescription.diagnosis}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {prescription.doctor}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(prescription.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  prescription.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                </span>
              </div>

              {/* Medicines */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Medicines ({prescription.medicines.length})</h4>
                <div className="space-y-3">
                  {prescription.medicines.map((medicine, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{medicine.name}</p>
                        <p className="text-gray-600">{medicine.dosage} • {medicine.frequency} • {medicine.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedPrescription(prescription)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 text-sm"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 text-sm">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prescription Details Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Prescription Details</h2>
                <p className="text-gray-600">{selectedPrescription.diagnosis}</p>
              </div>
              <button 
                onClick={() => setSelectedPrescription(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Doctor</p>
                  <p className="font-semibold">{selectedPrescription.doctor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Date</p>
                  <p className="font-semibold">{new Date(selectedPrescription.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Prescribed Medicines</h3>
                <div className="space-y-4">
                  {selectedPrescription.medicines.map((medicine, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-800 mb-2">{medicine.name}</p>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-gray-600">Dosage</p>
                          <p className="font-medium">{medicine.dosage}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Frequency</p>
                          <p className="font-medium">{medicine.frequency}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Duration</p>
                          <p className="font-medium">{medicine.duration}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Download Prescription
                </button>
                <button 
                  onClick={() => setSelectedPrescription(null)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prescriptions;