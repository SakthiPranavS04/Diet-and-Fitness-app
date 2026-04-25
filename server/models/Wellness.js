// Wellness model for tracking sleep, water, and stress
const mongoose = require('mongoose');

const wellnessSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sleepHours: {
      type: Number,
      default: 0,
      min: [0, 'Sleep hours cannot be negative'],
      max: [24, 'Sleep hours cannot exceed 24'],
    },
    waterIntake: {
      type: Number, // in liters
      default: 0,
      min: [0, 'Water intake cannot be negative'],
    },
    stressLevel: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'low',
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index for faster queries
wellnessSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Wellness', wellnessSchema);
