import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  Star,
  MapPin,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Bell,
  Activity,
  Search
} from 'lucide-react';

// Mock Doctor Data
const DOCTORS_DATA = [
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
    education: 'MBBS, MD Cardiology',
    languages: ['English', 'Spanish'],
    avgWaitTime: 15,
    image: null
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
    education: 'MBBS, MD Neurology',
    languages: ['English', 'Mandarin'],
    avgWaitTime: 20,
    image: null
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
    education: 'MBBS, MD Medicine',
    languages: ['English', 'Hindi'],
    avgWaitTime: 12,
    image: null
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    experience: 18,
    rating: 4.9,
    reviews: 267,
    fee: 600,
    available: false,
    hospital: 'Metro Medical Center',
    education: 'MBBS, MS Orthopedics',
    languages: ['English'],
    avgWaitTime: 18,
    image: null
  },
  {
    id: 5,
    name: 'Dr. Aisha Khan',
    specialty: 'Pediatrics',
    experience: 12,
    rating: 4.8,
    reviews: 198,
    fee: 400,
    available: true,
    hospital: 'Children Hospital',
    education: 'MBBS, MD Pediatrics',
    languages: ['English', 'Urdu'],
    avgWaitTime: 10,
    image: null
  }
];

const TIME_SLOTS = {
  morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
  afternoon: ['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'],
  evening: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM']
};

// MAIN COMPONENT
export default function HealthcareBookingSystem() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const result = await window.storage.get('appointments');
        if (result && result.value) {
          setAppointments(JSON.parse(result.value));
        }
      } catch (error) {
        console.log('No saved appointments');
      }
    };
    loadAppointments();
  }, []);

  const saveAppointments = async (newAppointments) => {
    try {
      await window.storage.set('appointments', JSON.stringify(newAppointments));
      setAppointments(newAppointments);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBookingComplete = (bookingData) => {
    const newAppointment = {
      id: Date.now(),
      ...bookingData,
      status: 'booked',
      tokenNumber: `T-${String(appointments.length + 1).padStart(3, '0')}`,
      queuePosition: appointments.filter(
        a =>
          a.doctorId === bookingData.doctorId &&
          a.date === bookingData.date &&
          a.status === 'booked'
      ).length + 1,
      createdAt: new Date().toISOString()
    };

    const updated = [...appointments, newAppointment];
    saveAppointments(updated);
    setCurrentView('dashboard');
  };

  const filteredDoctors = DOCTORS_DATA.filter(doctor => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty = specialtyFilter === 'all' || doctor.specialty === specialtyFilter;

    return matchesSearch && matchesSpecialty;
  });

  const upcomingAppointments = appointments
    .filter(a => a.status === 'booked')
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const specialties = ['all', ...new Set(DOCTORS_DATA.map(d => d.specialty))];

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'dashboard' && (
        <Dashboard
          appointments={upcomingAppointments}
          onViewSearch={() => setCurrentView('search')}
          onViewAppointments={() => setCurrentView('appointments')}
        />
      )}

      {currentView === 'search' && (
        <DoctorSearch
          doctors={filteredDoctors}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          specialtyFilter={specialtyFilter}
          setSpecialtyFilter={setSpecialtyFilter}
          specialties={specialties}
          onSelectDoctor={(doctor) => {
            setSelectedDoctor(doctor);
            setCurrentView('booking');
          }}
          onBack={() => setCurrentView('dashboard')}
        />
      )}

      {currentView === 'booking' && selectedDoctor && (
        <BookingFlow
          doctor={selectedDoctor}
          onComplete={handleBookingComplete}
          onBack={() => setCurrentView('search')}
        />
      )}

      {currentView === 'appointments' && (
        <AppointmentsList appointments={appointments} onBack={() => setCurrentView('dashboard')} />
      )}
    </div>
  );
}

