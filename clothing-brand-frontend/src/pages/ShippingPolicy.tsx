

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="luxury-serif text-5xl md:text-6xl text-text-primary mb-6">
            Shipping Policy
          </h1>
          <p className="text-text-secondary text-lg luxury-serif italic">
            Learn about our delivery times, shipping costs, and order tracking.
          </p>
        </div>

        {/* Content */}
        <div className="prose max-w-none text-text-primary space-y-8 font-medium">
          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20">
            <h2 className="luxury-serif text-3xl text-primary-purple mb-4 uppercase tracking-wider">Delivery Time</h2>
            <p className="mb-4 text-text-secondary">
              All orders are usually dispatched within 2-3 working days unless stated otherwise. Once 
              dispatched, it takes 4-8 working days to deliver depending upon the location.
            </p>
            <p className="text-text-secondary">
              However, the delivery time is subject to change based on shortage of an item, bad weather, 
              transit time of your carrier, destination address, or COVID related restrictions, etc.
            </p>
          </section>

          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20">
            <h2 className="luxury-serif text-3xl text-primary-purple mb-4 uppercase tracking-wider">Shipping Cost</h2>
            <p className="text-text-secondary">
              We charge <span className="text-primary-purple font-bold">₹70 per order</span> and also offer 
              <span className="text-primary-purple font-bold"> free shipping on all orders above ₹1499</span>.
            </p>
          </section>

          {/* RTO/Un-delivered section */}
          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm">
            <h2 className="luxury-serif text-3xl text-primary-purple mb-4 uppercase tracking-wider">RTO/Un-delivered Shipment</h2>
            <p className="mb-4 text-text-secondary">
              We are not liable for undelivered shipment or RTO (Return to Origin) due to wrong address / 
              misinformation provided while placing an order.
            </p>
            <p className="text-text-secondary">
              In this case, customer has to pay the shipping charges again so we can re-ship the order.
            </p>
          </section>

          {/* Tracking Order section */}
          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm">
            <h2 className="luxury-serif text-3xl text-primary-purple mb-4 uppercase tracking-wider">Tracking Your Order</h2>
            <p className="text-text-secondary">
              Once your order is shipped from our warehouse, you will receive an email including a tracking 
              number to check the status.
            </p>
          </section>

          {/* Lost Shipment section */}
          <section className="bg-white/30 p-8 rounded-2xl border border-gold-primary/20 shadow-sm">
            <h2 className="luxury-serif text-3xl text-primary-purple mb-4 uppercase tracking-wider">Lost Shipment</h2>
            <p className="mb-4 text-text-secondary">
              Incase your package gets lost during the transit, we shall re-ship your order.
            </p>
            <p className="text-text-secondary">
              If any item of your order is out of stock, you can either wait for a restock or we will issue 
              a credit note which can be used for future orders.
            </p>
          </section>

          {/* Contact section */}
          <section className="pt-12 border-t-2 border-primary-purple/20 text-center">
            <h2 className="luxury-serif text-3xl text-primary-purple mb-6 uppercase tracking-wider">Need Help with Your Order?</h2>
            <p className="mb-8 text-text-secondary italic">
              Feel free to reach us out on:
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-8 text-text-primary font-bold tracking-widest text-sm">
              <div className="bg-white/40 px-8 py-4 rounded-xl border border-gold-primary/20">
                <p className="text-[10px] text-text-muted mb-1 font-normal">EMAIL</p>
                <a href="mailto:gul.fashion.jaipur@gmail.com" className="hover:text-primary-purple transition-all">gul.fashion.jaipur@gmail.com</a>
              </div>
              <div className="bg-white/40 px-8 py-4 rounded-xl border border-gold-primary/20">
                <p className="text-[10px] text-text-muted mb-1 font-normal">WHATSAPP</p>
                <a href="https://wa.me/919351325459" className="hover:text-primary-purple transition-all">+91 93513 25459</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
