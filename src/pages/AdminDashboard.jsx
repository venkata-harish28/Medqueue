import React, { useState } from 'react';
import { Calendar, Clock, User, FileText, CheckCircle, ArrowLeft, ArrowRight, Star, MapPin } from 'lucide-react';

export default function BookAppointment() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [symptoms, setSymptoms] = useState('');

  const doctor = {
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    rating: 4.9,
    experience: 15,
    fee: 500,
    hospital: 'City General Hospital',
    avatar: null
  };

  const timeSlots = {
    morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    afternoon: ['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'],
    evening: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM']
  };

  const getDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()],
      full: date.toDateString()
    };
  };

  const handleBooking = () => {
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center text-gray-600 hover:text-blue-600 mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Search
          </button>
          <h1 className="text-4xl font-bold">Book Appointment</h1>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Select Date', icon: Calendar },
              { num: 2, label: 'Choose Time', icon: Clock },
              { num: 3, label: 'Add Details', icon: FileText },
              { num: 4, label: 'Confirm', icon: CheckCircle }
            ].map((s, i) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                    step >= s.num 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    <s.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs mt-2 font-medium">{s.label}</span>
                </div>
                {i < 3 && (
                  <div className={`flex-1 h-1 mx-4 rounded transition ${
                    step > s.num ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Step 1: Select Date */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Select Date</h2>
                  <div className="grid grid-cols-7 gap-3">
                    {getDates().map((date, i) => {
                      const formatted = formatDate(date);
                      const isSelected = selectedDate === formatted.full;
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedDate(formatted.full)}
                          className={`p-4 rounded-xl text-center transition ${
                            isSelected
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                              : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          <div className="text-xs font-medium mb-1">{formatted.day}</div>
                          <div className="text-2xl font-bold mb-1">{formatted.date}</div>
                          <div className="text-xs">{formatted.month}</div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      disabled={!selectedDate}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center"
                    >
                      Next <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Choose Time */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Choose Time Slot</h2>
                  
                  {Object.entries(timeSlots).map(([period, slots]) => (
                    <div key={period} className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">
                        {period}
                      </h3>
                      <div className="grid grid-cols-3 gap-3">
                        {slots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-4 rounded-xl font-medium transition ${
                              selectedTime === time
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:border-blue-600 transition flex items-center"
                    >
                      <ArrowLeft className="mr-2 w-5 h-5" /> Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!selectedTime}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 transition flex items-center"
                    >
                      Next <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Add Details */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Additional Details</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Describe Your Symptoms (Optional)
                      </label>
                      <textarea
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        rows="6"
                        placeholder="Tell us about your symptoms, medical history, or reason for visit..."
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
                      />
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="flex items-start">
                        <FileText className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-1">Why provide symptoms?</h4>
                          <p className="text-sm text-blue-700">
                            Sharing your symptoms helps the doctor prepare for your consultation and provide better care.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:border-blue-600 transition flex items-center"
                    >
                      <ArrowLeft className="mr-2 w-5 h-5" /> Back
                    </button>
                    <button
                      onClick={handleBooking}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center"
                    >
                      Confirm Booking <CheckCircle className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Success */}
              {step === 4 && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Booking Confirmed!</h2>
                  <p className="text-gray-600 mb-8">
                    Your appointment has been successfully booked
                  </p>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Date</div>
                        <div className="font-semibold">{selectedDate}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Time</div>
                        <div className="font-semibold">{selectedTime}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-sm text-gray-600 mb-1">Token Number</div>
                        <div className="text-3xl font-bold text-blue-600">T-042</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition">
                      View Queue Status
                    </button>
                    <button className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:border-blue-600 transition">
                      Back to Dashboard
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Doctor Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="font-semibold mb-4">Appointment Summary</h3>
              
              <div className="flex items-center space-x-4 mb-6 pb-6 border-b">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-bold">{doctor.name}</h4>
                  <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                    <span>{doctor.rating} • {doctor.experience}y exp</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{doctor.hospital}</span>
                </div>
                {selectedDate && (
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="font-medium">{selectedDate}</span>
                  </div>
                )}
                {selectedTime && (
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span className="font-semibold">₹{doctor.fee}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Platform Fee</span>
                  <span className="font-semibold">₹50</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold pt-4 border-t">
                  <span>Total</span>
                  <span className="text-blue-600">₹{doctor.fee + 50}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}