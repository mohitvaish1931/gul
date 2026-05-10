import React, { useState } from 'react';
import { useSEO } from '../utils/useSEO';
import { ChevronDown, Headphones, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  useSEO({
    title: 'FAQs - GUL FASHION',
    description: 'Find answers to common questions about our products and services.',
    keywords: 'faq, questions, help, GUL FASHION',
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
      answer: "We offer free shipping on all orders above ₹1999 across India. For orders below this amount, a flat shipping fee of ₹99 applies."
    },
    {
      question: "How long will it take to receive my order?",
      answer: "Orders are typically dispatched within 3-5 working days as many of our pieces are handcrafted. Once shipped, delivery takes approximately 4-8 working days."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we only ship within India. We are working on bringing Gul Fashion to our international customers very soon."
    },
    {
      question: "Can I return or exchange a product?",
      answer: "We accept size exchanges for unworn garments with original tags within 7 days of delivery. For returns, we only accept damaged products with mandatory unboxing video proof."
    },
    {
      question: "Is your clothing authentic?",
      answer: "Yes, all our garments are crafted using premium fabrics and authentic hand-embroidery techniques. Each piece goes through rigorous quality checks."
    }
  ];

  return (
    <div className="faq-page-v2" style={{ 
      backgroundColor: '#fff', 
      color: '#2d0a4e', 
      minHeight: '100vh', 
      padding: '80px 20px',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 className="font-serif" style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '15px', color: '#2d0a4e' }}>FAQs</h1>
          <div style={{ width: '60px', height: '2px', backgroundColor: '#D4AF37', margin: '0 auto 20px' }}></div>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>Find answers to common questions about our products and services.</p>
        </div>

        {/* FAQ Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '80px' }}>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* Footer CTA */}
        <div style={{ 
          backgroundColor: '#F9F6FF', 
          borderRadius: '24px', 
          padding: '40px 60px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: '40px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
             <div style={{ 
               width: '100px', 
               height: '100px', 
               backgroundColor: '#fff', 
               borderRadius: '50%', 
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center',
               boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
             }}>
                <Headphones size={40} color="#2d0a4e" strokeWidth={1.5} />
             </div>
             <div>
                <h2 className="font-serif" style={{ fontSize: '2rem', marginBottom: '10px', color: '#2d0a4e' }}>Still have questions?</h2>
                <div style={{ width: '40px', height: '1.5px', backgroundColor: '#D4AF37', marginBottom: '15px' }}></div>
                <p style={{ color: '#666', fontSize: '0.95rem', maxWidth: '400px' }}>Our luxury consultants are available to assist you with any inquiries you may have.</p>
             </div>
          </div>
          
          <Link to="/contact" style={{ 
            backgroundColor: '#2d0a4e', 
            color: '#fff', 
            padding: '18px 40px', 
            borderRadius: '12px', 
            textDecoration: 'none', 
            fontWeight: '700', 
            fontSize: '0.9rem',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 30px rgba(45,10,78,0.2)'
          }}>
             <Headphones size={18} /> CONTACT CUSTOMER CARE <ChevronRight size={18} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-page-v2 h1 { font-size: 2.5rem !important; }
          .faq-page-v2 h2 { font-size: 1.8rem !important; }
          .faq-page-v2 > div > div:last-child { flex-direction: column; text-align: center; padding: 40px 20px; }
          .faq-page-v2 > div > div:last-child > div { flex-direction: column; }
        }
      `}</style>
    </div>
  );
};

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ 
      backgroundColor: '#fff', 
      borderRadius: '20px', 
      boxShadow: '0 5px 25px rgba(0,0,0,0.03)',
      border: '1px solid #f8f8f8',
      overflow: 'hidden'
    }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '100%', 
          padding: '25px 35px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '25px', 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flexShrink: 0 }}>
           <div style={{ width: '28px', height: '28px', backgroundColor: '#2d0a4e', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '800' }}>Q</div>
           <div style={{ width: '28px', height: '28px', backgroundColor: '#D4AF37', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '800' }}>A</div>
        </div>
        <span style={{ flex: 1, fontSize: '1.1rem', fontWeight: '700', color: '#2d0a4e' }}>{question}</span>
        <ChevronDown 
          size={24} 
          color="#2d0a4e" 
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} 
        />
      </button>
      <div style={{ 
        maxHeight: isOpen ? '500px' : '0', 
        overflow: 'hidden', 
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: isOpen ? '0 35px 30px 88px' : '0 35px 0 88px'
      }}>
        <p style={{ color: '#666', lineHeight: '1.8', fontSize: '1rem' }}>{answer}</p>
      </div>
    </div>
  );
};

export default FAQ;
