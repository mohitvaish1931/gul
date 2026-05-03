import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useSEO } from '../utils/useSEO';

const Contact = () => {
  useSEO({
    title: 'Contact Us - GUL FASHION Premium Jewelry',
    description: 'Get in touch with GUL FASHION. We\'re here to help with your jewelry inquiries, orders, and customer service.',
    keywords: 'contact us, customer service, jewelry support, GUL FASHION contact',
    url: 'https://GUL FASHIONjewles.com/contact',
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
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-luxury-dark">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-wine/20 via-teal-luxury/10 to-primary-wine/20 py-16 shadow-[inset_0_1px_0_rgba(255,215,0,0.1)]">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-text-primary mb-6 luxury-serif uppercase tracking-widest drop-shadow-sm">CONTACT US</h1>

          <p className="text-xl text-primary-red leading-relaxed font-bold italic luxury-serif">
            We'd love to hear from you. Get in touch with our team for any questions,
            custom orders, or jewelry consultations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black text-primary-red mb-6 luxury-serif uppercase tracking-widest">Get In Touch</h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-8 font-medium">
                Whether you have questions about our jewelry collection, need assistance with an order,
                or want to discuss custom designs, our team is here to help. Reach out to us through
                any of the channels below.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="bg-gradient-to-r from-gold-primary to-gold-soft p-3 rounded-lg shadow-glow-gold">

                  <Mail className="h-6 w-6 text-luxury-dark" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">Email Us</h3>
                  <p className="text-text-secondary uppercase tracking-widest text-sm font-medium">GUL FASHIONjewel@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="bg-gradient-to-r from-teal-luxury to-gold-primary p-3 rounded-lg shadow-glow-emerald">

                  <Phone className="h-6 w-6 text-platinum" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-1 uppercase tracking-widest">Phone</h3>
                  <p className="text-text-secondary font-bold">+91 78779 37350</p>
                  <p className="text-text-secondary font-bold">+91 80940 51710</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="bg-gradient-to-r from-primary-wine to-gold-soft p-3 rounded-lg shadow-glow-ruby">

                  <MapPin className="h-6 w-6 text-platinum" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-primary-red mb-1 uppercase tracking-widest">Visit Our Store</h3>
                  <p className="text-text-secondary font-bold">
                    455, four gate out side mandhi khatikan<br />
                    Pahadiya chowk, near chota shiv tample<br />
                    Pincode- 302002
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="bg-gradient-to-r from-teal-luxury to-gold-primary p-3 rounded-lg shadow-glow-emerald">

                  <Clock className="h-6 w-6 text-platinum" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-teal-luxury mb-1">Business Hours</h3>

                  <p className="text-text-secondary font-medium">
                    Monday - Saturday: 10:00 AM - 8:00 PM<br />
                    Sunday: 11:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white/30 border border-gold-primary/20 p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-black text-primary-red mb-4 luxury-serif uppercase tracking-widest">Our Services</h3>
              <ul className="space-y-2 text-text-primary font-medium">
                <li className="flex items-center space-x-2">
                  <span className="text-primary-red">✨</span>
                  <span>Custom Jewelry Design</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-gold-primary">✨</span>
                  <span>Jewelry Repair & Maintenance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-primary-red">✨</span>
                  <span>Professional Resizing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-gold-primary">✨</span>
                  <span>Gift Wrapping Services</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-primary-red">✨</span>
                  <span>Jewelry Authentication</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/40 border border-gold-primary/20 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-black text-primary-red mb-6 luxury-serif uppercase tracking-widest">Send Us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2 luxury-serif">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 border border-gold-primary/30 rounded-lg text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-red/50 focus:border-transparent outline-none transition-all duration-300"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2 luxury-serif">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 border border-gold-primary/30 rounded-lg text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-red/50 focus:border-transparent outline-none transition-all duration-300"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2 luxury-serif">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/50 border border-gold-primary/30 rounded-lg text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-red/50 focus:border-transparent outline-none transition-all duration-300"
                  placeholder="What is this regarding?"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2 luxury-serif">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/50 border border-gold-primary/30 rounded-lg text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-red/50 focus:border-transparent outline-none resize-none transition-all duration-300"
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full btn-premium-gold text-luxury-dark py-3 px-6 rounded-lg font-medium hover:shadow-glow transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>

            <div className="mt-8 p-4 bg-primary-red/10 border-l-4 border-primary-red rounded-r-lg">
              <p className="text-sm text-text-primary font-bold">
                <strong className="text-primary-red">Response Time:</strong> We typically respond to all inquiries within 24 hours during business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
