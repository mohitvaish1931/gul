import React, { useState } from 'react';
import { Search, Truck, AlertCircle, Loader2 } from 'lucide-react';
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
    title: 'Track Your Order - GUL FASHION',
    description: 'Track your GUL FASHION clothing order in real-time. Get live updates on your shipment status.',
    keywords: 'track order, clothing delivery status, gul fashion tracking',
    url: 'https://gulfashion.com/track-order',
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-purple-50/50 py-20 border-b border-purple-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="small-gold-tag">REAL-TIME UPDATES</span>
          <h1 className="text-5xl font-serif text-purple-950 mb-6 italic">Track Your Order</h1>
          <p className="text-lg text-purple-800/70 font-medium">
            Enter your order details below to see the current status of your handcrafted apparel.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          {/* Tracking Form */}
          <div className="bg-white border border-purple-100 p-8 rounded-[2rem] shadow-sm mb-12">
            <form onSubmit={handleTrackOrder} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs font-bold text-purple-900 uppercase tracking-widest mb-3">Order ID</label>
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="w-full px-5 py-4 bg-purple-50/30 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="E.g. MOR-123456"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-purple-900 uppercase tracking-widest mb-3">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 bg-purple-50/30 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="The email used during checkout"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-900 text-white py-5 px-8 rounded-xl font-bold uppercase tracking-[0.2em] hover:bg-purple-800 transition-all shadow-xl shadow-purple-900/10 flex items-center justify-center space-x-3 disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Search size={18} />}
                <span>{loading ? 'Locating...' : 'Track My Shipment'}</span>
              </button>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center space-x-3 text-red-600">
                <AlertCircle size={20} />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          {trackingResult && (
            <div className="animate-fade-in space-y-8">
               <div className="bg-purple-900 text-white p-8 rounded-[2rem] shadow-2xl">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-70">Order Status</span>
                      <h2 className="text-3xl font-serif mt-1">{trackingResult.order.status}</h2>
                    </div>
                    <div className="bg-white/20 p-4 rounded-2xl">
                      <Truck size={32} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm opacity-90">
                    <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                       <p className="text-[9px] uppercase tracking-widest mb-1 opacity-60">Order No</p>
                       <p className="font-bold">{trackingResult.order.orderNumber}</p>
                    </div>
                    <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                       <p className="text-[9px] uppercase tracking-widest mb-1 opacity-60">Courier</p>
                       <p className="font-bold">{trackingResult.order.courierName || 'In Transit'}</p>
                    </div>
                  </div>
               </div>
               
               {/* Simplified Scan List */}
               <div className="bg-white border border-purple-100 p-8 rounded-[2rem] shadow-sm">
                  <h3 className="text-lg font-serif text-purple-950 mb-6">Shipment Timeline</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                       <div className="flex flex-col items-center">
                          <div className="w-4 h-4 bg-purple-900 rounded-full"></div>
                          <div className="w-0.5 h-full bg-purple-100"></div>
                       </div>
                       <div>
                          <p className="font-bold text-purple-950">Shipment Picked Up</p>
                          <p className="text-xs text-gray-500">Jaipur Sorting Hub</p>
                       </div>
                    </div>
                    <div className="flex gap-4 opacity-50">
                       <div className="flex flex-col items-center">
                          <div className="w-4 h-4 border-2 border-purple-200 rounded-full"></div>
                       </div>
                       <div>
                          <p className="font-bold text-purple-950">Out for Delivery</p>
                          <p className="text-xs text-gray-500">Local Distribution Center</p>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
