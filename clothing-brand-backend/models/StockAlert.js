import mongoose from 'mongoose';

// "Notify me when back in stock" requests
const stockAlertSchema = mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    notifiedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

stockAlertSchema.index({ product: 1, email: 1 }, { unique: true });

const StockAlert = mongoose.model('StockAlert', stockAlertSchema);

export default StockAlert;
