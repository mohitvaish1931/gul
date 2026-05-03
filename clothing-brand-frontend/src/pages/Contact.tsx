import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
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
      {/* Hero Section - Centered and Elegant */}
      <div className="bg-purple-50/30 py-32 border-b border-purple-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="small-gold-tag">GUL CONCIERGE</span>
          <h1 className="text-6xl md:text-7xl font-serif text-purple-950 mb-8 italic">How can we help?</h1>
          <p className="text-xl text-purple-900/60 max-w-2xl mx-auto font-medium leading-relaxed">
            Whether it's a sizing query or a custom design request, our team in Jaipur is here to assist you with every detail.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Contact Info - 5 columns */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <h2 className="text-4xl font-serif text-purple-950 mb-6">Concierge Services</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Experience personalized assistance for all your ethnic wear needs. We offer virtual styling, custom tailoring, and detailed product consultations.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: Mail, title: 'Email Us', detail: 'gul.fashion.jaipur@gmail.com' },
                { icon: Phone, title: 'Call Us', detail: '+91 78779 37350' },
                { icon: MapPin, title: 'Our Studio', detail: '455, Mandhi Khatikan, Pahadiya Chowk, Jaipur - 302002' },
                { icon: MessageCircle, title: 'WhatsApp', detail: 'Instant styling support available.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center p-6 bg-purple-50/50 border border-purple-100 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-500 group">
                  <div className="w-14 h-14 bg-white text-purple-900 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-purple-900 group-hover:text-white transition-all duration-500">
                    <item.icon size={24} />
                  </div>
                  <div className="ml-6">
                    <h3 className="font-bold text-purple-950 text-sm uppercase tracking-widest mb-1">{item.title}</h3>
                    <p className="text-gray-600 font-medium">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Visit Us Card - Fixed and Improved */}
            <div className="p-10 bg-purple-950 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-800 rounded-full blur-3xl opacity-20 -mr-10 -mt-10 group-hover:opacity-40 transition-opacity"></div>
              <h3 className="text-3xl font-serif mb-6 relative z-10">Visit Our Jaipur Studio</h3>
              <p className="opacity-70 mb-10 relative z-10 text-lg">Experience our collections in person at our flagship Jaipur studio.</p>
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span className="font-medium opacity-60">Monday - Saturday</span>
                  <span className="font-bold">10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-medium opacity-60">Sunday</span>
                  <span className="font-bold">11:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form - 7 columns */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-purple-100 p-12 rounded-[3rem] shadow-2xl shadow-purple-900/5 relative">
              <h2 className="text-4xl font-serif text-purple-950 mb-10">Send a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="block text-xs font-black text-purple-900 uppercase tracking-[0.2em] ml-1">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-6 py-5 bg-purple-50/30 border border-purple-100 rounded-2xl focus:ring-2 focus:ring-purple-200 focus:bg-white outline-none transition-all text-purple-950 font-medium"
                      placeholder="E.g. Anjali Sharma"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-xs font-black text-purple-900 uppercase tracking-[0.2em] ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-6 py-5 bg-purple-50/30 border border-purple-100 rounded-2xl focus:ring-2 focus:ring-purple-200 focus:bg-white outline-none transition-all text-purple-950 font-medium"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-black text-purple-900 uppercase tracking-[0.2em] ml-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-6 py-5 bg-purple-50/30 border border-purple-100 rounded-2xl focus:ring-2 focus:ring-purple-200 focus:bg-white outline-none transition-all text-purple-950 font-medium"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-black text-purple-900 uppercase tracking-[0.2em] ml-1">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-6 py-5 bg-purple-50/30 border border-purple-100 rounded-2xl focus:ring-2 focus:ring-purple-200 focus:bg-white outline-none resize-none transition-all text-purple-950 font-medium"
                    placeholder="Tell us about your requirements or any questions you have..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-900 text-white py-6 px-10 rounded-2xl font-black uppercase tracking-[0.3em] text-sm hover:bg-purple-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-purple-900/20 flex items-center justify-center space-x-4"
                >
                  <span>SEND MESSAGE</span>
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
