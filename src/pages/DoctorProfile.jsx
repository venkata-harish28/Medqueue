// src/pages/DoctorProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doctorAPI } from '../services/api';
import { Star, MapPin, Calendar, Clock, Award, Languages, BookOpen, ArrowLeft, Video } from 'lucide-react';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const fetchDoctor = async () => {
    try {
      const { data } = await doctorAPI.getById(id);
      setDoctor(data);
    } catch (error) {
      console.error('Error fetching doctor:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Doctor not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Search
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {doctor.name.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
                    <p className="text-xl text-gray-600 mb-3">{doctor.specialty}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="font-semibold">{doctor.rating || '4.8'}</span>
                        <span className="text-gray-500 ml-1">(128 reviews)</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Award className="w-5 h-5 mr-1" />
                        <span>{doctor.experience}+ years</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  doctor.available 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {doctor.available ? 'Available Today' : 'Busy'}
                </span>
              </div>

              {/* Quick Info */}
              <div className="grid md:grid-cols-2 gap-4 mb-8 p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Hospital</p>
                    <p className="font-semibold">{doctor.hospitalId?.name || 'City General Hospital'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Consultation Time</p>
                    <p className="font-semibold">15-20 mins</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Languages className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Languages</p>
                    <p className="font-semibold">English, Hindi</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Education</p>
                    <p className="font-semibold">MBBS, MD</p>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About Doctor</h2>
                <p className="text-gray-700 leading-relaxed">
                  Dr. {doctor.name} is a highly experienced {doctor.specialty} specialist with over {doctor.experience} years of practice. 
                  Known for compassionate care and expertise in treating complex cases. Committed to providing personalized 
                  treatment plans and staying updated with the latest medical advancements.
                </p>
              </div>

              {/* Specializations */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Specializations</h2>
                <div className="flex flex-wrap gap-2">
                  {['Heart Disease', 'Cardiac Surgery', 'Preventive Care', 'ECG Analysis', 'Stress Testing'].map((spec, i) => (
                    <span key={i} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Working Hours */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Working Hours</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { day: 'Monday - Friday', time: '9:00 AM - 5:00 PM' },
                    { day: 'Saturday', time: '9:00 AM - 1:00 PM' },
                    { day: 'Sunday', time: 'Closed' }
                  ].map((schedule, i) => (
                    <div key={i} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Book Appointment</h3>
              
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <div className="text-sm text-gray-600 mb-1">Consultation Fee</div>
                <div className="text-3xl font-bold text-blue-600">₹{doctor.fee}</div>
              </div>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => navigate(`/book/${doctor._id}`)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book In-Person Visit
                </button>
                
                <button className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center justify-center">
                  <Video className="w-5 h-5 mr-2" />
                  Video Consultation
                </button>
              </div>

              <div className="p-4 bg-yellow-50 rounded-xl">
                <div className="flex items-start space-x-2">
                  <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-yellow-900 text-sm">Quick Booking</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Next available slot: Today, 3:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;