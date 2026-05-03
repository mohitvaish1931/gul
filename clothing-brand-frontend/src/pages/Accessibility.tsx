

const Accessibility = () => {
  return (
    <div className="min-h-screen bg-luxury-dark py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="luxury-serif text-5xl md:text-6xl text-text-primary mb-6">
            Accessibility Statement
          </h1>
          <p className="text-text-secondary text-lg luxury-serif italic">
            Our commitment to making our website accessible to everyone.
          </p>
        </div>

        {/* Content */}
        <div className="prose max-w-none text-text-primary space-y-8 font-medium">
          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20">
            <h2 className="luxury-serif text-3xl text-primary-red mb-4 uppercase tracking-wider">Our Commitment</h2>
            <p className="text-text-secondary">
              At GUL FASHION, we are committed to ensuring that our website is accessible to the widest possible audience, regardless of technology or ability. We are actively working to increase the accessibility and usability of our website and in doing so adhere to many of the available standards and guidelines.
            </p>
          </section>

          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20">
            <h2 className="luxury-serif text-3xl text-primary-red mb-4 uppercase tracking-wider">Standards</h2>
            <p className="text-text-secondary">
              We aim to comply with all relevant accessibility standards, including the World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.1. These guidelines explain how to make web content more accessible for people with disabilities.
            </p>
          </section>

          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20">
            <h2 className="luxury-serif text-3xl text-primary-red mb-4 uppercase tracking-wider">Ongoing Efforts</h2>
            <p className="text-text-secondary">
              Accessibility is an ongoing effort for us. We regularly review our website and implement improvements to ensure a seamless experience for all our users. Our team is trained on accessibility best practices to incorporate them into our digital presence.
            </p>
          </section>

          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20">
            <h2 className="luxury-serif text-3xl text-primary-red mb-4 uppercase tracking-wider">Feedback</h2>
            <p className="text-text-secondary">
              We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers or have suggestions on how we can improve, please contact us.
            </p>
          </section>

          <section className="pt-12 border-t-2 border-primary-red/20 text-center">
            <h2 className="luxury-serif text-3xl text-primary-red mb-6 uppercase tracking-wider">Contact Information</h2>
            <div className="mt-8 space-y-4 text-text-primary font-bold tracking-widest uppercase text-sm">
              <p><span className="text-text-secondary mr-2 font-normal lowercase tracking-normal">Email:</span> GUL FASHIONfashion@gmail.com</p>
              <p><span className="text-text-secondary mr-2 font-normal lowercase tracking-normal">Phone:</span> +91 78779 37350</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;
