// Diet model for tracking meals and nutrition
const mongoose = require('mongoose');

const dietSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mealName: {
      type: String,
      required: [true, 'Please provide meal name'],
      trim: true,
    },
    calories: {
      type: Number,
      required: [true, 'Please provide calories'],
      min: [0, 'Calories cannot be negative'],
    },
    protein: {
      type: Number, // in grams
      default: 0,
      min: [0, 'Protein cannot be negative'],
    },
    carbs: {
      type: Number, // in grams
      default: 0,
      min: [0, 'Carbs cannot be negative'],
    },
    fats: {
      type: Number, // in grams
      default: 0,
      min: [0, 'Fats cannot be negative'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index for faster queries
dietSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Diet', dietSchema);
