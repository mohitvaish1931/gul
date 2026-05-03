import React from 'react';
import { useSEO } from '../utils/useSEO';

const AboutUs = () => {
  useSEO({
    title: 'About Us - GUL FASHION',
    description: 'Discover the story of GUL FASHION. Our heritage, craftsmanship, and commitment to luxury jewelry.',
    keywords: 'about us, brand story, jewelry heritage, craftsmanship, GUL FASHION',
    url: 'https://GUL FASHIONjewles.com/about-us',
    type: 'website'
  });

  return (
    <div className="min-h-screen bg-luxury-dark py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="luxury-serif text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-rose-gold mb-6">
            Our Story
          </h1>
          <p className="text-primary-red text-xl italic font-bold luxury-serif">
            "Timeless elegance, modern craftsmanship."
          </p>
        </div>

        {/* Content */}
        <div className="prose max-w-none text-text-primary space-y-12">
          {/* Heritage Section */}
          <section className="bg-white/50 p-8 rounded-2xl border border-gold-primary/30 backdrop-blur-sm shadow-sm">
            <h2 className="luxury-serif text-3xl text-primary-red mb-6 uppercase tracking-wider">The Legacy of GUL FASHION</h2>
            <p className="leading-relaxed text-black font-medium">
              Founded on the principles of exquisite artistry and uncompromising quality, GUL FASHION has emerged as a beacon of luxury in the world of high jewelry. Our journey began with a simple vision: to create pieces that don't just adorn, but tell a story of heritage and sophistication.
            </p>
            <p className="mt-4 leading-relaxed text-black font-medium">
              Every piece in our collection is a testament to the skill of our master artisans, who blend traditional techniques passed down through generations with contemporary design sensibilities.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
            <div>
              <h2 className="luxury-serif text-3xl text-primary-red mb-6 uppercase tracking-wider">Meticulous Craftsmanship</h2>
              <p className="leading-relaxed text-black font-medium">
                We believe that true luxury lies in the details. From the initial hand-drawn sketch to the final polish, each creation undergoes a rigorous process of quality control.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-primary-red">✦</span>
                  <span className="text-text-primary font-bold">Premium 18k Gold PVD Finish</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold-primary">✦</span>
                  <span className="text-text-primary font-bold">High-Grade Surgical Stainless Steel Base</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary-red">✦</span>
                  <span className="text-text-primary font-bold">Hand-Selected Round-Cut Crystals</span>
                </li>
              </ul>
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden border border-gold-primary/30 shadow-glow-gold">
               <img 
                src="https://images.unsplash.com/photo-1573408302355-08e1687f8776?auto=format&fit=crop&q=80&w=800" 
                alt="Craftsmanship" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </section>

          <section className="text-center py-12 border-y border-gold-primary/20">
            <h2 className="luxury-serif text-3xl text-primary-red mb-6 uppercase tracking-wider">Our Mission</h2>
            <p className="text-xl text-text-primary max-w-2xl mx-auto leading-relaxed italic luxury-serif">
              To inspire moments of happiness and celebration by providing exceptional jewelry that resonates with the unique personality of every wearer.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
