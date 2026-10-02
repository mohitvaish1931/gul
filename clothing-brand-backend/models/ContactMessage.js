import mongoose from 'mongoose';

const contactMessageSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, maxlength: 200 },
    phone: { type: String, trim: true, maxlength: 30, default: '' },
    subject: { type: String, trim: true, maxlength: 200, default: '' },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    status: { type: String, enum: ['new', 'read'], default: 'new' },
  },
  { timestamps: true }
);

contactMessageSchema.index({ createdAt: -1 });

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

export default ContactMessage;
