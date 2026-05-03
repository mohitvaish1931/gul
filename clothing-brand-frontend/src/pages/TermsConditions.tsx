

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="luxury-serif text-5xl md:text-6xl text-text-primary mb-6">
            Terms & Conditions
          </h1>
          <p className="text-text-secondary text-lg luxury-serif italic">
            Please read these terms and conditions carefully before using our website.
          </p>
        </div>

        {/* Content */}
        <div className="prose max-w-none text-text-primary space-y-8 font-medium">
          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm transition-all hover:bg-white/40 group">
            <h2 className="luxury-serif text-3xl text-text-primary mb-4 uppercase tracking-wider font-black group-hover:text-primary-purple transition-all duration-300">1. Acceptance of Terms</h2>
            <p className="text-text-secondary font-bold">
              By accessing and using this website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website.
            </p>
          </section>

          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm transition-all hover:bg-white/40 group">
            <h2 className="luxury-serif text-3xl text-text-primary mb-4 uppercase tracking-wider font-black group-hover:text-primary-purple transition-all duration-300">2. Intellectual Property</h2>
            <p className="text-text-secondary font-bold">
              All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of GUL FASHION and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from this content without our express written permission.
            </p>
          </section>

          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm transition-all hover:bg-white/40 group">
            <h2 className="luxury-serif text-3xl text-text-primary mb-4 uppercase tracking-wider font-black group-hover:text-primary-purple transition-all duration-300">3. Product Descriptions</h2>
            <p className="text-text-secondary leading-relaxed font-bold">
              We strive to provide accurate descriptions and images of our products. However, we do not warrant that the product descriptions or other content are error-free, complete, or current. Colors may vary depending on your monitor settings.
            </p>
          </section>

          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm transition-all hover:bg-white/40 group">
            <h2 className="luxury-serif text-3xl text-text-primary mb-4 uppercase tracking-wider font-black group-hover:text-primary-purple transition-all duration-300">4. Pricing and Payment</h2>
            <p className="text-text-secondary font-bold">
              All prices are listed in Indian Rupees (₹) and are subject to change without notice. We reserve the right to refuse or cancel any order if there is an error in pricing or availability.
            </p>
          </section>

          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm transition-all hover:bg-white/40 group">
            <h2 className="luxury-serif text-3xl text-text-primary mb-4 uppercase tracking-wider font-black group-hover:text-primary-purple transition-all duration-300">5. Shipping and Delivery</h2>
            <p className="text-text-secondary font-bold">
              Shipping and delivery are subject to our <a href="/shipping-policy" className="text-primary-purple hover:text-text-primary underline font-bold transition-all">Shipping Policy</a>. We are not responsible for delays caused by third-party carriers or customs.
            </p>
          </section>

          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm transition-all hover:bg-white/40 group">
            <h2 className="luxury-serif text-3xl text-text-primary mb-4 uppercase tracking-wider font-black group-hover:text-primary-purple transition-all duration-300">6. Returns and Refunds</h2>
            <p className="text-text-secondary font-bold">
              Returns and refunds are subject to our <a href="/refund-policy" className="text-primary-purple hover:text-text-primary underline font-bold transition-all">Refund Policy</a>.
            </p>
          </section>

          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm transition-all hover:bg-white/40 group">
            <h2 className="luxury-serif text-3xl text-text-primary mb-4 uppercase tracking-wider font-black group-hover:text-primary-purple transition-all duration-300">7. Limitation of Liability</h2>
            <p className="text-text-secondary font-bold">
              GUL FASHION shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our products or website.
            </p>
          </section>

          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm transition-all hover:bg-white/40 group">
            <h2 className="luxury-serif text-3xl text-text-primary mb-4 uppercase tracking-wider font-black group-hover:text-primary-purple transition-all duration-300">8. Governing Law</h2>
            <p className="text-text-secondary font-bold">
              These Terms and Conditions shall be governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts in Jaipur, Rajasthan.
            </p>
          </section>

          <section className="pt-12 border-t-2 border-primary-purple/20 text-center">
            <h2 className="luxury-serif text-3xl text-primary-purple mb-6 uppercase tracking-wider font-bold">Contact Information</h2>
            <p className="mb-8 text-text-secondary italic">
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-8 text-text-primary font-bold tracking-widest text-sm">
              <div className="bg-white/40 px-8 py-4 rounded-xl border border-gold-primary/20 shadow-sm">
                <p className="text-[10px] text-text-muted mb-1 font-normal uppercase">Email</p>
                <a href="mailto:gul.fashion.jaipur@gmail.com" className="hover:text-primary-purple transition-all">gul.fashion.jaipur@gmail.com</a>
              </div>
              <div className="bg-white/40 px-8 py-4 rounded-xl border border-gold-primary/20 shadow-sm">
                <p className="text-[10px] text-text-muted mb-1 font-normal uppercase">WhatsApp</p>
                <a href="https://wa.me/917877937350" className="hover:text-primary-purple transition-all">+91 78779 37350</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
