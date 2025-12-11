import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, DollarSign, Clock, Calendar, Heart, Brain, Users, Stethoscope, X } from 'lucide-react';

export default function DoctorSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    availability: 'all',
    experience: 'all',
    gender: 'all',
    rating: 'all',
    priceRange: 'all'
  });

  const specialties = [
    { id: 'all', name: 'All Specialties', icon: Stethoscope },
    { id: 'cardiology', name: 'Cardiology', icon: Heart },
    { id: 'neurology', name: 'Neurology', icon: Brain },
    { id: 'orthopedics', name: 'Orthopedics', icon: Users },
    { id: 'general', name: 'General Physician', icon: Stethoscope },
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      experience: 15,
      rating: 4.9,
      reviews: 234,
      fee: 500,
      available: true,
      hospital: 'City General Hospital',
      nextAvailable: '2:00 PM Today',
      languages: ['English', 'Spanish'],
      education: 'MBBS, MD Cardiology'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      experience: 20,
      rating: 4.8,
      reviews: 189,
      fee: 700,
      available: true,
      hospital: 'Metro Medical Center',
      nextAvailable: '4:30 PM Today',
      languages: ['English', 'Mandarin'],
      education: 'MBBS, MD Neurology'
    },
    {
      id: 3,
      name: 'Dr. Priya Sharma',
      specialty: 'General Physician',
      experience: 10,
      rating: 4.7,
      reviews: 312,
      fee: 300,
      available: true,
      hospital: 'City General Hospital',
      nextAvailable: '11:00 AM Tomorrow',
      languages: ['English', 'Hindi'],
      education: 'MBBS, MD Medicine'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Find Your Doctor</h1>
          <p className="text-blue-100 text-lg">Search from 500+ qualified healthcare professionals</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by doctor name, specialty, or condition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition flex items-center justify-center space-x-2"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition">
              Search
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Availability</label>
                <select 
                  value={filters.availability}
                  onChange={(e) => setFilters({...filters, availability: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="today">Available Today</option>
                  <option value="tomorrow">Available Tomorrow</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Experience</label>
                <select 
                  value={filters.experience}
                  onChange={(e) => setFilters({...filters, experience: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="5+">5+ Years</option>
                  <option value="10+">10+ Years</option>
                  <option value="15+">15+ Years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <select 
                  value={filters.rating}
                  onChange={(e) => setFilters({...filters, rating: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Ratings</option>
                  <option value="4.5+">4.5+ Stars</option>
                  <option value="4.0+">4.0+ Stars</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Specialty Tabs */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-4">
            {specialties.map((spec) => (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecialty(spec.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition whitespace-nowrap ${
                  selectedSpecialty === spec.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:shadow-md'
                }`}
              >
                <spec.icon className="w-5 h-5" />
                <span>{spec.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden group">
              <div className="p-6">
                {/* Doctor Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition">
                      {doctor.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{doctor.specialty}</p>
                    <p className="text-xs text-gray-500">{doctor.education}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    doctor.available 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {doctor.available ? 'Available' : 'Busy'}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{doctor.experience} years exp</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Star className="w-4 h-4 mr-2 text-yellow-500 fill-yellow-500" />
                    <span>{doctor.rating} ({doctor.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{doctor.hospital}</span>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center text-sm text-blue-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Next: {doctor.nextAvailable}</span>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {doctor.languages.map((lang, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                      {lang}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <div className="text-xs text-gray-500">Consultation Fee</div>
                    <div className="text-2xl font-bold text-blue-600">₹{doctor.fee}</div>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}