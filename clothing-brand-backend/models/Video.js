import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  title: String,
  url: { type: String, required: true }
}, { timestamps: true });

const Video = mongoose.model('Video', VideoSchema);
export default Video;
