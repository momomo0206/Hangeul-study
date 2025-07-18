import mongoose from "mongoose";

const wordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true
    },
    originalText: {
      type: String, // Japanese text
      required: true
    },
    translatedText: {
      type: String, // Hangeul text
      required: true
    },
    pronunciationUrl: {
      type: String // URL to the pronunciation audio file(Text-to-Speech)
    },
    pitchData: {
      type: [Number] // Wave form data
    },
    userPronunciationUrl: {
      type: String // URL to the user's pronunciation audio file
    },
    addedAt: {
      type: Date,
      default: Date.now // Automatically set to current date
    },
    lookupCount: {
      type: Number,
      default: 1 // Count of how many times the word has been looked up
    },
  },
  {
    timestamps: true
  }
);

const Word = mongoose.model("Word", wordSchema);

export default Word;