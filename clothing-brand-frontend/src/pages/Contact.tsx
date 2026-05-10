import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, MessageCircle, 
  Calendar, Star, Sun, Truck, ShieldCheck, 
  RefreshCcw, Globe, ExternalLink, ChevronRight
} from 'lucide-react';
import { useSEO } from '../utils/useSEO';

const Contact = () => {
  useSEO({
    title: 'Contact Us - GUL FASHION Jaipur',
    description: 'Get in touch with GUL FASHION for custom tailoring, styling guidance, and luxury ethnic wear inquiries.',
    keywords: 'contact gul fashion, jaipur boutique, ethnic wear contact, custom tailoring jaipur',
    url: 'https://gulfashion.com/contact',
    type: 'website'
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! Your style consultation request has been received.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page-v2" style={{ backgroundColor: '#fff', color: '#2d0a4e', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Hero Header */}
      <section style={{ backgroundColor: '#2D0A4E', color: '#fff', padding: '100px 20px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ color: '#D4AF37', letterSpacing: '4px', fontWeight: '800', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>GET IN TOUCH</span>
          <h1 className="font-serif" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Let's Create Something <br /><i>Beautiful Together</i></h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
            From custom tailoring to styling guidance — we're here for you.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '1200px', margin: '60px auto 0', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px' }}>
          
          {/* Left Side: Contact Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <ContactInfoCard 
              icon={<Mail size={24} />} 
              title="EMAIL" 
              value="gul.fashion.jaipur@gmail.com" 
              sub="We reply within 24 hours"
            />
            <ContactInfoCard 
              icon={<Phone size={24} />} 
              title="CALL US" 
              value="+91 93513 25459" 
              sub="Mon – Sat | 10AM – 7PM"
            />
            <ContactInfoCard 
              icon={<MapPin size={24} />} 
              title="OUR STUDIO" 
              value="455, Mandhi Khatikan, Pahadiya Chowk, Jaipur - 302002" 
              sub="Mon – Sat | 10AM – 7PM"
            />
            
            <div style={{ backgroundColor: '#F9F6FF', padding: '40px', borderRadius: '24px', textAlign: 'center', marginTop: '20px' }}>
               <MessageCircle size={40} color="#2d0a4e" style={{ marginBottom: '20px' }} />
               <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>WhatsApp Support</h3>
               <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '25px' }}>Instant styling support available for our patrons.</p>
               <a href="https://wa.me/919351325459" style={{ 
                 display: 'inline-flex', 
                 alignItems: 'center', 
                 gap: '10px', 
                 backgroundColor: '#2d0a4e', 
                 color: '#fff', 
                 padding: '15px 30px', 
                 borderRadius: '12px', 
                 textDecoration: 'none', 
                 fontWeight: '800', 
                 fontSize: '0.8rem',
                 letterSpacing: '1px'
               }}>
                 CHAT NOW <ChevronRight size={16} />
               </a>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div style={{ backgroundColor: '#fff', padding: '50px', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.04)', border: '1px solid #f8f8f8' }}>
             <h2 className="font-serif" style={{ fontSize: '2rem', marginBottom: '10px', color: '#2d0a4e' }}>Send us a Message</h2>
             <div style={{ width: '40px', height: '2px', backgroundColor: '#D4AF37', marginBottom: '40px' }}></div>

             <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <label style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '1px', color: '#999' }}>YOUR NAME *</label>
                   <input 
                     type="text" 
                     name="name"
                     value={formData.name}
                     onChange={handleInputChange}
                     placeholder="Anjali Sharma" 
                     required
                     style={{ padding: '15px 20px', border: '1.5px solid #eee', borderRadius: '12px', outline: 'none' }}
                   />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <label style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '1px', color: '#999' }}>EMAIL ADDRESS *</label>
                   <input 
                     type="email" 
                     name="email"
                     value={formData.email}
                     onChange={handleInputChange}
                     placeholder="email@example.com" 
                     required
                     style={{ padding: '15px 20px', border: '1.5px solid #eee', borderRadius: '12px', outline: 'none' }}
                   />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: 'span 2' }}>
                   <label style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '1px', color: '#999' }}>PHONE NUMBER *</label>
                   <input 
                     type="tel" 
                     name="phone"
                     value={formData.phone}
                     onChange={handleInputChange}
                     placeholder="+91 98765 43210" 
                     required
                     style={{ padding: '15px 20px', border: '1.5px solid #eee', borderRadius: '12px', outline: 'none' }}
                   />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: 'span 2' }}>
                   <label style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '1px', color: '#999' }}>SUBJECT *</label>
                   <select 
                     name="subject"
                     value={formData.subject}
                     onChange={handleInputChange}
                     required
                     style={{ padding: '15px 20px', border: '1.5px solid #eee', borderRadius: '12px', outline: 'none', appearance: 'none', backgroundColor: '#fff' }}
                   >
                     <option value="">Select a subject</option>
                     <option value="custom">Custom Tailoring Inquiry</option>
                     <option value="order">Order Tracking / Issues</option>
                     <option value="styling">Virtual Styling Consultation</option>
                     <option value="other">Other</option>
                   </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: 'span 2' }}>
                   <label style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '1px', color: '#999' }}>YOUR MESSAGE *</label>
                   <textarea 
                     name="message"
                     value={formData.message}
                     onChange={handleInputChange}
                     placeholder="How can we help you?" 
                     required
                     rows={5}
                     style={{ padding: '15px 20px', border: '1.5px solid #eee', borderRadius: '12px', outline: 'none', resize: 'none' }}
                   ></textarea>
                </div>
                <button type="submit" style={{ 
                  gridColumn: 'span 2', 
                  padding: '20px', 
                  backgroundColor: '#2d0a4e', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '12px', 
                  fontWeight: '800', 
                  letterSpacing: '2px', 
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(45,10,78,0.1)'
                }}>
                  SEND MESSAGE
                </button>
             </form>
          </div>
        </div>

        {/* Map Section */}
        <div style={{ marginTop: '80px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.04)', border: '1px solid #f8f8f8', display: 'grid', gridTemplateColumns: '1.5fr 1fr' }}>
           <div style={{ height: '500px' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.518683501712!2d75.8364!3d26.9175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6fd7a44f77b%3A0xe74e797c558c4f0!2sJaipur!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
              ></iframe>
           </div>
           <div style={{ padding: '60px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ color: '#D4AF37', letterSpacing: '4px', fontWeight: '800', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>VISIT OUR STUDIO</span>
              <h2 className="font-serif" style={{ fontSize: '2.5rem', color: '#2d0a4e', marginBottom: '20px', lineHeight: '1.2' }}>Experience Our <br />Heritage in Person</h2>
              <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '30px' }}>
                Step into our Jaipur atelier and explore our exclusive handcrafted collections. Get personalized styling, custom fittings, and a truly royal experience.
              </p>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '10px', 
                color: '#2d0a4e', 
                fontWeight: '800', 
                textDecoration: 'none', 
                fontSize: '0.85rem' 
              }}>
                GET DIRECTIONS <ChevronRight size={18} />
              </a>
           </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .contact-page-v2 > div > div:first-child { grid-template-columns: 1fr !important; }
          .contact-page-v2 > div > div:last-child { grid-template-columns: 1fr !important; }
          .contact-page-v2 h1 { font-size: 2.5rem !important; }
        }
      `}</style>
    </div>
  );
};

const ContactInfoCard = ({ icon, title, value, sub }: { icon: React.ReactNode, title: string, value: string, sub: string }) => (
  <div style={{ 
    display: 'flex', 
    gap: '25px', 
    padding: '30px', 
    backgroundColor: '#fff', 
    borderRadius: '20px', 
    boxShadow: '0 5px 25px rgba(0,0,0,0.02)',
    border: '1px solid #f8f8f8',
    alignItems: 'flex-start'
  }}>
    <div style={{ 
      width: '60px', 
      height: '60px', 
      borderRadius: '16px', 
      backgroundColor: '#FDF7F2', 
      color: '#2d0a4e', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexShrink: 0
    }}>
      {icon}
    </div>
    <div>
      <h3 style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '1px', marginBottom: '8px', color: '#999' }}>{title}</h3>
      <p style={{ color: '#2d0a4e', fontWeight: '700', fontSize: '1.05rem', marginBottom: '5px' }}>{value}</p>
      <p style={{ color: '#aaa', fontSize: '0.8rem' }}>{sub}</p>
    </div>
  </div>
);

export default Contact;
