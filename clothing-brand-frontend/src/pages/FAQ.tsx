

const FAQ = () => {
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
    <div className="min-h-screen bg-luxury-dark py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="luxury-serif text-5xl md:text-6xl text-text-primary mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-text-secondary text-lg italic luxury-serif">
            Find answers to common questions about our products and services.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white/60 backdrop-blur-md border border-gold-primary/30 p-8 rounded-2xl hover:border-primary-red/40 transition-all duration-300 shadow-sm"
            >
              <h3 className="luxury-serif text-xl text-text-primary mb-4 flex items-start gap-4 font-bold">
                <span className="bg-primary-red text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm shadow-sm font-bold">Q</span>
                {faq.question}
              </h3>
              <div className="text-text-secondary leading-relaxed flex items-start gap-4 font-medium">
                <span className="bg-gold-primary text-luxury-dark w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm shadow-sm font-bold">A</span>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-luxury-dark/5 p-12 rounded-3xl border border-gold-primary/30 text-center shadow-lg backdrop-blur-sm">
          <h2 className="luxury-serif text-3xl text-text-primary mb-4 font-bold">Still have questions?</h2>
          <p className="text-text-primary/70 mb-8 max-w-xl mx-auto font-bold">
            Our luxury consultants are available to assist you with any inquiries you may have.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-text-primary text-white px-10 py-4 rounded-xl font-black tracking-widest text-sm hover:bg-primary-red transition-all duration-300 shadow-xl"
          >
            CONTACT CUSTOMER CARE
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
