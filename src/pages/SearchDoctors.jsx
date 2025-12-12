// src/pages/SearchDoctors.jsx
// ========================================
import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { doctorAPI } from '../services/api';
import DoctorCard from '../components/Patient/DoctorCard/DoctorCard';

const SearchDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, [search, specialty]);

  const fetchDoctors = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (specialty) params.specialty = specialty;
      
      const { data } = await doctorAPI.getAll(params);
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Doctors</h1>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Specialties</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="General Physician">General Physician</option>
          <option value="Neurology">Neurology</option>
          <option value="Pediatrics">Pediatrics</option>
        </select>
      </div>

      {loading ? (
        <p>Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <p className="text-center text-gray-500">No doctors found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDoctors;