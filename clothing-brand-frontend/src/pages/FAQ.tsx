import React, { useState } from 'react';
import { HelpCircle, Plus, Minus, MessageCircle } from 'lucide-react';
import { useSEO } from '../utils/useSEO';

const FAQ = () => {
  useSEO({
    title: 'FAQs - GUL FASHION',
    description: 'Find answers to common questions about GUL FASHION orders, shipping, returns, and garment care.',
    keywords: 'faq, help center, GUL FASHION help, questions',
    url: 'https://gulfashion.com/faq',
    type: 'website'
  });

  const faqs = [
    {
      question: "How do I care for my GUL FASHION clothing?",
      answer: "Most of our ethnic wear requires professional dry cleaning to maintain the fabric and embroidery quality. Please refer to our Garment Care Guide for detailed instructions on storage and maintenance."
    },
    {
      question: "What are the shipping charges?",
      answer: "We offer free shipping on all prepaid orders above ₹1,499. For orders below this or COD orders, a standard fee of ₹70 applies."
    },
    {
      question: "How long will it take to receive my order?",
      answer: "Orders are typically dispatched within 2-3 working days. Handcrafted pieces may take slightly longer. Once shipped, delivery takes 4-8 working days depending on your location."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we only ship within India. However, we are expanding soon! Contact our concierge for special international inquiry requests."
    },
    {
      question: "Can I return or exchange a product?",
      answer: "We offer size exchanges within 7 days of delivery. For damaged items, we provide a store credit note upon verification of an unboxing video. We do not offer monetary refunds."
    },
    {
      question: "Are the colors exactly as shown in photos?",
      answer: "We strive for accuracy, but slight variations may occur due to digital screen settings or the handcrafted nature of our fabrics and dyes."
    }
  ];

  return (
    <div className="policy-page" style={{ backgroundColor: '#FDFBFD', color: '#1a1a1a', minHeight: '100vh' }}>
      {/* Header Section */}
      <section style={{ backgroundColor: '#2D0A4E', color: '#fff', padding: '100px 20px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ color: '#D4AF37', letterSpacing: '4px', fontWeight: '800', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>HELP CENTER</span>
          <h1 className="font-serif" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Common Inquiries</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
            Find quick answers to your questions about our handcrafted luxury collections.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          <div style={{ backgroundColor: '#fff', padding: '50px', borderRadius: '30px', border: '1px solid #f0f0f0', marginTop: '80px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.02)' }}>
             <div style={{ backgroundColor: '#F8F5FF', color: '#2D0A4E', width: '60px', height: '60px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px' }}>
                <HelpCircle size={30} />
             </div>
             <h3 className="font-serif" style={{ fontSize: '2rem', color: '#2D0A4E', marginBottom: '15px' }}>Still Have Questions?</h3>
             <p style={{ color: '#666', marginBottom: '35px', maxWidth: '500px', margin: '0 auto 35px' }}>
                If you couldn't find what you were looking for, our personal styling consultants are just a message away.
             </p>
             <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <a href="/contact" style={{ padding: '15px 40px', backgroundColor: '#2D0A4E', color: '#fff', borderRadius: '12px', textDecoration: 'none', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '1px' }}>CONTACT US</a>
                <a href="https://wa.me/919351325459" style={{ padding: '15px 40px', border: '2px solid #2D0A4E', color: '#2D0A4E', borderRadius: '12px', textDecoration: 'none', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <MessageCircle size={18} /> WHATSAPP
                </a>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '15px', border: '1px solid #f0f0f0', overflow: 'hidden', transition: 'all 0.3s' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '100%', 
          padding: '25px 30px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#2D0A4E', paddingRight: '20px' }}>{question}</span>
        <div style={{ color: '#D4AF37' }}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      <div style={{ 
        maxHeight: isOpen ? '200px' : '0', 
        overflow: 'hidden', 
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: isOpen ? '0 30px 30px 30px' : '0 30px'
      }}>
        <p style={{ color: '#666', lineHeight: '1.8', fontSize: '1rem' }}>{answer}</p>
      </div>
    </div>
  );
};

export default FAQ;
