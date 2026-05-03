import React from 'react';

const JewelleryCareGuide = () => {
  return (
    <div className="min-h-screen bg-luxury-dark py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="luxury-serif text-5xl md:text-6xl text-text-primary mb-6">
            Jewellery Care Guide
          </h1>
          <p className="text-text-secondary text-lg luxury-serif italic">
            Keep your precious accessories beautiful and timeless with proper care.
          </p>
        </div>

        {/* Intro */}
        <div className="mb-12 p-8 border border-gold-primary/30 rounded-2xl bg-white/40 shadow-sm backdrop-blur-sm">
          <p className="text-text-primary text-center text-lg leading-relaxed font-medium">
            As much as we love flaunting our accessories, we often come across jewellery storing or caring 
            roadblocks that don't get answered. We are here to help you with the same. If you follow these 
            tips & guidelines, it will ensure the longevity of the accessories.
          </p>
        </div>

        {/* Content */}
        <div className="prose max-w-none text-text-primary space-y-8 font-medium">
          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20">
            <h2 className="luxury-serif text-3xl text-primary-red mb-4 uppercase tracking-wider">Waterproof & Life-Proof</h2>
            <p className="mb-4 text-text-secondary">
              Our jewelry is crafted from premium Stainless Steel with an 18k Gold PVD finish, making it completely 
              <span className="text-primary-red font-bold"> Waterproof, Sweatproof, and Life-proof</span>.
            </p>
            <p className="mb-4 text-text-secondary">
              Unlike traditional gold plating, you can confidently wear your GUL FASHION pieces while bathing, swimming, or 
              hitting the gym. The anti-tarnish finish ensures your jewelry stays as radiant as the day you bought it.
            </p>
            <p className="mb-4 text-text-secondary">
              While your jewelry can handle water, we still recommend avoiding harsh household chemicals or abrasive cleaners 
              to keep the crystals sparkling and the finish pristine for decades.
            </p>
            <p className="text-text-primary italic">
              <span className="text-primary-red font-bold">Pro Tip:</span> After contact with chlorine or salt water, 
              a quick rinse with fresh water and a pat dry with a soft cloth will keep it looking brand new.
            </p>
          </section>

          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20">
            <h2 className="luxury-serif text-3xl text-primary-red mb-4 uppercase tracking-wider">Store Them Carefully</h2>
            <p className="mb-4 text-text-secondary">
              Always store your jewellery in separate zip locks so that they do not rub against each other. 
              This prevents scratching and maintains the shine.
            </p>
            <p className="mb-4 text-text-secondary">
              <span className="text-primary-red font-bold">Special care for delicate pieces:</span> 
              Layered pendants, earrings with tassels, and pom pom jewellery should not be folded and kept 
              so that they retain their shape.
            </p>
            <p className="text-text-secondary">
              If needed you can wipe your jewellery gently with a soft cloth or cotton after every use to 
              ensure their longevity.
            </p>
          </section>

          {/* Keep Chains from Entangling */}
          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm">
            <h2 className="luxury-serif text-3xl text-primary-red mb-4 uppercase tracking-wider">Keep Chains from Entangling</h2>
            <p className="mb-4 text-text-secondary">
              Apart from being difficult to detangle, entangling of chains also results in tarnishing and 
              potential damage to the metal.
            </p>
            <p className="text-text-secondary">
              <span className="text-primary-red font-bold">Best practice:</span> Drop the pendant in 
              the ziplock bag first, then let the chain go in with only the lock and extensions out, zipping 
              close the bag. This way when you need to wear the chain, it will be easy to remove without any 
              knots.
            </p>
          </section>

          {/* Don't Leave Out */}
          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm">
            <h2 className="luxury-serif text-3xl text-primary-red mb-4 uppercase tracking-wider">Don't Leave Them Out</h2>
            <p className="mb-4 text-text-secondary">
              Often it happens that you have left jewellery out on dressing table after reaching home tired 
              from a party. While it's okay if it rests there for a while, it's absolutely not advisable to 
              leave it there for long hours.
            </p>
            <p className="text-text-secondary">
              Prolonged exposure can cause blackening of the metal and make stones or crystals falter. Always 
              store your jewellery properly after use.
            </p>
          </section>

          {/* Avoid Continuous Usage */}
          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm">
            <h2 className="luxury-serif text-3xl text-primary-red mb-4 uppercase tracking-wider">Avoid Continuous Usage</h2>
            <p className="mb-4 text-text-secondary">
              No matter how much we love our accessories, we need to give them a break. Continuous usage of 
              your favourite jewellery also leads to earlier wear and tear of either the metal or stones.
            </p>
            <p className="text-text-secondary">
              Rotate your collection and give each piece rest days between wearings. This extends the life 
              of your jewellery and keeps it looking beautiful for years to come.
            </p>
          </section>

          <section className="pt-12 border-t-2 border-primary-red/20 text-center">
            <h2 className="luxury-serif text-3xl text-primary-red mb-6 uppercase tracking-wider">Questions About Care?</h2>
            <p className="mb-8 text-text-secondary italic">
              If you have any specific questions about caring for your jewellery, feel free to reach out:
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

export default JewelleryCareGuide;
