import React from 'react';
import { Activity, Calendar, Mic, Clock, Star, Shield, Users, Heart, Brain, Stethoscope } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      
      {/* Hero Section */}
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full text-blue-600 text-sm font-medium">
            🚀 AI-Powered Healthcare Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Healthcare Made Smart
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Book appointments instantly, track live queues, and get AI-powered doctor recommendations with voice assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition">
              Book Appointment Now
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            {[
              { num: '10K+', label: 'Happy Patients' },
              { num: '500+', label: 'Doctors' },
              { num: '50+', label: 'Hospitals' },
              { num: '99%', label: 'Satisfaction' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold text-blue-600">{stat.num}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need for seamless healthcare</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Mic,
                title: 'Voice Assistant',
                desc: 'Book appointments by speaking naturally. Our AI understands your needs.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Clock,
                title: 'Live Queue Tracking',
                desc: 'See real-time waiting times and arrive exactly when needed.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: Brain,
                title: 'Smart Recommendations',
                desc: 'AI analyzes symptoms to suggest the perfect specialist for you.',
                color: 'from-orange-500 to-red-500'
              },
              {
                icon: Calendar,
                title: 'Instant Booking',
                desc: 'Book appointments in seconds with available slots.',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: Shield,
                title: 'Secure & Private',
                desc: 'Your health data is encrypted and completely secure.',
                color: 'from-indigo-500 to-purple-500'
              },
              {
                icon: Heart,
                title: '24/7 Support',
                desc: 'Get help anytime with our dedicated support team.',
                color: 'from-pink-500 to-rose-500'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl hover:shadow-xl transition group">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specialties */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Find Specialists</h2>
            <p className="text-xl text-gray-600">Expert care across all medical specialties</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Cardiology', icon: Heart, color: 'red' },
              { name: 'Neurology', icon: Brain, color: 'purple' },
              { name: 'Orthopedics', icon: Users, color: 'blue' },
              { name: 'General', icon: Stethoscope, color: 'green' },
              { name: 'Pediatrics', icon: Star, color: 'yellow' },
              { name: 'Dermatology', icon: Shield, color: 'pink' },
              { name: 'ENT', icon: Activity, color: 'indigo' },
              { name: 'Dental', icon: Star, color: 'cyan' }
            ].map((spec, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl hover:shadow-lg transition cursor-pointer group">
                <spec.icon className={`w-10 h-10 text-${spec.color}-500 mb-4 group-hover:scale-110 transition`} />
                <div className="font-semibold text-gray-800">{spec.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience Smart Healthcare?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of patients who trust SmartCare AI
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition">
            Get Started Free
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Activity className="w-6 h-6" />
            <span className="text-xl font-bold">SmartCare AI</span>
          </div>
          <p className="text-gray-400 mb-4">© 2024 SmartCare AI. All rights reserved.</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}