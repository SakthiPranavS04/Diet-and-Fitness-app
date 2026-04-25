// Wellness controller - handles sleep, water, and stress tracking
const db = require('../db');

/**
 * Add wellness data
 * POST /api/wellness
 */
exports.addWellness = async (req, res) => {
  try {
    const { sleepHours, waterIntake, stressLevel, notes, date } = req.body;

    const wellness = db.wellness.create({
      userId: req.userId,
      sleepHours: parseFloat(sleepHours) || 0,
      waterIntake: parseFloat(waterIntake) || 0,
      stressLevel: stressLevel || 'low',
      notes: notes || '',
      date: date || new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      message: 'Wellness data added successfully',
      wellness,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get wellness data for the user
 * GET /api/wellness
 */
exports.getWellness = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let wellnessData = db.wellness.find({ userId: req.userId });

    // Filter by date range if provided
    if (startDate || endDate) {
      wellnessData = wellnessData.filter(w => {
        const wDate = new Date(w.date);
        if (startDate && wDate < new Date(startDate)) return false;
        if (endDate && wDate > new Date(endDate)) return false;
        return true;
      });
    }

    // Sort by date descending
    wellnessData.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Calculate summary
    const avgSleep =
      wellnessData.length > 0
        ? (
            wellnessData.reduce((sum, w) => sum + w.sleepHours, 0) /
            wellnessData.length
          ).toFixed(1)
        : 0;

    const totalWater = wellnessData.reduce((sum, w) => sum + w.waterIntake, 0);
    const stressCount = {
      low: wellnessData.filter((w) => w.stressLevel === 'low').length,
      medium: wellnessData.filter((w) => w.stressLevel === 'medium').length,
      high: wellnessData.filter((w) => w.stressLevel === 'high').length,
    };

    res.status(200).json({
      success: true,
      data: {
        wellnessData,
        summary: {
          avgSleep,
          totalWater,
          stressCount,
          dataPoints: wellnessData.length,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete wellness data
 * DELETE /api/wellness/:id
 */
exports.deleteWellness = async (req, res) => {
  try {
    const { id } = req.params;

    const wellnessData = db.wellness.find({ userId: req.userId });
    const wellness = wellnessData.find(w => w._id === id);

    if (!wellness) {
      return res.status(404).json({
        success: false,
        message: 'Wellness data not found',
      });
    }

    db.wellness.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Wellness data deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