// ---------------------- DASHBOARD ----------------------
function Dashboard({ appointments, onViewSearch, onViewAppointments }) {
  const stats = [
    { label: 'Upcoming', value: appointments.length, icon: Calendar, color: 'bg-blue-500' },
    { label: 'Total Visits', value: '12', icon: Activity, color: 'bg-green-500' },
    { label: 'Doctors', value: '5', icon: User, color: 'bg-purple-500' },
    { label: 'Health Score', value: '85%', icon: Activity, color: 'bg-pink-500' }
  ];

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Welcome back!</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 border">
              <div className={`${stat.color} p-3 rounded-lg inline-block`}>
                <stat.icon className="text-white" />
              </div>
              <p className="text-gray-600 mt-2">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <button
            onClick={onViewSearch}
            className="p-6 bg-blue-600 text-white rounded-xl hover:opacity-90"
          >
            <Search className="w-6 h-6 mb-2" />
            
          </button>

          <button
            onClick={onViewAppointments}
            className="p-6 bg-purple-600 text-white rounded-xl hover:opacity-90"
          >
            <Calendar className="w-6 h-6 mb-2" />
            My Appointments
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow mt-10">
          <h2 className="font-bold text-xl">Upcoming Appointments</h2>

          {appointments.length === 0 ? (
            <p className="text-gray-500 mt-4">No appointments yet.</p>
          ) : (
            appointments.slice(0, 3).map((apt) => (
              <AppointmentCard key={apt.id} appointment={apt} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------- DOCTOR SEARCH ----------------------
function DoctorSearch({
  doctors,
  searchQuery,
  setSearchQuery,
  specialtyFilter,
  setSpecialtyFilter,
  specialties,
  onSelectDoctor,
  onBack
}) {
  return (
    <div>
      <div className="bg-blue-600 text-white p-6">
        <button onClick={onBack} className="flex items-center">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <h1 className="text-3xl font-bold mt-4">Find Your Doctor</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-6">
        <input
          className="w-full p-3 border rounded-xl"
          placeholder="Search doctors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          value={specialtyFilter}
          onChange={(e) => setSpecialtyFilter(e.target.value)}
          className="mt-4 p-3 border rounded-xl"
        >
          {specialties.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {doctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} onBook={onSelectDoctor} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------- DOCTOR CARD ----------------------
function DoctorCard({ doctor, onBook }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="font-bold text-xl">{doctor.name}</h2>
      <p className="text-gray-600">{doctor.specialty}</p>
      <p className="text-gray-500 text-sm">{doctor.hospital}</p>

      <div className="flex justify-between mt-4">
        <p className="font-bold text-blue-600">₹{doctor.fee}</p>

        <button
          disabled={!doctor.available}
          onClick={() => onBook(doctor)}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
        >
          {doctor.available ? 'Book Now' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
}

// ---------------------- BOOKING FLOW ----------------------
function BookingFlow({ doctor, onComplete, onBack }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [symptoms, setSymptoms] = useState('');

  const getDates = () => {
    const arr = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const x = new Date();
      x.setDate(today.getDate() + i);
      arr.push(x);
    }
    return arr;
  };

  const formatDate = (d) => d.toISOString().split('T')[0];

  const confirm = () => {
    onComplete({
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      hospital: doctor.hospital,
      date: selectedDate,
      time: selectedTime,
      symptoms,
      fee: doctor.fee,
      estimatedWaitTime: doctor.avgWaitTime
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button onClick={onBack} className="flex items-center text-gray-600 mb-4">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Book Appointment</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
          {step === 1 && (
            <>
              <h2 className="text-xl font-bold mb-4">Select Date</h2>

              <div className="grid grid-cols-4 gap-3">
                {getDates().map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(formatDate(d))}
                    className={`p-4 rounded-xl border ${
                      selectedDate === formatDate(d) && 'bg-blue-600 text-white'
                    }`}
                  >
                    {d.toDateString()}
                  </button>
                ))}
              </div>

              <button
                disabled={!selectedDate}
                onClick={() => setStep(2)}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-bold mb-4">Select Time</h2>

              {Object.entries(TIME_SLOTS).map(([section, slots]) => (
                <div key={section} className="mb-4">
                  <p className="font-semibold">{section}</p>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {slots.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`p-3 border rounded-xl ${
                          selectedTime === t && 'bg-blue-600 text-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border rounded-xl"
                >
                  Back
                </button>

                <button
                  disabled={!selectedTime}
                  onClick={() => setStep(3)}
                  className="px-6 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-bold mb-4">Symptoms (Optional)</h2>

              <textarea
                rows="5"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="w-full border rounded-xl p-3"
                placeholder="Describe your symptoms"
              />

              <div className="flex justify-between mt-6">
                <button onClick={() => setStep(2)} className="px-4 py-2 border rounded-xl">
                  Back
                </button>

                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-2 bg-blue-600 text-white rounded"
                >
                  Confirm
                </button>
              </div>
            </>
          )}

          {step === 4 && (
            <div className="text-center py-6">
              <h2 className="text-2xl font-bold mb-4">Confirm Appointment</h2>

              <p className="mb-2">
                <b>Doctor:</b> {doctor.name}
              </p>
              <p className="mb-2">
                <b>Date:</b> {selectedDate}
              </p>
              <p className="mb-2">
                <b>Time:</b> {selectedTime}
              </p>

              <button
                onClick={confirm}
                className="mt-6 px-6 py-2 bg-green-600 text-white rounded"
              >
                Confirm & Book
              </button>
            </div>
          )}
        </div>

        {/* SUMMARY */}
        <BookingSummary doctor={doctor} selectedDate={selectedDate} selectedTime={selectedTime} />
      </div>
    </div>
  );
}

// ---------------------- BOOKING SUMMARY ----------------------
function BookingSummary({ doctor, selectedDate, selectedTime }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-bold text-lg mb-4">Appointment Summary</h3>

      <div className="flex items-center space-x-4 border-b pb-4 mb-4">
        <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center">
          <User className="w-7 h-7" />
        </div>

        <div>
          <h4 className="font-bold">{doctor.name}</h4>
          <p className="text-sm text-gray-600">{doctor.specialty}</p>
          <p className="text-xs text-gray-500">{doctor.hospital}</p>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <p className="flex justify-between">
          <span>Fee:</span>
          <b>₹{doctor.fee}</b>
        </p>

        <p className="flex justify-between">
          <span>Wait Time:</span>
          <b>{doctor.avgWaitTime} mins</b>
        </p>

        <p className="flex justify-between">
          <span>Date:</span>
          <b>{selectedDate || '--'}</b>
        </p>

        <p className="flex justify-between">
          <span>Time:</span>
          <b>{selectedTime || '--'}</b>
        </p>
      </div>
    </div>
  );
}

// ---------------------- APPOINTMENT CARD ----------------------
function AppointmentCard({ appointment }) {
  return (
    <div className="p-4 border rounded-xl mt-3">
      <h3 className="font-bold">{appointment.doctorName}</h3>
      <p className="text-sm text-gray-600">{appointment.specialty}</p>
      <p className="text-sm">Date: {appointment.date}</p>
      <p className="text-sm">Time: {appointment.time}</p>
    </div>
  );
}

// ---------------------- APPOINTMENT LIST ----------------------
function AppointmentsList({ appointments, onBack }) {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <button onClick={onBack} className="flex items-center mb-4 text-gray-600">
        <ArrowLeft className="w-5 h-5 mr-2" /> Back
      </button>

      <h1 className="text-3xl font-bold mb-6">My Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments booked yet.</p>
      ) : (
        appointments.map((apt) => <AppointmentCard key={apt.id} appointment={apt} />)
      )}
    </div>
  );
}
