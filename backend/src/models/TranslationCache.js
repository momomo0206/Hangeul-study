import mongoose from 'mongoose';

const translationCacheSchema = new mongoose.Schema({
  japanese: { type: String, required: true, unique: true },
  korean:   { type: String, required: true },
  reading:  { type: String },
  audioUrl: { type: String },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('TranslationCache', translationCacheSchema);