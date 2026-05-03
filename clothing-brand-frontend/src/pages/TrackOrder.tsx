import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, AlertCircle, Loader2, ChevronRight } from 'lucide-react';
import { useSEO } from '../utils/useSEO';
import { API_ENDPOINTS, fetchJSON } from '../utils/api';

interface OrderTrackingResponse {
  success: boolean;
  order: {
    _id: string;
    orderNumber: string;
    status: string;
    createdAt: string;
    totalAmount: number;
    shippingAddress: {
      name: string;
      address: string;
      city: string;
      state: string;
      pincode: string;
    };
    items: Array<{
      name: string;
      quantity: number;
      price: number;
      image?: string;
    }>;
    courierName?: string;
    awbNumber?: string;
  };
  trackingDetails?: {
    shipment_track?: Array<{
      current_status: string;
      awb_code: string;
      courier_name: string;
      pickup_date: string;
      delivered_date: string;
      scans?: Array<{
        date: string;
        location: string;
        activity: string;
      }>;
    }>;
  };
}

const TrackOrder = () => {
  useSEO({
    title: 'Track Your Order - GUL FASHION Jewelry Delivery Status',
    description: 'Track your GUL FASHION jewelry order in real-time. Get live updates on your shipment status, delivery date and package location.',
    keywords: 'track order, order tracking, jewelry delivery, shipment status, order status',
    url: 'https://GUL FASHIONjewles.com/track-order',
    type: 'website'
  });

  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingResult, setTrackingResult] = useState<OrderTrackingResponse | null>(null);

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTrackingResult(null);

    try {
      const data = await fetchJSON<OrderTrackingResponse>(API_ENDPOINTS.ORDERS.TRACK, {
        method: 'POST',
        body: JSON.stringify({ orderNumber, email }),
      });

      if (data.success) {
        setTrackingResult(data);
      } else {
        setError('Order not found. Please check your order number and email.');
      }
    } catch (err: any) {
      console.error('Tracking error:', err);
      setError(err.message || 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing': return <Package className="h-6 w-6" />;
      case 'shipped': return <Truck className="h-6 w-6" />;
      case 'delivered': return <CheckCircle className="h-6 w-6" />;
      default: return <Clock className="h-6 w-6" />;
    }
  };

  const getStatusColor = (status: string, currentStatus: string) => {
    const statuses = ['processing', 'shipped', 'delivered'];
    const currentIndex = statuses.indexOf(currentStatus.toLowerCase());
    const stepIndex = statuses.indexOf(status.toLowerCase());

    if (stepIndex <= currentIndex) return 'bg-gold-primary text-luxury-dark shadow-glow-gold';
    return 'bg-white/10 text-text-muted';
  };

  return (
    <div className="min-h-screen bg-luxury-dark pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-soft mb-4 luxury-serif">
            TRACK YOUR ORDER
          </h1>
          <p className="text-text-secondary text-lg">
            Enter your order details below to track your jewelry shipment
          </p>
        </div>

        {/* Track Order Form */}
        <div className="glass-card-sapphire border border-teal-luxury/20 shadow-glow-emerald p-8 mb-8">
          <form onSubmit={handleTrackOrder} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
              <label htmlFor="orderNumber" className="block text-sm font-medium text-text-primary mb-2 luxury-serif">
                Order Number
              </label>
              <input
                type="text"
                id="orderNumber"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                placeholder="e.g. MOR-1001"
                className="w-full px-4 py-3 bg-white/5 border border-gold-primary/20 rounded-lg text-text-primary placeholder-text-muted focus:ring-2 focus:ring-gold-primary/50 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div className="md:col-span-1">
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2 luxury-serif">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="The email used for purchase"
                className="w-full px-4 py-3 bg-white/5 border border-gold-primary/20 rounded-lg text-text-primary placeholder-text-muted focus:ring-2 focus:ring-gold-primary/50 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-premium-gold text-luxury-dark py-4 px-6 rounded-lg font-bold hover:shadow-glow-gold transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
                <span>{loading ? 'TRACKING...' : 'TRACK ORDER'}</span>
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-primary-red/10 border border-primary-red/30 rounded-lg flex items-center space-x-3 text-primary-red">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Tracking Results */}
        {trackingResult && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Summary Card */}
            <div className="glass-card-emerald border border-teal-luxury/20 shadow-glow-emerald p-8">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gold-primary mb-1">
                    Order #{trackingResult.order.orderNumber}
                  </h2>
                  <p className="text-text-secondary text-sm">
                    Placed on {new Date(trackingResult.order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    trackingResult.order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                    trackingResult.order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-gold-primary/20 text-gold-primary'
                  }`}>
                    {trackingResult.order.status}
                  </span>
                  {trackingResult.order.awbNumber && (
                    <p className="text-text-muted text-xs mt-2">
                      AWB: {trackingResult.order.awbNumber} ({trackingResult.order.courierName})
                    </p>
                  )}
                </div>
              </div>

              {/* Status Timeline */}
              <div className="relative">
                <div className="absolute top-6 left-0 w-full h-0.5 bg-white/10 -z-10 hidden md:block"></div>
                <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
                  {['Processing', 'Shipped', 'Delivered'].map((step, idx) => (
                    <div key={step} className="flex flex-col items-center text-center relative z-10 w-full md:w-1/3">
                      <div className={`p-4 rounded-full transition-all duration-500 ${getStatusColor(step, trackingResult.order.status)}`}>
                        {getStatusIcon(step)}
                      </div>
                      <h4 className="mt-4 font-bold text-text-primary luxury-serif text-sm uppercase tracking-wide">
                        {step}
                      </h4>
                      {step === 'Processing' && (
                        <p className="text-xs text-text-muted mt-1">Confirmed & Packaging</p>
                      )}
                      {step === 'Shipped' && trackingResult.trackingDetails?.shipment_track?.[0]?.pickup_date && (
                        <p className="text-xs text-text-muted mt-1">
                          {new Date(trackingResult.trackingDetails.shipment_track[0].pickup_date).toLocaleDateString()}
                        </p>
                      )}
                      {step === 'Delivered' && trackingResult.trackingDetails?.shipment_track?.[0]?.delivered_date && (
                        <p className="text-xs text-text-muted mt-1">
                          {new Date(trackingResult.trackingDetails.shipment_track[0].delivered_date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Order Items */}
              <div className="glass-card-sapphire border border-teal-luxury/10 p-6">
                <h3 className="text-lg font-bold text-gold-primary mb-4 luxury-serif uppercase flex items-center">
                  <Package className="h-5 w-5 mr-2" /> Items
                </h3>
                <div className="space-y-4">
                  {trackingResult.order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-4 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-lg border border-gold-primary/20" />
                      )}
                      <div className="flex-1">
                        <p className="text-text-primary font-medium text-sm">{item.name}</p>
                        <p className="text-text-muted text-xs">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gold-soft font-bold">₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-white/10 mt-4 flex justify-between items-center">
                    <span className="text-text-secondary">Total Amount</span>
                    <span className="text-gold-primary font-bold text-lg">₹{trackingResult.order.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Details */}
              <div className="glass-card-sapphire border border-teal-luxury/10 p-6">
                <h3 className="text-lg font-bold text-gold-primary mb-4 luxury-serif uppercase flex items-center">
                  <MapPin className="h-5 w-5 mr-2" /> Shipping Address
                </h3>
                <div className="text-text-secondary space-y-2 text-sm">
                  <p className="text-text-primary font-bold">{trackingResult.order.shippingAddress.name}</p>
                  <p>{trackingResult.order.shippingAddress.address}</p>
                  <p>{trackingResult.order.shippingAddress.city}, {trackingResult.order.shippingAddress.state} - {trackingResult.order.shippingAddress.pincode}</p>
                </div>

                {trackingResult.trackingDetails?.shipment_track?.[0]?.scans && (
                  <div className="mt-8">
                    <h3 className="text-sm font-bold text-gold-primary mb-4 uppercase tracking-wider">Tracking History</h3>
                    <div className="space-y-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                      {trackingResult.trackingDetails.shipment_track[0].scans.map((scan, idx) => (
                        <div key={idx} className="flex items-start space-x-3 border-l-2 border-gold-primary/20 pl-4 relative">
                          <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold-primary"></div>
                          <div>
                            <p className="text-text-primary text-xs font-bold uppercase">{scan.activity}</p>
                            <p className="text-text-muted text-[10px]">{scan.location} • {scan.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
