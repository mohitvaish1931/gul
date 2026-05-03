import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-luxury-dark py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="luxury-serif text-5xl md:text-6xl text-text-primary mb-6">
            Refund Policy
          </h1>
          <p className="text-text-secondary text-lg luxury-serif italic">
            Understand our returns, refunds, and exchange process.
          </p>
        </div>

        {/* Content */}
        <div className="prose max-w-none text-text-primary space-y-8 font-medium">
          {/* Returns section */}
          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20">
            <h2 className="luxury-serif text-3xl text-primary-red mb-4 uppercase tracking-wider">Returns</h2>
            <p className="text-text-secondary">
              We accept returns only if you've received a damaged product or we have sent a different 
              product accidentally, provided that you must have a proof of unboxing video from the start 
              clearly showing the damage in the product. In this case, we shall arrange a pickup from your 
              location and issue a credit note for the same which can be used for your future orders.
            </p>
          </section>

          {/* Refund section */}
          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20">
            <h2 className="luxury-serif text-3xl text-primary-red mb-4 uppercase tracking-wider">Refund</h2>
            <p className="text-text-secondary">
              We do not provide refunds at any cost. In some cases, you might be eligible for a credit note.
            </p>
          </section>

          {/* Missing item section */}
          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm">
            <h2 className="luxury-serif text-3xl text-primary-red mb-4 uppercase tracking-wider">Missing Item</h2>
            <p className="mb-4 text-text-secondary">
              Incase a product is missing from your package, you can raise an issue for the same & we will 
              ship it to you at the earliest. You must have a proof of unboxing video from the start clearly 
              showing all the products in the package.
            </p>
            <p className="text-text-secondary italic">
              Please note, we don't provide refund for the missing item. You may be eligible for a credit 
              note if the missing item is out of stock.
            </p>
          </section>

          {/* Exchange section */}
          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm">
            <h2 className="luxury-serif text-3xl text-primary-red mb-4 uppercase tracking-wider">Exchange</h2>
            <p className="mb-4 text-text-secondary">
              We provide size exchange only for finger rings. Shipping charges of ₹200 (to & fro) will be 
              borne by the customer. Exchange will be picked up and delivered at the same address as the 
              original delivery address.
            </p>
            <p className="text-text-secondary">
              Please note that the exchange process takes around 12-15 days.
            </p>
          </section>

          {/* Time limit section */}
          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm">
            <h2 className="luxury-serif text-3xl text-primary-red mb-4 uppercase tracking-wider">Time Limit</h2>
            <p className="text-text-secondary">
              You need to raise a return/exchange request within a period of 3 days from the delivery date. 
              Post this period of 3 days, your order shall become final sale, and would not be eligible for 
              any return request.
            </p>
          </section>

          {/* Contact section */}
          <section className="pt-12 border-t-2 border-primary-red/20 text-center">
            <h2 className="luxury-serif text-3xl text-primary-red mb-6 uppercase tracking-wider">Raise a Request</h2>
            <p className="mb-8 text-text-secondary italic">
              You can raise a return/exchange request through the following channels:
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-8 text-text-primary font-bold tracking-widest text-sm">
              <div className="bg-white/40 px-8 py-4 rounded-xl border border-gold-primary/20 shadow-sm">
                <p className="text-[10px] text-text-muted mb-1 font-normal uppercase">Email</p>
                <a href="mailto:GUL FASHIONjewel@gmail.com" className="hover:text-primary-red transition-all">GUL FASHIONjewel@gmail.com</a>
              </div>
              <div className="bg-white/40 px-8 py-4 rounded-xl border border-gold-primary/20 shadow-sm">
                <p className="text-[10px] text-text-muted mb-1 font-normal uppercase">WhatsApp</p>
                <a href="https://wa.me/917877937350" className="hover:text-primary-red transition-all">+91 78779 37350</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
