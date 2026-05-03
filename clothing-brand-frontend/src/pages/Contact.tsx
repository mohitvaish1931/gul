import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useSEO } from '../utils/useSEO';

const Contact = () => {
  useSEO({
    title: 'Contact Us - GUL FASHION Jaipur',
    description: 'Get in touch with GUL FASHION. We\'re here to help with your clothing inquiries, orders, and styling consultations.',
    keywords: 'contact gul fashion, customer support, jaipur ethnic wear contact',
    url: 'https://gulfashion.com/contact',
    type: 'website'
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert('Thank you for reaching out! Our styling concierge will contact you shortly.');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-purple-50/50 py-24 border-b border-purple-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="small-gold-tag">GET IN TOUCH</span>
          <h1 className="text-5xl md:text-6xl font-serif text-purple-950 mb-6 italic">How can we help?</h1>
          <p className="text-xl text-purple-800/70 max-w-2xl mx-auto font-medium">
            Whether it's a sizing query or a custom design request, our team in Jaipur is here to assist you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-serif text-purple-950 mb-6">Concierge Services</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Experience personalized assistance for all your ethnic wear needs. We offer virtual styling, custom tailoring, and detailed product consultations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-6 bg-white border border-purple-100 rounded-2xl hover:shadow-xl hover:shadow-purple-500/5 transition-all">
                <div className="w-12 h-12 bg-purple-100 text-purple-900 rounded-xl flex items-center justify-center mb-4">
                  <Mail size={24} />
                </div>
                <h3 className="font-bold text-purple-950 mb-1">Email Us</h3>
                <p className="text-gray-600 text-sm break-all">gul.fashion.jaipur@gmail.com</p>
              </div>

              <div className="p-6 bg-white border border-purple-100 rounded-2xl hover:shadow-xl hover:shadow-purple-500/5 transition-all">
                <div className="w-12 h-12 bg-purple-100 text-purple-900 rounded-xl flex items-center justify-center mb-4">
                  <Phone size={24} />
                </div>
                <h3 className="font-bold text-purple-950 mb-1">Call Us</h3>
                <p className="text-gray-600 text-sm">+91 78779 37350</p>
              </div>

              <div className="p-6 bg-white border border-purple-100 rounded-2xl hover:shadow-xl hover:shadow-purple-500/5 transition-all">
                <div className="w-12 h-12 bg-purple-100 text-purple-900 rounded-xl flex items-center justify-center mb-4">
                  <MapPin size={24} />
                </div>
                <h3 className="font-bold text-purple-950 mb-1">Our Studio</h3>
                <p className="text-gray-600 text-sm">455, Mandhi Khatikan, Pahadiya Chowk, Jaipur - 302002</p>
              </div>

              <div className="p-6 bg-white border border-purple-100 rounded-2xl hover:shadow-xl hover:shadow-purple-500/5 transition-all">
                <div className="w-12 h-12 bg-purple-100 text-purple-900 rounded-xl flex items-center justify-center mb-4">
                  <MessageCircle size={24} />
                </div>
                <h3 className="font-bold text-purple-950 mb-1">WhatsApp</h3>
                <p className="text-gray-600 text-sm">Instant styling support available.</p>
              </div>
            </div>

            <div className="p-8 bg-purple-900 text-white rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-serif mb-4">Visit Us in Jaipur</h3>
              <p className="opacity-80 mb-6">Experience our collections in person at our flagship Jaipur studio.</p>
              <div className="space-y-2 opacity-90 text-sm">
                <p className="flex justify-between border-b border-white/10 pb-2"><span>Monday - Saturday</span> <span>10:00 AM - 8:00 PM</span></p>
                <p className="flex justify-between"><span>Sunday</span> <span>11:00 AM - 6:00 PM</span></p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-purple-100 p-10 rounded-[2.5rem] shadow-sm relative">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-50 rounded-full blur-3xl opacity-50"></div>
            <h2 className="text-3xl font-serif text-purple-950 mb-8">Send a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-purple-900 uppercase tracking-widest mb-3">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-purple-50/30 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="E.g. Anjali Sharma"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-purple-900 uppercase tracking-widest mb-3">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-purple-50/30 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-900 uppercase tracking-widest mb-3">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-purple-50/30 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="What can we help you with?"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-900 uppercase tracking-widest mb-3">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-5 py-4 bg-purple-50/30 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-200 outline-none resize-none transition-all"
                  placeholder="Tell us about your requirements..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-900 text-white py-5 px-8 rounded-xl font-bold uppercase tracking-[0.2em] hover:bg-purple-800 transition-all shadow-xl shadow-purple-900/10 flex items-center justify-center space-x-3"
              >
                <span>Send Message</span>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
