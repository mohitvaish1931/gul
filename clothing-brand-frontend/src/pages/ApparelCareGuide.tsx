
const ApparelCareGuide = () => {
  return (
    <div className="min-h-screen bg-luxury-dark py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="luxury-serif text-5xl md:text-6xl text-text-primary mb-6">
            Garment Care Guide
          </h1>
          <p className="text-text-secondary text-lg luxury-serif italic">
            Preserve the beauty and longevity of your handcrafted ethnic wear with these expert care tips.
          </p>
        </div>

        {/* Intro */}
        <div className="mb-12 p-8 border border-gold-primary/30 rounded-2xl bg-white/40 shadow-sm backdrop-blur-sm">
          <p className="text-text-primary text-center text-lg leading-relaxed font-medium">
            Gul Fashion garments are crafted with the finest silks and intricate hand-embroidery. 
            To ensure your heirloom pieces remain as stunning as the day they were created, 
            please follow these specialized care instructions.
          </p>
        </div>

        {/* Content */}
        <div className="prose max-w-none text-text-primary space-y-8 font-medium">
          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20">
            <h2 className="luxury-serif text-3xl text-primary-red mb-4 uppercase tracking-wider">Professional Cleaning</h2>
            <p className="mb-4 text-text-secondary">
              Most of our ethnic wear, especially those with <span className="text-primary-red font-bold">Zari, Gotta Patti, or Zardosi work</span>, 
              requires professional dry cleaning.
            </p>
            <p className="mb-4 text-text-secondary">
              Avoid machine washing or hand washing at home for silk sarees and heavy embroidered suits. 
              Water can cause the delicate fibers to shrink and the embroidery threads to lose their sheen.
            </p>
            <p className="text-text-primary italic">
              <span className="text-primary-red font-bold">Important:</span> Always inform your dry cleaner about the specific material 
              and embroidery type of your garment for appropriate treatment.
            </p>
          </section>

          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20">
            <h2 className="luxury-serif text-3xl text-primary-red mb-4 uppercase tracking-wider">Perfect Storage</h2>
            <p className="mb-4 text-text-secondary">
              Store your precious sarees and lehengas in <span className="text-primary-red font-bold">Muslin or Cotton bags</span>. 
              Avoid plastic covers as they don't allow the fabric to breathe and can cause yellowing over time.
            </p>
            <p className="mb-4 text-text-secondary">
              For heavy lehengas and sarees, fold them with the embroidery on the inside to prevent snagging. 
              Change the folds every few months to prevent the fabric from tearing at the crease.
            </p>
            <p className="text-text-secondary">
              Keep your garments in a cool, dry place away from direct sunlight and moisture to prevent color fading and mildew.
            </p>
          </section>

          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm">
            <h2 className="luxury-serif text-3xl text-primary-red mb-4 uppercase tracking-wider">Ironing & Steaming</h2>
            <p className="mb-4 text-text-secondary">
              Always iron on the <span className="text-primary-red font-bold">reverse side</span> of the garment. 
              Use a low-to-medium heat setting or place a thin cotton cloth between the iron and the fabric.
            </p>
            <p className="text-text-secondary">
              Steam ironing is preferred for removing wrinkles from delicate silks and georgettes, but ensure the steamer 
              doesn't touch the embroidery directly.
            </p>
          </section>

          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm">
            <h2 className="luxury-serif text-3xl text-primary-red mb-4 uppercase tracking-wider">Usage & Maintenance</h2>
            <p className="mb-4 text-text-secondary">
              Avoid spraying perfumes or deodorants directly onto your clothes, as the alcohol and chemicals can stain 
              the fabric and darken the metal threads of the embroidery.
            </p>
            <p className="text-text-secondary">
              If a thread comes loose, never pull it. Instead, carefully snip it with a small pair of scissors or 
              consult a professional tailor.
            </p>
          </section>

          <section className="pt-12 border-t-2 border-primary-red/20 text-center">
            <h2 className="luxury-serif text-3xl text-primary-red mb-6 uppercase tracking-wider">Care Inquiries?</h2>
            <p className="mb-8 text-text-secondary italic">
              Need specific advice for your Gul Fashion piece? Our styling experts are here to help:
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-8 text-text-primary font-bold tracking-widest text-sm">
              <div className="bg-white/40 px-8 py-4 rounded-xl border border-gold-primary/20 shadow-sm">
                <p className="text-[10px] text-text-muted mb-1 font-normal uppercase">Email Support</p>
                <a href="mailto:gulfashionjaipur@gmail.com" className="hover:text-primary-red transition-all">gulfashionjaipur@gmail.com</a>
              </div>
              <div className="bg-white/40 px-8 py-4 rounded-xl border border-gold-primary/20 shadow-sm">
                <p className="text-[10px] text-text-muted mb-1 font-normal uppercase">Styling Concierge</p>
                <a href="https://wa.me/917877937350" className="hover:text-primary-red transition-all">+91 78779 37350</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ApparelCareGuide;
