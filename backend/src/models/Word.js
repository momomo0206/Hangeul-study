import mongoose from 'mongoose';

const wordSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  japanese:  { type: String, required: true },
  korean:    { type: String, required: true },
}, { timestamps: true });

wordSchema.index({ user: 1, japanese: 1, korean: 1 }, { unique: true });
wordSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model('Word', wordSchema);